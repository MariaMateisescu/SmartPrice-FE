import { M as MainMapGoogle } from "./MainMapGoogle.d046545f.js";
import { _ as _export_sfc, bB as useDashHeaderStore, o as openBlock, c as createElementBlock, aa as createVNode, aL as resolveComponent } from "./index.0ce84b9b.js";
import "./QSlider.40059c2e.js";
import "./use-form.e754bc19.js";
import "./TouchPan.43131768.js";
import "./selection.0c91ca54.js";
import "./use-dark.089fd8b8.js";
import "./format.2a3572e1.js";
import "./QDialog.27e255cd.js";
import "./use-timeout.0140a5e1.js";
import "./ClosePopup.fcd43a0a.js";
import "./focus-manager.d6507951.js";
import "./QCard.511536db.js";
import "./QSeparator.96f0308a.js";
import "./QItem.742a43b4.js";
import "./geolocation-info.ddca1c37.js";
import "./QList.1941924d.js";
const _sfc_main = {
  name: "HomePage",
  components: {
    MainMapGoogle
  },
  data() {
    return {
      marketsList: [],
      radius: 4,
      latlng: "",
      myCoordinates: {
        lat: 0,
        lng: 0
      }
    };
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({ title: "Smart Price", showBackIcon: false });
    try {
      let position = await this.getPosition();
      this.myCoordinates.lat = position.coords.latitude;
      this.myCoordinates.lng = position.coords.longitude;
      this.latlng = this.myCoordinates.lat + "," + this.myCoordinates.lng;
      this.fetchLocationsWithin();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    getPosition() {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    },
    async fetchLocationsWithin(newRadius) {
      if (newRadius)
        this.radius = newRadius;
      const resWithin = await this.$api.get(
        `/locations/locations-within/${this.radius}/center/${this.latlng}`
      );
      this.marketsList = resWithin.data.marketsWithin;
    }
  },
  computed: {
    locationsToBeDisplayed() {
      const locations = [];
      this.marketsList.map((market) => {
        market.locations.forEach((loc) => {
          locations.push({
            location: loc,
            market: { logo: market.market.logo, _id: market.market._id }
          });
        });
      });
      return locations;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MainMapGoogle = resolveComponent("MainMapGoogle");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_MainMapGoogle, {
      marketsList: $options.locationsToBeDisplayed,
      myCoordinates: $data.myCoordinates,
      onOnSliderChanged: $options.fetchLocationsWithin
    }, null, 8, ["marketsList", "myCoordinates", "onOnSliderChanged"])
  ]);
}
var AdminHomePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "AdminHomePage.vue"]]);
export { AdminHomePage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5Ib21lUGFnZS5lMmVmNzQwZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0aW9uL0FkbWluSG9tZVBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG4gICAgPE1haW5NYXBHb29nbGVcclxuICAgICAgOm1hcmtldHNMaXN0PVwibG9jYXRpb25zVG9CZURpc3BsYXllZFwiXHJcbiAgICAgIDpteUNvb3JkaW5hdGVzPVwibXlDb29yZGluYXRlc1wiXHJcbiAgICAgIEBvblNsaWRlckNoYW5nZWQ9XCJmZXRjaExvY2F0aW9uc1dpdGhpblwiXHJcbiAgICAvPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IE1haW5NYXBHb29nbGUgZnJvbSBcInNyYy9jb21wb25lbnRzL2N1c3RvbWVyL01haW5NYXBHb29nbGUudnVlXCI7XHJcbmltcG9ydCB7IHVzZURhc2hIZWFkZXJTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Rhc2gtaGVhZGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogXCJIb21lUGFnZVwiLFxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIE1haW5NYXBHb29nbGUsXHJcbiAgfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWFya2V0c0xpc3Q6IFtdLFxyXG4gICAgICByYWRpdXM6IDQsXHJcbiAgICAgIGxhdGxuZzogXCJcIixcclxuICAgICAgbXlDb29yZGluYXRlczoge1xyXG4gICAgICAgIGxhdDogMCxcclxuICAgICAgICBsbmc6IDAsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgYXN5bmMgbW91bnRlZCgpIHtcclxuICAgIGNvbnN0IGRhc2hIZWFkZXIgPSB1c2VEYXNoSGVhZGVyU3RvcmUoKTtcclxuICAgIGRhc2hIZWFkZXIuJHBhdGNoKHsgdGl0bGU6IFwiU21hcnQgUHJpY2VcIiwgc2hvd0JhY2tJY29uOiBmYWxzZSB9KTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBwb3NpdGlvbiA9IGF3YWl0IHRoaXMuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgdGhpcy5teUNvb3JkaW5hdGVzLmxhdCA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcclxuICAgICAgdGhpcy5teUNvb3JkaW5hdGVzLmxuZyA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XHJcbiAgICAgIHRoaXMubGF0bG5nID0gdGhpcy5teUNvb3JkaW5hdGVzLmxhdCArIFwiLFwiICsgdGhpcy5teUNvb3JkaW5hdGVzLmxuZztcclxuICAgICAgdGhpcy5mZXRjaExvY2F0aW9uc1dpdGhpbigpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBnZXRQb3NpdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xyXG4gICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24ocmVzLCByZWopO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBmZXRjaExvY2F0aW9uc1dpdGhpbihuZXdSYWRpdXMpIHtcclxuICAgICAgaWYgKG5ld1JhZGl1cykgdGhpcy5yYWRpdXMgPSBuZXdSYWRpdXM7XHJcbiAgICAgIGNvbnN0IHJlc1dpdGhpbiA9IGF3YWl0IHRoaXMuJGFwaS5nZXQoXHJcbiAgICAgICAgYC9sb2NhdGlvbnMvbG9jYXRpb25zLXdpdGhpbi8ke3RoaXMucmFkaXVzfS9jZW50ZXIvJHt0aGlzLmxhdGxuZ31gXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMubWFya2V0c0xpc3QgPSByZXNXaXRoaW4uZGF0YS5tYXJrZXRzV2l0aGluO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICBsb2NhdGlvbnNUb0JlRGlzcGxheWVkKCkge1xyXG4gICAgICBjb25zdCBsb2NhdGlvbnMgPSBbXTtcclxuICAgICAgdGhpcy5tYXJrZXRzTGlzdC5tYXAoKG1hcmtldCkgPT4ge1xyXG4gICAgICAgIG1hcmtldC5sb2NhdGlvbnMuZm9yRWFjaCgobG9jKSA9PiB7XHJcbiAgICAgICAgICBsb2NhdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2MsXHJcbiAgICAgICAgICAgIG1hcmtldDogeyBsb2dvOiBtYXJrZXQubWFya2V0LmxvZ28sIF9pZDogbWFya2V0Lm1hcmtldC5faWQgfSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGxvY2F0aW9ucztcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2NyZWF0ZVZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWNBLE1BQUssWUFBVTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sWUFBWTtBQUFBLElBQ1Y7QUFBQSxFQUNEO0FBQUEsRUFDRCxPQUFPO0FBQ0wsV0FBTztBQUFBLE1BQ0wsYUFBYSxDQUFFO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixlQUFlO0FBQUEsUUFDYixLQUFLO0FBQUEsUUFDTCxLQUFLO0FBQUEsTUFDTjtBQUFBO0VBRUo7QUFBQSxFQUNELE1BQU0sVUFBVTtBQUNkLFVBQU0sYUFBYTtBQUNuQixlQUFXLE9BQU8sRUFBRSxPQUFPLGVBQWUsY0FBYyxNQUFNLENBQUM7QUFDL0QsUUFBSTtBQUNGLFVBQUksV0FBVyxNQUFNLEtBQUs7QUFDMUIsV0FBSyxjQUFjLE1BQU0sU0FBUyxPQUFPO0FBQ3pDLFdBQUssY0FBYyxNQUFNLFNBQVMsT0FBTztBQUN6QyxXQUFLLFNBQVMsS0FBSyxjQUFjLE1BQU0sTUFBTSxLQUFLLGNBQWM7QUFDaEUsV0FBSyxxQkFBb0I7QUFBQSxJQUN6QixTQUFPLEtBQVA7QUFDQSxjQUFRLElBQUksR0FBRztBQUFBLElBQ2pCO0FBQUEsRUFDRDtBQUFBLEVBQ0QsU0FBUztBQUFBLElBQ1AsY0FBYztBQUNaLGFBQU8sSUFBSSxRQUFRLENBQUMsS0FBSyxRQUFRO0FBQy9CLGtCQUFVLFlBQVksbUJBQW1CLEtBQUssR0FBRztBQUFBLE1BQ25ELENBQUM7QUFBQSxJQUNGO0FBQUEsSUFDRCxNQUFNLHFCQUFxQixXQUFXO0FBQ3BDLFVBQUk7QUFBVyxhQUFLLFNBQVM7QUFDN0IsWUFBTSxZQUFZLE1BQU0sS0FBSyxLQUFLO0FBQUEsUUFDaEMsK0JBQStCLEtBQUssaUJBQWlCLEtBQUs7QUFBQTtBQUU1RCxXQUFLLGNBQWMsVUFBVSxLQUFLO0FBQUEsSUFDbkM7QUFBQSxFQUNGO0FBQUEsRUFDRCxVQUFVO0FBQUEsSUFDUix5QkFBeUI7QUFDdkIsWUFBTSxZQUFZLENBQUE7QUFDbEIsV0FBSyxZQUFZLElBQUksQ0FBQyxXQUFXO0FBQy9CLGVBQU8sVUFBVSxRQUFRLENBQUMsUUFBUTtBQUNoQyxvQkFBVSxLQUFLO0FBQUEsWUFDYixVQUFVO0FBQUEsWUFDVixRQUFRLEVBQUUsTUFBTSxPQUFPLE9BQU8sTUFBTSxLQUFLLE9BQU8sT0FBTyxJQUFLO0FBQUEsVUFDOUQsQ0FBQztBQUFBLFFBQ0gsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUNELGFBQU87QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUNIOzs7c0JBdEVFQSxtQkFNTSxPQUFBLE1BQUE7QUFBQSxJQUxKQyxZQUlFLDBCQUFBO0FBQUEsTUFIQyxhQUFhLFNBQXNCO0FBQUEsTUFDbkMsZUFBZSxNQUFhO0FBQUEsTUFDNUIsbUJBQWlCLFNBQW9CO0FBQUE7Ozs7OyJ9
