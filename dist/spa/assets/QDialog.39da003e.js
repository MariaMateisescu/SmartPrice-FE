import{ap as d,bB as $,aC as A,cj as R,ck as ie,y as E,a3 as v,b8 as O,bi as j,bN as ae,am as le,b_ as se}from"./index.53af7074.js";import{c as ue,b as re}from"./use-timeout.9d8f708d.js";import{u as ce,a as de,b as fe,c as me,e as ve,d as ge,h as he,r as K,g as L,f as ye,j as be}from"./ClosePopup.40c42b20.js";const xe=d("div",{class:"q-space"});var Ee=$({name:"QSpace",setup(){return()=>xe}});function qe(e,n,a){let i;function r(){i!==void 0&&(R.remove(i),i=void 0)}return A(()=>{e.value===!0&&r()}),{removeFromHistory:r,addToHistory(){i={condition:()=>a.value===!0,handler:n},R.add(i)}}}function ke(){let e;return{preventBodyScroll(n){n!==e&&(e!==void 0||n===!0)&&(e=n,ie(n))}}}let b=0;const Be={standard:"fixed-full flex-center",top:"fixed-top justify-center",bottom:"fixed-bottom justify-center",right:"fixed-right items-center",left:"fixed-left items-center"},Q={standard:["scale","scale"],top:["slide-down","slide-up"],bottom:["slide-up","slide-down"],right:["slide-left","slide-right"],left:["slide-right","slide-left"]};var _e=$({name:"QDialog",inheritAttrs:!1,props:{...ce,...de,transitionShow:String,transitionHide:String,persistent:Boolean,autoClose:Boolean,allowFocusOutside:Boolean,noEscDismiss:Boolean,noBackdropDismiss:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,noShake:Boolean,seamless:Boolean,maximized:Boolean,fullWidth:Boolean,fullHeight:Boolean,square:Boolean,position:{type:String,default:"standard",validator:e=>e==="standard"||["top","bottom","left","right"].includes(e)}},emits:[...fe,"shake","click","escapeKey"],setup(e,{slots:n,emit:a,attrs:i}){const r=le(),l=E(null),c=E(!1),f=E(!1);let s=null,u=null,g,x;const _=v(()=>e.persistent!==!0&&e.noRouteDismiss!==!0&&e.seamless!==!0),{preventBodyScroll:C}=ke(),{registerTimeout:H}=ue(),{registerTick:I,removeTick:F}=re(),{transitionProps:V,transitionStyle:z}=me(e,()=>Q[e.position][0],()=>Q[e.position][1]),{showPortal:D,hidePortal:p,portalIsAccessible:W,renderPortal:N}=ve(r,l,ne,"dialog"),{hide:h}=ge({showing:c,hideOnRouteChange:_,handleShow:Z,handleHide:ee,processOnMount:!0}),{addToHistory:U,removeFromHistory:G}=qe(c,h,_),J=v(()=>`q-dialog__inner flex no-pointer-events q-dialog__inner--${e.maximized===!0?"maximized":"minimized"} q-dialog__inner--${e.position} ${Be[e.position]}`+(f.value===!0?" q-dialog__inner--animating":"")+(e.fullWidth===!0?" q-dialog__inner--fullwidth":"")+(e.fullHeight===!0?" q-dialog__inner--fullheight":"")+(e.square===!0?" q-dialog__inner--square":"")),y=v(()=>c.value===!0&&e.seamless!==!0),X=v(()=>e.autoClose===!0?{onClick:te}:{}),Y=v(()=>[`q-dialog fullscreen no-pointer-events q-dialog--${y.value===!0?"modal":"seamless"}`,i.class]);O(()=>e.maximized,t=>{c.value===!0&&B(t)}),O(y,t=>{C(t),t===!0?(ye(S),be(k)):(K(S),L(k))});function Z(t){U(),u=e.noRefocus===!1&&document.activeElement!==null?document.activeElement:null,B(e.maximized),D(),f.value=!0,e.noFocus!==!0?(document.activeElement!==null&&document.activeElement.blur(),I(m)):F(),H(()=>{if(r.proxy.$q.platform.is.ios===!0){if(e.seamless!==!0&&document.activeElement){const{top:o,bottom:w}=document.activeElement.getBoundingClientRect(),{innerHeight:P}=window,T=window.visualViewport!==void 0?window.visualViewport.height:P;o>0&&w>T/2&&(document.scrollingElement.scrollTop=Math.min(document.scrollingElement.scrollHeight-T,w>=P?1/0:Math.ceil(document.scrollingElement.scrollTop+w-T/2))),document.activeElement.scrollIntoView()}x=!0,l.value.click(),x=!1}D(!0),f.value=!1,a("show",t)},e.transitionDuration)}function ee(t){F(),G(),M(!0),f.value=!0,p(),u!==null&&(((t&&t.type.indexOf("key")===0?u.closest('[tabindex]:not([tabindex^="-"])'):void 0)||u).focus(),u=null),H(()=>{p(!0),f.value=!1,a("hide",t)},e.transitionDuration)}function m(t){he(()=>{let o=l.value;o===null||o.contains(document.activeElement)===!0||(o=(t!==""?o.querySelector(t):null)||o.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||o.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||o.querySelector("[autofocus], [data-autofocus]")||o,o.focus({preventScroll:!0}))})}function q(t){t&&typeof t.focus=="function"?t.focus({preventScroll:!0}):m(),a("shake");const o=l.value;o!==null&&(o.classList.remove("q-animate--scale"),o.classList.add("q-animate--scale"),s!==null&&clearTimeout(s),s=setTimeout(()=>{s=null,l.value!==null&&(o.classList.remove("q-animate--scale"),m())},170))}function k(){e.seamless!==!0&&(e.persistent===!0||e.noEscDismiss===!0?e.maximized!==!0&&e.noShake!==!0&&q():(a("escapeKey"),h()))}function M(t){s!==null&&(clearTimeout(s),s=null),(t===!0||c.value===!0)&&(B(!1),e.seamless!==!0&&(C(!1),K(S),L(k))),t!==!0&&(u=null)}function B(t){t===!0?g!==!0&&(b<1&&document.body.classList.add("q-body--dialog"),b++,g=!0):g===!0&&(b<2&&document.body.classList.remove("q-body--dialog"),b--,g=!1)}function te(t){x!==!0&&(h(t),a("click",t))}function oe(t){e.persistent!==!0&&e.noBackdropDismiss!==!0?h(t):e.noShake!==!0&&q()}function S(t){e.allowFocusOutside!==!0&&W.value===!0&&se(l.value,t.target)!==!0&&m('[tabindex]:not([tabindex="-1"])')}Object.assign(r.proxy,{focus:m,shake:q,__updateRefocusTarget(t){u=t||null}}),A(M);function ne(){return d("div",{role:"dialog","aria-modal":y.value===!0?"true":"false",...i,class:Y.value},[d(j,{name:"q-transition--fade",appear:!0},()=>y.value===!0?d("div",{class:"q-dialog__backdrop fixed-full",style:z.value,"aria-hidden":"true",tabindex:-1,onClick:oe}):null),d(j,V.value,()=>c.value===!0?d("div",{ref:l,class:J.value,style:z.value,tabindex:-1,...X.value},ae(n.default)):null)])}return N}});export{Ee as Q,_e as a,ke as b,qe as u};
