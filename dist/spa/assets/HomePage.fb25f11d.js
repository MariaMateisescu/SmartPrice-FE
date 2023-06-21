import{_ as s,ce as r,bJ as c,aS as l,o as m,c as h,ac as p}from"./index.ee36a090.js";import{u as g}from"./geolocation-info.d9ba8874.js";import{M as d}from"./MainMapGoogle.be2bab28.js";import"./QSlider.d0c7004e.js";import"./QCard.b49062bf.js";import"./use-timeout.73148d2e.js";import"./TouchPan.9b477211.js";import"./selection.29c34721.js";import"./format.2a3572e1.js";import"./QDialog.26cad0e3.js";import"./ClosePopup.a207a740.js";import"./QSeparator.e8538014.js";import"./QItemSection.895976ec.js";import"./QList.0c8e24b6.js";const u={name:"HomePage",components:{MainMapGoogle:d},data(){return{marketsList:[],latlng:"",myCoordinates:{lat:0,lng:0},geolocationInfo:null,$q:r()}},async mounted(){c().$patch({title:"Smart Price",showBackIcon:!1}),this.geolocationInfo=g();try{let t=await this.getPosition();this.myCoordinates.lat=t.coords.latitude,this.myCoordinates.lng=t.coords.longitude,this.latlng=this.myCoordinates.lat+","+this.myCoordinates.lng,this.fetchLocationsWithin()}catch{this.$q.notify({type:"negative",position:"top",message:"Something went wrong while fetching locations!",color:"negative",timeout:"2500"})}},methods:{getPosition(){return new Promise((o,t)=>{navigator.geolocation.getCurrentPosition(o,t)})},async fetchLocationsWithin(o){try{o&&this.geolocationInfo.$patch({radius:o});const t=await this.$api.get(`/locations/locations-within/${this.geolocationInfo.$state.radius}/center/${this.latlng}`);this.marketsList=t.data.marketsWithin}catch{this.$q.notify({type:"negative",position:"top",message:"Something went wrong while fetching locations!",color:"negative",timeout:"2500"})}}},computed:{locationsToBeDisplayed(){const o=[];return this.marketsList.map(t=>{t.locations.forEach(e=>{o.push({location:e,market:{logo:t.market.logo,_id:t.market._id}})})}),o}}};function f(o,t,e,y,a,i){const n=l("MainMapGoogle");return m(),h("div",null,[p(n,{marketsList:i.locationsToBeDisplayed,myCoordinates:a.myCoordinates,onOnSliderChanged:i.fetchLocationsWithin},null,8,["marketsList","myCoordinates","onOnSliderChanged"])])}var G=s(u,[["render",f]]);export{G as default};
