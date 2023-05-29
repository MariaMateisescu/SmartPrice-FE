import { _ as _export_sfc, c6 as useQuasar, bB as useDashHeaderStore, o as openBlock, c as createElementBlock, aa as createVNode, aL as resolveComponent } from "./index.0ce84b9b.js";
import { u as useGeolocationInfoStore } from "./geolocation-info.ddca1c37.js";
import { M as MainMapGoogle } from "./MainMapGoogle.d046545f.js";
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
import "./QList.1941924d.js";
const _sfc_main = {
  name: "HomePage",
  components: {
    MainMapGoogle
  },
  data() {
    return {
      marketsList: [],
      latlng: "",
      myCoordinates: {
        lat: 0,
        lng: 0
      },
      geolocationInfo: null,
      $q: useQuasar()
    };
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Smart Price",
      showBackIcon: false
    });
    this.geolocationInfo = useGeolocationInfoStore();
    try {
      let position = await this.getPosition();
      this.myCoordinates.lat = position.coords.latitude;
      this.myCoordinates.lng = position.coords.longitude;
      this.latlng = this.myCoordinates.lat + "," + this.myCoordinates.lng;
      this.fetchLocationsWithin();
    } catch (err) {
      this.$q.notify({
        type: "negative",
        position: "top",
        message: "Something went wrong while fetching locations!",
        color: "negative",
        timeout: "2500"
      });
    }
  },
  methods: {
    getPosition() {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    },
    async fetchLocationsWithin(newRadius) {
      try {
        if (newRadius)
          this.geolocationInfo.$patch({
            radius: newRadius
          });
        const resWithin = await this.$api.get(
          `/locations/locations-within/${this.geolocationInfo.$state.radius}/center/${this.latlng}`
        );
        this.marketsList = resWithin.data.marketsWithin;
      } catch (err) {
        this.$q.notify({
          type: "negative",
          position: "top",
          message: "Something went wrong while fetching locations!",
          color: "negative",
          timeout: "2500"
        });
      }
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
var HomePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "HomePage.vue"]]);
export { HomePage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG9tZVBhZ2UuNmExM2MxZDYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9Ib21lUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxNYWluTWFwR29vZ2xlXG4gICAgICA6bWFya2V0c0xpc3Q9XCJsb2NhdGlvbnNUb0JlRGlzcGxheWVkXCJcbiAgICAgIDpteUNvb3JkaW5hdGVzPVwibXlDb29yZGluYXRlc1wiXG4gICAgICBAb25TbGlkZXJDaGFuZ2VkPVwiZmV0Y2hMb2NhdGlvbnNXaXRoaW5cIlxuICAgIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IHVzZURhc2hIZWFkZXJTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Rhc2gtaGVhZGVyXCI7XG5pbXBvcnQgeyB1c2VHZW9sb2NhdGlvbkluZm9TdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2dlb2xvY2F0aW9uLWluZm9cIjtcbmltcG9ydCBNYWluTWFwR29vZ2xlIGZyb20gXCJzcmMvY29tcG9uZW50cy9jdXN0b21lci9NYWluTWFwR29vZ2xlLnZ1ZVwiO1xuaW1wb3J0IHVzZVF1YXNhciBmcm9tIFwicXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtcXVhc2FyLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogXCJIb21lUGFnZVwiLFxuICBjb21wb25lbnRzOiB7XG4gICAgTWFpbk1hcEdvb2dsZSxcbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWFya2V0c0xpc3Q6IFtdLFxuICAgICAgbGF0bG5nOiBcIlwiLFxuICAgICAgbXlDb29yZGluYXRlczoge1xuICAgICAgICBsYXQ6IDAsXG4gICAgICAgIGxuZzogMCxcbiAgICAgIH0sXG4gICAgICBnZW9sb2NhdGlvbkluZm86IG51bGwsXG4gICAgICAkcTogdXNlUXVhc2FyKCksXG4gICAgfTtcbiAgfSxcbiAgYXN5bmMgbW91bnRlZCgpIHtcbiAgICBjb25zdCBkYXNoSGVhZGVyID0gdXNlRGFzaEhlYWRlclN0b3JlKCk7XG4gICAgZGFzaEhlYWRlci4kcGF0Y2goe1xuICAgICAgdGl0bGU6IFwiU21hcnQgUHJpY2VcIixcbiAgICAgIHNob3dCYWNrSWNvbjogZmFsc2UsXG4gICAgfSk7XG4gICAgdGhpcy5nZW9sb2NhdGlvbkluZm8gPSB1c2VHZW9sb2NhdGlvbkluZm9TdG9yZSgpO1xuICAgIHRyeSB7XG4gICAgICBsZXQgcG9zaXRpb24gPSBhd2FpdCB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgICB0aGlzLm15Q29vcmRpbmF0ZXMubGF0ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICAgICAgdGhpcy5teUNvb3JkaW5hdGVzLmxuZyA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgICB0aGlzLmxhdGxuZyA9IHRoaXMubXlDb29yZGluYXRlcy5sYXQgKyBcIixcIiArIHRoaXMubXlDb29yZGluYXRlcy5sbmc7XG4gICAgICB0aGlzLmZldGNoTG9jYXRpb25zV2l0aGluKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLiRxLm5vdGlmeSh7XG4gICAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgICAgcG9zaXRpb246IFwidG9wXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgZmV0Y2hpbmcgbG9jYXRpb25zIVwiLFxuICAgICAgICBjb2xvcjogXCJuZWdhdGl2ZVwiLFxuICAgICAgICB0aW1lb3V0OiBcIjI1MDBcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGdldFBvc2l0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHJlcywgcmVqKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgYXN5bmMgZmV0Y2hMb2NhdGlvbnNXaXRoaW4obmV3UmFkaXVzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAobmV3UmFkaXVzKVxuICAgICAgICAgIHRoaXMuZ2VvbG9jYXRpb25JbmZvLiRwYXRjaCh7XG4gICAgICAgICAgICByYWRpdXM6IG5ld1JhZGl1cyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmVzV2l0aGluID0gYXdhaXQgdGhpcy4kYXBpLmdldChcbiAgICAgICAgICBgL2xvY2F0aW9ucy9sb2NhdGlvbnMtd2l0aGluLyR7dGhpcy5nZW9sb2NhdGlvbkluZm8uJHN0YXRlLnJhZGl1c30vY2VudGVyLyR7dGhpcy5sYXRsbmd9YFxuICAgICAgICApO1xuICAgICAgICB0aGlzLm1hcmtldHNMaXN0ID0gcmVzV2l0aGluLmRhdGEubWFya2V0c1dpdGhpbjtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB0aGlzLiRxLm5vdGlmeSh7XG4gICAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgZmV0Y2hpbmcgbG9jYXRpb25zIVwiLFxuICAgICAgICAgIGNvbG9yOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgICAgdGltZW91dDogXCIyNTAwXCIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgbG9jYXRpb25zVG9CZURpc3BsYXllZCgpIHtcbiAgICAgIGNvbnN0IGxvY2F0aW9ucyA9IFtdO1xuICAgICAgdGhpcy5tYXJrZXRzTGlzdC5tYXAoKG1hcmtldCkgPT4ge1xuICAgICAgICBtYXJrZXQubG9jYXRpb25zLmZvckVhY2goKGxvYykgPT4ge1xuICAgICAgICAgIGxvY2F0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2MsXG4gICAgICAgICAgICBtYXJrZXQ6IHsgbG9nbzogbWFya2V0Lm1hcmtldC5sb2dvLCBfaWQ6IG1hcmtldC5tYXJrZXQuX2lkIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbG9jYXRpb25zO1xuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+PC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2NyZWF0ZVZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxNQUFLLFlBQVU7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLFlBQVk7QUFBQSxJQUNWO0FBQUEsRUFDRDtBQUFBLEVBQ0QsT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLGFBQWEsQ0FBRTtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsZUFBZTtBQUFBLFFBQ2IsS0FBSztBQUFBLFFBQ0wsS0FBSztBQUFBLE1BQ047QUFBQSxNQUNELGlCQUFpQjtBQUFBLE1BQ2pCLElBQUksVUFBVztBQUFBO0VBRWxCO0FBQUEsRUFDRCxNQUFNLFVBQVU7QUFDZCxVQUFNLGFBQWE7QUFDbkIsZUFBVyxPQUFPO0FBQUEsTUFDaEIsT0FBTztBQUFBLE1BQ1AsY0FBYztBQUFBLElBQ2hCLENBQUM7QUFDRCxTQUFLLGtCQUFrQjtBQUN2QixRQUFJO0FBQ0YsVUFBSSxXQUFXLE1BQU0sS0FBSztBQUMxQixXQUFLLGNBQWMsTUFBTSxTQUFTLE9BQU87QUFDekMsV0FBSyxjQUFjLE1BQU0sU0FBUyxPQUFPO0FBQ3pDLFdBQUssU0FBUyxLQUFLLGNBQWMsTUFBTSxNQUFNLEtBQUssY0FBYztBQUNoRSxXQUFLLHFCQUFvQjtBQUFBLElBQ3pCLFNBQU8sS0FBUDtBQUNBLFdBQUssR0FBRyxPQUFPO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsTUFDWCxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Q7QUFBQSxFQUNELFNBQVM7QUFBQSxJQUNQLGNBQWM7QUFDWixhQUFPLElBQUksUUFBUSxDQUFDLEtBQUssUUFBUTtBQUMvQixrQkFBVSxZQUFZLG1CQUFtQixLQUFLLEdBQUc7QUFBQSxNQUNuRCxDQUFDO0FBQUEsSUFDRjtBQUFBLElBQ0QsTUFBTSxxQkFBcUIsV0FBVztBQUNwQyxVQUFJO0FBQ0YsWUFBSTtBQUNGLGVBQUssZ0JBQWdCLE9BQU87QUFBQSxZQUMxQixRQUFRO0FBQUEsVUFDVixDQUFDO0FBQ0gsY0FBTSxZQUFZLE1BQU0sS0FBSyxLQUFLO0FBQUEsVUFDaEMsK0JBQStCLEtBQUssZ0JBQWdCLE9BQU8saUJBQWlCLEtBQUs7QUFBQTtBQUVuRixhQUFLLGNBQWMsVUFBVSxLQUFLO0FBQUEsTUFDbEMsU0FBTyxLQUFQO0FBQ0EsYUFBSyxHQUFHLE9BQU87QUFBQSxVQUNiLE1BQU07QUFBQSxVQUNOLFVBQVU7QUFBQSxVQUNWLFNBQVM7QUFBQSxVQUNULE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxRQUNYLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRDtBQUFBLEVBQ0Y7QUFBQSxFQUNELFVBQVU7QUFBQSxJQUNSLHlCQUF5QjtBQUN2QixZQUFNLFlBQVksQ0FBQTtBQUNsQixXQUFLLFlBQVksSUFBSSxDQUFDLFdBQVc7QUFDL0IsZUFBTyxVQUFVLFFBQVEsQ0FBQyxRQUFRO0FBQ2hDLG9CQUFVLEtBQUs7QUFBQSxZQUNiLFVBQVU7QUFBQSxZQUNWLFFBQVEsRUFBRSxNQUFNLE9BQU8sT0FBTyxNQUFNLEtBQUssT0FBTyxPQUFPLElBQUs7QUFBQSxVQUM5RCxDQUFDO0FBQUEsUUFDSCxDQUFDO0FBQUEsTUFDSCxDQUFDO0FBQ0QsYUFBTztBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQ0g7OztzQkFoR0VBLG1CQU1NLE9BQUEsTUFBQTtBQUFBLElBTEpDLFlBSUUsMEJBQUE7QUFBQSxNQUhDLGFBQWEsU0FBc0I7QUFBQSxNQUNuQyxlQUFlLE1BQWE7QUFBQSxNQUM1QixtQkFBaUIsU0FBb0I7QUFBQTs7Ozs7In0=
