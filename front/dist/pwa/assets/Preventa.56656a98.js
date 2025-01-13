import{Q as V,R as r,$ as p,U as s,T as i,aD as P,a1 as m,aC as M,aA as g,_ as S,S as _,Y as h,aE as k,a0 as C,V as d,M as L,W as t,Z as a,aB as u,a_ as q,X as U}from"./index.e95100ec.js";import{d as b,e as f,a as E}from"./format.39f6ce55.js";import{Q as T}from"./QList.cb00ee73.js";import{Q as D}from"./QPage.a2881a74.js";import{Q as N}from"./QPageSticky.6289ab09.js";import{Q as w}from"./QSpace.5ba5662b.js";import{Q as x}from"./QSelect.b493f8f7.js";import{Q as F}from"./QForm.c582a3d7.js";import{C as O}from"./ClosePopup.c6d1387a.js";import{h as Z}from"./moment.40bc58bf.js";import{i as A,v as I,u as G}from"./vue-leaflet.es.ab787512.js";import{_ as Y}from"./plugin-vue_export-helper.21dcd24c.js";import"./_commonjsHelpers.a26ce4be.js";const R={name:"Preventa",components:{LMap:A,LTileLayer:I,LMarker:G},data(){return{tileProviders:[{name:"Mapa",visible:!0,url:"https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",attribution:"&copy; Google Maps"},{name:"Satelite",visible:!1,url:"https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",attribution:"&copy; Google Maps"}],location:[-17.969753,-67.114749],zoom:15,propietarioBtnBool:!0,encargadoBtnBool:!0,preventas:[],preventa:{},dialog:!1,loading:!1,productosAll:[],products:[],marcas:[]}},mounted(){this.getPreventas(),this.getProductos()},methods:{filterProducts(n){console.log(n),n!==null&&(this.products=this.productosAll.filter(l=>(l==null?void 0:l.marca_pro)===n))},getProductos(){this.$axios.get("productos").then(n=>{this.productosAll=n.data,this.products=this.productosAll,this.products.forEach(l=>{this.marcas.includes(l.marca_pro)||this.marcas.push(l.marca_pro)})}).catch(n=>{console.log(n)})},onMapClick(n){this.location=[n.latlng.lat,n.latlng.lng],this.preventa.ubicacion=`${n.latlng.lat.toFixed(7)}, ${n.latlng.lng.toFixed(7)}`},openGoogleMaps(){const[n,l]=this.preventa.ubicacion.split(",").map(Number);window.open(`https://www.google.com/maps/search/?api=1&query=${n},${l}`)},deletePreventa(n){this.$alert.dialog("\xBFDesea eliminar la preventa?").onOk(()=>{this.$axios.delete(`preventas/${n.id}`).then(()=>{this.preventas=this.preventas.filter(l=>l.id!==n.id),this.dialog=!1}).catch(l=>{console.log(l)})})},showPreventa(n){this.preventa=n,this.dialog=!0;const l=n.ubicacion.split(",").map(Number);console.log(l),this.location=l},onMarkerMoveEnd(n){const v=n.target.getLatLng();this.location=[v.lat,v.lng],this.preventa.ubicacion=`${v.lat.toFixed(7)}, ${v.lng.toFixed(7)}`},myLocation(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(n=>{this.location=[n.coords.latitude,n.coords.longitude],this.preventa.ubicacion=`${n.coords.latitude}, ${n.coords.longitude}`})},submit(){this.loading=!0,this.$axios.post("preventas",this.preventa).then(n=>{this.preventas.unshift(n.data),this.dialog=!1}).catch(n=>{console.log(n)}).finally(()=>{this.loading=!1})},dialogClick(){this.dialog=!0,this.preventa={fecha:Z().format("YYYY-MM-DD"),propietario:"",contratista:"",telefono_propietario:"",telefono_contratista:"",ubicacion:"-17.969753, -67.114749",zona:"",observacion:"",tipo_construccion:"",volumen:"",marca:"",direccion:""}},getPreventas(){this.$axios.get("preventas").then(n=>{this.preventas=n.data}).catch(n=>{console.log(n)})}},computed:{esMovil(){return this.$q.screen.lt.md}}},W=t("div",{class:"text-h5 text-primary"},"Lista de Preventas",-1),X=t("div",{class:"text-body2 text-grey-8"},"Selecciona una preventa para m\xE1s detalles",-1),j={class:"text-h6"},H={class:"row"},J={class:"col-12"},K={class:"col-6 q-pa-xs"},$={class:"col-6 q-pa-xs"},ee={class:"col-12"},oe={class:"col-12"},te={class:"col-12"},le={class:"col-12"},se={class:"col-12"},ne={class:"col-12"},ie={style:{height:"250px",width:"100%"}},ae={class:"col-12"},re={class:"col-12"},ce={class:"col-12"},de={class:"col-12"},ue={class:"col-12"},pe={class:"col-12"},me={class:"col-12"},ve={key:1,class:"row"},_e={class:"col-12 row items-center"},ge=t("label",{class:"text-grey text-caption"},"Fecha:",-1),he={class:"text-bold"},be={class:"div"},fe={class:"col-6"},xe=t("label",{class:"text-grey text-caption"},"Propietario:",-1),ye={class:"text-bold"},Ve={class:"col-6"},ke=t("label",{class:"text-grey text-caption"},"Contratista:",-1),Ce={class:"text-bold"},we={class:"col-6"},Be=t("label",{class:"text-grey text-caption"},"Tel\xE9fono Propietario:",-1),Qe={class:"text-bold"},ze={class:"col-6"},Me=t("label",{class:"text-grey text-caption"},"Tel\xE9fono Contratista:",-1),Ue={class:"text-bold"},Ee={class:"col-12 row items-center"},Pe=t("label",{class:"text-grey text-caption"},"Ubicaci\xF3n:",-1),Se={class:"text-bold"},Le={class:"div"},qe={class:"col-12"},Te={style:{height:"250px",width:"100%"}},De={class:"col-12"},Ne=t("label",{class:"text-grey text-caption"},"Direcci\xF3n:",-1),Fe={class:"text-bold"},Oe={class:"col-6"},Ze=t("label",{class:"text-grey text-caption"},"Zona:",-1),Ae={class:"text-bold"},Ie={class:"col-6"},Ge=t("label",{class:"text-grey text-caption"},"Observaci\xF3n:",-1),Ye={class:"text-bold"},Re={class:"col-6"},We=t("label",{class:"text-grey text-caption"},"Tipo Construcci\xF3n:",-1),Xe={class:"text-bold"},je={class:"col-6"},He=t("label",{class:"text-grey text-caption"},"Volumen:",-1),Je={class:"text-bold"},Ke={class:"col-6"},$e=t("label",{class:"text-grey text-caption"},"Marca:",-1),eo={class:"text-bold"};function oo(n,l,v,to,e,c){const B=V("l-tile-layer"),Q=V("l-marker"),z=V("l-map");return r(),p(m,null,[s(D,{class:"bg-grey-2 q-pa-md"},{default:i(()=>[s(M,{flat:"",bordered:"",class:"q-pa-md"},{default:i(()=>[s(g,null,{default:i(()=>[W,X]),_:1}),s(S,{spaced:""}),s(g,{class:"q-pa-none"},{default:i(()=>[s(T,{dense:"",class:"rounded-borders"},{default:i(()=>[e.preventas.length===0?(r(),_(E,{key:0},{default:i(()=>[s(b,null,{default:i(()=>[s(f,{class:"text-h6 text-grey"},{default:i(()=>[h("No hay preventas")]),_:1})]),_:1})]),_:1})):k("",!0),(r(!0),p(m,null,C(e.preventas,o=>(r(),_(E,{key:o.id,onClick:y=>c.showPreventa(o),clickable:"",class:"q-my-sm bg-white hover-bg-light-blue",style:{border:"1px solid #e0e0e0","border-radius":"8px"}},{default:i(()=>[s(b,{avatar:""},{default:i(()=>[s(U,{name:"home",color:"grey",size:"md"})]),_:1}),s(b,null,{default:i(()=>[s(f,{class:"text-h6"},{default:i(()=>[h(a(o.propietario||"Sin propietario")+" "+a(o.telefono_propietario?`(${o.telefono_propietario})`:""),1)]),_:2},1024),s(f,{class:"text-subtitle1 text-grey"},{default:i(()=>[h(a(o.direccion),1)]),_:2},1024),s(f,{class:"text-caption text-positive"},{default:i(()=>{var y;return[h(a(o.zona)+" - "+a(o.tipo_construccion)+" - "+a((y=o.user)==null?void 0:y.name)+" - "+a(o.fecha),1)]}),_:2},1024)]),_:2},1024),s(b,{side:""},{default:i(()=>[s(U,{name:"arrow_forward"})]),_:1})]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1})]),_:1})]),_:1}),s(N,{position:"bottom-right",class:"text-bold",offset:[18,18]},{default:i(()=>[s(d,{fab:"",icon:"add",color:"primary",onClick:c.dialogClick},null,8,["onClick"])]),_:1}),s(P,{modelValue:e.dialog,"onUpdate:modelValue":l[19]||(l[19]=o=>e.dialog=o),position:c.esMovil?void 0:"right",maximized:!0,"transition-show":"slide-left","transition-hide":"slide-right"},{default:i(()=>[s(M,{style:{width:"450px","max-width":"100vw"}},{default:i(()=>[s(g,{class:"row items-center q-px-md bg-primary text-white q-px-none"},{default:i(()=>[L(s(d,{flat:"",round:"",dense:"",icon:"fa-solid fa-arrow-left"},null,512),[[O]]),s(w),t("div",j,a(e.preventa.id?"Editar":"Nueva")+" preventa",1)]),_:1}),s(g,null,{default:i(()=>[e.preventa.id?(r(),p("div",ve,[t("div",_e,[t("div",null,[ge,t("div",he,a(e.preventa.fecha),1)]),s(w),t("div",be,[s(d,{icon:"delete",color:"negative",onClick:l[17]||(l[17]=o=>c.deletePreventa(e.preventa)),dense:"",flat:""})])]),t("div",fe,[xe,t("div",ye,a(e.preventa.propietario),1)]),t("div",Ve,[ke,t("div",Ce,a(e.preventa.contratista),1)]),t("div",we,[Be,t("div",Qe,a(e.preventa.telefono_propietario),1)]),t("div",ze,[Me,t("div",Ue,a(e.preventa.telefono_contratista),1)]),t("div",Ee,[t("div",null,[Pe,t("div",Se,a(e.preventa.ubicacion),1)]),s(w),t("div",Le,[s(d,{icon:"my_location",color:"primary",onClick:c.openGoogleMaps,dense:"",flat:""},null,8,["onClick"])])]),t("div",qe,[t("div",Te,[s(z,{ref:"map",zoom:e.zoom,"onUpdate:zoom":l[18]||(l[18]=o=>e.zoom=o),"use-global-leaflet":!1,center:e.location,scrollWheelZoom:!1,dragging:!1,touchZoom:!1,doubleClickZoom:!1,boxZoom:!1,keyboard:!1},{default:i(()=>[(r(!0),p(m,null,C(e.tileProviders,o=>(r(),_(B,{key:o.name,name:o.name,visible:o.visible,url:o.url,attribution:o.attribution,"layer-type":"base"},null,8,["name","visible","url","attribution"]))),128)),s(Q,{"lat-lng":e.location,ref:"marker"},null,8,["lat-lng"])]),_:1},8,["zoom","center"])])]),t("div",De,[Ne,t("div",Fe,a(e.preventa.direccion),1)]),t("div",Oe,[Ze,t("div",Ae,a(e.preventa.zona),1)]),t("div",Ie,[Ge,t("div",Ye,a(e.preventa.observacion),1)]),t("div",Re,[We,t("div",Xe,a(e.preventa.tipo_construccion),1)]),t("div",je,[He,t("div",Je,a(e.preventa.volumen),1)]),t("div",Ke,[$e,t("div",eo,a(e.preventa.marca),1)])])):(r(),_(F,{key:0,onSubmit:c.submit},{default:i(()=>[t("div",H,[t("div",J,[s(u,{dense:"",modelValue:e.preventa.fecha,"onUpdate:modelValue":l[0]||(l[0]=o=>e.preventa.fecha=o),outlined:"",label:"Fecha",type:"date",disable:!0},null,8,["modelValue"])]),t("div",K,[s(d,{label:"Propietario",outline:e.propietarioBtnBool,class:"full-width","no-caps":"",color:"primary",onClick:l[1]||(l[1]=o=>e.propietarioBtnBool=!e.propietarioBtnBool)},null,8,["outline"])]),t("div",$,[s(d,{label:"Encargado",outline:e.encargadoBtnBool,class:"full-width","no-caps":"",color:"primary",onClick:l[2]||(l[2]=o=>e.encargadoBtnBool=!e.encargadoBtnBool)},null,8,["outline"])]),e.propietarioBtnBool?k("",!0):(r(),p(m,{key:0},[t("div",ee,[s(u,{dense:"",modelValue:e.preventa.propietario,"onUpdate:modelValue":l[3]||(l[3]=o=>e.preventa.propietario=o),outlined:"",label:"Propietario",rules:[o=>!!o||"Este campo es requerido"]},null,8,["modelValue","rules"])]),t("div",oe,[s(u,{dense:"",modelValue:e.preventa.telefono_propietario,"onUpdate:modelValue":l[4]||(l[4]=o=>e.preventa.telefono_propietario=o),outlined:"",label:"Telefono Propietario",type:"number"},null,8,["modelValue"])])],64)),e.encargadoBtnBool?k("",!0):(r(),p(m,{key:1},[t("div",te,[s(u,{dense:"",modelValue:e.preventa.contratista,"onUpdate:modelValue":l[5]||(l[5]=o=>e.preventa.contratista=o),outlined:"",label:"Encargado"},null,8,["modelValue"])]),t("div",le,[s(u,{dense:"",modelValue:e.preventa.telefono_contratista,"onUpdate:modelValue":l[6]||(l[6]=o=>e.preventa.telefono_contratista=o),outlined:"",label:"Telefono Encargado",type:"number"},null,8,["modelValue"])])],64)),t("div",se,[s(u,{dense:"",modelValue:e.preventa.ubicacion,"onUpdate:modelValue":l[7]||(l[7]=o=>e.preventa.ubicacion=o),outlined:"",label:"Ubicacion"},{append:i(()=>[s(d,{flat:"",icon:"fa-solid fa-map-marker-alt",onClick:c.myLocation},null,8,["onClick"])]),_:1},8,["modelValue"])]),t("div",ne,[t("div",ie,[s(z,{ref:"map",zoom:e.zoom,"onUpdate:zoom":l[8]||(l[8]=o=>e.zoom=o),"use-global-leaflet":!1,center:e.location,onClick:c.onMapClick},{default:i(()=>[(r(!0),p(m,null,C(e.tileProviders,o=>(r(),_(B,{key:o.name,name:o.name,visible:o.visible,url:o.url,attribution:o.attribution,"layer-type":"base"},null,8,["name","visible","url","attribution"]))),128)),s(Q,{"lat-lng":e.location,onMoveend:c.onMarkerMoveEnd,ref:"marker",draggable:!0},null,8,["lat-lng","onMoveend"])]),_:1},8,["zoom","center","onClick"])])]),t("div",ae,[s(u,{dense:"",modelValue:e.preventa.direccion,"onUpdate:modelValue":l[9]||(l[9]=o=>e.preventa.direccion=o),outlined:"",label:"Direccion",rules:[o=>!!o||"Este campo es requerido"]},null,8,["modelValue","rules"])]),t("div",re,[s(x,{dense:"",modelValue:e.preventa.zona,"onUpdate:modelValue":l[10]||(l[10]=o=>e.preventa.zona=o),options:["NORTE","ESTE","SUD","OESTE","CENTRO"],outlined:"",rules:[o=>!!o||"Este campo es requerido"],label:"Zona"},null,8,["modelValue","rules"])]),t("div",ce,[s(x,{dense:"",modelValue:e.preventa.tipo_construccion,"onUpdate:modelValue":l[11]||(l[11]=o=>e.preventa.tipo_construccion=o),outlined:"",label:"Estado de la Obra","use-input":"",options:["Inicio Obra","Columnas","Muralla","Zapata","Sobrecimiento","Losa","Paralizada","Concluida"]},null,8,["modelValue"])]),t("div",de,[s(u,{dense:"",modelValue:e.preventa.volumen,"onUpdate:modelValue":l[12]||(l[12]=o=>e.preventa.volumen=o),outlined:"",label:"Volumen",type:"number"},null,8,["modelValue"])]),t("div",ue,[s(x,{dense:"",modelValue:e.preventa.marca,"onUpdate:modelValue":[l[13]||(l[13]=o=>e.preventa.marca=o),c.filterProducts],outlined:"",label:"Marca","use-input":"",options:e.marcas},null,8,["modelValue","onUpdate:modelValue","options"])]),t("div",pe,[s(x,{dense:"",modelValue:e.preventa.producto,"onUpdate:modelValue":l[14]||(l[14]=o=>e.preventa.producto=o),outlined:"",label:"Producto","use-input":"","option-label":"nombre_pro","option-value":"nombre_pro","emit-value":"","map-options":"",options:e.products},null,8,["modelValue","options"])]),t("div",me,[s(u,{dense:"",modelValue:e.preventa.observacion,"onUpdate:modelValue":l[15]||(l[15]=o=>e.preventa.observacion=o),outlined:"",label:"Observacion"},null,8,["modelValue"])]),s(q,{align:"right"},{default:i(()=>[s(d,{label:"Cancelar",color:"negative",onClick:l[16]||(l[16]=o=>e.dialog=!1),loading:e.loading},null,8,["loading"]),s(d,{label:"Guardar",color:"primary",type:"submit",loading:e.loading},null,8,["loading"])]),_:1})])]),_:1},8,["onSubmit"]))]),_:1})]),_:1})]),_:1},8,["modelValue","position"])],64)}var ho=Y(R,[["render",oo]]);export{ho as default};
