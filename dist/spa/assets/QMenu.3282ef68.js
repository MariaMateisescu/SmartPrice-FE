import{y as T,bR as xe,bT as j,az as be,bU as Q,b8 as y,aG as ye,aC as P,am as J,bV as pe,bW as W,bX as Te,bQ as we,bB as Ce,a3 as b,bY as ke,bZ as Ee,ap as V,bN as Se,bi as He,b_ as Me,bS as We}from"./index.ee36a090.js";import{c as qe}from"./selection.29c34721.js";import{p as N,u as Pe,a as Be,b as Le,c as Oe,d as ze,e as Ae,f as Fe,r as Re,g as I,h as $e,i as De,j as Ke}from"./ClosePopup.a207a740.js";import{u as je,a as Qe,b as Ve,c as Ne}from"./use-timeout.73148d2e.js";const Ie={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function Xe({showing:e,avoidEmit:n,configureAnchorEl:i}){const{props:t,proxy:l,emit:c}=J(),o=T(null);let d=null;function f(a){return o.value===null?!1:a===void 0||a.touches===void 0||a.touches.length<=1}const r={};i===void 0&&(Object.assign(r,{hide(a){l.hide(a)},toggle(a){l.toggle(a),a.qAnchorHandled=!0},toggleKey(a){xe(a,13)===!0&&r.toggle(a)},contextClick(a){l.hide(a),j(a),be(()=>{l.show(a),a.qAnchorHandled=!0})},prevent:j,mobileTouch(a){if(r.mobileCleanup(a),f(a)!==!0)return;l.hide(a),o.value.classList.add("non-selectable");const h=a.target;Q(r,"anchor",[[h,"touchmove","mobileCleanup","passive"],[h,"touchend","mobileCleanup","passive"],[h,"touchcancel","mobileCleanup","passive"],[o.value,"contextmenu","prevent","notPassive"]]),d=setTimeout(()=>{d=null,l.show(a),a.qAnchorHandled=!0},300)},mobileCleanup(a){o.value.classList.remove("non-selectable"),d!==null&&(clearTimeout(d),d=null),e.value===!0&&a!==void 0&&qe()}}),i=function(a=t.contextMenu){if(t.noParentEvent===!0||o.value===null)return;let h;a===!0?l.$q.platform.is.mobile===!0?h=[[o.value,"touchstart","mobileTouch","passive"]]:h=[[o.value,"mousedown","hide","passive"],[o.value,"contextmenu","contextClick","notPassive"]]:h=[[o.value,"click","toggle","passive"],[o.value,"keyup","toggleKey","passive"]],Q(r,"anchor",h)});function s(){pe(r,"anchor")}function m(a){for(o.value=a;o.value.classList.contains("q-anchor--skip");)o.value=o.value.parentNode;i()}function v(){if(t.target===!1||t.target===""||l.$el.parentNode===null)o.value=null;else if(t.target===!0)m(l.$el.parentNode);else{let a=t.target;if(typeof t.target=="string")try{a=document.querySelector(t.target)}catch{a=void 0}a!=null?(o.value=a.$el||a,i()):(o.value=null,console.error(`Anchor: target "${t.target}" not found`))}}return y(()=>t.contextMenu,a=>{o.value!==null&&(s(),i(a))}),y(()=>t.target,()=>{o.value!==null&&s(),v()}),y(()=>t.noParentEvent,a=>{o.value!==null&&(a===!0?s():i())}),ye(()=>{v(),n!==!0&&t.modelValue===!0&&o.value===null&&c("update:modelValue",!1)}),P(()=>{d!==null&&clearTimeout(d),s()}),{anchorEl:o,canShow:f,anchorEvents:r}}function Ye(e,n){const i=T(null);let t;function l(d,f){const r=`${f!==void 0?"add":"remove"}EventListener`,s=f!==void 0?f:t;d!==window&&d[r]("scroll",s,W.passive),window[r]("scroll",s,W.passive),t=f}function c(){i.value!==null&&(l(i.value),i.value=null)}const o=y(()=>e.noParentEvent,()=>{i.value!==null&&(c(),n())});return P(o),{localScrollTarget:i,unconfigureScrollTarget:c,changeScrollEvent:l}}const{notPassiveCapture:w}=W,g=[];function C(e){const n=e.target;if(n===void 0||n.nodeType===8||n.classList.contains("no-pointer-events")===!0)return;let i=N.length-1;for(;i>=0;){const t=N[i].$;if(t.type.name!=="QDialog")break;if(t.props.seamless!==!0)return;i--}for(let t=g.length-1;t>=0;t--){const l=g[t];if((l.anchorEl.value===null||l.anchorEl.value.contains(n)===!1)&&(n===document.body||l.innerRef.value!==null&&l.innerRef.value.contains(n)===!1))e.qClickOutside=!0,l.onClickOutside(e);else return}}function _e(e){g.push(e),g.length===1&&(document.addEventListener("mousedown",C,w),document.addEventListener("touchstart",C,w))}function X(e){const n=g.findIndex(i=>i===e);n>-1&&(g.splice(n,1),g.length===0&&(document.removeEventListener("mousedown",C,w),document.removeEventListener("touchstart",C,w)))}let Y,_;function U(e){const n=e.split(" ");return n.length!==2?!1:["top","center","bottom"].includes(n[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(n[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function Ue(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const q={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{q[`${e}#ltr`]=e,q[`${e}#rtl`]=e});function G(e,n){const i=e.split(" ");return{vertical:i[0],horizontal:q[`${i[1]}#${n===!0?"rtl":"ltr"}`]}}function Ge(e,n){let{top:i,left:t,right:l,bottom:c,width:o,height:d}=e.getBoundingClientRect();return n!==void 0&&(i-=n[1],t-=n[0],c+=n[1],l+=n[0],o+=n[0],d+=n[1]),{top:i,bottom:c,height:d,left:t,right:l,width:o,middle:t+(l-t)/2,center:i+(c-i)/2}}function Ze(e,n,i){let{top:t,left:l}=e.getBoundingClientRect();return t+=n.top,l+=n.left,i!==void 0&&(t+=i[1],l+=i[0]),{top:t,bottom:t+1,height:1,left:l,right:l+1,width:1,middle:l,center:t}}function Je(e){return{top:0,center:e.offsetHeight/2,bottom:e.offsetHeight,left:0,middle:e.offsetWidth/2,right:e.offsetWidth}}function Z(e,n,i){return{top:e[i.anchorOrigin.vertical]-n[i.selfOrigin.vertical],left:e[i.anchorOrigin.horizontal]-n[i.selfOrigin.horizontal]}}function et(e){if(Te.is.ios===!0&&window.visualViewport!==void 0){const d=document.body.style,{offsetLeft:f,offsetTop:r}=window.visualViewport;f!==Y&&(d.setProperty("--q-pe-left",f+"px"),Y=f),r!==_&&(d.setProperty("--q-pe-top",r+"px"),_=r)}const{scrollLeft:n,scrollTop:i}=e.el,t=e.absoluteOffset===void 0?Ge(e.anchorEl,e.cover===!0?[0,0]:e.offset):Ze(e.anchorEl,e.absoluteOffset,e.offset);let l={maxHeight:e.maxHeight,maxWidth:e.maxWidth,visibility:"visible"};(e.fit===!0||e.cover===!0)&&(l.minWidth=t.width+"px",e.cover===!0&&(l.minHeight=t.height+"px")),Object.assign(e.el.style,l);const c=Je(e.el);let o=Z(t,c,e);if(e.absoluteOffset===void 0||e.offset===void 0)M(o,t,c,e.anchorOrigin,e.selfOrigin);else{const{top:d,left:f}=o;M(o,t,c,e.anchorOrigin,e.selfOrigin);let r=!1;if(o.top!==d){r=!0;const s=2*e.offset[1];t.center=t.top-=s,t.bottom-=s+2}if(o.left!==f){r=!0;const s=2*e.offset[0];t.middle=t.left-=s,t.right-=s+2}r===!0&&(o=Z(t,c,e),M(o,t,c,e.anchorOrigin,e.selfOrigin))}l={top:o.top+"px",left:o.left+"px"},o.maxHeight!==void 0&&(l.maxHeight=o.maxHeight+"px",t.height>o.maxHeight&&(l.minHeight=l.maxHeight)),o.maxWidth!==void 0&&(l.maxWidth=o.maxWidth+"px",t.width>o.maxWidth&&(l.minWidth=l.maxWidth)),Object.assign(e.el.style,l),e.el.scrollTop!==i&&(e.el.scrollTop=i),e.el.scrollLeft!==n&&(e.el.scrollLeft=n)}function M(e,n,i,t,l){const c=i.bottom,o=i.right,d=we(),f=window.innerHeight-d,r=document.body.clientWidth;if(e.top<0||e.top+c>f)if(l.vertical==="center")e.top=n[t.vertical]>f/2?Math.max(0,f-c):0,e.maxHeight=Math.min(c,f);else if(n[t.vertical]>f/2){const s=Math.min(f,t.vertical==="center"?n.center:t.vertical===l.vertical?n.bottom:n.top);e.maxHeight=Math.min(c,s),e.top=Math.max(0,s-c)}else e.top=Math.max(0,t.vertical==="center"?n.center:t.vertical===l.vertical?n.top:n.bottom),e.maxHeight=Math.min(c,f-e.top);if(e.left<0||e.left+o>r)if(e.maxWidth=Math.min(o,r),l.horizontal==="middle")e.left=n[t.horizontal]>r/2?Math.max(0,r-o):0;else if(n[t.horizontal]>r/2){const s=Math.min(r,t.horizontal==="middle"?n.middle:t.horizontal===l.horizontal?n.right:n.left);e.maxWidth=Math.min(o,s),e.left=Math.max(0,s-e.maxWidth)}else e.left=Math.max(0,t.horizontal==="middle"?n.middle:t.horizontal===l.horizontal?n.left:n.right),e.maxWidth=Math.min(o,r-e.left)}var it=Ce({name:"QMenu",inheritAttrs:!1,props:{...Ie,...Pe,...je,...Be,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:U},self:{type:String,validator:U},offset:{type:Array,validator:Ue},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...Le,"click","escapeKey"],setup(e,{slots:n,emit:i,attrs:t}){let l=null,c,o,d;const f=J(),{proxy:r}=f,{$q:s}=r,m=T(null),v=T(!1),a=b(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),h=Qe(e,s),{registerTick:ee,removeTick:te}=Ve(),{registerTimeout:B}=Ne(),{transitionProps:ne,transitionStyle:oe}=Oe(e),{localScrollTarget:L,changeScrollEvent:le,unconfigureScrollTarget:ie}=Ye(e,D),{anchorEl:x,canShow:ae}=Xe({showing:v}),{hide:O}=ze({showing:v,canShow:ae,handleShow:de,handleHide:fe,hideOnRouteChange:a,processOnMount:!0}),{showPortal:z,hidePortal:A,renderPortal:ue}=Ae(f,m,me,"menu"),k={anchorEl:x,innerRef:m,onClickOutside(u){if(e.persistent!==!0&&v.value===!0)return O(u),(u.type==="touchstart"||u.target.classList.contains("q-dialog__backdrop"))&&We(u),!0}},F=b(()=>G(e.anchor||(e.cover===!0?"center middle":"bottom start"),s.lang.rtl)),re=b(()=>e.cover===!0?F.value:G(e.self||"top start",s.lang.rtl)),se=b(()=>(e.square===!0?" q-menu--square":"")+(h.value===!0?" q-menu--dark q-dark":"")),ce=b(()=>e.autoClose===!0?{onClick:he}:{}),R=b(()=>v.value===!0&&e.persistent!==!0);y(R,u=>{u===!0?(Ke(S),_e(k)):(I(S),X(k))});function E(){$e(()=>{let u=m.value;u&&u.contains(document.activeElement)!==!0&&(u=u.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||u.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||u.querySelector("[autofocus], [data-autofocus]")||u,u.focus({preventScroll:!0}))})}function de(u){if(l=e.noRefocus===!1?document.activeElement:null,Fe(K),z(),D(),c=void 0,u!==void 0&&(e.touchPosition||e.contextMenu)){const H=ke(u);if(H.left!==void 0){const{top:ve,left:ge}=x.value.getBoundingClientRect();c={left:H.left-ge,top:H.top-ve}}}o===void 0&&(o=y(()=>s.screen.width+"|"+s.screen.height+"|"+e.self+"|"+e.anchor+"|"+s.lang.rtl,p)),e.noFocus!==!0&&document.activeElement.blur(),ee(()=>{p(),e.noFocus!==!0&&E()}),B(()=>{s.platform.is.ios===!0&&(d=e.autoClose,m.value.click()),p(),z(!0),i("show",u)},e.transitionDuration)}function fe(u){te(),A(),$(!0),l!==null&&(u===void 0||u.qClickOutside!==!0)&&(((u&&u.type.indexOf("key")===0?l.closest('[tabindex]:not([tabindex^="-"])'):void 0)||l).focus(),l=null),B(()=>{A(!0),i("hide",u)},e.transitionDuration)}function $(u){c=void 0,o!==void 0&&(o(),o=void 0),(u===!0||v.value===!0)&&(Re(K),ie(),X(k),I(S)),u!==!0&&(l=null)}function D(){(x.value!==null||e.scrollTarget!==void 0)&&(L.value=Ee(x.value,e.scrollTarget),le(L.value,p))}function he(u){d!==!0?(De(r,u),i("click",u)):d=!1}function K(u){R.value===!0&&e.noFocus!==!0&&Me(m.value,u.target)!==!0&&E()}function S(u){i("escapeKey"),O(u)}function p(){const u=m.value;u===null||x.value===null||et({el:u,offset:e.offset,anchorEl:x.value,anchorOrigin:F.value,selfOrigin:re.value,absoluteOffset:c,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function me(){return V(He,ne.value,()=>v.value===!0?V("div",{role:"menu",...t,ref:m,tabindex:-1,class:["q-menu q-position-engine scroll"+se.value,t.class],style:[t.style,oe.value],...ce.value},Se(n.default)):null)}return P($),Object.assign(r,{focus:E,updatePosition:p}),ue}});export{it as Q,Xe as a,Ie as u};
