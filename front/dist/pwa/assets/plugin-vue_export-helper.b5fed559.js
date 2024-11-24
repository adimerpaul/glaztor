import{h as E,c as P,r as q,ap as A,aN as I,aO as Q,H as _,d as B,g as O,ax as R,y as C,I as V,aj as j,aX as k}from"./index.18990dfe.js";const D=E("div",{class:"q-space"});var K=P({name:"QSpace",setup(){return()=>D}}),M=P({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(n,{slots:d,emit:i}){const v=O(),r=q(null);let c=0;const u=[];function m(e){const s=typeof e=="boolean"?e:n.noErrorFocus!==!0,f=++c,g=(t,o)=>{i(`validation${t===!0?"Success":"Error"}`,o)},h=t=>{const o=t.validate();return typeof o.then=="function"?o.then(a=>({valid:a,comp:t}),a=>({valid:!1,comp:t,err:a})):Promise.resolve({valid:o,comp:t})};return(n.greedy===!0?Promise.all(u.map(h)).then(t=>t.filter(o=>o.valid!==!0)):u.reduce((t,o)=>t.then(()=>h(o).then(a=>{if(a.valid===!1)return Promise.reject(a)})),Promise.resolve()).catch(t=>[t])).then(t=>{if(t===void 0||t.length===0)return f===c&&g(!0),!0;if(f===c){const{comp:o,err:a}=t[0];if(a!==void 0&&console.error(a),g(!1,o),s===!0){const S=t.find(({comp:F})=>typeof F.focus=="function"&&R(F.$)===!1);S!==void 0&&S.comp.focus()}}return!1})}function p(){c++,u.forEach(e=>{typeof e.resetValidation=="function"&&e.resetValidation()})}function y(e){e!==void 0&&C(e);const s=c+1;m().then(f=>{s===c&&f===!0&&(n.onSubmit!==void 0?i("submit",e):e!==void 0&&e.target!==void 0&&typeof e.target.submit=="function"&&e.target.submit())})}function b(e){e!==void 0&&C(e),i("reset"),V(()=>{p(),n.autofocus===!0&&n.noResetFocus!==!0&&l()})}function l(){j(()=>{if(r.value===null)return;const e=r.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||r.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||r.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(r.value.querySelectorAll("[tabindex]"),s=>s.tabIndex!==-1);e!=null&&e.focus({preventScroll:!0})})}A(k,{bindComponent(e){u.push(e)},unbindComponent(e){const s=u.indexOf(e);s!==-1&&u.splice(s,1)}});let x=!1;return I(()=>{x=!0}),Q(()=>{x===!0&&n.autofocus===!0&&l()}),_(()=>{n.autofocus===!0&&l()}),Object.assign(v.proxy,{validate:m,resetValidation:p,submit:y,reset:b,focus:l,getValidationComponents:()=>u}),()=>E("form",{class:"q-form",ref:r,onSubmit:y,onReset:b},B(d.default))}}),N=(n,d)=>{const i=n.__vccOpts||n;for(const[v,r]of d)i[v]=r;return i};export{K as Q,N as _,M as a};
