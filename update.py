from pathlib import Path
import re, shutil, zipfile, json
root=Path('/mnt/data/workfix')
app=root/'app.js'; s=app.read_text()
# enrich products p2 p4 with actual available finishes as listed on Everful
s=s.replace("{id:'p2',name:'Anillo Ichthys',price:74.99,desc:'Acero inoxidable · símbolo cristiano del pez',image:","{id:'p2',name:'Anillo Ichthys',price:74.99,desc:'Acero inoxidable · símbolo cristiano del pez',finishes:['Negro con engranaje de plata','Negro dorado','Oro con engranaje de oro','Azul con engranaje de oro','Base de plata placa de plata'],image:")
s=s.replace("{id:'p4',name:'Anillo Sello Vintage',price:89.99,desc:'Acero inoxidable · estilo clásico',image:","{id:'p4',name:'Anillo Sello Vintage',price:89.99,desc:'Acero inoxidable · estilo clásico',finishes:['Plateado','Dorado','Negro'],image:")
# product links now use distinct html page per item
s=s.replace("url:'https://www.everfulwholesale.com/es/products/fashion-cross-stainless-steel-plating-rings'},","url:'https://www.everfulwholesale.com/es/products/fashion-cross-stainless-steel-plating-rings',page:'anillo-cruz-clasico.html'},")
# add page slugs for all product objects after URL property by product id in safe postprocessing
slugs=['anillo-cruz-clasico','anillo-ichthys','anillo-cruz-dorada','anillo-sello-vintage','anillo-cruz-jerusalen','anillo-cruz-ancha','anillo-corona-espinas','anillo-ichthys-plata','anillo-cruz-trenzada','anillo-alfa-omega','anillo-padre-nuestro','anillo-cruz-martillada','anillo-iv-plus','anillo-escudo-templario','anillo-cruz-carbono']
for i,slug in enumerate(slugs,1):
    # inject page property in object after id field
    s=s.replace(f"{{id:'p{i}',",f"{{id:'p{i}',page:'{slug}.html',")
# cards link to page not query
s=s.replace('href="producto.html?id=${encodeURIComponent(p.id)}"','href="${p.page}"')
# add finish selector to addToCart; avoid variant for others
s=s.replace("function addToCart(id){const size=$('#size-'+id)?.value;if(!size){alert('Selecciona una talla antes de añadir el anillo.');return;}const item=cart.find(x=>x.id===id&&x.size===size);if(item)item.qty++;else cart.push({id,size,qty:1});saveCart();openCart();}","function addToCart(id){const size=$('#size-'+id)?.value;if(!size){alert('Selecciona una talla antes de añadir el anillo.');return;}const p=products.find(x=>x.id===id);const variant=p?.finishes?$('#finish-'+id)?.value:'';if(p?.finishes&&!variant){alert('Selecciona un acabado antes de añadir el anillo.');return;}const item=cart.find(x=>x.id===id&&x.size===size&&(x.variant||'')===variant);if(item)item.qty++;else cart.push({id,size,variant,qty:1});saveCart();openCart();}")
# cart line show finish and distinct cart matching
s=s.replace("<small>Talla ${x.size} · Cantidad ${x.qty}</small>","<small>Talla ${x.size}${x.variant?` · Acabado ${x.variant}`:''} · Cantidad ${x.qty}</small>")
# renderProductDetail read body id and build finish selector
s=s.replace("const id=new URLSearchParams(location.search).get('id');","const id=document.body.dataset.productId||new URLSearchParams(location.search).get('id');")
s=s.replace("<label class=\"detail-size-label\" for=\"size-${p.id}\">ELIGE TU TALLA</label><select class=\"detail-size\" id=\"size-${p.id}\"><option value=\"\">Selecciona una talla</option>${[16,17,18,19,20,21,22,23].map(x=>`<option value=\"${x}\">${x}</option>`).join('')}</select><button", "${p.finishes?`<label class=\"detail-size-label\" for=\"finish-${p.id}\">ELIGE EL ACABADO</label><select class=\"detail-size detail-finish\" id=\"finish-${p.id}\"><option value=\"\">Selecciona un acabado</option>${p.finishes.map(x=>`<option value=\"${x}\">${x}</option>`).join('')}</select><p class=\"finish-hint\">Elige el acabado que prefieras para este diseño.</p>`:''}<label class=\"detail-size-label\" for=\"size-${p.id}\">ELIGE TU TALLA</label><select class=\"detail-size\" id=\"size-${p.id}\"><option value=\"\">Selecciona una talla</option>${[16,17,18,19,20,21,22,23].map(x=>`<option value=\"${x}\">${x}</option>`).join('')}</select><button")
app.write_text(s)
# checkout catalogue variants
f=root/'supabase/functions/create-checkout/index.ts'; t=f.read_text()
t=t.replace('p2:{name:"Anillo Ichthys",price:7499},','p2:{name:"Anillo Ichthys",price:7499,variants:["Negro con engranaje de plata","Negro dorado","Oro con engranaje de oro","Azul con engranaje de oro","Base de plata placa de plata"]},')
t=t.replace('p4:{name:"Anillo Sello Vintage",price:8999},','p4:{name:"Anillo Sello Vintage",price:8999,variants:["Plateado","Dorado","Negro"]},')
t=t.replace('if(!p||!/^[0-9]{2}$/.test(size)) throw new Error("Producto o talla no válidos.");','if(!p||!/^[0-9]{2}$/.test(size)) throw new Error("Producto o talla no válidos.");\n   if(p.variants && !p.variants.includes(variant)) throw new Error("Acabado no válido para este producto.");\n   if(!p.variants && item.variant) throw new Error("Este producto no tiene selector de acabado.");')
f.write_text(t)
# create actual separate HTML product pages based on generic template
base=(root/'producto.html').read_text()
for i,slug in enumerate(slugs,1):
    page=base.replace('<body data-page="producto">',f'<body data-page="producto" data-product-id="p{i}">')
    page=page.replace('<title>Producto | PROV 9:10</title>',f'<title>{slug.replace("-"," ").title()} | PROV 9:10</title>')
    (root/f'{slug}.html').write_text(page)
# css for finish field spacing
css=root/'styles.css'; c=css.read_text(); c += '\n/* Selector de acabado en fichas de producto */\n.detail-finish{margin-bottom:10px}.finish-hint{font-size:11px;color:#77736c;margin:0 0 22px;line-height:1.6}\n'
css.write_text(c)
# service worker cache update and all pages
sw=root/'service-worker.js'; w=sw.read_text()
w=re.sub(r"const CACHE_NAME\s*=\s*['\"][^'\"]+['\"]", "const CACHE_NAME = 'prov910-store-v5-product-pages-finishes'", w)
# inspect cache paths and append pages to precache array if simple
m=re.search(r'(const\s+ASSETS\s*=\s*\[)(.*?)(\];)',w,re.S)
if m:
    additions=''.join(f", './{slug}.html'" for slug in slugs)
    w=w[:m.start(2)]+m.group(2)+additions+w[m.end(2):]
sw.write_text(w)
# README add info
read=root/'LEEME.txt'; r=read.read_text(); r+='\n\nFICHAS INDIVIDUALES Y ACABADOS\nLa tienda incluye una página HTML independiente para cada uno de los 15 productos. Las fichas se abren desde las tarjetas del catálogo. Los modelos Anillo Sello Vintage y Anillo Ichthys tienen selector de acabado; la elección se conserva en la cesta y se transmite al checkout. Los acabados se han tomado de las opciones de producto visibles en Everful. Confirma disponibilidad y equivalencia exacta de SKU antes de vender.\n'; read.write_text(r)
# remove generic page template not linked? keep for fallback
