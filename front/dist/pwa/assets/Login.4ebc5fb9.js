import{Q as n}from"./QImg.2333749e.js";import{R as d,S as u,T as r,U as o,W as e,$ as p,aE as h,aB as c,X as _,bb as f,V as g,Y as w}from"./index.e5ed418c.js";import{Q as x}from"./QSpace.73f8c52c.js";import{Q as b}from"./QForm.ac191d67.js";import{Q as v}from"./QPage.45fd982b.js";import{a as Q,b as V}from"./QLayout.36ff9c5e.js";import{_ as y}from"./plugin-vue_export-helper.21dcd24c.js";const k={data(){return{showpassword:!1,username:"",password:"",remember:!1,loading:!1}},methods:{login(){this.loading=!0,this.$axios.post("login",{username:this.username,password:this.password}).then(a=>{const s=a.data.user,i=a.data.token;this.$axios.defaults.headers.common.Authorization=`Bearer ${i}`,this.$store.isLogged=!0,this.$store.user=s,localStorage.setItem("tokenGlaztor",i),localStorage.setItem("userGlaztor",JSON.stringify(s)),this.$alert.success("Bienvenido "+s.name),this.$router.push("/")}).catch(a=>{this.$alert.error(a.response.data.message)}).finally(()=>{this.loading=!1})}}},B={class:"row"},q={key:0,class:"col-12 col-md-8 flex flex-center",style:{background:"#E6EDF9",height:"100vh"}},I={style:{position:"absolute",top:"25px",left:"40px"}},S={class:"col-12 col-md-4 flex flex-center"},C={class:"row q-pa-lg"},E={class:"col-12 flex flex-center"},N=e("div",{class:"col-12 text-h6 text-bold"},"Bienvenido al sistema",-1),U=e("div",{class:"col-12 text-subtitle1"},"Inicia sesi\xF3n para continuar",-1),z={class:"col-12 q-pt-md"},F=e("label",{for:"username",class:"text-bold"},"Usuario",-1),L={class:"col-12"},R=e("label",{for:"password",class:"text-bold"},"Contrase\xF1a",-1),$={class:"col-12 row items-center"},G=e("a",{href:""},[e("span",{class:"text-caption"},"\xBFOlvidaste tu contrase\xF1a?")],-1),H={class:"col-12 q-mt-md"},O=e("div",{class:"col-12 q-mt-md"},[w(" No tienes cuenta? "),e("a",{href:""},"Reg\xEDstrate")],-1);function P(a,s,i,T,t,m){return d(),u(Q,{view:"lHh Lpr lFf"},{default:r(()=>[o(V,null,{default:r(()=>[o(v,null,{default:r(()=>[e("div",B,[a.$q.screen.lt.md?h("",!0):(d(),p("div",q,[e("div",I,[o(n,{src:"logo.png",width:"40px"})]),o(n,{src:"login-bg-BprgzFH_.svg",width:"450px"})])),e("div",S,[o(b,{onSubmit:m.login,class:"q-gutter-md",style:{"max-width":"400px"}},{default:r(()=>[e("div",C,[e("div",E,[o(n,{src:"logo.png",width:"40px"})]),N,U,e("div",z,[F,o(c,{outlined:"",modelValue:t.username,"onUpdate:modelValue":s[0]||(s[0]=l=>t.username=l),rules:[l=>!!l||"Este campo es requerido"]},null,8,["modelValue","rules"])]),e("div",L,[R,o(c,{outlined:"",modelValue:t.password,"onUpdate:modelValue":s[2]||(s[2]=l=>t.password=l),type:t.showpassword?"text":"password",rules:[l=>!!l||"Este campo es requerido"]},{append:r(()=>[o(_,{name:t.showpassword?"visibility":"visibility_off",onClick:s[1]||(s[1]=l=>t.showpassword=!t.showpassword)},null,8,["name"])]),_:1},8,["modelValue","type","rules"])]),e("div",$,[o(f,{modelValue:t.remember,"onUpdate:modelValue":s[3]||(s[3]=l=>t.remember=l),label:"Recordar usuario"},null,8,["modelValue"]),o(x),G]),e("div",H,[o(g,{color:"blue",label:"Iniciar sesi\xF3n",class:"full-width","no-caps":"",loading:t.loading,type:"submit"},null,8,["loading"])]),O])]),_:1},8,["onSubmit"])])])]),_:1})]),_:1})]),_:1})}var K=y(k,[["render",P]]);export{K as default};