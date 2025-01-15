import{Q as y,R as r,$ as m,U as i,T as n,aD as U,a1 as b,aC as C,aA as p,V as u,aB as d,X as V,M as v,S as f,Y as q,aE as T,W as a,Z as D,a0 as x,a_ as R,bd as L,be as B}from"./index.8bd998ce.js";import{d as _,e as j,a as M}from"./format.3ef389eb.js";import{Q as A}from"./QList.1bc64209.js";import{Q as F}from"./QBtnDropdown.e91068ab.js";import{Q as N}from"./QTd.1adb6707.js";import{Q as G}from"./QTable.1254d1c7.js";import{Q as Z}from"./QPage.f0d189ce.js";import{Q as O}from"./QPageSticky.b253034d.js";import{Q as S}from"./QSpace.444d7c09.js";import{Q as g}from"./QSelect.c8fcec14.js";import{Q as Y}from"./QForm.8105f686.js";import{C as h}from"./ClosePopup.4ff5eb22.js";import{h as W}from"./moment.40bc58bf.js";import{i as X,v as H,u as J}from"./vue-leaflet.es.49050a3f.js";import{E as K}from"./Excel.2696a291.js";import{_ as P}from"./plugin-vue_export-helper.21dcd24c.js";import"./QBtnGroup.34e3d97c.js";import"./QMarkupTable.c2c12e36.js";import"./_commonjsHelpers.a26ce4be.js";import"./index.a93ba69a.js";const $={name:"clientes",components:{LMap:X,LTileLayer:H,LMarker:J},data(){return{dialogGlobal:!1,filter:"",columns:[{name:"actions",label:"Acciones",align:"center"},{name:"tipo_cliente",label:"Tipo cliente",align:"left",field:"tipo_cliente"},{name:"nombre_cliente",label:"Nombre",align:"left",field:"nombre_cliente"},{name:"telefono_1",label:"Telefono",align:"left",field:"telefono_1"},{name:"telefono_2",label:"Telefono 2",align:"left",field:"telefono_2"},{name:"direccion",label:"Direccion",align:"left",field:"direccion"},{name:"complemento",label:"Complemento",align:"left",field:"complemento"},{name:"ubicacion",label:"Ubicacion",align:"left",field:"ubicacion"},{name:"zona",label:"Zona",align:"left",field:"zona"},{name:"ejecutivo",label:"Ejecutivo",align:"left",field:"ejecutivo"},{name:"region",label:"Region",align:"left",field:"region"},{name:"cumple",label:"Cumplea\xF1os",align:"left",field:"cumple"},{name:"estado",label:"Estado",align:"left",field:"estado"}],tileProviders:[{name:"Mapa",visible:!0,url:"https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",attribution:"&copy; Google Maps"},{name:"Satelite",visible:!1,url:"https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",attribution:"&copy; Google Maps"}],location:[-17.969753,-67.114749],zoom:15,propietarioBtnBool:!0,encargadoBtnBool:!0,clientes:[],cliente:{id:null,tipo_cliente:"",nombre_cliente:"",telefono_1:"",telefono_2:"",direccion:"",complemento:"",ubicacion:"",lat:null,lng:null,foto:"",zona_id:null,ejecutivo_id:null,region_id:null,cumple:"",estado:""},zonass:{zona_id:null},ejecutivoss:{ejecutivo_id:null},regions:[],dialog:!1,loading:!1}},mounted(){this.getClientes(),this.getZonas(),this.getEjecutivos(),this.getRegions()},methods:{exportExcel(){let t=[{sheet:"Clientes",columns:[{label:"Tipo de cliente",value:"tipo_cliente"},{label:"Nombre del cliente",value:"nombre_cliente"},{label:"Telefono 1",value:"telefono_1"},{label:"Telefono 2 ",value:"telefono_2"},{label:"Direccion",value:"direccion"},{label:"Complemento",value:"complemento"},{label:"lat",value:"lat"},{label:"lng",value:"lng"},{label:"Zona",value:"zona"},{label:"Region",value:"region"},{label:"Cumplea\xF1os",value:"cumple"},{label:"Eejecutivo",value:"ejecutivo"},{label:"sap",value:"sap"},{label:"Estado",value:"estado"}],content:this.clientes}];K.export(t,"Reporte de Clientes")},methonumber(t){return t?parseFloat(t):0},modificar(t){this.cliente={...t},this.dialog=!0},showGlobal(){this.dialogGlobal=!0},getZonas(){this.loading=!0,this.$axios.get("zonas").then(t=>{this.zonas=t.data.map(l=>({id:l.id,nombre_zona:l.nombre_zona}))}).catch(t=>{console.error("Error al obtener las zonas:",t),this.$q.notify({color:"negative",message:"Error al obtener las zonas. Intenta nuevamente.",icon:"report_problem"})}).finally(()=>{this.loading=!1})},getRegions(){this.$axios.get("/regions").then(t=>{this.regions=t.data}).catch(t=>{console.error("Error al cargar las regiones:",t),this.$q.notify({color:"negative",message:"No se pudo cargar las regiones."})})},getEjecutivos(){this.loading=!0,this.$axios.get("ejecutivos").then(t=>{this.ejecutivos=t.data.map(l=>({id:l.id,apodo:l.apodo}))}).catch(t=>{console.error("Error al obtener los ejecutivos:",t),this.$q.notify({color:"negative",message:"Error al obtener los ejecutivos. Intenta nuevamente.",icon:"report_problem"})}).finally(()=>{this.loading=!1})},showCliente(t){this.cliente=t,this.dialog=!0;const l=t.ubicacion.split(",").map(Number);console.log(l),this.location=l},onMarkerMoveEnd(t){const c=t.target.getLatLng();this.location=[c.lat,c.lng],this.cliente.ubicacion=`${c.lat.toFixed(7)}, ${c.lng.toFixed(7)}`},myLocation(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(t=>{this.location=[t.coords.latitude,t.coords.longitude],this.cliente.ubicacion=`${t.coords.latitude}, ${t.coords.longitude}`})},submit(){this.loading=!0,this.cliente.id?this.$axios.put(`clientes/${this.cliente.id}`,this.cliente).then(t=>{const l=this.clientes.findIndex(c=>c.id===this.cliente.id);l!==-1&&(this.clientes[l]=t.data),this.dialog=!1}).catch(t=>{console.log(t)}).finally(()=>{this.loading=!1}):(this.cliente.lat=this.location[0],this.cliente.lng=this.location[1],this.$axios.post("clientes",this.cliente).then(t=>{this.clientes.unshift(t.data),this.dialog=!1}).catch(t=>{console.log(t)}).finally(()=>{this.loading=!1}))},dialogClick(){this.dialog=!0,this.cliente={tipo_cliente:"",nombre_cliente:"",telefono_1:"",telefono_2:"",direccion:"",complemento:"",ubicacion:"-17.969753, -67.114749",foto:"",zona:"",region:"",cumple:W().format("YYYY-MM-DD"),estado:"Activo"}},getClientes(){this.$axios.get("clientes").then(t=>{this.clientes=t.data}).catch(t=>{console.log(t)})},async userDelete(t){try{confirm("\xBFEst\xE1s seguro de que deseas eliminar este cliente?")&&((await this.$axios.delete(`clientes/${t}`)).status===200?(this.clientes=this.clientes.filter(k=>k.id!==t),this.$q.notify({color:"green",message:"Cliente eliminado correctamente.",icon:"check"})):this.$q.notify({color:"red",message:"Error al eliminar el cliente.",icon:"error"}))}catch(l){console.error("Error al eliminar el cliente",l),this.$q.notify({color:"red",message:"Ocurri\xF3 un error al eliminar el cliente.",icon:"error"})}},previsualizarFoto(t){var l=new FileReader;l.readAsDataURL(t.target.files[0]),l.onload=()=>{this.foto=l.result,this.cliente.foto=this.foto}}},computed:{esMovil(){return this.$q.screen.lt.md}}},I=t=>(L("data-v-1c42aace"),t=t(),B(),t),ee={class:"text-h6"},le={class:"row"},oe={class:"col-12"},te={class:"col-12"},ie={class:"col-12"},ne={class:"col-12"},ae={class:"col-12"},se={class:"col-12"},re={class:"col-12"},ce={class:"col-12"},ue={style:{height:"250px",width:"100%"}},de={class:"col-12"},me={class:"d-grid col-6 mx-auto mb-3"},pe=["src"],fe={key:1,height:"100",src:"https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-256.png",class:"img-thumbnail",id:"fotoimg",alt:""},ge={class:"input-group mb-3"},be=I(()=>a("span",{class:"input-group-text"},[a("i",{class:"fa-solid fa-gift"})],-1)),ve={class:"col-12"},_e={class:"col-12"},he={class:"col-12"},ye={class:"col-12"},Ce=I(()=>a("div",{class:"text-subtitle2"}," Vista de clientes ",-1)),Ve={style:{height:"500px",width:"100%"}};function xe(t,l,c,k,o,s){const E=y("l-tile-layer"),z=y("l-marker"),w=y("l-map");return r(),m(b,null,[i(Z,{class:"bg-grey-3 q-pa-xs"},{default:n(()=>[i(C,null,{default:n(()=>[i(p,{class:"q-pa-xs"},{default:n(()=>[i(G,{rows:o.clientes,columns:o.columns,dense:"","wrap-cells":"",flat:"",bordered:"","rows-per-page-options":[0],title:"Clientes",filter:o.filter},{"top-right":n(()=>[i(u,{icon:"download",color:"green",label:"Exportar",onClick:s.exportExcel,"no-caps":""},null,8,["onClick"]),i(u,{color:"primary",label:"Mapa",onClick:s.showGlobal,outline:"","no-caps":"",icon:"public",loading:o.loading},null,8,["onClick","loading"]),i(d,{modelValue:o.filter,"onUpdate:modelValue":l[0]||(l[0]=e=>o.filter=e),label:"Buscar",dense:"",outlined:""},{append:n(()=>[i(V,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-actions":n(e=>[i(N,{props:e},{default:n(()=>[i(F,{label:"Opciones","no-caps":"",size:"10px",dense:"",color:"primary"},{default:n(()=>[i(A,null,{default:n(()=>[v((r(),f(M,{clickable:"",onClick:Q=>s.modificar(e.row)},{default:n(()=>[i(_,{avatar:""},{default:n(()=>[i(V,{name:"edit"})]),_:1}),i(_,null,{default:n(()=>[i(j,null,{default:n(()=>[q("Editar")]),_:1})]),_:1})]),_:2},1032,["onClick"])),[[h]]),t.$store.user.role==="Admin"||t.$store.user.role==="Director"?v((r(),f(M,{key:0,clickable:"",onClick:Q=>s.userDelete(e.row.id)},{default:n(()=>[i(_,{avatar:""},{default:n(()=>[i(V,{name:"delete"})]),_:1}),i(_,null,{default:n(()=>[i(j,null,{default:n(()=>[q("Eliminar")]),_:1})]),_:1})]),_:2},1032,["onClick"])),[[h]]):T("",!0)]),_:2},1024)]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","filter"])]),_:1})]),_:1})]),_:1}),i(O,{position:"bottom-right",class:"text-bold",offset:[18,18]},{default:n(()=>[i(u,{fab:"",icon:"add",color:"primary",onClick:s.dialogClick},null,8,["onClick"])]),_:1}),i(U,{modelValue:o.dialog,"onUpdate:modelValue":l[19]||(l[19]=e=>o.dialog=e),position:s.esMovil?void 0:"right",maximized:!0,"transition-show":"slide-left","transition-hide":"slide-right"},{default:n(()=>[i(C,{style:{width:"450px","max-width":"100vw"}},{default:n(()=>[i(p,{class:"row items-center q-px-md bg-primary text-white q-px-none"},{default:n(()=>[v(i(u,{flat:"",round:"",dense:"",icon:"fa-solid fa-arrow-left"},null,512),[[h]]),i(S),a("div",ee,D(o.cliente.id?"Editar":"Nuevo")+" cliente",1)]),_:1}),i(p,null,{default:n(()=>[i(Y,{onSubmit:s.submit},{default:n(()=>[a("div",le,[a("div",oe,[i(g,{dense:"",modelValue:o.cliente.tipo_cliente,"onUpdate:modelValue":l[1]||(l[1]=e=>o.cliente.tipo_cliente=e),options:["FERRETERIA","OBRA","EMPRESA CONSTRUCTORA"],outlined:"",rules:[e=>!!e||"Este campo es requerido"],label:"Tipo"},null,8,["modelValue","rules"])]),a("div",te,[i(d,{dense:"",modelValue:o.cliente.nombre_cliente,"onUpdate:modelValue":l[2]||(l[2]=e=>o.cliente.nombre_cliente=e),outlined:"",label:"Cliente",rules:[e=>!!e||"Este campo es requerido"],onInput:l[3]||(l[3]=e=>o.cliente.nombre_cliente=o.cliente.nombre_cliente.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),a("div",ie,[i(d,{dense:"",modelValue:o.cliente.telefono_1,"onUpdate:modelValue":l[4]||(l[4]=e=>o.cliente.telefono_1=e),outlined:"",label:"Telefono cliente",type:"number",rules:[e=>!!e||"Este campo es requerido"]},null,8,["modelValue","rules"])]),a("div",ne,[i(d,{dense:"",modelValue:o.cliente.telefono_2,"onUpdate:modelValue":l[5]||(l[5]=e=>o.cliente.telefono_2=e),outlined:"",label:"Telefono cliente 2",type:"number"},null,8,["modelValue"])]),a("div",ae,[i(d,{dense:"",modelValue:o.cliente.direccion,"onUpdate:modelValue":l[6]||(l[6]=e=>o.cliente.direccion=e),outlined:"",label:"Direcci\xF3n",rules:[e=>!!e||"Este campo es requerido"],onInput:l[7]||(l[7]=e=>o.cliente.direccion=o.cliente.direccion.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),a("div",se,[i(d,{dense:"",modelValue:o.cliente.complemento,"onUpdate:modelValue":l[8]||(l[8]=e=>o.cliente.complemento=e),outlined:"",label:"Complemento",onInput:l[9]||(l[9]=e=>o.cliente.complemento=o.cliente.complemento.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue"])]),a("div",re,[i(d,{dense:"",modelValue:o.cliente.ubicacion,"onUpdate:modelValue":l[10]||(l[10]=e=>o.cliente.ubicacion=e),outlined:"",label:"Ubicacion"},{append:n(()=>[i(u,{flat:"",icon:"fa-solid fa-map-marker-alt",onClick:s.myLocation},null,8,["onClick"])]),_:1},8,["modelValue"])]),a("div",ce,[a("div",ue,[i(w,{ref:"map",zoom:o.zoom,"onUpdate:zoom":l[11]||(l[11]=e=>o.zoom=e),"use-global-leaflet":!1,center:o.location},{default:n(()=>[(r(!0),m(b,null,x(o.tileProviders,e=>(r(),f(E,{key:e.name,name:e.name,visible:e.visible,url:e.url,attribution:e.attribution,"layer-type":"base"},null,8,["name","visible","url","attribution"]))),128)),i(z,{"lat-lng":o.location,onMoveend:s.onMarkerMoveEnd,ref:"marker",draggable:!0},null,8,["lat-lng","onMoveend"])]),_:1},8,["zoom","center"])])]),a("div",de,[i(g,{dense:"",modelValue:o.cliente.zona,"onUpdate:modelValue":l[12]||(l[12]=e=>o.cliente.zona=e),options:t.zonas,"option-label":"nombre_zona","option-value":"nombre_zona",outlined:"","emit-value":"","map-options":"",rules:[e=>!!e||"Este campo es requerido"],label:"Seleccionar Zona"},null,8,["modelValue","options","rules"])]),a("div",me,[o.cliente.foto?(r(),m("img",{key:0,src:o.cliente.foto.includes("data")?o.cliente.foto:t.$url+".."+o.cliente.foto,alt:"Imagen del producto",class:"img-thumbnail",height:"100"},null,8,pe)):(r(),m("img",fe))]),a("div",ge,[be,a("input",{onChange:l[13]||(l[13]=(...e)=>s.previsualizarFoto&&s.previsualizarFoto(...e)),type:"file",accept:"image/png, image/jpg, image/gif",class:"form-control"},null,32)]),a("div",ve,[i(g,{dense:"",modelValue:o.cliente.ejecutivo,"onUpdate:modelValue":l[14]||(l[14]=e=>o.cliente.ejecutivo=e),options:t.ejecutivos,"option-label":"apodo","option-value":"apodo",outlined:"",label:"Seleccionar Ejecutivo",rules:[e=>!!e||"Este campo es requerido"],"emit-value":"","map-options":""},null,8,["modelValue","options","rules"])]),a("div",_e,[i(g,{dense:"",modelValue:o.cliente.region,"onUpdate:modelValue":l[15]||(l[15]=e=>o.cliente.region=e),options:o.regions,"option-value":"nombre_region","option-label":"nombre_region",outlined:"",label:"Regi\xF3n","map-options":"","emit-value":"",rules:[e=>!!e||"Seleccione una regi\xF3n"]},null,8,["modelValue","options","rules"])]),a("div",he,[i(d,{dense:"",modelValue:o.cliente.cumple,"onUpdate:modelValue":l[16]||(l[16]=e=>o.cliente.cumple=e),outlined:"",label:"Cumplea\xF1os",type:"date"},null,8,["modelValue"])]),a("div",ye,[i(g,{dense:"",modelValue:o.cliente.estado,"onUpdate:modelValue":l[17]||(l[17]=e=>o.cliente.estado=e),options:["Activo","Inactivo"],outlined:"",rules:[e=>!!e||"Este campo es requerido"],label:"Estado"},null,8,["modelValue","rules"])]),i(R,{align:"right"},{default:n(()=>[i(u,{label:"Cancelar",color:"negative",onClick:l[18]||(l[18]=e=>o.dialog=!1),loading:o.loading},null,8,["loading"]),i(u,{label:"Guardar",color:"primary",type:"submit",loading:o.loading},null,8,["loading"])]),_:1})])]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1},8,["modelValue","position"]),i(U,{modelValue:o.dialogGlobal,"onUpdate:modelValue":l[21]||(l[21]=e=>o.dialogGlobal=e)},{default:n(()=>[i(C,{style:{width:"650px","max-width":"650px"}},{default:n(()=>[i(p,{class:"q-pa-md row items-center"},{default:n(()=>[Ce,i(S),v(i(u,{flat:"",round:"",dense:"",icon:"close"},null,512),[[h]])]),_:1}),i(p,null,{default:n(()=>[a("div",Ve,[i(w,{ref:"map",zoom:o.zoom,"onUpdate:zoom":l[20]||(l[20]=e=>o.zoom=e),"use-global-leaflet":!1,center:o.location},{default:n(()=>[(r(!0),m(b,null,x(o.tileProviders,e=>(r(),f(E,{key:e.name,name:e.name,visible:e.visible,url:e.url,attribution:e.attribution,"layer-type":"base"},null,8,["name","visible","url","attribution"]))),128)),(r(!0),m(b,null,x(o.clientes,e=>(r(),f(z,{key:e.id,"lat-lng":[s.methonumber(e.lat),s.methonumber(e.lng)],onClick:Q=>s.showCliente(e)},null,8,["lat-lng","onClick"]))),128))]),_:1},8,["zoom","center"])])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}var Ze=P($,[["render",xe],["__scopeId","data-v-1c42aace"]]);export{Ze as default};