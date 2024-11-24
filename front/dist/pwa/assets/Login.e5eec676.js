import{Q as n}from"./QImg.a2febed5.js";import{O as d,P as m,Q as r,R as s,T as e,Y as p,aB as h,aA as c,b3 as _,S as f,V as g}from"./index.397ce38d.js";import{a as x,Q as b}from"./QForm.9f25e82e.js";import{Q as v}from"./QPage.107853e6.js";import{a as w,b as V}from"./QLayout.4f3ea21a.js";import{_ as Q}from"./plugin-vue_export-helper.21dcd24c.js";const B={data(){return{username:"admin",password:"admin",remember:!1,loading:!1}},methods:{login(){this.loading=!0,this.$axios.post("login",{username:this.username,password:this.password}).then(l=>{const o=l.data.user,i=l.data.token;this.$axios.defaults.headers.common.Authorization=`Bearer ${i}`,this.$store.isLogged=!0,this.$store.user=o,localStorage.setItem("tokenGlaztor",i),localStorage.setItem("userGlaztor",JSON.stringify(o)),this.$alert.success("Bienvenido "+o.name),this.$router.push("/")}).catch(l=>{this.$alert.error(l.response.data.message)}).finally(()=>{this.loading=!1})}}},k={class:"row"},y={key:0,class:"col-12 col-md-8 flex flex-center",style:{background:"#E6EDF9",height:"100vh"}},q={style:{position:"absolute",top:"25px",left:"40px"}},S={class:"col-12 col-md-4 flex flex-center"},I={class:"row q-pa-lg"},N={class:"col-12 flex flex-center"},C=e("div",{class:"col-12 text-h6 text-bold"},"Bienvenido al sistema",-1),E=e("div",{class:"col-12 text-subtitle1"},"Inicia sesi\xF3n para continuar",-1),$={class:"col-12 q-pt-md"},z=e("label",{for:"username",class:"text-bold"},"Usuario",-1),F={class:"col-12"},L=e("label",{for:"password",class:"text-bold"},"Contrase\xF1a",-1),U={class:"col-12 row items-center"},O=e("a",{href:""},[e("span",{class:"text-caption"},"\xBFOlvidaste tu contrase\xF1a?")],-1),P={class:"col-12 q-mt-md"},R=e("div",{class:"col-12 q-mt-md"},[g(" No tienes cuenta? "),e("a",{href:""},"Reg\xEDstrate")],-1);function A(l,o,i,G,a,u){return d(),m(w,{view:"lHh Lpr lFf"},{default:r(()=>[s(V,null,{default:r(()=>[s(v,null,{default:r(()=>[e("div",k,[l.$q.screen.lt.md?h("",!0):(d(),p("div",y,[e("div",q,[s(n,{src:"logo.png",width:"40px"})]),s(n,{src:"login-bg-BprgzFH_.svg",width:"450px"})])),e("div",S,[s(x,{onSubmit:u.login,class:"q-gutter-md",style:{"max-width":"400px"}},{default:r(()=>[e("div",I,[e("div",N,[s(n,{src:"logo.png",width:"40px"})]),C,E,e("div",$,[z,s(c,{outlined:"",modelValue:a.username,"onUpdate:modelValue":o[0]||(o[0]=t=>a.username=t),rules:[t=>!!t||"Este campo es requerido"]},null,8,["modelValue","rules"])]),e("div",F,[L,s(c,{outlined:"",modelValue:a.password,"onUpdate:modelValue":o[1]||(o[1]=t=>a.password=t),type:"password",rules:[t=>!!t||"Este campo es requerido"]},null,8,["modelValue","rules"])]),e("div",U,[s(_,{modelValue:a.remember,"onUpdate:modelValue":o[2]||(o[2]=t=>a.remember=t),label:"Recordar usuario"},null,8,["modelValue"]),s(b),O]),e("div",P,[s(f,{color:"blue",label:"Iniciar sesi\xF3n",class:"full-width","no-caps":"",loading:a.loading,type:"submit"},null,8,["loading"])]),R])]),_:1},8,["onSubmit"])])])]),_:1})]),_:1})]),_:1})}var K=Q(B,[["render",A]]);export{K as default};
