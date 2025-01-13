import{R as n,S as u,T as r,U as e,V as m,aB as d,X as c,M as f,Y as g,aC as D,aA as Q,W as w,Z as k,aE as P,aD as _}from"./index.e95100ec.js";import{a as h,d as i,e as b}from"./format.39f6ce55.js";import{Q as x}from"./QList.cb00ee73.js";import{Q as y}from"./QBtnDropdown.4e846bde.js";import{Q as v}from"./QTd.d759ccdc.js";import{a as U,Q as G}from"./QSelect.b493f8f7.js";import{Q as N}from"./QTable.adc8ec2d.js";import{Q as E}from"./QSpace.5ba5662b.js";import{Q as S}from"./QForm.c582a3d7.js";import{Q as q}from"./QPage.a2881a74.js";import{C as V}from"./ClosePopup.c6d1387a.js";import"./moment.40bc58bf.js";import{_ as B}from"./plugin-vue_export-helper.21dcd24c.js";import"./QBtnGroup.8eaa3eca.js";import"./QMarkupTable.92a4f163.js";const z={name:"UsuariosPage",data(){return{users:[],user:{},userDialog:!1,loading:!1,actionPeriodo:"",gestiones:[],filter:"",columns:[{name:"actions",label:"Acciones",align:"center"},{name:"name",label:"Nombre",align:"left",field:"name"},{name:"username",label:"Usuario",align:"left",field:"username"},{name:"role",label:"Rol",align:"left",field:"role"},{name:"email",label:"Email",align:"left",field:"email"}],roles:["Administrador","Director","Ventas","Cobranza","Supervisor"]}},mounted(){this.usersGet()},methods:{colorGet(l){switch(l){case"Administrador":return"red";case"Director":return"blue";case"Ventas":return"green";case"Cobranza":return"orange";case"Supervisor":return"purple"}},areasGet(){this.loading=!0,this.$axios.get("areas").then(l=>{this.areas=l.data}).catch(l=>{this.$alert.error(l.response.data.message)}).finally(()=>{this.loading=!1})},userNew(){this.user={name:"",email:"",password:"",area_id:1,username:"",cargo:"",role:"Ventas"},this.actionPeriodo="Nuevo",this.userDialog=!0},usersGet(){this.loading=!0,this.$axios.get("users").then(l=>{this.users=l.data}).catch(l=>{this.$alert.error(l.response.data.message)}).finally(()=>{this.loading=!1})},gestionGet(){this.loading=!0,this.$axios.get("gestiones").then(l=>{this.gestiones=l.data,this.loading=!1}).catch(l=>{this.$alert.error(l.response.data.message),this.loading=!1})},userPost(){this.loading=!0,this.$axios.post("users",this.user).then(l=>{this.usersGet(),this.userDialog=!1,this.$alert.success("Periodo creado")}).catch(l=>{this.$alert.error(l.response.data.message)}).finally(()=>{this.loading=!1})},userPut(){this.loading=!0,this.$axios.put("users/"+this.user.id,this.user).then(l=>{this.usersGet(),this.userDialog=!1,this.$alert.success("Periodo actualizado")}).catch(l=>{this.$alert.error(l.response.data.message)}).finally(()=>{this.loading=!1})},userEditPassword(l){this.user={...l},this.$alert.dialogPrompt("Nueva contrase\xF1a","Ingrese la nueva contrase\xF1a","password").onOk(o=>{this.$axios.put("updatePassword/"+l.id,{password:o}).then(p=>{this.usersGet(),this.$alert.success("Contrase\xF1a actualizada")}).catch(p=>{this.$alert.error(p.response.data.message)})})},userEdit(l){this.user={...l},this.actionPeriodo="Editar",this.userDialog=!0},userDelete(l){this.$alert.dialog("\xBFDesea eliminar el user?").onOk(()=>{this.loading=!0,this.$axios.delete("users/"+l).then(o=>{this.usersGet(),this.$alert.success("Periodo eliminado")}).catch(o=>{this.$alert.error(o.response.data.message)}).finally(()=>{this.loading=!1})})}}},I={class:"text-right"};function A(l,o,p,T,a,t){return n(),u(q,{class:"q-pa-md"},{default:r(()=>[e(N,{rows:a.users,columns:a.columns,dense:"","wrap-cells":"",flat:"",bordered:"","rows-per-page-options":[0],title:"Usuarios",filter:a.filter},{"top-right":r(()=>[e(m,{color:"primary",label:"Nuevo",onClick:t.userNew,outline:"","no-caps":"",icon:"add_circle_outline",loading:a.loading},null,8,["onClick","loading"]),e(d,{modelValue:a.filter,"onUpdate:modelValue":o[0]||(o[0]=s=>a.filter=s),label:"Buscar",dense:"",outlined:""},{append:r(()=>[e(c,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-actions":r(s=>[e(v,{props:s},{default:r(()=>[e(y,{label:"Opciones","no-caps":"",size:"10px",dense:"",color:"primary"},{default:r(()=>[e(x,null,{default:r(()=>[f((n(),u(h,{clickable:"",onClick:C=>t.userEdit(s.row)},{default:r(()=>[e(i,{avatar:""},{default:r(()=>[e(c,{name:"edit"})]),_:1}),e(i,null,{default:r(()=>[e(b,null,{default:r(()=>[g("Editar")]),_:1})]),_:1})]),_:2},1032,["onClick"])),[[V]]),f((n(),u(h,{clickable:"",onClick:C=>t.userDelete(s.row.id)},{default:r(()=>[e(i,{avatar:""},{default:r(()=>[e(c,{name:"delete"})]),_:1}),e(i,null,{default:r(()=>[e(b,null,{default:r(()=>[g("Eliminar")]),_:1})]),_:1})]),_:2},1032,["onClick"])),[[V]]),f((n(),u(h,{clickable:"",onClick:C=>t.userEditPassword(s.row)},{default:r(()=>[e(i,{avatar:""},{default:r(()=>[e(c,{name:"edit"})]),_:1}),e(i,null,{default:r(()=>[e(b,null,{default:r(()=>[g("Cambiar contrase\xF1a")]),_:1})]),_:1})]),_:2},1032,["onClick"])),[[V]])]),_:2},1024)]),_:2},1024)]),_:2},1032,["props"])]),"body-cell-role":r(s=>[e(v,{props:s},{default:r(()=>[e(U,{label:s.row.role,color:t.colorGet(s.row.role),"text-color":"white",dense:"",size:"14px"},null,8,["label","color"])]),_:2},1032,["props"])]),_:1},8,["rows","columns","filter"]),e(_,{modelValue:a.userDialog,"onUpdate:modelValue":o[9]||(o[9]=s=>a.userDialog=s),persistent:""},{default:r(()=>[e(D,null,{default:r(()=>[e(Q,{class:"q-pb-none row items-center"},{default:r(()=>[w("div",null,k(a.actionPeriodo)+" user ",1),e(E),e(m,{icon:"close",flat:"",round:"",dense:"",onClick:o[1]||(o[1]=s=>a.userDialog=!1)})]),_:1}),e(Q,{class:"q-pt-none"},{default:r(()=>[e(S,{onSubmit:o[8]||(o[8]=s=>a.user.id?t.userPut():t.userPost())},{default:r(()=>[e(d,{modelValue:a.user.name,"onUpdate:modelValue":o[2]||(o[2]=s=>a.user.name=s),label:"Nombre",dense:"",outlined:"",rules:[s=>!!s||"Campo requerido"]},null,8,["modelValue","rules"]),e(d,{modelValue:a.user.username,"onUpdate:modelValue":o[3]||(o[3]=s=>a.user.username=s),label:"Usuario",dense:"",outlined:"",rules:[s=>!!s||"Campo requerido"]},null,8,["modelValue","rules"]),e(d,{modelValue:a.user.email,"onUpdate:modelValue":o[4]||(o[4]=s=>a.user.email=s),label:"Email",dense:"",outlined:"",hint:""},null,8,["modelValue"]),a.user.id?P("",!0):(n(),u(d,{key:0,modelValue:a.user.password,"onUpdate:modelValue":o[5]||(o[5]=s=>a.user.password=s),label:"Contrase\xF1a",type:"password",dense:"",outlined:"",rules:[s=>!!s||"Campo requerido"]},null,8,["modelValue","rules"])),e(G,{modelValue:a.user.role,"onUpdate:modelValue":o[6]||(o[6]=s=>a.user.role=s),label:"Rol",dense:"",outlined:"",options:a.roles,rules:[s=>!!s||"Campo requerido"]},null,8,["modelValue","options","rules"]),w("div",I,[e(m,{color:"negative",label:"Cancelar",onClick:o[7]||(o[7]=s=>a.userDialog=!1),"no-caps":"",loading:a.loading},null,8,["loading"]),e(m,{color:"primary",label:"Guardar",type:"submit","no-caps":"",loading:a.loading,class:"q-ml-sm"},null,8,["loading"])])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}var se=B(z,[["render",A]]);export{se as default};
