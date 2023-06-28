import{a as F,Q as V,b as P}from"./QTabPanels.167947e2.js";import{Q as M}from"./QTabs.edb8baa4.js";import{Q as S}from"./QSeparator.63b70fdc.js";import{at as U,bE as x,bF as $,a3 as f,bO as z,ap as T,am as H,bB as K,_ as G,bJ as A,aS as J,o,c as h,a4 as c,bd as n,a5 as p,ac as i,a as u,N as m,T as I,aR as L,bf as D,ab as B,bL as R,bN as w,c1 as E,aO as X,aM as Y}from"./index.d0d3c498.js";import{Q as O,a as Q}from"./QItemSection.4b8a4465.js";import{Q as N}from"./QList.607348db.js";import{a as W,Q as Z}from"./QItemLabel.9c915d91.js";import{Q as tt}from"./QSlider.6fbd7297.js";import{E as et,Q as st}from"./EmptyData.b220a49c.js";import{a as at,Q as ot}from"./QCard.abb0307d.js";import{u as it}from"./geolocation-info.a4dae868.js";import"./use-timeout.2164d507.js";import"./TouchPan.0f96564a.js";import"./selection.1fbc28c3.js";import"./use-cache.b0833c75.js";import"./uid.42677368.js";import"./QResizeObserver.0ab80c1c.js";import"./rtl.b51694b1.js";import"./use-checkbox.9d7dc990.js";import"./format.2a3572e1.js";const lt={position:{type:String,default:"bottom-right",validator:t=>["top-right","top-left","bottom-right","bottom-left","top","right","bottom","left"].includes(t)},offset:{type:Array,validator:t=>t.length===2},expand:Boolean};function nt(){const{props:t,proxy:{$q:s}}=H(),d=U($,x);if(d===x)return console.error("QPageSticky needs to be child of QLayout"),x;const k=f(()=>{const r=t.position;return{top:r.indexOf("top")>-1,right:r.indexOf("right")>-1,bottom:r.indexOf("bottom")>-1,left:r.indexOf("left")>-1,vertical:r==="top"||r==="bottom",horizontal:r==="left"||r==="right"}}),e=f(()=>d.header.offset),l=f(()=>d.right.offset),y=f(()=>d.footer.offset),a=f(()=>d.left.offset),g=f(()=>{let r=0,b=0;const _=k.value,C=s.lang.rtl===!0?-1:1;_.top===!0&&e.value!==0?b=`${e.value}px`:_.bottom===!0&&y.value!==0&&(b=`${-y.value}px`),_.left===!0&&a.value!==0?r=`${C*a.value}px`:_.right===!0&&l.value!==0&&(r=`${-C*l.value}px`);const v={transform:`translate(${r}, ${b})`};return t.offset&&(v.margin=`${t.offset[1]}px ${t.offset[0]}px`),_.vertical===!0?(a.value!==0&&(v[s.lang.rtl===!0?"right":"left"]=`${a.value}px`),l.value!==0&&(v[s.lang.rtl===!0?"left":"right"]=`${l.value}px`)):_.horizontal===!0&&(e.value!==0&&(v.top=`${e.value}px`),y.value!==0&&(v.bottom=`${y.value}px`)),v}),j=f(()=>`q-page-sticky row flex-center fixed-${t.position} q-page-sticky--${t.expand===!0?"expand":"shrink"}`);function q(r){const b=z(r.default);return T("div",{class:j.value,style:g.value},t.expand===!0?b:[T("div",b)])}return{$layout:d,getStickyContent:q}}var rt=K({name:"QPageSticky",props:lt,setup(t,{slots:s}){const{getStickyContent:d}=nt();return()=>d(s)}});const ct={name:"ManageShoppingListPage",components:{EmptyData:et},data(){return{boughtItems:[],calculatedLocations:null,list:null,tab:"list",latlng:"",myCoordinates:{lat:0,lng:0},geolocationInfo:null,image:"Void.svg",title:"No location found in this radius",message:"Try to increase the radius"}},computed:{timeSpentShopping(){if(this.list.status==="completed"){const t=this.list.timeEnded-this.list.timeStarted;return new Date(t).toISOString().slice(11,19)}else return null},filteredLocationsInRadius(){return this.calculatedLocations&&this.calculatedLocations.filter(t=>t.count!=0)}},async mounted(){this.geolocationInfo=it(),await this.fetchList(),A().$patch({title:this.list.name,showBackIcon:!0,backIconTo:"/shopping"});try{let s=await this.getPosition();this.myCoordinates.lat=s.coords.latitude,this.myCoordinates.lng=s.coords.longitude,this.latlng=this.myCoordinates.lat+","+this.myCoordinates.lng}catch(s){console.log(s)}await this.calculateLocations()},methods:{getPosition(){return new Promise((t,s)=>{navigator.geolocation.getCurrentPosition(t,s)})},async fetchList(){const t=await this.$api.get(`/shopping-lists/get-shopping-lists/${this.$route.params.shoppingListId}`);this.list=t.data.data.list},async changeListStatus(){try{const t={status:"active",timeStarted:Date.now()};(await this.$api.patch(`/shopping-lists/patch-shopping-list/${this.$route.params.shoppingListId}`,t)).data.status==="success"&&console.log("status changed successfully")}catch(t){console.log(t)}},async startShopping(){await this.changeListStatus(),await this.fetchList()},async endShopping(){try{const t={status:"completed",timeEnded:Date.now(),boughtItems:this.boughtItems};(await this.$api.patch(`/shopping-lists/end-shopping-list/${this.$route.params.shoppingListId}`,t)).data.status==="success"&&await this.fetchList()}catch(t){console.log(t)}},async reuseShoppingList(){try{const t=this.list.listItems.map(k=>k.item),s={name:new Date().toLocaleDateString("en-GB")+" "+new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),selectedProducts:t},d=await this.$api.post("/shopping-lists/create-shopping-list",s);d.data.status==="success"&&(await this.$router.push(`/shopping/${d.data.newListId}`),this.$router.go(0))}catch(t){console.log(t)}},async calculateLocations(){const t=await this.$api.get(`/locations/calculate-locations/${this.$route.params.shoppingListId}/within/${this.geolocationInfo.$state.radius}/center/${this.latlng}`);this.calculatedLocations=t.data.calculatedLocations},async sliderChanged(){await this.calculateLocations()},addKm(t){return t+"km"}}},ut=t=>(X("data-v-20559214"),t=t(),Y(),t),dt={key:0},pt={class:"list-header"},mt={class:"list-header__count"},ht={key:0},gt={class:"list-header__status"},ft={class:"flex justify-between"},yt={class:"slider-box"},bt={key:0,class:"row justify-center loading-spinner q-mt-xl"},_t={key:1,class:"q-mt-sm"},vt={key:0},kt={class:"flex justify-between"},St={class:"flex justify-between"},It=ut(()=>u("strong",null,"Total:",-1));function Lt(t,s,d,k,e,l){const y=J("EmptyData");return e.list?(o(),h("div",dt,[e.list.isRecipe?p("",!0):(o(),c(M,{key:0,modelValue:e.tab,"onUpdate:modelValue":s[0]||(s[0]=a=>e.tab=a),dense:"",class:"text-grey","active-color":"cyan-9","indicator-color":"cyan-9",align:"justify","narrow-indicator":""},{default:n(()=>[i(V,{name:"list",label:"List"}),i(V,{name:"locations",label:"Locations"})]),_:1},8,["modelValue"])),i(S),i(F,{modelValue:e.tab,"onUpdate:modelValue":s[3]||(s[3]=a=>e.tab=a),animated:""},{default:n(()=>[i(P,{name:"list"},{default:n(()=>[u("div",pt,[u("div",mt,m(e.list.listItems.length)+" "+m(e.list.listItems.length<2?"item":"items"),1),l.timeSpentShopping?(o(),h("div",ht,m(l.timeSpentShopping),1)):p("",!0),u("div",gt,m(e.list.status),1)]),e.list.status!=="active"?(o(),c(N,{key:0,dense:"",bordered:"",padding:"",class:"rounded-borders list"},{default:n(()=>[(o(!0),h(I,null,L(e.list.listItems,(a,g)=>D((o(),c(O,{clickable:"",key:a._id},{default:n(()=>[i(Q,null,{default:n(()=>[u("div",ft,[B(m(a.item)+" ",1),a.status==="bought"?(o(),c(R,{key:0,name:"done"})):p("",!0),a.status==="not_bought"?(o(),c(R,{key:1,name:"close"})):p("",!0)]),g!==e.list.listItems.length-1?(o(),c(S,{key:0})):p("",!0)]),_:2},1024)]),_:2},1024)),[[E]])),128))]),_:1})):p("",!0),e.list.status==="active"?(o(),c(N,{key:1,dense:"",bordered:"",padding:"",class:"rounded-borders"},{default:n(()=>[(o(!0),h(I,null,L(e.list.listItems,a=>D((o(),c(O,{key:a._id,tag:"label"},{default:n(()=>[i(Q,{avatar:""},{default:n(()=>[i(W,{modelValue:e.boughtItems,"onUpdate:modelValue":s[1]||(s[1]=g=>e.boughtItems=g),val:a.item,color:"cyan-9"},null,8,["modelValue","val"])]),_:2},1024),i(Q,null,{default:n(()=>[i(Z,null,{default:n(()=>[B(m(a.item),1)]),_:2},1024)]),_:2},1024)]),_:2},1024)),[[E]])),128))]),_:1})):p("",!0),i(rt,{position:"bottom-right",class:"shopping-page-sticky"},{default:n(()=>[e.list.status==="pending"?(o(),c(w,{key:0,onClick:l.startShopping,fab:"",label:"go shopping",color:"cyan-9",class:"shopping-page-sticky-btn"},null,8,["onClick"])):p("",!0),e.list.status==="active"?(o(),c(w,{key:1,onClick:l.endShopping,fab:"",label:"end shopping",color:"cyan-9",class:"shopping-page-sticky-btn"},null,8,["onClick"])):p("",!0),e.list.status==="completed"?(o(),c(w,{key:2,onClick:l.reuseShoppingList,fab:"",icon:"refresh",label:"reuse list",color:"cyan-9",class:"shopping-page-sticky-btn"},null,8,["onClick"])):p("",!0)]),_:1})]),_:1}),i(P,{name:"locations"},{default:n(()=>[u("div",yt,[i(tt,{modelValue:e.geolocationInfo.radius,"onUpdate:modelValue":s[2]||(s[2]=a=>e.geolocationInfo.radius=a),markers:"","marker-labels":l.addKm,min:1,max:7,onChange:l.sliderChanged},null,8,["modelValue","marker-labels","onChange"])]),e.calculatedLocations?(o(),h("div",_t,[l.filteredLocationsInRadius&&l.filteredLocationsInRadius.length?(o(),h("div",vt,[(o(!0),h(I,null,L(l.filteredLocationsInRadius,a=>(o(),h("div",{key:a.coordinates},[a.count!==0?(o(),c(ot,{key:0,flat:"",bordered:"",class:"location-card"},{default:n(()=>[i(at,null,{default:n(()=>[u("div",null,m(a.name),1),u("i",null,m(a.count)+"/"+m(e.list.listItems.length)+" items available ",1),i(S),(o(!0),h(I,null,L(a.availableItems,g=>(o(),h("div",{key:g._id},[u("div",kt,[u("div",null,m(g.name),1),u("div",null,m(g.price)+" lei",1)])]))),128)),i(S),u("div",St,[It,u("strong",null,m(a.total.toFixed(2))+" lei",1)])]),_:2},1024)]),_:2},1024)):p("",!0)]))),128))])):(o(),c(y,{key:1,class:"q-mt-xl",image:e.image,title:e.title,message:e.message},null,8,["image","title","message"]))])):(o(),h("div",bt,[i(st,{color:"cyan-9",size:"5em"})]))]),_:1})]),_:1},8,["modelValue"])])):p("",!0)}var Ht=G(ct,[["render",Lt],["__scopeId","data-v-20559214"]]);export{Ht as default};