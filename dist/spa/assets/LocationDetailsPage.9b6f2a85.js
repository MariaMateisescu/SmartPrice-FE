import{ap as m,bB as N,cs as ae,cr as le,y as ne,a3 as p,bK as P,bH as re,bN as se,am as R,D as T,bS as F,_ as z,o as u,c as v,ac as a,bd as i,a as h,ab as I,N as b,bf as x,bM as _,T as Q,aO as M,aM as j,aS as H,a5 as k,aR as G,a4 as L,bJ as ie,c0 as de}from"./index.ee36a090.js";import{Q as K,a as O}from"./QItemSection.895976ec.js";import{Q as W,a as B}from"./QDialog.26cad0e3.js";import{u as ce,b as ue,Q as U,a as C}from"./QCard.b49062bf.js";import{Q as y}from"./QInput.3b7890af.js";import{Q as me}from"./QSelect.fede351a.js";import{u as J,a as X}from"./use-timeout.73148d2e.js";import{o as he,c as fe}from"./use-checkbox.ca4f1ea0.js";import{a as ge}from"./QItemLabel.cc16b1c9.js";import{Q as pe}from"./QToggle.ffc7396b.js";import{C as A}from"./ClosePopup.a207a740.js";import{Q as ye}from"./QSeparator.e8538014.js";import{Q as ve}from"./QSlideItem.2aac0cd1.js";import{Q as be}from"./QCardActions.7b04f1a4.js";import"./uid.42677368.js";import"./QChip.a888c0b5.js";import"./QMenu.3282ef68.js";import"./selection.29c34721.js";import"./rtl.b51694b1.js";import"./format.2a3572e1.js";import"./TouchPan.9b477211.js";import"./use-cache.b0833c75.js";const _e=m("svg",{key:"svg",class:"q-radio__bg absolute non-selectable",viewBox:"0 0 24 24"},[m("path",{d:"M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"}),m("path",{class:"q-radio__check",d:"M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"})]);var Ie=N({name:"QRadio",props:{...J,...ae,...ce,modelValue:{required:!0},val:{required:!0},label:String,leftLabel:Boolean,checkedIcon:String,uncheckedIcon:String,color:String,keepColor:Boolean,dense:Boolean,disable:Boolean,tabindex:[String,Number]},emits:["update:modelValue"],setup(e,{slots:t,emit:r}){const{proxy:f}=R(),o=X(e,f.$q),c=le(e,he),s=ne(null),{refocusTargetEl:l,refocusTarget:V}=fe(e,s),g=p(()=>T(e.modelValue)===T(e.val)),n=p(()=>"q-radio cursor-pointer no-outline row inline no-wrap items-center"+(e.disable===!0?" disabled":"")+(o.value===!0?" q-radio--dark":"")+(e.dense===!0?" q-radio--dense":"")+(e.leftLabel===!0?" reverse":"")),S=p(()=>{const d=e.color!==void 0&&(e.keepColor===!0||g.value===!0)?` text-${e.color}`:"";return`q-radio__inner relative-position q-radio__inner--${g.value===!0?"truthy":"falsy"}${d}`}),w=p(()=>(g.value===!0?e.checkedIcon:e.uncheckedIcon)||null),Z=p(()=>e.disable===!0?-1:e.tabindex||0),$=p(()=>{const d={type:"radio"};return e.name!==void 0&&Object.assign(d,{".checked":g.value===!0,"^checked":g.value===!0?"checked":void 0,name:e.name,value:e.val}),d}),ee=ue($);function q(d){d!==void 0&&(F(d),V(d)),e.disable!==!0&&g.value!==!0&&r("update:modelValue",e.val,d)}function te(d){(d.keyCode===13||d.keyCode===32)&&F(d)}function oe(d){(d.keyCode===13||d.keyCode===32)&&q(d)}return Object.assign(f,{set:q}),()=>{const d=w.value!==null?[m("div",{key:"icon",class:"q-radio__icon-container absolute-full flex flex-center no-wrap"},[m(P,{class:"q-radio__icon",name:w.value})])]:[_e];e.disable!==!0&&ee(d,"unshift"," q-radio__native q-ma-none q-pa-none");const D=[m("div",{class:S.value,style:c.value,"aria-hidden":"true"},d)];l.value!==null&&D.push(l.value);const E=e.label!==void 0?re(t.default,[e.label]):se(t.default);return E!==void 0&&D.push(m("div",{class:"q-radio__label q-anchor--skip"},E)),m("div",{ref:s,class:n.value,tabindex:Z.value,role:"radio","aria-label":e.label,"aria-checked":g.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:q,onKeydown:te,onKeyup:oe},D)}}});const Y={radio:Ie,checkbox:ge,toggle:pe},ke=Object.keys(Y);var we=N({name:"QOptionGroup",props:{...J,modelValue:{required:!0},options:{type:Array,validator:e=>e.every(t=>"value"in t&&"label"in t)},name:String,type:{default:"radio",validator:e=>ke.includes(e)},color:String,keepColor:Boolean,dense:Boolean,size:String,leftLabel:Boolean,inline:Boolean,disable:Boolean},emits:["update:modelValue"],setup(e,{emit:t,slots:r}){const{proxy:{$q:f}}=R(),o=Array.isArray(e.modelValue);e.type==="radio"?o===!0&&console.error("q-option-group: model should not be array"):o===!1&&console.error("q-option-group: model should be array in your case");const c=X(e,f),s=p(()=>Y[e.type]),l=p(()=>"q-option-group q-gutter-x-sm"+(e.inline===!0?" q-option-group--inline":"")),V=p(()=>{const n={role:"group"};return e.type==="radio"&&(n.role="radiogroup",e.disable===!0&&(n["aria-disabled"]="true")),n});function g(n){t("update:modelValue",n)}return()=>m("div",{class:l.value,...V.value},e.options.map((n,S)=>{const w=r["label-"+S]!==void 0?()=>r["label-"+S](n):r.label!==void 0?()=>r.label(n):void 0;return m("div",[m(s.value,{modelValue:e.modelValue,val:n.value,name:n.name===void 0?e.name:n.name,disable:e.disable||n.disable,label:w===void 0?n.label:null,leftLabel:n.leftLabel===void 0?e.leftLabel:n.leftLabel,color:n.color===void 0?e.color:n.color,checkedIcon:n.checkedIcon,uncheckedIcon:n.uncheckedIcon,dark:n.dark||c.value,size:n.size===void 0?e.size:n.size,dense:e.dense,keepColor:n.keepColor===void 0?e.keepColor:n.keepColor,"onUpdate:modelValue":g},w)])}))}});const Ce={name:"ProductCard",props:["productInfo"],emits:["editProductSuccess","deleteProductSuccess"],data(){return{showEditProduct:!1,showDeleteProduct:!1,name:this.productInfo.name,category:this.productInfo.category.name,brand:this.productInfo.brand,weight:this.productInfo.weight,price:this.productInfo.price}},beforeUnmount(){clearTimeout(this.timer)},methods:{finalize(e){this.timer=setTimeout(()=>{e()},1e3)},showEditProductDialog({reset:e}){this.showEditProduct=!0,this.finalize(e)},showDeleteProductDialog({reset:e}){this.showDeleteProduct=!0,this.finalize(e)},async saveProduct(){try{const e={name:this.name,category:this.category,brand:this.brand,weight:this.weight,price:this.price};(await this.$api.patch(`/products/${this.productInfo._id}`,e)).data.status==="success"&&(this.$emit("editProductSuccess"),this.showEditProduct=!1)}catch(e){console.log(e)}},async deleteProduct(){try{(await this.$api.delete(`/products/${this.productInfo._id}/${this.$route.params.locationId}`)).data.status==="success"&&(this.$emit("deleteProductSuccess"),this.showDeleteProduct=!1)}catch(e){console.log(e)}}}},Pe=e=>(M("data-v-55aaec1d"),e=e(),j(),e),Ve={class:"row items-center"},Se={class:"row items-center"},xe={class:"product"},Qe=Pe(()=>h("div",{class:"text-h6"},"Edit Product",-1)),qe={class:"q-ml-sm"};function De(e,t,r,f,o,c){return u(),v(Q,null,[a(ve,{onLeft:c.showEditProductDialog,onRight:c.showDeleteProductDialog},{left:i(()=>[h("div",Ve,[a(P,{left:"",name:"edit"}),I(" Edit")])]),right:i(()=>[h("div",Se,[I("Delete "),a(P,{right:"",name:"delete"})])]),default:i(()=>[a(K,null,{default:i(()=>[a(O,null,{default:i(()=>[h("div",xe,[I(b(r.productInfo.brand)+" "+b(r.productInfo.name)+" "+b(r.productInfo.weight)+" ",1),h("strong",null,b(r.productInfo.price)+" lei",1)])]),_:1})]),_:1})]),_:1},8,["onLeft","onRight"]),a(B,{maximized:"",modelValue:o.showEditProduct,"onUpdate:modelValue":t[5]||(t[5]=s=>o.showEditProduct=s)},{default:i(()=>[a(U,null,{default:i(()=>[a(C,{class:"row items-center q-pb-none"},{default:i(()=>[Qe,a(W),x(a(_,{icon:"close",flat:"",round:"",dense:""},null,512),[[A]])]),_:1}),a(C,null,{default:i(()=>[a(y,{modelValue:o.name,"onUpdate:modelValue":t[0]||(t[0]=s=>o.name=s),type:"text",label:"Name"},null,8,["modelValue"]),a(y,{modelValue:o.category,"onUpdate:modelValue":t[1]||(t[1]=s=>o.category=s),type:"text",label:"Category"},null,8,["modelValue"]),a(y,{modelValue:o.brand,"onUpdate:modelValue":t[2]||(t[2]=s=>o.brand=s),type:"text",label:"Brand"},null,8,["modelValue"]),a(y,{modelValue:o.weight,"onUpdate:modelValue":t[3]||(t[3]=s=>o.weight=s),type:"text",label:"Weight"},null,8,["modelValue"]),a(y,{modelValue:o.price,"onUpdate:modelValue":t[4]||(t[4]=s=>o.price=s),type:"number",label:"Price"},null,8,["modelValue"]),a(_,{color:"cyan-9",onClick:c.saveProduct},{default:i(()=>[I("Save Product")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(B,{modelValue:o.showDeleteProduct,"onUpdate:modelValue":t[6]||(t[6]=s=>o.showDeleteProduct=s),persistent:""},{default:i(()=>[a(U,null,{default:i(()=>[a(C,{class:"row items-center"},{default:i(()=>[h("span",qe,"Are you sure you want to delete "+b(r.productInfo.name)+"?",1)]),_:1}),a(be,{align:"right"},{default:i(()=>[x(a(_,{flat:"",label:"Cancel",color:"primary"},null,512),[[A]]),a(_,{flat:"",label:"Delete",color:"red",onClick:c.deleteProduct},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}var Le=z(Ce,[["render",De],["__scopeId","data-v-55aaec1d"]]);const Oe={name:"ProductsInCategory",components:{ProductCard:Le},props:["categoryInfo"],emits:["goBackToCategories"],data(){return{productsInCategory:null}},async mounted(){await this.fetchProductsInOneCategory()},methods:{async fetchProductsInOneCategory(){const e=await this.$api.get(`/categories/${this.$route.params.locationId}/${this.categoryInfo._id}`);this.productsInCategory=e.data.data.productsInCategoryInLocation}}},Be={class:"category-name"},Ue={key:0},Ae={key:1};function ze(e,t,r,f,o,c){const s=H("ProductCard");return u(),v(Q,null,[a(ye),h("div",Be,[a(P,{name:"arrow_back_ios",onClick:t[0]||(t[0]=l=>e.$emit("goBackToCategories"))}),h("strong",null,b(r.categoryInfo.name),1)]),o.productsInCategory&&!o.productsInCategory.length?(u(),v("div",Ue," No products in this category. ")):k("",!0),o.productsInCategory&&o.productsInCategory.length?(u(),v("div",Ae,[(u(!0),v(Q,null,G(o.productsInCategory,l=>(u(),L(s,{key:l._id,productInfo:l,onDeleteProductSuccess:c.fetchProductsInOneCategory,onEditProductSuccess:c.fetchProductsInOneCategory},null,8,["productInfo","onDeleteProductSuccess","onEditProductSuccess"]))),128))])):k("",!0)],64)}var Ee=z(Oe,[["render",ze],["__scopeId","data-v-4d18f0e9"]]);const Te={name:"ProductsPage",components:{ProductsInCategory:Ee},async mounted(){await this.fetchLocation(),await this.fetchCategories(),ie().$patch({title:this.location.name,showBackIcon:!0});const t=await this.$api.get(`/markets/${this.$route.params.marketId}`);this.market=t.data.data.market,this.market.locations.map(r=>this.locationOptions.push({label:r.name,value:r._id})),this.selectedLocations.push(this.$route.params.locationId)},data(){return{name:null,category:null,brand:null,weight:null,price:null,showAddProduct:!1,market:null,selectedLocations:[],locationOptions:[],location:null,categoryOptions:[],showedOptions:[],categories:[],categoryInfo:null}},methods:{async addProduct(){try{const e={name:this.name,category:this.category.value,brand:this.brand,weight:this.weight,price:this.price,selectedLocations:this.selectedLocations};(await this.$api.post("/products",e)).data.status==="success"&&(await this.fetchLocation(),this.showAddProduct=!1,this.resetFields())}catch(e){console.log(e)}},resetFields(){this.name=null,this.category=null,this.brand=null,this.weight=null,this.price=null,this.selectedLocations=[this.$route.params.locationId]},async fetchLocation(){const e=await this.$api.get(`/locations/${this.$route.params.locationId}`);this.location=e.data.data.location},async fetchCategories(){const e=await this.$api.get("/categories");this.categoryOptions=e.data.data.categories.map(({_id:t,name:r})=>({value:t,label:r})),this.categories=e.data.data.categories,console.log(this.categories),this.showedOptions=Object.assign(this.categoryOptions)},filterFn(e,t){if(e===""){t(()=>{this.showedOptions=this.categoryOptions});return}t(()=>{const r=e.toLowerCase();this.showedOptions=this.categoryOptions.filter(f=>f.label.toLowerCase().indexOf(r)>-1)})},viewProductsInCategory(e){this.categoryInfo=e,console.log(this.categoryInfo)}}},Fe=e=>(M("data-v-c6a99366"),e=e(),j(),e),Ne={key:0},Re={key:0,class:"location-details__title"},Me={key:1},je=Fe(()=>h("div",{class:"text-h6"},"Add Product",-1));function He(e,t,r,f,o,c){const s=H("ProductsInCategory");return o.location?(u(),v("div",Ne,[o.location?(u(),v("div",Re,b(o.location.name),1)):k("",!0),a(_,{class:"add-product__btn",onClick:t[0]||(t[0]=l=>o.showAddProduct=!0)},{default:i(()=>[I("Add Product")]),_:1}),o.categoryInfo?k("",!0):(u(),v("div",Me,[(u(!0),v(Q,null,G(o.categories,l=>x((u(),L(K,{clickable:"",key:l._id},{default:i(()=>[a(O,{thumbnail:"",style:{"padding-left":"10px"}},{default:i(()=>[a(P,{name:l.icon},null,8,["name"])]),_:2},1024),a(O,{onClick:V=>c.viewProductsInCategory(l)},{default:i(()=>[I(b(l.name),1)]),_:2},1032,["onClick"])]),_:2},1024)),[[de]])),128))])),o.categoryInfo?(u(),L(s,{key:2,categoryInfo:o.categoryInfo,onGoBackToCategories:t[1]||(t[1]=l=>o.categoryInfo=null)},null,8,["categoryInfo"])):k("",!0),a(B,{maximized:"",modelValue:o.showAddProduct,"onUpdate:modelValue":t[8]||(t[8]=l=>o.showAddProduct=l)},{default:i(()=>[a(U,null,{default:i(()=>[a(C,{class:"row items-center q-pb-none"},{default:i(()=>[je,a(W),x(a(_,{icon:"close",flat:"",round:"",dense:""},null,512),[[A]])]),_:1}),a(C,null,{default:i(()=>[a(y,{modelValue:o.name,"onUpdate:modelValue":t[2]||(t[2]=l=>o.name=l),type:"text",label:"Name"},null,8,["modelValue"]),a(me,{modelValue:o.category,"onUpdate:modelValue":t[3]||(t[3]=l=>o.category=l),options:o.showedOptions,label:"Category","use-input":"","input-debounce":"0",onFilter:c.filterFn},null,8,["modelValue","options","onFilter"]),a(y,{modelValue:o.brand,"onUpdate:modelValue":t[4]||(t[4]=l=>o.brand=l),type:"text",label:"Brand"},null,8,["modelValue"]),a(y,{modelValue:o.weight,"onUpdate:modelValue":t[5]||(t[5]=l=>o.weight=l),type:"text",label:"Weight"},null,8,["modelValue"]),a(y,{modelValue:o.price,"onUpdate:modelValue":t[6]||(t[6]=l=>o.price=l),type:"number",label:"Price"},null,8,["modelValue"]),h("div",null,[a(we,{modelValue:o.selectedLocations,"onUpdate:modelValue":t[7]||(t[7]=l=>o.selectedLocations=l),options:o.locationOptions,color:"green",type:"checkbox"},null,8,["modelValue","options"])]),a(_,{style:{"background-color":"#00838f",color:"#fff"},onClick:c.addProduct,label:"Add product"},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])):k("",!0)}var ft=z(Te,[["render",He],["__scopeId","data-v-c6a99366"]]);export{ft as default};
