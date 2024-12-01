import{O as a,Y as m,R as d,Q as s,ax as C,_ as c,ay as h,az as f,T as i,aA as t,S as u,W as b,J as U,P as g,aB as p,aC as y}from"./index.998bd65e.js";import{Q as F}from"./QPageSticky.21b5b08b.js";import{Q as k}from"./QPage.369d1f0c.js";import{Q as P,a as v}from"./QForm.b755ba32.js";import{Q as V}from"./QSelect.16d28045.js";import{C as w}from"./ClosePopup.41fa9c67.js";import{h as B}from"./moment.40bc58bf.js";import{_}from"./plugin-vue_export-helper.21dcd24c.js";const E={name:"Pedidos",data(){return{loading:!1,dialog:!1,clientes:[],fechaInicio:B().startOf("month").format("YYYY-MM-DD"),fechaFin:B().endOf("month").format("YYYY-MM-DD"),pedidos:[],productos:[],pedido:{producto_id:null}}},mounted(){this.getPedidos(),this.getClientes(),this.getProductos()},methods:{submit(){this.loading=!0,console.log(this.pedido),this.$axios.post("pedidos",this.pedido).then(n=>{this.pedidos.push(n.data),this.dialog=!1,this.$q.notify({color:"positive",message:"Pedido guardado correctamente",icon:"check_circle"})}).catch(n=>{console.log(n),this.$q.notify({color:"negative",message:"Error al guardar el pedido",icon:"error"})}).finally(()=>{this.loading=!1})},getProductos(){this.$axios.get("productos").then(n=>{this.productos=n.data}).catch(n=>{console.log(n)})},getClientes(){this.$axios.get("clientes").then(n=>{this.clientes=n.data}).catch(n=>{console.log(n)})},addPedido(){this.$router.push({name:"pedidosPage"})},getPedidos(){this.loading=!0,this.$axios.get("pedidos").then(n=>{this.pedidos=n.data,this.loading=!1}).catch(n=>{console.log(n),this.loading=!1})}},computed:{esMovil(){return this.$q.screen.lt.md}}},R={class:"row"},A={class:"col-6 col-md-3"},S={class:"col-6 col-md-3"},q={class:"col-6 col-md-3 text-left"},T={class:"col-6 col-md-3 text-right"},Q={class:"text-h6"},N={class:"row"},O={class:"col-12 col-md-12"},D={class:"row"},I={class:"col-12"},Y={class:"col-12"},M={class:"col-12"},x={class:"col-12"},z={class:"col-6 q-pa-xs"},G={class:"col-6 q-pa-xs"},J={class:"col-12"},W={class:"col-12"},j={class:"col-12"},H={class:"col-12"},K={class:"col-12"},L={class:"col-12"},X={class:"col-12"},Z={class:"row"},$={class:"col-12"},ee={class:"col-12"},oe={class:"col-12"},le={class:"col-12"},de={class:"col-12"},ie={class:"col-12"},ne={class:"col-6 q-pa-xs"},te={class:"col-6 q-pa-xs"},se={class:"col-12"},ue={class:"col-12"},ae={class:"col-12"},re={class:"col-12"},pe={class:"col-12"},me={class:"col-12"},ce={class:"col-12"};function fe(n,l,Ve,be,o,r){return a(),m(c,null,[d(k,{class:"bg-grey-3 q-pa-xs"},{default:s(()=>[d(h,null,{default:s(()=>[d(f,{class:"q-pa-xs"},{default:s(()=>[i("div",R,[i("div",A,[d(t,{outlined:"",modelValue:o.fechaInicio,"onUpdate:modelValue":l[0]||(l[0]=e=>o.fechaInicio=e),label:"Fecha Inicio",type:"date",color:"white",dense:""},null,8,["modelValue"])]),i("div",S,[d(t,{outlined:"",modelValue:o.fechaFin,"onUpdate:modelValue":l[1]||(l[1]=e=>o.fechaFin=e),label:"Fecha Fin",type:"date",color:"white",dense:""},null,8,["modelValue"])]),i("div",q,[d(u,{icon:"search",color:"primary",label:"Buscar",onClick:r.getPedidos,loading:o.loading,"no-caps":""},null,8,["onClick","loading"])]),i("div",T,[d(u,{icon:"add_circle_outline",color:"green",label:"Nuevo Pedido",onClick:r.addPedido,loading:o.loading,"no-caps":""},null,8,["onClick","loading"])])])]),_:1})]),_:1}),i("pre",null,b(o.pedidos),1),i("pre",null,b(o.clientes),1),d(F,{position:"bottom-right",offset:[18,18]},{default:s(()=>[d(u,{fab:"",color:"primary",icon:"add",onClick:r.addPedido},null,8,["onClick"])]),_:1})]),_:1}),d(C,{modelValue:o.dialog,"onUpdate:modelValue":l[35]||(l[35]=e=>o.dialog=e),position:r.esMovil?void 0:"right",maximized:!0,"transition-show":"slide-left","transition-hide":"slide-right"},{default:s(()=>[d(h,{style:{width:"450px","max-width":"100vw"}},{default:s(()=>[d(f,{class:"row items-center q-px-md bg-primary text-white q-px-none"},{default:s(()=>[U(d(u,{flat:"",round:"",dense:"",icon:"fa-solid fa-arrow-left"},null,512),[[w]]),d(P),i("div",Q,b(o.pedido.id?"Editar":"Nuevo")+" Pedido",1)]),_:1}),d(f,null,{default:s(()=>[o.pedido.id?(a(),g(v,{key:0,onSubmit:r.submit},{default:s(()=>[i("div",N,[i("div",O,[d(t,{modelValue:o.pedido,"onUpdate:modelValue":l[2]||(l[2]=e=>o.pedido=e),type:"date",outlined:""},null,8,["modelValue"])])])]),_:1},8,["onSubmit"])):p("",!0)]),_:1}),d(f,null,{default:s(()=>[o.pedido.id?p("",!0):(a(),g(v,{key:0,onSubmit:r.submit},{default:s(()=>[i("div",D,[i("div",I,[d(t,{dense:"",modelValue:o.pedido.fecha,"onUpdate:modelValue":l[3]||(l[3]=e=>o.pedido.fecha=e),outlined:"",label:"Fecha",type:"date"},null,8,["modelValue"])]),i("div",Y,[d(V,{dense:"",modelValue:o.pedido.tipo,"onUpdate:modelValue":l[4]||(l[4]=e=>o.pedido.tipo=e),options:["FERRETERIA","OBRA","EMPRESA CONSTRUCTORA"],outlined:"",rules:[e=>!!e||"Este campo es requerido"],label:"Tipo"},null,8,["modelValue","rules"])]),i("div",null,[d(V,{filled:"",modelValue:o.pedido.cliente,"onUpdate:modelValue":l[5]||(l[5]=e=>o.pedido.cliente=e),"use-input":"","input-debounce":"0",label:"Cliente",options:n.options,onFilter:n.filterFn,style:{width:"250px"},behavior:"menu"},null,8,["modelValue","options","onFilter"])]),i("div",null,[d(V,{filled:"",modelValue:o.pedido.producto,"onUpdate:modelValue":l[6]||(l[6]=e=>o.pedido.producto=e),"use-input":"","input-debounce":"0",label:"Producto",options:n.options,onFilter:n.filterFn,style:{width:"250px"},behavior:"menu"},null,8,["modelValue","options","onFilter"])]),i("div",M,[d(t,{dense:"",modelValue:o.pedido.cantidad,"onUpdate:modelValue":l[7]||(l[7]=e=>o.pedido.cantidad=e),outlined:"",label:"Candidad",type:"number"},null,8,["modelValue"])]),i("div",x,[d(t,{dense:"",modelValue:o.pedido.precio,"onUpdate:modelValue":l[8]||(l[8]=e=>o.pedido.precio=e),outlined:"",label:"Precio",type:"number"},null,8,["modelValue"])]),i("div",z,[d(u,{label:"CON FACTURA",outline:n.facturaBtnBool,class:"full-width","no-caps":"",color:"primary",onClick:l[9]||(l[9]=e=>n.facturaBtnBool=!n.facturaBtnBool)},null,8,["outline"])]),i("div",G,[d(u,{label:"SIN FACTURA",outline:n.sinfacturaBtnBool,class:"full-width","no-caps":"",color:"primary",onClick:l[10]||(l[10]=e=>n.sinfacturaBtnBool=!n.sinfacturaBtnBool)},null,8,["outline"])]),n.facturaBtnBool?p("",!0):(a(),m(c,{key:0},[i("div",J,[d(t,{dense:"",modelValue:o.pedido.nombre_factura,"onUpdate:modelValue":l[11]||(l[11]=e=>o.pedido.nombre_factura=e),outlined:"",label:"Nombre Factura"},null,8,["modelValue"])]),i("div",W,[d(t,{dense:"",modelValue:o.pedido.nit_factura,"onUpdate:modelValue":l[12]||(l[12]=e=>o.pedido.nit_factura=e),outlined:"",label:"Nit Factura",type:"number"},null,8,["modelValue"])])],64)),n.sinfacturaBtnBool?p("",!0):(a(),m(c,{key:1},[],64)),i("div",j,[d(t,{dense:"",modelValue:o.pedido.direccion,"onUpdate:modelValue":l[13]||(l[13]=e=>o.pedido.direccion=e),outlined:"",label:"Direccion",rules:[e=>!!e||"Este campo es requerido"]},null,8,["modelValue","rules"])]),i("div",H,[d(t,{dense:"",modelValue:o.pedido.contacto,"onUpdate:modelValue":l[14]||(l[14]=e=>o.pedido.contacto=e),outlined:"",label:"Contacto",rules:[e=>!!e||"Este campo es requerido"]},null,8,["modelValue","rules"])]),i("div",K,[d(t,{dense:"",modelValue:o.pedido.telefono,"onUpdate:modelValue":l[15]||(l[15]=e=>o.pedido.telefono=e),outlined:"",label:"Telefono 1",type:"number"},null,8,["modelValue"])]),i("div",L,[d(t,{dense:"",modelValue:o.pedido.telefono2,"onUpdate:modelValue":l[16]||(l[16]=e=>o.pedido.telefono2=e),outlined:"",label:"Telefono 2",type:"number"},null,8,["modelValue"])]),i("div",X,[d(t,{dense:"",modelValue:o.pedido.observacion,"onUpdate:modelValue":l[17]||(l[17]=e=>o.pedido.observacion=e),outlined:"",label:"Observacion"},null,8,["modelValue"])]),d(y,{align:"right"},{default:s(()=>[d(u,{label:"Cancelar",color:"negative",onClick:l[18]||(l[18]=e=>o.dialog=!1),loading:o.loading},null,8,["loading"]),d(u,{label:"Guardar",color:"primary",type:"submit",loading:o.loading},null,8,["loading"])]),_:1})])]),_:1},8,["onSubmit"]))]),_:1}),d(f,null,{default:s(()=>[o.pedido.id?p("",!0):(a(),g(v,{key:0,onSubmit:r.submit},{default:s(()=>[i("div",Z,[i("div",$,[d(t,{dense:"",modelValue:o.pedido.fecha,"onUpdate:modelValue":l[19]||(l[19]=e=>o.pedido.fecha=e),outlined:"",label:"Fecha",type:"date"},null,8,["modelValue"])]),i("div",ee,[d(V,{dense:"",modelValue:o.pedido.tipo,"onUpdate:modelValue":l[20]||(l[20]=e=>o.pedido.tipo=e),options:["FERRETERIA","OBRA","EMPRESA CONSTRUCTORA"],outlined:"",rules:[e=>!!e||"Este campo es requerido"],label:"Tipo"},null,8,["modelValue","rules"])]),i("div",oe,[d(t,{dense:"",modelValue:o.pedido.cliente,"onUpdate:modelValue":l[21]||(l[21]=e=>o.pedido.cliente=e),outlined:"",label:"cliente"},null,8,["modelValue"])]),i("div",le,[d(t,{dense:"",modelValue:o.pedido.producto,"onUpdate:modelValue":l[22]||(l[22]=e=>o.pedido.producto=e),outlined:"",label:"producto"},null,8,["modelValue"])]),i("div",de,[d(t,{dense:"",modelValue:o.pedido.cantidad,"onUpdate:modelValue":l[23]||(l[23]=e=>o.pedido.cantidad=e),outlined:"",label:"Candidad",type:"number"},null,8,["modelValue"])]),i("div",ie,[d(t,{dense:"",modelValue:o.pedido.precio,"onUpdate:modelValue":l[24]||(l[24]=e=>o.pedido.precio=e),outlined:"",label:"Precio",type:"number"},null,8,["modelValue"])]),i("div",ne,[d(u,{label:"CON FACTURA",outline:n.facturaBtnBool,class:"full-width","no-caps":"",color:"primary",onClick:l[25]||(l[25]=e=>n.facturaBtnBool=!n.facturaBtnBool)},null,8,["outline"])]),i("div",te,[d(u,{label:"SIN FACTURA",outline:n.sinfacturaBtnBool,class:"full-width","no-caps":"",color:"primary",onClick:l[26]||(l[26]=e=>n.sinfacturaBtnBool=!n.sinfacturaBtnBool)},null,8,["outline"])]),n.facturaBtnBool?p("",!0):(a(),m(c,{key:0},[i("div",se,[d(t,{dense:"",modelValue:o.pedido.nombre_factura,"onUpdate:modelValue":l[27]||(l[27]=e=>o.pedido.nombre_factura=e),outlined:"",label:"Nombre Factura"},null,8,["modelValue"])]),i("div",ue,[d(t,{dense:"",modelValue:o.pedido.nit_factura,"onUpdate:modelValue":l[28]||(l[28]=e=>o.pedido.nit_factura=e),outlined:"",label:"Nit Factura",type:"number"},null,8,["modelValue"])])],64)),n.sinfacturaBtnBool?p("",!0):(a(),m(c,{key:1},[],64)),i("div",ae,[d(t,{dense:"",modelValue:o.pedido.direccion,"onUpdate:modelValue":l[29]||(l[29]=e=>o.pedido.direccion=e),outlined:"",label:"Direccion",rules:[e=>!!e||"Este campo es requerido"]},null,8,["modelValue","rules"])]),i("div",re,[d(t,{dense:"",modelValue:o.pedido.contacto,"onUpdate:modelValue":l[30]||(l[30]=e=>o.pedido.contacto=e),outlined:"",label:"Contacto",rules:[e=>!!e||"Este campo es requerido"]},null,8,["modelValue","rules"])]),i("div",pe,[d(t,{dense:"",modelValue:o.pedido.telefono,"onUpdate:modelValue":l[31]||(l[31]=e=>o.pedido.telefono=e),outlined:"",label:"Telefono 1",type:"number"},null,8,["modelValue"])]),i("div",me,[d(t,{dense:"",modelValue:o.pedido.telefono2,"onUpdate:modelValue":l[32]||(l[32]=e=>o.pedido.telefono2=e),outlined:"",label:"Telefono 2",type:"number"},null,8,["modelValue"])]),i("div",ce,[d(t,{dense:"",modelValue:o.pedido.observacion,"onUpdate:modelValue":l[33]||(l[33]=e=>o.pedido.observacion=e),outlined:"",label:"Observacion"},null,8,["modelValue"])]),d(y,{align:"right"},{default:s(()=>[d(u,{label:"Cancelar",color:"negative",onClick:l[34]||(l[34]=e=>o.dialog=!1),loading:o.loading},null,8,["loading"]),d(u,{label:"Guardar",color:"primary",type:"submit",loading:o.loading},null,8,["loading"])]),_:1})])]),_:1},8,["onSubmit"]))]),_:1})]),_:1})]),_:1},8,["modelValue","position"])],64)}var ke=_(E,[["render",fe]]);export{ke as default};
