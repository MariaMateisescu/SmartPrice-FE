import{E as mt,Q as gt}from"./EmptyData.648f655c.js";import{bB as fe,y as x,a3 as c,cp as bt,b8 as k,aE as pt,aA as yt,aC as pe,ap as p,bH as We,bf as $,am as De,cw as Ne,cx as ze,at as St,bE as xe,bF as _t,aG as wt,az as Ee,ci as Ae,bN as Ge,bi as Lt,z as qt,bC as Ke,by as zt,bK as U,bS as xt,_ as Be,o as w,c as B,ac as u,bd as f,a as P,ab as re,T as J,aR as ue,a4 as A,N as oe,a5 as N,bM as R,aO as Ye,aM as Xe,c0 as Je,bI as kt,ce as Ct,bJ as It,aS as be}from"./index.34950785.js";import{Q as he}from"./QSeparator.309c43aa.js";import{u as Ve,a as Oe,c as Pt}from"./use-timeout.46593e9e.js";import{Q as Ue}from"./QResizeObserver.57478060.js";import{Q as Tt}from"./QScrollObserver.657a8983.js";import{T as ce}from"./TouchPan.ae1ee8da.js";import{b as Z}from"./format.2a3572e1.js";import{u as Dt,b as Bt,a as Ce,Q as Vt}from"./QDialog.fe157533.js";import{u as Ze,b as et,d as tt,C as Ie}from"./ClosePopup.b7f1f5d3.js";import{Q as de,a as Pe}from"./QCard.d2345bc1.js";import{Q as at}from"./QInput.8e10a7f4.js";import{Q as ve,a as j}from"./QItemSection.244aabe5.js";import{Q as Te,a as it}from"./QItemLabel.4f9a3335.js";import{Q as Ot}from"./QSelect.cf164507.js";import{E as Qt}from"./EmptyState.29065e97.js";import{u as Me}from"./uid.42677368.js";import{Q as Nt}from"./QSlideItem.3ba6d52b.js";import{Q as He}from"./QCardActions.ebb8c3b9.js";import{Q as Et}from"./QList.32a19b7c.js";import"./selection.4b1bcd79.js";import"./use-checkbox.79f9d797.js";import"./QChip.db0f8760.js";import"./QMenu.45c423ea.js";import"./rtl.b51694b1.js";import"./use-cache.b0833c75.js";const Fe=["vertical","horizontal"],ke={vertical:{offset:"offsetY",scroll:"scrollTop",dir:"down",dist:"y"},horizontal:{offset:"offsetX",scroll:"scrollLeft",dir:"right",dist:"x"}},Re={prevent:!0,mouse:!0,mouseAllDir:!0},je=e=>e>=250?50:Math.ceil(e/5);var At=fe({name:"QScrollArea",props:{...Ve,thumbStyle:Object,verticalThumbStyle:Object,horizontalThumbStyle:Object,barStyle:[Array,String,Object],verticalBarStyle:[Array,String,Object],horizontalBarStyle:[Array,String,Object],contentStyle:[Array,String,Object],contentActiveStyle:[Array,String,Object],delay:{type:[String,Number],default:1e3},visible:{type:Boolean,default:null},tabindex:[String,Number],onScroll:Function},setup(e,{slots:s,emit:b}){const S=x(!1),i=x(!1),d=x(!1),r={vertical:x(0),horizontal:x(0)},a={vertical:{ref:x(null),position:x(0),size:x(0)},horizontal:{ref:x(null),position:x(0),size:x(0)}},{proxy:L}=De(),O=Oe(e,L.$q);let t=null,q;const _=x(null),E=c(()=>"q-scrollarea"+(O.value===!0?" q-scrollarea--dark":""));a.vertical.percentage=c(()=>{const n=a.vertical.size.value-r.vertical.value;if(n<=0)return 0;const o=Z(a.vertical.position.value/n,0,1);return Math.round(o*1e4)/1e4}),a.vertical.thumbHidden=c(()=>(e.visible===null?d.value:e.visible)!==!0&&S.value===!1&&i.value===!1||a.vertical.size.value<=r.vertical.value+1),a.vertical.thumbStart=c(()=>a.vertical.percentage.value*(r.vertical.value-a.vertical.thumbSize.value)),a.vertical.thumbSize=c(()=>Math.round(Z(r.vertical.value*r.vertical.value/a.vertical.size.value,je(r.vertical.value),r.vertical.value))),a.vertical.style=c(()=>({...e.thumbStyle,...e.verticalThumbStyle,top:`${a.vertical.thumbStart.value}px`,height:`${a.vertical.thumbSize.value}px`})),a.vertical.thumbClass=c(()=>"q-scrollarea__thumb q-scrollarea__thumb--v absolute-right"+(a.vertical.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),a.vertical.barClass=c(()=>"q-scrollarea__bar q-scrollarea__bar--v absolute-right"+(a.vertical.thumbHidden.value===!0?" q-scrollarea__bar--invisible":"")),a.horizontal.percentage=c(()=>{const n=a.horizontal.size.value-r.horizontal.value;if(n<=0)return 0;const o=Z(Math.abs(a.horizontal.position.value)/n,0,1);return Math.round(o*1e4)/1e4}),a.horizontal.thumbHidden=c(()=>(e.visible===null?d.value:e.visible)!==!0&&S.value===!1&&i.value===!1||a.horizontal.size.value<=r.horizontal.value+1),a.horizontal.thumbStart=c(()=>a.horizontal.percentage.value*(r.horizontal.value-a.horizontal.thumbSize.value)),a.horizontal.thumbSize=c(()=>Math.round(Z(r.horizontal.value*r.horizontal.value/a.horizontal.size.value,je(r.horizontal.value),r.horizontal.value))),a.horizontal.style=c(()=>({...e.thumbStyle,...e.horizontalThumbStyle,[L.$q.lang.rtl===!0?"right":"left"]:`${a.horizontal.thumbStart.value}px`,width:`${a.horizontal.thumbSize.value}px`})),a.horizontal.thumbClass=c(()=>"q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom"+(a.horizontal.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),a.horizontal.barClass=c(()=>"q-scrollarea__bar q-scrollarea__bar--h absolute-bottom"+(a.horizontal.thumbHidden.value===!0?" q-scrollarea__bar--invisible":""));const z=c(()=>a.vertical.thumbHidden.value===!0&&a.horizontal.thumbHidden.value===!0?e.contentStyle:e.contentActiveStyle),v=[[ce,n=>{se(n,"vertical")},void 0,{vertical:!0,...Re}]],y=[[ce,n=>{se(n,"horizontal")},void 0,{horizontal:!0,...Re}]];function m(){const n={};return Fe.forEach(o=>{const h=a[o];n[o+"Position"]=h.position.value,n[o+"Percentage"]=h.percentage.value,n[o+"Size"]=h.size.value,n[o+"ContainerSize"]=r[o].value}),n}const I=bt(()=>{const n=m();n.ref=L,b("scroll",n)},0);function ee(n,o,h){if(Fe.includes(n)===!1){console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");return}(n==="vertical"?Ne:ze)(_.value,o,h)}function ne({height:n,width:o}){let h=!1;r.vertical.value!==n&&(r.vertical.value=n,h=!0),r.horizontal.value!==o&&(r.horizontal.value=o,h=!0),h===!0&&T()}function W({position:n}){let o=!1;a.vertical.position.value!==n.top&&(a.vertical.position.value=n.top,o=!0),a.horizontal.position.value!==n.left&&(a.horizontal.position.value=n.left,o=!0),o===!0&&T()}function H({height:n,width:o}){a.horizontal.size.value!==o&&(a.horizontal.size.value=o,T()),a.vertical.size.value!==n&&(a.vertical.size.value=n,T())}function se(n,o){const h=a[o];if(n.isFirst===!0){if(h.thumbHidden.value===!0)return;q=h.position.value,i.value=!0}else if(i.value!==!0)return;n.isFinal===!0&&(i.value=!1);const C=ke[o],K=r[o].value,ye=(h.size.value-K)/(K-h.thumbSize.value),Se=n.distance[C.dist],me=q+(n.direction===C.dir?1:-1)*Se*ye;ae(me,o)}function te(n,o){const h=a[o];if(h.thumbHidden.value!==!0){const C=n[ke[o].offset];if(C<h.thumbStart.value||C>h.thumbStart.value+h.thumbSize.value){const K=C-h.thumbSize.value/2;ae(K/r[o].value*h.size.value,o)}h.ref.value!==null&&h.ref.value.dispatchEvent(new MouseEvent(n.type,n))}}function G(n){te(n,"vertical")}function V(n){te(n,"horizontal")}function T(){S.value=!0,t!==null&&clearTimeout(t),t=setTimeout(()=>{t=null,S.value=!1},e.delay),e.onScroll!==void 0&&I()}function ae(n,o){_.value[ke[o].scroll]=n}function M(){d.value=!0}function ie(){d.value=!1}let F=null;return k(()=>L.$q.lang.rtl,n=>{_.value!==null&&ze(_.value,Math.abs(a.horizontal.position.value)*(n===!0?-1:1))}),pt(()=>{F={top:a.vertical.position.value,left:a.horizontal.position.value}}),yt(()=>{if(F===null)return;const n=_.value;n!==null&&(ze(n,F.left),Ne(n,F.top))}),pe(I.cancel),Object.assign(L,{getScrollTarget:()=>_.value,getScroll:m,getScrollPosition:()=>({top:a.vertical.position.value,left:a.horizontal.position.value}),getScrollPercentage:()=>({top:a.vertical.percentage.value,left:a.horizontal.percentage.value}),setScrollPosition:ee,setScrollPercentage(n,o,h){ee(n,o*(a[n].size.value-r[n].value)*(n==="horizontal"&&L.$q.lang.rtl===!0?-1:1),h)}}),()=>p("div",{class:E.value,onMouseenter:M,onMouseleave:ie},[p("div",{ref:_,class:"q-scrollarea__container scroll relative-position fit hide-scrollbar",tabindex:e.tabindex!==void 0?e.tabindex:void 0},[p("div",{class:"q-scrollarea__content absolute",style:z.value},We(s.default,[p(Ue,{debounce:0,onResize:H})])),p(Tt,{axis:"both",onScroll:W})]),p(Ue,{debounce:0,onResize:ne}),p("div",{class:a.vertical.barClass.value,style:[e.barStyle,e.verticalBarStyle],"aria-hidden":"true",onMousedown:G}),p("div",{class:a.horizontal.barClass.value,style:[e.barStyle,e.horizontalBarStyle],"aria-hidden":"true",onMousedown:V}),$(p("div",{ref:a.vertical.ref,class:a.vertical.thumbClass.value,style:a.vertical.style.value,"aria-hidden":"true"}),v),$(p("div",{ref:a.horizontal.ref,class:a.horizontal.thumbClass.value,style:a.horizontal.style.value,"aria-hidden":"true"}),y)])}});const $e=150;var Ut=fe({name:"QDrawer",inheritAttrs:!1,props:{...Ze,...Ve,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...et,"onLayout","miniState"],setup(e,{slots:s,emit:b,attrs:S}){const i=De(),{proxy:{$q:d}}=i,r=Oe(e,d),{preventBodyScroll:a}=Bt(),{registerTimeout:L,removeTimeout:O}=Pt(),t=St(_t,xe);if(t===xe)return console.error("QDrawer needs to be child of QLayout"),xe;let q,_=null,E;const z=x(e.behavior==="mobile"||e.behavior!=="desktop"&&t.totalWidth.value<=e.breakpoint),v=c(()=>e.mini===!0&&z.value!==!0),y=c(()=>v.value===!0?e.miniWidth:e.width),m=x(e.showIfAbove===!0&&z.value===!1?!0:e.modelValue===!0),I=c(()=>e.persistent!==!0&&(z.value===!0||K.value===!0));function ee(l,g){if(se(),l!==!1&&t.animate(),Q(0),z.value===!0){const D=t.instances[n.value];D!==void 0&&D.belowBreakpoint===!0&&D.hide(!1),Y(1),t.isContainer.value!==!0&&a(!0)}else Y(0),l!==!1&&we(!1);L(()=>{l!==!1&&we(!0),g!==!0&&b("show",l)},$e)}function ne(l,g){te(),l!==!1&&t.animate(),Y(0),Q(T.value*y.value),Le(),g!==!0?L(()=>{b("hide",l)},$e):O()}const{show:W,hide:H}=tt({showing:m,hideOnRouteChange:I,handleShow:ee,handleHide:ne}),{addToHistory:se,removeFromHistory:te}=Dt(m,H,I),G={belowBreakpoint:z,hide:H},V=c(()=>e.side==="right"),T=c(()=>(d.lang.rtl===!0?-1:1)*(V.value===!0?1:-1)),ae=x(0),M=x(!1),ie=x(!1),F=x(y.value*T.value),n=c(()=>V.value===!0?"left":"right"),o=c(()=>m.value===!0&&z.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:y.value:0),h=c(()=>e.overlay===!0||e.miniToOverlay===!0||t.view.value.indexOf(V.value?"R":"L")>-1||d.platform.is.ios===!0&&t.isContainer.value===!0),C=c(()=>e.overlay===!1&&m.value===!0&&z.value===!1),K=c(()=>e.overlay===!0&&m.value===!0&&z.value===!1),ye=c(()=>"fullscreen q-drawer__backdrop"+(m.value===!1&&M.value===!1?" hidden":"")),Se=c(()=>({backgroundColor:`rgba(0,0,0,${ae.value*.4})`})),me=c(()=>V.value===!0?t.rows.value.top[2]==="r":t.rows.value.top[0]==="l"),lt=c(()=>V.value===!0?t.rows.value.bottom[2]==="r":t.rows.value.bottom[0]==="l"),ot=c(()=>{const l={};return t.header.space===!0&&me.value===!1&&(h.value===!0?l.top=`${t.header.offset}px`:t.header.space===!0&&(l.top=`${t.header.size}px`)),t.footer.space===!0&&lt.value===!1&&(h.value===!0?l.bottom=`${t.footer.offset}px`:t.footer.space===!0&&(l.bottom=`${t.footer.size}px`)),l}),nt=c(()=>{const l={width:`${y.value}px`,transform:`translateX(${F.value}px)`};return z.value===!0?l:Object.assign(l,ot.value)}),st=c(()=>"q-drawer__content fit "+(t.isContainer.value!==!0?"scroll":"overflow-auto")),rt=c(()=>`q-drawer q-drawer--${e.side}`+(ie.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(r.value===!0?" q-drawer--dark q-dark":"")+(M.value===!0?" no-transition":m.value===!0?"":" q-layout--prevent-focus")+(z.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${v.value===!0?"mini":"standard"}`+(h.value===!0||C.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(me.value===!0?" q-drawer--top-padding":""))),ut=c(()=>{const l=d.lang.rtl===!0?e.side:n.value;return[[ce,ht,void 0,{[l]:!0,mouse:!0}]]}),ct=c(()=>{const l=d.lang.rtl===!0?n.value:e.side;return[[ce,Qe,void 0,{[l]:!0,mouse:!0}]]}),dt=c(()=>{const l=d.lang.rtl===!0?n.value:e.side;return[[ce,Qe,void 0,{[l]:!0,mouse:!0,mouseAllDir:!0}]]});function _e(){ft(z,e.behavior==="mobile"||e.behavior!=="desktop"&&t.totalWidth.value<=e.breakpoint)}k(z,l=>{l===!0?(q=m.value,m.value===!0&&H(!1)):e.overlay===!1&&e.behavior!=="mobile"&&q!==!1&&(m.value===!0?(Q(0),Y(0),Le()):W(!1))}),k(()=>e.side,(l,g)=>{t.instances[g]===G&&(t.instances[g]=void 0,t[g].space=!1,t[g].offset=0),t.instances[l]=G,t[l].size=y.value,t[l].space=C.value,t[l].offset=o.value}),k(t.totalWidth,()=>{(t.isContainer.value===!0||document.qScrollPrevented!==!0)&&_e()}),k(()=>e.behavior+e.breakpoint,_e),k(t.isContainer,l=>{m.value===!0&&a(l!==!0),l===!0&&_e()}),k(t.scrollbarWidth,()=>{Q(m.value===!0?0:void 0)}),k(o,l=>{X("offset",l)}),k(C,l=>{b("onLayout",l),X("space",l)}),k(V,()=>{Q()}),k(y,l=>{Q(),qe(e.miniToOverlay,l)}),k(()=>e.miniToOverlay,l=>{qe(l,y.value)}),k(()=>d.lang.rtl,()=>{Q()}),k(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&(vt(),t.animate())}),k(v,l=>{b("miniState",l)});function Q(l){l===void 0?Ee(()=>{l=m.value===!0?0:y.value,Q(T.value*l)}):(t.isContainer.value===!0&&V.value===!0&&(z.value===!0||Math.abs(l)===y.value)&&(l+=T.value*t.scrollbarWidth.value),F.value=l)}function Y(l){ae.value=l}function we(l){const g=l===!0?"remove":t.isContainer.value!==!0?"add":"";g!==""&&document.body.classList[g]("q-body--drawer-toggle")}function vt(){_!==null&&clearTimeout(_),i.proxy&&i.proxy.$el&&i.proxy.$el.classList.add("q-drawer--mini-animate"),ie.value=!0,_=setTimeout(()=>{_=null,ie.value=!1,i&&i.proxy&&i.proxy.$el&&i.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function ht(l){if(m.value!==!1)return;const g=y.value,D=Z(l.distance.x,0,g);if(l.isFinal===!0){D>=Math.min(75,g)===!0?W():(t.animate(),Y(0),Q(T.value*g)),M.value=!1;return}Q((d.lang.rtl===!0?V.value!==!0:V.value)?Math.max(g-D,0):Math.min(0,D-g)),Y(Z(D/g,0,1)),l.isFirst===!0&&(M.value=!0)}function Qe(l){if(m.value!==!0)return;const g=y.value,D=l.direction===e.side,ge=(d.lang.rtl===!0?D!==!0:D)?Z(l.distance.x,0,g):0;if(l.isFinal===!0){Math.abs(ge)<Math.min(75,g)===!0?(t.animate(),Y(1),Q(0)):H(),M.value=!1;return}Q(T.value*ge),Y(Z(1-ge/g,0,1)),l.isFirst===!0&&(M.value=!0)}function Le(){a(!1),we(!0)}function X(l,g){t.update(e.side,l,g)}function ft(l,g){l.value!==g&&(l.value=g)}function qe(l,g){X("size",l===!0?e.miniWidth:g)}return t.instances[e.side]=G,qe(e.miniToOverlay,y.value),X("space",C.value),X("offset",o.value),e.showIfAbove===!0&&e.modelValue!==!0&&m.value===!0&&e["onUpdate:modelValue"]!==void 0&&b("update:modelValue",!0),wt(()=>{b("onLayout",C.value),b("miniState",v.value),q=e.showIfAbove===!0;const l=()=>{(m.value===!0?ee:ne)(!1,!0)};if(t.totalWidth.value!==0){Ee(l);return}E=k(t.totalWidth,()=>{E(),E=void 0,m.value===!1&&e.showIfAbove===!0&&z.value===!1?W(!1):l()})}),pe(()=>{E!==void 0&&E(),_!==null&&(clearTimeout(_),_=null),m.value===!0&&Le(),t.instances[e.side]===G&&(t.instances[e.side]=void 0,X("size",0),X("offset",0),X("space",!1))}),()=>{const l=[];z.value===!0&&(e.noSwipeOpen===!1&&l.push($(p("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),ut.value)),l.push(Ae("div",{ref:"backdrop",class:ye.value,style:Se.value,"aria-hidden":"true",onClick:H},void 0,"backdrop",e.noSwipeBackdrop!==!0&&m.value===!0,()=>dt.value)));const g=v.value===!0&&s.mini!==void 0,D=[p("div",{...S,key:""+g,class:[st.value,S.class]},g===!0?s.mini():Ge(s.default))];return e.elevated===!0&&m.value===!0&&D.push(p("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),l.push(Ae("aside",{ref:"content",class:rt.value,style:nt.value},D,"contentclose",e.noSwipeClose!==!0&&z.value===!0,()=>ct.value)),p("div",{class:"q-drawer-container"},l)}}});const Mt=["top","middle","bottom"];var Ht=fe({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:e=>Mt.includes(e)}},setup(e,{slots:s}){const b=c(()=>e.align!==void 0?{verticalAlign:e.align}:null),S=c(()=>{const i=e.outline===!0&&e.color||e.textColor;return`q-badge flex inline items-center no-wrap q-badge--${e.multiLine===!0?"multi":"single"}-line`+(e.outline===!0?" q-badge--outline":e.color!==void 0?` bg-${e.color}`:"")+(i!==void 0?` text-${i}`:"")+(e.floating===!0?" q-badge--floating":"")+(e.rounded===!0?" q-badge--rounded":"")+(e.transparent===!0?" q-badge--transparent":"")});return()=>p("div",{class:S.value,style:b.value,role:"status","aria-label":e.label},We(s.default,e.label!==void 0?[e.label]:[]))}}),Ft=fe({name:"QSlideTransition",props:{appear:Boolean,duration:{type:Number,default:300}},emits:["show","hide"],setup(e,{slots:s,emit:b}){let S=!1,i,d,r=null,a=null,L,O;function t(){i&&i(),i=null,S=!1,r!==null&&(clearTimeout(r),r=null),a!==null&&(clearTimeout(a),a=null),d!==void 0&&d.removeEventListener("transitionend",L),L=null}function q(v,y,m){y!==void 0&&(v.style.height=`${y}px`),v.style.transition=`height ${e.duration}ms cubic-bezier(.25, .8, .50, 1)`,S=!0,i=m}function _(v,y){v.style.overflowY=null,v.style.height=null,v.style.transition=null,t(),y!==O&&b(y)}function E(v,y){let m=0;d=v,S===!0?(t(),m=v.offsetHeight===v.scrollHeight?0:void 0):(O="hide",v.style.overflowY="hidden"),q(v,m,y),r=setTimeout(()=>{r=null,v.style.height=`${v.scrollHeight}px`,L=I=>{a=null,(Object(I)!==I||I.target===v)&&_(v,"show")},v.addEventListener("transitionend",L),a=setTimeout(L,e.duration*1.1)},100)}function z(v,y){let m;d=v,S===!0?t():(O="show",v.style.overflowY="hidden",m=v.scrollHeight),q(v,m,y),r=setTimeout(()=>{r=null,v.style.height=0,L=I=>{a=null,(Object(I)!==I||I.target===v)&&_(v,"hide")},v.addEventListener("transitionend",L),a=setTimeout(L,e.duration*1.1)},100)}return pe(()=>{S===!0&&t()}),()=>p(Lt,{css:!1,appear:e.appear,onEnter:E,onLeave:z},s.default)}});const le=qt({}),Rt=Object.keys(Ke);var jt=fe({name:"QExpansionItem",props:{...Ke,...Ze,...Ve,icon:String,label:String,labelLines:[Number,String],caption:String,captionLines:[Number,String],dense:Boolean,toggleAriaLabel:String,expandIcon:String,expandedIcon:String,expandIconClass:[Array,String,Object],duration:Number,headerInsetLevel:Number,contentInsetLevel:Number,expandSeparator:Boolean,defaultOpened:Boolean,hideExpandIcon:Boolean,expandIconToggle:Boolean,switchToggleSide:Boolean,denseToggle:Boolean,group:String,popup:Boolean,headerStyle:[Array,String,Object],headerClass:[Array,String,Object]},emits:[...et,"click","afterShow","afterHide"],setup(e,{slots:s,emit:b}){const{proxy:{$q:S}}=De(),i=Oe(e,S),d=x(e.modelValue!==null?e.modelValue:e.defaultOpened),r=x(null),a=Me(),{show:L,hide:O,toggle:t}=tt({showing:d});let q,_;const E=c(()=>`q-expansion-item q-item-type q-expansion-item--${d.value===!0?"expanded":"collapsed"} q-expansion-item--${e.popup===!0?"popup":"standard"}`),z=c(()=>{if(e.contentInsetLevel===void 0)return null;const o=S.lang.rtl===!0?"Right":"Left";return{["padding"+o]:e.contentInsetLevel*56+"px"}}),v=c(()=>e.disable!==!0&&(e.href!==void 0||e.to!==void 0&&e.to!==null&&e.to!=="")),y=c(()=>{const o={};return Rt.forEach(h=>{o[h]=e[h]}),o}),m=c(()=>v.value===!0||e.expandIconToggle!==!0),I=c(()=>e.expandedIcon!==void 0&&d.value===!0?e.expandedIcon:e.expandIcon||S.iconSet.expansionItem[e.denseToggle===!0?"denseIcon":"icon"]),ee=c(()=>e.disable!==!0&&(v.value===!0||e.expandIconToggle===!0)),ne=c(()=>({expanded:d.value===!0,detailsId:e.targetUid,toggle:t,show:L,hide:O})),W=c(()=>{const o=e.toggleAriaLabel!==void 0?e.toggleAriaLabel:S.lang.label[d.value===!0?"collapse":"expand"](e.label);return{role:"button","aria-expanded":d.value===!0?"true":"false","aria-controls":a,"aria-label":o}});k(()=>e.group,o=>{_!==void 0&&_(),o!==void 0&&T()});function H(o){v.value!==!0&&t(o),b("click",o)}function se(o){o.keyCode===13&&te(o,!0)}function te(o,h){h!==!0&&r.value!==null&&r.value.focus(),t(o),xt(o)}function G(){b("afterShow")}function V(){b("afterHide")}function T(){q===void 0&&(q=Me()),d.value===!0&&(le[e.group]=q);const o=k(d,C=>{C===!0?le[e.group]=q:le[e.group]===q&&delete le[e.group]}),h=k(()=>le[e.group],(C,K)=>{K===q&&C!==void 0&&C!==q&&O()});_=()=>{o(),h(),le[e.group]===q&&delete le[e.group],_=void 0}}function ae(){const o={class:[`q-focusable relative-position cursor-pointer${e.denseToggle===!0&&e.switchToggleSide===!0?" items-end":""}`,e.expandIconClass],side:e.switchToggleSide!==!0,avatar:e.switchToggleSide},h=[p(U,{class:"q-expansion-item__toggle-icon"+(e.expandedIcon===void 0&&d.value===!0?" q-expansion-item__toggle-icon--rotated":""),name:I.value})];return ee.value===!0&&(Object.assign(o,{tabindex:0,...W.value,onClick:te,onKeyup:se}),h.unshift(p("div",{ref:r,class:"q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",tabindex:-1}))),p(j,o,()=>h)}function M(){let o;return s.header!==void 0?o=[].concat(s.header(ne.value)):(o=[p(j,()=>[p(Te,{lines:e.labelLines},()=>e.label||""),e.caption?p(Te,{lines:e.captionLines,caption:!0},()=>e.caption):null])],e.icon&&o[e.switchToggleSide===!0?"push":"unshift"](p(j,{side:e.switchToggleSide===!0,avatar:e.switchToggleSide!==!0},()=>p(U,{name:e.icon})))),e.disable!==!0&&e.hideExpandIcon!==!0&&o[e.switchToggleSide===!0?"unshift":"push"](ae()),o}function ie(){const o={ref:"item",style:e.headerStyle,class:e.headerClass,dark:i.value,disable:e.disable,dense:e.dense,insetLevel:e.headerInsetLevel};return m.value===!0&&(o.clickable=!0,o.onClick=H,Object.assign(o,v.value===!0?y.value:W.value)),p(ve,o,M)}function F(){return $(p("div",{key:"e-content",class:"q-expansion-item__content relative-position",style:z.value,id:a},Ge(s.default)),[[zt,d.value]])}function n(){const o=[ie(),p(Ft,{duration:e.duration,onShow:G,onHide:V},F)];return e.expandSeparator===!0&&o.push(p(he,{class:"q-expansion-item__border q-expansion-item__border--top absolute-top",dark:i.value}),p(he,{class:"q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",dark:i.value})),o}return e.group!==void 0&&T(),pe(()=>{_!==void 0&&_()}),()=>p("div",{class:E.value},[p("div",{class:"q-expansion-item__container relative-position"},n())])}});const $t={name:"ShoppingList",props:["shoppingListInfo"],emits:["deletedList","editedList"],data(){return{showDeleteList:!1,showEditList:!1,timer:null,newName:""}},mounted(){this.newName=this.shoppingListInfo.name},beforeUnmount(){clearTimeout(this.timer)},methods:{finalize(e){this.timer=setTimeout(()=>{e()},1e3)},goToShoppingListPage(){console.log(this.shoppingListInfo),this.$router.push(`/shopping/${this.shoppingListInfo._id}`)},showDeleteListDialog({reset:e}){this.showDeleteList=!0,this.finalize(e)},showEditListDialog({reset:e}){this.showEditList=!0,this.finalize(e)},async saveName(){try{const e={name:this.newName};(await this.$api.patch(`/shopping-lists/patch-shopping-list/${this.shoppingListInfo._id}`,e)).data.status==="success"&&(this.$emit("editedList",this.shoppingListInfo,this.newName),this.showEditList=!1)}catch(e){console.log(e)}},async deleteShoppingList(){try{(await this.$api.delete(`/shopping-lists/delete-shopping-list/${this.shoppingListInfo._id}`)).data.status==="success"&&(this.$emit("deletedList",this.shoppingListInfo),this.showDeleteList=!1)}catch(e){console.log(e)}}}},Wt=e=>(Ye("data-v-d2171c46"),e=e(),Xe(),e),Gt={class:"row items-center"},Kt={class:"row items-center"},Yt={class:"flex list-item"},Xt={class:"q-ml-sm"},Jt=Wt(()=>P("span",null,"Edit list name ",-1));function Zt(e,s,b,S,i,d){return w(),B(J,null,[u(Nt,{onRight:d.showDeleteListDialog,onLeft:d.showEditListDialog},{left:f(()=>[P("div",Gt,[u(U,{left:"",name:"edit"}),re(" Edit")])]),right:f(()=>[P("div",Kt,[re("Delete "),u(U,{right:"",name:"delete"})])]),default:f(()=>[u(jt,{class:"shopping-list-expension-item","expand-separator":"",icon:"receipt_long",label:b.shoppingListInfo.name,caption:`${b.shoppingListInfo.listItems.length} ${b.shoppingListInfo.listItems.length<2?"item":"items"}  | ${b.shoppingListInfo.status}`,to:`/shopping/${this.shoppingListInfo._id}`},{default:f(()=>[(w(!0),B(J,null,ue(b.shoppingListInfo.listItems,r=>(w(),A(de,{class:"items",key:r._id},{default:f(()=>[P("div",Yt,[P("div",null,oe(r.item),1),r.status==="bought"?(w(),A(U,{key:0,name:"check"})):N("",!0),r.status==="not_bought"?(w(),A(U,{key:1,name:"close"})):N("",!0)]),u(he)]),_:2},1024))),128))]),_:1},8,["label","caption","to"])]),_:1},8,["onRight","onLeft"]),u(Ce,{modelValue:i.showDeleteList,"onUpdate:modelValue":s[0]||(s[0]=r=>i.showDeleteList=r),persistent:""},{default:f(()=>[u(de,null,{default:f(()=>[u(Pe,{class:"row items-center"},{default:f(()=>[P("span",Xt,'Are you sure you want to delete "'+oe(b.shoppingListInfo.name)+'" list?',1)]),_:1}),u(He,{align:"right"},{default:f(()=>[$(u(R,{flat:"",label:"Cancel",color:"primary"},null,512),[[Ie]]),u(R,{flat:"",label:"Delete",color:"red",onClick:d.deleteShoppingList},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),u(Ce,{modelValue:i.showEditList,"onUpdate:modelValue":s[2]||(s[2]=r=>i.showEditList=r),persistent:""},{default:f(()=>[u(de,null,{default:f(()=>[u(Pe,{class:"column",style:{width:"80vw"}},{default:f(()=>[Jt,u(at,{type:"text",modelValue:i.newName,"onUpdate:modelValue":s[1]||(s[1]=r=>i.newName=r),color:"cyan-9"},null,8,["modelValue"])]),_:1}),u(He,{align:"right"},{default:f(()=>[$(u(R,{flat:"",label:"Cancel",color:"red"},null,512),[[Ie]]),u(R,{flat:"",label:"Save",color:"primary",onClick:d.saveName},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}var ea=Be($t,[["render",Zt],["__scopeId","data-v-d2171c46"]]);const ta={name:"CategoryUniqueProducts",emits:["goBackToCategories","update:modelValue"],props:["categoryUniqueProductsInfo","modelValue"],data(){return{uniqueNames:[]}},async mounted(){await this.fetchUniqueProductNames()},computed:{value:{get(){return this.modelValue},set(e){this.$emit("update:modelValue",e)}}},methods:{async fetchUniqueProductNames(){const e=await this.$api.get(`/products/get-unique-names/${this.categoryUniqueProductsInfo._id}`);this.uniqueNames=e.data.uniqueNamesArray}}},aa={class:"one-category"},ia={class:""};function la(e,s,b,S,i,d){return w(),B(J,null,[P("div",aa,[u(U,{name:"arrow_back_ios",onClick:s[0]||(s[0]=r=>e.$emit("goBackToCategories"))}),P("span",ia,oe(b.categoryUniqueProductsInfo.name),1)]),u(de,null,{default:f(()=>[u(Et,{dense:"",bordered:"",padding:"",class:"rounded-borders"},{default:f(()=>[(w(!0),B(J,null,ue(i.uniqueNames,r=>$((w(),A(ve,{key:r,tag:"label"},{default:f(()=>[u(j,{avatar:""},{default:f(()=>[u(it,{modelValue:d.value,"onUpdate:modelValue":s[1]||(s[1]=a=>d.value=a),val:r,color:"cyan-9"},null,8,["modelValue","val"])]),_:2},1024),u(j,null,{default:f(()=>[u(Te,null,{default:f(()=>[re(oe(r),1)]),_:2},1024)]),_:2},1024)]),_:2},1024)),[[Je]])),128))]),_:1})]),_:1})],64)}var oa=Be(ta,[["render",la],["__scopeId","data-v-b75ff7c2"]]);const na={name:"ShoppingPage",components:{EmptyState:Qt,EmptyData:mt,ShoppingList:ea,CategoryUniqueProducts:oa},data(){return{image:"EmptyState.svg",title:"Ooops! You are not logged in!",message:"Log in to continue shopping",imageEmptyList:"Void.svg",titleEmptyList:"No shopping list to show",messageEmptyList:"Create your first shopping list",shoppingLists:null,showNewListDialog:!1,drawerRight:!1,search:[],query:"",products:[],categories:[],val:!1,status:"pending",selectedProducts:[],userStore:kt(),$q:Ct(),timer:null,name:null,categoryUniqueProductsInfo:null}},computed:{filteredProducts(){return this.products.filter(e=>e.toLowerCase().indexOf(this.search)>-1)},isDisabled(){return!this.selectedProducts.length}},beforeUpdate(){this.showNewListDialog||(this.name=new Date().toLocaleDateString("en-GB")+" "+new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))},async mounted(){It().$patch({title:"Shopping Lists",showBackIcon:!1});try{this.userStore.authUser&&(this.fetchShoppingLists(),await Promise.all([this.fetchCategories(),this.fetchProducts()]))}catch{this.$q.notify({type:"negative",position:"top",message:"Something went wrong!",color:"negative",timeout:"2500"})}},methods:{async fetchProducts(){const e=await this.$api.get("/products/get-unique-names");this.products=e.data.data.productNames,this.search=[...this.products]},async fetchCategories(){const e=await this.$api.get("/categories");this.categories=e.data.data.categories},async fetchShoppingLists(){const e=await this.$api.get("/shopping-lists/get-shopping-lists");this.shoppingLists=e.data.shoppingLists.reverse()},async createShoppingList(){try{const e={name:this.name,selectedProducts:this.selectedProducts,isRecipe:0};this.$q.loading.show({message:"Creating list..."}),(await this.$api.post("/shopping-lists/create-shopping-list",e)).data.status==="success"&&(this.$q.loading.hide(),this.$q.notify({type:"positive",position:"top",message:"Shopping list created successfully",color:"positive",timeout:"2500"}),await this.fetchShoppingLists(),this.drawerRight=!1,this.showNewListDialog=!1)}catch{this.$q.notify({type:"negative",position:"top",message:"Something went wrong!",color:"negative",timeout:"2500"})}},viewProductsInCategory(e){this.categoryUniqueProductsInfo=e},openDrawer(){this.drawerRight=!0},filterFn(e,s,b){if(e.length<2){b();return}s(()=>{const S=e.toLowerCase();this.search=this.products.filter(i=>i.toLowerCase().indexOf(S)>-1)})},removeListFromArray(e){const s=this.shoppingLists.indexOf(e);s>-1&&this.shoppingLists.splice(s,1)},editListFromArray(e,s){const b=this.shoppingLists.indexOf(e);this.shoppingLists[b].name=s},removeFromSelectedProducts(e){const s=this.selectedProducts.indexOf(e);this.selectedProducts.splice(s,1)}}},sa=e=>(Ye("data-v-542a5820"),e=e(),Xe(),e),ra={key:0,class:"row justify-center loading-spinner"},ua={key:1},ca={class:"shopping-page"},da={class:"drawer-products-list",style:{"font-size":"16px"}},va={key:0},ha={class:"flex justify-between",style:{padding:"5px"}},fa={class:"q-pa-md flex justify-end"},ma=sa(()=>P("div",{class:"text-h6"},"What do you need?",-1)),ga={key:0,class:"addToListDialog"},ba={key:0};function pa(e,s,b,S,i,d){const r=be("CategoryUniqueProducts"),a=be("ShoppingList"),L=be("EmptyData"),O=be("EmptyState");return w(),B(J,null,[!i.shoppingLists&&i.userStore.authUser?(w(),B("div",ra,[u(gt,{color:"cyan-9",size:"5em"})])):N("",!0),i.shoppingLists&&i.userStore.authUser?(w(),B("div",ua,[P("div",ca,[u(Ut,{side:"right",modelValue:i.drawerRight,"onUpdate:modelValue":s[0]||(s[0]=t=>i.drawerRight=t),bordered:"",elevated:"",width:250,breakpoint:500},{default:f(()=>[u(At,{class:"fit"},{default:f(()=>[P("div",da,[i.selectedProducts.length?N("",!0):(w(),B("div",va,"Shopping cart is empty.")),(w(!0),B(J,null,ue(i.selectedProducts,t=>(w(),B("div",{key:t},[P("div",ha,[P("div",null,oe(t),1),P("div",null,[u(U,{name:"close",onClick:q=>d.removeFromSelectedProducts(t)},null,8,["onClick"])])]),u(he)]))),128))]),P("div",fa,[u(R,{onClick:d.createShoppingList,label:"Create List",color:"cyan-9",rounded:"",disable:d.isDisabled},null,8,["onClick","disable"])])]),_:1})]),_:1},8,["modelValue"]),u(Ce,{modelValue:i.showNewListDialog,"onUpdate:modelValue":s[6]||(s[6]=t=>i.showNewListDialog=t),seamless:"",position:"bottom",class:"addToListDialog"},{default:f(()=>[u(de,{class:"q-card__height"},{default:f(()=>[u(Pe,{class:"row items-center q-pb-none"},{default:f(()=>[ma,u(Vt),$(u(R,{icon:"close",flat:"",round:"",dense:""},null,512),[[Ie]])]),_:1}),u(at,{color:"cyan-9",filled:"",modelValue:i.name,"onUpdate:modelValue":s[1]||(s[1]=t=>i.name=t),label:"List name",class:"q-mb-md"},{prepend:f(()=>[u(U,{name:"edit_note"})]),_:1},8,["modelValue"]),u(he),u(Ot,{class:"searchProduct",ref:"selectProduct",label:"Search for product",filled:"",color:"cyan-9",modelValue:i.query,"onUpdate:modelValue":s[3]||(s[3]=t=>i.query=t),"use-input":"","hide-selected":"","fill-input":"","input-debounce":"0",options:i.search,onFilter:d.filterFn,hint:"Minimum 2 characters to trigger filtering",style:{width:"100%","padding-bottom":"32px"}},{"no-option":f(()=>[u(ve,null,{default:f(()=>[u(j,{class:"text-grey"},{default:f(()=>[re(" No results ")]),_:1})]),_:1})]),prepend:f(()=>[u(U,{name:"search"})]),option:f(t=>[u(ve,null,{default:f(()=>[u(j,{avatar:""},{default:f(()=>[u(it,{class:"product-checkbox",color:"cyan-9",modelValue:i.selectedProducts,"onUpdate:modelValue":s[2]||(s[2]=q=>i.selectedProducts=q),label:t.opt,val:t.opt},null,8,["modelValue","label","val"])]),_:2},1024)]),_:2},1024)]),_:1},8,["modelValue","options","onFilter"]),i.categoryUniqueProductsInfo?N("",!0):(w(),B("div",ga,[(w(!0),B(J,null,ue(i.categories,t=>$((w(),A(ve,{clickable:"",key:t._id},{default:f(()=>[u(j,{thumbnail:"",style:{"padding-left":"10px"}},{default:f(()=>[u(U,{color:"cyan-9",name:t.icon},null,8,["name"])]),_:2},1024),u(j,{onClick:q=>d.viewProductsInCategory(t),style:{"font-size":"16px"}},{default:f(()=>[re(oe(t.name),1)]),_:2},1032,["onClick"])]),_:2},1024)),[[Je]])),128))])),i.categoryUniqueProductsInfo?(w(),A(r,{key:1,categoryUniqueProductsInfo:i.categoryUniqueProductsInfo,onGoBackToCategories:s[4]||(s[4]=t=>i.categoryUniqueProductsInfo=null),modelValue:i.selectedProducts,"onUpdate:modelValue":s[5]||(s[5]=t=>i.selectedProducts=t)},null,8,["categoryUniqueProductsInfo","modelValue"])):N("",!0),u(R,{fab:"",icon:"shopping_cart",color:"cyan-9",class:"shopping-page-sticky-btn",onClick:d.openDrawer},{default:f(()=>[i.selectedProducts.length?(w(),A(Ht,{key:0,color:"red",floating:""},{default:f(()=>[re(oe(i.selectedProducts.length),1)]),_:1})):N("",!0)]),_:1},8,["onClick"])]),_:1})]),_:1},8,["modelValue"]),i.userStore.authUser?(w(),B("div",ba,[i.shoppingLists.length>0?(w(),A(R,{key:0,class:"newlist-btn",onClick:s[7]||(s[7]=t=>i.showNewListDialog=!0),label:"New List"})):N("",!0),(w(!0),B(J,null,ue(i.shoppingLists,t=>(w(),A(a,{key:t.id,shoppingListInfo:t,onDeletedList:d.removeListFromArray,onEditedList:d.editListFromArray},null,8,["shoppingListInfo","onDeletedList","onEditedList"]))),128))])):N("",!0)])])):N("",!0),i.shoppingLists&&i.shoppingLists.length==0&&i.userStore.authUser?(w(),A(L,{key:2,image:i.imageEmptyList,title:i.titleEmptyList,message:i.messageEmptyList},{button:f(()=>[u(R,{class:"newlist-btn",label:"New List",onClick:s[8]||(s[8]=t=>i.showNewListDialog=!0)})]),_:1},8,["image","title","message"])):N("",!0),i.userStore.authUser?N("",!0):(w(),A(O,{key:3,image:i.image,title:i.title,message:i.message},null,8,["image","title","message"]))],64)}var $a=Be(na,[["render",pa],["__scopeId","data-v-542a5820"]]);export{$a as default};
