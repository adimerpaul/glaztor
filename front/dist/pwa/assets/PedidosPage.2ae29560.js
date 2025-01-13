import{R as a,$ as r,U as d,T as n,aD as Q,a1 as u,W as o,aC as g,aA as _,aB as c,X as y,V,a0 as v,Y as f,Z as s,aE as z,M as x,a2 as B,aF as w}from"./index.e95100ec.js";import{Q as A}from"./QImg.96d15c3f.js";import{Q as P}from"./QSpace.5ba5662b.js";import{Q as C}from"./QSelect.b493f8f7.js";import{Q as k}from"./QMarkupTable.92a4f163.js";import{Q as T}from"./QPage.a2881a74.js";import{Q as D}from"./QForm.c582a3d7.js";import{C as q}from"./ClosePopup.c6d1387a.js";import{h as U}from"./moment.40bc58bf.js";import{_ as F}from"./plugin-vue_export-helper.21dcd24c.js";import"./format.39f6ce55.js";const S={name:"Pedidos",data(){return{loading:!1,filter:"",clientes:[],clientesAll:[],productos:[],productosAll:[],zonas:[],sales:[],pedido:{},dialogPedido:!1}},mounted(){this.getClientes(),this.getProductos(),this.getZonas()},methods:{getZonas(){this.$axios.get("zonas").then(t=>{this.zonas=t.data}).catch(t=>{console.log(t)})},filterClientes(t,l){if(t===""){l(()=>{this.clientes=this.clientesAll});return}const h=t.toLowerCase();l(()=>{this.clientes=this.clientesAll.filter(b=>b.nombre_cliente.toLowerCase().indexOf(h)>-1)})},submit(){this.loading=!0,this.$axios.post("pedidos",{...this.pedido,detalles:this.sales.map(t=>({id:t.producto.id,cantidadVenta:t.cantidadVenta,precioVenta:t.precioVenta,tipo_pro:t.tipo_pro}))}).then(t=>{this.$alert.success("Pedido guardado"),this.dialogPedido=!1,this.sales=[],this.$router.push("/pedidos")}).catch(t=>{console.log(t),this.$alert.error(t.response.data.message)}).finally(()=>{this.loading=!1})},dialogPedidoClick(){if(this.sales.length===0)return this.$alert.error("No hay productos en el carrito"),!1;this.dialogPedido=!0,this.pedido={fecha_hora:U().format("YYYY-MM-DD"),nombre_factura:"",nit_factura:"",contacto:"",direccion:"",telefono:"",telefono2:"",fecha_pago:U().format("YYYY-MM-DD"),observacion:""}},changeDirecionTelefono(){const t=this.clientes.find(l=>l.id===this.pedido.cliente_id);this.pedido.direccion=t.direccion,this.pedido.telefono=t.telefono_1,this.pedido.telefono2=t.telefono_2,this.pedido.contacto=t.nombre_cliente},agregarProducto(t){if(parseInt(t.cantidad_pro)===0)return this.$alert.error("Producto sin stock"),!1;const h=this.sales.findIndex(b=>b.producto.id===t.id);h!==-1?this.sales[h].cantidadVenta+=1:this.sales.push({producto:t,cantidadVenta:1,precioVenta:t.precio_pro,tipo_pro:"BA"})},filterProductos(){this.productos=this.productosAll.filter(t=>t.nombre_pro.toLowerCase().includes(this.filter.toLowerCase())||t.marca_pro.toLowerCase().includes(this.filter.toLowerCase()))},getProductos(){this.$axios.get("productos").then(t=>{this.productos=t.data,this.productosAll=t.data}).catch(t=>{console.log(t)})},getClientes(){this.$axios.get("clientes").then(t=>{this.clientes=t.data,this.clientesAll=t.data}).catch(t=>{console.log(t)})}},computed:{esMovil(){return this.$q.screen.lt.md},totalVenta(){let t=0;return this.sales.forEach(l=>{l.tipo_pro==="BA"?t+=l.cantidadVenta*l.precioVenta:t+=l.cantidadVenta*l.precioVenta*l.producto.tonelada}),t}}},Y={class:"row"},L={class:"col-12 col-md-7 q-pa-xs"},M={class:"row"},N={class:"col-12"},I={class:"absolute-bottom",style:{padding:"0",margin:"0"}},R={class:"row items-center",style:{"font-size":"9px"}},Z={style:{display:"flex","justify-content":"space-between","font-size":"12px"}},E={class:"col-12 col-md-5 q-pa-xs"},O={class:"row items-center"},j=o("thead",null,[o("tr",null,[o("th",null,"Producto"),o("th",null,"Tipo"),o("th",null,"Cant."),o("th",null,"Cant. Real"),o("th",null,"Precio"),o("th",null,"Subtotal")])],-1),G=["onUpdate:modelValue"],W=["onUpdate:modelValue"],X=o("td",{colspan:"3",class:"text-right text-bold"},"Total",-1),H={class:"text-bold"},J={colspan:"4"},K={class:"row items-center"},$=o("div",{class:"text-h6"},"Realizar pedido",-1),ee={class:"row"},oe={class:"col-12 col-md-6"},te={class:"col-12 col-md-6"},le={class:"col-12 col-md-3"},de={class:"col-12 col-md-3"},ie={class:"col-12 col-md-3"},ne={class:"col-12 col-md-3"},se={class:"col-12 col-md-4"},ae={class:"col-12 col-md-4"},re={class:"col-12 col-md-4"},ce={class:"col-12"},ue={class:"col-12"},pe=o("thead",null,[o("tr",null,[o("th",null,"Producto"),o("th",null,"Cantidad"),o("th",null,"Precio"),o("th",null,"Subtotal")])],-1),me=o("td",{colspan:"3",class:"text-right"},"Total",-1),fe={class:"text-bold"};function he(t,l,h,b,i,p){return a(),r(u,null,[d(T,{class:"bg-grey-3 q-pa-xs"},{default:n(()=>[o("div",Y,[o("div",L,[d(g,{flat:"",bordered:""},{default:n(()=>[d(_,{class:"q-pa-xs"},{default:n(()=>[o("div",M,[o("div",N,[d(c,{modelValue:i.filter,"onUpdate:modelValue":[l[1]||(l[1]=e=>i.filter=e),p.filterProductos],filled:"",standout:"",placeholder:"Buscar producto",dense:"",clearable:""},{prepend:n(()=>[d(y,{name:"search"})]),before:n(()=>[d(V,{flat:"",round:"",dense:"",icon:"arrow_back",onClick:l[0]||(l[0]=e=>this.$router.push("/pedidos"))})]),_:1},8,["modelValue","onUpdate:modelValue"])]),(a(!0),r(u,null,v(i.productos,e=>(a(),r("div",{class:"col-4 col-md-3",key:e.id},[d(g,{flat:"",bordered:"",class:"q-ma-xs cursor-pointer",onClick:m=>p.agregarProducto(e)},{default:n(()=>[d(_,{class:"q-pa-none"},{default:n(()=>[d(A,{src:t.$url+".."+e.foto_pro,alt:e.nombre_pro,class:"full-width",style:{height:"130px"}},{default:n(()=>[o("div",I,[o("div",R,[o("div",null,s(e.nombre_pro),1),o("div",null,s(e.marca_pro),1)]),o("div",Z,[o("div",null,s(e.precio_pro)+" Bs. ",1),o("div",{class:B("text-bold "+(e.cantidad_pro=="0"?"text-negative":"text-positive"))},s(e.cantidad_pro),3)])])]),_:2},1032,["src","alt"])]),_:2},1024)]),_:2},1032,["onClick"])]))),128))])]),_:1})]),_:1})]),o("div",E,[d(g,{flat:"",bordered:""},{default:n(()=>[d(_,{class:"q-pa-xs"},{default:n(()=>[o("div",O,[f(" Carrito de compras "),d(P),d(V,{dense:"",flat:"",color:"red",icon:"delete",label:"Limpiar",onClick:l[2]||(l[2]=e=>i.sales=[]),"no-caps":""})]),d(k,{dense:"",flat:"",bordered:"","wrap-cells":""},{default:n(()=>[j,o("tbody",null,[(a(!0),r(u,null,v(i.sales,e=>(a(),r("tr",{key:e.producto.id},[o("td",null,[d(y,{name:"delete",onClick:m=>i.sales.splice(i.sales.indexOf(e),1),class:"cursor-pointer",color:"red"},null,8,["onClick"]),f(" "+s(e.producto.nombre_pro)+" "+s(e.producto.marca_pro),1)]),o("td",null,[d(C,{modelValue:e.tipo_pro,"onUpdate:modelValue":m=>e.tipo_pro=m,filled:"",dense:"",options:["BA","TN"]},null,8,["modelValue","onUpdate:modelValue"])]),o("td",null,[x(o("input",{"onUpdate:modelValue":m=>e.cantidadVenta=m,type:"number",style:{width:"50px"},filled:""},null,8,G),[[w,e.cantidadVenta]])]),o("td",null,[e.tipo_pro=="BA"?(a(),r(u,{key:0},[f(s(e.cantidadVenta),1)],64)):(a(),r(u,{key:1},[f(s(e.cantidadVenta*e.producto.tonelada),1)],64))]),o("td",null,[x(o("input",{"onUpdate:modelValue":m=>e.precioVenta=m,type:"number",style:{width:"70px"},filled:""},null,8,W),[[w,e.precioVenta]])]),o("td",null,[e.tipo_pro=="BA"?(a(),r(u,{key:0},[f(s((e.cantidadVenta*e.precioVenta).toFixed(2)),1)],64)):(a(),r(u,{key:1},[f(s((e.cantidadVenta*e.precioVenta*e.producto.tonelada).toFixed(2)),1)],64))])]))),128))]),o("tfoot",null,[o("tr",null,[X,o("td",H,[i.sales.length>0?(a(),r(u,{key:0},[f(s(p.totalVenta)+" Bs ",1)],64)):z("",!0)])]),o("tr",null,[o("td",J,[d(V,{"no-caps":"",class:"full-width",icon:"save",color:"positive",label:"Realizar pedido",onClick:p.dialogPedidoClick},null,8,["onClick"])])])])]),_:1})]),_:1})]),_:1})])])]),_:1}),d(Q,{modelValue:i.dialogPedido,"onUpdate:modelValue":l[14]||(l[14]=e=>i.dialogPedido=e)},{default:n(()=>[d(g,{style:{width:"650px","max-width":"90vw"}},{default:n(()=>[d(_,{class:"bg-primary text-white q-pb-none"},{default:n(()=>[o("div",K,[$,d(P),x(d(V,{flat:"",round:"",dense:"",icon:"close"},null,512),[[q]])])]),_:1}),d(_,{class:"q-mt-none"},{default:n(()=>[d(D,{onSubmit:p.submit},{default:n(()=>[o("div",ee,[o("div",oe,[d(C,{modelValue:i.pedido.cliente_id,"onUpdate:modelValue":[l[3]||(l[3]=e=>i.pedido.cliente_id=e),p.changeDirecionTelefono],onFilter:p.filterClientes,rules:[e=>!!e||"Seleccione un cliente"],filled:"","emit-value":"","map-options":"",standout:"","use-input":"",label:"Cliente",options:i.clientes,"option-value":"id","option-label":"nombre_cliente",dense:"",clearable:""},null,8,["modelValue","onFilter","onUpdate:modelValue","rules","options"])]),o("div",te,[d(c,{modelValue:i.pedido.direccion,"onUpdate:modelValue":l[4]||(l[4]=e=>i.pedido.direccion=e),filled:"",standout:"",label:"Direcci\xF3n",dense:"",hint:""},null,8,["modelValue"])]),o("div",le,[d(c,{modelValue:i.pedido.telefono,"onUpdate:modelValue":l[5]||(l[5]=e=>i.pedido.telefono=e),filled:"",standout:"",label:"Tel\xE9fono",dense:"",hint:""},null,8,["modelValue"])]),o("div",de,[d(c,{modelValue:i.pedido.telefono2,"onUpdate:modelValue":l[6]||(l[6]=e=>i.pedido.telefono2=e),filled:"",standout:"",label:"Tel\xE9fono 2",dense:"",hint:""},null,8,["modelValue"])]),o("div",ie,[d(c,{modelValue:i.pedido.fecha_hora,"onUpdate:modelValue":l[7]||(l[7]=e=>i.pedido.fecha_hora=e),filled:"",standout:"",label:"Fecha Pedido",type:"date",dense:""},null,8,["modelValue"])]),o("div",ne,[d(c,{modelValue:i.pedido.nombre_factura,"onUpdate:modelValue":l[8]||(l[8]=e=>i.pedido.nombre_factura=e),filled:"",standout:"",label:"Nombre factura",dense:"",hint:""},null,8,["modelValue"])]),o("div",se,[d(c,{modelValue:i.pedido.nit_factura,"onUpdate:modelValue":l[9]||(l[9]=e=>i.pedido.nit_factura=e),filled:"",standout:"",label:"NIT factura",dense:"",hint:""},null,8,["modelValue"])]),o("div",ae,[d(c,{modelValue:i.pedido.fecha_pago,"onUpdate:modelValue":l[10]||(l[10]=e=>i.pedido.fecha_pago=e),filled:"",type:"date",standout:"",label:"Fecha de pago",dense:""},null,8,["modelValue"])]),o("div",re,[d(C,{modelValue:i.pedido.zona_id,"onUpdate:modelValue":l[11]||(l[11]=e=>i.pedido.zona_id=e),filled:"",standout:"",label:"Zona",options:i.zonas,"option-value":"nombre_zona","option-label":"nombre_zona","emit-value":"","map-options":"",rules:[e=>!!e||"Seleccione una zona"],dense:""},null,8,["modelValue","options","rules"])]),o("div",ce,[d(c,{modelValue:i.pedido.contacto,"onUpdate:modelValue":l[12]||(l[12]=e=>i.pedido.contacto=e),filled:"",standout:"",label:"Contacto",dense:"",hint:""},null,8,["modelValue"])]),o("div",ue,[d(c,{modelValue:i.pedido.observacion,"onUpdate:modelValue":l[13]||(l[13]=e=>i.pedido.observacion=e),filled:"",standout:"",label:"Observaci\xF3n",dense:"",hint:""},null,8,["modelValue"])])]),d(k,{dense:"",flat:"",bordered:"","wrap-cells":""},{default:n(()=>[pe,o("tbody",null,[(a(!0),r(u,null,v(i.sales,e=>(a(),r("tr",{key:e.producto.id},[o("td",null,s(e.producto.nombre_pro),1),o("td",null,s(e.cantidadVenta),1),o("td",null,s(e.precioVenta),1),o("td",null,s((e.cantidadVenta*e.precioVenta).toFixed(2)),1)]))),128))]),o("tfoot",null,[o("tr",null,[me,o("td",fe,s(p.totalVenta)+" Bs ",1)])])]),_:1}),d(V,{loading:i.loading,"no-caps":"",class:"full-width",icon:"save",color:"positive",label:"Guardar pedido",type:"submit"},null,8,["loading"])]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}var Ue=F(S,[["render",he]]);export{Ue as default};
