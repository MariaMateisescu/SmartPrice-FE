import{ap as a,bB as s,a3 as o,bL as i,bO as r}from"./index.d0d3c498.js";import{u,a as b,b as v}from"./use-checkbox.9d7dc990.js";const h=a("div",{key:"svg",class:"q-checkbox__bg absolute"},[a("svg",{class:"q-checkbox__svg fit absolute-full",viewBox:"0 0 24 24"},[a("path",{class:"q-checkbox__truthy",fill:"none",d:"M1.73,12.91 8.1,19.28 22.79,4.59"}),a("path",{class:"q-checkbox__indet",d:"M4,14H20V10H4"})])]);var x=s({name:"QCheckbox",props:u,emits:b,setup(e){function n(l,c){const t=o(()=>(l.value===!0?e.checkedIcon:c.value===!0?e.indeterminateIcon:e.uncheckedIcon)||null);return()=>t.value!==null?[a("div",{key:"icon",class:"q-checkbox__icon-container absolute-full flex flex-center no-wrap"},[a(i,{class:"q-checkbox__icon",name:t.value})])]:[h]}return v("checkbox",n)}}),_=s({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:n}){const l=o(()=>parseInt(e.lines,10)),c=o(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(l.value===1?" ellipsis":"")),t=o(()=>e.lines!==void 0&&l.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":l.value}:null);return()=>a("div",{style:t.value,class:c.value},r(n.default))}});export{_ as Q,x as a};