import{i as Rt,e as Qe,a as d,g as Ee,l as Et,d as Lt,h as b,c as Le,aD as We,aE as mt,aF as St,aG as gt,A as Ht,aH as Tt,C as Dt,aI as Pt,K as $t,R as Be,aJ as Nt,aK as Kt,y as ne,n as Qt,r as L,w as me,aL as jt,aM as Ut,aN as Wt,aO as Xt,o as ht,I as G,aP as Yt,aQ as Gt,aR as st,aS as Ce,aT as Jt,aU as Zt,s as je,aV as el,t as ve,a3 as tl,aW as ll,ay as ul,av as nl}from"./index.18990dfe.js";import{n as ct,e as ol,a as al,d as il,Q as rl}from"./ClosePopup.e621342e.js";const sl={position:{type:String,default:"bottom-right",validator:e=>["top-right","top-left","bottom-right","bottom-left","top","right","bottom","left"].includes(e)},offset:{type:Array,validator:e=>e.length===2},expand:Boolean};function cl(){const{props:e,proxy:{$q:r}}=Ee(),i=Rt(Et,Qe);if(i===Qe)return console.error("QPageSticky needs to be child of QLayout"),Qe;const p=d(()=>{const c=e.position;return{top:c.indexOf("top")!==-1,right:c.indexOf("right")!==-1,bottom:c.indexOf("bottom")!==-1,left:c.indexOf("left")!==-1,vertical:c==="top"||c==="bottom",horizontal:c==="left"||c==="right"}}),q=d(()=>i.header.offset),a=d(()=>i.right.offset),I=d(()=>i.footer.offset),m=d(()=>i.left.offset),S=d(()=>{let c=0,g=0;const V=p.value,A=r.lang.rtl===!0?-1:1;V.top===!0&&q.value!==0?g=`${q.value}px`:V.bottom===!0&&I.value!==0&&(g=`${-I.value}px`),V.left===!0&&m.value!==0?c=`${A*m.value}px`:V.right===!0&&a.value!==0&&(c=`${-A*a.value}px`);const _={transform:`translate(${c}, ${g})`};return e.offset&&(_.margin=`${e.offset[1]}px ${e.offset[0]}px`),V.vertical===!0?(m.value!==0&&(_[r.lang.rtl===!0?"right":"left"]=`${m.value}px`),a.value!==0&&(_[r.lang.rtl===!0?"left":"right"]=`${a.value}px`)):V.horizontal===!0&&(q.value!==0&&(_.top=`${q.value}px`),I.value!==0&&(_.bottom=`${I.value}px`)),_}),O=d(()=>`q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${e.expand===!0?"expand":"shrink"}`);function s(c){const g=Lt(c.default);return b("div",{class:O.value,style:S.value},e.expand===!0?g:[b("div",g)])}return{$layout:i,getStickyContent:s}}var Vl=Le({name:"QPageSticky",props:sl,setup(e,{slots:r}){const{getStickyContent:i}=cl();return()=>i(r)}}),dl=Le({name:"QField",inheritAttrs:!1,props:{...We,tag:{type:String,default:"label"}},emits:mt,setup(){return St(gt({tagProp:!0}))}});const fl={xs:8,sm:10,md:14,lg:20,xl:24};var vl=Le({name:"QChip",props:{...Ht,...Tt,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,removeAriaLabel:String,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:r,emit:i}){const{proxy:{$q:p}}=Ee(),q=Dt(e,p),a=Pt(e,fl),I=d(()=>e.selected===!0||e.icon!==void 0),m=d(()=>e.selected===!0?e.iconSelected||p.iconSet.chip.selected:e.icon),S=d(()=>e.iconRemove||p.iconSet.chip.remove),O=d(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),s=d(()=>{const v=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(v?` text-${v} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(O.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(q.value===!0?" q-chip--dark q-dark":"")}),c=d(()=>{const v=e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0},D={...v,role:"button","aria-hidden":"false","aria-label":e.removeAriaLabel||p.lang.label.remove};return{chip:v,remove:D}});function g(v){v.keyCode===13&&V(v)}function V(v){e.disable||(i("update:selected",!e.selected),i("click",v))}function A(v){(v.keyCode===void 0||v.keyCode===13)&&(ne(v),e.disable===!1&&(i("update:modelValue",!1),i("remove")))}function _(){const v=[];O.value===!0&&v.push(b("div",{class:"q-focus-helper"})),I.value===!0&&v.push(b(Be,{class:"q-chip__icon q-chip__icon--left",name:m.value}));const D=e.label!==void 0?[b("div",{class:"ellipsis"},[e.label])]:void 0;return v.push(b("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},Nt(r.default,D))),e.iconRight&&v.push(b(Be,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&v.push(b(Be,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:S.value,...c.value.remove,onClick:A,onKeyup:A})),v}return()=>{if(e.modelValue===!1)return;const v={class:s.value,style:a.value};return O.value===!0&&Object.assign(v,c.value.chip,{onClick:V,onKeyup:g}),$t("div",v,_(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[Kt,e.ripple]])}}});let Re=!1;{const e=document.createElement("div");e.setAttribute("dir","rtl"),Object.assign(e.style,{width:"1px",height:"1px",overflow:"auto"});const r=document.createElement("div");Object.assign(r.style,{width:"1000px",height:"1px"}),document.body.appendChild(e),e.appendChild(r),e.scrollLeft=-1e3,Re=e.scrollLeft>=0,e.remove()}const K=1e3,ml=["start","center","end","start-force","center-force","end-force"],yt=Array.prototype.filter,Sl=window.getComputedStyle(document.body).overflowAnchor===void 0?Qt:function(e,r){e!==null&&(e._qOverflowAnimationFrame!==void 0&&cancelAnimationFrame(e._qOverflowAnimationFrame),e._qOverflowAnimationFrame=requestAnimationFrame(()=>{if(e===null)return;e._qOverflowAnimationFrame=void 0;const i=e.children||[];yt.call(i,q=>q.dataset&&q.dataset.qVsAnchor!==void 0).forEach(q=>{delete q.dataset.qVsAnchor});const p=i[r];p&&p.dataset&&(p.dataset.qVsAnchor="")}))};function Se(e,r){return e+r}function Ue(e,r,i,p,q,a,I,m){const S=e===window?document.scrollingElement||document.documentElement:e,O=q===!0?"offsetWidth":"offsetHeight",s={scrollStart:0,scrollViewSize:-I-m,scrollMaxSize:0,offsetStart:-I,offsetEnd:-m};if(q===!0?(e===window?(s.scrollStart=window.pageXOffset||window.scrollX||document.body.scrollLeft||0,s.scrollViewSize+=document.documentElement.clientWidth):(s.scrollStart=S.scrollLeft,s.scrollViewSize+=S.clientWidth),s.scrollMaxSize=S.scrollWidth,a===!0&&(s.scrollStart=(Re===!0?s.scrollMaxSize-s.scrollViewSize:0)-s.scrollStart)):(e===window?(s.scrollStart=window.pageYOffset||window.scrollY||document.body.scrollTop||0,s.scrollViewSize+=document.documentElement.clientHeight):(s.scrollStart=S.scrollTop,s.scrollViewSize+=S.clientHeight),s.scrollMaxSize=S.scrollHeight),i!==null)for(let c=i.previousElementSibling;c!==null;c=c.previousElementSibling)c.classList.contains("q-virtual-scroll--skip")===!1&&(s.offsetStart+=c[O]);if(p!==null)for(let c=p.nextElementSibling;c!==null;c=c.nextElementSibling)c.classList.contains("q-virtual-scroll--skip")===!1&&(s.offsetEnd+=c[O]);if(r!==e){const c=S.getBoundingClientRect(),g=r.getBoundingClientRect();q===!0?(s.offsetStart+=g.left-c.left,s.offsetEnd-=g.width):(s.offsetStart+=g.top-c.top,s.offsetEnd-=g.height),e!==window&&(s.offsetStart+=s.scrollStart),s.offsetEnd+=s.scrollMaxSize-s.offsetStart}return s}function dt(e,r,i,p){r==="end"&&(r=(e===window?document.body:e)[i===!0?"scrollWidth":"scrollHeight"]),e===window?i===!0?(p===!0&&(r=(Re===!0?document.body.scrollWidth-document.documentElement.clientWidth:0)-r),window.scrollTo(r,window.pageYOffset||window.scrollY||document.body.scrollTop||0)):window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,r):i===!0?(p===!0&&(r=(Re===!0?e.scrollWidth-e.offsetWidth:0)-r),e.scrollLeft=r):e.scrollTop=r}function xe(e,r,i,p){if(i>=p)return 0;const q=r.length,a=Math.floor(i/K),I=Math.floor((p-1)/K)+1;let m=e.slice(a,I).reduce(Se,0);return i%K!==0&&(m-=r.slice(a*K,i).reduce(Se,0)),p%K!==0&&p!==q&&(m-=r.slice(p,I*K).reduce(Se,0)),m}const gl={virtualScrollSliceSize:{type:[Number,String],default:10},virtualScrollSliceRatioBefore:{type:[Number,String],default:1},virtualScrollSliceRatioAfter:{type:[Number,String],default:1},virtualScrollItemSize:{type:[Number,String],default:24},virtualScrollStickySizeStart:{type:[Number,String],default:0},virtualScrollStickySizeEnd:{type:[Number,String],default:0},tableColspan:[Number,String]},ft={virtualScrollHorizontal:Boolean,onVirtualScroll:Function,...gl};function hl({virtualScrollLength:e,getVirtualScrollTarget:r,getVirtualScrollEl:i,virtualScrollItemSizeComputed:p}){const q=Ee(),{props:a,emit:I,proxy:m}=q,{$q:S}=m;let O,s,c,g=[],V;const A=L(0),_=L(0),v=L({}),D=L(null),W=L(null),T=L(null),F=L({from:0,to:0}),ke=d(()=>a.tableColspan!==void 0?a.tableColspan:100);p===void 0&&(p=d(()=>a.virtualScrollItemSize));const B=d(()=>p.value+";"+a.virtualScrollHorizontal),X=d(()=>B.value+";"+a.virtualScrollSliceRatioBefore+";"+a.virtualScrollSliceRatioAfter);me(X,()=>{Q()}),me(B,J);function J(){oe(s,!0)}function ge(l){oe(l===void 0?s:l)}function Z(l,o){const h=r();if(h==null||h.nodeType===8)return;const z=Ue(h,i(),D.value,W.value,a.virtualScrollHorizontal,S.lang.rtl,a.virtualScrollStickySizeStart,a.virtualScrollStickySizeEnd);c!==z.scrollViewSize&&Q(z.scrollViewSize),P(h,z,Math.min(e.value-1,Math.max(0,parseInt(l,10)||0)),0,ml.indexOf(o)!==-1?o:s!==-1&&l>s?"end":"start")}function qe(){const l=r();if(l==null||l.nodeType===8)return;const o=Ue(l,i(),D.value,W.value,a.virtualScrollHorizontal,S.lang.rtl,a.virtualScrollStickySizeStart,a.virtualScrollStickySizeEnd),h=e.value-1,z=o.scrollMaxSize-o.offsetStart-o.offsetEnd-_.value;if(O===o.scrollStart)return;if(o.scrollMaxSize<=0){P(l,o,0,0);return}c!==o.scrollViewSize&&Q(o.scrollViewSize),he(F.value.from);const R=Math.floor(o.scrollMaxSize-Math.max(o.scrollViewSize,o.offsetEnd)-Math.min(V[h],o.scrollViewSize/2));if(R>0&&Math.ceil(o.scrollStart)>=R){P(l,o,h,o.scrollMaxSize-o.offsetEnd-g.reduce(Se,0));return}let C=0,w=o.scrollStart-o.offsetStart,E=w;if(w<=z&&w+o.scrollViewSize>=A.value)w-=A.value,C=F.value.from,E=w;else for(let y=0;w>=g[y]&&C<h;y++)w-=g[y],C+=K;for(;w>0&&C<h;)w-=V[C],w>-o.scrollViewSize?(C++,E=w):E=V[C]+w;P(l,o,C,E)}function P(l,o,h,z,R){const C=typeof R=="string"&&R.indexOf("-force")!==-1,w=C===!0?R.replace("-force",""):R,E=w!==void 0?w:"start";let y=Math.max(0,h-v.value[E]),$=y+v.value.total;$>e.value&&($=e.value,y=Math.max(0,$-v.value.total)),O=o.scrollStart;const Y=y!==F.value.from||$!==F.value.to;if(Y===!1&&w===void 0){ye(h);return}const{activeElement:ze}=document,j=T.value;Y===!0&&j!==null&&j!==ze&&j.contains(ze)===!0&&(j.addEventListener("focusout",Ae),setTimeout(()=>{j!==null&&j.removeEventListener("focusout",Ae)})),Sl(j,h-y);const Ie=w!==void 0?V.slice(y,h).reduce(Se,0):0;if(Y===!0){const ee=$>=F.value.from&&y<=F.value.to?F.value.to:$;F.value={from:y,to:ee},A.value=xe(g,V,0,y),_.value=xe(g,V,$,e.value),requestAnimationFrame(()=>{F.value.to!==$&&O===o.scrollStart&&(F.value={from:F.value.from,to:$},_.value=xe(g,V,$,e.value))})}requestAnimationFrame(()=>{if(O!==o.scrollStart)return;Y===!0&&he(y);const ee=V.slice(y,h).reduce(Se,0),te=ee+o.offsetStart+A.value,Oe=te+V[h];let we=te+z;if(w!==void 0){const Te=ee-Ie,pe=o.scrollStart+Te;we=C!==!0&&pe<te&&Oe<pe+o.scrollViewSize?pe:w==="end"?Oe-o.scrollViewSize:te-(w==="start"?0:Math.round((o.scrollViewSize-V[h])/2))}O=we,dt(l,we,a.virtualScrollHorizontal,S.lang.rtl),ye(h)})}function he(l){const o=T.value;if(o){const h=yt.call(o.children,y=>y.classList&&y.classList.contains("q-virtual-scroll--skip")===!1),z=h.length,R=a.virtualScrollHorizontal===!0?y=>y.getBoundingClientRect().width:y=>y.offsetHeight;let C=l,w,E;for(let y=0;y<z;){for(w=R(h[y]),y++;y<z&&h[y].classList.contains("q-virtual-scroll--with-prev")===!0;)w+=R(h[y]),y++;E=w-V[C],E!==0&&(V[C]+=E,g[Math.floor(C/K)]+=E),C++}}}function Ae(){T.value!==null&&T.value!==void 0&&T.value.focus()}function oe(l,o){const h=1*p.value;(o===!0||Array.isArray(V)===!1)&&(V=[]);const z=V.length;V.length=e.value;for(let C=e.value-1;C>=z;C--)V[C]=h;const R=Math.floor((e.value-1)/K);g=[];for(let C=0;C<=R;C++){let w=0;const E=Math.min((C+1)*K,e.value);for(let y=C*K;y<E;y++)w+=V[y];g.push(w)}s=-1,O=void 0,A.value=xe(g,V,0,F.value.from),_.value=xe(g,V,F.value.to,e.value),l>=0?(he(F.value.from),G(()=>{Z(l)})):ae()}function Q(l){if(l===void 0&&typeof window!="undefined"){const w=r();w!=null&&w.nodeType!==8&&(l=Ue(w,i(),D.value,W.value,a.virtualScrollHorizontal,S.lang.rtl,a.virtualScrollStickySizeStart,a.virtualScrollStickySizeEnd).scrollViewSize)}c=l;const o=parseFloat(a.virtualScrollSliceRatioBefore)||0,h=parseFloat(a.virtualScrollSliceRatioAfter)||0,z=1+o+h,R=l===void 0||l<=0?1:Math.ceil(l/p.value),C=Math.max(1,R,Math.ceil((a.virtualScrollSliceSize>0?a.virtualScrollSliceSize:10)/z));v.value={total:Math.ceil(C*z),start:Math.ceil(C*o),center:Math.ceil(C*(.5+o)),end:Math.ceil(C*(1+o)),view:R}}function He(l,o){const h=a.virtualScrollHorizontal===!0?"width":"height",z={["--q-virtual-scroll-item-"+h]:p.value+"px"};return[l==="tbody"?b(l,{class:"q-virtual-scroll__padding",key:"before",ref:D},[b("tr",[b("td",{style:{[h]:`${A.value}px`,...z},colspan:ke.value})])]):b(l,{class:"q-virtual-scroll__padding",key:"before",ref:D,style:{[h]:`${A.value}px`,...z}}),b(l,{class:"q-virtual-scroll__content",key:"content",ref:T,tabindex:-1},o.flat()),l==="tbody"?b(l,{class:"q-virtual-scroll__padding",key:"after",ref:W},[b("tr",[b("td",{style:{[h]:`${_.value}px`,...z},colspan:ke.value})])]):b(l,{class:"q-virtual-scroll__padding",key:"after",ref:W,style:{[h]:`${_.value}px`,...z}})]}function ye(l){s!==l&&(a.onVirtualScroll!==void 0&&I("virtualScroll",{index:l,from:F.value.from,to:F.value.to-1,direction:l<s?"decrease":"increase",ref:m}),s=l)}Q();const ae=jt(qe,S.platform.is.ios===!0?120:35);Ut(()=>{Q()});let be=!1;return Wt(()=>{be=!0}),Xt(()=>{if(be!==!0)return;const l=r();O!==void 0&&l!==void 0&&l!==null&&l.nodeType!==8?dt(l,O,a.virtualScrollHorizontal,S.lang.rtl):Z(s)}),ht(()=>{ae.cancel()}),Object.assign(m,{scrollTo:Z,reset:J,refresh:ge}),{virtualScrollSliceRange:F,virtualScrollSliceSizeComputed:v,setVirtualScrollSize:Q,onVirtualScrollEvt:ae,localResetVirtualScroll:oe,padVirtualScroll:He,scrollTo:Z,reset:J,refresh:ge}}const vt=e=>["add","add-unique","toggle"].includes(e),yl=".*+?^${}()|[]\\",bl=Object.keys(We);var Cl=Le({name:"QSelect",inheritAttrs:!1,props:{...ft,...Yt,...We,modelValue:{required:!0},multiple:Boolean,displayValue:[String,Number],displayValueHtml:Boolean,dropdownIcon:String,options:{type:Array,default:()=>[]},optionValue:[Function,String],optionLabel:[Function,String],optionDisable:[Function,String],hideSelected:Boolean,hideDropdownIcon:Boolean,fillInput:Boolean,maxValues:[Number,String],optionsDense:Boolean,optionsDark:{type:Boolean,default:null},optionsSelectedClass:String,optionsHtml:Boolean,optionsCover:Boolean,menuShrink:Boolean,menuAnchor:String,menuSelf:String,menuOffset:Array,popupContentClass:String,popupContentStyle:[String,Array,Object],popupNoRouteDismiss:Boolean,useInput:Boolean,useChips:Boolean,newValueMode:{type:String,validator:vt},mapOptions:Boolean,emitValue:Boolean,inputDebounce:{type:[Number,String],default:500},inputClass:[Array,String,Object],inputStyle:[Array,String,Object],tabindex:{type:[String,Number],default:0},autocomplete:String,transitionShow:{},transitionHide:{},transitionDuration:{},behavior:{type:String,validator:e=>["default","menu","dialog"].includes(e),default:"default"},virtualScrollItemSize:ft.virtualScrollItemSize.type,onNewValue:Function,onFilter:Function},emits:[...mt,"add","remove","inputValue","keyup","keypress","keydown","popupShow","popupHide","filterAbort"],setup(e,{slots:r,emit:i}){const{proxy:p}=Ee(),{$q:q}=p,a=L(!1),I=L(!1),m=L(-1),S=L(""),O=L(!1),s=L(!1);let c=null,g=null,V,A,_,v=null,D,W,T,F;const ke=L(null),B=L(null),X=L(null),J=L(null),ge=L(null),Z=Gt(e),qe=el(nt),P=d(()=>Array.isArray(e.options)?e.options.length:0),he=d(()=>e.virtualScrollItemSize===void 0?e.optionsDense===!0?24:48:e.virtualScrollItemSize),{virtualScrollSliceRange:Ae,virtualScrollSliceSizeComputed:oe,localResetVirtualScroll:Q,padVirtualScroll:He,onVirtualScrollEvt:ye,scrollTo:ae,setVirtualScrollSize:be}=hl({virtualScrollLength:P,getVirtualScrollTarget:Vt,getVirtualScrollEl:lt,virtualScrollItemSizeComputed:he}),l=gt(),o=d(()=>{const t=e.mapOptions===!0&&e.multiple!==!0,n=e.modelValue!==void 0&&(e.modelValue!==null||t===!0)?e.multiple===!0&&Array.isArray(e.modelValue)?e.modelValue:[e.modelValue]:[];if(e.mapOptions===!0&&Array.isArray(e.options)===!0){const u=e.mapOptions===!0&&V!==void 0?V:[],f=n.map(k=>pt(k,u));return e.modelValue===null&&t===!0?f.filter(k=>k!==null):f}return n}),h=d(()=>{const t={};return bl.forEach(n=>{const u=e[n];u!==void 0&&(t[n]=u)}),t}),z=d(()=>e.optionsDark===null?l.isDark.value:e.optionsDark),R=d(()=>st(o.value)),C=d(()=>{let t="q-field__input q-placeholder col";return e.hideSelected===!0||o.value.length===0?[t,e.inputClass]:(t+=" q-field__input--padding",e.inputClass===void 0?t:[t,e.inputClass])}),w=d(()=>(e.virtualScrollHorizontal===!0?"q-virtual-scroll--horizontal":"")+(e.popupContentClass?" "+e.popupContentClass:"")),E=d(()=>P.value===0),y=d(()=>o.value.map(t=>N.value(t)).join(", ")),$=d(()=>e.displayValue!==void 0?e.displayValue:y.value),Y=d(()=>e.optionsHtml===!0?()=>!0:t=>t!=null&&t.html===!0),ze=d(()=>e.displayValueHtml===!0||e.displayValue===void 0&&(e.optionsHtml===!0||o.value.some(Y.value))),j=d(()=>l.focused.value===!0?e.tabindex:-1),Ie=d(()=>{const t={tabindex:e.tabindex,role:"combobox","aria-label":e.label,"aria-readonly":e.readonly===!0?"true":"false","aria-autocomplete":e.useInput===!0?"list":"none","aria-expanded":a.value===!0?"true":"false","aria-controls":`${l.targetUid.value}_lb`};return m.value>=0&&(t["aria-activedescendant"]=`${l.targetUid.value}_${m.value}`),t}),ee=d(()=>({id:`${l.targetUid.value}_lb`,role:"listbox","aria-multiselectable":e.multiple===!0?"true":"false"})),te=d(()=>o.value.map((t,n)=>({index:n,opt:t,html:Y.value(t),selected:!0,removeAtIndex:wt,toggleOption:le,tabindex:j.value}))),Oe=d(()=>{if(P.value===0)return[];const{from:t,to:n}=Ae.value;return e.options.slice(t,n).map((u,f)=>{const k=ie.value(u)===!0,x=$e(u)===!0,H=t+f,M={clickable:!0,active:x,activeClass:pe.value,manualFocus:!0,focused:!1,disable:k,tabindex:-1,dense:e.optionsDense,dark:z.value,role:"option","aria-selected":x===!0?"true":"false",id:`${l.targetUid.value}_${H}`,onClick:()=>{le(u)}};return k!==!0&&(m.value===H&&(M.focused=!0),q.platform.is.desktop===!0&&(M.onMousemove=()=>{a.value===!0&&re(H)})),{index:H,opt:u,html:Y.value(u),label:N.value(u),selected:M.active,focused:M.focused,toggleOption:le,setOptionIndex:re,itemProps:M}})}),we=d(()=>e.dropdownIcon!==void 0?e.dropdownIcon:q.iconSet.arrow.dropdown),Te=d(()=>e.optionsCover===!1&&e.outlined!==!0&&e.standout!==!0&&e.borderless!==!0&&e.rounded!==!0),pe=d(()=>e.optionsSelectedClass!==void 0?e.optionsSelectedClass:e.color!==void 0?`text-${e.color}`:""),U=d(()=>Pe(e.optionValue,"value")),N=d(()=>Pe(e.optionLabel,"label")),ie=d(()=>Pe(e.optionDisable,"disable")),Me=d(()=>o.value.map(t=>U.value(t))),bt=d(()=>{const t={onInput:nt,onChange:qe,onKeydown:tt,onKeyup:Ze,onKeypress:et,onFocus:Ge,onClick(n){A===!0&&ve(n)}};return t.onCompositionstart=t.onCompositionupdate=t.onCompositionend=qe,t});me(o,t=>{V=t,e.useInput===!0&&e.fillInput===!0&&e.multiple!==!0&&l.innerLoading.value!==!0&&(I.value!==!0&&a.value!==!0||R.value!==!0)&&(_!==!0&&fe(),(I.value===!0||a.value===!0)&&se(""))},{immediate:!0}),me(()=>e.fillInput,fe),me(a,Ne),me(P,Bt);function Xe(t){return e.emitValue===!0?U.value(t):t}function De(t){if(t!==-1&&t<o.value.length)if(e.multiple===!0){const n=e.modelValue.slice();i("remove",{index:t,value:n.splice(t,1)[0]}),i("update:modelValue",n)}else i("update:modelValue",null)}function wt(t){De(t),l.focus()}function Ye(t,n){const u=Xe(t);if(e.multiple!==!0){e.fillInput===!0&&Ve(N.value(t),!0,!0),i("update:modelValue",u);return}if(o.value.length===0){i("add",{index:0,value:u}),i("update:modelValue",e.multiple===!0?[u]:u);return}if(n===!0&&$e(t)===!0||e.maxValues!==void 0&&e.modelValue.length>=e.maxValues)return;const f=e.modelValue.slice();i("add",{index:f.length,value:u}),f.push(u),i("update:modelValue",f)}function le(t,n){if(l.editable.value!==!0||t===void 0||ie.value(t)===!0)return;const u=U.value(t);if(e.multiple!==!0){n!==!0&&(Ve(e.fillInput===!0?N.value(t):"",!0,!0),ue()),B.value!==null&&B.value.focus(),(o.value.length===0||Ce(U.value(o.value[0]),u)!==!0)&&i("update:modelValue",e.emitValue===!0?u:t);return}if((A!==!0||O.value===!0)&&l.focus(),Ge(),o.value.length===0){const x=e.emitValue===!0?u:t;i("add",{index:0,value:x}),i("update:modelValue",e.multiple===!0?[x]:x);return}const f=e.modelValue.slice(),k=Me.value.findIndex(x=>Ce(x,u));if(k!==-1)i("remove",{index:k,value:f.splice(k,1)[0]});else{if(e.maxValues!==void 0&&f.length>=e.maxValues)return;const x=e.emitValue===!0?u:t;i("add",{index:f.length,value:x}),f.push(x)}i("update:modelValue",f)}function re(t){if(q.platform.is.desktop!==!0)return;const n=t!==-1&&t<P.value?t:-1;m.value!==n&&(m.value=n)}function _e(t=1,n){if(a.value===!0){let u=m.value;do u=ct(u+t,-1,P.value-1);while(u!==-1&&u!==m.value&&ie.value(e.options[u])===!0);m.value!==u&&(re(u),ae(u),n!==!0&&e.useInput===!0&&e.fillInput===!0&&Fe(u>=0?N.value(e.options[u]):D,!0))}}function pt(t,n){const u=f=>Ce(U.value(f),t);return e.options.find(u)||n.find(u)||t}function Pe(t,n){const u=t!==void 0?t:n;return typeof u=="function"?u:f=>f!==null&&typeof f=="object"&&u in f?f[u]:f}function $e(t){const n=U.value(t);return Me.value.find(u=>Ce(u,n))!==void 0}function Ge(t){e.useInput===!0&&B.value!==null&&(t===void 0||B.value===t.target&&t.target.value===y.value)&&B.value.select()}function Je(t){tl(t,27)===!0&&a.value===!0&&(ve(t),ue(),fe()),i("keyup",t)}function Ze(t){const{value:n}=t.target;if(t.keyCode!==void 0){Je(t);return}if(t.target.value="",c!==null&&(clearTimeout(c),c=null),g!==null&&(clearTimeout(g),g=null),fe(),typeof n=="string"&&n.length!==0){const u=n.toLocaleLowerCase(),f=x=>{const H=e.options.find(M=>x.value(M).toLocaleLowerCase()===u);return H===void 0?!1:(o.value.indexOf(H)===-1?le(H):ue(),!0)},k=x=>{f(U)!==!0&&(f(N)===!0||x===!0||se(n,!0,()=>k(!0)))};k()}else l.clearValue(t)}function et(t){i("keypress",t)}function tt(t){if(i("keydown",t),ll(t)===!0)return;const n=S.value.length!==0&&(e.newValueMode!==void 0||e.onNewValue!==void 0),u=t.shiftKey!==!0&&e.multiple!==!0&&(m.value!==-1||n===!0);if(t.keyCode===27){je(t);return}if(t.keyCode===9&&u===!1){ce();return}if(t.target===void 0||t.target.id!==l.targetUid.value||l.editable.value!==!0)return;if(t.keyCode===40&&l.innerLoading.value!==!0&&a.value===!1){ne(t),de();return}if(t.keyCode===8&&(e.useChips===!0||e.clearable===!0)&&e.hideSelected!==!0&&S.value.length===0){e.multiple===!0&&Array.isArray(e.modelValue)===!0?De(e.modelValue.length-1):e.multiple!==!0&&e.modelValue!==null&&i("update:modelValue",null);return}(t.keyCode===35||t.keyCode===36)&&(typeof S.value!="string"||S.value.length===0)&&(ne(t),m.value=-1,_e(t.keyCode===36?1:-1,e.multiple)),(t.keyCode===33||t.keyCode===34)&&oe.value!==void 0&&(ne(t),m.value=Math.max(-1,Math.min(P.value,m.value+(t.keyCode===33?-1:1)*oe.value.view)),_e(t.keyCode===33?1:-1,e.multiple)),(t.keyCode===38||t.keyCode===40)&&(ne(t),_e(t.keyCode===38?-1:1,e.multiple));const f=P.value;if((T===void 0||F<Date.now())&&(T=""),f>0&&e.useInput!==!0&&t.key!==void 0&&t.key.length===1&&t.altKey===!1&&t.ctrlKey===!1&&t.metaKey===!1&&(t.keyCode!==32||T.length!==0)){a.value!==!0&&de(t);const k=t.key.toLocaleLowerCase(),x=T.length===1&&T[0]===k;F=Date.now()+1500,x===!1&&(ne(t),T+=k);const H=new RegExp("^"+T.split("").map(Ke=>yl.indexOf(Ke)!==-1?"\\"+Ke:Ke).join(".*"),"i");let M=m.value;if(x===!0||M<0||H.test(N.value(e.options[M]))!==!0)do M=ct(M+1,-1,f-1);while(M!==m.value&&(ie.value(e.options[M])===!0||H.test(N.value(e.options[M]))!==!0));m.value!==M&&G(()=>{re(M),ae(M),M>=0&&e.useInput===!0&&e.fillInput===!0&&Fe(N.value(e.options[M]),!0)});return}if(!(t.keyCode!==13&&(t.keyCode!==32||e.useInput===!0||T!=="")&&(t.keyCode!==9||u===!1))){if(t.keyCode!==9&&ne(t),m.value!==-1&&m.value<f){le(e.options[m.value]);return}if(n===!0){const k=(x,H)=>{if(H){if(vt(H)!==!0)return}else H=e.newValueMode;if(Ve("",e.multiple!==!0,!0),x==null)return;(H==="toggle"?le:Ye)(x,H==="add-unique"),e.multiple!==!0&&(B.value!==null&&B.value.focus(),ue())};if(e.onNewValue!==void 0?i("newValue",S.value,k):k(S.value),e.multiple!==!0)return}a.value===!0?ce():l.innerLoading.value!==!0&&de()}}function lt(){return A===!0?ge.value:X.value!==null&&X.value.contentEl!==null?X.value.contentEl:void 0}function Vt(){return lt()}function Ct(){return e.hideSelected===!0?[]:r["selected-item"]!==void 0?te.value.map(t=>r["selected-item"](t)).slice():r.selected!==void 0?[].concat(r.selected()):e.useChips===!0?te.value.map((t,n)=>b(vl,{key:"option-"+n,removable:l.editable.value===!0&&ie.value(t.opt)!==!0,dense:!0,textColor:e.color,tabindex:j.value,onRemove(){t.removeAtIndex(n)}},()=>b("span",{class:"ellipsis",[t.html===!0?"innerHTML":"textContent"]:N.value(t.opt)}))):[b("span",{[ze.value===!0?"innerHTML":"textContent"]:$.value})]}function ut(){if(E.value===!0)return r["no-option"]!==void 0?r["no-option"]({inputValue:S.value}):void 0;const t=r.option!==void 0?r.option:u=>b(rl,{key:u.index,...u.itemProps},()=>b(al,()=>b(il,()=>b("span",{[u.html===!0?"innerHTML":"textContent"]:u.label}))));let n=He("div",Oe.value.map(t));return r["before-options"]!==void 0&&(n=r["before-options"]().concat(n)),nl(r["after-options"],n)}function xt(t,n){const u=n===!0?{...Ie.value,...l.splitAttrs.attributes.value}:void 0,f={ref:n===!0?B:void 0,key:"i_t",class:C.value,style:e.inputStyle,value:S.value!==void 0?S.value:"",type:"search",...u,id:n===!0?l.targetUid.value:void 0,maxlength:e.maxlength,autocomplete:e.autocomplete,"data-autofocus":t===!0||e.autofocus===!0||void 0,disabled:e.disable===!0,readonly:e.readonly===!0,...bt.value};return t!==!0&&A===!0&&(Array.isArray(f.class)===!0?f.class=[...f.class,"no-pointer-events"]:f.class+=" no-pointer-events"),b("input",f)}function nt(t){c!==null&&(clearTimeout(c),c=null),g!==null&&(clearTimeout(g),g=null),!(t&&t.target&&t.target.qComposing===!0)&&(Fe(t.target.value||""),_=!0,D=S.value,l.focused.value!==!0&&(A!==!0||O.value===!0)&&l.focus(),e.onFilter!==void 0&&(c=setTimeout(()=>{c=null,se(S.value)},e.inputDebounce)))}function Fe(t,n){S.value!==t&&(S.value=t,n===!0||e.inputDebounce===0||e.inputDebounce==="0"?i("inputValue",t):g=setTimeout(()=>{g=null,i("inputValue",t)},e.inputDebounce))}function Ve(t,n,u){_=u!==!0,e.useInput===!0&&(Fe(t,!0),(n===!0||u!==!0)&&(D=t),n!==!0&&se(t))}function se(t,n,u){if(e.onFilter===void 0||n!==!0&&l.focused.value!==!0)return;l.innerLoading.value===!0?i("filterAbort"):(l.innerLoading.value=!0,s.value=!0),t!==""&&e.multiple!==!0&&o.value.length!==0&&_!==!0&&t===N.value(o.value[0])&&(t="");const f=setTimeout(()=>{a.value===!0&&(a.value=!1)},10);v!==null&&clearTimeout(v),v=f,i("filter",t,(k,x)=>{(n===!0||l.focused.value===!0)&&v===f&&(clearTimeout(v),typeof k=="function"&&k(),s.value=!1,G(()=>{l.innerLoading.value=!1,l.editable.value===!0&&(n===!0?a.value===!0&&ue():a.value===!0?Ne(!0):a.value=!0),typeof x=="function"&&G(()=>{x(p)}),typeof u=="function"&&G(()=>{u(p)})}))},()=>{l.focused.value===!0&&v===f&&(clearTimeout(v),l.innerLoading.value=!1,s.value=!1),a.value===!0&&(a.value=!1)})}function kt(){return b(ol,{ref:X,class:w.value,style:e.popupContentStyle,modelValue:a.value,fit:e.menuShrink!==!0,cover:e.optionsCover===!0&&E.value!==!0&&e.useInput!==!0,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,dark:z.value,noParentEvent:!0,noRefocus:!0,noFocus:!0,noRouteDismiss:e.popupNoRouteDismiss,square:Te.value,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,separateClosePopup:!0,...ee.value,onScrollPassive:ye,onBeforeShow:at,onBeforeHide:qt,onShow:At},ut)}function qt(t){it(t),ce()}function At(){be()}function zt(t){ve(t),B.value!==null&&B.value.focus(),O.value=!0,window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,0)}function It(t){ve(t),G(()=>{O.value=!1})}function Ot(){const t=[b(dl,{class:`col-auto ${l.fieldClass.value}`,...h.value,for:l.targetUid.value,dark:z.value,square:!0,loading:s.value,itemAligned:!1,filled:!0,stackLabel:S.value.length!==0,...l.splitAttrs.listeners.value,onFocus:zt,onBlur:It},{...r,rawControl:()=>l.getControl(!0),before:void 0,after:void 0})];return a.value===!0&&t.push(b("div",{ref:ge,class:w.value+" scroll",style:e.popupContentStyle,...ee.value,onClick:je,onScrollPassive:ye},ut())),b(ul,{ref:J,modelValue:I.value,position:e.useInput===!0?"top":void 0,transitionShow:W,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,noRouteDismiss:e.popupNoRouteDismiss,onBeforeShow:at,onBeforeHide:Mt,onHide:_t,onShow:Ft},()=>b("div",{class:"q-select__dialog"+(z.value===!0?" q-select__dialog--dark q-dark":"")+(O.value===!0?" q-select__dialog--focused":"")},t))}function Mt(t){it(t),J.value!==null&&J.value.__updateRefocusTarget(l.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")),l.focused.value=!1}function _t(t){ue(),l.focused.value===!1&&i("blur",t),fe()}function Ft(){const t=document.activeElement;(t===null||t.id!==l.targetUid.value)&&B.value!==null&&B.value!==t&&B.value.focus(),be()}function ce(){I.value!==!0&&(m.value=-1,a.value===!0&&(a.value=!1),l.focused.value===!1&&(v!==null&&(clearTimeout(v),v=null),l.innerLoading.value===!0&&(i("filterAbort"),l.innerLoading.value=!1,s.value=!1)))}function de(t){l.editable.value===!0&&(A===!0?(l.onControlFocusin(t),I.value=!0,G(()=>{l.focus()})):l.focus(),e.onFilter!==void 0?se(S.value):(E.value!==!0||r["no-option"]!==void 0)&&(a.value=!0))}function ue(){I.value=!1,ce()}function fe(){e.useInput===!0&&Ve(e.multiple!==!0&&e.fillInput===!0&&o.value.length!==0&&N.value(o.value[0])||"",!0,!0)}function Ne(t){let n=-1;if(t===!0){if(o.value.length!==0){const u=U.value(o.value[0]);n=e.options.findIndex(f=>Ce(U.value(f),u))}Q(n)}re(n)}function Bt(t,n){a.value===!0&&l.innerLoading.value===!1&&(Q(-1,!0),G(()=>{a.value===!0&&l.innerLoading.value===!1&&(t>n?Q():Ne(!0))}))}function ot(){I.value===!1&&X.value!==null&&X.value.updatePosition()}function at(t){t!==void 0&&ve(t),i("popupShow",t),l.hasPopupOpen=!0,l.onControlFocusin(t)}function it(t){t!==void 0&&ve(t),i("popupHide",t),l.hasPopupOpen=!1,l.onControlFocusout(t)}function rt(){A=q.platform.is.mobile!==!0&&e.behavior!=="dialog"?!1:e.behavior!=="menu"&&(e.useInput===!0?r["no-option"]!==void 0||e.onFilter!==void 0||E.value===!1:!0),W=q.platform.is.ios===!0&&A===!0&&e.useInput===!0?"fade":e.transitionShow}return Jt(rt),Zt(ot),rt(),ht(()=>{c!==null&&clearTimeout(c),g!==null&&clearTimeout(g)}),Object.assign(p,{showPopup:de,hidePopup:ue,removeAtIndex:De,add:Ye,toggleOption:le,getOptionIndex:()=>m.value,setOptionIndex:re,moveOptionSelection:_e,filter:se,updateMenuPosition:ot,updateInputValue:Ve,isOptionSelected:$e,getEmittingOptionValue:Xe,isOptionDisabled:(...t)=>ie.value.apply(null,t)===!0,getOptionValue:(...t)=>U.value.apply(null,t),getOptionLabel:(...t)=>N.value.apply(null,t)}),Object.assign(l,{innerValue:o,fieldClass:d(()=>`q-select q-field--auto-height q-select--with${e.useInput!==!0?"out":""}-input q-select--with${e.useChips!==!0?"out":""}-chips q-select--${e.multiple===!0?"multiple":"single"}`),inputRef:ke,targetRef:B,hasValue:R,showPopup:de,floatingLabel:d(()=>e.hideSelected!==!0&&R.value===!0||typeof S.value=="number"||S.value.length!==0||st(e.displayValue)),getControlChild:()=>{if(l.editable.value!==!1&&(I.value===!0||E.value!==!0||r["no-option"]!==void 0))return A===!0?Ot():kt();l.hasPopupOpen===!0&&(l.hasPopupOpen=!1)},controlEvents:{onFocusin(t){l.onControlFocusin(t)},onFocusout(t){l.onControlFocusout(t,()=>{fe(),ce()})},onClick(t){if(je(t),A!==!0&&a.value===!0){ce(),B.value!==null&&B.value.focus();return}de(t)}},getControl:t=>{const n=Ct(),u=t===!0||I.value!==!0||A!==!0;if(e.useInput===!0)n.push(xt(t,u));else if(l.editable.value===!0){const k=u===!0?Ie.value:void 0;n.push(b("input",{ref:u===!0?B:void 0,key:"d_t",class:"q-select__focus-target",id:u===!0?l.targetUid.value:void 0,value:$.value,readonly:!0,"data-autofocus":t===!0||e.autofocus===!0||void 0,...k,onKeydown:tt,onKeyup:Je,onKeypress:et})),u===!0&&typeof e.autocomplete=="string"&&e.autocomplete.length!==0&&n.push(b("input",{class:"q-select__autocomplete-input",autocomplete:e.autocomplete,tabindex:-1,onKeyup:Ze}))}if(Z.value!==void 0&&e.disable!==!0&&Me.value.length!==0){const k=Me.value.map(x=>b("option",{value:x,selected:!0}));n.push(b("select",{class:"hidden",name:Z.value,multiple:e.multiple},k))}const f=e.useInput===!0||u!==!0?void 0:l.splitAttrs.attributes.value;return b("div",{class:"q-field__native row items-center",...f,...l.splitAttrs.listeners.value},n)},getInnerAppend:()=>e.loading!==!0&&s.value!==!0&&e.hideDropdownIcon!==!0?[b(Be,{class:"q-select__dropdown-icon"+(a.value===!0?" rotate-180":""),name:we.value})]:null}),St(l)}});export{Vl as Q,Cl as a};
