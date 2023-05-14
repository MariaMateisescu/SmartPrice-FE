import { _ as _export_sfc, bB as useDashHeaderStore, o as openBlock, c as createElementBlock, aa as createVNode, aL as resolveComponent } from "./index.5a14f3c4.js";
import { u as useGeolocationInfoStore } from "./QSlider.30a19e1e.js";
import { M as MainMapGoogle } from "./MainMapGoogle.60dd259b.js";
import "./use-form.0026fe71.js";
import "./TouchPan.0f0bed18.js";
import "./touch.70a9dd44.js";
import "./selection.f977ff01.js";
import "./use-dark.a5d47983.js";
import "./format.2a3572e1.js";
import "./QDialog.8f997d51.js";
import "./use-timeout.a3a7dc24.js";
import "./ClosePopup.262ce3d8.js";
import "./focus-manager.d6507951.js";
import "./QCard.133f47d5.js";
import "./QSeparator.8089b31c.js";
import "./QItem.aec05661.js";
import "./QList.70a760ee.js";
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
      geolocationInfo: null
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
        this.geolocationInfo.$patch({
          radius: newRadius
        });
      console.log(this.geolocationInfo.$state.radius);
      const resWithin = await this.$api.get(
        `/locations/locations-within/${this.geolocationInfo.$state.radius}/center/${this.latlng}`
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
      console.log(locations);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG9tZVBhZ2UuZGRhN2M0MzMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9Ib21lUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxNYWluTWFwR29vZ2xlXG4gICAgICA6bWFya2V0c0xpc3Q9XCJsb2NhdGlvbnNUb0JlRGlzcGxheWVkXCJcbiAgICAgIDpteUNvb3JkaW5hdGVzPVwibXlDb29yZGluYXRlc1wiXG4gICAgICBAb25TbGlkZXJDaGFuZ2VkPVwiZmV0Y2hMb2NhdGlvbnNXaXRoaW5cIlxuICAgIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IHVzZURhc2hIZWFkZXJTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Rhc2gtaGVhZGVyXCI7XG5pbXBvcnQgeyB1c2VHZW9sb2NhdGlvbkluZm9TdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2dlb2xvY2F0aW9uLWluZm9cIjtcbmltcG9ydCBNYWluTWFwR29vZ2xlIGZyb20gXCJzcmMvY29tcG9uZW50cy9jdXN0b21lci9NYWluTWFwR29vZ2xlLnZ1ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6IFwiSG9tZVBhZ2VcIixcbiAgY29tcG9uZW50czoge1xuICAgIE1haW5NYXBHb29nbGUsXG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1hcmtldHNMaXN0OiBbXSxcbiAgICAgIGxhdGxuZzogXCJcIixcbiAgICAgIG15Q29vcmRpbmF0ZXM6IHtcbiAgICAgICAgbGF0OiAwLFxuICAgICAgICBsbmc6IDAsXG4gICAgICB9LFxuICAgICAgZ2VvbG9jYXRpb25JbmZvOiBudWxsLFxuICAgIH07XG4gIH0sXG4gIGFzeW5jIG1vdW50ZWQoKSB7XG4gICAgY29uc3QgZGFzaEhlYWRlciA9IHVzZURhc2hIZWFkZXJTdG9yZSgpO1xuICAgIGRhc2hIZWFkZXIuJHBhdGNoKHtcbiAgICAgIHRpdGxlOiBcIlNtYXJ0IFByaWNlXCIsXG4gICAgICBzaG93QmFja0ljb246IGZhbHNlLFxuICAgIH0pO1xuICAgIHRoaXMuZ2VvbG9jYXRpb25JbmZvID0gdXNlR2VvbG9jYXRpb25JbmZvU3RvcmUoKTtcbiAgICB0cnkge1xuICAgICAgbGV0IHBvc2l0aW9uID0gYXdhaXQgdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgICAgdGhpcy5teUNvb3JkaW5hdGVzLmxhdCA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICAgIHRoaXMubXlDb29yZGluYXRlcy5sbmcgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuICAgICAgdGhpcy5sYXRsbmcgPSB0aGlzLm15Q29vcmRpbmF0ZXMubGF0ICsgXCIsXCIgKyB0aGlzLm15Q29vcmRpbmF0ZXMubG5nO1xuICAgICAgdGhpcy5mZXRjaExvY2F0aW9uc1dpdGhpbigpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihyZXMsIHJlaik7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGFzeW5jIGZldGNoTG9jYXRpb25zV2l0aGluKG5ld1JhZGl1cykge1xuICAgICAgaWYgKG5ld1JhZGl1cylcbiAgICAgICAgdGhpcy5nZW9sb2NhdGlvbkluZm8uJHBhdGNoKHtcbiAgICAgICAgICByYWRpdXM6IG5ld1JhZGl1cyxcbiAgICAgICAgfSk7XG4gICAgICAvL3RoaXMucmFkaXVzID0gbmV3UmFkaXVzO1xuICAgICAgY29uc29sZS5sb2codGhpcy5nZW9sb2NhdGlvbkluZm8uJHN0YXRlLnJhZGl1cyk7XG4gICAgICBjb25zdCByZXNXaXRoaW4gPSBhd2FpdCB0aGlzLiRhcGkuZ2V0KFxuICAgICAgICBgL2xvY2F0aW9ucy9sb2NhdGlvbnMtd2l0aGluLyR7dGhpcy5nZW9sb2NhdGlvbkluZm8uJHN0YXRlLnJhZGl1c30vY2VudGVyLyR7dGhpcy5sYXRsbmd9YFxuICAgICAgKTtcbiAgICAgIHRoaXMubWFya2V0c0xpc3QgPSByZXNXaXRoaW4uZGF0YS5tYXJrZXRzV2l0aGluO1xuICAgIH0sXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgbG9jYXRpb25zVG9CZURpc3BsYXllZCgpIHtcbiAgICAgIGNvbnN0IGxvY2F0aW9ucyA9IFtdO1xuICAgICAgdGhpcy5tYXJrZXRzTGlzdC5tYXAoKG1hcmtldCkgPT4ge1xuICAgICAgICBtYXJrZXQubG9jYXRpb25zLmZvckVhY2goKGxvYykgPT4ge1xuICAgICAgICAgIGxvY2F0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2MsXG4gICAgICAgICAgICBtYXJrZXQ6IHsgbG9nbzogbWFya2V0Lm1hcmtldC5sb2dvLCBfaWQ6IG1hcmtldC5tYXJrZXQuX2lkIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZyhsb2NhdGlvbnMpO1xuICAgICAgcmV0dXJuIGxvY2F0aW9ucztcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxNQUFLLFlBQVU7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLFlBQVk7QUFBQSxJQUNWO0FBQUEsRUFDRDtBQUFBLEVBQ0QsT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLGFBQWEsQ0FBRTtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsZUFBZTtBQUFBLFFBQ2IsS0FBSztBQUFBLFFBQ0wsS0FBSztBQUFBLE1BQ047QUFBQSxNQUNELGlCQUFpQjtBQUFBO0VBRXBCO0FBQUEsRUFDRCxNQUFNLFVBQVU7QUFDZCxVQUFNLGFBQWE7QUFDbkIsZUFBVyxPQUFPO0FBQUEsTUFDaEIsT0FBTztBQUFBLE1BQ1AsY0FBYztBQUFBLElBQ2hCLENBQUM7QUFDRCxTQUFLLGtCQUFrQjtBQUN2QixRQUFJO0FBQ0YsVUFBSSxXQUFXLE1BQU0sS0FBSztBQUMxQixXQUFLLGNBQWMsTUFBTSxTQUFTLE9BQU87QUFDekMsV0FBSyxjQUFjLE1BQU0sU0FBUyxPQUFPO0FBQ3pDLFdBQUssU0FBUyxLQUFLLGNBQWMsTUFBTSxNQUFNLEtBQUssY0FBYztBQUNoRSxXQUFLLHFCQUFvQjtBQUFBLElBQ3pCLFNBQU8sS0FBUDtBQUNBLGNBQVEsSUFBSSxHQUFHO0FBQUEsSUFDakI7QUFBQSxFQUNEO0FBQUEsRUFDRCxTQUFTO0FBQUEsSUFDUCxjQUFjO0FBQ1osYUFBTyxJQUFJLFFBQVEsQ0FBQyxLQUFLLFFBQVE7QUFDL0Isa0JBQVUsWUFBWSxtQkFBbUIsS0FBSyxHQUFHO0FBQUEsTUFDbkQsQ0FBQztBQUFBLElBQ0Y7QUFBQSxJQUNELE1BQU0scUJBQXFCLFdBQVc7QUFDcEMsVUFBSTtBQUNGLGFBQUssZ0JBQWdCLE9BQU87QUFBQSxVQUMxQixRQUFRO0FBQUEsUUFDVixDQUFDO0FBRUgsY0FBUSxJQUFJLEtBQUssZ0JBQWdCLE9BQU8sTUFBTTtBQUM5QyxZQUFNLFlBQVksTUFBTSxLQUFLLEtBQUs7QUFBQSxRQUNoQywrQkFBK0IsS0FBSyxnQkFBZ0IsT0FBTyxpQkFBaUIsS0FBSztBQUFBO0FBRW5GLFdBQUssY0FBYyxVQUFVLEtBQUs7QUFBQSxJQUNuQztBQUFBLEVBQ0Y7QUFBQSxFQUNELFVBQVU7QUFBQSxJQUNSLHlCQUF5QjtBQUN2QixZQUFNLFlBQVksQ0FBQTtBQUNsQixXQUFLLFlBQVksSUFBSSxDQUFDLFdBQVc7QUFDL0IsZUFBTyxVQUFVLFFBQVEsQ0FBQyxRQUFRO0FBQ2hDLG9CQUFVLEtBQUs7QUFBQSxZQUNiLFVBQVU7QUFBQSxZQUNWLFFBQVEsRUFBRSxNQUFNLE9BQU8sT0FBTyxNQUFNLEtBQUssT0FBTyxPQUFPLElBQUs7QUFBQSxVQUM5RCxDQUFDO0FBQUEsUUFDSCxDQUFDO0FBQUEsTUFDSCxDQUFDO0FBQ0QsY0FBUSxJQUFJLFNBQVM7QUFDckIsYUFBTztBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQ0g7OztzQkFqRkVBLG1CQU1NLE9BQUEsTUFBQTtBQUFBLElBTEpDLFlBSUUsMEJBQUE7QUFBQSxNQUhDLGFBQWEsU0FBc0I7QUFBQSxNQUNuQyxlQUFlLE1BQWE7QUFBQSxNQUM1QixtQkFBaUIsU0FBb0I7QUFBQTs7Ozs7In0=
