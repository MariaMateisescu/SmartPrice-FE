import{Q as z}from"./QSlider.d0c7004e.js";import{Q as P,a as B}from"./QDialog.26cad0e3.js";import{_ as L,o as r,c as m,a,ac as t,bK as S,N as l,bd as s,a4 as f,T as p,aR as h,a5 as _,bI as O,aS as g,d as N,bf as b,bM as T,ab as U,c0 as R,aO as A,aM as K}from"./index.ee36a090.js";import{Q,a as M}from"./QCard.b49062bf.js";import{Q as k}from"./QSeparator.e8538014.js";import{Q as x,a as w}from"./QItemSection.895976ec.js";import{C as W}from"./ClosePopup.a207a740.js";import{u as j}from"./geolocation-info.d9ba8874.js";import{Q as q}from"./QList.0c8e24b6.js";var E="/assets/bluedot.122d0e85.png";const F={name:"ProductsInCategoryInLocation",emits:["goBackToCategories"],props:["categoryInfo","locationInfo"],data(){return{products:[]}},async mounted(){console.log("text",this.locationInfo);const o=await this.$api.get(`/categories/${this.locationInfo.location._id}/${this.categoryInfo._id}`);this.products=o.data.data.productsInCategoryInLocation,console.log(this.products)}};function H(o,i,u,I,e,c){return r(),m(p,null,[a("div",null,[t(k),t(S,{name:"arrow_back_ios",onClick:i[0]||(i[0]=d=>o.$emit("goBackToCategories"))}),a("strong",null,l(u.categoryInfo.name),1),t(k)]),t(Q,null,{default:s(()=>[e.products.length?(r(),f(q,{key:0,dense:"",bordered:"",padding:"",class:"rounded-borders"},{default:s(()=>[(r(!0),m(p,null,h(e.products,d=>(r(),m("div",{key:d._id},[d?(r(),f(x,{key:0,class:"flex justify-between"},{default:s(()=>[a("div",null,l(d.brand)+" "+l(d.name)+" "+l(d.weight),1),a("div",null,l(d.price)+" lei",1)]),_:2},1024)):_("",!0)]))),128))]),_:1})):_("",!0)]),_:1})],64)}var J=L(F,[["render",H],["__scopeId","data-v-7d46b53e"]]);const X={components:{ProductsInCategoryInLocation:J},data(){return{openedMarkerID:null,zoom:13,currentLocationIcon:E,circleOptions:{strokeColor:"#4c8bf5",strokeOpacity:.7,strokeWeight:2,fillColor:"#4c8bf5",fillOpacity:.1},locationInfo:null,showLocationDetails:!1,categories:[],categoryInfo:null}},setup(){const o=O(),i=j();return{userStore:o,geolocationInfo:i}},props:["marketsList","myCoordinates"],async mounted(){await this.fetchCategories()},methods:{openMarker(o){this.openedMarkerID=o},addKm(o){return o+"km"},sliderChanged(o){this.$emit("onSliderChanged",o)},showLocationDetailsDialog(o){this.locationInfo=o,this.showLocationDetails=!0,console.log(this.locationInfo)},async fetchCategories(){const o=await this.$api.get("/categories");this.categories=o.data.data.categories},viewProductsInCategory(o){this.categoryInfo=o}},computed:{circleRadius(){return this.geolocationInfo.$state.radius*1e3},isAdmin(){return this.userStore.authUser&&this.userStore.authUser.role==="admin"}}},Y=o=>(A("data-v-6ae3e47b"),o=o(),K(),o),Z=["onClick"],$={class:"slider-box"},oo=Y(()=>a("div",{class:"text-h6"},"Location details",-1)),eo={class:"logo-container"},to=["src"],no={key:0};function ao(o,i,u,I,e,c){const d=g("GMapInfoWindow"),y=g("GMapMarker"),D=g("GMapCircle"),G=g("GMapMap"),V=g("ProductsInCategoryInLocation");return r(),m("div",null,[t(G,{center:u.myCoordinates,zoom:e.zoom,class:N(["map-style",[c.isAdmin?"without-footer-map-height":"with-footer-map-height"]])},{default:s(()=>[(r(!0),m(p,null,h(u.marketsList,(n,C)=>(r(),f(y,{key:C,position:n.location.coordinates,icon:{url:n.market.logo,scaledSize:{width:30,height:30},labelOrigin:{x:16,y:-10}},clickable:!0,onClick:v=>c.openMarker(n.location._id)},{default:s(()=>[t(d,{closeclick:!0,onCloseclick:i[0]||(i[0]=v=>c.openMarker(null)),opened:e.openedMarkerID===n.location._id},{default:s(()=>[a("div",null,l(n.location.address),1),a("button",{onClick:v=>c.showLocationDetailsDialog(n),class:"location-details-button"}," Details ",8,Z)]),_:2},1032,["opened"])]),_:2},1032,["position","icon","onClick"]))),128)),t(y,{position:{lat:u.myCoordinates.lat,lng:u.myCoordinates.lng},icon:{url:e.currentLocationIcon,scaledSize:{width:18,height:18}}},null,8,["position","icon"]),t(D,{radius:c.circleRadius,center:{lat:u.myCoordinates.lat,lng:u.myCoordinates.lng},options:e.circleOptions},null,8,["radius","center","options"])]),_:1},8,["center","zoom","class"]),a("div",$,[t(z,{class:"slider",modelValue:I.geolocationInfo.radius,"onUpdate:modelValue":i[1]||(i[1]=n=>I.geolocationInfo.radius=n),markers:"","marker-labels":c.addKm,min:1,max:7,onChange:c.sliderChanged},null,8,["modelValue","marker-labels","onChange"])]),t(B,{maximized:"",modelValue:e.showLocationDetails,"onUpdate:modelValue":i[3]||(i[3]=n=>e.showLocationDetails=n)},{default:s(()=>[t(Q,null,{default:s(()=>[t(M,{class:"row items-center q-pb-none"},{default:s(()=>[oo,t(P),b(t(T,{icon:"close",flat:"",round:"",dense:""},null,512),[[W]])]),_:1}),t(M,{style:{"font-size":"16px"}},{default:s(()=>[a("div",eo,[a("img",{class:"logo",src:e.locationInfo.market.logo,alt:"logo"},null,8,to),a("div",null,[a("div",null,l(e.locationInfo.location.name),1),a("div",null,"Adresa: "+l(e.locationInfo.location.address),1),a("div",null,"Program: "+l(e.locationInfo.location.openingHours),1)])]),t(k),e.categoryInfo?_("",!0):(r(),m("div",no,[(r(!0),m(p,null,h(e.categories,n=>b((r(),f(x,{clickable:"",key:n._id},{default:s(()=>[t(w,{thumbnail:"",style:{"padding-left":"10px"}},{default:s(()=>[t(S,{name:n.icon},null,8,["name"])]),_:2},1024),t(w,{onClick:C=>c.viewProductsInCategory(n)},{default:s(()=>[U(l(n.name),1)]),_:2},1032,["onClick"])]),_:2},1024)),[[R]])),128))])),e.categoryInfo?(r(),f(V,{key:1,categoryInfo:e.categoryInfo,locationInfo:e.locationInfo,onGoBackToCategories:i[2]||(i[2]=n=>e.categoryInfo=null)},null,8,["categoryInfo","locationInfo"])):_("",!0)]),_:1})]),_:1})]),_:1},8,["modelValue"])])}var po=L(X,[["render",ao],["__scopeId","data-v-6ae3e47b"]]);export{po as M};