// Configura aquí el proyecto Supabase antes de activar cuentas y captación real.
const SUPABASE_URL = 'https://mbhssbfjwraphbcaqmwd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_FaPVT6fLfM1Y0l2UBQWM8g_xqinYbHs';
const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase);
const sb = supabaseReady ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
const products = [
  {id:'p5',page:'anillo-cruz-jerusalen.html',name:'Anillo Cruz de Jerusalén',price:84.99,desc:'Acero inoxidable · cruz de Jerusalén en relieve',image:'assets/catalog/ring-05-templar-cross-pro.jpg',gallery:['assets/catalog/ring-05-templar-cross-pro.jpg','assets/catalog/ring-05-templar-cross-detalle.jpg'],url:'https://www.everfulwholesale.com/es/products/mens-knights-templar-shield-cross-ring-bible-verse-evfp44q3qp'},
  {id:'p6',page:'anillo-cruz-ancha.html',name:'Anillo Cruz Ancha',price:74.99,desc:'Acero inoxidable · cruz calada de estilo limpio',image:'assets/catalog/ring-06-classic-cross-pro.jpg',gallery:['assets/catalog/ring-06-classic-cross-pro.jpg','assets/catalog/ring-06-classic-cross-detalle.jpg'],url:'https://www.everfulwholesale.com/es/products/mens-knights-templar-shield-cross-ring-bible-verse-evfp44q3qp'},
  {id:'p7',page:'anillo-corona-espinas.html',name:'Anillo Corona de Espinas',price:89.99,desc:'Acero inoxidable · diseño inspirado en la Pasión',image:'assets/catalog/ring-07-crown-thorns-pro.jpg',gallery:['assets/catalog/ring-07-crown-thorns-pro.jpg','assets/catalog/ring-07-crown-thorns-detalle.jpg'],url:'https://www.everfulwholesale.com/es/products/mens-knights-templar-shield-cross-ring-bible-verse-evfp44q3qp'},
  {id:'p8',page:'anillo-ichthys-plata.html',name:'Anillo Ichthys Plata',price:69.99,desc:'Acero inoxidable · símbolo Ichthys',image:'assets/catalog/ring-08-ichthys-pro.jpg',gallery:['assets/catalog/ring-08-ichthys-pro.jpg','assets/catalog/ring-08-ichthys-detalle.jpg'],url:'https://www.everfulwholesale.com/es/products/mens-knights-templar-shield-cross-ring-bible-verse-evfp44q3qp'},
  {id:'p9',page:'anillo-cruz-trenzada.html',name:'Anillo Cruz Trenzada',price:79.99,desc:'Acero inoxidable · banda trenzada con cruz',image:'assets/catalog/ring-09-braided-cross-pro.jpg',gallery:['assets/catalog/ring-09-braided-cross-pro.jpg','assets/catalog/ring-09-braided-cross-detalle.jpg'],url:'https://www.everfulwholesale.com/es/products/mens-knights-templar-shield-cross-ring-bible-verse-evfp44q3qp'},
  {id:'p10',page:'anillo-alfa-omega.html',name:'Anillo Alfa y Omega',price:84.99,desc:'Acero inoxidable · símbolos Alfa y Omega',image:'assets/catalog/ring-10-alpha-omega-pro.jpg',gallery:['assets/catalog/ring-10-alpha-omega-pro.jpg','assets/catalog/ring-10-alpha-omega-detalle.jpg'],url:'https://www.everfulwholesale.com/es/products/mens-knights-templar-shield-cross-ring-bible-verse-evfp44q3qp'},
  {id:'p11',page:'anillo-padre-nuestro.html',name:'Anillo Padre Nuestro',price:89.99,desc:'Acero inoxidable · oración grabada alrededor',image:'assets/catalog/ring-11-lords-prayer-pro.jpg',gallery:['assets/catalog/ring-11-lords-prayer-pro.jpg','assets/catalog/ring-11-lords-prayer-detalle.jpg'],url:'https://www.everfulwholesale.com/es/products/mens-knights-templar-shield-cross-ring-bible-verse-evfp44q3qp'},
  {id:'p12',page:'anillo-cruz-martillada.html',name:'Anillo Cruz Martillada',price:84.99,desc:'Acero inoxidable · textura martillada y cruz dorada',image:'assets/catalog/ring-12-hammered-gold-cross-pro.jpg',gallery:['assets/catalog/ring-12-hammered-gold-cross-pro.jpg','assets/catalog/ring-12-hammered-gold-cross-detalle.jpg'],url:'https://www.everfulwholesale.com/es/products/mens-knights-templar-shield-cross-ring-bible-verse-evfp44q3qp'},
  {id:'p13',page:'anillo-iv-plus.html',name:'Anillo IV +',price:74.99,desc:'Acero inoxidable · inscripción IV y cruz',image:'assets/catalog/ring-13-roman-cross-pro.jpg',gallery:['assets/catalog/ring-13-roman-cross-pro.jpg','assets/catalog/ring-13-roman-cross-detalle.jpg'],url:'https://www.everfulwholesale.com/es/products/mens-knights-templar-shield-cross-ring-bible-verse-evfp44q3qp'},
  {id:'p14',page:'anillo-escudo-templario.html',name:'Anillo Escudo Templario',price:89.99,desc:'Acero inoxidable · escudo y cruz templaria',image:'assets/catalog/ring-14-templar-shield-pro.jpg',gallery:['assets/catalog/ring-14-templar-shield-pro.jpg','assets/catalog/ring-14-templar-shield-detalle.jpg'],url:'https://www.everfulwholesale.com/es/products/mens-knights-templar-shield-cross-ring-bible-verse-evfp44q3qp'},
  {id:'p15',page:'anillo-cruz-carbono.html',name:'Anillo Cruz Carbono',price:79.99,desc:'Acero inoxidable · acabado oscuro efecto carbono',image:'assets/catalog/ring-15-carbon-cross-pro.jpg',gallery:['assets/catalog/ring-15-carbon-cross-pro.jpg','assets/catalog/ring-15-carbon-cross-detalle.jpg'],url:'https://www.everfulwholesale.com/es/products/mens-knights-templar-shield-cross-ring-bible-verse-evfp44q3qp'},
  {id:'p1',name:'Anillo Cruz Clásico',price:69.99,desc:'Acero inoxidable · diseño cruz minimalista',image:'assets/catalog/ring-01-reference-pro.jpg',gallery:['assets/catalog/ring-01-reference-pro.jpg','assets/catalog/ring-01-reference-detalle.jpg'],url:'https://www.everfulwholesale.com/es/products/fashion-cross-stainless-steel-plating-rings',page:'anillo-cruz-clasico.html'},
  {id:'p2',page:'anillo-ichthys.html',name:'Anillo Ichthys',price:74.99,desc:'Acero inoxidable · símbolo cristiano del pez',finishes:['Negro con detalles plateados','Negro y dorado','Dorado','Azul con detalles dorados','Plateado'],image:'assets/image-proveedor-pendiente.svg',url:'https://www.everfulwholesale.com/es/products/cross-border-european-and-american-simple-stainless-steel-ring-halloween-jewelry-christmas-ornaments'},
  {id:'p3',page:'anillo-cruz-celta.html',name:'Anillo Cruz Celta',price:79.99,desc:'Acero inoxidable · relieve de cruz y motivos celtas',finishes:['Acero','Dorado','Negro'],image:'assets/image-proveedor-pendiente.svg',url:'https://www.everfulwholesale.com/es/products/basic-modern-style-classic-style-cross-304-stainless-steel-18k-gold-plated-mens-rings'},
  {id:'p4',page:'anillo-sello-vintage.html',name:'Anillo Sello Vintage',price:89.99,desc:'Acero inoxidable · estilo clásico',finishes:['Plateado','Dorado','Negro'],image:'assets/image-proveedor-pendiente.svg',url:'https://www.everfulwholesale.com/es/products/vintage-stainless-steel-cross-signet-ring-for-men-women-evfpz45nyv'},
];
const euro=n=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(n);
let cart=JSON.parse(localStorage.getItem('prov910_cart')||'[]');let authMode='login';
const $=s=>document.querySelector(s);
function renderProducts(){
 const search=$('#productSearch');
 if(!search) return;
 const query=search.value.trim().toLocaleLowerCase('es');
 const visible=products.filter(p=>`${p.name} ${p.desc}`.toLocaleLowerCase('es').includes(query));
 const pdfProducts=visible.filter(p=>/^p(5|6|7|8|9|10|11|12|13|14|15)$/.test(p.id));
 const otherProducts=visible.filter(p=>!/^p(5|6|7|8|9|10|11|12|13|14|15)$/.test(p.id));
 const card=p=>`<article class="product-card product-card-link"><a class="product-card-main" href="${p.page}" aria-label="Ver ${p.name}"><div class="product-photo"><img loading="lazy" src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('image-pending');this.parentElement.insertAdjacentHTML('beforeend','<span>Fotografía del proveedor pendiente</span>')"></div><h3>${p.name}</h3><p class="product-meta">${p.desc}</p><div class="product-price">${euro(p.price)}</div></a>${p.finishes?`<div class="product-card-finish"><label for="card-finish-${p.id}">ACABADO</label><select id="card-finish-${p.id}" class="card-finish-select" data-finish-card="${p.id}"><option value="">Selecciona un acabado</option>${p.finishes.map(x=>`<option value="${x}">${x}</option>`).join('')}</select></div>`:''}<a class="product-view-link" href="${p.page}">VER PRODUCTO <span aria-hidden="true">→</span></a></article>`;
 let html='';
 if(pdfProducts.length) html+=`<div class="product-group-heading"><p class="eyebrow">COLECCIÓN PRINCIPAL</p><h3>Los 11 diseños del catálogo</h3><p>Todos los modelos del PDF, cada uno con su fotografía propia.</p></div>${pdfProducts.map(card).join('')}`;
 if(otherProducts.length) html+=`<div class="product-group-heading secondary-group"><p class="eyebrow">OTROS MODELOS</p><h3>Modelos adicionales</h3><p>Productos de los enlaces iniciales del proveedor.</p></div>${otherProducts.map(card).join('')}`;
 $('#productGrid').innerHTML=html;
 $('#productSearchCount').textContent=query?`${visible.length} de ${products.length} diseños encontrados`:`${products.length} diseños disponibles`;
 $('#noProducts').classList.toggle('hidden',visible.length!==0);
 document.querySelectorAll('[data-finish-card]').forEach(sel=>{
   const id=sel.dataset.finishCard;
   try{const saved=sessionStorage.getItem('prov910_finish_'+id);if(saved)sel.value=saved;}catch(e){}
   sel.addEventListener('change',()=>{try{if(sel.value)sessionStorage.setItem('prov910_finish_'+id,sel.value);else sessionStorage.removeItem('prov910_finish_'+id);}catch(e){}});
 });
}
function saveCart(){localStorage.setItem('prov910_cart',JSON.stringify(cart));renderCart();}
function addToCart(id){const size=$('#size-'+id)?.value;if(!size){alert('Selecciona una talla antes de añadir el anillo.');return;}const p=products.find(x=>x.id===id);const variant=p?.finishes?$('#finish-'+id)?.value:'';if(p?.finishes&&!variant){alert('Selecciona un acabado antes de añadir el anillo.');return;}const item=cart.find(x=>x.id===id&&x.size===size&&(x.variant||'')===variant);if(item)item.qty++;else cart.push({id,size,variant,qty:1});saveCart();openCart();}
function renderCart(){const count=cart.reduce((a,x)=>a+x.qty,0);$('#cartCount').textContent=count;const host=$('#cartItems');if(!host)return;if(!cart.length){host.innerHTML='<p class="empty">Tu cesta está vacía.</p>';}else{host.innerHTML=cart.map((x,i)=>{const p=products.find(y=>y.id===x.id);if(!p)return '';return `<div class="cart-line"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>Talla ${x.size}${x.variant?` · Acabado ${x.variant}`:''} · Cantidad ${x.qty}</small><small>${euro(p.price*x.qty)}</small></div><button class="remove" data-remove="${i}">Quitar</button></div>`}).join('');host.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.remove,1);saveCart();});}$('#cartTotal').textContent=euro(cart.reduce((a,x)=>a+(products.find(p=>p.id===x.id)?.price||0)*x.qty,0));}
function openCart(){$('#cartDrawer').classList.remove('hidden');$('#scrim').classList.remove('hidden');}function closeCart(){$('#cartDrawer').classList.add('hidden');$('#scrim').classList.add('hidden');}
function showModal(id){const modal=$('#'+id);if(!modal)return;modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');}function hideModal(id){const modal=$('#'+id);if(!modal)return;modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');}
$('#cartBtn').onclick=openCart;$('#closeCart').onclick=closeCart;$('#scrim').onclick=closeCart;document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>hideModal(b.dataset.close));document.querySelector('a[href="#privacy"]').onclick=e=>{e.preventDefault();showModal('privacy')};document.querySelector('a[href="#terms"]').onclick=e=>{e.preventDefault();showModal('terms')};if($('#openLead'))$('#openLead').onclick=()=>showModal('leadModal');$('#accountBtn').onclick=()=>showModal('accountModal');$('#menuBtn').onclick=()=>$('#nav').classList.toggle('open');
if($('#contactForm'))$('#contactForm').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target);const subject=encodeURIComponent('Consulta desde la web PROV 9:10');const body=encodeURIComponent(`Nombre: ${d.get('name')}\nCorreo: ${d.get('email')}\n\n${d.get('message')}`);$('#contactMsg').textContent='Se abrirá tu aplicación de correo para enviar el mensaje.';location.href=`mailto:hola@prov910.com?subject=${subject}&body=${body}`;};
const leadForm=$('#leadForm');
if(leadForm) leadForm.addEventListener('submit',async e=>{
 e.preventDefault();
 const form=e.currentTarget, button=form.querySelector('button[type="submit"]'), result=$('#leadResult');
 if(!form.reportValidity()) return;
 const d=new FormData(form), name=String(d.get('name')||'').trim(), email=String(d.get('email')||'').trim();
 if(!name||!email){result.innerHTML='<div class="error">Completa tu nombre y correo electrónico.</div>';return;}
 button.disabled=true; button.textContent='Preparando tu guía…'; result.innerHTML='';
 try{
   if(sb){
     const {error}=await sb.from('leads').insert({name,email,consent:true});
     if(error) throw error;
     result.innerHTML='<div class="success">¡Gracias! Tu registro se ha guardado y ya puedes descargar la guía.</div>';
   }else{
     // Modo de demostración local: permite descargar la guía, pero no envía el correo a un servidor.
     try{localStorage.setItem('prov910_lead_preview',JSON.stringify({name,email,consent:true,createdAt:new Date().toISOString()}));}catch(storageError){}
     result.innerHTML='<div class="success">¡Gracias! Tu guía está lista. Nota: el registro queda guardado solo en este dispositivo; para recibir los correos en PROV 9:10 hay que conectar Supabase.</div>';
   }
   const link=document.createElement('a');link.className='btn btn-dark';link.style.marginTop='12px';link.href='assets/guia-prov910.pdf';link.download='Guia-PROV-9-10.pdf';link.textContent='Descargar mi guía PDF';result.appendChild(link);
   form.reset();
 }catch(err){result.innerHTML=`<div class="error">No se ha podido guardar el registro. ${String(err.message||'Inténtalo de nuevo.')}</div>`;}
 finally{button.disabled=false;button.innerHTML='Recibir mi guía gratuita <span aria-hidden="true">→</span>';}
});
function setAuthMode(mode){authMode=mode;$('#authTitle').textContent=mode==='login'?'Iniciar sesión':'Crear cuenta';$('#authSubmit').textContent=mode==='login'?'Iniciar sesión':'Crear cuenta';$('#authNameWrap').classList.toggle('hidden',mode==='login');$('#toggleAuth').textContent=mode==='login'?'¿No tienes cuenta? Crear cuenta':'¿Ya tienes cuenta? Iniciar sesión';}
$('#toggleAuth').onclick=()=>setAuthMode(authMode==='login'?'signup':'login');$('#authForm').onsubmit=async e=>{e.preventDefault();const form=e.currentTarget,button=$('#authSubmit');if(!sb){$('#authMessage').textContent='El acceso a cuentas todavía no está conectado. La ventana sigue disponible; configura Supabase siguiendo LEEME.';return;}const d=new FormData(form);button.disabled=true;$('#authMessage').textContent='Comprobando tus datos…';try{let result;if(authMode==='login')result=await sb.auth.signInWithPassword({email:d.get('email'),password:d.get('password')});else result=await sb.auth.signUp({email:d.get('email'),password:d.get('password'),options:{data:{name:d.get('name')}}});$('#authMessage').textContent=result.error?result.error.message:(authMode==='login'?'Sesión iniciada.':'Cuenta creada. Revisa tu correo para confirmar el registro.');if(!result.error&&authMode==='login'){ $('#guideAccess').classList.remove('hidden');$('#logoutBtn').classList.remove('hidden');}}catch(err){$('#authMessage').textContent='No se ha podido completar la operación. Comprueba tu conexión e inténtalo de nuevo.';}finally{button.disabled=false;}};
$('#logoutBtn').onclick=async()=>{await sb?.auth.signOut();$('#guideAccess').classList.add('hidden');$('#logoutBtn').classList.add('hidden');$('#authMessage').textContent='Has cerrado sesión.';};
if(sb){sb.auth.getSession().then(({data})=>{if(data.session){$('#guideAccess').classList.remove('hidden');$('#logoutBtn').classList.remove('hidden');}})}
$('#checkoutBtn').onclick=async()=>{if(!cart.length){$('#checkoutNote').textContent='Añade algún producto antes de continuar.';return;}if(!sb){$('#checkoutNote').textContent='Pago no activado: configura Supabase y Stripe siguiendo LEEME. No se realizará ningún cobro.';return;}$('#checkoutNote').textContent='Conectando con el sistema de pago…';const {data:{session}}=await sb.auth.getSession();if(!session){$('#checkoutNote').textContent='Inicia sesión o crea una cuenta antes de pagar.';showModal('accountModal');return;}const {data,error}=await sb.functions.invoke('create-checkout',{body:{items:cart}});if(error||!data?.url){$('#checkoutNote').textContent='No se ha podido iniciar el pago. Revisa la configuración de Stripe.';return;}location.href=data.url;};
function renderProductDetail(){
 const host=$('#productDetail'); if(!host) return;
 const id=document.body.dataset.productId||new URLSearchParams(location.search).get('id');
 const p=products.find(x=>x.id===id);
 if(!p){host.innerHTML='<div class="product-not-found"><p class="eyebrow">COLECCIÓN PROV 9:10</p><h1>Producto no encontrado</h1><a class="btn btn-dark" href="productos.html">Volver a productos</a></div>';return;}
 document.title=`${p.name} | PROV 9:10`;
 const gallery=(p.gallery&&p.gallery.length?p.gallery:[p.image]);
 host.innerHTML=`<a class="back-to-products" href="productos.html">← Volver a la colección</a><div class="detail-layout"><div class="detail-gallery"><div class="detail-photo"><img id="detailMainImage" src="${gallery[0]}" alt="${p.name}" onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('image-pending');this.parentElement.insertAdjacentHTML('beforeend','<span>Fotografía del proveedor pendiente</span>')"></div>${gallery.length>1?`<div class="detail-thumbnails" role="group" aria-label="Vistas del producto">${gallery.map((src,i)=>`<button class="detail-thumb ${i===0?'active':''}" type="button" data-gallery-src="${src}" aria-label="${i===0?'Vista principal':'Ver detalle'}"><img src="${src}" alt=""></button>`).join('')}</div>`:''}</div><div class="detail-info"><p class="eyebrow">PROV 9:10 · ANILLOS CON SIGNIFICADO</p><h1>${p.name}</h1><p class="detail-price">${euro(p.price)}</p><p class="detail-description">${p.desc}. Una pieza de estilo atemporal, pensada para llevar contigo un símbolo de aquello en lo que crees.</p><div class="detail-rule"></div>${p.finishes?`<label class="detail-size-label" for="finish-${p.id}">ELIGE EL ACABADO</label><select class="detail-size detail-finish" id="finish-${p.id}"><option value="">Selecciona un acabado</option>${p.finishes.map(x=>`<option value="${x}">${x}</option>`).join('')}</select><p class="finish-hint">Elige el acabado que prefieras para este diseño.</p>`:''}<label class="detail-size-label" for="size-${p.id}">ELIGE TU TALLA</label><select class="detail-size" id="size-${p.id}"><option value="">Selecciona una talla</option>${[16,17,18,19,20,21,22,23].map(x=>`<option value="${x}">${x}</option>`).join('')}</select><button class="btn btn-dark detail-add" data-add="${p.id}">AÑADIR A LA CESTA</button><p class="detail-note">Acero inoxidable · Diseño masculino · PROV 9:10</p><div class="detail-rule"></div><details class="detail-accordion"><summary>Detalles del producto</summary><p>${p.desc}. Consulta la disponibilidad de tallas y las características exactas antes de realizar tu pedido.</p></details><details class="detail-accordion"><summary>Envíos y devoluciones</summary><p>La información definitiva sobre plazos de envío, devoluciones y garantías se publicará cuando se confirme con el proveedor.</p></details></div></div><section class="product-reviews section" id="product-reviews"><div class="section-heading"><div><p class="eyebrow">OPINIONES DE CLIENTES</p><h2>Reseñas de este anillo</h2></div><a class="home-text-link" href="reviews.html">VER TODAS LAS RESEÑAS ↗</a></div><p class="reviews-status" id="productReviewsStatus">Cargando opiniones…</p><div class="reviews-list" id="productReviewsList"></div><form class="review-form product-review-form" id="productReviewForm"><h3>Deja tu reseña</h3><label>Tu nombre<input name="display_name" maxlength="50" required placeholder="Cómo quieres aparecer"></label><label>Valoración</label><div class="rating-input" role="radiogroup" aria-label="Valoración de 1 a 5 estrellas"><label><input type="radio" name="rating" value="1" required><span>★</span></label><label><input type="radio" name="rating" value="2"><span>★</span></label><label><input type="radio" name="rating" value="3"><span>★</span></label><label><input type="radio" name="rating" value="4"><span>★</span></label><label><input type="radio" name="rating" value="5"><span>★</span></label></div><label>Título<input name="title" maxlength="80" required placeholder="Resume tu experiencia"></label><label>Tu opinión<textarea name="body" rows="4" maxlength="1000" required placeholder="Cuéntanos qué te ha parecido…"></textarea></label><button class="btn btn-dark" type="submit">ENVIAR RESEÑA →</button><p class="form-note" id="productReviewMessage">Tu reseña se enviará a PROV 9:10 y podrá verla todo el mundo.</p></form></section>`;
 host.querySelectorAll('[data-gallery-src]').forEach(btn=>btn.addEventListener('click',()=>{
   const main=host.querySelector('#detailMainImage');
   if(main){main.style.opacity='0.35';setTimeout(()=>{main.src=btn.dataset.gallerySrc;main.style.opacity='1';},100);}
   host.querySelectorAll('.detail-thumb').forEach(x=>x.classList.toggle('active',x===btn));
 }));
 const finishSelect=host.querySelector(`#finish-${p.id}`);
 if(finishSelect){try{const saved=sessionStorage.getItem('prov910_finish_'+p.id);if(saved&&p.finishes.includes(saved))finishSelect.value=saved;}catch(e){} finishSelect.addEventListener('change',()=>{try{if(finishSelect.value)sessionStorage.setItem('prov910_finish_'+p.id,finishSelect.value);else sessionStorage.removeItem('prov910_finish_'+p.id);}catch(e){}});}
 const add=host.querySelector('[data-add]'); if(add)add.onclick=()=>addToCart(p.id);
}

// Transiciones discretas entre páginas y al abrir fichas de producto.
document.addEventListener('click',event=>{
 const link=event.target.closest('a[href]');
 if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target==='_blank'||link.hasAttribute('download'))return;
 const url=new URL(link.href,location.href);
 if(url.origin!==location.origin||url.pathname===location.pathname&&url.search===location.search||url.hash&&url.pathname===location.pathname)return;
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 event.preventDefault();
 document.documentElement.classList.add('page-leaving');
 window.setTimeout(()=>{location.href=url.href;},125);
});


// Reseñas compartidas: se conectan directamente al REST API de Supabase.
// Esto evita depender de que la librería supabase-js cargue para las reseñas.
async function initReviews(){
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const productId=document.body.dataset.productId||new URLSearchParams(location.search).get('id')||null;
 const globalList=document.querySelector('#reviewsList');
 const productList=document.querySelector('#productReviewsList');
 const form=globalList?document.querySelector('#reviewForm'):document.querySelector('#productReviewForm');
 const status=globalList?document.querySelector('#reviewsStatus'):document.querySelector('#productReviewsStatus');
 const message=globalList?document.querySelector('#reviewFormMessage'):document.querySelector('#productReviewMessage');
 const list=globalList||productList;
 if(!list||!status)return;
 const apiUrl=SUPABASE_URL.replace(/\/$/,'')+'/rest/v1/reviews';
 const headers={apikey:SUPABASE_ANON_KEY,Authorization:'Bearer '+SUPABASE_ANON_KEY,'Content-Type':'application/json'};
 const render=rows=>{
  if(!rows?.length){list.innerHTML='<div class="reviews-empty"><span>✧</span><h3>Aún no hay reseñas</h3><p>Cuando se comparta la primera opinión, aparecerá aquí.</p></div>';return;}
  list.innerHTML=rows.map(r=>`<article class="review-card"><div class="review-stars" aria-label="${Number(r.rating)} de 5 estrellas">${'★'.repeat(Math.max(0,Math.min(5,Number(r.rating)||0)))}${'☆'.repeat(5-Math.max(0,Math.min(5,Number(r.rating)||0)))}</div><h3>${esc(r.title)}</h3><p>${esc(r.body)}</p><div class="review-byline"><strong>${esc(r.display_name)}</strong><span>${new Date(r.created_at).toLocaleDateString('es-ES',{year:'numeric',month:'long'})}</span></div></article>`).join('');
 };
 const load=async()=>{
  status.textContent='Cargando reseñas…';
  const params=new URLSearchParams({select:'display_name,rating,title,body,created_at,product_id',status:'eq.approved',order:'created_at.desc',limit:'100'});
  if(productId)params.set('product_id','eq.'+productId);
  const response=await fetch(apiUrl+'?'+params.toString(),{headers});
  if(!response.ok){const detail=await response.text();throw new Error(`Supabase (${response.status}): ${detail.slice(0,260)}`);}
  const rows=await response.json();
  render(rows);
  status.textContent=productId?`${rows.length} reseñas de este anillo`:`${rows.length} reseñas publicadas`;
 };
 try{await load();}
 catch(err){console.error('PROV 9:10 reviews load error:',err);status.textContent='No se han podido cargar las reseñas. '+err.message;}
 if(form)form.addEventListener('submit',async e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const button=form.querySelector('button[type="submit"]');const d=new FormData(form);
  const payload={display_name:String(d.get('display_name')||'').trim(),rating:Number(d.get('rating')),title:String(d.get('title')||'').trim(),body:String(d.get('body')||'').trim(),product_id:productId||String(d.get('product_id')||'').trim()||null,status:'approved'};
  if(payload.display_name.length<2||payload.body.length<10||payload.title.length<2||payload.rating<1||payload.rating>5){message.textContent='Revisa los campos. La opinión debe tener un título y al menos 10 caracteres.';return;}
  button.disabled=true;button.textContent='GUARDANDO…';message.textContent='Enviando tu reseña…';
  try{
   const response=await fetch(apiUrl,{method:'POST',headers:{...headers,Prefer:'return=minimal'},body:JSON.stringify(payload)});
   if(!response.ok){const detail=await response.text();throw new Error(`Supabase (${response.status}): ${detail.slice(0,260)}`);}
   form.reset();message.textContent='¡Gracias! Tu reseña se ha publicado y ya puede verla todo el mundo.';
   await load();
  }catch(err){console.error('PROV 9:10 review submit error:',err);message.textContent='No se ha podido enviar la reseña. '+err.message;}
  finally{button.disabled=false;button.textContent='ENVIAR RESEÑA →';}
 });
}

$('#year').textContent=new Date().getFullYear();renderProducts();renderProductDetail();renderCart();initReviews();if($('#productSearch'))$('#productSearch').addEventListener('input',renderProducts);if($('#clearProductSearch'))$('#clearProductSearch').onclick=()=>{$('#productSearch').value='';renderProducts();$('#productSearch').focus();};
// Lead magnet: automatic first-visit popup, shown within the first five seconds.
try{if(!sessionStorage.getItem('prov910_lead_seen')){setTimeout(()=>{if(!sessionStorage.getItem('prov910_lead_seen')){showModal('leadModal');sessionStorage.setItem('prov910_lead_seen','1');}},2200);}}catch(e){setTimeout(()=>showModal('leadModal'),2200);}
// Mark the popup as seen when the visitor closes it manually.
document.querySelectorAll('[data-close="leadModal"]').forEach(b=>b.addEventListener('click',()=>{try{sessionStorage.setItem('prov910_lead_seen','1')}catch(e){}}));
if('serviceWorker'in navigator&&location.protocol.startsWith('http')){navigator.serviceWorker.register('./service-worker.js').then(()=>{navigator.serviceWorker.addEventListener('controllerchange',()=>{try{if(!sessionStorage.getItem('prov910_sw_reload_v9')){sessionStorage.setItem('prov910_sw_reload_v9','1');location.reload();}}catch(e){location.reload();}});}).catch(()=>{});}