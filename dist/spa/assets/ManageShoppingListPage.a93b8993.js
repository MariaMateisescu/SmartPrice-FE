import{a as F,Q as V,b as P}from"./QTabPanels.82502a48.js";import{Q as K}from"./QTabs.9d5601d7.js";import{Q as S}from"./QSeparator.167c5e1f.js";import{at as U,bE as x,bF as q,a3 as f,bN as H,ap as T,am as z,bB as G,_ as A,bJ as J,aS as X,o,c as g,a4 as u,bd as l,a5 as p,ac as i,a as c,N as m,T as I,aR as L,bf as D,ab as B,bK as E,bM as w,c0 as R,aO as Y,aM as W}from"./index.6c1463e3.js";import{Q as N,a as Q}from"./QItemSection.30cc49f9.js";import{Q as O}from"./QList.de99c943.js";import{a as Z,Q as tt}from"./QItemLabel.ea9a63b9.js";import{Q as et}from"./QSlider.e8a9cd0c.js";import{a as st,Q as at}from"./QCard.75b0ccf8.js";import{u as ot}from"./geolocation-info.e60bc549.js";import{E as it}from"./EmptyData.ca313875.js";import"./use-timeout.e20ae8be.js";import"./TouchPan.f9c03141.js";import"./selection.f59577b2.js";import"./use-cache.b0833c75.js";import"./uid.42677368.js";import"./QResizeObserver.60624b94.js";import"./rtl.b51694b1.js";import"./use-checkbox.9499a600.js";import"./format.2a3572e1.js";const lt={position:{type:String,default:"bottom-right",validator:t=>["top-right","top-left","bottom-right","bottom-left","top","right","bottom","left"].includes(t)},offset:{type:Array,validator:t=>t.length===2},expand:Boolean};function nt(){const{props:t,proxy:{$q:s}}=z(),d=U(q,x);if(d===x)return console.error("QPageSticky needs to be child of QLayout"),x;const k=f(()=>{const r=t.position;return{top:r.indexOf("top")>-1,right:r.indexOf("right")>-1,bottom:r.indexOf("bottom")>-1,left:r.indexOf("left")>-1,vertical:r==="top"||r==="bottom",horizontal:r==="left"||r==="right"}}),e=f(()=>d.header.offset),n=f(()=>d.right.offset),y=f(()=>d.footer.offset),a=f(()=>d.left.offset),h=f(()=>{let r=0,b=0;const _=k.value,C=s.lang.rtl===!0?-1:1;_.top===!0&&e.value!==0?b=`${e.value}px`:_.bottom===!0&&y.value!==0&&(b=`${-y.value}px`),_.left===!0&&a.value!==0?r=`${C*a.value}px`:_.right===!0&&n.value!==0&&(r=`${-C*n.value}px`);const v={transform:`translate(${r}, ${b})`};return t.offset&&(v.margin=`${t.offset[1]}px ${t.offset[0]}px`),_.vertical===!0?(a.value!==0&&(v[s.lang.rtl===!0?"right":"left"]=`${a.value}px`),n.value!==0&&(v[s.lang.rtl===!0?"left":"right"]=`${n.value}px`)):_.horizontal===!0&&(e.value!==0&&(v.top=`${e.value}px`),y.value!==0&&(v.bottom=`${y.value}px`)),v}),j=f(()=>`q-page-sticky row flex-center fixed-${t.position} q-page-sticky--${t.expand===!0?"expand":"shrink"}`);function M(r){const b=H(r.default);return T("div",{class:j.value,style:h.value},t.expand===!0?b:[T("div",b)])}return{$layout:d,getStickyContent:M}}var rt=G({name:"QPageSticky",props:lt,setup(t,{slots:s}){const{getStickyContent:d}=nt();return()=>d(s)}});const ct={name:"ManageShoppingListPage",components:{EmptyData:it},data(){return{boughtItems:[],calculatedLocations:[],list:null,tab:"list",latlng:"",myCoordinates:{lat:0,lng:0},geolocationInfo:null,image:"Void.svg",title:"No location found in this radius",message:"Try to increase the radius"}},computed:{timeSpentShopping(){if(this.list.status==="completed"){const t=this.list.timeEnded-this.list.timeStarted;return new Date(t).toISOString().slice(11,19)}else return null},filteredLocationsInRadius(){return this.calculatedLocations.filter(t=>t.count!=0)}},async mounted(){this.geolocationInfo=ot(),await this.fetchList(),J().$patch({title:this.list.name,showBackIcon:!0,backIconTo:"/shopping"});try{let s=await this.getPosition();this.myCoordinates.lat=s.coords.latitude,this.myCoordinates.lng=s.coords.longitude,this.latlng=this.myCoordinates.lat+","+this.myCoordinates.lng}catch(s){console.log(s)}await this.calculateLocations()},methods:{getPosition(){return new Promise((t,s)=>{navigator.geolocation.getCurrentPosition(t,s)})},async fetchList(){const t=await this.$api.get(`/shopping-lists/get-shopping-lists/${this.$route.params.shoppingListId}`);this.list=t.data.data.list},async changeListStatus(){try{const t={status:"active",timeStarted:Date.now()};(await this.$api.patch(`/shopping-lists/patch-shopping-list/${this.$route.params.shoppingListId}`,t)).data.status==="success"&&console.log("status changed successfully")}catch(t){console.log(t)}},async startShopping(){await this.changeListStatus(),await this.fetchList()},async endShopping(){try{const t={status:"completed",timeEnded:Date.now(),boughtItems:this.boughtItems};(await this.$api.patch(`/shopping-lists/end-shopping-list/${this.$route.params.shoppingListId}`,t)).data.status==="success"&&await this.fetchList()}catch(t){console.log(t)}},async reuseShoppingList(){try{const t=this.list.listItems.map(k=>k.item),s={name:new Date().toLocaleDateString("en-GB")+" "+new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),selectedProducts:t},d=await this.$api.post("/shopping-lists/create-shopping-list",s);d.data.status==="success"&&(await this.$router.push(`/shopping/${d.data.newListId}`),this.$router.go(0))}catch(t){console.log(t)}},async calculateLocations(){const t=await this.$api.get(`/locations/calculate-locations/${this.$route.params.shoppingListId}/within/${this.geolocationInfo.$state.radius}/center/${this.latlng}`);this.calculatedLocations=t.data.calculatedLocations},async sliderChanged(){await this.calculateLocations()},addKm(t){return t+"km"}}},$=t=>(Y("data-v-615c903b"),t=t(),W(),t),ut={key:0},dt={class:"list-header"},pt={class:"list-header__count"},mt={key:0},ht={class:"list-header__status"},gt={class:"flex justify-between"},ft={class:"slider-box"},yt={key:0},bt=$(()=>c("div",null,"Locations List",-1)),_t={class:"flex justify-between"},vt={class:"flex justify-between"},kt=$(()=>c("strong",null,"Total:",-1));function St(t,s,d,k,e,n){const y=X("EmptyData");return e.list?(o(),g("div",ut,[e.list.isRecipe?p("",!0):(o(),u(K,{key:0,modelValue:e.tab,"onUpdate:modelValue":s[0]||(s[0]=a=>e.tab=a),dense:"",class:"text-grey","active-color":"cyan-9","indicator-color":"cyan-9",align:"justify","narrow-indicator":""},{default:l(()=>[i(V,{name:"list",label:"List"}),i(V,{name:"locations",label:"Locations"})]),_:1},8,["modelValue"])),i(S),i(F,{modelValue:e.tab,"onUpdate:modelValue":s[3]||(s[3]=a=>e.tab=a),animated:""},{default:l(()=>[i(P,{name:"list"},{default:l(()=>[c("div",dt,[c("div",pt,m(e.list.listItems.length)+" "+m(e.list.listItems.length<2?"item":"items"),1),n.timeSpentShopping?(o(),g("div",mt,m(n.timeSpentShopping),1)):p("",!0),c("div",ht,m(e.list.status),1)]),e.list.status!=="active"?(o(),u(O,{key:0,dense:"",bordered:"",padding:"",class:"rounded-borders list"},{default:l(()=>[(o(!0),g(I,null,L(e.list.listItems,(a,h)=>D((o(),u(N,{clickable:"",key:a._id},{default:l(()=>[i(Q,null,{default:l(()=>[c("div",gt,[B(m(a.item)+" ",1),a.status==="bought"?(o(),u(E,{key:0,name:"done"})):p("",!0),a.status==="not_bought"?(o(),u(E,{key:1,name:"close"})):p("",!0)]),h!==e.list.listItems.length-1?(o(),u(S,{key:0})):p("",!0)]),_:2},1024)]),_:2},1024)),[[R]])),128))]),_:1})):p("",!0),e.list.status==="active"?(o(),u(O,{key:1,dense:"",bordered:"",padding:"",class:"rounded-borders"},{default:l(()=>[(o(!0),g(I,null,L(e.list.listItems,a=>D((o(),u(N,{key:a._id,tag:"label"},{default:l(()=>[i(Q,{avatar:""},{default:l(()=>[i(Z,{modelValue:e.boughtItems,"onUpdate:modelValue":s[1]||(s[1]=h=>e.boughtItems=h),val:a.item,color:"cyan-9"},null,8,["modelValue","val"])]),_:2},1024),i(Q,null,{default:l(()=>[i(tt,null,{default:l(()=>[B(m(a.item),1)]),_:2},1024)]),_:2},1024)]),_:2},1024)),[[R]])),128))]),_:1})):p("",!0),i(rt,{position:"bottom-right",class:"shopping-page-sticky"},{default:l(()=>[e.list.status==="pending"?(o(),u(w,{key:0,onClick:n.startShopping,fab:"",label:"go shopping",color:"cyan-9",class:"shopping-page-sticky-btn"},null,8,["onClick"])):p("",!0),e.list.status==="active"?(o(),u(w,{key:1,onClick:n.endShopping,fab:"",label:"end shopping",color:"cyan-9",class:"shopping-page-sticky-btn"},null,8,["onClick"])):p("",!0),e.list.status==="completed"?(o(),u(w,{key:2,onClick:n.reuseShoppingList,fab:"",icon:"refresh",label:"reuse list",color:"cyan-9",class:"shopping-page-sticky-btn"},null,8,["onClick"])):p("",!0)]),_:1})]),_:1}),i(P,{name:"locations"},{default:l(()=>[c("div",ft,[i(et,{modelValue:e.geolocationInfo.radius,"onUpdate:modelValue":s[2]||(s[2]=a=>e.geolocationInfo.radius=a),markers:"","marker-labels":n.addKm,min:1,max:7,onChange:n.sliderChanged},null,8,["modelValue","marker-labels","onChange"])]),n.filteredLocationsInRadius.length?(o(),g("div",yt,[bt,(o(!0),g(I,null,L(n.filteredLocationsInRadius,a=>(o(),g("div",{key:a.coordinates},[a.count!==0?(o(),u(at,{key:0,flat:"",bordered:""},{default:l(()=>[i(st,null,{default:l(()=>[c("div",null,m(a.name),1),c("i",null,m(a.count)+"/"+m(e.list.listItems.length)+" items available ",1),i(S),(o(!0),g(I,null,L(a.availableItems,h=>(o(),g("div",{key:h._id},[c("div",_t,[c("div",null,m(h.name),1),c("div",null,m(h.price)+" lei",1)])]))),128)),i(S),c("div",vt,[kt,c("strong",null,m(a.total.toFixed(2))+" lei",1)])]),_:2},1024)]),_:2},1024)):p("",!0)]))),128))])):(o(),u(y,{key:1,image:e.image,title:e.title,message:e.message},null,8,["image","title","message"]))]),_:1})]),_:1},8,["modelValue"])])):p("",!0)}var Ut=A(ct,[["render",St],["__scopeId","data-v-615c903b"]]);export{Ut as default};