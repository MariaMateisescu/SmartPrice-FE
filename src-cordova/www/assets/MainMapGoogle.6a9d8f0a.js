import { u as useGeolocationInfoStore, Q as QSlider } from "./QSlider.f25a198c.js";
import { Q as QSpace, a as QDialog } from "./QDialog.61cd08a9.js";
import { _ as _export_sfc, o as openBlock, c as createElementBlock, a as createBaseVNode, aa as createVNode, bC as QIcon, M as toDisplayString, b5 as withCtx, a2 as createBlock, Q as Fragment, aK as renderList, a3 as createCommentVNode, bA as useUserStore, aL as resolveComponent, d as normalizeClass, b7 as withDirectives, bE as QBtn, a9 as createTextVNode, bS as Ripple, aH as pushScopeId, aF as popScopeId } from "./index.404ce4fc.js";
import { Q as QCard, a as QCardSection } from "./QCard.facf2956.js";
import { Q as QSeparator } from "./QSeparator.cfe50c1e.js";
import { Q as QItem, a as QItemSection } from "./QItem.9f28e6fb.js";
import { C as ClosePopup } from "./ClosePopup.7842916c.js";
import { Q as QList } from "./QList.7cb8c5cd.js";
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
const _withScopeId = (n) => (pushScopeId("data-v-023426b1"), n = n(), popScopeId(), n);
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
                  createBaseVNode("a", {
                    href: "#",
                    onClick: ($event) => $options.showLocationDetailsDialog(location)
                  }, "Details", 8, _hoisted_1)
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
var MainMapGoogle = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-023426b1"], ["__file", "MainMapGoogle.vue"]]);
export { MainMapGoogle as M };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbk1hcEdvb2dsZS42YTlkOGYwYS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Fzc2V0cy9ibHVlZG90LnBuZyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2N1c3RvbWVyL1Byb2R1Y3RzSW5DYXRlZ29yeUluTG9jYXRpb24udnVlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY3VzdG9tZXIvTWFpbk1hcEdvb2dsZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJfX1ZJVEVfQVNTRVRfXzEyMmQwZTg1X19cIiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG4gICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XHJcbiAgICA8cS1pY29uIG5hbWU9XCJhcnJvd19iYWNrX2lvc1wiIEBjbGljaz1cIiRlbWl0KCdnb0JhY2tUb0NhdGVnb3JpZXMnKVwiPjwvcS1pY29uPlxyXG4gICAgPHN0cm9uZz57eyBjYXRlZ29yeUluZm8ubmFtZSB9fTwvc3Ryb25nPlxyXG4gICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XHJcbiAgPC9kaXY+XHJcbiAgPHEtY2FyZD5cclxuICAgIDxxLWxpc3RcclxuICAgICAgZGVuc2VcclxuICAgICAgYm9yZGVyZWRcclxuICAgICAgcGFkZGluZ1xyXG4gICAgICBjbGFzcz1cInJvdW5kZWQtYm9yZGVyc1wiXHJcbiAgICAgIHYtaWY9XCJwcm9kdWN0cy5sZW5ndGhcIlxyXG4gICAgPlxyXG4gICAgICA8ZGl2IHYtZm9yPVwicHJvZHVjdCBpbiBwcm9kdWN0c1wiIDprZXk9XCJwcm9kdWN0Ll9pZFwiPlxyXG4gICAgICAgIDxxLWl0ZW0gdi1pZj1cInByb2R1Y3RcIiBjbGFzcz1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XHJcbiAgICAgICAgICA8ZGl2Pnt7IHByb2R1Y3QuYnJhbmQgfX0ge3sgcHJvZHVjdC5uYW1lIH19IHt7IHByb2R1Y3Qud2VpZ2h0IH19PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2Pnt7IHByb2R1Y3QucHJpY2UgfX0gbGVpPC9kaXY+XHJcbiAgICAgICAgPC9xLWl0ZW0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9xLWxpc3Q+XHJcbiAgPC9xLWNhcmQ+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogXCJQcm9kdWN0c0luQ2F0ZWdvcnlJbkxvY2F0aW9uXCIsXHJcbiAgZW1pdHM6IFtcImdvQmFja1RvQ2F0ZWdvcmllc1wiXSxcclxuICBwcm9wczogW1wiY2F0ZWdvcnlJbmZvXCIsIFwibG9jYXRpb25JbmZvXCJdLFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwcm9kdWN0czogW10sXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgYXN5bmMgbW91bnRlZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwidGV4dFwiLCB0aGlzLmxvY2F0aW9uSW5mbyk7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkuZ2V0KFxyXG4gICAgICBgL2NhdGVnb3JpZXMvJHt0aGlzLmxvY2F0aW9uSW5mby5sb2NhdGlvbi5faWR9LyR7dGhpcy5jYXRlZ29yeUluZm8uX2lkfWBcclxuICAgICk7XHJcbiAgICB0aGlzLnByb2R1Y3RzID0gcmVzLmRhdGEuZGF0YS5wcm9kdWN0c0luQ2F0ZWdvcnlJbkxvY2F0aW9uO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5wcm9kdWN0cyk7XHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4ucS1pdGVtIHtcclxuICBwYWRkaW5nOiA0cHggMTZweDtcclxuICBtaW4taGVpZ2h0OiBmaXQtY29udGVudDtcclxufVxyXG48L3N0eWxlPlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxHTWFwTWFwXHJcbiAgICAgIDpjZW50ZXI9XCJteUNvb3JkaW5hdGVzXCJcclxuICAgICAgOnpvb209XCJ6b29tXCJcclxuICAgICAgY2xhc3M9XCJtYXAtc3R5bGVcIlxyXG4gICAgICA6Y2xhc3M9XCJbXHJcbiAgICAgICAgaXNBZG1pbiA/ICd3aXRob3V0LWZvb3Rlci1tYXAtaGVpZ2h0JyA6ICd3aXRoLWZvb3Rlci1tYXAtaGVpZ2h0JyxcclxuICAgICAgXVwiXHJcbiAgICA+XHJcbiAgICAgIDxHTWFwTWFya2VyXHJcbiAgICAgICAgOmtleT1cImluZGV4XCJcclxuICAgICAgICB2LWZvcj1cIihsb2NhdGlvbiwgaW5kZXgpIGluIG1hcmtldHNMaXN0XCJcclxuICAgICAgICA6cG9zaXRpb249XCJsb2NhdGlvbi5sb2NhdGlvbi5jb29yZGluYXRlc1wiXHJcbiAgICAgICAgOmljb249XCJ7XHJcbiAgICAgICAgICB1cmw6IGxvY2F0aW9uLm1hcmtldC5sb2dvLFxyXG4gICAgICAgICAgc2NhbGVkU2l6ZTogeyB3aWR0aDogMzAsIGhlaWdodDogMzAgfSxcclxuICAgICAgICAgIGxhYmVsT3JpZ2luOiB7IHg6IDE2LCB5OiAtMTAgfSxcclxuICAgICAgICB9XCJcclxuICAgICAgICA6Y2xpY2thYmxlPVwidHJ1ZVwiXHJcbiAgICAgICAgQGNsaWNrPVwib3Blbk1hcmtlcihsb2NhdGlvbi5sb2NhdGlvbi5faWQpXCJcclxuICAgICAgICA+PEdNYXBJbmZvV2luZG93XHJcbiAgICAgICAgICA6Y2xvc2VjbGljaz1cInRydWVcIlxyXG4gICAgICAgICAgQGNsb3NlY2xpY2s9XCJvcGVuTWFya2VyKG51bGwpXCJcclxuICAgICAgICAgIDpvcGVuZWQ9XCJvcGVuZWRNYXJrZXJJRCA9PT0gbG9jYXRpb24ubG9jYXRpb24uX2lkXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2Pnt7IGxvY2F0aW9uLmxvY2F0aW9uLmFkZHJlc3MgfX08L2Rpdj5cclxuICAgICAgICAgIDxhIGhyZWY9XCIjXCIgQGNsaWNrPVwic2hvd0xvY2F0aW9uRGV0YWlsc0RpYWxvZyhsb2NhdGlvbilcIj5EZXRhaWxzPC9hPlxyXG4gICAgICAgIDwvR01hcEluZm9XaW5kb3c+PC9HTWFwTWFya2VyXHJcbiAgICAgID5cclxuICAgICAgPEdNYXBNYXJrZXJcclxuICAgICAgICA6cG9zaXRpb249XCJ7IGxhdDogbXlDb29yZGluYXRlcy5sYXQsIGxuZzogbXlDb29yZGluYXRlcy5sbmcgfVwiXHJcbiAgICAgICAgOmljb249XCJ7XHJcbiAgICAgICAgICB1cmw6IGN1cnJlbnRMb2NhdGlvbkljb24sXHJcbiAgICAgICAgICBzY2FsZWRTaXplOiB7IHdpZHRoOiAxOCwgaGVpZ2h0OiAxOCB9LFxyXG4gICAgICAgIH1cIlxyXG4gICAgICAvPlxyXG4gICAgICA8R01hcENpcmNsZVxyXG4gICAgICAgIDpyYWRpdXM9XCJjaXJjbGVSYWRpdXNcIlxyXG4gICAgICAgIDpjZW50ZXI9XCJ7IGxhdDogbXlDb29yZGluYXRlcy5sYXQsIGxuZzogbXlDb29yZGluYXRlcy5sbmcgfVwiXHJcbiAgICAgICAgOm9wdGlvbnM9XCJjaXJjbGVPcHRpb25zXCJcclxuICAgICAgLz5cclxuICAgIDwvR01hcE1hcD5cclxuICAgIDxkaXYgY2xhc3M9XCJzbGlkZXItYm94XCI+XHJcbiAgICAgIDxxLXNsaWRlclxyXG4gICAgICAgIGNsYXNzPVwic2xpZGVyXCJcclxuICAgICAgICB2LW1vZGVsPVwiZ2VvbG9jYXRpb25JbmZvLnJhZGl1c1wiXHJcbiAgICAgICAgbWFya2Vyc1xyXG4gICAgICAgIDptYXJrZXItbGFiZWxzPVwiYWRkS21cIlxyXG4gICAgICAgIDptaW49XCIxXCJcclxuICAgICAgICA6bWF4PVwiN1wiXHJcbiAgICAgICAgQGNoYW5nZT1cInNsaWRlckNoYW5nZWRcIlxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8cS1kaWFsb2cgbWF4aW1pemVkIHYtbW9kZWw9XCJzaG93TG9jYXRpb25EZXRhaWxzXCI+XHJcbiAgICAgIDxxLWNhcmQ+XHJcbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXBiLW5vbmVcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+TG9jYXRpb24gZGV0YWlsczwvZGl2PlxyXG4gICAgICAgICAgPHEtc3BhY2UgLz5cclxuICAgICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IHJvdW5kIGRlbnNlIHYtY2xvc2UtcG9wdXAgLz5cclxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG5cclxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gc3R5bGU9XCJmb250LXNpemU6IDE2cHhcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsb2dvLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwibG9nb1wiIDpzcmM9XCJsb2NhdGlvbkluZm8ubWFya2V0LmxvZ29cIiBhbHQ9XCJsb2dvXCIgLz5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8ZGl2Pnt7IGxvY2F0aW9uSW5mby5sb2NhdGlvbi5uYW1lIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdj5BZHJlc2E6IHt7IGxvY2F0aW9uSW5mby5sb2NhdGlvbi5hZGRyZXNzIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdj5Qcm9ncmFtOiB7eyBsb2NhdGlvbkluZm8ubG9jYXRpb24ub3BlbmluZ0hvdXJzIH19PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cclxuICAgICAgICAgIDxkaXYgdi1pZj1cIiFjYXRlZ29yeUluZm9cIj5cclxuICAgICAgICAgICAgPHEtaXRlbVxyXG4gICAgICAgICAgICAgIGNsaWNrYWJsZVxyXG4gICAgICAgICAgICAgIHYtcmlwcGxlXHJcbiAgICAgICAgICAgICAgdi1mb3I9XCJjYXRlZ29yeSBpbiBjYXRlZ29yaWVzXCJcclxuICAgICAgICAgICAgICA6a2V5PVwiY2F0ZWdvcnkuX2lkXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiB0aHVtYm5haWwgc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IDEwcHhcIj5cclxuICAgICAgICAgICAgICAgIDxxLWljb24gOm5hbWU9XCJjYXRlZ29yeS5pY29uXCIgLz5cclxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBAY2xpY2s9XCJ2aWV3UHJvZHVjdHNJbkNhdGVnb3J5KGNhdGVnb3J5KVwiPnt7XHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeS5uYW1lXHJcbiAgICAgICAgICAgICAgfX08L3EtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICA8L3EtaXRlbT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPFByb2R1Y3RzSW5DYXRlZ29yeUluTG9jYXRpb25cclxuICAgICAgICAgICAgdi1pZj1cImNhdGVnb3J5SW5mb1wiXHJcbiAgICAgICAgICAgIDpjYXRlZ29yeUluZm89XCJjYXRlZ29yeUluZm9cIlxyXG4gICAgICAgICAgICA6bG9jYXRpb25JbmZvPVwibG9jYXRpb25JbmZvXCJcclxuICAgICAgICAgICAgQGdvQmFja1RvQ2F0ZWdvcmllcz1cImNhdGVnb3J5SW5mbyA9IG51bGxcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG4gICAgICA8L3EtY2FyZD5cclxuICAgIDwvcS1kaWFsb2c+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyB1c2VVc2VyU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9Vc2VyU3RvcmVcIjtcclxuaW1wb3J0IHsgdXNlR2VvbG9jYXRpb25JbmZvU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9nZW9sb2NhdGlvbi1pbmZvXCI7XHJcbmltcG9ydCBkb3QgZnJvbSBcInNyYy9hc3NldHMvYmx1ZWRvdC5wbmdcIjtcclxuaW1wb3J0IFByb2R1Y3RzSW5DYXRlZ29yeUluTG9jYXRpb24gZnJvbSBcIi4vUHJvZHVjdHNJbkNhdGVnb3J5SW5Mb2NhdGlvbi52dWVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb21wb25lbnRzOiB7IFByb2R1Y3RzSW5DYXRlZ29yeUluTG9jYXRpb24gfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgb3BlbmVkTWFya2VySUQ6IG51bGwsXHJcbiAgICAgIHpvb206IDEzLFxyXG4gICAgICBjdXJyZW50TG9jYXRpb25JY29uOiBkb3QsXHJcbiAgICAgIGNpcmNsZU9wdGlvbnM6IHtcclxuICAgICAgICBzdHJva2VDb2xvcjogXCIjNGM4YmY1XCIsXHJcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogMC43LFxyXG4gICAgICAgIHN0cm9rZVdlaWdodDogMixcclxuICAgICAgICBmaWxsQ29sb3I6IFwiIzRjOGJmNVwiLFxyXG4gICAgICAgIGZpbGxPcGFjaXR5OiAwLjEsXHJcbiAgICAgIH0sXHJcbiAgICAgIGxvY2F0aW9uSW5mbzogbnVsbCxcclxuICAgICAgc2hvd0xvY2F0aW9uRGV0YWlsczogZmFsc2UsXHJcbiAgICAgIGNhdGVnb3JpZXM6IFtdLFxyXG4gICAgICBjYXRlZ29yeUluZm86IG51bGwsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgc2V0dXAoKSB7XHJcbiAgICBjb25zdCB1c2VyU3RvcmUgPSB1c2VVc2VyU3RvcmUoKTtcclxuICAgIGNvbnN0IGdlb2xvY2F0aW9uSW5mbyA9IHVzZUdlb2xvY2F0aW9uSW5mb1N0b3JlKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB1c2VyU3RvcmUsXHJcbiAgICAgIGdlb2xvY2F0aW9uSW5mbyxcclxuICAgIH07XHJcbiAgfSxcclxuICBwcm9wczogW1wibWFya2V0c0xpc3RcIiwgXCJteUNvb3JkaW5hdGVzXCJdLFxyXG4gIGFzeW5jIG1vdW50ZWQoKSB7XHJcbiAgICBhd2FpdCB0aGlzLmZldGNoQ2F0ZWdvcmllcygpO1xyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgb3Blbk1hcmtlcihpZCkge1xyXG4gICAgICB0aGlzLm9wZW5lZE1hcmtlcklEID0gaWQ7XHJcbiAgICB9LFxyXG4gICAgYWRkS20odmFsdWUpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlICsgXCJrbVwiO1xyXG4gICAgfSxcclxuICAgIHNsaWRlckNoYW5nZWQobmV3UmFkaXVzKSB7XHJcbiAgICAgIHRoaXMuJGVtaXQoXCJvblNsaWRlckNoYW5nZWRcIiwgbmV3UmFkaXVzKTtcclxuICAgIH0sXHJcbiAgICBzaG93TG9jYXRpb25EZXRhaWxzRGlhbG9nKGxvY2F0aW9uKSB7XHJcbiAgICAgIHRoaXMubG9jYXRpb25JbmZvID0gbG9jYXRpb247XHJcbiAgICAgIHRoaXMuc2hvd0xvY2F0aW9uRGV0YWlscyA9IHRydWU7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubG9jYXRpb25JbmZvKTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBmZXRjaENhdGVnb3JpZXMoKSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5nZXQoXCIvY2F0ZWdvcmllc1wiKTtcclxuICAgICAgdGhpcy5jYXRlZ29yaWVzID0gcmVzLmRhdGEuZGF0YS5jYXRlZ29yaWVzO1xyXG4gICAgfSxcclxuICAgIHZpZXdQcm9kdWN0c0luQ2F0ZWdvcnkoY2F0ZWdvcnkpIHtcclxuICAgICAgdGhpcy5jYXRlZ29yeUluZm8gPSBjYXRlZ29yeTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgY2lyY2xlUmFkaXVzKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZW9sb2NhdGlvbkluZm8uJHN0YXRlLnJhZGl1cyAqIDEwMDA7XHJcbiAgICB9LFxyXG4gICAgaXNBZG1pbigpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICB0aGlzLnVzZXJTdG9yZS5hdXRoVXNlciAmJiB0aGlzLnVzZXJTdG9yZS5hdXRoVXNlci5yb2xlID09PSBcImFkbWluXCJcclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4uY29vcmRzLXN0eWxlIHtcclxuICBtYXgtd2lkdGg6IDgwMHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuLnNsaWRlciB7XHJcbiAgLyogcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMTAwcHg7XHJcbiAgd2lkdGg6IDgwJTtcclxuICBsZWZ0OiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIG1hcmdpbjogMCBhdXRvOyAqL1xyXG59XHJcbi53aXRob3V0LWZvb3Rlci1tYXAtaGVpZ2h0IHtcclxuICAvKiB3aWR0aDogMTAwJTsgKi9cclxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA1MHB4KTtcclxufVxyXG4ud2l0aC1mb290ZXItbWFwLWhlaWdodCB7XHJcbiAgLyogd2lkdGg6IDEwMCU7ICovXHJcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gOThweCk7XHJcbn1cclxuLnNsaWRlci1ib3gge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBib3R0b206IDgwcHg7XHJcbiAgd2lkdGg6IDgwJTtcclxuICBsZWZ0OiAtNDVweDtcclxuICByaWdodDogMDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBwYWRkaW5nOiAwIDE1cHg7XHJcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KCNlNWU1ZTUsICNlNWU1ZTU2Mik7XHJcbn1cclxuLmxvZ28ge1xyXG4gIHdpZHRoOiA5MHB4O1xyXG4gIGhlaWdodDogOTBweDtcclxufVxyXG4ubG9nby1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgLyoganVzdGlmeS1jb250ZW50OiBjZW50ZXI7ICovXHJcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICBnYXA6IDE1cHg7XHJcbn1cclxuPC9zdHlsZT5cclxuIl0sIm5hbWVzIjpbIl9zZmNfbWFpbiIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX29wZW5CbG9jayIsIl9jcmVhdGVUZXh0Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBZSxNQUFBOztBQzBCZixNQUFLQSxjQUFVO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixPQUFPLENBQUMsb0JBQW9CO0FBQUEsRUFDNUIsT0FBTyxDQUFDLGdCQUFnQixjQUFjO0FBQUEsRUFDdEMsT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLFVBQVUsQ0FBRTtBQUFBO0VBRWY7QUFBQSxFQUNELE1BQU0sVUFBVTtBQUNkLFlBQVEsSUFBSSxRQUFRLEtBQUssWUFBWTtBQUNyQyxVQUFNLE1BQU0sTUFBTSxLQUFLLEtBQUs7QUFBQSxNQUMxQixlQUFlLEtBQUssYUFBYSxTQUFTLE9BQU8sS0FBSyxhQUFhO0FBQUE7QUFFckUsU0FBSyxXQUFXLElBQUksS0FBSyxLQUFLO0FBQzlCLFlBQVEsSUFBSSxLQUFLLFFBQVE7QUFBQSxFQUMxQjtBQUNIOzs7SUExQ0VDLGdCQUtNLE9BQUEsTUFBQTtBQUFBLE1BSkpDLFlBQTJCLFVBQUE7QUFBQSxNQUMzQkEsWUFBNEUsT0FBQTtBQUFBLFFBQXBFLE1BQUs7QUFBQSxRQUFrQiwrQ0FBTyxLQUFLLE1BQUEsb0JBQUE7QUFBQTtNQUMzQ0QsZ0JBQXdDLFVBQUEsTUFBQUUsZ0JBQTdCLE9BQVksYUFBQyxJQUFJLEdBQUEsQ0FBQTtBQUFBLE1BQzVCRCxZQUEyQixVQUFBO0FBQUE7SUFFN0JBLFlBZVMsT0FBQSxNQUFBO0FBQUEsdUJB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
