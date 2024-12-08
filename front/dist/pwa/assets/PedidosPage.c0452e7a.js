import{O as c,Y as u,R as t,Q as i,ax as U,_ as h,T as o,ay as _,az as m,aA as n,U as x,Z as g,V,S as b,W as r,J as Q}from"./index.998bd65e.js";import{Q as k}from"./QImg.21004dd7.js";import{Q as C,a as z}from"./QForm.b755ba32.js";import{Q as P}from"./QMarkupTable.f774539a.js";import{Q as S}from"./QPage.369d1f0c.js";import{Q as w}from"./QSelect.16d28045.js";import{C as q}from"./ClosePopup.41fa9c67.js";import{h as y}from"./moment.40bc58bf.js";import{_ as D}from"./plugin-vue_export-helper.21dcd24c.js";const F={name:"Pedidos",data(){return{loading:!1,filter:"",clientes:[],clientesAll:[],productos:[],productosAll:[],zonas:[],sales:[],pedido:{},dialogPedido:!1}},mounted(){this.getClientes(),this.getProductos(),this.getZonas()},methods:{getZonas(){this.$axios.get("zonas").then(d=>{this.zonas=d.data}).catch(d=>{console.log(d)})},filterClientes(d,s){if(d===""){s(()=>{this.clientes=this.clientesAll});return}const f=d.toLowerCase();s(()=>{this.clientes=this.clientesAll.filter(v=>v.nombre_cliente.toLowerCase().indexOf(f)>-1)})},submit(){this.loading=!0,this.$axios.post("pedidos",{...this.pedido,detalles:this.sales.map(d=>({id:d.producto.id,cantidadVenta:d.cantidadVenta,precioVenta:d.precioVenta}))}).then(d=>{this.$alert.success("Pedido guardado"),this.dialogPedido=!1,this.sales=[]}).catch(d=>{console.log(d)}).finally(()=>{this.loading=!1})},dialogPedidoClick(){if(this.sales.length===0)return this.$alert.error("No hay productos en el carrito"),!1;this.dialogPedido=!0,this.pedido={fecha_hora:y().format("YYYY-MM-DD"),nombre_factura:"",nit_factura:"",contacto:"",direccion:"",telefono:"",telefono2:"",fecha_pago:y().format("YYYY-MM-DD"),observacion:""}},changeDirecionTelefono(){const d=this.clientes.find(s=>s.id===this.pedido.cliente_id);this.pedido.direccion=d.direccion,this.pedido.telefono=d.telefono_1,this.pedido.telefono2=d.telefono_2,this.pedido.contacto=d.nombre_cliente},agregarProducto(d){const s=this.sales.findIndex(f=>f.producto.id===d.id);s!==-1?this.sales[s].cantidadVenta+=1:this.sales.push({producto:d,cantidadVenta:1,precioVenta:d.precio_pro})},filterProductos(){this.productos=this.productosAll.filter(d=>d.nombre_pro.toLowerCase().includes(this.filter.toLowerCase()))},getProductos(){this.$axios.get("productos").then(d=>{this.productos=d.data,this.productosAll=d.data}).catch(d=>{console.log(d)})},getClientes(){this.$axios.get("clientes").then(d=>{this.clientes=d.data,this.clientesAll=d.data}).catch(d=>{console.log(d)})}},computed:{esMovil(){return this.$q.screen.lt.md}}},T={class:"row"},Y={class:"col-12 col-md-8 q-pa-xs"},A={class:"row"},B={class:"col-12"},L={class:"absolute-bottom text-subtitle2 text-center",style:{padding:"0"}},M=o("br",null,null,-1),N={class:"col-12 col-md-4 q-pa-xs"},I={class:"row items-center"},O=o("thead",null,[o("tr",null,[o("th",null,"Producto"),o("th",null,"Cantidad"),o("th",null,"Precio"),o("th",null,"Subtotal")])],-1),Z=o("td",{colspan:"3",class:"text-right"},"Total",-1),R={class:"text-bold"},E={colspan:"4"},G={class:"row items-center"},J=o("div",{class:"text-h6"},"Realizar pedido",-1),W={class:"row"},j={class:"col-12 col-md-6"},H={class:"col-12 col-md-6"},K={class:"col-12 col-md-3"},X={class:"col-12 col-md-3"},$={class:"col-12 col-md-3"},ee={class:"col-12 col-md-3"},oe={class:"col-12 col-md-4"},le={class:"col-12 col-md-4"},te={class:"col-12 col-md-4"},de={class:"col-12"},se={class:"col-12"},ie=o("thead",null,[o("tr",null,[o("th",null,"Producto"),o("th",null,"Cantidad"),o("th",null,"Precio"),o("th",null,"Subtotal")])],-1),ne=o("td",{colspan:"3",class:"text-right"},"Total",-1),ae={class:"text-bold"};function re(d,s,f,v,l,p){return c(),u(h,null,[t(S,{class:"bg-grey-3 q-pa-xs"},{default:i(()=>[o("div",T,[o("div",Y,[t(_,{flat:"",bordered:""},{default:i(()=>[t(m,{class:"q-pa-xs"},{default:i(()=>[o("div",A,[o("div",B,[t(n,{modelValue:l.filter,"onUpdate:modelValue":[s[0]||(s[0]=e=>l.filter=e),p.filterProductos],filled:"",standout:"",placeholder:"Buscar producto",dense:"",clearable:""},{prepend:i(()=>[t(x,{name:"search"})]),_:1},8,["modelValue","onUpdate:modelValue"])]),(c(!0),u(h,null,g(l.productos,e=>(c(),u("div",{class:"col-6 col-md-3",key:e.id},[t(_,{flat:"",bordered:"",class:"q-ma-xs cursor-pointer",onClick:a=>p.agregarProducto(e)},{default:i(()=>[t(m,{class:"q-pa-none"},{default:i(()=>[t(k,{src:d.$url+".."+e.foto_pro,alt:e.nombre_pro,class:"full-width"},{default:i(()=>[o("div",L,[V(r(e.nombre_pro)+" ",1),M,V(" "+r(e.precio_pro)+" Bs. ",1)])]),_:2},1032,["src","alt"])]),_:2},1024)]),_:2},1032,["onClick"])]))),128))])]),_:1})]),_:1})]),o("div",N,[t(_,{flat:"",bordered:""},{default:i(()=>[t(m,{class:"q-pa-xs"},{default:i(()=>[o("div",I,[V(" Carrito de compras "),t(C),t(b,{dense:"",flat:"",color:"red",icon:"delete",label:"Limpiar",onClick:s[1]||(s[1]=e=>l.sales=[]),"no-caps":""})]),t(P,{dense:"",flat:"",bordered:"","wrap-cells":""},{default:i(()=>[O,o("tbody",null,[(c(!0),u(h,null,g(l.sales,e=>(c(),u("tr",{key:e.producto.id},[o("td",null,[t(x,{name:"delete",onClick:a=>l.sales.splice(l.sales.indexOf(e),1),class:"cursor-pointer",color:"red"},null,8,["onClick"]),V(" "+r(e.producto.nombre_pro),1)]),o("td",null,[t(n,{modelValue:e.cantidadVenta,"onUpdate:modelValue":a=>e.cantidadVenta=a,type:"number",dense:"",style:{width:"50px"},filled:""},null,8,["modelValue","onUpdate:modelValue"])]),o("td",null,[t(n,{modelValue:e.precioVenta,"onUpdate:modelValue":a=>e.precioVenta=a,type:"number",dense:"",style:{width:"70px"},filled:""},null,8,["modelValue","onUpdate:modelValue"])]),o("td",null,r((e.cantidadVenta*e.precioVenta).toFixed(2)),1)]))),128))]),o("tfoot",null,[o("tr",null,[Z,o("td",R,r(l.sales.reduce((e,a)=>e+a.cantidadVenta*a.precioVenta,0).toFixed(2)),1)]),o("tr",null,[o("td",E,[t(b,{"no-caps":"",class:"full-width",icon:"save",color:"positive",label:"Realizar pedido",onClick:p.dialogPedidoClick},null,8,["onClick"])])])])]),_:1})]),_:1})]),_:1})])])]),_:1}),t(U,{modelValue:l.dialogPedido,"onUpdate:modelValue":s[13]||(s[13]=e=>l.dialogPedido=e)},{default:i(()=>[t(_,{style:{width:"650px","max-width":"90vw"}},{default:i(()=>[t(m,{class:"bg-primary text-white q-pb-none"},{default:i(()=>[o("div",G,[J,t(C),Q(t(b,{flat:"",round:"",dense:"",icon:"close"},null,512),[[q]])])]),_:1}),t(m,{class:"q-mt-none"},{default:i(()=>[t(z,{onSubmit:p.submit},{default:i(()=>[o("div",W,[o("div",j,[t(w,{modelValue:l.pedido.cliente_id,"onUpdate:modelValue":[s[2]||(s[2]=e=>l.pedido.cliente_id=e),p.changeDirecionTelefono],onFilter:p.filterClientes,rules:[e=>!!e||"Seleccione un cliente"],filled:"","emit-value":"","map-options":"",standout:"","use-input":"",label:"Cliente",options:l.clientes,"option-value":"id","option-label":"nombre_cliente",dense:"",clearable:""},null,8,["modelValue","onFilter","onUpdate:modelValue","rules","options"])]),o("div",H,[t(n,{modelValue:l.pedido.direccion,"onUpdate:modelValue":s[3]||(s[3]=e=>l.pedido.direccion=e),filled:"",standout:"",label:"Direcci\xF3n",dense:"",hint:""},null,8,["modelValue"])]),o("div",K,[t(n,{modelValue:l.pedido.telefono,"onUpdate:modelValue":s[4]||(s[4]=e=>l.pedido.telefono=e),filled:"",standout:"",label:"Tel\xE9fono",dense:"",hint:""},null,8,["modelValue"])]),o("div",X,[t(n,{modelValue:l.pedido.telefono2,"onUpdate:modelValue":s[5]||(s[5]=e=>l.pedido.telefono2=e),filled:"",standout:"",label:"Tel\xE9fono 2",dense:"",hint:""},null,8,["modelValue"])]),o("div",$,[t(n,{modelValue:l.pedido.fecha_hora,"onUpdate:modelValue":s[6]||(s[6]=e=>l.pedido.fecha_hora=e),filled:"",standout:"",label:"Fecha Pedido",type:"date",dense:""},null,8,["modelValue"])]),o("div",ee,[t(n,{modelValue:l.pedido.nombre_factura,"onUpdate:modelValue":s[7]||(s[7]=e=>l.pedido.nombre_factura=e),filled:"",standout:"",label:"Nombre factura",dense:"",hint:""},null,8,["modelValue"])]),o("div",oe,[t(n,{modelValue:l.pedido.nit_factura,"onUpdate:modelValue":s[8]||(s[8]=e=>l.pedido.nit_factura=e),filled:"",standout:"",label:"NIT factura",dense:"",hint:""},null,8,["modelValue"])]),o("div",le,[t(n,{modelValue:l.pedido.fecha_pago,"onUpdate:modelValue":s[9]||(s[9]=e=>l.pedido.fecha_pago=e),filled:"",type:"date",standout:"",label:"Fecha de pago",dense:""},null,8,["modelValue"])]),o("div",te,[t(w,{modelValue:l.pedido.zona_id,"onUpdate:modelValue":s[10]||(s[10]=e=>l.pedido.zona_id=e),filled:"",standout:"",label:"Zona",options:l.zonas,"option-value":"nombre_zona","option-label":"nombre_zona","emit-value":"","map-options":"",rules:[e=>!!e||"Seleccione una zona"],dense:""},null,8,["modelValue","options","rules"])]),o("div",de,[t(n,{modelValue:l.pedido.contacto,"onUpdate:modelValue":s[11]||(s[11]=e=>l.pedido.contacto=e),filled:"",standout:"",label:"Contacto",dense:"",hint:""},null,8,["modelValue"])]),o("div",se,[t(n,{modelValue:l.pedido.observacion,"onUpdate:modelValue":s[12]||(s[12]=e=>l.pedido.observacion=e),filled:"",standout:"",label:"Observaci\xF3n",dense:"",hint:""},null,8,["modelValue"])])]),t(P,{dense:"",flat:"",bordered:"","wrap-cells":""},{default:i(()=>[ie,o("tbody",null,[(c(!0),u(h,null,g(l.sales,e=>(c(),u("tr",{key:e.producto.id},[o("td",null,r(e.producto.nombre_pro),1),o("td",null,r(e.cantidadVenta),1),o("td",null,r(e.precioVenta),1),o("td",null,r((e.cantidadVenta*e.precioVenta).toFixed(2)),1)]))),128))]),o("tfoot",null,[o("tr",null,[ne,o("td",ae,r(l.sales.reduce((e,a)=>e+a.cantidadVenta*a.precioVenta,0).toFixed(2)),1)])])]),_:1}),t(b,{loading:l.loading,"no-caps":"",class:"full-width",icon:"save",color:"positive",label:"Guardar pedido",type:"submit"},null,8,["loading"])]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}var ge=D(F,[["render",re]]);export{ge as default};