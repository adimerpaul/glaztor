import{Q as z}from"./QImg.033f2f32.js";import{Q as g,R as d,$ as p,U as n,T as s,aD as q,a1 as v,aC as j,aA as f,W as t,a0 as y,V as m,M as w,Z as a,bf as U,aB as c,a_ as I,aE as Q,S as M,b2 as L,b3 as S}from"./index.14a741ef.js";import{Q as B}from"./QMarkupTable.c9a1407f.js";import{Q as N}from"./QPage.45f73780.js";import{Q as T}from"./QPageSticky.36d36c08.js";import{Q as D,a as F}from"./QForm.52148441.js";import{Q as h}from"./QSelect.2c61fcd1.js";import{C as A}from"./ClosePopup.b46939d4.js";import{h as G}from"./moment.40bc58bf.js";import{i as Z,v as O,u as Y}from"./vue-leaflet.es.e9b64e8b.js";import{_ as R}from"./plugin-vue_export-helper.21dcd24c.js";import"./_commonjsHelpers.a26ce4be.js";const H={name:"ejecutivos",components:{LMap:Z,LTileLayer:O,LMarker:Y},data(){return{tileProviders:[{name:"Mapa",visible:!0,url:"https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",attribution:"&copy; Google Maps"},{name:"Satelite",visible:!1,url:"https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",attribution:"&copy; Google Maps"}],location:[-17.969753,-67.114749],zoom:15,propietarioBtnBool:!0,encargadoBtnBool:!0,ejecutivos:[],zonas:[],zona:{},cargos:[],ejecutivo:{},dialog:!1,loading:!1,nuevoEjecutivo:{zona_id:null}}},mounted(){this.getEjecutivo(),this.getZonas(),this.getCargos()},methods:{showLocation(i){const o=i.ubicacion.split(",")[0],u=i.ubicacion.split(",")[1],b=`https://www.google.com/maps/search/?api=1&query=${o},${u}`;window.open(b,"_blank")},getZonas(){this.loading=!0,this.$axios.get("zonas").then(i=>{this.zonas=i.data.map(o=>({id:o.id,nombre_zona:o.nombre_zona}))}).catch(i=>{console.error("Error al obtener las zonas:",i),this.$q.notify({color:"negative",message:"Error al obtener las zonas. Intenta nuevamente.",icon:"report_problem"})}).finally(()=>{this.loading=!1})},getCargos(){this.$axios.get("cargos").then(i=>{this.cargos=i.data}).catch(i=>{console.error("Error al obtener los cargos:",i)})},modificar(i){this.ejecutivo={...i},this.dialog=!0},confirmarGuardar(){this.$q.dialog({title:"Confirmar Guardado",message:"\xBFEst\xE1s seguro de que quieres guardar los cambios?",ok:{label:"S\xED",color:"primary"},cancel:{label:"No",color:"negative"}}).onOk(()=>{this.submit()})},eliminar(i){this.$q.dialog({title:"Eliminar Ejecutivo",message:"\xBFEst\xE1s seguro de eliminar este ejecutivo?",ok:{label:"Eliminar",color:"negative"},cancel:!0}).onOk(()=>{this.$axios.delete(`ejecutivos/${i}`).then(()=>{this.ejecutivos=this.ejecutivos.filter(o=>o.id!==i),this.$q.notify({color:"positive",message:"Ejecutivo eliminado con \xE9xito."})}).catch(o=>{this.$q.notify({color:"negative",message:"Hubo un error al eliminar el ejecutivo. Intenta nuevamente.",icon:"report_problem"})})})},dialogClick(){this.dialog=!0,this.ejecutivo={nombre:"",foto:"",cargo_id:null}},getEjecutivo(){this.$axios.get("ejecutivos").then(i=>{this.ejecutivos=i.data,this.getZonas(),this.getCargos()}).catch(i=>{console.log(i)})},showEjecutivo(i){this.ejecutivo=i,this.dialog=!0;const o=i.ubicacion.split(",").map(Number);console.log(o),this.location=o},onMarkerMoveEnd(i){const u=i.target.getLatLng();this.location=[u.lat,u.lng],this.ejecutivo.ubicacion=`${u.lat.toFixed(7)}, ${u.lng.toFixed(7)}`},myLocation(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(i=>{this.location=[i.coords.latitude,i.coords.longitude],this.ejecutivo.ubicacion=`${i.coords.latitude}, ${i.coords.longitude}`})},submit(){this.loading=!0;const i=this.ejecutivo.id?`ejecutivos/${this.ejecutivo.id}`:"ejecutivos",o=this.ejecutivo.id?"put":"post";this.$axios({method:o,url:i,data:this.ejecutivo}).then(u=>{this.$q.notify({color:"positive",message:this.ejecutivo.id?"Ejecutivo actualizado correctamente":"Ejecutivo creado correctamente",icon:"check_circle"}),this.dialog=!1,this.getEjecutivo()}).catch(u=>{this.$q.notify({color:"negative",message:"Hubo un error al guardar los datos. Intenta nuevamente.",icon:"report_problem"})}).finally(()=>{this.loading=!1})},dialogClick(){this.dialog=!0,this.ejecutivo={nombre_eje:"",apellido_eje:"",telefono_1:"",telefono_2:"",cargo:"",apodo:"",correo:"",direccion:"",ubicacion:"-17.969753, -67.114749",zona:"",cumple:G().format("YYYY-MM-DD"),estado:"ACTIVO"}},previsualizarFoto(i){var o=new FileReader;o.readAsDataURL(i.target.files[0]),o.onload=()=>{this.foto=o.result,this.ejecutivo.foto=this.foto}}},computed:{esMovil(){return this.$q.screen.lt.md}}},C=i=>(L("data-v-b6b09466"),i=i(),S(),i),P=C(()=>t("thead",null,[t("tr",null,[t("th",null,"Nombre"),t("th",null,"CI"),t("th",null,"Telefono"),t("th",null,"Telefono 2"),t("th",null,"Cargo"),t("th",null,"seud\xF3nimo"),t("th",null,"Correo"),t("th",null,"Direccion"),t("th",null,"Foto"),t("th",null,"Ubicacion"),t("th",null,"Zona"),t("th",null,"Cumplea\xF1os"),t("th",null,"Estado"),t("th",null,"Acciones")])],-1)),W=["href"],J={class:"text-h6"},K={class:"row"},X={class:"col-12"},$={class:"col-12"},ee={class:"col-12"},oe={class:"col-12"},le={class:"col-12"},te={class:"col-12"},ie={class:"col-12"},ne={class:"col-12"},se={class:"col-12"},ae={class:"col-12"},re={style:{height:"250px",width:"100%"}},ue={class:"col-12"},ce={class:"d-grid col-6 mx-auto mb-3"},de=["src"],me={key:1,height:"100",src:"https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-256.png",class:"img-thumbnail",id:"fotoimg",alt:""},pe={class:"input-group mb-3"},ge=C(()=>t("span",{class:"input-group-text"},[t("i",{class:"fa-solid fa-gift"})],-1)),ve={class:"col-12"},fe={class:"col-12"};function he(i,o,u,b,l,r){const V=g("l-tile-layer"),k=g("l-marker"),E=g("l-map");return d(),p(v,null,[n(N,{class:"bg-grey-2 q-pa-lg"},{default:s(()=>[n(j,null,{default:s(()=>[n(f,{class:"q-pa-sm"},{default:s(()=>[n(B,{dense:"","wrap-cells":""},{default:s(()=>[P,t("tbody",null,[(d(!0),p(v,null,y(l.ejecutivos,(e,x)=>(d(),p("tr",{key:x},[t("td",null,a(e.nombre_eje),1),t("td",null,a(e.ci),1),t("td",null,a(e.telefono_1),1),t("td",null,a(e.telefono_2),1),t("td",null,a(e.cargo),1),t("td",null,a(e.apodo),1),t("td",null,a(e.correo),1),t("td",null,a(e.direccion),1),t("td",null,[e.foto?(d(),p("a",{key:0,href:i.$url+".."+e.foto,target:"_blank"},[n(z,{src:i.$url+".."+e.foto,alt:"Imagen del ejecutivo",class:"img-thumbnail",height:"10"},null,8,["src"])],8,W)):Q("",!0)]),t("td",null,[n(m,{color:"red",flat:"",dense:"",onClick:_=>r.showLocation(e),icon:"fa-solid fa-map-marker-alt"},null,8,["onClick"])]),t("td",null,a(e.zona),1),t("td",null,a(e.cumple),1),t("td",null,a(e.estado),1),t("td",null,[n(m,{flat:"",dense:"",icon:"edit",color:"blue",label:"Editar",onClick:_=>r.modificar(e)},null,8,["onClick"]),n(m,{flat:"",dense:"",icon:"delete",color:"negative",label:"Eliminar",onClick:_=>r.eliminar(e.id)},null,8,["onClick"])])]))),128))])]),_:1})]),_:1})]),_:1})]),_:1}),n(T,{position:"bottom-right",class:"text-bold",offset:[18,18]},{default:s(()=>[n(m,{fab:"",icon:"add",color:"primary",onClick:r.dialogClick},null,8,["onClick"])]),_:1}),n(q,{modelValue:l.dialog,"onUpdate:modelValue":o[20]||(o[20]=e=>l.dialog=e),position:r.esMovil?void 0:"right",maximized:!0,"transition-show":"slide-left","transition-hide":"slide-right"},{default:s(()=>[n(j,{style:{width:"450px","max-width":"100vw"}},{default:s(()=>[n(f,{class:"row items-center q-px-md bg-primary text-white q-px-none"},{default:s(()=>[w(n(m,{flat:"",round:"",dense:"",icon:"fa-solid fa-arrow-left"},null,512),[[A]]),n(D),t("div",J,a(l.ejecutivo.id?"Editar":"Nuevo")+" Ejecutivo",1)]),_:1}),n(f,null,{default:s(()=>[n(F,{onSubmit:U(r.confirmarGuardar,["prevent"])},{default:s(()=>[t("div",K,[t("div",X,[n(c,{dense:"",modelValue:l.ejecutivo.nombre_eje,"onUpdate:modelValue":o[0]||(o[0]=e=>l.ejecutivo.nombre_eje=e),outlined:"",label:"Nombre",rules:[e=>!!e||"Este campo es requerido"],onInput:o[1]||(o[1]=e=>l.ejecutivo.nombre_eje=l.ejecutivo.nombre_eje.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),t("div",$,[n(c,{dense:"",modelValue:l.ejecutivo.apellido_eje,"onUpdate:modelValue":o[2]||(o[2]=e=>l.ejecutivo.apellido_eje=e),outlined:"",label:"CI",rules:[e=>!!e||"Este campo es requerido"],onInput:o[3]||(o[3]=e=>l.ejecutivo.apellido_eje=l.ejecutivo.apellido_eje.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),t("div",ee,[n(c,{dense:"",modelValue:l.ejecutivo.telefono_1,"onUpdate:modelValue":o[4]||(o[4]=e=>l.ejecutivo.telefono_1=e),outlined:"",label:"Telefono ejecutivo",type:"number",rules:[e=>!!e||"Este campo es requerido"]},null,8,["modelValue","rules"])]),t("div",oe,[n(c,{dense:"",modelValue:l.ejecutivo.telefono_2,"onUpdate:modelValue":o[5]||(o[5]=e=>l.ejecutivo.telefono_2=e),outlined:"",label:"Telefono ejecutivo 2",type:"number"},null,8,["modelValue"])]),t("div",le,[n(h,{dense:"",modelValue:l.ejecutivo.cargo,"onUpdate:modelValue":o[6]||(o[6]=e=>l.ejecutivo.cargo=e),options:l.cargos,outlined:"",rules:[e=>!!e||"Este campo es requerido"],label:"Cargo","option-label":"nombre_cargo","option-value":"nombre_cargo","emit-value":"","map-options":""},null,8,["modelValue","options","rules"])]),t("div",te,[n(c,{dense:"",modelValue:l.ejecutivo.apodo,"onUpdate:modelValue":o[7]||(o[7]=e=>l.ejecutivo.apodo=e),outlined:"",label:"Nombre corto",rules:[e=>!!e||"Este campo es requerido"],onInput:o[8]||(o[8]=e=>l.ejecutivo.apodo=l.ejecutivo.apodo.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),t("div",ie,[n(c,{dense:"",modelValue:l.ejecutivo.correo,"onUpdate:modelValue":o[9]||(o[9]=e=>l.ejecutivo.correo=e),outlined:"",label:"Correo",rules:[e=>!!e||"Este campo es requerido"],onInput:o[10]||(o[10]=e=>l.ejecutivo.correo=l.ejecutivo.correo.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),t("div",ne,[n(c,{dense:"",modelValue:l.ejecutivo.direccion,"onUpdate:modelValue":o[11]||(o[11]=e=>l.ejecutivo.direccion=e),outlined:"",label:"Direcci\xF3n",rules:[e=>!!e||"Este campo es requerido"],onInput:o[12]||(o[12]=e=>l.ejecutivo.direccion=l.ejecutivo.direccion.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),t("div",se,[n(c,{dense:"",modelValue:l.ejecutivo.ubicacion,"onUpdate:modelValue":o[13]||(o[13]=e=>l.ejecutivo.ubicacion=e),outlined:"",label:"Ubicacion"},{append:s(()=>[n(m,{flat:"",icon:"fa-solid fa-map-marker-alt",onClick:r.myLocation},null,8,["onClick"])]),_:1},8,["modelValue"])]),t("div",ae,[t("div",re,[n(E,{ref:"map",zoom:l.zoom,"onUpdate:zoom":o[14]||(o[14]=e=>l.zoom=e),"use-global-leaflet":!1,center:l.location},{default:s(()=>[(d(!0),p(v,null,y(l.tileProviders,e=>(d(),M(V,{key:e.name,name:e.name,visible:e.visible,url:e.url,attribution:e.attribution,"layer-type":"base"},null,8,["name","visible","url","attribution"]))),128)),n(k,{"lat-lng":l.location,onMoveend:r.onMarkerMoveEnd,ref:"marker",draggable:!0},null,8,["lat-lng","onMoveend"])]),_:1},8,["zoom","center"])])]),t("div",ue,[n(h,{dense:"",modelValue:l.ejecutivo.zona,"onUpdate:modelValue":o[15]||(o[15]=e=>l.ejecutivo.zona=e),options:l.zonas,"option-label":"nombre_zona","option-value":"nombre_zona",outlined:"","emit-value":"","map-options":"",rules:[e=>!!e||"Este campo es requerido"],label:"Seleccionar Zona"},null,8,["modelValue","options","rules"])]),t("div",ce,[l.ejecutivo.foto?(d(),p("img",{key:0,src:l.ejecutivo.foto.includes("data")?l.ejecutivo.foto:i.$url+".."+l.ejecutivo.foto,alt:"Imagen del producto",class:"img-thumbnail",height:"100"},null,8,de)):(d(),p("img",me))]),t("div",pe,[ge,t("input",{onChange:o[16]||(o[16]=(...e)=>r.previsualizarFoto&&r.previsualizarFoto(...e)),type:"file",accept:"image/png, image/jpg, image/gif",class:"form-control"},null,32)]),t("div",ve,[n(c,{dense:"",modelValue:l.ejecutivo.cumple,"onUpdate:modelValue":o[17]||(o[17]=e=>l.ejecutivo.cumple=e),outlined:"",label:"Cumplea\xF1os",type:"date"},null,8,["modelValue"])]),t("div",fe,[n(h,{dense:"",modelValue:l.ejecutivo.estado,"onUpdate:modelValue":o[18]||(o[18]=e=>l.ejecutivo.estado=e),options:["ACTIVO","INACTIVO"],outlined:"",rules:[e=>!!e||"Este campo es requerido"],label:"Estado"},null,8,["modelValue","rules"])]),n(I,{align:"right"},{default:s(()=>[n(m,{label:"Cancelar",color:"negative",onClick:o[19]||(o[19]=e=>l.dialog=!1),loading:l.loading},null,8,["loading"]),n(m,{label:"Guardar",color:"primary",type:"submit",loading:l.loading},null,8,["loading"])]),_:1})])]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1},8,["modelValue","position"])],64)}var Ue=R(H,[["render",he],["__scopeId","data-v-b6b09466"]]);export{Ue as default};