import{e as je,G as Rt,aG as Et,I as Lt,aH as Ht,f,O as Tt,g as Qe,h as g,X as Be,aI as Dt,aJ as Pt,E as ne,aK as Ue,aL as vt,aM as mt,aN as St,s as Nt,r as E,w as me,n as G,aO as $t,o as Kt,aP as jt,aQ as Qt,c as ht,aR as Ut,aS as Wt,aT as rt,aU as xe,aV as Xt,aW as Yt,z as $e,aX as Gt,A as ve,a5 as Jt,aY as Zt,aD as el,ax as tl}from"./index.14a741ef.js";import{n as ct,Q as ll,d as ul,e as nl,a as al}from"./ClosePopup.b46939d4.js";const ol={xs:8,sm:10,md:14,lg:20,xl:24};var il=je({name:"QChip",props:{...Rt,...Et,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,removeAriaLabel:String,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:r,emit:i}){const{proxy:{$q:b}}=Qe(),O=Lt(e,b),o=Ht(e,ol),F=f(()=>e.selected===!0||e.icon!==void 0),y=f(()=>e.selected===!0?e.iconSelected||b.iconSet.chip.selected:e.icon),h=f(()=>e.iconRemove||b.iconSet.chip.remove),z=f(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),c=f(()=>{const d=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(d?` text-${d} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(z.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(O.value===!0?" q-chip--dark q-dark":"")}),w=f(()=>{const d=e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0},D={...d,role:"button","aria-hidden":"false","aria-label":e.removeAriaLabel||b.lang.label.remove};return{chip:d,remove:D}});function C(d){d.keyCode===13&&x(d)}function x(d){e.disable||(i("update:selected",!e.selected),i("click",d))}function q(d){(d.keyCode===void 0||d.keyCode===13)&&(ne(d),e.disable===!1&&(i("update:modelValue",!1),i("remove")))}function T(){const d=[];z.value===!0&&d.push(g("div",{class:"q-focus-helper"})),F.value===!0&&d.push(g(Be,{class:"q-chip__icon q-chip__icon--left",name:y.value}));const D=e.label!==void 0?[g("div",{class:"ellipsis"},[e.label])]:void 0;return d.push(g("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},Dt(r.default,D))),e.iconRight&&d.push(g(Be,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&d.push(g(Be,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:h.value,...w.value.remove,onClick:q,onKeyup:q})),d}return()=>{if(e.modelValue===!1)return;const d={class:c.value,style:o.value};return z.value===!0&&Object.assign(d,w.value.chip,{onClick:x,onKeyup:C}),Tt("div",d,T(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[Pt,e.ripple]])}}}),rl=je({name:"QField",inheritAttrs:!1,props:{...Ue,tag:{type:String,default:"label"}},emits:vt,setup(){return mt(St({tagProp:!0}))}});let Re=!1;{const e=document.createElement("div");e.setAttribute("dir","rtl"),Object.assign(e.style,{width:"1px",height:"1px",overflow:"auto"});const r=document.createElement("div");Object.assign(r.style,{width:"1000px",height:"1px"}),document.body.appendChild(e),e.appendChild(r),e.scrollLeft=-1e3,Re=e.scrollLeft>=0,e.remove()}const K=1e3,cl=["start","center","end","start-force","center-force","end-force"],gt=Array.prototype.filter,sl=window.getComputedStyle(document.body).overflowAnchor===void 0?Nt:function(e,r){e!==null&&(e._qOverflowAnimationFrame!==void 0&&cancelAnimationFrame(e._qOverflowAnimationFrame),e._qOverflowAnimationFrame=requestAnimationFrame(()=>{if(e===null)return;e._qOverflowAnimationFrame=void 0;const i=e.children||[];gt.call(i,O=>O.dataset&&O.dataset.qVsAnchor!==void 0).forEach(O=>{delete O.dataset.qVsAnchor});const b=i[r];b&&b.dataset&&(b.dataset.qVsAnchor="")}))};function Se(e,r){return e+r}function Ke(e,r,i,b,O,o,F,y){const h=e===window?document.scrollingElement||document.documentElement:e,z=O===!0?"offsetWidth":"offsetHeight",c={scrollStart:0,scrollViewSize:-F-y,scrollMaxSize:0,offsetStart:-F,offsetEnd:-y};if(O===!0?(e===window?(c.scrollStart=window.pageXOffset||window.scrollX||document.body.scrollLeft||0,c.scrollViewSize+=document.documentElement.clientWidth):(c.scrollStart=h.scrollLeft,c.scrollViewSize+=h.clientWidth),c.scrollMaxSize=h.scrollWidth,o===!0&&(c.scrollStart=(Re===!0?c.scrollMaxSize-c.scrollViewSize:0)-c.scrollStart)):(e===window?(c.scrollStart=window.pageYOffset||window.scrollY||document.body.scrollTop||0,c.scrollViewSize+=document.documentElement.clientHeight):(c.scrollStart=h.scrollTop,c.scrollViewSize+=h.clientHeight),c.scrollMaxSize=h.scrollHeight),i!==null)for(let w=i.previousElementSibling;w!==null;w=w.previousElementSibling)w.classList.contains("q-virtual-scroll--skip")===!1&&(c.offsetStart+=w[z]);if(b!==null)for(let w=b.nextElementSibling;w!==null;w=w.nextElementSibling)w.classList.contains("q-virtual-scroll--skip")===!1&&(c.offsetEnd+=w[z]);if(r!==e){const w=h.getBoundingClientRect(),C=r.getBoundingClientRect();O===!0?(c.offsetStart+=C.left-w.left,c.offsetEnd-=C.width):(c.offsetStart+=C.top-w.top,c.offsetEnd-=C.height),e!==window&&(c.offsetStart+=c.scrollStart),c.offsetEnd+=c.scrollMaxSize-c.offsetStart}return c}function st(e,r,i,b){r==="end"&&(r=(e===window?document.body:e)[i===!0?"scrollWidth":"scrollHeight"]),e===window?i===!0?(b===!0&&(r=(Re===!0?document.body.scrollWidth-document.documentElement.clientWidth:0)-r),window.scrollTo(r,window.pageYOffset||window.scrollY||document.body.scrollTop||0)):window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,r):i===!0?(b===!0&&(r=(Re===!0?e.scrollWidth-e.offsetWidth:0)-r),e.scrollLeft=r):e.scrollTop=r}function ke(e,r,i,b){if(i>=b)return 0;const O=r.length,o=Math.floor(i/K),F=Math.floor((b-1)/K)+1;let y=e.slice(o,F).reduce(Se,0);return i%K!==0&&(y-=r.slice(o*K,i).reduce(Se,0)),b%K!==0&&b!==O&&(y-=r.slice(b,F*K).reduce(Se,0)),y}const yt={virtualScrollSliceSize:{type:[Number,String],default:10},virtualScrollSliceRatioBefore:{type:[Number,String],default:1},virtualScrollSliceRatioAfter:{type:[Number,String],default:1},virtualScrollItemSize:{type:[Number,String],default:24},virtualScrollStickySizeStart:{type:[Number,String],default:0},virtualScrollStickySizeEnd:{type:[Number,String],default:0},tableColspan:[Number,String]},hl=Object.keys(yt),dt={virtualScrollHorizontal:Boolean,onVirtualScroll:Function,...yt};function dl({virtualScrollLength:e,getVirtualScrollTarget:r,getVirtualScrollEl:i,virtualScrollItemSizeComputed:b}){const O=Qe(),{props:o,emit:F,proxy:y}=O,{$q:h}=y;let z,c,w,C=[],x;const q=E(0),T=E(0),d=E({}),D=E(null),W=E(null),H=E(null),M=E({from:0,to:0}),pe=f(()=>o.tableColspan!==void 0?o.tableColspan:100);b===void 0&&(b=f(()=>o.virtualScrollItemSize));const _=f(()=>b.value+";"+o.virtualScrollHorizontal),X=f(()=>_.value+";"+o.virtualScrollSliceRatioBefore+";"+o.virtualScrollSliceRatioAfter);me(X,()=>{j()}),me(_,J);function J(){ae(c,!0)}function he(l){ae(l===void 0?c:l)}function Z(l,a){const v=r();if(v==null||v.nodeType===8)return;const A=Ke(v,i(),D.value,W.value,o.virtualScrollHorizontal,h.lang.rtl,o.virtualScrollStickySizeStart,o.virtualScrollStickySizeEnd);w!==A.scrollViewSize&&j(A.scrollViewSize),P(v,A,Math.min(e.value-1,Math.max(0,parseInt(l,10)||0)),0,cl.indexOf(a)!==-1?a:c!==-1&&l>c?"end":"start")}function Ae(){const l=r();if(l==null||l.nodeType===8)return;const a=Ke(l,i(),D.value,W.value,o.virtualScrollHorizontal,h.lang.rtl,o.virtualScrollStickySizeStart,o.virtualScrollStickySizeEnd),v=e.value-1,A=a.scrollMaxSize-a.offsetStart-a.offsetEnd-T.value;if(z===a.scrollStart)return;if(a.scrollMaxSize<=0){P(l,a,0,0);return}w!==a.scrollViewSize&&j(a.scrollViewSize),ge(M.value.from);const B=Math.floor(a.scrollMaxSize-Math.max(a.scrollViewSize,a.offsetEnd)-Math.min(x[v],a.scrollViewSize/2));if(B>0&&Math.ceil(a.scrollStart)>=B){P(l,a,v,a.scrollMaxSize-a.offsetEnd-C.reduce(Se,0));return}let V=0,S=a.scrollStart-a.offsetStart,R=S;if(S<=A&&S+a.scrollViewSize>=q.value)S-=q.value,V=M.value.from,R=S;else for(let m=0;S>=C[m]&&V<v;m++)S-=C[m],V+=K;for(;S>0&&V<v;)S-=x[V],S>-a.scrollViewSize?(V++,R=S):R=x[V]+S;P(l,a,V,R)}function P(l,a,v,A,B){const V=typeof B=="string"&&B.indexOf("-force")!==-1,S=V===!0?B.replace("-force",""):B,R=S!==void 0?S:"start";let m=Math.max(0,v-d.value[R]),N=m+d.value.total;N>e.value&&(N=e.value,m=Math.max(0,N-d.value.total)),z=a.scrollStart;const Y=m!==M.value.from||N!==M.value.to;if(Y===!1&&S===void 0){ye(v);return}const{activeElement:ze}=document,Q=H.value;Y===!0&&Q!==null&&Q!==ze&&Q.contains(ze)===!0&&(Q.addEventListener("focusout",qe),setTimeout(()=>{Q!==null&&Q.removeEventListener("focusout",qe)})),sl(Q,v-m);const Ie=S!==void 0?x.slice(m,v).reduce(Se,0):0;if(Y===!0){const ee=N>=M.value.from&&m<=M.value.to?M.value.to:N;M.value={from:m,to:ee},q.value=ke(C,x,0,m),T.value=ke(C,x,N,e.value),requestAnimationFrame(()=>{M.value.to!==N&&z===a.scrollStart&&(M.value={from:M.value.from,to:N},T.value=ke(C,x,N,e.value))})}requestAnimationFrame(()=>{if(z!==a.scrollStart)return;Y===!0&&ge(m);const ee=x.slice(m,v).reduce(Se,0),te=ee+a.offsetStart+q.value,Oe=te+x[v];let we=te+A;if(S!==void 0){const Le=ee-Ie,Ve=a.scrollStart+Le;we=V!==!0&&Ve<te&&Oe<Ve+a.scrollViewSize?Ve:S==="end"?Oe-a.scrollViewSize:te-(S==="start"?0:Math.round((a.scrollViewSize-x[v])/2))}z=we,st(l,we,o.virtualScrollHorizontal,h.lang.rtl),ye(v)})}function ge(l){const a=H.value;if(a){const v=gt.call(a.children,m=>m.classList&&m.classList.contains("q-virtual-scroll--skip")===!1),A=v.length,B=o.virtualScrollHorizontal===!0?m=>m.getBoundingClientRect().width:m=>m.offsetHeight;let V=l,S,R;for(let m=0;m<A;){for(S=B(v[m]),m++;m<A&&v[m].classList.contains("q-virtual-scroll--with-prev")===!0;)S+=B(v[m]),m++;R=S-x[V],R!==0&&(x[V]+=R,C[Math.floor(V/K)]+=R),V++}}}function qe(){H.value!==null&&H.value!==void 0&&H.value.focus()}function ae(l,a){const v=1*b.value;(a===!0||Array.isArray(x)===!1)&&(x=[]);const A=x.length;x.length=e.value;for(let V=e.value-1;V>=A;V--)x[V]=v;const B=Math.floor((e.value-1)/K);C=[];for(let V=0;V<=B;V++){let S=0;const R=Math.min((V+1)*K,e.value);for(let m=V*K;m<R;m++)S+=x[m];C.push(S)}c=-1,z=void 0,q.value=ke(C,x,0,M.value.from),T.value=ke(C,x,M.value.to,e.value),l>=0?(ge(M.value.from),G(()=>{Z(l)})):oe()}function j(l){if(l===void 0&&typeof window!="undefined"){const S=r();S!=null&&S.nodeType!==8&&(l=Ke(S,i(),D.value,W.value,o.virtualScrollHorizontal,h.lang.rtl,o.virtualScrollStickySizeStart,o.virtualScrollStickySizeEnd).scrollViewSize)}w=l;const a=parseFloat(o.virtualScrollSliceRatioBefore)||0,v=parseFloat(o.virtualScrollSliceRatioAfter)||0,A=1+a+v,B=l===void 0||l<=0?1:Math.ceil(l/b.value),V=Math.max(1,B,Math.ceil((o.virtualScrollSliceSize>0?o.virtualScrollSliceSize:10)/A));d.value={total:Math.ceil(V*A),start:Math.ceil(V*a),center:Math.ceil(V*(.5+a)),end:Math.ceil(V*(1+a)),view:B}}function Ee(l,a){const v=o.virtualScrollHorizontal===!0?"width":"height",A={["--q-virtual-scroll-item-"+v]:b.value+"px"};return[l==="tbody"?g(l,{class:"q-virtual-scroll__padding",key:"before",ref:D},[g("tr",[g("td",{style:{[v]:`${q.value}px`,...A},colspan:pe.value})])]):g(l,{class:"q-virtual-scroll__padding",key:"before",ref:D,style:{[v]:`${q.value}px`,...A}}),g(l,{class:"q-virtual-scroll__content",key:"content",ref:H,tabindex:-1},a.flat()),l==="tbody"?g(l,{class:"q-virtual-scroll__padding",key:"after",ref:W},[g("tr",[g("td",{style:{[v]:`${T.value}px`,...A},colspan:pe.value})])]):g(l,{class:"q-virtual-scroll__padding",key:"after",ref:W,style:{[v]:`${T.value}px`,...A}})]}function ye(l){c!==l&&(o.onVirtualScroll!==void 0&&F("virtualScroll",{index:l,from:M.value.from,to:M.value.to-1,direction:l<c?"decrease":"increase",ref:y}),c=l)}j();const oe=$t(Ae,h.platform.is.ios===!0?120:35);Kt(()=>{j()});let be=!1;return jt(()=>{be=!0}),Qt(()=>{if(be!==!0)return;const l=r();z!==void 0&&l!==void 0&&l!==null&&l.nodeType!==8?st(l,z,o.virtualScrollHorizontal,h.lang.rtl):Z(c)}),ht(()=>{oe.cancel()}),Object.assign(y,{scrollTo:Z,reset:J,refresh:he}),{virtualScrollSliceRange:M,virtualScrollSliceSizeComputed:d,setVirtualScrollSize:j,onVirtualScrollEvt:oe,localResetVirtualScroll:ae,padVirtualScroll:Ee,scrollTo:Z,reset:J,refresh:he}}const ft=e=>["add","add-unique","toggle"].includes(e),fl=".*+?^${}()|[]\\",vl=Object.keys(Ue);var gl=je({name:"QSelect",inheritAttrs:!1,props:{...dt,...Ut,...Ue,modelValue:{required:!0},multiple:Boolean,displayValue:[String,Number],displayValueHtml:Boolean,dropdownIcon:String,options:{type:Array,default:()=>[]},optionValue:[Function,String],optionLabel:[Function,String],optionDisable:[Function,String],hideSelected:Boolean,hideDropdownIcon:Boolean,fillInput:Boolean,maxValues:[Number,String],optionsDense:Boolean,optionsDark:{type:Boolean,default:null},optionsSelectedClass:String,optionsHtml:Boolean,optionsCover:Boolean,menuShrink:Boolean,menuAnchor:String,menuSelf:String,menuOffset:Array,popupContentClass:String,popupContentStyle:[String,Array,Object],popupNoRouteDismiss:Boolean,useInput:Boolean,useChips:Boolean,newValueMode:{type:String,validator:ft},mapOptions:Boolean,emitValue:Boolean,inputDebounce:{type:[Number,String],default:500},inputClass:[Array,String,Object],inputStyle:[Array,String,Object],tabindex:{type:[String,Number],default:0},autocomplete:String,transitionShow:{},transitionHide:{},transitionDuration:{},behavior:{type:String,validator:e=>["default","menu","dialog"].includes(e),default:"default"},virtualScrollItemSize:dt.virtualScrollItemSize.type,onNewValue:Function,onFilter:Function},emits:[...vt,"add","remove","inputValue","keyup","keypress","keydown","popupShow","popupHide","filterAbort"],setup(e,{slots:r,emit:i}){const{proxy:b}=Qe(),{$q:O}=b,o=E(!1),F=E(!1),y=E(-1),h=E(""),z=E(!1),c=E(!1);let w=null,C=null,x,q,T,d=null,D,W,H,M;const pe=E(null),_=E(null),X=E(null),J=E(null),he=E(null),Z=Wt(e),Ae=Gt(ut),P=f(()=>Array.isArray(e.options)?e.options.length:0),ge=f(()=>e.virtualScrollItemSize===void 0?e.optionsDense===!0?24:48:e.virtualScrollItemSize),{virtualScrollSliceRange:qe,virtualScrollSliceSizeComputed:ae,localResetVirtualScroll:j,padVirtualScroll:Ee,onVirtualScrollEvt:ye,scrollTo:oe,setVirtualScrollSize:be}=dl({virtualScrollLength:P,getVirtualScrollTarget:Ct,getVirtualScrollEl:tt,virtualScrollItemSizeComputed:ge}),l=St(),a=f(()=>{const t=e.mapOptions===!0&&e.multiple!==!0,n=e.modelValue!==void 0&&(e.modelValue!==null||t===!0)?e.multiple===!0&&Array.isArray(e.modelValue)?e.modelValue:[e.modelValue]:[];if(e.mapOptions===!0&&Array.isArray(e.options)===!0){const u=e.mapOptions===!0&&x!==void 0?x:[],s=n.map(p=>Vt(p,u));return e.modelValue===null&&t===!0?s.filter(p=>p!==null):s}return n}),v=f(()=>{const t={};return vl.forEach(n=>{const u=e[n];u!==void 0&&(t[n]=u)}),t}),A=f(()=>e.optionsDark===null?l.isDark.value:e.optionsDark),B=f(()=>rt(a.value)),V=f(()=>{let t="q-field__input q-placeholder col";return e.hideSelected===!0||a.value.length===0?[t,e.inputClass]:(t+=" q-field__input--padding",e.inputClass===void 0?t:[t,e.inputClass])}),S=f(()=>(e.virtualScrollHorizontal===!0?"q-virtual-scroll--horizontal":"")+(e.popupContentClass?" "+e.popupContentClass:"")),R=f(()=>P.value===0),m=f(()=>a.value.map(t=>$.value(t)).join(", ")),N=f(()=>e.displayValue!==void 0?e.displayValue:m.value),Y=f(()=>e.optionsHtml===!0?()=>!0:t=>t!=null&&t.html===!0),ze=f(()=>e.displayValueHtml===!0||e.displayValue===void 0&&(e.optionsHtml===!0||a.value.some(Y.value))),Q=f(()=>l.focused.value===!0?e.tabindex:-1),Ie=f(()=>{const t={tabindex:e.tabindex,role:"combobox","aria-label":e.label,"aria-readonly":e.readonly===!0?"true":"false","aria-autocomplete":e.useInput===!0?"list":"none","aria-expanded":o.value===!0?"true":"false","aria-controls":`${l.targetUid.value}_lb`};return y.value>=0&&(t["aria-activedescendant"]=`${l.targetUid.value}_${y.value}`),t}),ee=f(()=>({id:`${l.targetUid.value}_lb`,role:"listbox","aria-multiselectable":e.multiple===!0?"true":"false"})),te=f(()=>a.value.map((t,n)=>({index:n,opt:t,html:Y.value(t),selected:!0,removeAtIndex:wt,toggleOption:le,tabindex:Q.value}))),Oe=f(()=>{if(P.value===0)return[];const{from:t,to:n}=qe.value;return e.options.slice(t,n).map((u,s)=>{const p=ie.value(u)===!0,k=De(u)===!0,L=t+s,I={clickable:!0,active:k,activeClass:Ve.value,manualFocus:!0,focused:!1,disable:p,tabindex:-1,dense:e.optionsDense,dark:A.value,role:"option","aria-selected":k===!0?"true":"false",id:`${l.targetUid.value}_${L}`,onClick:()=>{le(u)}};return p!==!0&&(y.value===L&&(I.focused=!0),O.platform.is.desktop===!0&&(I.onMousemove=()=>{o.value===!0&&re(L)})),{index:L,opt:u,html:Y.value(u),label:$.value(u),selected:I.active,focused:I.focused,toggleOption:le,setOptionIndex:re,itemProps:I}})}),we=f(()=>e.dropdownIcon!==void 0?e.dropdownIcon:O.iconSet.arrow.dropdown),Le=f(()=>e.optionsCover===!1&&e.outlined!==!0&&e.standout!==!0&&e.borderless!==!0&&e.rounded!==!0),Ve=f(()=>e.optionsSelectedClass!==void 0?e.optionsSelectedClass:e.color!==void 0?`text-${e.color}`:""),U=f(()=>Te(e.optionValue,"value")),$=f(()=>Te(e.optionLabel,"label")),ie=f(()=>Te(e.optionDisable,"disable")),Me=f(()=>a.value.map(t=>U.value(t))),bt=f(()=>{const t={onInput:ut,onChange:Ae,onKeydown:et,onKeyup:Je,onKeypress:Ze,onFocus:Ye,onClick(n){q===!0&&ve(n)}};return t.onCompositionstart=t.onCompositionupdate=t.onCompositionend=Ae,t});me(a,t=>{x=t,e.useInput===!0&&e.fillInput===!0&&e.multiple!==!0&&l.innerLoading.value!==!0&&(F.value!==!0&&o.value!==!0||B.value!==!0)&&(T!==!0&&fe(),(F.value===!0||o.value===!0)&&ce(""))},{immediate:!0}),me(()=>e.fillInput,fe),me(o,Pe),me(P,Bt);function We(t){return e.emitValue===!0?U.value(t):t}function He(t){if(t!==-1&&t<a.value.length)if(e.multiple===!0){const n=e.modelValue.slice();i("remove",{index:t,value:n.splice(t,1)[0]}),i("update:modelValue",n)}else i("update:modelValue",null)}function wt(t){He(t),l.focus()}function Xe(t,n){const u=We(t);if(e.multiple!==!0){e.fillInput===!0&&Ce($.value(t),!0,!0),i("update:modelValue",u);return}if(a.value.length===0){i("add",{index:0,value:u}),i("update:modelValue",e.multiple===!0?[u]:u);return}if(n===!0&&De(t)===!0||e.maxValues!==void 0&&e.modelValue.length>=e.maxValues)return;const s=e.modelValue.slice();i("add",{index:s.length,value:u}),s.push(u),i("update:modelValue",s)}function le(t,n){if(l.editable.value!==!0||t===void 0||ie.value(t)===!0)return;const u=U.value(t);if(e.multiple!==!0){n!==!0&&(Ce(e.fillInput===!0?$.value(t):"",!0,!0),ue()),_.value!==null&&_.value.focus(),(a.value.length===0||xe(U.value(a.value[0]),u)!==!0)&&i("update:modelValue",e.emitValue===!0?u:t);return}if((q!==!0||z.value===!0)&&l.focus(),Ye(),a.value.length===0){const k=e.emitValue===!0?u:t;i("add",{index:0,value:k}),i("update:modelValue",e.multiple===!0?[k]:k);return}const s=e.modelValue.slice(),p=Me.value.findIndex(k=>xe(k,u));if(p!==-1)i("remove",{index:p,value:s.splice(p,1)[0]});else{if(e.maxValues!==void 0&&s.length>=e.maxValues)return;const k=e.emitValue===!0?u:t;i("add",{index:s.length,value:k}),s.push(k)}i("update:modelValue",s)}function re(t){if(O.platform.is.desktop!==!0)return;const n=t!==-1&&t<P.value?t:-1;y.value!==n&&(y.value=n)}function _e(t=1,n){if(o.value===!0){let u=y.value;do u=ct(u+t,-1,P.value-1);while(u!==-1&&u!==y.value&&ie.value(e.options[u])===!0);y.value!==u&&(re(u),oe(u),n!==!0&&e.useInput===!0&&e.fillInput===!0&&Fe(u>=0?$.value(e.options[u]):D,!0))}}function Vt(t,n){const u=s=>xe(U.value(s),t);return e.options.find(u)||n.find(u)||t}function Te(t,n){const u=t!==void 0?t:n;return typeof u=="function"?u:s=>s!==null&&typeof s=="object"&&u in s?s[u]:s}function De(t){const n=U.value(t);return Me.value.find(u=>xe(u,n))!==void 0}function Ye(t){e.useInput===!0&&_.value!==null&&(t===void 0||_.value===t.target&&t.target.value===m.value)&&_.value.select()}function Ge(t){Jt(t,27)===!0&&o.value===!0&&(ve(t),ue(),fe()),i("keyup",t)}function Je(t){const{value:n}=t.target;if(t.keyCode!==void 0){Ge(t);return}if(t.target.value="",w!==null&&(clearTimeout(w),w=null),C!==null&&(clearTimeout(C),C=null),fe(),typeof n=="string"&&n.length!==0){const u=n.toLocaleLowerCase(),s=k=>{const L=e.options.find(I=>k.value(I).toLocaleLowerCase()===u);return L===void 0?!1:(a.value.indexOf(L)===-1?le(L):ue(),!0)},p=k=>{s(U)!==!0&&(s($)===!0||k===!0||ce(n,!0,()=>p(!0)))};p()}else l.clearValue(t)}function Ze(t){i("keypress",t)}function et(t){if(i("keydown",t),Zt(t)===!0)return;const n=h.value.length!==0&&(e.newValueMode!==void 0||e.onNewValue!==void 0),u=t.shiftKey!==!0&&e.multiple!==!0&&(y.value!==-1||n===!0);if(t.keyCode===27){$e(t);return}if(t.keyCode===9&&u===!1){se();return}if(t.target===void 0||t.target.id!==l.targetUid.value||l.editable.value!==!0)return;if(t.keyCode===40&&l.innerLoading.value!==!0&&o.value===!1){ne(t),de();return}if(t.keyCode===8&&(e.useChips===!0||e.clearable===!0)&&e.hideSelected!==!0&&h.value.length===0){e.multiple===!0&&Array.isArray(e.modelValue)===!0?He(e.modelValue.length-1):e.multiple!==!0&&e.modelValue!==null&&i("update:modelValue",null);return}(t.keyCode===35||t.keyCode===36)&&(typeof h.value!="string"||h.value.length===0)&&(ne(t),y.value=-1,_e(t.keyCode===36?1:-1,e.multiple)),(t.keyCode===33||t.keyCode===34)&&ae.value!==void 0&&(ne(t),y.value=Math.max(-1,Math.min(P.value,y.value+(t.keyCode===33?-1:1)*ae.value.view)),_e(t.keyCode===33?1:-1,e.multiple)),(t.keyCode===38||t.keyCode===40)&&(ne(t),_e(t.keyCode===38?-1:1,e.multiple));const s=P.value;if((H===void 0||M<Date.now())&&(H=""),s>0&&e.useInput!==!0&&t.key!==void 0&&t.key.length===1&&t.altKey===!1&&t.ctrlKey===!1&&t.metaKey===!1&&(t.keyCode!==32||H.length!==0)){o.value!==!0&&de(t);const p=t.key.toLocaleLowerCase(),k=H.length===1&&H[0]===p;M=Date.now()+1500,k===!1&&(ne(t),H+=p);const L=new RegExp("^"+H.split("").map(Ne=>fl.indexOf(Ne)!==-1?"\\"+Ne:Ne).join(".*"),"i");let I=y.value;if(k===!0||I<0||L.test($.value(e.options[I]))!==!0)do I=ct(I+1,-1,s-1);while(I!==y.value&&(ie.value(e.options[I])===!0||L.test($.value(e.options[I]))!==!0));y.value!==I&&G(()=>{re(I),oe(I),I>=0&&e.useInput===!0&&e.fillInput===!0&&Fe($.value(e.options[I]),!0)});return}if(!(t.keyCode!==13&&(t.keyCode!==32||e.useInput===!0||H!=="")&&(t.keyCode!==9||u===!1))){if(t.keyCode!==9&&ne(t),y.value!==-1&&y.value<s){le(e.options[y.value]);return}if(n===!0){const p=(k,L)=>{if(L){if(ft(L)!==!0)return}else L=e.newValueMode;if(Ce("",e.multiple!==!0,!0),k==null)return;(L==="toggle"?le:Xe)(k,L==="add-unique"),e.multiple!==!0&&(_.value!==null&&_.value.focus(),ue())};if(e.onNewValue!==void 0?i("newValue",h.value,p):p(h.value),e.multiple!==!0)return}o.value===!0?se():l.innerLoading.value!==!0&&de()}}function tt(){return q===!0?he.value:X.value!==null&&X.value.contentEl!==null?X.value.contentEl:void 0}function Ct(){return tt()}function xt(){return e.hideSelected===!0?[]:r["selected-item"]!==void 0?te.value.map(t=>r["selected-item"](t)).slice():r.selected!==void 0?[].concat(r.selected()):e.useChips===!0?te.value.map((t,n)=>g(il,{key:"option-"+n,removable:l.editable.value===!0&&ie.value(t.opt)!==!0,dense:!0,textColor:e.color,tabindex:Q.value,onRemove(){t.removeAtIndex(n)}},()=>g("span",{class:"ellipsis",[t.html===!0?"innerHTML":"textContent"]:$.value(t.opt)}))):[g("span",{[ze.value===!0?"innerHTML":"textContent"]:N.value})]}function lt(){if(R.value===!0)return r["no-option"]!==void 0?r["no-option"]({inputValue:h.value}):void 0;const t=r.option!==void 0?r.option:u=>g(al,{key:u.index,...u.itemProps},()=>g(ul,()=>g(nl,()=>g("span",{[u.html===!0?"innerHTML":"textContent"]:u.label}))));let n=Ee("div",Oe.value.map(t));return r["before-options"]!==void 0&&(n=r["before-options"]().concat(n)),tl(r["after-options"],n)}function kt(t,n){const u=n===!0?{...Ie.value,...l.splitAttrs.attributes.value}:void 0,s={ref:n===!0?_:void 0,key:"i_t",class:V.value,style:e.inputStyle,value:h.value!==void 0?h.value:"",type:"search",...u,id:n===!0?l.targetUid.value:void 0,maxlength:e.maxlength,autocomplete:e.autocomplete,"data-autofocus":t===!0||e.autofocus===!0||void 0,disabled:e.disable===!0,readonly:e.readonly===!0,...bt.value};return t!==!0&&q===!0&&(Array.isArray(s.class)===!0?s.class=[...s.class,"no-pointer-events"]:s.class+=" no-pointer-events"),g("input",s)}function ut(t){w!==null&&(clearTimeout(w),w=null),C!==null&&(clearTimeout(C),C=null),!(t&&t.target&&t.target.qComposing===!0)&&(Fe(t.target.value||""),T=!0,D=h.value,l.focused.value!==!0&&(q!==!0||z.value===!0)&&l.focus(),e.onFilter!==void 0&&(w=setTimeout(()=>{w=null,ce(h.value)},e.inputDebounce)))}function Fe(t,n){h.value!==t&&(h.value=t,n===!0||e.inputDebounce===0||e.inputDebounce==="0"?i("inputValue",t):C=setTimeout(()=>{C=null,i("inputValue",t)},e.inputDebounce))}function Ce(t,n,u){T=u!==!0,e.useInput===!0&&(Fe(t,!0),(n===!0||u!==!0)&&(D=t),n!==!0&&ce(t))}function ce(t,n,u){if(e.onFilter===void 0||n!==!0&&l.focused.value!==!0)return;l.innerLoading.value===!0?i("filterAbort"):(l.innerLoading.value=!0,c.value=!0),t!==""&&e.multiple!==!0&&a.value.length!==0&&T!==!0&&t===$.value(a.value[0])&&(t="");const s=setTimeout(()=>{o.value===!0&&(o.value=!1)},10);d!==null&&clearTimeout(d),d=s,i("filter",t,(p,k)=>{(n===!0||l.focused.value===!0)&&d===s&&(clearTimeout(d),typeof p=="function"&&p(),c.value=!1,G(()=>{l.innerLoading.value=!1,l.editable.value===!0&&(n===!0?o.value===!0&&ue():o.value===!0?Pe(!0):o.value=!0),typeof k=="function"&&G(()=>{k(b)}),typeof u=="function"&&G(()=>{u(b)})}))},()=>{l.focused.value===!0&&d===s&&(clearTimeout(d),l.innerLoading.value=!1,c.value=!1),o.value===!0&&(o.value=!1)})}function pt(){return g(ll,{ref:X,class:S.value,style:e.popupContentStyle,modelValue:o.value,fit:e.menuShrink!==!0,cover:e.optionsCover===!0&&R.value!==!0&&e.useInput!==!0,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,dark:A.value,noParentEvent:!0,noRefocus:!0,noFocus:!0,noRouteDismiss:e.popupNoRouteDismiss,square:Le.value,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,separateClosePopup:!0,...ee.value,onScrollPassive:ye,onBeforeShow:at,onBeforeHide:At,onShow:qt},lt)}function At(t){ot(t),se()}function qt(){be()}function zt(t){ve(t),_.value!==null&&_.value.focus(),z.value=!0,window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,0)}function It(t){ve(t),G(()=>{z.value=!1})}function Ot(){const t=[g(rl,{class:`col-auto ${l.fieldClass.value}`,...v.value,for:l.targetUid.value,dark:A.value,square:!0,loading:c.value,itemAligned:!1,filled:!0,stackLabel:h.value.length!==0,...l.splitAttrs.listeners.value,onFocus:zt,onBlur:It},{...r,rawControl:()=>l.getControl(!0),before:void 0,after:void 0})];return o.value===!0&&t.push(g("div",{ref:he,class:S.value+" scroll",style:e.popupContentStyle,...ee.value,onClick:$e,onScrollPassive:ye},lt())),g(el,{ref:J,modelValue:F.value,position:e.useInput===!0?"top":void 0,transitionShow:W,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,noRouteDismiss:e.popupNoRouteDismiss,onBeforeShow:at,onBeforeHide:Mt,onHide:_t,onShow:Ft},()=>g("div",{class:"q-select__dialog"+(A.value===!0?" q-select__dialog--dark q-dark":"")+(z.value===!0?" q-select__dialog--focused":"")},t))}function Mt(t){ot(t),J.value!==null&&J.value.__updateRefocusTarget(l.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")),l.focused.value=!1}function _t(t){ue(),l.focused.value===!1&&i("blur",t),fe()}function Ft(){const t=document.activeElement;(t===null||t.id!==l.targetUid.value)&&_.value!==null&&_.value!==t&&_.value.focus(),be()}function se(){F.value!==!0&&(y.value=-1,o.value===!0&&(o.value=!1),l.focused.value===!1&&(d!==null&&(clearTimeout(d),d=null),l.innerLoading.value===!0&&(i("filterAbort"),l.innerLoading.value=!1,c.value=!1)))}function de(t){l.editable.value===!0&&(q===!0?(l.onControlFocusin(t),F.value=!0,G(()=>{l.focus()})):l.focus(),e.onFilter!==void 0?ce(h.value):(R.value!==!0||r["no-option"]!==void 0)&&(o.value=!0))}function ue(){F.value=!1,se()}function fe(){e.useInput===!0&&Ce(e.multiple!==!0&&e.fillInput===!0&&a.value.length!==0&&$.value(a.value[0])||"",!0,!0)}function Pe(t){let n=-1;if(t===!0){if(a.value.length!==0){const u=U.value(a.value[0]);n=e.options.findIndex(s=>xe(U.value(s),u))}j(n)}re(n)}function Bt(t,n){o.value===!0&&l.innerLoading.value===!1&&(j(-1,!0),G(()=>{o.value===!0&&l.innerLoading.value===!1&&(t>n?j():Pe(!0))}))}function nt(){F.value===!1&&X.value!==null&&X.value.updatePosition()}function at(t){t!==void 0&&ve(t),i("popupShow",t),l.hasPopupOpen=!0,l.onControlFocusin(t)}function ot(t){t!==void 0&&ve(t),i("popupHide",t),l.hasPopupOpen=!1,l.onControlFocusout(t)}function it(){q=O.platform.is.mobile!==!0&&e.behavior!=="dialog"?!1:e.behavior!=="menu"&&(e.useInput===!0?r["no-option"]!==void 0||e.onFilter!==void 0||R.value===!1:!0),W=O.platform.is.ios===!0&&q===!0&&e.useInput===!0?"fade":e.transitionShow}return Xt(it),Yt(nt),it(),ht(()=>{w!==null&&clearTimeout(w),C!==null&&clearTimeout(C)}),Object.assign(b,{showPopup:de,hidePopup:ue,removeAtIndex:He,add:Xe,toggleOption:le,getOptionIndex:()=>y.value,setOptionIndex:re,moveOptionSelection:_e,filter:ce,updateMenuPosition:nt,updateInputValue:Ce,isOptionSelected:De,getEmittingOptionValue:We,isOptionDisabled:(...t)=>ie.value.apply(null,t)===!0,getOptionValue:(...t)=>U.value.apply(null,t),getOptionLabel:(...t)=>$.value.apply(null,t)}),Object.assign(l,{innerValue:a,fieldClass:f(()=>`q-select q-field--auto-height q-select--with${e.useInput!==!0?"out":""}-input q-select--with${e.useChips!==!0?"out":""}-chips q-select--${e.multiple===!0?"multiple":"single"}`),inputRef:pe,targetRef:_,hasValue:B,showPopup:de,floatingLabel:f(()=>e.hideSelected!==!0&&B.value===!0||typeof h.value=="number"||h.value.length!==0||rt(e.displayValue)),getControlChild:()=>{if(l.editable.value!==!1&&(F.value===!0||R.value!==!0||r["no-option"]!==void 0))return q===!0?Ot():pt();l.hasPopupOpen===!0&&(l.hasPopupOpen=!1)},controlEvents:{onFocusin(t){l.onControlFocusin(t)},onFocusout(t){l.onControlFocusout(t,()=>{fe(),se()})},onClick(t){if($e(t),q!==!0&&o.value===!0){se(),_.value!==null&&_.value.focus();return}de(t)}},getControl:t=>{const n=xt(),u=t===!0||F.value!==!0||q!==!0;if(e.useInput===!0)n.push(kt(t,u));else if(l.editable.value===!0){const p=u===!0?Ie.value:void 0;n.push(g("input",{ref:u===!0?_:void 0,key:"d_t",class:"q-select__focus-target",id:u===!0?l.targetUid.value:void 0,value:N.value,readonly:!0,"data-autofocus":t===!0||e.autofocus===!0||void 0,...p,onKeydown:et,onKeyup:Ge,onKeypress:Ze})),u===!0&&typeof e.autocomplete=="string"&&e.autocomplete.length!==0&&n.push(g("input",{class:"q-select__autocomplete-input",autocomplete:e.autocomplete,tabindex:-1,onKeyup:Je}))}if(Z.value!==void 0&&e.disable!==!0&&Me.value.length!==0){const p=Me.value.map(k=>g("option",{value:k,selected:!0}));n.push(g("select",{class:"hidden",name:Z.value,multiple:e.multiple},p))}const s=e.useInput===!0||u!==!0?void 0:l.splitAttrs.attributes.value;return g("div",{class:"q-field__native row items-center",...s,...l.splitAttrs.listeners.value},n)},getInnerAppend:()=>e.loading!==!0&&c.value!==!0&&e.hideDropdownIcon!==!0?[g(Be,{class:"q-select__dropdown-icon"+(o.value===!0?" rotate-180":""),name:we.value})]:null}),mt(l)}});export{gl as Q,il as a,dl as b,hl as c,dt as u};