import{c as j,b2 as Me,a7 as mt,r as L,b3 as St,a as v,b4 as ht,w as F,H as me,h as o,U as Se,d as z,S as M,g as Q,t as yt,f as wt,A as he,C as ye,a8 as _t,aP as je,aE as qt,aD as Ct,o as Qe,af as Pt,a4 as De,au as Ee,aK as kt,aL as Bt,b5 as Rt,b6 as Fe,b7 as ge,b8 as $e,b9 as xt,I as He,ba as Tt,bb as be,bc as I,X as Ot}from"./index.5f1aaf33.js";import{Q as Dt}from"./QBtnGroup.ad44aabe.js";import{Q as Ft}from"./ClosePopup.a953a791.js";import{Q as $t}from"./QList.b0bf0ab1.js";import{u as Vt,b as At,c as Ne,Q as Lt}from"./QSelect.4f82e7ea.js";const Mt=Object.keys(Me);function jt(e){return Mt.reduce((l,a)=>{const s=e[a];return s!==void 0&&(l[a]=s),l},{})}var hl=j({name:"QBtnDropdown",props:{...Me,...mt,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:l,emit:a}){const{proxy:s}=Q(),r=L(e.modelValue),d=L(null),i=St(),c=v(()=>{const b={"aria-expanded":r.value===!0?"true":"false","aria-haspopup":"true","aria-controls":i.value,"aria-label":e.toggleAriaLabel||s.$q.lang.label[r.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(b["aria-disabled"]="true"),b}),f=v(()=>"q-btn-dropdown__arrow"+(r.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),S=v(()=>ht(e)),n=v(()=>jt(e));F(()=>e.modelValue,b=>{d.value!==null&&d.value[b?"show":"hide"]()}),F(()=>e.split,x);function m(b){r.value=!0,a("beforeShow",b)}function q(b){a("show",b),a("update:modelValue",!0)}function C(b){r.value=!1,a("beforeHide",b)}function P(b){a("hide",b),a("update:modelValue",!1)}function _(b){a("click",b)}function y(b){yt(b),x(),a("click",b)}function T(b){d.value!==null&&d.value.toggle(b)}function R(b){d.value!==null&&d.value.show(b)}function x(b){d.value!==null&&d.value.hide(b)}return Object.assign(s,{show:R,hide:x,toggle:T}),me(()=>{e.modelValue===!0&&R()}),()=>{const b=[o(Se,{class:f.value,name:e.dropdownIcon||s.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&b.push(o(Ft,{ref:d,id:i.value,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:m,onShow:q,onBeforeHide:C,onHide:P},l.default)),e.split===!1?o(M,{class:"q-btn-dropdown q-btn-dropdown--simple",...n.value,...c.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:_},{default:()=>z(l.label,[]).concat(b),loading:l.loading}):o(Dt,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...S.value,glossy:e.glossy,stretch:e.stretch},()=>[o(M,{class:"q-btn-dropdown--current",...n.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:y},{default:l.label,loading:l.loading}),o(M,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...c.value,...S.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>b)])}}}),yl=j({name:"QTd",props:{props:Object,autoWidth:Boolean,noHover:Boolean},setup(e,{slots:l}){const a=Q(),s=v(()=>"q-td"+(e.autoWidth===!0?" q-table--col-auto-width":"")+(e.noHover===!0?" q-td--no-hover":"")+" ");return()=>{if(e.props===void 0)return o("td",{class:s.value},z(l.default));const r=a.vnode.key,d=(e.props.colsMap!==void 0?e.props.colsMap[r]:null)||e.props.col;if(d===void 0)return;const{row:i}=e.props;return o("td",{class:s.value+d.__tdClass(i),style:d.__tdStyle(i)},z(l.default))}}}),Qt=j({name:"QTh",props:{props:Object,autoWidth:Boolean},emits:["click"],setup(e,{slots:l,emit:a}){const s=Q(),{proxy:{$q:r}}=s,d=i=>{a("click",i)};return()=>{if(e.props===void 0)return o("th",{class:e.autoWidth===!0?"q-table--col-auto-width":"",onClick:d},z(l.default));let i,c;const f=s.vnode.key;if(f){if(i=e.props.colsMap[f],i===void 0)return}else i=e.props.col;if(i.sortable===!0){const n=i.align==="right"?"unshift":"push";c=wt(l.default,[]),c[n](o(Se,{class:i.__iconClass,name:r.iconSet.table.arrowUp}))}else c=z(l.default);const S={class:i.__thClass+(e.autoWidth===!0?" q-table--col-auto-width":""),style:i.headerStyle,onClick:n=>{i.sortable===!0&&e.props.sort(i),d(n)}};return o("th",S,c)}}});const Et=["horizontal","vertical","cell","none"];var Ht=j({name:"QMarkupTable",props:{...he,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,wrapCells:Boolean,separator:{type:String,default:"horizontal",validator:e=>Et.includes(e)}},setup(e,{slots:l}){const a=Q(),s=ye(e,a.proxy.$q),r=v(()=>`q-markup-table q-table__container q-table__card q-table--${e.separator}-separator`+(s.value===!0?" q-table--dark q-table__card--dark q-dark":"")+(e.dense===!0?" q-table--dense":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")+(e.square===!0?" q-table--square":"")+(e.wrapCells===!1?" q-table--no-wrap":""));return()=>o("div",{class:r.value},[o("table",{class:"q-table"},z(l.default))])}});function ze(e,l){return o("div",e,[o("table",{class:"q-table"},l)])}const Nt={list:$t,table:Ht},zt=["list","table","__qtable"];var It=j({name:"QVirtualScroll",props:{...Vt,type:{type:String,default:"list",validator:e=>zt.includes(e)},items:{type:Array,default:()=>[]},itemsFn:Function,itemsSize:Number,scrollTarget:_t},setup(e,{slots:l,attrs:a}){let s;const r=L(null),d=v(()=>e.itemsSize>=0&&e.itemsFn!==void 0?parseInt(e.itemsSize,10):Array.isArray(e.items)?e.items.length:0),{virtualScrollSliceRange:i,localResetVirtualScroll:c,padVirtualScroll:f,onVirtualScrollEvt:S}=At({virtualScrollLength:d,getVirtualScrollTarget:P,getVirtualScrollEl:C}),n=v(()=>{if(d.value===0)return[];const R=(x,b)=>({index:i.value.from+b,item:x});return e.itemsFn===void 0?e.items.slice(i.value.from,i.value.to).map(R):e.itemsFn(i.value.from,i.value.to-i.value.from).map(R)}),m=v(()=>"q-virtual-scroll q-virtual-scroll"+(e.virtualScrollHorizontal===!0?"--horizontal":"--vertical")+(e.scrollTarget!==void 0?"":" scroll")),q=v(()=>e.scrollTarget!==void 0?{}:{tabindex:0});F(d,()=>{c()}),F(()=>e.scrollTarget,()=>{y(),_()});function C(){return r.value.$el||r.value}function P(){return s}function _(){s=Pt(C(),e.scrollTarget),s.addEventListener("scroll",S,De.passive)}function y(){s!==void 0&&(s.removeEventListener("scroll",S,De.passive),s=void 0)}function T(){let R=f(e.type==="list"?"div":"tbody",n.value.map(l.default));return l.before!==void 0&&(R=l.before().concat(R)),Ee(l.after,R)}return je(()=>{c()}),me(()=>{_()}),qt(()=>{_()}),Ct(()=>{y()}),Qe(()=>{y()}),()=>{if(l.default===void 0){console.error("QVirtualScroll: default scoped slot is required for rendering");return}return e.type==="__qtable"?ze({ref:r,class:"q-table__middle "+m.value},T()):o(Nt[e.type],{...a,ref:r,class:[a.class,m.value],...q.value},T)}}});const Ut={xs:2,sm:4,md:6,lg:10,xl:14};function Ve(e,l,a){return{transform:l===!0?`translateX(${a.lang.rtl===!0?"-":""}100%) scale3d(${-e},1,1)`:`scale3d(${e},1,1)`}}var Wt=j({name:"QLinearProgress",props:{...he,...kt,value:{type:Number,default:0},buffer:Number,color:String,trackColor:String,reverse:Boolean,stripe:Boolean,indeterminate:Boolean,query:Boolean,rounded:Boolean,animationSpeed:{type:[String,Number],default:2100},instantFeedback:Boolean},setup(e,{slots:l}){const{proxy:a}=Q(),s=ye(e,a.$q),r=Bt(e,Ut),d=v(()=>e.indeterminate===!0||e.query===!0),i=v(()=>e.reverse!==e.query),c=v(()=>({...r.value!==null?r.value:{},"--q-linear-progress-speed":`${e.animationSpeed}ms`})),f=v(()=>"q-linear-progress"+(e.color!==void 0?` text-${e.color}`:"")+(e.reverse===!0||e.query===!0?" q-linear-progress--reverse":"")+(e.rounded===!0?" rounded-borders":"")),S=v(()=>Ve(e.buffer!==void 0?e.buffer:1,i.value,a.$q)),n=v(()=>`with${e.instantFeedback===!0?"out":""}-transition`),m=v(()=>`q-linear-progress__track absolute-full q-linear-progress__track--${n.value} q-linear-progress__track--${s.value===!0?"dark":"light"}`+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),q=v(()=>Ve(d.value===!0?1:e.value,i.value,a.$q)),C=v(()=>`q-linear-progress__model absolute-full q-linear-progress__model--${n.value} q-linear-progress__model--${d.value===!0?"in":""}determinate`),P=v(()=>({width:`${e.value*100}%`})),_=v(()=>`q-linear-progress__stripe absolute-${e.reverse===!0?"right":"left"} q-linear-progress__stripe--${n.value}`);return()=>{const y=[o("div",{class:m.value,style:S.value}),o("div",{class:C.value,style:q.value})];return e.stripe===!0&&d.value===!1&&y.push(o("div",{class:_.value,style:P.value})),o("div",{class:f.value,style:c.value,role:"progressbar","aria-valuemin":0,"aria-valuemax":1,"aria-valuenow":e.indeterminate===!0?void 0:e.value},Ee(l.default,y))}}});let U=0;const Kt={fullscreen:Boolean,noRouteFullscreenExit:Boolean},Gt=["update:fullscreen","fullscreen"];function Xt(){const e=Q(),{props:l,emit:a,proxy:s}=e;let r,d,i;const c=L(!1);Rt(e)===!0&&F(()=>s.$route.fullPath,()=>{l.noRouteFullscreenExit!==!0&&n()}),F(()=>l.fullscreen,m=>{c.value!==m&&f()}),F(c,m=>{a("update:fullscreen",m),a("fullscreen",m)});function f(){c.value===!0?n():S()}function S(){c.value!==!0&&(c.value=!0,i=s.$el.parentNode,i.replaceChild(d,s.$el),document.body.appendChild(s.$el),U++,U===1&&document.body.classList.add("q-body--fullscreen-mixin"),r={handler:n},Fe.add(r))}function n(){c.value===!0&&(r!==void 0&&(Fe.remove(r),r=void 0),i.replaceChild(s.$el,d),c.value=!1,U=Math.max(0,U-1),U===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),s.$el.scrollIntoView!==void 0&&setTimeout(()=>{s.$el.scrollIntoView()})))}return je(()=>{d=document.createElement("span")}),me(()=>{l.fullscreen===!0&&S()}),Qe(n),Object.assign(s,{toggleFullscreen:f,setFullscreen:S,exitFullscreen:n}),{inFullscreen:c,toggleFullscreen:f}}function Jt(e,l){return new Date(e)-new Date(l)}const Yt={sortMethod:Function,binaryStateSort:Boolean,columnSortOrder:{type:String,validator:e=>e==="ad"||e==="da",default:"ad"}};function Zt(e,l,a,s){const r=v(()=>{const{sortBy:c}=l.value;return c&&a.value.find(f=>f.name===c)||null}),d=v(()=>e.sortMethod!==void 0?e.sortMethod:(c,f,S)=>{const n=a.value.find(C=>C.name===f);if(n===void 0||n.field===void 0)return c;const m=S===!0?-1:1,q=typeof n.field=="function"?C=>n.field(C):C=>C[n.field];return c.sort((C,P)=>{let _=q(C),y=q(P);return n.rawSort!==void 0?n.rawSort(_,y,C,P)*m:_==null?-1*m:y==null?1*m:n.sort!==void 0?n.sort(_,y,C,P)*m:ge(_)===!0&&ge(y)===!0?(_-y)*m:$e(_)===!0&&$e(y)===!0?Jt(_,y)*m:typeof _=="boolean"&&typeof y=="boolean"?(_-y)*m:([_,y]=[_,y].map(T=>(T+"").toLocaleString().toLowerCase()),_<y?-1*m:_===y?0:m)})});function i(c){let f=e.columnSortOrder;if(xt(c)===!0)c.sortOrder&&(f=c.sortOrder),c=c.name;else{const m=a.value.find(q=>q.name===c);m!==void 0&&m.sortOrder&&(f=m.sortOrder)}let{sortBy:S,descending:n}=l.value;S!==c?(S=c,n=f==="da"):e.binaryStateSort===!0?n=!n:n===!0?f==="ad"?S=null:n=!1:f==="ad"?n=!0:S=null,s({sortBy:S,descending:n,page:1})}return{columnToSort:r,computedSortMethod:d,sort:i}}const pt={filter:[String,Object],filterMethod:Function};function el(e,l){const a=v(()=>e.filterMethod!==void 0?e.filterMethod:(s,r,d,i)=>{const c=r?r.toLowerCase():"";return s.filter(f=>d.some(S=>{const n=i(S,f)+"";return(n==="undefined"||n==="null"?"":n.toLowerCase()).indexOf(c)!==-1}))});return F(()=>e.filter,()=>{He(()=>{l({page:1},!0)})},{deep:!0}),{computedFilterMethod:a}}function tl(e,l){for(const a in l)if(l[a]!==e[a])return!1;return!0}function Ae(e){return e.page<1&&(e.page=1),e.rowsPerPage!==void 0&&e.rowsPerPage<1&&(e.rowsPerPage=0),e}const ll={pagination:Object,rowsPerPageOptions:{type:Array,default:()=>[5,7,10,15,20,25,50,0]},"onUpdate:pagination":[Function,Array]};function al(e,l){const{props:a,emit:s}=e,r=L(Object.assign({sortBy:null,descending:!1,page:1,rowsPerPage:a.rowsPerPageOptions.length!==0?a.rowsPerPageOptions[0]:5},a.pagination)),d=v(()=>{const n=a["onUpdate:pagination"]!==void 0?{...r.value,...a.pagination}:r.value;return Ae(n)}),i=v(()=>d.value.rowsNumber!==void 0);function c(n){f({pagination:n,filter:a.filter})}function f(n={}){He(()=>{s("request",{pagination:n.pagination||d.value,filter:n.filter||a.filter,getCellValue:l})})}function S(n,m){const q=Ae({...d.value,...n});if(tl(d.value,q)===!0){i.value===!0&&m===!0&&c(q);return}if(i.value===!0){c(q);return}a.pagination!==void 0&&a["onUpdate:pagination"]!==void 0?s("update:pagination",q):r.value=q}return{innerPagination:r,computedPagination:d,isServerSide:i,requestServerInteraction:f,setPagination:S}}function nl(e,l,a,s,r,d){const{props:i,emit:c,proxy:{$q:f}}=e,S=v(()=>s.value===!0?a.value.rowsNumber||0:d.value),n=v(()=>{const{page:b,rowsPerPage:O}=a.value;return(b-1)*O}),m=v(()=>{const{page:b,rowsPerPage:O}=a.value;return b*O}),q=v(()=>a.value.page===1),C=v(()=>a.value.rowsPerPage===0?1:Math.max(1,Math.ceil(S.value/a.value.rowsPerPage))),P=v(()=>m.value===0?!0:a.value.page>=C.value),_=v(()=>(i.rowsPerPageOptions.includes(l.value.rowsPerPage)?i.rowsPerPageOptions:[l.value.rowsPerPage].concat(i.rowsPerPageOptions)).map(O=>({label:O===0?f.lang.table.allRows:""+O,value:O})));F(C,(b,O)=>{if(b===O)return;const W=a.value.page;b&&!W?r({page:1}):b<W&&r({page:b})});function y(){r({page:1})}function T(){const{page:b}=a.value;b>1&&r({page:b-1})}function R(){const{page:b,rowsPerPage:O}=a.value;m.value>0&&b*O<S.value&&r({page:b+1})}function x(){r({page:C.value})}return i["onUpdate:pagination"]!==void 0&&c("update:pagination",{...a.value}),{firstRowIndex:n,lastRowIndex:m,isFirstPage:q,isLastPage:P,pagesNumber:C,computedRowsPerPageOptions:_,computedRowsNumber:S,firstPage:y,prevPage:T,nextPage:R,lastPage:x}}const ol={selection:{type:String,default:"none",validator:e=>["single","multiple","none"].includes(e)},selected:{type:Array,default:()=>[]}},rl=["update:selected","selection"];function il(e,l,a,s){const r=v(()=>{const P={};return e.selected.map(s.value).forEach(_=>{P[_]=!0}),P}),d=v(()=>e.selection!=="none"),i=v(()=>e.selection==="single"),c=v(()=>e.selection==="multiple"),f=v(()=>a.value.length!==0&&a.value.every(P=>r.value[s.value(P)]===!0)),S=v(()=>f.value!==!0&&a.value.some(P=>r.value[s.value(P)]===!0)),n=v(()=>e.selected.length);function m(P){return r.value[P]===!0}function q(){l("update:selected",[])}function C(P,_,y,T){l("selection",{rows:_,added:y,keys:P,evt:T});const R=i.value===!0?y===!0?_:[]:y===!0?e.selected.concat(_):e.selected.filter(x=>P.includes(s.value(x))===!1);l("update:selected",R)}return{hasSelectionMode:d,singleSelection:i,multipleSelection:c,allRowsSelected:f,someRowsSelected:S,rowsSelectedNumber:n,isRowSelected:m,clearSelection:q,updateSelection:C}}function Le(e){return Array.isArray(e)?e.slice():[]}const ul={expanded:Array},sl=["update:expanded"];function cl(e,l){const a=L(Le(e.expanded));F(()=>e.expanded,i=>{a.value=Le(i)});function s(i){return a.value.includes(i)}function r(i){e.expanded!==void 0?l("update:expanded",i):a.value=i}function d(i,c){const f=a.value.slice(),S=f.indexOf(i);c===!0?S===-1&&(f.push(i),r(f)):S!==-1&&(f.splice(S,1),r(f))}return{isRowExpanded:s,setExpanded:r,updateExpanded:d}}const dl={visibleColumns:Array};function vl(e,l,a){const s=v(()=>{if(e.columns!==void 0)return e.columns;const c=e.rows[0];return c!==void 0?Object.keys(c).map(f=>({name:f,label:f.toUpperCase(),field:f,align:ge(c[f])?"right":"left",sortable:!0})):[]}),r=v(()=>{const{sortBy:c,descending:f}=l.value;return(e.visibleColumns!==void 0?s.value.filter(n=>n.required===!0||e.visibleColumns.includes(n.name)===!0):s.value).map(n=>{const m=n.align||"right",q=`text-${m}`;return{...n,align:m,__iconClass:`q-table__sort-icon q-table__sort-icon--${m}`,__thClass:q+(n.headerClasses!==void 0?" "+n.headerClasses:"")+(n.sortable===!0?" sortable":"")+(n.name===c?` sorted ${f===!0?"sort-desc":""}`:""),__tdStyle:n.style!==void 0?typeof n.style!="function"?()=>n.style:n.style:()=>null,__tdClass:n.classes!==void 0?typeof n.classes!="function"?()=>q+" "+n.classes:C=>q+" "+n.classes(C):()=>q}})}),d=v(()=>{const c={};return r.value.forEach(f=>{c[f.name]=f}),c}),i=v(()=>e.tableColspan!==void 0?e.tableColspan:r.value.length+(a.value===!0?1:0));return{colList:s,computedCols:r,computedColsMap:d,computedColspan:i}}const te="q-table__bottom row items-center",Ie={};Ne.forEach(e=>{Ie[e]={}});var wl=j({name:"QTable",props:{rows:{type:Array,required:!0},rowKey:{type:[String,Function],default:"id"},columns:Array,loading:Boolean,iconFirstPage:String,iconPrevPage:String,iconNextPage:String,iconLastPage:String,title:String,hideHeader:Boolean,grid:Boolean,gridHeader:Boolean,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,separator:{type:String,default:"horizontal",validator:e=>["horizontal","vertical","cell","none"].includes(e)},wrapCells:Boolean,virtualScroll:Boolean,virtualScrollTarget:{},...Ie,noDataLabel:String,noResultsLabel:String,loadingLabel:String,selectedRowsLabel:Function,rowsPerPageLabel:String,paginationLabel:Function,color:{type:String,default:"grey-8"},titleClass:[String,Array,Object],tableStyle:[String,Array,Object],tableClass:[String,Array,Object],tableHeaderStyle:[String,Array,Object],tableHeaderClass:[String,Array,Object],cardContainerClass:[String,Array,Object],cardContainerStyle:[String,Array,Object],cardStyle:[String,Array,Object],cardClass:[String,Array,Object],hideBottom:Boolean,hideSelectedBanner:Boolean,hideNoData:Boolean,hidePagination:Boolean,onRowClick:Function,onRowDblclick:Function,onRowContextmenu:Function,...he,...Kt,...dl,...pt,...ll,...ul,...ol,...Yt},emits:["request","virtualScroll",...Gt,...sl,...rl],setup(e,{slots:l,emit:a}){const s=Q(),{proxy:{$q:r}}=s,d=ye(e,r),{inFullscreen:i,toggleFullscreen:c}=Xt(),f=v(()=>typeof e.rowKey=="function"?e.rowKey:t=>t[e.rowKey]),S=L(null),n=L(null),m=v(()=>e.grid!==!0&&e.virtualScroll===!0),q=v(()=>" q-table__card"+(d.value===!0?" q-table__card--dark q-dark":"")+(e.square===!0?" q-table--square":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")),C=v(()=>`q-table__container q-table--${e.separator}-separator column no-wrap`+(e.grid===!0?" q-table--grid":q.value)+(d.value===!0?" q-table--dark":"")+(e.dense===!0?" q-table--dense":"")+(e.wrapCells===!1?" q-table--no-wrap":"")+(i.value===!0?" fullscreen scroll":"")),P=v(()=>C.value+(e.loading===!0?" q-table--loading":""));F(()=>e.tableStyle+e.tableClass+e.tableHeaderStyle+e.tableHeaderClass+C.value,()=>{m.value===!0&&n.value!==null&&n.value.reset()});const{innerPagination:_,computedPagination:y,isServerSide:T,requestServerInteraction:R,setPagination:x}=al(s,H),{computedFilterMethod:b}=el(e,x),{isRowExpanded:O,setExpanded:W,updateExpanded:Ue}=cl(e,a),le=v(()=>{let t=e.rows;if(T.value===!0||t.length===0)return t;const{sortBy:u,descending:g}=y.value;return e.filter&&(t=b.value(t,e.filter,$.value,H)),Je.value!==null&&(t=Ye.value(e.rows===t?t.slice():t,u,g)),t}),we=v(()=>le.value.length),A=v(()=>{let t=le.value;if(T.value===!0)return t;const{rowsPerPage:u}=y.value;return u!==0&&(G.value===0&&e.rows!==t?t.length>X.value&&(t=t.slice(0,X.value)):t=t.slice(G.value,X.value)),t}),{hasSelectionMode:E,singleSelection:We,multipleSelection:_e,allRowsSelected:Ke,someRowsSelected:qe,rowsSelectedNumber:ae,isRowSelected:ne,clearSelection:Ge,updateSelection:K}=il(e,a,A,f),{colList:Xe,computedCols:$,computedColsMap:Ce,computedColspan:Pe}=vl(e,y,E),{columnToSort:Je,computedSortMethod:Ye,sort:oe}=Zt(e,y,Xe,x),{firstRowIndex:G,lastRowIndex:X,isFirstPage:re,isLastPage:ie,pagesNumber:J,computedRowsPerPageOptions:Ze,computedRowsNumber:Y,firstPage:ue,prevPage:se,nextPage:ce,lastPage:de}=nl(s,_,y,T,x,we),pe=v(()=>A.value.length===0),et=v(()=>{const t={};return Ne.forEach(u=>{t[u]=e[u]}),t.virtualScrollItemSize===void 0&&(t.virtualScrollItemSize=e.dense===!0?28:48),t});function tt(){m.value===!0&&n.value.reset()}function lt(){if(e.grid===!0)return bt();const t=e.hideHeader!==!0?Te:null;if(m.value===!0){const g=l["top-row"],h=l["bottom-row"],w={default:B=>Be(B.item,l.body,B.index)};if(g!==void 0){const B=o("tbody",g({cols:$.value}));w.before=t===null?()=>B:()=>[t()].concat(B)}else t!==null&&(w.before=t);return h!==void 0&&(w.after=()=>o("tbody",h({cols:$.value}))),o(It,{ref:n,class:e.tableClass,style:e.tableStyle,...et.value,scrollTarget:e.virtualScrollTarget,items:A.value,type:"__qtable",tableColspan:Pe.value,onVirtualScroll:nt},w)}const u=[ot()];return t!==null&&u.unshift(t()),ze({class:["q-table__middle scroll",e.tableClass],style:e.tableStyle},u)}function at(t,u){if(n.value!==null){n.value.scrollTo(t,u);return}t=parseInt(t,10);const g=S.value.querySelector(`tbody tr:nth-of-type(${t+1})`);if(g!==null){const h=S.value.querySelector(".q-table__middle.scroll"),w=g.offsetTop-e.virtualScrollStickySizeStart,B=w<h.scrollTop?"decrease":"increase";h.scrollTop=w,a("virtualScroll",{index:t,from:0,to:_.value.rowsPerPage-1,direction:B})}}function nt(t){a("virtualScroll",t)}function ke(){return[o(Wt,{class:"q-table__linear-progress",color:e.color,dark:d.value,indeterminate:!0,trackColor:"transparent"})]}function Be(t,u,g){const h=f.value(t),w=ne(h);if(u!==void 0)return u(Re({key:h,row:t,pageIndex:g,__trClass:w?"selected":""}));const B=l["body-cell"],k=$.value.map(D=>{const p=l[`body-cell-${D.name}`],ee=p!==void 0?p:B;return ee!==void 0?ee(rt({key:h,row:t,pageIndex:g,col:D})):o("td",{class:D.__tdClass(t),style:D.__tdStyle(t)},H(D,t))});if(E.value===!0){const D=l["body-selection"],p=D!==void 0?D(it({key:h,row:t,pageIndex:g})):[o(be,{modelValue:w,color:e.color,dark:d.value,dense:e.dense,"onUpdate:modelValue":(ee,gt)=>{K([h],[t],ee,gt)}})];k.unshift(o("td",{class:"q-table--col-auto-width"},p))}const V={key:h,class:{selected:w}};return e.onRowClick!==void 0&&(V.class["cursor-pointer"]=!0,V.onClick=D=>{a("rowClick",D,t,g)}),e.onRowDblclick!==void 0&&(V.class["cursor-pointer"]=!0,V.onDblclick=D=>{a("rowDblclick",D,t,g)}),e.onRowContextmenu!==void 0&&(V.class["cursor-pointer"]=!0,V.onContextmenu=D=>{a("rowContextmenu",D,t,g)}),o("tr",V,k)}function ot(){const t=l.body,u=l["top-row"],g=l["bottom-row"];let h=A.value.map((w,B)=>Be(w,t,B));return u!==void 0&&(h=u({cols:$.value}).concat(h)),g!==void 0&&(h=h.concat(g({cols:$.value}))),o("tbody",h)}function Re(t){return ve(t),t.cols=t.cols.map(u=>I({...u},"value",()=>H(u,t.row))),t}function rt(t){return ve(t),I(t,"value",()=>H(t.col,t.row)),t}function it(t){return ve(t),t}function ve(t){Object.assign(t,{cols:$.value,colsMap:Ce.value,sort:oe,rowIndex:G.value+t.pageIndex,color:e.color,dark:d.value,dense:e.dense}),E.value===!0&&I(t,"selected",()=>ne(t.key),(u,g)=>{K([t.key],[t.row],u,g)}),I(t,"expand",()=>O(t.key),u=>{Ue(t.key,u)})}function H(t,u){const g=typeof t.field=="function"?t.field(u):u[t.field];return t.format!==void 0?t.format(g,u):g}const N=v(()=>({pagination:y.value,pagesNumber:J.value,isFirstPage:re.value,isLastPage:ie.value,firstPage:ue,prevPage:se,nextPage:ce,lastPage:de,inFullscreen:i.value,toggleFullscreen:c}));function ut(){const t=l.top,u=l["top-left"],g=l["top-right"],h=l["top-selection"],w=E.value===!0&&h!==void 0&&ae.value>0,B="q-table__top relative-position row items-center";if(t!==void 0)return o("div",{class:B},[t(N.value)]);let k;if(w===!0?k=h(N.value).slice():(k=[],u!==void 0?k.push(o("div",{class:"q-table__control"},[u(N.value)])):e.title&&k.push(o("div",{class:"q-table__control"},[o("div",{class:["q-table__title",e.titleClass]},e.title)]))),g!==void 0&&(k.push(o("div",{class:"q-table__separator col"})),k.push(o("div",{class:"q-table__control"},[g(N.value)]))),k.length!==0)return o("div",{class:B},k)}const xe=v(()=>qe.value===!0?null:Ke.value);function Te(){const t=st();return e.loading===!0&&l.loading===void 0&&t.push(o("tr",{class:"q-table__progress"},[o("th",{class:"relative-position",colspan:Pe.value},ke())])),o("thead",t)}function st(){const t=l.header,u=l["header-cell"];if(t!==void 0)return t(fe({header:!0})).slice();const g=$.value.map(h=>{const w=l[`header-cell-${h.name}`],B=w!==void 0?w:u,k=fe({col:h});return B!==void 0?B(k):o(Qt,{key:h.name,props:k},()=>h.label)});if(We.value===!0&&e.grid!==!0)g.unshift(o("th",{class:"q-table--col-auto-width"}," "));else if(_e.value===!0){const h=l["header-selection"],w=h!==void 0?h(fe({})):[o(be,{color:e.color,modelValue:xe.value,dark:d.value,dense:e.dense,"onUpdate:modelValue":Oe})];g.unshift(o("th",{class:"q-table--col-auto-width"},w))}return[o("tr",{class:e.tableHeaderClass,style:e.tableHeaderStyle},g)]}function fe(t){return Object.assign(t,{cols:$.value,sort:oe,colsMap:Ce.value,color:e.color,dark:d.value,dense:e.dense}),_e.value===!0&&I(t,"selected",()=>xe.value,Oe),t}function Oe(t){qe.value===!0&&(t=!1),K(A.value.map(f.value),A.value,t)}const Z=v(()=>{const t=[e.iconFirstPage||r.iconSet.table.firstPage,e.iconPrevPage||r.iconSet.table.prevPage,e.iconNextPage||r.iconSet.table.nextPage,e.iconLastPage||r.iconSet.table.lastPage];return r.lang.rtl===!0?t.reverse():t});function ct(){if(e.hideBottom===!0)return;if(pe.value===!0){if(e.hideNoData===!0)return;const g=e.loading===!0?e.loadingLabel||r.lang.table.loading:e.filter?e.noResultsLabel||r.lang.table.noResults:e.noDataLabel||r.lang.table.noData,h=l["no-data"],w=h!==void 0?[h({message:g,icon:r.iconSet.table.warning,filter:e.filter})]:[o(Se,{class:"q-table__bottom-nodata-icon",name:r.iconSet.table.warning}),g];return o("div",{class:te+" q-table__bottom--nodata"},w)}const t=l.bottom;if(t!==void 0)return o("div",{class:te},[t(N.value)]);const u=e.hideSelectedBanner!==!0&&E.value===!0&&ae.value>0?[o("div",{class:"q-table__control"},[o("div",[(e.selectedRowsLabel||r.lang.table.selectedRecords)(ae.value)])])]:[];if(e.hidePagination!==!0)return o("div",{class:te+" justify-end"},vt(u));if(u.length!==0)return o("div",{class:te},u)}function dt(t){x({page:1,rowsPerPage:t.value})}function vt(t){let u;const{rowsPerPage:g}=y.value,h=e.paginationLabel||r.lang.table.pagination,w=l.pagination,B=e.rowsPerPageOptions.length>1;if(t.push(o("div",{class:"q-table__separator col"})),B===!0&&t.push(o("div",{class:"q-table__control"},[o("span",{class:"q-table__bottom-item"},[e.rowsPerPageLabel||r.lang.table.recordsPerPage]),o(Lt,{class:"q-table__select inline q-table__bottom-item",color:e.color,modelValue:g,options:Ze.value,displayValue:g===0?r.lang.table.allRows:g,dark:d.value,borderless:!0,dense:!0,optionsDense:!0,optionsCover:!0,"onUpdate:modelValue":dt})])),w!==void 0)u=w(N.value);else if(u=[o("span",g!==0?{class:"q-table__bottom-item"}:{},[g?h(G.value+1,Math.min(X.value,Y.value),Y.value):h(1,we.value,Y.value)])],g!==0&&J.value>1){const k={color:e.color,round:!0,dense:!0,flat:!0};e.dense===!0&&(k.size="sm"),J.value>2&&u.push(o(M,{key:"pgFirst",...k,icon:Z.value[0],disable:re.value,onClick:ue})),u.push(o(M,{key:"pgPrev",...k,icon:Z.value[1],disable:re.value,onClick:se}),o(M,{key:"pgNext",...k,icon:Z.value[2],disable:ie.value,onClick:ce})),J.value>2&&u.push(o(M,{key:"pgLast",...k,icon:Z.value[3],disable:ie.value,onClick:de}))}return t.push(o("div",{class:"q-table__control"},u)),t}function ft(){const t=e.gridHeader===!0?[o("table",{class:"q-table"},[Te()])]:e.loading===!0&&l.loading===void 0?ke():void 0;return o("div",{class:"q-table__middle"},t)}function bt(){const t=l.item!==void 0?l.item:u=>{const g=u.cols.map(w=>o("div",{class:"q-table__grid-item-row"},[o("div",{class:"q-table__grid-item-title"},[w.label]),o("div",{class:"q-table__grid-item-value"},[w.value])]));if(E.value===!0){const w=l["body-selection"],B=w!==void 0?w(u):[o(be,{modelValue:u.selected,color:e.color,dark:d.value,dense:e.dense,"onUpdate:modelValue":(k,V)=>{K([u.key],[u.row],k,V)}})];g.unshift(o("div",{class:"q-table__grid-item-row"},B),o(Ot,{dark:d.value}))}const h={class:["q-table__grid-item-card"+q.value,e.cardClass],style:e.cardStyle};return(e.onRowClick!==void 0||e.onRowDblclick!==void 0)&&(h.class[0]+=" cursor-pointer",e.onRowClick!==void 0&&(h.onClick=w=>{a("RowClick",w,u.row,u.pageIndex)}),e.onRowDblclick!==void 0&&(h.onDblclick=w=>{a("RowDblclick",w,u.row,u.pageIndex)})),o("div",{class:"q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3"+(u.selected===!0?" q-table__grid-item--selected":"")},[o("div",h,g)])};return o("div",{class:["q-table__grid-content row",e.cardContainerClass],style:e.cardContainerStyle},A.value.map((u,g)=>t(Re({key:f.value(u),row:u,pageIndex:g}))))}return Object.assign(s.proxy,{requestServerInteraction:R,setPagination:x,firstPage:ue,prevPage:se,nextPage:ce,lastPage:de,isRowSelected:ne,clearSelection:Ge,isRowExpanded:O,setExpanded:W,sort:oe,resetVirtualScroll:tt,scrollTo:at,getCellValue:H}),Tt(s.proxy,{filteredSortedRows:()=>le.value,computedRows:()=>A.value,computedRowsNumber:()=>Y.value}),()=>{const t=[ut()],u={ref:S,class:P.value};return e.grid===!0?t.push(ft()):Object.assign(u,{class:[u.class,e.cardClass],style:e.cardStyle}),t.push(lt(),ct()),e.loading===!0&&l.loading!==void 0&&t.push(l.loading()),o("div",u,t)}}});export{wl as Q,yl as a,hl as b};
