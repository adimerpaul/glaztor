import{Q as m,R as l,S as h,T as u,U as c,aA as f,W as e,aB as d,aC as V}from"./index.14a741ef.js";import{Q as D}from"./QPage.45f73780.js";import{h as o}from"./moment.40bc58bf.js";import{m as _}from"./vue3-apexcharts.72ab84c0.js";import{_ as Y}from"./plugin-vue_export-helper.21dcd24c.js";const x={name:"Reporte",components:{VueApexCharts:_},data(){return{fechaInicioVentas:o().startOf("month").format("YYYY-MM-DD"),fechaFinVentas:o().endOf("month").format("YYYY-MM-DD"),fechaInicioDeudas:o().startOf("month").format("YYYY-MM-DD"),fechaFinDeudas:o().endOf("month").format("YYYY-MM-DD"),chartOptionsVentas:{chart:{id:"chart-ventas"},xaxis:{categories:[]},title:{text:"Reporte de Ventas",align:"center"}},chartOptionsDeudas:{chart:{id:"chart-deudas"},xaxis:{categories:[]},title:{text:"Reporte de Deudas",align:"center"}},seriesVentas:[{name:"Total",data:[]}],seriesDeudas:[{name:"Total",data:[]}],chartKeyVentas:0,chartKeyDeudas:0}},mounted(){this.fetchReporteVentas(),this.fetchReporteDeudas()},methods:{async fetchReporteDeudas(){try{const t=(await this.$axios.post("/reporteDeudas",{fechaInicioDeudas:this.fechaInicioDeudas,fechaFinDeudas:this.fechaFinDeudas})).data;this.chartOptionsDeudas.xaxis.categories=t.map(a=>a.cliente.nombre),this.seriesDeudas[0].data=t.map(a=>a.total_deuda),this.chartOptionsDeudas.title.text=`Deudas del ${o(this.fechaInicioDeudas).format("DD/MM/YYYY")} al ${o(this.fechaFinDeudas).format("DD/MM/YYYY")}`,this.chartKeyDeudas++}catch(i){console.error("Error al obtener el reporte de deudas:",i)}},async fetchReporteVentas(){try{const t=(await this.$axios.post("/reporteVentas",{fechaInicioVentas:this.fechaInicioVentas,fechaFinVentas:this.fechaFinVentas})).data;this.chartOptionsVentas.xaxis.categories=t.map(a=>a.user.name),this.seriesVentas[0].data=t.map(a=>a.total_ventas),this.chartOptionsVentas.title.text=`Ventas del ${o(this.fechaInicioVentas).format("DD/MM/YYYY")} al ${o(this.fechaFinVentas).format("DD/MM/YYYY")}`,this.chartKeyVentas++}catch(i){console.error("Error al obtener el reporte de ventas:",i)}}}},v={class:"row"},y={class:"col-12 col-md-6"},F={class:"row"},M=e("div",{class:"col-12"},[e("div",{class:"text-bold text-center"}," Ventas ")],-1),I={class:"col-12 col-md-6"},b={class:"col-12 col-md-6"},R={class:"col-12"},O={class:"col-12 col-md-6"},g={class:"row"},U=e("div",{class:"col-12"},[e("div",{class:"text-bold text-center"}," Deudas ")],-1),C={class:"col-12 col-md-6"},w={class:"col-12 col-md-6"},K={class:"col-12"};function Q(i,t,a,k,s,r){const p=m("VueApexCharts");return l(),h(D,{class:"bg-grey-3 q-pa-xs"},{default:u(()=>[c(V,{class:"q-pa-md",flat:"",bordered:""},{default:u(()=>[c(f,{class:"q-pa-xs"},{default:u(()=>[e("div",v,[e("div",y,[e("div",F,[M,e("div",I,[c(d,{modelValue:s.fechaInicioVentas,"onUpdate:modelValue":[t[0]||(t[0]=n=>s.fechaInicioVentas=n),r.fetchReporteVentas],outlined:"",dense:"",label:"Fecha Inicio",type:"date"},null,8,["modelValue","onUpdate:modelValue"])]),e("div",b,[c(d,{modelValue:s.fechaFinVentas,"onUpdate:modelValue":[t[1]||(t[1]=n=>s.fechaFinVentas=n),r.fetchReporteVentas],outlined:"",dense:"",label:"Fecha Fin",type:"date"},null,8,["modelValue","onUpdate:modelValue"])]),e("div",R,[(l(),h(p,{key:s.chartKeyVentas,type:"bar",options:s.chartOptionsVentas,series:s.seriesVentas},null,8,["options","series"]))])])]),e("div",O,[e("div",g,[U,e("div",C,[c(d,{modelValue:s.fechaInicioDeudas,"onUpdate:modelValue":[t[2]||(t[2]=n=>s.fechaInicioDeudas=n),r.fetchReporteDeudas],outlined:"",dense:"",label:"Fecha Inicio",type:"date"},null,8,["modelValue","onUpdate:modelValue"])]),e("div",w,[c(d,{modelValue:s.fechaFinDeudas,"onUpdate:modelValue":[t[3]||(t[3]=n=>s.fechaFinDeudas=n),r.fetchReporteDeudas],outlined:"",dense:"",label:"Fecha Fin",type:"date"},null,8,["modelValue","onUpdate:modelValue"])]),e("div",K,[(l(),h(p,{key:s.chartKeyDeudas,type:"bar",options:s.chartOptionsDeudas,series:s.seriesDeudas},null,8,["options","series"]))])])])])]),_:1})]),_:1})]),_:1})}var N=Y(x,[["render",Q]]);export{N as default};
