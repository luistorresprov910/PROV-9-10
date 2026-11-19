import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const CORS={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type","Access-Control-Allow-Methods":"POST, OPTIONS"};
const catalog:Record<string,{name:string,price:number}>={p1:{name:"Anillo Cruz Clásico",price:6999},p2:{name:"Anillo Jesús Ichthys",price:7499},p3:{name:"Anillo Cruz Celta",price:7999},p4:{name:"Anillo Sello Vintage",price:8999}};
serve(async(req)=>{
 if(req.method==="OPTIONS") return new Response("ok",{headers:CORS});
 try {
  const auth=req.headers.get("Authorization")??"";
  const supabase=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_ANON_KEY")!,{global:{headers:{Authorization:auth}}});
  const {data:{user},error:userErr}=await supabase.auth.getUser();
  if(userErr||!user) throw new Error("Debes iniciar sesión para comprar.");
  const {items}=await req.json();
  if(!Array.isArray(items)||!items.length) throw new Error("La cesta está vacía.");
  const form=new URLSearchParams();
  form.set("mode","payment");form.set("success_url",`${Deno.env.get("SITE_URL")}/?pago=exito`);form.set("cancel_url",`${Deno.env.get("SITE_URL")}/?pago=cancelado`);form.set("customer_email",user.email??"");form.set("client_reference_id",user.id);form.set("metadata[user_id]",user.id);
  const clean=[];
  items.forEach((item:any,i:number)=>{
   const p=catalog[item.id];const qty=Math.max(1,Math.min(10,Number(item.qty)||1));const size=String(item.size||"");
   if(!p||!/^\d{2}$/.test(size)) throw new Error("Producto o talla no válidos.");
   clean.push({id:item.id,size,qty});
   form.set(`line_items[${i}][quantity]`,String(qty));form.set(`line_items[${i}][price_data][currency]`,"eur");form.set(`line_items[${i}][price_data][unit_amount]`,String(p.price));form.set(`line_items[${i}][price_data][product_data][name]`,p.name);form.set(`line_items[${i}][price_data][product_data][description]`,`Talla ${size}`);
  });
  form.set("metadata[items]",JSON.stringify(clean));
  const stripe=await fetch("https://api.stripe.com/v1/checkout/sessions",{method:"POST",headers:{Authorization:`Bearer ${Deno.env.get("STRIPE_SECRET_KEY")}`,"Content-Type":"application/x-www-form-urlencoded"},body:form});
  const session=await stripe.json();if(!stripe.ok) throw new Error(session.error?.message||"Stripe no ha podido crear el pago.");
  return new Response(JSON.stringify({url:session.url}),{headers:{...CORS,"Content-Type":"application/json"}});
 } catch(e) { return new Response(JSON.stringify({error:e.message}),{status:400,headers:{...CORS,"Content-Type":"application/json"}}); }
});
