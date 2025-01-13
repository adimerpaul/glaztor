import{R as u,$ as m,U as i,T as d,aD as g,a1 as c,aC as v,aA as V,W as t,aB as r,V as a,Z as _,M as h,S as B,aE as p,a_ as C}from"./index.e95100ec.js";import{Q as F}from"./QPageSticky.6289ab09.js";import{Q as U}from"./QPage.a2881a74.js";import{Q as w}from"./QSpace.5ba5662b.js";import{Q as y}from"./QForm.c582a3d7.js";import{Q as s}from"./QSelect.b493f8f7.js";import{C as k}from"./ClosePopup.c6d1387a.js";import{h as b}from"./moment.40bc58bf.js";import{_ as E}from"./plugin-vue_export-helper.21dcd24c.js";import"./format.39f6ce55.js";const P={name:"Pedidotrailers",data(){return{fechaInicio:b().startOf("month").format("YYYY-MM-DD"),fechaFin:b().endOf("month").format("YYYY-MM-DD"),pedidotrailers:[],pedidotrailer:{},loading:!1,dialog:!1,facturaBtnBool:!0,sinfacturaBtnBool:!0,cliente1BtnBool:!0,cliente2BtnBool:!0,cliente3BtnBool:!0,cliente4BtnBool:!0,clientes:[]}},mounted(){this.getPedidotrailers(),this.getClientes()},methods:{submit(){this.loading=!0,this.$axios.post("pedidotrailers",this.pedidotrailer).then(n=>{this.pedidotrailers.push(n.data),this.dialog=!1}).catch(n=>{console.log(n)}).finally(()=>{this.loading=!1})},getClientes(){this.$axios.get("clientes").then(n=>{this.clientes=n.data}).catch(n=>{console.log(n)})},addPedidotrailer(){this.dialog=!0,this.pedidotrailer={fecha_hora_tra:b().format("YYYY-MM-DD HH:mm:ss"),n_tra:"",asesor_tra:"",zona_tra:"",cliente1_tra:"",producto1_tra:"",cantidad1_tra:"",precio1_tra:"",cliente2_tra:"",producto2_tra:"",cantidad2_tra:"",precio2_tra:"",cliente3_tra:"",producto3_tra:"",cantidad3_tra:"",precio3_tra:"",cliente4_tra:"",producto4_tra:"",cantidad4_tra:"",precio4_tra:"",factura_tra:"",nombre_factura_tra:"",nit_factura_tra:"",direccion_tra:"",contacto_tra:"",telefono_tra:"",telefono2_tra:"",observacion_tra:"",chofer_tra:""}},getPedidotrailers(){this.loading=!0,this.$axios.get("pedidotrailer").then(n=>{this.pedidotrailers=n.data,this.loading=!1}).catch(n=>{console.log(n),this.loading=!1})}},computed:{esMovil(){return this.$q.screen.lt.md}}},N={class:"row"},Q={class:"col-12 col-md-3"},q={class:"col-12 col-md-3"},x={class:"col-12 col-md-6 text-right"},T={class:"text-h6"},A={class:"row"},D={class:"col-12 col-md-12"},I={class:"row"},S={class:"col-12"},Y={class:"col-12"},M={class:"col-12"},R={class:"col-12"},O={class:"col-6 q-pa-xs"},L={class:"col-6 q-pa-xs"},z={class:"col-6 q-pa-xs"},Z={class:"col-6 q-pa-xs"},H={class:"col-12"},G={class:"col-12"},J={class:"col-12"},W={class:"col-12"},j={class:"col-12"},K={class:"col-12"},X={class:"col-12"},$={class:"col-12"},ee={class:"col-6 q-pa-xs"},le={class:"col-6 q-pa-xs"},oe={class:"col-12"},ie={class:"col-12"},te={class:"col-12"},ne={class:"col-12"},re={class:"col-12"},de={class:"col-12"},ae={class:"col-12"};function se(n,l,ue,pe,e,f){return u(),m(c,null,[i(U,{class:"bg-grey-3 q-pa-xs"},{default:d(()=>[i(v,null,{default:d(()=>[i(V,{class:"q-pa-xs"},{default:d(()=>[t("div",N,[t("div",Q,[i(r,{outlined:"",modelValue:e.fechaInicio,"onUpdate:modelValue":l[0]||(l[0]=o=>e.fechaInicio=o),label:"Fecha Inicio",type:"date",color:"white",dense:""},null,8,["modelValue"])]),t("div",q,[i(r,{outlined:"",modelValue:e.fechaFin,"onUpdate:modelValue":l[1]||(l[1]=o=>e.fechaFin=o),label:"Fecha Fin",type:"date",color:"white",dense:""},null,8,["modelValue"])]),t("div",x,[i(a,{icon:"search",color:"primary",label:"Buscar",onClick:f.getPedidotrailers,loading:e.loading,"no-caps":""},null,8,["onClick","loading"])])])]),_:1})]),_:1}),t("pre",null,_(e.pedidotrailers),1),t("pre",null,_(e.clientes),1),i(F,{position:"bottom-right",offset:[18,18]},{default:d(()=>[i(a,{fab:"",color:"primary",icon:"add",onClick:f.addPedidotrailer},null,8,["onClick"])]),_:1})]),_:1}),i(g,{modelValue:e.dialog,"onUpdate:modelValue":l[37]||(l[37]=o=>e.dialog=o),position:f.esMovil?void 0:"right",maximized:!0,"transition-show":"slide-left","transition-hide":"slide-right"},{default:d(()=>[i(v,{style:{width:"450px","max-width":"100vw"}},{default:d(()=>[i(V,{class:"row items-center q-px-md bg-primary text-white q-px-none"},{default:d(()=>[h(i(a,{flat:"",round:"",dense:"",icon:"fa-solid fa-arrow-left"},null,512),[[k]]),i(w),t("div",T,_(e.pedidotrailer.id?"Editar":"Nuevo")+" Pedido TRAILER",1)]),_:1}),i(V,null,{default:d(()=>[e.pedidotrailer.id?(u(),B(y,{key:0,onSubmit:f.submit},{default:d(()=>[t("div",A,[t("div",D,[i(r,{modelValue:e.pedidotrailer,"onUpdate:modelValue":l[2]||(l[2]=o=>e.pedidotrailer=o),type:"date",outlined:""},null,8,["modelValue"])])])]),_:1},8,["onSubmit"])):p("",!0)]),_:1}),i(V,null,{default:d(()=>[e.pedidotrailer.id?p("",!0):(u(),B(y,{key:0,onSubmit:f.submit},{default:d(()=>[t("div",I,[t("div",S,[i(r,{dense:"",modelValue:e.pedidotrailer.fecha_hora_tra,"onUpdate:modelValue":l[3]||(l[3]=o=>e.pedidotrailer.fecha_hora_tra=o),outlined:"",label:"Fecha",type:"date"},null,8,["modelValue"])]),t("div",Y,[i(r,{dense:"",modelValue:e.pedidotrailer.n_tra,"onUpdate:modelValue":l[4]||(l[4]=o=>e.pedidotrailer.n_tra=o),outlined:"",label:"Nro Trailer",type:"number"},null,8,["modelValue"])]),t("div",M,[i(s,{dense:"",modelValue:e.pedidotrailer.asesor_tra,"onUpdate:modelValue":l[5]||(l[5]=o=>e.pedidotrailer.asesor_tra=o),options:["ZTORREZ","JLAREDO","ATERAN","MMIRANDA"],outlined:"",rules:[o=>!!o||"Este campo es requerido"],label:"Asesor"},null,8,["modelValue","rules"])]),t("div",R,[i(s,{dense:"",modelValue:e.pedidotrailer.zona_tra,"onUpdate:modelValue":l[6]||(l[6]=o=>e.pedidotrailer.zona_tra=o),options:["ESTE","NORTE"],outlined:"",rules:[o=>!!o||"Este campo es requerido"],label:"ZONA"},null,8,["modelValue","rules"])]),t("div",O,[i(a,{label:"CLIENTE 1",outline:e.cliente1BtnBool,class:"full-width","no-caps":"",color:"primary",onClick:l[7]||(l[7]=o=>e.cliente1BtnBool=!e.cliente1BtnBool)},null,8,["outline"])]),t("div",L,[i(a,{label:"CLIENTE 2",outline:e.cliente2BtnBool,class:"full-width","no-caps":"",color:"primary",onClick:l[8]||(l[8]=o=>e.cliente2BtnBool=!e.cliente2BtnBool)},null,8,["outline"])]),t("div",z,[i(a,{label:"CLIENTE 3",outline:e.cliente3BtnBool,class:"full-width","no-caps":"",color:"primary",onClick:l[9]||(l[9]=o=>e.cliente3BtnBool=!e.cliente3BtnBool)},null,8,["outline"])]),t("div",Z,[i(a,{label:"CLIENTE 4",outline:e.cliente4BtnBool,class:"full-width","no-caps":"",color:"primary",onClick:l[10]||(l[10]=o=>e.cliente4BtnBool=!e.cliente4BtnBool)},null,8,["outline"])]),e.cliente1BtnBool?p("",!0):(u(),m(c,{key:0},[t("div",null,[i(s,{filled:"",modelValue:e.pedidotrailer.cliente1_tra,"onUpdate:modelValue":l[11]||(l[11]=o=>e.pedidotrailer.cliente1_tra=o),"use-input":"","input-debounce":"0",label:"Cliente 1",options:n.options,onFilter:n.filterFn,style:{width:"250px"},behavior:"menu"},null,8,["modelValue","options","onFilter"])]),t("div",null,[i(s,{filled:"",modelValue:e.pedidotrailer.producto1_tra,"onUpdate:modelValue":l[12]||(l[12]=o=>e.pedidotrailer.producto1_tra=o),"use-input":"","input-debounce":"0",label:"Producto 1",options:n.options,onFilter:n.filterFn,style:{width:"250px"},behavior:"menu"},null,8,["modelValue","options","onFilter"])]),t("div",H,[i(r,{dense:"",modelValue:e.pedidotrailer.cantidad1_tra,"onUpdate:modelValue":l[13]||(l[13]=o=>e.pedidotrailer.cantidad1_tra=o),outlined:"",label:"Candidad 1",type:"number"},null,8,["modelValue"])]),t("div",G,[i(r,{dense:"",modelValue:e.pedidotrailer.precio1_tra,"onUpdate:modelValue":l[14]||(l[14]=o=>e.pedidotrailer.precio1_tra=o),outlined:"",label:"Precio 1",type:"number"},null,8,["modelValue"])])],64)),e.cliente2BtnBool?p("",!0):(u(),m(c,{key:1},[t("div",null,[i(s,{filled:"",modelValue:e.pedidotrailer.cliente2_tra,"onUpdate:modelValue":l[15]||(l[15]=o=>e.pedidotrailer.cliente2_tra=o),"use-input":"","input-debounce":"0",label:"Cliente 2",options:n.options,onFilter:n.filterFn,style:{width:"250px"},behavior:"menu"},null,8,["modelValue","options","onFilter"])]),t("div",null,[i(s,{filled:"",modelValue:e.pedidotrailer.producto2_tra,"onUpdate:modelValue":l[16]||(l[16]=o=>e.pedidotrailer.producto2_tra=o),"use-input":"","input-debounce":"0",label:"Producto 2",options:n.options,onFilter:n.filterFn,style:{width:"250px"},behavior:"menu"},null,8,["modelValue","options","onFilter"])]),t("div",J,[i(r,{dense:"",modelValue:e.pedidotrailer.cantidad2_tra,"onUpdate:modelValue":l[17]||(l[17]=o=>e.pedidotrailer.cantidad2_tra=o),outlined:"",label:"Candidad 2",type:"number"},null,8,["modelValue"])]),t("div",W,[i(r,{dense:"",modelValue:e.pedidotrailer.precio2_tra,"onUpdate:modelValue":l[18]||(l[18]=o=>e.pedidotrailer.precio2_tra=o),outlined:"",label:"Precio 2",type:"number"},null,8,["modelValue"])])],64)),e.cliente3BtnBool?p("",!0):(u(),m(c,{key:2},[t("div",null,[i(s,{filled:"",modelValue:e.pedidotrailer.cliente3_tra,"onUpdate:modelValue":l[19]||(l[19]=o=>e.pedidotrailer.cliente3_tra=o),"use-input":"","input-debounce":"0",label:"Cliente 3",options:n.options,onFilter:n.filterFn,style:{width:"250px"},behavior:"menu"},null,8,["modelValue","options","onFilter"])]),t("div",null,[i(s,{filled:"",modelValue:e.pedidotrailer.producto3_tra,"onUpdate:modelValue":l[20]||(l[20]=o=>e.pedidotrailer.producto3_tra=o),"use-input":"","input-debounce":"0",label:"Producto 3",options:n.options,onFilter:n.filterFn,style:{width:"250px"},behavior:"menu"},null,8,["modelValue","options","onFilter"])]),t("div",j,[i(r,{dense:"",modelValue:e.pedidotrailer.cantidad3_tra,"onUpdate:modelValue":l[21]||(l[21]=o=>e.pedidotrailer.cantidad3_tra=o),outlined:"",label:"Candidad 3",type:"number"},null,8,["modelValue"])]),t("div",K,[i(r,{dense:"",modelValue:e.pedidotrailer.precio3_tra,"onUpdate:modelValue":l[22]||(l[22]=o=>e.pedidotrailer.precio3_tra=o),outlined:"",label:"Precio 3",type:"number"},null,8,["modelValue"])])],64)),e.cliente4BtnBool?p("",!0):(u(),m(c,{key:3},[t("div",null,[i(s,{filled:"",modelValue:e.pedidotrailer.cliente4_tra,"onUpdate:modelValue":l[23]||(l[23]=o=>e.pedidotrailer.cliente4_tra=o),"use-input":"","input-debounce":"0",label:"Cliente 4",options:n.options,onFilter:n.filterFn,style:{width:"250px"},behavior:"menu"},null,8,["modelValue","options","onFilter"])]),t("div",null,[i(s,{filled:"",modelValue:e.pedidotrailer.producto4_tra,"onUpdate:modelValue":l[24]||(l[24]=o=>e.pedidotrailer.producto4_tra=o),"use-input":"","input-debounce":"0",label:"Producto 4",options:n.options,onFilter:n.filterFn,style:{width:"250px"},behavior:"menu"},null,8,["modelValue","options","onFilter"])]),t("div",X,[i(r,{dense:"",modelValue:e.pedidotrailer.cantidad4_tra,"onUpdate:modelValue":l[25]||(l[25]=o=>e.pedidotrailer.cantidad4_tra=o),outlined:"",label:"Candidad 4",type:"number"},null,8,["modelValue"])]),t("div",$,[i(r,{dense:"",modelValue:e.pedidotrailer.precio4_tra,"onUpdate:modelValue":l[26]||(l[26]=o=>e.pedidotrailer.precio4_tra=o),outlined:"",label:"Precio 4",type:"number"},null,8,["modelValue"])])],64)),t("div",ee,[i(a,{label:"CON FACTURA",outline:e.facturaBtnBool,class:"full-width","no-caps":"",color:"primary",onClick:l[27]||(l[27]=o=>e.facturaBtnBool=!e.facturaBtnBool)},null,8,["outline"])]),t("div",le,[i(a,{label:"SIN FACTURA",outline:e.sinfacturaBtnBool,class:"full-width","no-caps":"",color:"primary",onClick:l[28]||(l[28]=o=>e.sinfacturaBtnBool=!e.sinfacturaBtnBool)},null,8,["outline"])]),e.facturaBtnBool?p("",!0):(u(),m(c,{key:4},[t("div",oe,[i(r,{dense:"",modelValue:e.pedidotrailer.nombre_factura_tra,"onUpdate:modelValue":l[29]||(l[29]=o=>e.pedidotrailer.nombre_factura_tra=o),outlined:"",label:"Nombre Factura"},null,8,["modelValue"])]),t("div",ie,[i(r,{dense:"",modelValue:e.pedidotrailer.nit_factura_tra,"onUpdate:modelValue":l[30]||(l[30]=o=>e.pedidotrailer.nit_factura_tra=o),outlined:"",label:"Nit Factura",type:"number"},null,8,["modelValue"])])],64)),e.sinfacturaBtnBool?p("",!0):(u(),m(c,{key:5},[],64)),t("div",te,[i(r,{dense:"",modelValue:e.pedidotrailer.direccion_tra,"onUpdate:modelValue":l[31]||(l[31]=o=>e.pedidotrailer.direccion_tra=o),outlined:"",label:"Direccion",rules:[o=>!!o||"Este campo es requerido"]},null,8,["modelValue","rules"])]),t("div",ne,[i(r,{dense:"",modelValue:e.pedidotrailer.contacto_tra,"onUpdate:modelValue":l[32]||(l[32]=o=>e.pedidotrailer.contacto_tra=o),outlined:"",label:"Contacto",rules:[o=>!!o||"Este campo es requerido"]},null,8,["modelValue","rules"])]),t("div",re,[i(r,{dense:"",modelValue:e.pedidotrailer.telefono_tra,"onUpdate:modelValue":l[33]||(l[33]=o=>e.pedidotrailer.telefono_tra=o),outlined:"",label:"Telefono 1",type:"number"},null,8,["modelValue"])]),t("div",de,[i(r,{dense:"",modelValue:e.pedidotrailer.telefono2_tra,"onUpdate:modelValue":l[34]||(l[34]=o=>e.pedidotrailer.telefono2_tra=o),outlined:"",label:"Telefono 2",type:"number"},null,8,["modelValue"])]),t("div",ae,[i(r,{dense:"",modelValue:e.pedidotrailer.observacion_tra,"onUpdate:modelValue":l[35]||(l[35]=o=>e.pedidotrailer.observacion_tra=o),outlined:"",label:"Observacion"},null,8,["modelValue"])]),i(C,{align:"right"},{default:d(()=>[i(a,{label:"Cancelar",color:"negative",onClick:l[36]||(l[36]=o=>e.dialog=!1),loading:e.loading},null,8,["loading"]),i(a,{label:"Guardar",color:"primary",type:"submit",loading:e.loading},null,8,["loading"])]),_:1})])]),_:1},8,["onSubmit"]))]),_:1})]),_:1})]),_:1},8,["modelValue","position"])],64)}var he=E(P,[["render",se]]);export{he as default};
