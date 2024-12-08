import{O as g,Y as u,R as a,Q as t,ax as C,_ as h,ay as f,az as m,T as r,Z as v,S as s,J as x,W as c,bd as y,aA as _,aC as k,b0 as q,b1 as V}from"./index.998bd65e.js";import{Q}from"./QPage.369d1f0c.js";import{Q as E}from"./QPageSticky.21b5b08b.js";import{Q as I,a as w}from"./QForm.b755ba32.js";import{Q as S}from"./QSelect.16d28045.js";import{C as A}from"./ClosePopup.41fa9c67.js";import{_ as N}from"./plugin-vue_export-helper.21dcd24c.js";const O={name:"cargos",data(){return{cargos:[],cargo:{},dialog:!1,loading:!1}},mounted(){this.getCargos()},methods:{modificar(l){this.cargo={...l},this.dialog=!0},confirmarGuardar(){this.$q.dialog({title:"Confirmar Guardado",message:"\xBFEst\xE1s seguro de que quieres guardar los cambios?",ok:{label:"S\xED",color:"primary"},cancel:{label:"No",color:"negative"}}).onOk(()=>{this.submit()})},submit(){this.loading=!0,(this.cargo.id?this.$axios.put(`cargos/${this.cargo.id}`,this.cargo):this.$axios.post("cargos",this.cargo)).then(e=>{if(e.status===200||e.status===201){if(this.cargo.id){const n=this.cargos.findIndex(p=>p.id===this.cargo.id);n!==-1&&this.$set(this.cargos,n,e.data)}else this.cargos.push(e.data);this.dialog=!1,this.$q.notify({color:"positive",message:"Cargo guardado exitosamente.",icon:"check_circle"})}}).catch(e=>{console.error("Error al guardar el cargo:",e),this.$q.notify({color:"positive",message:"Cargo guardado exitosamente.",icon:"check_circle"})}).finally(()=>{this.loading=!1,this.dialog=!1,this.getCargos()})},eliminar(l){this.$q.dialog({title:"Eliminar Cargo",message:"\xBFEst\xE1s seguro de que quieres eliminar este cargo?",ok:{label:"Eliminar",color:"negative"},cancel:!0}).onOk(()=>{this.loading=!0,this.$axios.delete(`cargos/${l}`).then(e=>{this.cargos=this.cargos.filter(n=>n.id!==l),this.$q.notify({color:"positive",message:"Cargo eliminado exitosamente.",icon:"check_circle"})}).catch(e=>{console.error("Error al eliminar el cargo:",e),this.$q.notify({color:"negative",message:"Error al eliminar el cargo. Intenta nuevamente.",icon:"report_problem"})}).finally(()=>{this.loading=!1})})},dialogClick(){this.dialog=!0,this.cargo={nombre_cargo:"",descripcion_cargo:"",estado:"ACTIVO"}},getCargos(){this.$axios.get("cargos").then(l=>{this.cargos=l.data}).catch(l=>{console.error("Error al obtener los cargos:",l),this.$q.notify({color:"negative",message:"Error al obtener los cargos. Intenta nuevamente.",icon:"report_problem"})})}},computed:{esMovil(){return this.$q.screen.lt.md}}},U=l=>(q("data-v-75d4d2ba"),l=l(),V(),l),D={border:"1",style:{width:"100%"},class:"styled-table"},B=U(()=>r("thead",null,[r("tr",null,[r("th",null,"id"),r("th",null,"nombre cargo"),r("th",null,"Descripcion"),r("th",null,"estado"),r("th",null,"Acciones")])],-1)),G={class:"text-h6"},M={class:"row"},T={class:"col-12"},z={class:"col-12"},P={class:"col-12"};function F(l,e,n,p,i,d){return g(),u(h,null,[a(Q,{class:"bg-grey-3 q-pa-xs"},{default:t(()=>[a(f,null,{default:t(()=>[a(m,{class:"q-pa-xs"},{default:t(()=>[r("table",D,[B,r("tbody",null,[(g(!0),u(h,null,v(i.cargos,(o,$)=>(g(),u("tr",{key:o.id},[r("td",null,c(o.id),1),r("td",null,c(o.nombre_cargo),1),r("td",null,c(o.descripcion_cargo),1),r("td",null,c(o.estado),1),r("td",null,[a(s,{onClick:b=>d.eliminar(o.id),color:"negative",size:"xs",icon:"delete"},null,8,["onClick"]),a(s,{onClick:b=>d.modificar(o),class:"glossy",rounded:"",color:"deep-orange",label:"Modificar"},null,8,["onClick"])])]))),128))])])]),_:1})]),_:1})]),_:1}),a(E,{position:"bottom-right",class:"text-bold",offset:[18,18]},{default:t(()=>[a(s,{fab:"",icon:"add",color:"primary",onClick:d.dialogClick},null,8,["onClick"])]),_:1}),a(C,{modelValue:i.dialog,"onUpdate:modelValue":e[6]||(e[6]=o=>i.dialog=o),position:d.esMovil?void 0:"right",maximized:!0,"transition-show":"slide-left","transition-hide":"slide-right"},{default:t(()=>[a(f,{style:{width:"450px","max-width":"100vw"}},{default:t(()=>[a(m,{class:"row items-center q-px-md bg-primary text-white q-px-none"},{default:t(()=>[x(a(s,{flat:"",round:"",dense:"",icon:"fa-solid fa-arrow-left"},null,512),[[A]]),a(I),r("div",G,c(i.cargo.id?"Editar":"Nuevo")+" cargo",1)]),_:1}),a(m,null,{default:t(()=>[a(w,{onSubmit:y(d.confirmarGuardar,["prevent"])},{default:t(()=>[r("div",M,[r("div",T,[a(_,{dense:"",modelValue:i.cargo.nombre_cargo,"onUpdate:modelValue":e[0]||(e[0]=o=>i.cargo.nombre_cargo=o),outlined:"",label:"Nombre cargo",rules:[o=>!!o||"Este campo es requerido"],onInput:e[1]||(e[1]=o=>i.cargo.nombre_cargo=i.cargo.nombre_cargo.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),r("div",z,[a(_,{dense:"",modelValue:i.cargo.descripcion_cargo,"onUpdate:modelValue":e[2]||(e[2]=o=>i.cargo.descripcion_cargo=o),outlined:"",label:"Descripcion cargo",onInput:e[3]||(e[3]=o=>i.cargo.descripcion_cargo=i.cargo.descripcion_cargo.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue"])]),r("div",P,[a(S,{dense:"",modelValue:i.cargo.estado,"onUpdate:modelValue":e[4]||(e[4]=o=>i.cargo.estado=o),options:["ACTIVO","INACTIVO"],outlined:"",rules:[o=>!!o||"Este campo es requerido"],label:"Estado"},null,8,["modelValue","rules"])]),a(k,{align:"right"},{default:t(()=>[a(s,{label:"Cancelar",color:"negative",onClick:e[5]||(e[5]=o=>i.dialog=!1),loading:i.loading},null,8,["loading"]),a(s,{label:"Guardar",color:"primary",type:"submit",loading:i.loading},null,8,["loading"])]),_:1})])]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1},8,["modelValue","position"])],64)}var H=N(O,[["render",F],["__scopeId","data-v-75d4d2ba"]]);export{H as default};