import { Q as QSlider } from "./QSlider.40059c2e.js";
import { Q as QSpace, a as QDialog } from "./QDialog.27e255cd.js";
import { _ as _export_sfc, o as openBlock, c as createElementBlock, a as createBaseVNode, aa as createVNode, bC as QIcon, M as toDisplayString, b5 as withCtx, a2 as createBlock, Q as Fragment, aK as renderList, a3 as createCommentVNode, bA as useUserStore, aL as resolveComponent, d as normalizeClass, b7 as withDirectives, bE as QBtn, a9 as createTextVNode, bT as Ripple, aH as pushScopeId, aF as popScopeId } from "./index.0ce84b9b.js";
import { Q as QCard, a as QCardSection } from "./QCard.511536db.js";
import { Q as QSeparator } from "./QSeparator.96f0308a.js";
import { Q as QItem, a as QItemSection } from "./QItem.742a43b4.js";
import { C as ClosePopup } from "./ClosePopup.fcd43a0a.js";
import { u as useGeolocationInfoStore } from "./geolocation-info.ddca1c37.js";
import { Q as QList } from "./QList.1941924d.js";
var dot = "assets/bluedot.122d0e85.png";
var ProductsInCategoryInLocation_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = {
  name: "ProductsInCategoryInLocation",
  emits: ["goBackToCategories"],
  props: ["categoryInfo", "locationInfo"],
  data() {
    return {
      products: []
    };
  },
  async mounted() {
    console.log("text", this.locationInfo);
    const res = await this.$api.get(
      `/categories/${this.locationInfo.location._id}/${this.categoryInfo._id}`
    );
    this.products = res.data.data.productsInCategoryInLocation;
    console.log(this.products);
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", null, [
      createVNode(QSeparator),
      createVNode(QIcon, {
        name: "arrow_back_ios",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("goBackToCategories"))
      }),
      createBaseVNode("strong", null, toDisplayString($props.categoryInfo.name), 1),
      createVNode(QSeparator)
    ]),
    createVNode(QCard, null, {
      default: withCtx(() => [
        $data.products.length ? (openBlock(), createBlock(QList, {
          key: 0,
          dense: "",
          bordered: "",
          padding: "",
          class: "rounded-borders"
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.products, (product) => {
              return openBlock(), createElementBlock("div", {
                key: product._id
              }, [
                product ? (openBlock(), createBlock(QItem, {
                  key: 0,
                  class: "flex justify-between"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", null, toDisplayString(product.brand) + " " + toDisplayString(product.name) + " " + toDisplayString(product.weight), 1),
                    createBaseVNode("div", null, toDisplayString(product.price) + " lei", 1)
                  ]),
                  _: 2
                }, 1024)) : createCommentVNode("", true)
              ]);
            }), 128))
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ]),
      _: 1
    })
  ], 64);
}
var ProductsInCategoryInLocation = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-7d46b53e"], ["__file", "ProductsInCategoryInLocation.vue"]]);
var MainMapGoogle_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  components: { ProductsInCategoryInLocation },
  data() {
    return {
      openedMarkerID: null,
      zoom: 13,
      currentLocationIcon: dot,
      circleOptions: {
        strokeColor: "#4c8bf5",
        strokeOpacity: 0.7,
        strokeWeight: 2,
        fillColor: "#4c8bf5",
        fillOpacity: 0.1
      },
      locationInfo: null,
      showLocationDetails: false,
      categories: [],
      categoryInfo: null
    };
  },
  setup() {
    const userStore = useUserStore();
    const geolocationInfo = useGeolocationInfoStore();
    return {
      userStore,
      geolocationInfo
    };
  },
  props: ["marketsList", "myCoordinates"],
  async mounted() {
    await this.fetchCategories();
  },
  methods: {
    openMarker(id) {
      this.openedMarkerID = id;
    },
    addKm(value) {
      return value + "km";
    },
    sliderChanged(newRadius) {
      this.$emit("onSliderChanged", newRadius);
    },
    showLocationDetailsDialog(location) {
      this.locationInfo = location;
      this.showLocationDetails = true;
      console.log(this.locationInfo);
    },
    async fetchCategories() {
      const res = await this.$api.get("/categories");
      this.categories = res.data.data.categories;
    },
    viewProductsInCategory(category) {
      this.categoryInfo = category;
    }
  },
  computed: {
    circleRadius() {
      return this.geolocationInfo.$state.radius * 1e3;
    },
    isAdmin() {
      return this.userStore.authUser && this.userStore.authUser.role === "admin";
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-6ae3e47b"), n = n(), popScopeId(), n);
const _hoisted_1 = ["onClick"];
const _hoisted_2 = { class: "slider-box" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Location details", -1));
const _hoisted_4 = { class: "logo-container" };
const _hoisted_5 = ["src"];
const _hoisted_6 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_GMapInfoWindow = resolveComponent("GMapInfoWindow");
  const _component_GMapMarker = resolveComponent("GMapMarker");
  const _component_GMapCircle = resolveComponent("GMapCircle");
  const _component_GMapMap = resolveComponent("GMapMap");
  const _component_ProductsInCategoryInLocation = resolveComponent("ProductsInCategoryInLocation");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_GMapMap, {
      center: $props.myCoordinates,
      zoom: $data.zoom,
      class: normalizeClass(["map-style", [
        $options.isAdmin ? "without-footer-map-height" : "with-footer-map-height"
      ]])
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.marketsList, (location, index) => {
          return openBlock(), createBlock(_component_GMapMarker, {
            key: index,
            position: location.location.coordinates,
            icon: {
              url: location.market.logo,
              scaledSize: { width: 30, height: 30 },
              labelOrigin: { x: 16, y: -10 }
            },
            clickable: true,
            onClick: ($event) => $options.openMarker(location.location._id)
          }, {
            default: withCtx(() => [
              createVNode(_component_GMapInfoWindow, {
                closeclick: true,
                onCloseclick: _cache[0] || (_cache[0] = ($event) => $options.openMarker(null)),
                opened: $data.openedMarkerID === location.location._id
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", null, toDisplayString(location.location.address), 1),
                  createBaseVNode("button", {
                    onClick: ($event) => $options.showLocationDetailsDialog(location),
                    class: "location-details-button"
                  }, " Details ", 8, _hoisted_1)
                ]),
                _: 2
              }, 1032, ["opened"])
            ]),
            _: 2
          }, 1032, ["position", "icon", "onClick"]);
        }), 128)),
        createVNode(_component_GMapMarker, {
          position: { lat: $props.myCoordinates.lat, lng: $props.myCoordinates.lng },
          icon: {
            url: $data.currentLocationIcon,
            scaledSize: { width: 18, height: 18 }
          }
        }, null, 8, ["position", "icon"]),
        createVNode(_component_GMapCircle, {
          radius: $options.circleRadius,
          center: { lat: $props.myCoordinates.lat, lng: $props.myCoordinates.lng },
          options: $data.circleOptions
        }, null, 8, ["radius", "center", "options"])
      ]),
      _: 1
    }, 8, ["center", "zoom", "class"]),
    createBaseVNode("div", _hoisted_2, [
      createVNode(QSlider, {
        class: "slider",
        modelValue: $setup.geolocationInfo.radius,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.geolocationInfo.radius = $event),
        markers: "",
        "marker-labels": $options.addKm,
        min: 1,
        max: 7,
        onChange: $options.sliderChanged
      }, null, 8, ["modelValue", "marker-labels", "onChange"])
    ]),
    createVNode(QDialog, {
      maximized: "",
      modelValue: $data.showLocationDetails,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.showLocationDetails = $event)
    }, {
      default: withCtx(() => [
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "row items-center q-pb-none" }, {
              default: withCtx(() => [
                _hoisted_3,
                createVNode(QSpace),
                withDirectives(createVNode(QBtn, {
                  icon: "close",
                  flat: "",
                  round: "",
                  dense: ""
                }, null, 512), [
                  [ClosePopup]
                ])
              ]),
              _: 1
            }),
            createVNode(QCardSection, { style: { "font-size": "16px" } }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_4, [
                  createBaseVNode("img", {
                    class: "logo",
                    src: $data.locationInfo.market.logo,
                    alt: "logo"
                  }, null, 8, _hoisted_5),
                  createBaseVNode("div", null, [
                    createBaseVNode("div", null, toDisplayString($data.locationInfo.location.name), 1),
                    createBaseVNode("div", null, "Adresa: " + toDisplayString($data.locationInfo.location.address), 1),
                    createBaseVNode("div", null, "Program: " + toDisplayString($data.locationInfo.location.openingHours), 1)
                  ])
                ]),
                createVNode(QSeparator),
                !$data.categoryInfo ? (openBlock(), createElementBlock("div", _hoisted_6, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($data.categories, (category) => {
                    return withDirectives((openBlock(), createBlock(QItem, {
                      clickable: "",
                      key: category._id
                    }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, {
                          thumbnail: "",
                          style: { "padding-left": "10px" }
                        }, {
                          default: withCtx(() => [
                            createVNode(QIcon, {
                              name: category.icon
                            }, null, 8, ["name"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          onClick: ($event) => $options.viewProductsInCategory(category)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(category.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 2
                    }, 1024)), [
                      [Ripple]
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true),
                $data.categoryInfo ? (openBlock(), createBlock(_component_ProductsInCategoryInLocation, {
                  key: 1,
                  categoryInfo: $data.categoryInfo,
                  locationInfo: $data.locationInfo,
                  onGoBackToCategories: _cache[2] || (_cache[2] = ($event) => $data.categoryInfo = null)
                }, null, 8, ["categoryInfo", "locationInfo"])) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ]);
}
var MainMapGoogle = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6ae3e47b"], ["__file", "MainMapGoogle.vue"]]);
export { MainMapGoogle as M };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbk1hcEdvb2dsZS5kMDQ2NTQ1Zi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Fzc2V0cy9ibHVlZG90LnBuZyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2N1c3RvbWVyL1Byb2R1Y3RzSW5DYXRlZ29yeUluTG9jYXRpb24udnVlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY3VzdG9tZXIvTWFpbk1hcEdvb2dsZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJfX1ZJVEVfQVNTRVRfXzEyMmQwZTg1X19cIiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG4gICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XHJcbiAgICA8cS1pY29uIG5hbWU9XCJhcnJvd19iYWNrX2lvc1wiIEBjbGljaz1cIiRlbWl0KCdnb0JhY2tUb0NhdGVnb3JpZXMnKVwiPjwvcS1pY29uPlxyXG4gICAgPHN0cm9uZz57eyBjYXRlZ29yeUluZm8ubmFtZSB9fTwvc3Ryb25nPlxyXG4gICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XHJcbiAgPC9kaXY+XHJcbiAgPHEtY2FyZD5cclxuICAgIDxxLWxpc3RcclxuICAgICAgZGVuc2VcclxuICAgICAgYm9yZGVyZWRcclxuICAgICAgcGFkZGluZ1xyXG4gICAgICBjbGFzcz1cInJvdW5kZWQtYm9yZGVyc1wiXHJcbiAgICAgIHYtaWY9XCJwcm9kdWN0cy5sZW5ndGhcIlxyXG4gICAgPlxyXG4gICAgICA8ZGl2IHYtZm9yPVwicHJvZHVjdCBpbiBwcm9kdWN0c1wiIDprZXk9XCJwcm9kdWN0Ll9pZFwiPlxyXG4gICAgICAgIDxxLWl0ZW0gdi1pZj1cInByb2R1Y3RcIiBjbGFzcz1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XHJcbiAgICAgICAgICA8ZGl2Pnt7IHByb2R1Y3QuYnJhbmQgfX0ge3sgcHJvZHVjdC5uYW1lIH19IHt7IHByb2R1Y3Qud2VpZ2h0IH19PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2Pnt7IHByb2R1Y3QucHJpY2UgfX0gbGVpPC9kaXY+XHJcbiAgICAgICAgPC9xLWl0ZW0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9xLWxpc3Q+XHJcbiAgPC9xLWNhcmQ+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogXCJQcm9kdWN0c0luQ2F0ZWdvcnlJbkxvY2F0aW9uXCIsXHJcbiAgZW1pdHM6IFtcImdvQmFja1RvQ2F0ZWdvcmllc1wiXSxcclxuICBwcm9wczogW1wiY2F0ZWdvcnlJbmZvXCIsIFwibG9jYXRpb25JbmZvXCJdLFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwcm9kdWN0czogW10sXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgYXN5bmMgbW91bnRlZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwidGV4dFwiLCB0aGlzLmxvY2F0aW9uSW5mbyk7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkuZ2V0KFxyXG4gICAgICBgL2NhdGVnb3JpZXMvJHt0aGlzLmxvY2F0aW9uSW5mby5sb2NhdGlvbi5faWR9LyR7dGhpcy5jYXRlZ29yeUluZm8uX2lkfWBcclxuICAgICk7XHJcbiAgICB0aGlzLnByb2R1Y3RzID0gcmVzLmRhdGEuZGF0YS5wcm9kdWN0c0luQ2F0ZWdvcnlJbkxvY2F0aW9uO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5wcm9kdWN0cyk7XHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4ucS1pdGVtIHtcclxuICBwYWRkaW5nOiA0cHggMTZweDtcclxuICBtaW4taGVpZ2h0OiBmaXQtY29udGVudDtcclxufVxyXG48L3N0eWxlPlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxHTWFwTWFwXHJcbiAgICAgIDpjZW50ZXI9XCJteUNvb3JkaW5hdGVzXCJcclxuICAgICAgOnpvb209XCJ6b29tXCJcclxuICAgICAgY2xhc3M9XCJtYXAtc3R5bGVcIlxyXG4gICAgICA6Y2xhc3M9XCJbXHJcbiAgICAgICAgaXNBZG1pbiA/ICd3aXRob3V0LWZvb3Rlci1tYXAtaGVpZ2h0JyA6ICd3aXRoLWZvb3Rlci1tYXAtaGVpZ2h0JyxcclxuICAgICAgXVwiXHJcbiAgICA+XHJcbiAgICAgIDxHTWFwTWFya2VyXHJcbiAgICAgICAgOmtleT1cImluZGV4XCJcclxuICAgICAgICB2LWZvcj1cIihsb2NhdGlvbiwgaW5kZXgpIGluIG1hcmtldHNMaXN0XCJcclxuICAgICAgICA6cG9zaXRpb249XCJsb2NhdGlvbi5sb2NhdGlvbi5jb29yZGluYXRlc1wiXHJcbiAgICAgICAgOmljb249XCJ7XHJcbiAgICAgICAgICB1cmw6IGxvY2F0aW9uLm1hcmtldC5sb2dvLFxyXG4gICAgICAgICAgc2NhbGVkU2l6ZTogeyB3aWR0aDogMzAsIGhlaWdodDogMzAgfSxcclxuICAgICAgICAgIGxhYmVsT3JpZ2luOiB7IHg6IDE2LCB5OiAtMTAgfSxcclxuICAgICAgICB9XCJcclxuICAgICAgICA6Y2xpY2thYmxlPVwidHJ1ZVwiXHJcbiAgICAgICAgQGNsaWNrPVwib3Blbk1hcmtlcihsb2NhdGlvbi5sb2NhdGlvbi5faWQpXCJcclxuICAgICAgICA+PEdNYXBJbmZvV2luZG93XHJcbiAgICAgICAgICA6Y2xvc2VjbGljaz1cInRydWVcIlxyXG4gICAgICAgICAgQGNsb3NlY2xpY2s9XCJvcGVuTWFya2VyKG51bGwpXCJcclxuICAgICAgICAgIDpvcGVuZWQ9XCJvcGVuZWRNYXJrZXJJRCA9PT0gbG9jYXRpb24ubG9jYXRpb24uX2lkXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2Pnt7IGxvY2F0aW9uLmxvY2F0aW9uLmFkZHJlc3MgfX08L2Rpdj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgQGNsaWNrPVwic2hvd0xvY2F0aW9uRGV0YWlsc0RpYWxvZyhsb2NhdGlvbilcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImxvY2F0aW9uLWRldGFpbHMtYnV0dG9uXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgRGV0YWlsc1xyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9HTWFwSW5mb1dpbmRvdz48L0dNYXBNYXJrZXJcclxuICAgICAgPlxyXG4gICAgICA8R01hcE1hcmtlclxyXG4gICAgICAgIDpwb3NpdGlvbj1cInsgbGF0OiBteUNvb3JkaW5hdGVzLmxhdCwgbG5nOiBteUNvb3JkaW5hdGVzLmxuZyB9XCJcclxuICAgICAgICA6aWNvbj1cIntcclxuICAgICAgICAgIHVybDogY3VycmVudExvY2F0aW9uSWNvbixcclxuICAgICAgICAgIHNjYWxlZFNpemU6IHsgd2lkdGg6IDE4LCBoZWlnaHQ6IDE4IH0sXHJcbiAgICAgICAgfVwiXHJcbiAgICAgIC8+XHJcbiAgICAgIDxHTWFwQ2lyY2xlXHJcbiAgICAgICAgOnJhZGl1cz1cImNpcmNsZVJhZGl1c1wiXHJcbiAgICAgICAgOmNlbnRlcj1cInsgbGF0OiBteUNvb3JkaW5hdGVzLmxhdCwgbG5nOiBteUNvb3JkaW5hdGVzLmxuZyB9XCJcclxuICAgICAgICA6b3B0aW9ucz1cImNpcmNsZU9wdGlvbnNcIlxyXG4gICAgICAvPlxyXG4gICAgPC9HTWFwTWFwPlxyXG4gICAgPGRpdiBjbGFzcz1cInNsaWRlci1ib3hcIj5cclxuICAgICAgPHEtc2xpZGVyXHJcbiAgICAgICAgY2xhc3M9XCJzbGlkZXJcIlxyXG4gICAgICAgIHYtbW9kZWw9XCJnZW9sb2NhdGlvbkluZm8ucmFkaXVzXCJcclxuICAgICAgICBtYXJrZXJzXHJcbiAgICAgICAgOm1hcmtlci1sYWJlbHM9XCJhZGRLbVwiXHJcbiAgICAgICAgOm1pbj1cIjFcIlxyXG4gICAgICAgIDptYXg9XCI3XCJcclxuICAgICAgICBAY2hhbmdlPVwic2xpZGVyQ2hhbmdlZFwiXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxxLWRpYWxvZyBtYXhpbWl6ZWQgdi1tb2RlbD1cInNob3dMb2NhdGlvbkRldGFpbHNcIj5cclxuICAgICAgPHEtY2FyZD5cclxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcGItbm9uZVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5Mb2NhdGlvbiBkZXRhaWxzPC9kaXY+XHJcbiAgICAgICAgICA8cS1zcGFjZSAvPlxyXG4gICAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgcm91bmQgZGVuc2Ugdi1jbG9zZS1wb3B1cCAvPlxyXG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbiBzdHlsZT1cImZvbnQtc2l6ZTogMTZweFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxvZ28tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJsb2dvXCIgOnNyYz1cImxvY2F0aW9uSW5mby5tYXJrZXQubG9nb1wiIGFsdD1cImxvZ29cIiAvPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXY+e3sgbG9jYXRpb25JbmZvLmxvY2F0aW9uLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2PkFkcmVzYToge3sgbG9jYXRpb25JbmZvLmxvY2F0aW9uLmFkZHJlc3MgfX08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2PlByb2dyYW06IHt7IGxvY2F0aW9uSW5mby5sb2NhdGlvbi5vcGVuaW5nSG91cnMgfX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxxLXNlcGFyYXRvcj48L3Etc2VwYXJhdG9yPlxyXG4gICAgICAgICAgPGRpdiB2LWlmPVwiIWNhdGVnb3J5SW5mb1wiPlxyXG4gICAgICAgICAgICA8cS1pdGVtXHJcbiAgICAgICAgICAgICAgY2xpY2thYmxlXHJcbiAgICAgICAgICAgICAgdi1yaXBwbGVcclxuICAgICAgICAgICAgICB2LWZvcj1cImNhdGVnb3J5IGluIGNhdGVnb3JpZXNcIlxyXG4gICAgICAgICAgICAgIDprZXk9XCJjYXRlZ29yeS5faWRcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHRodW1ibmFpbCBzdHlsZT1cInBhZGRpbmctbGVmdDogMTBweFwiPlxyXG4gICAgICAgICAgICAgICAgPHEtaWNvbiA6bmFtZT1cImNhdGVnb3J5Lmljb25cIiAvPlxyXG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIEBjbGljaz1cInZpZXdQcm9kdWN0c0luQ2F0ZWdvcnkoY2F0ZWdvcnkpXCI+e3tcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5Lm5hbWVcclxuICAgICAgICAgICAgICB9fTwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICAgIDwvcS1pdGVtPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8UHJvZHVjdHNJbkNhdGVnb3J5SW5Mb2NhdGlvblxyXG4gICAgICAgICAgICB2LWlmPVwiY2F0ZWdvcnlJbmZvXCJcclxuICAgICAgICAgICAgOmNhdGVnb3J5SW5mbz1cImNhdGVnb3J5SW5mb1wiXHJcbiAgICAgICAgICAgIDpsb2NhdGlvbkluZm89XCJsb2NhdGlvbkluZm9cIlxyXG4gICAgICAgICAgICBAZ29CYWNrVG9DYXRlZ29yaWVzPVwiY2F0ZWdvcnlJbmZvID0gbnVsbFwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgIDwvcS1jYXJkPlxyXG4gICAgPC9xLWRpYWxvZz5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IHVzZVVzZXJTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL1VzZXJTdG9yZVwiO1xyXG5pbXBvcnQgeyB1c2VHZW9sb2NhdGlvbkluZm9TdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2dlb2xvY2F0aW9uLWluZm9cIjtcclxuaW1wb3J0IGRvdCBmcm9tIFwic3JjL2Fzc2V0cy9ibHVlZG90LnBuZ1wiO1xyXG5pbXBvcnQgUHJvZHVjdHNJbkNhdGVnb3J5SW5Mb2NhdGlvbiBmcm9tIFwiLi9Qcm9kdWN0c0luQ2F0ZWdvcnlJbkxvY2F0aW9uLnZ1ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbXBvbmVudHM6IHsgUHJvZHVjdHNJbkNhdGVnb3J5SW5Mb2NhdGlvbiB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBvcGVuZWRNYXJrZXJJRDogbnVsbCxcclxuICAgICAgem9vbTogMTMsXHJcbiAgICAgIGN1cnJlbnRMb2NhdGlvbkljb246IGRvdCxcclxuICAgICAgY2lyY2xlT3B0aW9uczoge1xyXG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiM0YzhiZjVcIixcclxuICAgICAgICBzdHJva2VPcGFjaXR5OiAwLjcsXHJcbiAgICAgICAgc3Ryb2tlV2VpZ2h0OiAyLFxyXG4gICAgICAgIGZpbGxDb2xvcjogXCIjNGM4YmY1XCIsXHJcbiAgICAgICAgZmlsbE9wYWNpdHk6IDAuMSxcclxuICAgICAgfSxcclxuICAgICAgbG9jYXRpb25JbmZvOiBudWxsLFxyXG4gICAgICBzaG93TG9jYXRpb25EZXRhaWxzOiBmYWxzZSxcclxuICAgICAgY2F0ZWdvcmllczogW10sXHJcbiAgICAgIGNhdGVnb3J5SW5mbzogbnVsbCxcclxuICAgIH07XHJcbiAgfSxcclxuICBzZXR1cCgpIHtcclxuICAgIGNvbnN0IHVzZXJTdG9yZSA9IHVzZVVzZXJTdG9yZSgpO1xyXG4gICAgY29uc3QgZ2VvbG9jYXRpb25JbmZvID0gdXNlR2VvbG9jYXRpb25JbmZvU3RvcmUoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHVzZXJTdG9yZSxcclxuICAgICAgZ2VvbG9jYXRpb25JbmZvLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIHByb3BzOiBbXCJtYXJrZXRzTGlzdFwiLCBcIm15Q29vcmRpbmF0ZXNcIl0sXHJcbiAgYXN5bmMgbW91bnRlZCgpIHtcclxuICAgIGF3YWl0IHRoaXMuZmV0Y2hDYXRlZ29yaWVzKCk7XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBvcGVuTWFya2VyKGlkKSB7XHJcbiAgICAgIHRoaXMub3BlbmVkTWFya2VySUQgPSBpZDtcclxuICAgIH0sXHJcbiAgICBhZGRLbSh2YWx1ZSkge1xyXG4gICAgICByZXR1cm4gdmFsdWUgKyBcImttXCI7XHJcbiAgICB9LFxyXG4gICAgc2xpZGVyQ2hhbmdlZChuZXdSYWRpdXMpIHtcclxuICAgICAgdGhpcy4kZW1pdChcIm9uU2xpZGVyQ2hhbmdlZFwiLCBuZXdSYWRpdXMpO1xyXG4gICAgfSxcclxuICAgIHNob3dMb2NhdGlvbkRldGFpbHNEaWFsb2cobG9jYXRpb24pIHtcclxuICAgICAgdGhpcy5sb2NhdGlvbkluZm8gPSBsb2NhdGlvbjtcclxuICAgICAgdGhpcy5zaG93TG9jYXRpb25EZXRhaWxzID0gdHJ1ZTtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5sb2NhdGlvbkluZm8pO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIGZldGNoQ2F0ZWdvcmllcygpIHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLmdldChcIi9jYXRlZ29yaWVzXCIpO1xyXG4gICAgICB0aGlzLmNhdGVnb3JpZXMgPSByZXMuZGF0YS5kYXRhLmNhdGVnb3JpZXM7XHJcbiAgICB9LFxyXG4gICAgdmlld1Byb2R1Y3RzSW5DYXRlZ29yeShjYXRlZ29yeSkge1xyXG4gICAgICB0aGlzLmNhdGVnb3J5SW5mbyA9IGNhdGVnb3J5O1xyXG4gICAgfSxcclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICBjaXJjbGVSYWRpdXMoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdlb2xvY2F0aW9uSW5mby4kc3RhdGUucmFkaXVzICogMTAwMDtcclxuICAgIH0sXHJcbiAgICBpc0FkbWluKCkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIHRoaXMudXNlclN0b3JlLmF1dGhVc2VyICYmIHRoaXMudXNlclN0b3JlLmF1dGhVc2VyLnJvbGUgPT09IFwiYWRtaW5cIlxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5jb29yZHMtc3R5bGUge1xyXG4gIG1heC13aWR0aDogODAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG4ud2l0aG91dC1mb290ZXItbWFwLWhlaWdodCB7XHJcbiAgLyogd2lkdGg6IDEwMCU7ICovXHJcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gNTBweCk7XHJcbn1cclxuLndpdGgtZm9vdGVyLW1hcC1oZWlnaHQge1xyXG4gIC8qIHdpZHRoOiAxMDAlOyAqL1xyXG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDk4cHgpO1xyXG59XHJcbi5zbGlkZXItYm94IHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgYm90dG9tOiA4MHB4O1xyXG4gIHdpZHRoOiA4MCU7XHJcbiAgbGVmdDogLTQ1cHg7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgcGFkZGluZzogMCAxNXB4O1xyXG4gIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudCgjZTVlNWU1LCAjZTVlNWU1NjIpO1xyXG59XHJcbi5sb2dvIHtcclxuICB3aWR0aDogOTBweDtcclxuICBoZWlnaHQ6IDkwcHg7XHJcbn1cclxuLmxvZ28tY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIC8qIGp1c3RpZnktY29udGVudDogY2VudGVyOyAqL1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgZ2FwOiAxNXB4O1xyXG59XHJcbi5sb2NhdGlvbi1kZXRhaWxzLWJ1dHRvbiB7XHJcbiAgYmFja2dyb3VuZDogbm9uZTtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbiAgcGFkZGluZzogMHB4O1xyXG4gIG1hcmdpbi10b3A6IDVweDtcclxuICBjb2xvcjogYmx1ZTtcclxufVxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOlsiX3NmY19tYWluIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZVRleHRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBZSxNQUFBOztBQzBCZixNQUFLQSxjQUFVO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixPQUFPLENBQUMsb0JBQW9CO0FBQUEsRUFDNUIsT0FBTyxDQUFDLGdCQUFnQixjQUFjO0FBQUEsRUFDdEMsT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLFVBQVUsQ0FBRTtBQUFBO0VBRWY7QUFBQSxFQUNELE1BQU0sVUFBVTtBQUNkLFlBQVEsSUFBSSxRQUFRLEtBQUssWUFBWTtBQUNyQyxVQUFNLE1BQU0sTUFBTSxLQUFLLEtBQUs7QUFBQSxNQUMxQixlQUFlLEtBQUssYUFBYSxTQUFTLE9BQU8sS0FBSyxhQUFhO0FBQUE7QUFFckUsU0FBSyxXQUFXLElBQUksS0FBSyxLQUFLO0FBQzlCLFlBQVEsSUFBSSxLQUFLLFFBQVE7QUFBQSxFQUMxQjtBQUNIOzs7SUExQ0VDLGdCQUtNLE9BQUEsTUFBQTtBQUFBLE1BSkpDLFlBQTJCLFVBQUE7QUFBQSxNQUMzQkEsWUFBNEUsT0FBQTtBQUFBLFFBQXBFLE1BQUs7QUFBQSxRQUFrQiwrQ0FBTyxLQUFLLE1BQUEsb0JBQUE7QUFBQTtNQUMzQ0QsZ0JBQXdDLFVBQUEsTUFBQUUsZ0JBQTdCLE9BQVksYUFBQyxJQUFJLEdBQUEsQ0FBQTtBQUFBLE1BQzVCRCxZQUEyQixVQUFBO0FBQUE7SUFFN0JBLFlBZVMsT0FBQSxNQUFBO0FBQUEsdUJBZFAsTUFhUztBQUFBLFFBUkQsTUFBQSxTQUFTLHVCQUxqQkUsWUFhUyxPQUFBO0FBQUE7VUFaUCxPQUFBO0FBQUEsVUFDQSxVQUFBO0FBQUEsVUFDQSxTQUFBO0FBQUEsVUFDQSxPQUFNO0FBQUE7MkJBR0QsTUFBMkI7QUFBQSw4QkFBaENDLG1CQUtNQyxVQUFBLE1BQUFDLFdBTGlCLE1BQVEsVUFBQSxDQUFuQixZQUFPO2tDQUFuQkYsbUJBS00sT0FBQTtBQUFBLGdCQUw0QixLQUFLLFFBQVE7QUFBQTtnQkFDL0Isd0JBQWRELFlBR1MsT0FBQTtBQUFBO2tCQUhjLE9BQU07QUFBQTttQ0FDM0IsTUFBc0U7QUFBQSxvQkFBdEVILGdCQUFzRSxPQUE5RCxNQUFBRSxnQkFBQSxRQUFRLEtBQUssSUFBRyxNQUFDQSxnQkFBRyxRQUFRLElBQUksSUFBRyxNQUFJQSxnQkFBQSxRQUFRLE1BQU0sR0FBQSxDQUFBO0FBQUEsb0JBQzdERixnQkFBa0MsT0FBMUIsTUFBQUUsZ0JBQUEsUUFBUSxLQUFLLElBQUcsUUFBSSxDQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQzRGdEMsTUFBSyxZQUFVO0FBQUEsRUFDYixZQUFZLEVBQUUsNkJBQThCO0FBQUEsRUFDNUMsT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLGdCQUFnQjtBQUFBLE1BQ2hCLE1BQU07QUFBQSxNQUNOLHFCQUFxQjtBQUFBLE1BQ3JCLGVBQWU7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLGVBQWU7QUFBQSxRQUNmLGNBQWM7QUFBQSxRQUNkLFdBQVc7QUFBQSxRQUNYLGFBQWE7QUFBQSxNQUNkO0FBQUEsTUFDRCxjQUFjO0FBQUEsTUFDZCxxQkFBcUI7QUFBQSxNQUNyQixZQUFZLENBQUU7QUFBQSxNQUNkLGNBQWM7QUFBQTtFQUVqQjtBQUFBLEVBQ0QsUUFBUTtBQUNOLFVBQU0sWUFBWTtBQUNsQixVQUFNLGtCQUFrQjtBQUN4QixXQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQTtFQUVIO0FBQUEsRUFDRCxPQUFPLENBQUMsZUFBZSxlQUFlO0FBQUEsRUFDdEMsTUFBTSxVQUFVO0FBQ2QsVUFBTSxLQUFLO0VBQ1o7QUFBQSxFQUNELFNBQVM7QUFBQSxJQUNQLFdBQVcsSUFBSTtBQUNiLFdBQUssaUJBQWlCO0FBQUEsSUFDdkI7QUFBQSxJQUNELE1BQU0sT0FBTztBQUNYLGFBQU8sUUFBUTtBQUFBLElBQ2hCO0FBQUEsSUFDRCxjQUFjLFdBQVc7QUFDdkIsV0FBSyxNQUFNLG1CQUFtQixTQUFTO0FBQUEsSUFDeEM7QUFBQSxJQUNELDBCQUEwQixVQUFVO0FBQ2xDLFdBQUssZUFBZTtBQUNwQixXQUFLLHNCQUFzQjtBQUMzQixjQUFRLElBQUksS0FBSyxZQUFZO0FBQUEsSUFDOUI7QUFBQSxJQUNELE1BQU0sa0JBQWtCO0FBQ3RCLFlBQU0sTUFBTSxNQUFNLEtBQUssS0FBSyxJQUFJLGFBQWE7QUFDN0MsV0FBSyxhQUFhLElBQUksS0FBSyxLQUFLO0FBQUEsSUFDakM7QUFBQSxJQUNELHVCQUF1QixVQUFVO0FBQy9CLFdBQUssZUFBZTtBQUFBLElBQ3JCO0FBQUEsRUFDRjtBQUFBLEVBQ0QsVUFBVTtBQUFBLElBQ1IsZUFBZTtBQUNiLGFBQU8sS0FBSyxnQkFBZ0IsT0FBTyxTQUFTO0FBQUEsSUFDN0M7QUFBQSxJQUNELFVBQVU7QUFDUixhQUNFLEtBQUssVUFBVSxZQUFZLEtBQUssVUFBVSxTQUFTLFNBQVM7QUFBQSxJQUUvRDtBQUFBLEVBQ0Y7QUFDSDs7O0FBL0hTLE1BQUEsYUFBQSxFQUFBLE9BQU0sYUFBWTtBQWNqQixNQUFBLGFBQUEsNkJBQUEsTUFBQUYsZ0NBQTJDLE9BQXRDLEVBQUEsT0FBTSxhQUFVLG9CQUFnQixFQUFBLENBQUE7QUFNaEMsTUFBQSxhQUFBLEVBQUEsT0FBTSxpQkFBZ0I7Ozs7Ozs7OztzQkFuRW5DSSxtQkFvR00sT0FBQSxNQUFBO0FBQUEsSUFuR0pILFlBNkNVLG9CQUFBO0FBQUEsTUE1Q1AsUUFBUSxPQUFhO0FBQUEsTUFDckIsTUFBTSxNQUFJO0FBQUEsTUFDWCx1QkFBTSxhQUFXO0FBQUEsUUFDRSxTQUFPLFVBQUEsOEJBQUE7QUFBQTs7dUJBTXhCLE1BQXdDO0FBQUEsU0FGMUNNLFVBQUEsSUFBQSxHQUFBSCxtQkF3QkNDLFVBdEI2QixNQUFBQyxXQUFBLE9BQUEsYUFBcEIsQ0FBQSxVQUFVLFVBQUs7OEJBRnpCSCxZQXdCQyx1QkFBQTtBQUFBLFlBdkJFLEtBQUs7QUFBQSxZQUVMLFVBQVUsU0FBUyxTQUFTO0FBQUEsWUFDNUIsTUFBSTtBQUFBLG1CQUFvQixTQUFTLE9BQU87QUFBQTs7O1lBS3hDLFdBQVc7QUFBQSxZQUNYLHFCQUFPLFNBQVUsV0FBQyxTQUFTLFNBQVMsR0FBRztBQUFBOzZCQUN2QyxNQVlnQjtBQUFBLGNBWmhCRixZQVlnQiwyQkFBQTtBQUFBLGdCQVhkLFlBQVk7QUFBQSxnQkFDWixvREFBWSxTQUFVLFdBQUEsSUFBQTtBQUFBLGdCQUN0QixRQUFRLE1BQWMsbUJBQUssU0FBUyxTQUFTO0FBQUE7aUNBRTlDLE1BQTBDO0FBQUEsa0JBQTFDRCxnQkFBMEMsT0FBbEMsTUFBQUUsZ0JBQUEsU0FBUyxTQUFTLE9BQU8sR0FBQSxDQUFBO0FBQUEsa0JBQ2pDRixnQkFLUyxVQUFBO0FBQUEsb0JBSk4sU0FBSyxZQUFFLFNBQXlCLDBCQUFDLFFBQVE7QUFBQSxvQkFDMUMsT0FBTTtBQUFBLHFCQUNQLGFBRUQsR0FBQSxVQUFBO0FBQUE7Ozs7Ozs7UUFHSkMsWUFNRSx1QkFBQTtBQUFBLFVBTEMsaUJBQWlCLE9BQWEsY0FBQyxLQUFVLEtBQUEsT0FBQSxjQUFjLElBQUc7QUFBQSxVQUMxRCxNQUFJO0FBQUEsaUJBQW9CLE1BQW1CO0FBQUE7OztRQUs5Q0EsWUFJRSx1QkFBQTtBQUFBLFVBSEMsUUFBUSxTQUFZO0FBQUEsVUFDcEIsZUFBZSxPQUFhLGNBQUMsS0FBVSxLQUFBLE9BQUEsY0FBYyxJQUFHO0FBQUEsVUFDeEQsU0FBUyxNQUFhO0FBQUE7Ozs7SUFHM0JELGdCQVVNLE9BVk4sWUFVTTtBQUFBLE1BVEpDLFlBUUUsU0FBQTtBQUFBLFFBUEEsT0FBTTtBQUFBLFFBQ0csWUFBQSxPQUFBLGdCQUFnQjtBQUFBLFFBQWhCLHVCQUFBLE9BQUEsT0FBQSxPQUFBLEtBQUEsWUFBQSxPQUFBLGdCQUFnQixTQUFNO0FBQUEsUUFDL0IsU0FBQTtBQUFBLFFBQ0MsaUJBQWUsU0FBSztBQUFBLFFBQ3BCLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLFVBQVEsU0FBYTtBQUFBOztJQUcxQkEsWUF5Q1csU0FBQTtBQUFBLE1BekNELFdBQUE7QUFBQSxrQkFBbUIsTUFBbUI7QUFBQSxtRUFBbkIsTUFBbUIsc0JBQUE7QUFBQTt1QkFDOUMsTUF1Q1M7QUFBQSxRQXZDVEEsWUF1Q1MsT0FBQSxNQUFBO0FBQUEsMkJBdENQLE1BSWlCO0FBQUEsWUFKakJBLFlBSWlCLGNBQUEsRUFBQSxPQUFBLDZCQUppQyxHQUFBO0FBQUEsK0JBQ2hELE1BQTJDO0FBQUEsZ0JBQTNDO0FBQUEsZ0JBQ0FBLFlBQVcsTUFBQTtBQUFBLCtCQUNYQSxZQUFxRCxNQUFBO0FBQUEsa0JBQTlDLE1BQUs7QUFBQSxrQkFBUSxNQUFBO0FBQUEsa0JBQUssT0FBQTtBQUFBLGtCQUFNLE9BQUE7QUFBQTs7Ozs7O1lBR2pDQSxZQStCaUIsY0FBQSxFQUFBLE9BQUEsRUFBQSxhQS9CRCxPQUF1QixLQUFBO0FBQUEsK0JBQ3JDLE1BT007QUFBQSxnQkFQTkQsZ0JBT00sT0FQTixZQU9NO0FBQUEsa0JBTkpBLGdCQUErRCxPQUFBO0FBQUEsb0JBQTFELE9BQU07QUFBQSxvQkFBUSxLQUFLLE1BQUEsYUFBYSxPQUFPO0FBQUEsb0JBQU0sS0FBSTtBQUFBO2tCQUN0REEsZ0JBSU0sT0FBQSxNQUFBO0FBQUEsb0JBSEpBLGdCQUEyQyxPQUFuQyxNQUFBRSxnQkFBQSxNQUFBLGFBQWEsU0FBUyxJQUFJLEdBQUEsQ0FBQTtBQUFBLG9CQUNsQ0YsZ0JBQXNELGFBQWpELGFBQVFFLGdCQUFHLG1CQUFhLFNBQVMsT0FBTyxHQUFBLENBQUE7QUFBQSxvQkFDN0NGLGdCQUE0RCxhQUF2RCxjQUFTRSxnQkFBRyxtQkFBYSxTQUFTLFlBQVksR0FBQSxDQUFBO0FBQUE7O2dCQUd2REQsWUFBMkIsVUFBQTtBQUFBLGlCQUNmLE1BQVksNkJBQXhCRyxtQkFjTSxPQUFBLFlBQUE7QUFBQSxvQ0FiSkEsbUJBWVNDLFVBQUEsTUFBQUMsV0FUWSxNQUFVLFlBQUEsQ0FBdEIsYUFBUTt3REFIakJILFlBWVMsT0FBQTtBQUFBLHNCQVhQLFdBQUE7QUFBQSxzQkFHQyxLQUFLLFNBQVM7QUFBQTt1Q0FFZixNQUVpQjtBQUFBLHdCQUZqQkYsWUFFaUIsY0FBQTtBQUFBLDBCQUZELFdBQUE7QUFBQSwwQkFBVSxPQUFBLEVBQTBCLGdCQUFBLE9BQUE7QUFBQTsyQ0FDbEQsTUFBZ0M7QUFBQSw0QkFBaENBLFlBQWdDLE9BQUE7QUFBQSw4QkFBdkIsTUFBTSxTQUFTO0FBQUE7Ozs7d0JBRTFCQSxZQUVtQixjQUFBO0FBQUEsMEJBRkYsU0FBSyxZQUFFLFNBQXNCLHVCQUFDLFFBQVE7QUFBQTsyQ0FBRyxNQUV4RDtBQUFBLDRCQURBTyxnQkFBQU4sZ0JBQUEsU0FBUyxJQUFJLEdBQUEsQ0FBQTtBQUFBOzs7Ozs7Ozs7O2dCQUtYLE1BQVksNkJBRHBCQyxZQUtFLHlDQUFBO0FBQUE7a0JBSEMsY0FBYyxNQUFZO0FBQUEsa0JBQzFCLGNBQWMsTUFBWTtBQUFBLGtCQUMxQiw0REFBb0IsTUFBWSxlQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7OyJ9
