import{M as h,O as r,Y as p,R as s,Q as n,ax as z,_ as g,ay as C,az as v,T as t,Z as _,S as m,J as E,W as a,P as b,aA as d,aC as w,b0 as U,b1 as q}from"./index.5f1aaf33.js";import{Q as M}from"./QPage.ef24b83f.js";import{Q}from"./QPageSticky.a6e1642a.js";import{Q as I,a as L}from"./QForm.cfb1bf6c.js";import{Q as f}from"./QSelect.4f82e7ea.js";import{C as S}from"./ClosePopup.a953a791.js";import{h as Z}from"./moment.40bc58bf.js";import{i as B,v as T,u as A}from"./vue-leaflet.es.7c495738.js";import{_ as D}from"./plugin-vue_export-helper.21dcd24c.js";import"./_commonjsHelpers.dffb1198.js";const N={name:"ejecutivos",components:{LMap:B,LTileLayer:T,LMarker:A},data(){return{tileProviders:[{name:"Mapa",visible:!0,url:"https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",attribution:"&copy; Google Maps"},{name:"Satelite",visible:!1,url:"https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",attribution:"&copy; Google Maps"}],location:[-17.969753,-67.114749],zoom:15,propietarioBtnBool:!0,encargadoBtnBool:!0,ejecutivos:[],zonas:[],zona:{},cargos:[],ejecutivo:{},dialog:!1,loading:!1,nuevoEjecutivo:{zona_id:null}}},mounted(){this.getEjecutivo(),this.getZonas(),this.getCargos()},methods:{showLocation(i){const l=i.ubicacion.split(",")[0],u=i.ubicacion.split(",")[1],y=`https://www.google.com/maps/search/?api=1&query=${l},${u}`;window.open(y,"_blank")},getZonas(){this.loading=!0,this.$axios.get("zonas").then(i=>{this.zonas=i.data.map(l=>({id:l.id,nombre_zona:l.nombre_zona}))}).catch(i=>{console.error("Error al obtener las zonas:",i),this.$q.notify({color:"negative",message:"Error al obtener las zonas. Intenta nuevamente.",icon:"report_problem"})}).finally(()=>{this.loading=!1})},getCargos(){this.$axios.get("cargos").then(i=>{this.cargos=i.data}).catch(i=>{console.error("Error al obtener los cargos:",i)})},modificar(i){this.ejecutivo={...i},this.dialog=!0},confirmarGuardar(){},eliminar(i){},dialogClick(){this.dialog=!0,this.ejecutivo={nombre:"",cargo_id:null}},getEjecutivo(){this.$axios.get("ejecutivos").then(i=>{this.ejecutivos=i.data,this.getZonas(),this.getCargos()}).catch(i=>{console.log(i)})},showEjecutivo(i){this.ejecutivo=i,this.dialog=!0;const l=i.ubicacion.split(",").map(Number);console.log(l),this.location=l},onMarkerMoveEnd(i){const u=i.target.getLatLng();this.location=[u.lat,u.lng],this.ejecutivo.ubicacion=`${u.lat.toFixed(7)}, ${u.lng.toFixed(7)}`},myLocation(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(i=>{this.location=[i.coords.latitude,i.coords.longitude],this.ejecutivo.ubicacion=`${i.coords.latitude}, ${i.coords.longitude}`})},submit(){this.loading=!0,this.$axios.post("ejecutivos",this.ejecutivo).then(i=>{this.ejecutivos.push(i.data),this.dialog=!1}).catch(i=>{console.log(i)}).finally(()=>{this.loading=!1})},dialogClick(){this.dialog=!0,this.ejecutivo={nombre_eje:"",apellido_eje:"",telefono_1:"",telefono_2:"",cargo:"",apodo:"",correo:"",direccion:"",ubicacion:"-17.969753, -67.114749",zona:"",cumple:Z().format("YYYY-MM-DD"),estado:"ACTIVO"}}},computed:{esMovil(){return this.$q.screen.lt.md}}},Y=i=>(U("data-v-205cb88e"),i=i(),q(),i),F={border:"1",style:{width:"100%","border-collapse":"collapse"},class:"styled-table"},G=Y(()=>t("thead",null,[t("tr",null,[t("th",{style:{padding:"5px"}},"Nombre"),t("th",{style:{padding:"5px"}},"Apellido"),t("th",{style:{padding:"5px"}},"Telefono"),t("th",{style:{padding:"5px"}},"Telefono 2"),t("th",{style:{padding:"5px"}},"Cargo"),t("th",{style:{padding:"5px"}},"seud\xF3nimo"),t("th",{style:{padding:"5px"}},"Correo"),t("th",{style:{padding:"5px"}},"Direccion"),t("th",{style:{width:"10%",padding:"5px"}},"Ubicacion"),t("th",{style:{padding:"5px"}},"Zona"),t("th",{style:{padding:"5px"}},"Cumplea\xF1os"),t("th",{style:{padding:"5px"}},"Estado")])],-1)),O={style:{padding:"5px","line-height":"1.2"}},W={style:{padding:"5px","line-height":"1.2"}},J={style:{padding:"5px","line-height":"1.2"}},R={style:{padding:"5px","line-height":"1.2"}},H={style:{padding:"5px","line-height":"1.2"}},K={style:{padding:"5px","line-height":"1.2"}},P={style:{padding:"5px","line-height":"1.2"}},X={style:{padding:"5px","line-height":"1.2"}},$={style:{padding:"2px","line-height":"1.2"}},ee={style:{padding:"5px","line-height":"1.2"}},oe={style:{padding:"5px","line-height":"1.2"}},le={style:{padding:"5px","line-height":"1.2"}},te={class:"text-h6"},ie={class:"row"},se={class:"col-12"},ne={class:"col-12"},ae={class:"col-12"},re={class:"col-12"},de={class:"col-12"},ue={class:"col-12"},ce={class:"col-12"},pe={class:"col-12"},me={class:"col-12"},ge={class:"col-12"},he={style:{height:"250px",width:"100%"}},ve={class:"col-12"},_e={class:"col-12"},be={class:"col-12"},fe={key:1,class:"row"},ye={class:"col-5"},je={style:{height:"150px",width:"100%"}};function xe(i,l,u,y,o,c){const j=h("l-tile-layer"),x=h("l-marker"),V=h("l-map");return r(),p(g,null,[s(M,{class:"bg-grey-3 q-pa-xs"},{default:n(()=>[s(C,null,{default:n(()=>[s(v,{class:"q-pa-xs"},{default:n(()=>[t("table",F,[G,t("tbody",null,[(r(!0),p(g,null,_(o.ejecutivos,(e,k)=>(r(),p("tr",{key:k},[t("td",O,a(e.nombre_eje),1),t("td",W,a(e.apellido_eje),1),t("td",J,a(e.telefono_1),1),t("td",R,a(e.telefono_2),1),t("td",H,a(e.cargo),1),t("td",K,a(e.apodo),1),t("td",P,a(e.correo),1),t("td",X,a(e.direccion),1),t("td",$,[s(m,{color:"red",flat:"",dense:"",style:{height:"0"},onClick:Ve=>c.showLocation(e),icon:"fa-solid fa-map-marker-alt"},null,8,["onClick"])]),t("td",ee,a(e.zona),1),t("td",oe,a(e.cumple),1),t("td",le,a(e.estado),1)]))),128))])])]),_:1})]),_:1})]),_:1}),s(Q,{position:"bottom-right",class:"text-bold",offset:[18,18]},{default:n(()=>[s(m,{fab:"",icon:"add",color:"primary",onClick:c.dialogClick},null,8,["onClick"])]),_:1}),s(z,{modelValue:o.dialog,"onUpdate:modelValue":l[20]||(l[20]=e=>o.dialog=e),position:c.esMovil?void 0:"right",maximized:!0,"transition-show":"slide-left","transition-hide":"slide-right"},{default:n(()=>[s(C,{style:{width:"450px","max-width":"100vw"}},{default:n(()=>[s(v,{class:"row items-center q-px-md bg-primary text-white q-px-none"},{default:n(()=>[E(s(m,{flat:"",round:"",dense:"",icon:"fa-solid fa-arrow-left"},null,512),[[S]]),s(I),t("div",te,a(o.ejecutivo.id?"Editar":"Nuevo")+" Ejecutivo",1)]),_:1}),s(v,null,{default:n(()=>[o.ejecutivo.id?(r(),p("div",fe,[t("div",ye,[t("div",je,[s(V,{ref:"map",zoom:o.zoom,"onUpdate:zoom":l[19]||(l[19]=e=>o.zoom=e),"use-global-leaflet":!1,center:o.location,scrollWheelZoom:!1,dragging:!1,touchZoom:!1,doubleClickZoom:!1,boxZoom:!1,keyboard:!1},{default:n(()=>[(r(!0),p(g,null,_(o.tileProviders,e=>(r(),b(j,{key:e.name,name:e.name,visible:e.visible,url:e.url,attribution:e.attribution,"layer-type":"base"},null,8,["name","visible","url","attribution"]))),128)),s(x,{"lat-lng":o.location,ref:"marker"},null,8,["lat-lng"])]),_:1},8,["zoom","center"])])])])):(r(),b(L,{key:0,onSubmit:c.submit},{default:n(()=>[t("div",ie,[t("div",se,[s(d,{dense:"",modelValue:o.ejecutivo.nombre_eje,"onUpdate:modelValue":l[0]||(l[0]=e=>o.ejecutivo.nombre_eje=e),outlined:"",label:"Nombre",rules:[e=>!!e||"Este campo es requerido"],onInput:l[1]||(l[1]=e=>o.ejecutivo.nombre_eje=o.ejecutivo.nombre_eje.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),t("div",ne,[s(d,{dense:"",modelValue:o.ejecutivo.apellido_eje,"onUpdate:modelValue":l[2]||(l[2]=e=>o.ejecutivo.apellido_eje=e),outlined:"",label:"Apellido",rules:[e=>!!e||"Este campo es requerido"],onInput:l[3]||(l[3]=e=>o.ejecutivo.apellido_eje=o.ejecutivo.apellido_eje.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),t("div",ae,[s(d,{dense:"",modelValue:o.ejecutivo.telefono_1,"onUpdate:modelValue":l[4]||(l[4]=e=>o.ejecutivo.telefono_1=e),outlined:"",label:"Telefono ejecutivo",type:"number",rules:[e=>!!e||"Este campo es requerido"]},null,8,["modelValue","rules"])]),t("div",re,[s(d,{dense:"",modelValue:o.ejecutivo.telefono_2,"onUpdate:modelValue":l[5]||(l[5]=e=>o.ejecutivo.telefono_2=e),outlined:"",label:"Telefono ejecutivo 2",type:"number"},null,8,["modelValue"])]),t("div",de,[s(f,{dense:"",modelValue:o.ejecutivo.cargo_id,"onUpdate:modelValue":l[6]||(l[6]=e=>o.ejecutivo.cargo_id=e),options:o.cargos,outlined:"",rules:[e=>!!e||"Este campo es requerido"],label:"Cargo","option-label":"nombre_cargo","option-value":"id"},null,8,["modelValue","options","rules"])]),t("div",ue,[s(d,{dense:"",modelValue:o.ejecutivo.apodo,"onUpdate:modelValue":l[7]||(l[7]=e=>o.ejecutivo.apodo=e),outlined:"",label:"seud\xF3nimo",rules:[e=>!!e||"Este campo es requerido"],onInput:l[8]||(l[8]=e=>o.ejecutivo.apodo=o.ejecutivo.apodo.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),t("div",ce,[s(d,{dense:"",modelValue:o.ejecutivo.correo,"onUpdate:modelValue":l[9]||(l[9]=e=>o.ejecutivo.correo=e),outlined:"",label:"Correo",rules:[e=>!!e||"Este campo es requerido"],onInput:l[10]||(l[10]=e=>o.ejecutivo.correo=o.ejecutivo.correo.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),t("div",pe,[s(d,{dense:"",modelValue:o.ejecutivo.direccion,"onUpdate:modelValue":l[11]||(l[11]=e=>o.ejecutivo.direccion=e),outlined:"",label:"Direcci\xF3n",rules:[e=>!!e||"Este campo es requerido"],onInput:l[12]||(l[12]=e=>o.ejecutivo.direccion=o.ejecutivo.direccion.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),t("div",me,[s(d,{dense:"",modelValue:o.ejecutivo.ubicacion,"onUpdate:modelValue":l[13]||(l[13]=e=>o.ejecutivo.ubicacion=e),outlined:"",label:"Ubicacion"},{append:n(()=>[s(m,{flat:"",icon:"fa-solid fa-map-marker-alt",onClick:c.myLocation},null,8,["onClick"])]),_:1},8,["modelValue"])]),t("div",ge,[t("div",he,[s(V,{ref:"map",zoom:o.zoom,"onUpdate:zoom":l[14]||(l[14]=e=>o.zoom=e),"use-global-leaflet":!1,center:o.location},{default:n(()=>[(r(!0),p(g,null,_(o.tileProviders,e=>(r(),b(j,{key:e.name,name:e.name,visible:e.visible,url:e.url,attribution:e.attribution,"layer-type":"base"},null,8,["name","visible","url","attribution"]))),128)),s(x,{"lat-lng":o.location,onMoveend:c.onMarkerMoveEnd,ref:"marker",draggable:!0},null,8,["lat-lng","onMoveend"])]),_:1},8,["zoom","center"])])]),t("div",ve,[s(f,{dense:"",modelValue:o.nuevoEjecutivo.zona_id,"onUpdate:modelValue":l[15]||(l[15]=e=>o.nuevoEjecutivo.zona_id=e),options:o.zonas,"option-label":"nombre_zona","option-value":"id",outlined:"",rules:[e=>!!e||"Este campo es requerido"],label:"Seleccionar Zona"},null,8,["modelValue","options","rules"])]),t("div",_e,[s(d,{dense:"",modelValue:o.ejecutivo.cumple,"onUpdate:modelValue":l[16]||(l[16]=e=>o.ejecutivo.cumple=e),outlined:"",label:"Cumplea\xF1os",type:"date"},null,8,["modelValue"])]),t("div",be,[s(f,{dense:"",modelValue:o.ejecutivo.estado,"onUpdate:modelValue":l[17]||(l[17]=e=>o.ejecutivo.estado=e),options:["ACTIVO","INACTIVO"],outlined:"",rules:[e=>!!e||"Este campo es requerido"],label:"Estado"},null,8,["modelValue","rules"])]),s(w,{align:"right"},{default:n(()=>[s(m,{label:"Cancelar",color:"negative",onClick:l[18]||(l[18]=e=>o.dialog=!1),loading:o.loading},null,8,["loading"]),s(m,{label:"Guardar",color:"primary",type:"submit",loading:o.loading},null,8,["loading"])]),_:1})])]),_:1},8,["onSubmit"]))]),_:1})]),_:1})]),_:1},8,["modelValue","position"])],64)}var Le=D(N,[["render",xe],["__scopeId","data-v-205cb88e"]]);export{Le as default};
