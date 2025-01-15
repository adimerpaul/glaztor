import{R as p,$ as m,U as r,T as s,aD as x,a1 as f,aC as h,aA as g,V as _,W as e,a0 as P,M as b,Z as n,bf as k,aB as c,a_ as Q,S as E,Y as I,aJ as w,aE as q,bd as U,be as S}from"./index.8bd998ce.js";import{a as D,d as M}from"./format.3ef389eb.js";import{Q as N}from"./QBtnDropdown.e91068ab.js";import{Q as A}from"./QImg.294523f7.js";import{Q as R}from"./QMarkupTable.c2c12e36.js";import{Q as B}from"./QPage.f0d189ce.js";import{Q as F}from"./QPageSticky.b253034d.js";import{Q as L}from"./QSpace.444d7c09.js";import{Q as v}from"./QSelect.c8fcec14.js";import{Q as O}from"./QForm.8105f686.js";import{C as V}from"./ClosePopup.4ff5eb22.js";import{E as T}from"./Excel.2696a291.js";import{_ as z}from"./plugin-vue_export-helper.21dcd24c.js";import"./QBtnGroup.34e3d97c.js";import"./index.a93ba69a.js";import"./_commonjsHelpers.a26ce4be.js";const G={name:"productos",data(){return{productos:[],producto:{},dialog:!1,loading:!1}},mounted(){this.getProductos()},methods:{exportExcel(){let a=[{sheet:"Productos",columns:[{label:"Categoria Producto",value:"categoria_pro"},{label:"Marca Producto",value:"marca_pro"},{label:"Nombre Producto",value:"nombre_pro"},{label:"Descripcion Producto",value:"descripcion_pro"},{label:"Precio Producto",value:"precio_pro"},{label:"Precio compra",value:"precio_compra"},{label:"Cantidad en Stok",value:"cantidad_pro"},{label:"Tonelada por Producto",value:"tonelada"},{label:"Estado Producto",value:"estado_pro"}],content:this.productos}];T.export(a,"Reporte de Productos")},showProducto(a){this.producto={...a},this.dialog=!0},confirmarGuardar(){this.$q.dialog({title:"Confirmar Guardado",message:"\xBFEst\xE1s seguro de que quieres guardar los cambios?",ok:{label:"S\xED",color:"primary"},cancel:{label:"No",color:"negative"}}).onOk(()=>{this.submit()})},submit(){this.loading=!0,this.producto.id?this.$axios.put(`productos/${this.producto.id}`,this.producto).then(a=>{const t=this.productos.findIndex(d=>d.id===this.producto.id);this.productos[t]=a.data,this.dialog=!1}).catch(a=>{console.log(a)}).finally(()=>{this.loading=!1}):this.$axios.post("productos",this.producto).then(a=>{this.productos.push(a.data),this.dialog=!1}).catch(a=>{console.log(a)}).finally(()=>{this.loading=!1})},eliminar(a){this.$q.dialog({title:"Confirmar Eliminaci\xF3n",message:"\xBFEst\xE1s seguro de que deseas eliminar este producto?",cancel:!0,persistent:!0}).onOk(()=>{this.$axios.delete(`productos/${a.id}`).then(t=>{this.productos=this.productos.filter(d=>d.id!==a.id)}).catch(t=>{console.log(t)})})},dialogClick(){this.dialog=!0,this.producto={categoria_pro:"",marca_pro:"",nombre_pro:"",descripcion_pro:"",precio_pro:"",foto_pro:"",estado_pro:"Activo"}},getProductos(){this.$axios.get("productos").then(a=>{this.productos=a.data;const t=this.productos.some(i=>i.tonelada>0&&i.cantidad_pro/i.tonelada<2),d=this.productos.filter(i=>i.cantidad_pro&&i.tonelada&&i.cantidad_pro/i.tonelada<2);if(d.length>0){const i=d.map(l=>l.nombre_pro).join(", ");this.$q.dialog({title:"Inventario bajo",message:`Los siguientes productos est\xE1n agotados: ${i}`,ok:"Entendido"})}t&&this.$q.notify({color:"negative",icon:"warning",message:"Ya no hay inventario para algunos productos",position:"top",timeout:5e3})}).catch(a=>{console.log(a)})},previsualizarFoto(a){var t=new FileReader;t.readAsDataURL(a.target.files[0]),t.onload=()=>{this.foto=t.result,this.producto.foto_pro=this.foto}}},computed:{esMovil(){return this.$q.screen.lt.md}}},y=a=>(U("data-v-793a1cae"),a=a(),S(),a),j=y(()=>e("thead",null,[e("tr",null,[e("th",null,"Acciones"),e("th",null,"Nombre"),e("th",null,"Precio venta"),e("th",null,"Precio compra"),e("th",null,"Cantidad"),e("th",null,"Descripcion"),e("th",null,"Cant por Mayor"),e("th",null,"foto"),e("th",null,"estado"),e("th",null,"id"),e("th",null,"categoria"),e("th",null,"marca")])],-1)),Y=["href"],J={class:"text-h6"},W={class:"row"},Z={class:"col-12"},H={class:"col-12"},K={class:"col-12"},X={class:"col-12"},$={class:"col-6"},oo={class:"col-6"},eo={class:"col-12"},to={class:"col-12"},lo={class:"d-grid col-6 mx-auto mb-3"},ro=["src"],ao={key:1,height:"100",src:"https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-256.png",class:"img-thumbnail",id:"fotoimg",alt:""},so={class:"input-group mb-3"},io=y(()=>e("span",{class:"input-group-text"},[e("i",{class:"fa-solid fa-gift"})],-1)),no={class:"col-12"};function uo(a,t,d,i,l,u){return p(),m(f,null,[r(B,{class:"bg-grey-2"},{default:s(()=>[r(h,{flat:"",bordered:""},{default:s(()=>[r(g,{class:"q-pa-xs"},{default:s(()=>[r(_,{icon:"download",color:"green",label:"Exportar",onClick:u.exportExcel,"no-caps":""},null,8,["onClick"]),r(R,{dense:"",class:"styled-table"},{default:s(()=>[j,e("tbody",null,[(p(!0),m(f,null,P(l.productos,(o,C)=>(p(),m("tr",{key:C},[e("td",null,[r(N,{size:"10px",color:"primary","no-caps":"",label:"Opciones",dense:"",class:"q-mr-sm"},{default:s(()=>[b((p(),E(D,{clickable:"",onClick:po=>u.showProducto(o)},{default:s(()=>[r(M,null,{default:s(()=>[I("Editar")]),_:1})]),_:2},1032,["onClick"])),[[w],[V]])]),_:2},1024)]),e("td",null,n(o.nombre_pro),1),e("td",null,n(o.precio_pro),1),e("td",null,n(o.precio_compra),1),e("td",null,n(o.cantidad_pro),1),e("td",null,n(o.descripcion_pro),1),e("td",null,n(o.tonelada),1),e("td",null,[o.foto_pro?(p(),m("a",{key:0,href:a.$url+".."+o.foto_pro,target:"_blank"},[r(A,{src:a.$url+".."+o.foto_pro,alt:"Imagen del producto",class:"img-thumbnail",height:"10"},null,8,["src"])],8,Y)):q("",!0)]),e("td",null,n(o.estado_pro),1),e("td",null,n(o.id),1),e("td",null,n(o.categoria_pro),1),e("td",null,n(o.marca_pro),1)]))),128))])]),_:1})]),_:1})]),_:1})]),_:1}),r(F,{position:"bottom-right",class:"text-bold",offset:[18,18]},{default:s(()=>[r(_,{fab:"",icon:"add",color:"primary",onClick:u.dialogClick},null,8,["onClick"])]),_:1}),r(x,{modelValue:l.dialog,"onUpdate:modelValue":t[14]||(t[14]=o=>l.dialog=o),position:u.esMovil?void 0:"right",maximized:!0,"transition-show":"slide-left","transition-hide":"slide-right"},{default:s(()=>[r(h,{style:{width:"450px","max-width":"100vw"}},{default:s(()=>[r(g,{class:"row items-center q-px-md bg-primary text-white q-px-none"},{default:s(()=>[b(r(_,{flat:"",round:"",dense:"",icon:"fa-solid fa-arrow-left"},null,512),[[V]]),r(L),e("div",J,n(l.producto.id?"Editar":"Nuevo")+" Producto",1)]),_:1}),r(g,null,{default:s(()=>[r(O,{onSubmit:k(u.confirmarGuardar,["prevent"])},{default:s(()=>[e("div",W,[e("div",Z,[r(v,{dense:"",modelValue:l.producto.categoria_pro,"onUpdate:modelValue":t[0]||(t[0]=o=>l.producto.categoria_pro=o),options:["CEMENTO","LADRILLO","FIERRO"],outlined:"",rules:[o=>!!o||"Este campo es requerido"],label:"Tipo"},null,8,["modelValue","rules"])]),e("div",H,[r(c,{dense:"",modelValue:l.producto.marca_pro,"onUpdate:modelValue":t[1]||(t[1]=o=>l.producto.marca_pro=o),outlined:"",label:"Marca",rules:[o=>!!o||"Este campo es requerido"],onInput:t[2]||(t[2]=o=>l.producto.marca_pro=l.producto.marca_pro.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),e("div",K,[r(c,{dense:"",modelValue:l.producto.nombre_pro,"onUpdate:modelValue":t[3]||(t[3]=o=>l.producto.nombre_pro=o),outlined:"",label:"Nombre Producto",rules:[o=>!!o||"Este campo es requerido"],onInput:t[4]||(t[4]=o=>l.producto.nombre_pro=l.producto.nombre_pro.toUpperCase()),style:{"text-transform":"uppercase"}},null,8,["modelValue","rules"])]),e("div",X,[r(c,{dense:"",modelValue:l.producto.descripcion_pro,"onUpdate:modelValue":t[5]||(t[5]=o=>l.producto.descripcion_pro=o),outlined:"",label:"Descripcion Producto",onInput:t[6]||(t[6]=o=>l.producto.descripcion_pro=l.producto.descripcion_pro.toUpperCase()),hint:"",style:{"text-transform":"uppercase"}},null,8,["modelValue"])]),e("div",$,[r(c,{dense:"",modelValue:l.producto.precio_pro,"onUpdate:modelValue":t[7]||(t[7]=o=>l.producto.precio_pro=o),outlined:"",label:"Precio Venta",type:"number",hint:""},null,8,["modelValue"])]),e("div",oo,[r(c,{dense:"",modelValue:l.producto.precio_compra,"onUpdate:modelValue":t[8]||(t[8]=o=>l.producto.precio_compra=o),outlined:"",label:"Precio Compra",type:"number",hint:""},null,8,["modelValue"])]),e("div",eo,[r(c,{dense:"",modelValue:l.producto.cantidad_pro,"onUpdate:modelValue":t[9]||(t[9]=o=>l.producto.cantidad_pro=o),outlined:"",label:"Cantidad en stok",type:"number",hint:""},null,8,["modelValue"])]),e("div",to,[r(c,{dense:"",modelValue:l.producto.tonelada,"onUpdate:modelValue":t[10]||(t[10]=o=>l.producto.tonelada=o),outlined:"",label:"Cantidad Mayor general en ventas",type:"number",hint:""},null,8,["modelValue"])]),e("div",lo,[l.producto.foto_pro?(p(),m("img",{key:0,src:l.producto.foto_pro.includes("data")?l.producto.foto_pro:a.$url+".."+l.producto.foto_pro,alt:"Imagen del producto",class:"img-thumbnail",height:"100"},null,8,ro)):(p(),m("img",ao))]),e("div",so,[io,e("input",{onChange:t[11]||(t[11]=(...o)=>u.previsualizarFoto&&u.previsualizarFoto(...o)),type:"file",accept:"image/png, image/jpg, image/gif",class:"form-control"},null,32)]),e("div",no,[r(v,{dense:"",modelValue:l.producto.estado_pro,"onUpdate:modelValue":t[12]||(t[12]=o=>l.producto.estado_pro=o),options:["Activo","Inactivo"],outlined:"",rules:[o=>!!o||"Este campo es requerido"],label:"Estado"},null,8,["modelValue","rules"])]),r(Q,{align:"right"},{default:s(()=>[r(_,{label:"Cancelar",color:"negative",onClick:t[13]||(t[13]=o=>l.dialog=!1),loading:l.loading},null,8,["loading"]),r(_,{label:"Guardar",color:"primary",type:"submit",loading:l.loading},null,8,["loading"])]),_:1})])]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1},8,["modelValue","position"])],64)}var Io=z(G,[["render",uo],["__scopeId","data-v-793a1cae"]]);export{Io as default};