import{R as c,$ as f,U as r,T as s,aD as $,a1 as D,aC as S,aA as v,W as a,aB as d,V as h,S as k,Y as b,aE as F,a0 as Q,M as E,Z as n,X as V,aF as w}from"./index.8bd998ce.js";import{d as P,e as C,a as N}from"./format.3ef389eb.js";import{Q as U,a as T}from"./QSelect.c8fcec14.js";import{Q as I}from"./QList.1bc64209.js";import{Q as Y}from"./QPage.f0d189ce.js";import{Q as M}from"./QSpace.444d7c09.js";import{Q as _}from"./QMarkupTable.c2c12e36.js";import{Q as A}from"./QForm.8105f686.js";import{C as q}from"./ClosePopup.4ff5eb22.js";import{h as z}from"./moment.40bc58bf.js";import{E as B}from"./Excel.2696a291.js";import{_ as O}from"./plugin-vue_export-helper.21dcd24c.js";import"./index.a93ba69a.js";import"./_commonjsHelpers.a26ce4be.js";const R={name:"Pedidos",data(){return{loading:!1,dialog:!1,clientes:[],fechaInicio:z().format("YYYY-MM-DD"),fechaFin:z().format("YYYY-MM-DD"),zonas:[],pedidos:[],productos:[],pedido:{producto_id:null}}},mounted(){this.getZonas(),this.getPedidos(),this.getClientes(),this.getProductos()},methods:{exportExcel(){let e=[];this.pedidos.forEach(i=>{i.detalles.forEach(p=>{var l;e.push({created_at:z(i.created_at).format("YYYY-MM-DD HH:mm:ss"),fecha:i.fecha,cliente:i.cliente,producto:p.producto.nombre_pro,cantidad:p.cantidad,precio:p.precio,subtotal:p.cantidad*p.precio,factura:i.factura,nombre_factura:i.nombre_factura,nit_factura:i.nit_factura,direccion:i.direccion,contacto:i.contacto,telefono:i.telefono,telefono2:i.telefono2,observacion:i.observacion,chofer:i.chofer,zona:i.zona,total:i.total,estado:i.estado,fecha_pago:i.fecha_pago,user:(l=i.user)==null?void 0:l.name})})});let t=[{sheet:"Pedidos",columns:[{label:"Fecha del pedido",value:"created_at"},{label:"Fecha de Entrega",value:"fecha"},{label:"Cliente",value:"cliente"},{label:"Producto",value:"producto"},{label:"Cantidad",value:"cantidad"},{label:"Precio",value:"precio"},{label:"Subtotal",value:"subtotal"},{label:"Factura",value:"factura"},{label:"Nombre Factura",value:"nombre_factura"},{label:"Nit Factura",value:"nit_factura"},{label:"Direccion",value:"direccion"},{label:"Contacto",value:"contacto"},{label:"Telefono",value:"telefono"},{label:"Telefono2",value:"telefono2"},{label:"Observacion",value:"observacion"},{label:"Chofer",value:"chofer"},{label:"Zona",value:"zona"},{label:"Total",value:"total"},{label:"Estado",value:"estado"},{label:"Fecha Pago",value:"fecha_pago"},{label:"User",value:"user"}],content:e}];B.export(t,"Reporte de Pedidos")},getZonas(){this.$axios.get("zonas").then(e=>{this.zonas=e.data}).catch(e=>{console.log(e)})},showPreventa(e){this.pedido={...e},this.dialog=!0},submit(){this.loading=!0,this.$axios.put("pedidos/"+this.pedido.id,this.pedido).then(e=>{this.dialog=!1,this.$alert.success("Pedido actualizado correctamente"),this.getPedidos()}).catch(e=>{console.log(e),this.$alert.error("Error al actualizar el pedido")}).finally(()=>{this.loading=!1})},getProductos(){this.$axios.get("productos").then(e=>{this.productos=e.data}).catch(e=>{console.log(e)})},getClientes(){this.$axios.get("clientes").then(e=>{this.clientes=e.data}).catch(e=>{console.log(e)})},addPedido(){this.$router.push({name:"pedidosPage"})},getPedidos(){this.loading=!0,this.$axios.get("pedidos",{params:{fechaInicio:this.fechaInicio,fechaFin:this.fechaFin}}).then(e=>{this.pedidos=e.data,this.loading=!1}).catch(e=>{console.log(e),this.loading=!1})}},computed:{esMovil(){return this.$q.screen.lt.md}}},L={class:"row"},Z={class:"col-6 col-md-3"},G={class:"col-6 col-md-3"},H={class:"col-6 col-md-3 text-left"},W={class:"col-6 col-md-3 text-right"},X={class:"text-h6"},j={class:"text-bold q-pa-xs"},J=a("label",null,"Total",-1),K=a("thead",null,[a("tr",null,[a("th",null,"Producto"),a("th",null,"Cantidad"),a("th",null,"Precio"),a("th",null,"Subtotal")])],-1),x=["onUpdate:modelValue"],ee=["onUpdate:modelValue"],oe=a("td",{colspan:"3",class:"text-right"},"Total",-1),le={class:"text-bold"},re={key:0},te={colspan:"4"};function ae(e,t,i,p,l,m){return c(),f(D,null,[r(Y,{class:"bg-grey-3 q-pa-xs"},{default:s(()=>[r(S,null,{default:s(()=>[r(v,{class:"q-pa-xs"},{default:s(()=>[a("div",L,[a("div",Z,[r(d,{outlined:"",modelValue:l.fechaInicio,"onUpdate:modelValue":t[0]||(t[0]=o=>l.fechaInicio=o),label:"Fecha Inicio",type:"date",color:"white",dense:""},null,8,["modelValue"])]),a("div",G,[r(d,{outlined:"",modelValue:l.fechaFin,"onUpdate:modelValue":t[1]||(t[1]=o=>l.fechaFin=o),label:"Fecha Fin",type:"date",color:"white",dense:""},null,8,["modelValue"])]),a("div",H,[r(h,{icon:"search",color:"primary",label:"Buscar",onClick:m.getPedidos,loading:l.loading,"no-caps":""},null,8,["onClick","loading"])]),a("div",W,[r(h,{icon:"get_app",color:"green",label:"Excel",onClick:m.exportExcel,loading:l.loading,"no-caps":""},null,8,["onClick","loading"]),r(h,{icon:"add_circle_outline",color:"green",label:"Nuevo Pedido",onClick:m.addPedido,loading:l.loading,"no-caps":""},null,8,["onClick","loading"])])])]),_:1})]),_:1}),r(v,{class:"q-pa-none"},{default:s(()=>[r(I,{dense:"",class:"rounded-borders"},{default:s(()=>[l.pedidos.length===0?(c(),k(N,{key:0},{default:s(()=>[r(P,null,{default:s(()=>[r(C,{class:"text-h6 text-grey"},{default:s(()=>[b("No hay pedidos")]),_:1})]),_:1})]),_:1})):F("",!0),(c(!0),f(D,null,Q(l.pedidos,o=>(c(),k(N,{key:o.id,onClick:u=>m.showPreventa(o),clickable:"",class:"q-my-sm bg-white hover-bg-light-blue",style:{border:"1px solid #e0e0e0","border-radius":"8px"}},{default:s(()=>[r(P,null,{default:s(()=>[r(C,{class:"text-h6"},{default:s(()=>[b(n(o.fecha.substring(0,10)||"Sin propietario")+" ",1),r(V,{name:"check_circle",color:o.estado==="PENDIENTE"?"red":o.estado==="ENTREGADO"?"green":"orange"},null,8,["color"])]),_:2},1024),r(C,{class:"text-subtitle1 text-grey"},{default:s(()=>[b(n(o.direccion)+" ",1),r(T,null,{default:s(()=>[b(n(o.total),1)]),_:2},1024)]),_:2},1024),r(C,{class:"text-caption text-positive"},{default:s(()=>{var u;return[b(n(o.cliente)+" - "+n(o.tipo_construccion)+" - "+n((u=o.user)==null?void 0:u.name)+" - "+n(o.fecha),1)]}),_:2},1024)]),_:2},1024),r(P,{side:""},{default:s(()=>[r(V,{name:"arrow_forward"})]),_:1})]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1})]),_:1}),r($,{modelValue:l.dialog,"onUpdate:modelValue":t[13]||(t[13]=o=>l.dialog=o),position:m.esMovil?void 0:"right",maximized:!0,"transition-show":"slide-left","transition-hide":"slide-right"},{default:s(()=>[r(S,{style:{width:"450px","max-width":"100vw"}},{default:s(()=>[r(v,{class:"row items-center q-px-md bg-primary text-white q-px-none"},{default:s(()=>[E(r(h,{flat:"",round:"",dense:"",icon:"fa-solid fa-arrow-left"},null,512),[[q]]),r(M),a("div",X,n(l.pedido.id?"Editar":"Nuevo")+" Pedido",1)]),_:1}),r(v,null,{default:s(()=>[r(A,{onSubmit:m.submit,disable:e.$store.user.role=="Ventas"||e.$store.user.role=="Cobranza"||e.$store.user.role=="Director"||e.$store.user.role=="Supervisor"},{default:s(()=>[r(d,{modelValue:l.pedido.fecha,"onUpdate:modelValue":t[2]||(t[2]=o=>l.pedido.fecha=o),label:"Fecha",outlined:"",disable:e.$store.user.role=="Ventas"||e.$store.user.role=="Cobranza"||e.$store.user.role=="Director"||e.$store.user.role=="Supervisor",dense:"",type:"date"},null,8,["modelValue","disable"]),r(d,{modelValue:l.pedido.cliente,"onUpdate:modelValue":t[3]||(t[3]=o=>l.pedido.cliente=o),label:"Cliente",outlined:"",disable:e.$store.user.role=="Ventas"||e.$store.user.role=="Cobranza"||e.$store.user.role=="Director"||e.$store.user.role=="Supervisor",dense:""},null,8,["modelValue","disable"]),r(d,{modelValue:l.pedido.nombre_factura,"onUpdate:modelValue":t[4]||(t[4]=o=>l.pedido.nombre_factura=o),label:"Nombre Factura",outlined:"",disable:e.$store.user.role=="Ventas"||e.$store.user.role=="Cobranza"||e.$store.user.role=="Director"||e.$store.user.role=="Supervisor",dense:""},null,8,["modelValue","disable"]),r(d,{modelValue:l.pedido.nit_factura,"onUpdate:modelValue":t[5]||(t[5]=o=>l.pedido.nit_factura=o),label:"Nit Factura",outlined:"",disable:e.$store.user.role=="Ventas"||e.$store.user.role=="Cobranza"||e.$store.user.role=="Director"||e.$store.user.role=="Supervisor",dense:""},null,8,["modelValue","disable"]),r(d,{modelValue:l.pedido.direccion,"onUpdate:modelValue":t[6]||(t[6]=o=>l.pedido.direccion=o),label:"Direccion",outlined:"",disable:e.$store.user.role=="Ventas"||e.$store.user.role=="Cobranza"||e.$store.user.role=="Director"||e.$store.user.role=="Supervisor",dense:""},null,8,["modelValue","disable"]),r(d,{modelValue:l.pedido.contacto,"onUpdate:modelValue":t[7]||(t[7]=o=>l.pedido.contacto=o),label:"Contacto",outlined:"",disable:e.$store.user.role=="Ventas"||e.$store.user.role=="Cobranza"||e.$store.user.role=="Director"||e.$store.user.role=="Supervisor",dense:""},null,8,["modelValue","disable"]),r(d,{modelValue:l.pedido.telefono,"onUpdate:modelValue":t[8]||(t[8]=o=>l.pedido.telefono=o),label:"Telefono",outlined:"",disable:e.$store.user.role=="Ventas"||e.$store.user.role=="Cobranza"||e.$store.user.role=="Director"||e.$store.user.role=="Supervisor",dense:""},null,8,["modelValue","disable"]),r(d,{type:"textarea",modelValue:l.pedido.observacion,"onUpdate:modelValue":t[9]||(t[9]=o=>l.pedido.observacion=o),label:"Observacion",outlined:"",disable:e.$store.user.role=="Ventas"||e.$store.user.role=="Cobranza"||e.$store.user.role=="Director"||e.$store.user.role=="Supervisor",dense:""},null,8,["modelValue","disable"]),r(d,{modelValue:l.pedido.chofer,"onUpdate:modelValue":t[10]||(t[10]=o=>l.pedido.chofer=o),label:"chofer",outlined:"",disable:e.$store.user.role=="Ventas"||e.$store.user.role=="Cobranza"||e.$store.user.role=="Director"||e.$store.user.role=="Supervisor",dense:""},null,8,["modelValue","disable"]),r(U,{modelValue:l.pedido.zona,"onUpdate:modelValue":t[11]||(t[11]=o=>l.pedido.zona=o),label:"zonas",outlined:"",disable:e.$store.user.role=="Ventas"||e.$store.user.role=="Cobranza"||e.$store.user.role=="Director"||e.$store.user.role=="Supervisor",dense:"",options:l.zonas,"emit-value":"","map-options":"","option-label":"nombre_zona","option-value":"nombre_zona"},null,8,["modelValue","disable","options"]),r(U,{modelValue:l.pedido.estado,"onUpdate:modelValue":t[12]||(t[12]=o=>l.pedido.estado=o),label:"Estado",outlined:"",disable:e.$store.user.role=="Ventas"||e.$store.user.role=="Cobranza"||e.$store.user.role=="Director"||e.$store.user.role=="Supervisor",dense:"",options:["PENDIENTE","ENTREGADO","ANULADO"]},{after:s(()=>[r(V,{name:"check_circle",color:l.pedido.estado==="PENDIENTE"?"red":l.pedido.estado==="ENTREGADO"?"green":"orange"},null,8,["color"])]),_:1},8,["modelValue","disable"]),a("div",j,[J,a("div",null,n(l.pedido.total),1)]),r(_,{dense:"",flat:"",bordered:"","wrap-cells":""},{default:s(()=>[K,a("tbody",null,[(c(!0),f(D,null,Q(l.pedido.detalles,o=>{var u,y;return c(),f("tr",{key:o.id},[a("td",null,[r(V,{name:"delete",onClick:g=>e.sales.splice(e.sales.indexOf(o),1),class:"cursor-pointer",color:"red"},null,8,["onClick"]),b(" "+n((u=o.producto)==null?void 0:u.nombre_pro)+" "+n((y=o.producto)==null?void 0:y.marca_pro),1)]),a("td",null,[E(a("input",{"onUpdate:modelValue":g=>o.cantidad=g,type:"number",style:{width:"50px"},step:"0.01"},null,8,x),[[w,o.cantidad]])]),a("td",null,[E(a("input",{"onUpdate:modelValue":g=>o.precio=g,type:"number",style:{width:"70px"},step:"0.01"},null,8,ee),[[w,o.precio]])]),a("td",null,n((o.cantidad*o.precio).toFixed(2)),1)])}),128))]),a("tfoot",null,[a("tr",null,[oe,a("td",le,n(l.pedido.detalles.reduce((o,u)=>o+u.cantidad*u.precio,0).toFixed(2)),1)]),e.$store.user.role==="Administrador"||e.$store.user.role==="Admin"?(c(),f("tr",re,[a("td",te,[r(h,{"no-caps":"",class:"full-width",color:"blue",loading:l.loading,type:"submit",label:"Actualizar pedido"},null,8,["loading"])])])):F("",!0)])]),_:1})]),_:1},8,["onSubmit","disable"])]),_:1})]),_:1})]),_:1},8,["modelValue","position"])],64)}var Ce=O(R,[["render",ae]]);export{Ce as default};