import{a3 as c,aE as o,aC as i,az as l,c9 as r,am as u}from"./index.53af7074.js";const f={dark:{type:Boolean,default:null}};function k(e,a){return c(()=>e.dark===null?a.dark.isActive:e.dark)}function d(){let e;const a=u();function t(){e=void 0}return o(t),i(t),{removeTick:t,registerTick(n){e=n,l(()=>{e===n&&(r(a)===!1&&e(),e=void 0)})}}}function v(){let e=null;const a=u();function t(){e!==null&&(clearTimeout(e),e=null)}return o(t),i(t),{removeTimeout:t,registerTimeout(n,s){t(),r(a)===!1&&(e=setTimeout(n,s))}}}export{k as a,d as b,v as c,f as u};
