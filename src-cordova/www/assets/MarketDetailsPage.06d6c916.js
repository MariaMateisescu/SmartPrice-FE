import { _ as _export_sfc, aL as resolveComponent, o as openBlock, c as createElementBlock, aa as createVNode, b5 as withCtx, a as createBaseVNode, M as toDisplayString, bE as QBtn, aH as pushScopeId, aF as popScopeId, bC as QIcon, a9 as createTextVNode, b7 as withDirectives, Q as Fragment, aK as renderList, a2 as createBlock, bB as useDashHeaderStore, a3 as createCommentVNode } from "./index.404ce4fc.js";
import { Q as QInput } from "./QInput.79283f08.js";
import { Q as QSpace, a as QDialog } from "./QDialog.61cd08a9.js";
import { Q as QCard, a as QCardSection } from "./QCard.facf2956.js";
import { C as ClosePopup } from "./ClosePopup.7842916c.js";
import { Q as QItem, a as QItemSection } from "./QItem.9f28e6fb.js";
import { Q as QSlideItem, a as QCardActions } from "./QCardActions.10f7195c.js";
import "./use-dark.efa419b2.js";
import "./uid.7f2d5a47.js";
import "./focus-manager.d00a4595.js";
import "./use-form.74a30394.js";
import "./use-timeout.219926c0.js";
import "./TouchPan.91a572c2.js";
import "./touch.16a8a914.js";
import "./selection.663e88ad.js";
import "./use-cache.b95af379.js";
var EditLocationDialog_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$3 = {
  data() {
    return {
      openedMarkerID: null,
      myCoordinates: {
        lat: 0,
        lng: 0
      },
      address: "",
      openingHours: "",
      zoom: 14
    };
  },
  props: ["locationInfo", "marketLogo", "marketName"],
  mounted() {
    this.myCoordinates.lat = this.locationInfo.coordinates.lat;
    this.myCoordinates.lng = this.locationInfo.coordinates.lng;
    this.address = this.locationInfo.address;
    this.openingHours = this.locationInfo.openingHours;
  },
  computed: {
    icon() {
      return {
        url: this.marketLogo,
        scaledSize: { width: 30, height: 30 },
        labelOrigin: { x: 16, y: -10 }
      };
    }
  },
  methods: {
    async markLocation(e) {
      this.myCoordinates.lat = e.latLng.lat();
      this.myCoordinates.lng = e.latLng.lng();
      await this.getStreetAddressFrom(
        this.myCoordinates.lat,
        this.myCoordinates.lng
      );
    },
    openMarker(id) {
      this.openedMarkerID = id;
    },
    async getStreetAddressFrom(lat, long) {
      try {
        var { data } = await this.$axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyCaLqRmzlYh0hkEI_FtBx8nPhIS0jJH9V0"
        );
        if (data.error_message) {
          console.log(data.error_message);
        } else {
          this.address = data.results[0].formatted_address;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    async onSaveLocationChanges() {
      try {
        const locationName = this.address.split(",")[0];
        const data = {
          name: this.marketName + " " + locationName,
          address: this.address,
          openingHours: this.openingHours,
          coordinates: {
            lat: this.myCoordinates.lat,
            lng: this.myCoordinates.lng
          }
        };
        const res = await this.$api.patch(
          `/locations/${this.locationInfo._id}`,
          data
        );
        if (res.data.status === "success") {
          this.$emit("editLocationSuccess");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
const _withScopeId$2 = (n) => (pushScopeId("data-v-6ff46e57"), n = n(), popScopeId(), n);
const _hoisted_1$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "coords-style" }, null, -1));
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_GMapInfoWindow = resolveComponent("GMapInfoWindow");
  const _component_GMapMarker = resolveComponent("GMapMarker");
  const _component_GMapMap = resolveComponent("GMapMap");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1$2,
    createVNode(_component_GMapMap, {
      center: $data.myCoordinates,
      zoom: $data.zoom,
      class: "map-style",
      onClick: $options.markLocation
    }, {
      default: withCtx(() => [
        createVNode(_component_GMapMarker, {
          position: $data.myCoordinates,
          icon: $options.icon,
          clickable: true,
          onClick: _cache[1] || (_cache[1] = ($event) => $options.openMarker($props.locationInfo._id))
        }, {
          default: withCtx(() => [
            createVNode(_component_GMapInfoWindow, {
              closeclick: true,
              onCloseclick: _cache[0] || (_cache[0] = ($event) => $options.openMarker(null)),
              opened: $data.openedMarkerID === $props.locationInfo._id
            }, {
              default: withCtx(() => [
                createBaseVNode("div", null, toDisplayString($data.address), 1)
              ]),
              _: 1
            }, 8, ["opened"])
          ]),
          _: 1
        }, 8, ["position", "icon"])
      ]),
      _: 1
    }, 8, ["center", "zoom", "onClick"]),
    createBaseVNode("div", null, "Address: " + toDisplayString($data.address), 1),
    createVNode(QInput, {
      modelValue: $data.myCoordinates.lat,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.myCoordinates.lat = $event),
      type: "text",
      label: "Latitude"
    }, null, 8, ["modelValue"]),
    createVNode(QInput, {
      modelValue: $data.myCoordinates.lng,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.myCoordinates.lng = $event),
      type: "text",
      label: "Longitude"
    }, null, 8, ["modelValue"]),
    createVNode(QInput, {
      modelValue: $data.openingHours,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.openingHours = $event),
      type: "text",
      label: "Opening Hours"
    }, null, 8, ["modelValue"]),
    createVNode(QBtn, {
      style: { "background-color": "#267378", "color": "#fff" },
      onClick: $options.onSaveLocationChanges,
      label: "Save Changes"
    }, null, 8, ["onClick"])
  ]);
}
var EditLocationDialog = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-6ff46e57"], ["__file", "EditLocationDialog.vue"]]);
var LocationCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$2 = {
  name: "LocationCard",
  props: ["locationInfo", "marketLogo", "marketName"],
  components: {
    EditLocationDialog
  },
  emits: ["fetchMarket"],
  data() {
    return {
      showEditLocation: false,
      showDeleteLocation: false
    };
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  },
  methods: {
    finalize(reset) {
      this.timer = setTimeout(() => {
        reset();
      }, 1e3);
    },
    goToLocationDetailsPage() {
      this.$router.push(
        `/administration/markets/${this.$route.params.marketId}/${this.locationInfo._id}`
      );
    },
    showEditLocationDialog({ reset }) {
      this.showEditLocation = true;
      this.finalize(reset);
    },
    showDeleteLocationDialog({ reset }) {
      this.showDeleteLocation = true;
      this.finalize(reset);
    },
    async deleteLocation() {
      try {
        const res = await this.$api.delete(
          `/locations/${this.locationInfo._id}/${this.$route.params.marketId}`
        );
        if (res.data.status === "success") {
          this.$emit("fetchMarket");
          this.showDeleteLocation = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async editLocationSuccess() {
      this.showEditLocation = false;
      this.$emit("fetchMarket");
    }
  }
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-49cb386c"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "row items-center" };
const _hoisted_2$1 = { class: "row items-center" };
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Edit Location", -1));
const _hoisted_4$1 = { class: "q-ml-sm" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_EditLocationDialog = resolveComponent("EditLocationDialog");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(QSlideItem, {
      onLeft: $options.showEditLocationDialog,
      onRight: $options.showDeleteLocationDialog,
      onClick: $options.goToLocationDetailsPage
    }, {
      left: withCtx(() => [
        createBaseVNode("div", _hoisted_1$1, [
          createVNode(QIcon, {
            left: "",
            name: "edit"
          }),
          createTextVNode(" Edit")
        ])
      ]),
      right: withCtx(() => [
        createBaseVNode("div", _hoisted_2$1, [
          createTextVNode("Delete "),
          createVNode(QIcon, {
            right: "",
            name: "delete"
          })
        ])
      ]),
      default: withCtx(() => [
        createVNode(QItem, null, {
          default: withCtx(() => [
            createVNode(QItemSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", null, toDisplayString($props.locationInfo.name), 1),
                createBaseVNode("div", null, "Adresa: " + toDisplayString($props.locationInfo.address), 1),
                createBaseVNode("div", null, "Program: " + toDisplayString($props.locationInfo.openingHours), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["onLeft", "onRight", "onClick"]),
    createVNode(QDialog, {
      maximized: "",
      modelValue: $data.showEditLocation,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.showEditLocation = $event)
    }, {
      default: withCtx(() => [
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "row items-center q-pb-none" }, {
              default: withCtx(() => [
                _hoisted_3$1,
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
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createVNode(_component_EditLocationDialog, {
                  onEditLocationSuccess: $options.editLocationSuccess,
                  locationInfo: $props.locationInfo,
                  marketLogo: $props.marketLogo,
                  marketName: $props.marketName
                }, null, 8, ["onEditLocationSuccess", "locationInfo", "marketLogo", "marketName"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    createVNode(QDialog, {
      modelValue: $data.showDeleteLocation,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.showDeleteLocation = $event),
      persistent: ""
    }, {
      default: withCtx(() => [
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "row items-center" }, {
              default: withCtx(() => [
                createBaseVNode("span", _hoisted_4$1, "Are you sure you want to delete " + toDisplayString($props.locationInfo.name) + "?", 1)
              ]),
              _: 1
            }),
            createVNode(QCardActions, { align: "right" }, {
              default: withCtx(() => [
                withDirectives(createVNode(QBtn, {
                  flat: "",
                  label: "Cancel",
                  color: "primary"
                }, null, 512), [
                  [ClosePopup]
                ]),
                createVNode(QBtn, {
                  flat: "",
                  label: "Delete",
                  color: "red",
                  onClick: $options.deleteLocation
                }, null, 8, ["onClick"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ], 64);
}
var LocationCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-49cb386c"], ["__file", "LocationCard.vue"]]);
var AddLocationMapGoogle_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = {
  data() {
    return {
      openedMarkerID: null,
      myCoordinates: {
        lat: 0,
        lng: 0
      },
      zoom: 10
    };
  },
  props: ["market", "locationsToBeDisplayed"],
  computed: {
    icon() {
      return {
        url: this.market.logo,
        scaledSize: { width: 30, height: 30 },
        labelOrigin: { x: 16, y: -10 }
      };
    }
  },
  created() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.myCoordinates.lat = position.coords.latitude;
        this.myCoordinates.lng = position.coords.longitude;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    markLocation(e) {
      this.$emit("emitCoords", e.latLng);
    },
    openMarker(id) {
      this.openedMarkerID = id;
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_GMapInfoWindow = resolveComponent("GMapInfoWindow");
  const _component_GMapMarker = resolveComponent("GMapMarker");
  const _component_GMapMap = resolveComponent("GMapMap");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_GMapMap, {
      center: $data.myCoordinates,
      zoom: $data.zoom,
      class: "map-style",
      onClick: $options.markLocation
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.locationsToBeDisplayed, (location, index) => {
          return openBlock(), createBlock(_component_GMapMarker, {
            key: index,
            position: location.coordinates,
            icon: $options.icon,
            clickable: true,
            onClick: ($event) => $options.openMarker(location._id)
          }, {
            default: withCtx(() => [
              createVNode(_component_GMapInfoWindow, {
                closeclick: true,
                onCloseclick: _cache[0] || (_cache[0] = ($event) => $options.openMarker(null)),
                opened: $data.openedMarkerID === location._id
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", null, toDisplayString(location.address), 1)
                ]),
                _: 2
              }, 1032, ["opened"])
            ]),
            _: 2
          }, 1032, ["position", "icon", "onClick"]);
        }), 128))
      ]),
      _: 1
    }, 8, ["center", "zoom", "onClick"])
  ]);
}
var AddLocationMapGoogle = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-35e79f8c"], ["__file", "AddLocationMapGoogle.vue"]]);
var MarketDetailsPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  name: "MarketDetailPage",
  async mounted() {
    await this.fetchMarket();
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({ title: this.market.name, showBackIcon: true });
  },
  components: {
    LocationCard,
    AddLocationMapGoogle
  },
  data() {
    return {
      market: null,
      showAddLocation: false,
      lat: null,
      lng: null,
      address: null,
      locationsLength: 0,
      openingHours: "",
      locationsToBeDisplayed: [],
      search: ""
    };
  },
  computed: {
    filteredLocations() {
      return this.market.locations.filter(
        (loc) => loc.address.toLowerCase().indexOf(this.search) > -1
      );
    }
  },
  methods: {
    async saveLocation() {
      try {
        const locationName = this.address.split(",")[0];
        const data = {
          name: this.market.name + " " + locationName,
          address: this.address,
          openingHours: this.openingHours,
          coordinates: {
            lat: this.lat,
            lng: this.lng
          },
          productsList: [],
          marketId: this.$route.params.marketId,
          coordinatesGeoJSON: {
            coordinates: [this.lat, this.lng]
          }
        };
        const res = await this.$api.post("/locations", data);
        if (res.data.status === "success") {
          await this.fetchMarket();
          this.showAddLocation = false;
          this.resetFields();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchMarket() {
      const res = await this.$api.get(
        `/markets/${this.$route.params.marketId}`
      );
      this.market = Object.assign(res.data.data.market);
      this.locationsToBeDisplayed = Object.assign(
        this.locationsToBeDisplayed,
        this.market.locations
      );
      this.locationsLength = this.market.locations.length;
    },
    resetFields() {
      this.lat = null;
      this.lng = null;
      this.address = "";
      this.openingHours = "";
    },
    async onEmitCoords(coords) {
      this.lat = coords.lat();
      this.lng = coords.lng();
      await this.getStreetAddressFrom(this.lat, this.lng);
      if (this.locationsToBeDisplayed.length - this.locationsLength >= 1) {
        this.locationsToBeDisplayed.splice(-1);
        this.locationsToBeDisplayed.push({
          _id: Date.now(),
          address: this.address,
          coordinates: {
            lat: this.lat,
            lng: this.lng
          }
        });
      } else {
        this.locationsToBeDisplayed.push({
          _id: Date.now(),
          address: this.address,
          coordinates: {
            lat: this.lat,
            lng: this.lng
          }
        });
      }
    },
    async getStreetAddressFrom(lat, long) {
      try {
        var { data } = await this.$axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyCaLqRmzlYh0hkEI_FtBx8nPhIS0jJH9V0"
        );
        if (data.error_message) {
          console.log(data.error_message);
        } else {
          this.address = data.results[0].formatted_address;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-26fb4b42"), n = n(), popScopeId(), n);
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { class: "style" };
const _hoisted_3 = ["src"];
const _hoisted_4 = { class: "location-header" };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = { class: "location-card__list" };
const _hoisted_7 = { key: 1 };
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Add Location", -1));
const _hoisted_9 = { style: { "font-size": "18px" } };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_LocationCard = resolveComponent("LocationCard");
  const _component_AddLocationMapGoogle = resolveComponent("AddLocationMapGoogle");
  return $data.market ? (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("img", {
        class: "logo",
        src: $data.market.logo,
        alt: "Market Logo"
      }, null, 8, _hoisted_3),
      createBaseVNode("div", _hoisted_4, toDisplayString($data.market.name), 1)
    ]),
    createVNode(QBtn, {
      class: "add-location__btn",
      onClick: _cache[0] || (_cache[0] = ($event) => $data.showAddLocation = true)
    }, {
      default: withCtx(() => [
        createTextVNode("Add Location")
      ]),
      _: 1
    }),
    $options.filteredLocations.length ? (openBlock(), createElementBlock("div", _hoisted_5, [
      createVNode(QInput, {
        modelValue: $data.search,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.search = $event),
        filled: "",
        type: "search",
        hint: "Search"
      }, {
        append: withCtx(() => [
          createVNode(QIcon, { name: "search" })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createBaseVNode("div", _hoisted_6, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.filteredLocations, (location) => {
          return openBlock(), createBlock(_component_LocationCard, {
            key: location._id,
            locationInfo: location,
            marketLogo: $data.market.logo,
            marketName: $data.market.name,
            onFetchMarket: $options.fetchMarket
          }, null, 8, ["locationInfo", "marketLogo", "marketName", "onFetchMarket"]);
        }), 128))
      ])
    ])) : createCommentVNode("", true),
    !$options.filteredLocations.length ? (openBlock(), createElementBlock("div", _hoisted_7, "No locations to show.")) : createCommentVNode("", true),
    createVNode(QDialog, {
      maximized: "",
      modelValue: $data.showAddLocation,
      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.showAddLocation = $event)
    }, {
      default: withCtx(() => [
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "row items-center q-pb-none" }, {
              default: withCtx(() => [
                _hoisted_8,
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
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createVNode(_component_AddLocationMapGoogle, {
                  onEmitCoords: $options.onEmitCoords,
                  market: $data.market,
                  locationsToBeDisplayed: $data.locationsToBeDisplayed
                }, null, 8, ["onEmitCoords", "market", "locationsToBeDisplayed"]),
                createBaseVNode("div", _hoisted_9, "Address: " + toDisplayString($data.address), 1),
                createVNode(QInput, {
                  modelValue: $data.lat,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.lat = $event),
                  type: "text",
                  label: "Latitude"
                }, null, 8, ["modelValue"]),
                createVNode(QInput, {
                  modelValue: $data.lng,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.lng = $event),
                  type: "text",
                  label: "Longitude"
                }, null, 8, ["modelValue"]),
                createVNode(QInput, {
                  modelValue: $data.openingHours,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.openingHours = $event),
                  type: "text",
                  label: "Opening Hours"
                }, null, 8, ["modelValue"]),
                createVNode(QBtn, {
                  style: { "margin": "20px", "background-color": "#267378", "color": "#fff" },
                  onClick: $options.saveLocation,
                  label: "Save Location"
                }, null, 8, ["onClick"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ])) : createCommentVNode("", true);
}
var MarketDetailsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-26fb4b42"], ["__file", "MarketDetailsPage.vue"]]);
export { MarketDetailsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya2V0RGV0YWlsc1BhZ2UuMDZkNmM5MTYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2FkbWluaXN0cmF0aW9uL0VkaXRMb2NhdGlvbkRpYWxvZy52dWUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hZG1pbmlzdHJhdGlvbi9Mb2NhdGlvbkNhcmQudnVlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYWRtaW5pc3RyYXRpb24vQWRkTG9jYXRpb25NYXBHb29nbGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0aW9uL01hcmtldERldGFpbHNQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb29yZHMtc3R5bGVcIj48L2Rpdj5cclxuICAgIDxHTWFwTWFwXHJcbiAgICAgIDpjZW50ZXI9XCJteUNvb3JkaW5hdGVzXCJcclxuICAgICAgOnpvb209XCJ6b29tXCJcclxuICAgICAgY2xhc3M9XCJtYXAtc3R5bGVcIlxyXG4gICAgICBAY2xpY2s9XCJtYXJrTG9jYXRpb25cIlxyXG4gICAgPlxyXG4gICAgICA8R01hcE1hcmtlclxyXG4gICAgICAgIDpwb3NpdGlvbj1cIm15Q29vcmRpbmF0ZXNcIlxyXG4gICAgICAgIDppY29uPVwiaWNvblwiXHJcbiAgICAgICAgOmNsaWNrYWJsZT1cInRydWVcIlxyXG4gICAgICAgIEBjbGljaz1cIm9wZW5NYXJrZXIobG9jYXRpb25JbmZvLl9pZClcIlxyXG4gICAgICAgID48R01hcEluZm9XaW5kb3dcclxuICAgICAgICAgIDpjbG9zZWNsaWNrPVwidHJ1ZVwiXHJcbiAgICAgICAgICBAY2xvc2VjbGljaz1cIm9wZW5NYXJrZXIobnVsbClcIlxyXG4gICAgICAgICAgOm9wZW5lZD1cIm9wZW5lZE1hcmtlcklEID09PSBsb2NhdGlvbkluZm8uX2lkXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2Pnt7IGFkZHJlc3MgfX08L2Rpdj5cclxuICAgICAgICA8L0dNYXBJbmZvV2luZG93PjwvR01hcE1hcmtlclxyXG4gICAgICA+XHJcbiAgICA8L0dNYXBNYXA+XHJcbiAgICA8ZGl2PkFkZHJlc3M6IHt7IGFkZHJlc3MgfX08L2Rpdj5cclxuICAgIDxxLWlucHV0IHYtbW9kZWw9XCJteUNvb3JkaW5hdGVzLmxhdFwiIHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJMYXRpdHVkZVwiIC8+XHJcbiAgICA8cS1pbnB1dCB2LW1vZGVsPVwibXlDb29yZGluYXRlcy5sbmdcIiB0eXBlPVwidGV4dFwiIGxhYmVsPVwiTG9uZ2l0dWRlXCIgLz5cclxuICAgIDxxLWlucHV0IHYtbW9kZWw9XCJvcGVuaW5nSG91cnNcIiB0eXBlPVwidGV4dFwiIGxhYmVsPVwiT3BlbmluZyBIb3Vyc1wiIC8+XHJcbiAgICA8cS1idG5cclxuICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMjY3Mzc4OyBjb2xvcjogI2ZmZlwiXHJcbiAgICAgIEBjbGljaz1cIm9uU2F2ZUxvY2F0aW9uQ2hhbmdlc1wiXHJcbiAgICAgIGxhYmVsPVwiU2F2ZSBDaGFuZ2VzXCJcclxuICAgIC8+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgb3BlbmVkTWFya2VySUQ6IG51bGwsXHJcbiAgICAgIG15Q29vcmRpbmF0ZXM6IHtcclxuICAgICAgICBsYXQ6IDAsXHJcbiAgICAgICAgbG5nOiAwLFxyXG4gICAgICB9LFxyXG4gICAgICBhZGRyZXNzOiBcIlwiLFxyXG4gICAgICBvcGVuaW5nSG91cnM6IFwiXCIsXHJcbiAgICAgIHpvb206IDE0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIHByb3BzOiBbXCJsb2NhdGlvbkluZm9cIiwgXCJtYXJrZXRMb2dvXCIsIFwibWFya2V0TmFtZVwiXSxcclxuICBtb3VudGVkKCkge1xyXG4gICAgdGhpcy5teUNvb3JkaW5hdGVzLmxhdCA9IHRoaXMubG9jYXRpb25JbmZvLmNvb3JkaW5hdGVzLmxhdDtcclxuICAgIHRoaXMubXlDb29yZGluYXRlcy5sbmcgPSB0aGlzLmxvY2F0aW9uSW5mby5jb29yZGluYXRlcy5sbmc7XHJcbiAgICB0aGlzLmFkZHJlc3MgPSB0aGlzLmxvY2F0aW9uSW5mby5hZGRyZXNzO1xyXG4gICAgdGhpcy5vcGVuaW5nSG91cnMgPSB0aGlzLmxvY2F0aW9uSW5mby5vcGVuaW5nSG91cnM7XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgaWNvbigpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1cmw6IHRoaXMubWFya2V0TG9nbyxcclxuICAgICAgICBzY2FsZWRTaXplOiB7IHdpZHRoOiAzMCwgaGVpZ2h0OiAzMCB9LFxyXG4gICAgICAgIGxhYmVsT3JpZ2luOiB7IHg6IDE2LCB5OiAtMTAgfSxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBhc3luYyBtYXJrTG9jYXRpb24oZSkge1xyXG4gICAgICB0aGlzLm15Q29vcmRpbmF0ZXMubGF0ID0gZS5sYXRMbmcubGF0KCk7XHJcbiAgICAgIHRoaXMubXlDb29yZGluYXRlcy5sbmcgPSBlLmxhdExuZy5sbmcoKTtcclxuICAgICAgYXdhaXQgdGhpcy5nZXRTdHJlZXRBZGRyZXNzRnJvbShcclxuICAgICAgICB0aGlzLm15Q29vcmRpbmF0ZXMubGF0LFxyXG4gICAgICAgIHRoaXMubXlDb29yZGluYXRlcy5sbmdcclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgICBvcGVuTWFya2VyKGlkKSB7XHJcbiAgICAgIHRoaXMub3BlbmVkTWFya2VySUQgPSBpZDtcclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRTdHJlZXRBZGRyZXNzRnJvbShsYXQsIGxvbmcpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB2YXIgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLiRheGlvcy5nZXQoXHJcbiAgICAgICAgICBcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/bGF0bG5nPVwiICtcclxuICAgICAgICAgICAgbGF0ICtcclxuICAgICAgICAgICAgXCIsXCIgK1xyXG4gICAgICAgICAgICBsb25nICtcclxuICAgICAgICAgICAgXCIma2V5PUFJemFTeUNhTHFSbXpsWWgwaGtFSV9GdEJ4OG5QaElTMGpKSDlWMFwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoZGF0YS5lcnJvcl9tZXNzYWdlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmVycm9yX21lc3NhZ2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLnJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3M7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgb25TYXZlTG9jYXRpb25DaGFuZ2VzKCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uTmFtZSA9IHRoaXMuYWRkcmVzcy5zcGxpdChcIixcIilbMF07XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgIG5hbWU6IHRoaXMubWFya2V0TmFtZSArIFwiIFwiICsgbG9jYXRpb25OYW1lLFxyXG4gICAgICAgICAgYWRkcmVzczogdGhpcy5hZGRyZXNzLFxyXG4gICAgICAgICAgb3BlbmluZ0hvdXJzOiB0aGlzLm9wZW5pbmdIb3VycyxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzOiB7XHJcbiAgICAgICAgICAgIGxhdDogdGhpcy5teUNvb3JkaW5hdGVzLmxhdCxcclxuICAgICAgICAgICAgbG5nOiB0aGlzLm15Q29vcmRpbmF0ZXMubG5nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5wYXRjaChcclxuICAgICAgICAgIGAvbG9jYXRpb25zLyR7dGhpcy5sb2NhdGlvbkluZm8uX2lkfWAsXHJcbiAgICAgICAgICBkYXRhXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcImVkaXRMb2NhdGlvblN1Y2Nlc3NcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5jb29yZHMtc3R5bGUge1xyXG4gIG1heC13aWR0aDogODAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuLm1hcC1zdHlsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAzNjBweDtcclxuICBtYXJnaW46IDE2cHggYXV0bztcclxufVxyXG48L3N0eWxlPlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPHEtc2xpZGUtaXRlbVxyXG4gICAgQGxlZnQ9XCJzaG93RWRpdExvY2F0aW9uRGlhbG9nXCJcclxuICAgIEByaWdodD1cInNob3dEZWxldGVMb2NhdGlvbkRpYWxvZ1wiXHJcbiAgICBAY2xpY2s9XCJnb1RvTG9jYXRpb25EZXRhaWxzUGFnZVwiXHJcbiAgPlxyXG4gICAgPHRlbXBsYXRlIHYtc2xvdDpsZWZ0PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlclwiPjxxLWljb24gbGVmdCBuYW1lPVwiZWRpdFwiIC8+IEVkaXQ8L2Rpdj5cclxuICAgIDwvdGVtcGxhdGU+XHJcbiAgICA8dGVtcGxhdGUgdi1zbG90OnJpZ2h0PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlclwiPkRlbGV0ZSA8cS1pY29uIHJpZ2h0IG5hbWU9XCJkZWxldGVcIiAvPjwvZGl2PlxyXG4gICAgPC90ZW1wbGF0ZT5cclxuXHJcbiAgICA8cS1pdGVtPlxyXG4gICAgICA8cS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgPGRpdj57eyBsb2NhdGlvbkluZm8ubmFtZSB9fTwvZGl2PlxyXG4gICAgICAgIDxkaXY+QWRyZXNhOiB7eyBsb2NhdGlvbkluZm8uYWRkcmVzcyB9fTwvZGl2PlxyXG4gICAgICAgIDxkaXY+UHJvZ3JhbToge3sgbG9jYXRpb25JbmZvLm9wZW5pbmdIb3VycyB9fTwvZGl2PjwvcS1pdGVtLXNlY3Rpb25cclxuICAgICAgPlxyXG4gICAgPC9xLWl0ZW0+XHJcbiAgPC9xLXNsaWRlLWl0ZW0+XHJcbiAgPHEtZGlhbG9nIG1heGltaXplZCB2LW1vZGVsPVwic2hvd0VkaXRMb2NhdGlvblwiPlxyXG4gICAgPHEtY2FyZD5cclxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXBiLW5vbmVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPkVkaXQgTG9jYXRpb248L2Rpdj5cclxuICAgICAgICA8cS1zcGFjZSAvPlxyXG4gICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IHJvdW5kIGRlbnNlIHYtY2xvc2UtcG9wdXAgLz5cclxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuXHJcbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICA8RWRpdExvY2F0aW9uRGlhbG9nXHJcbiAgICAgICAgICBAZWRpdExvY2F0aW9uU3VjY2Vzcz1cImVkaXRMb2NhdGlvblN1Y2Nlc3NcIlxyXG4gICAgICAgICAgOmxvY2F0aW9uSW5mbz1cImxvY2F0aW9uSW5mb1wiXHJcbiAgICAgICAgICA6bWFya2V0TG9nbz1cIm1hcmtldExvZ29cIlxyXG4gICAgICAgICAgOm1hcmtldE5hbWU9XCJtYXJrZXROYW1lXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG4gICAgPC9xLWNhcmQ+XHJcbiAgPC9xLWRpYWxvZz5cclxuICA8cS1kaWFsb2cgdi1tb2RlbD1cInNob3dEZWxldGVMb2NhdGlvblwiIHBlcnNpc3RlbnQ+XHJcbiAgICA8cS1jYXJkPlxyXG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJxLW1sLXNtXCJcclxuICAgICAgICAgID5BcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHt7IGxvY2F0aW9uSW5mby5uYW1lIH19Pzwvc3BhblxyXG4gICAgICAgID5cclxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuXHJcbiAgICAgIDxxLWNhcmQtYWN0aW9ucyBhbGlnbj1cInJpZ2h0XCI+XHJcbiAgICAgICAgPHEtYnRuIGZsYXQgbGFiZWw9XCJDYW5jZWxcIiBjb2xvcj1cInByaW1hcnlcIiB2LWNsb3NlLXBvcHVwIC8+XHJcbiAgICAgICAgPHEtYnRuIGZsYXQgbGFiZWw9XCJEZWxldGVcIiBjb2xvcj1cInJlZFwiIEBjbGljaz1cImRlbGV0ZUxvY2F0aW9uXCIgLz5cclxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cclxuICAgIDwvcS1jYXJkPlxyXG4gIDwvcS1kaWFsb2c+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgRWRpdExvY2F0aW9uRGlhbG9nIGZyb20gXCJzcmMvY29tcG9uZW50cy9hZG1pbmlzdHJhdGlvbi9FZGl0TG9jYXRpb25EaWFsb2cudnVlXCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIkxvY2F0aW9uQ2FyZFwiLFxyXG4gIHByb3BzOiBbXCJsb2NhdGlvbkluZm9cIiwgXCJtYXJrZXRMb2dvXCIsIFwibWFya2V0TmFtZVwiXSxcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICBFZGl0TG9jYXRpb25EaWFsb2csXHJcbiAgfSxcclxuICBlbWl0czogW1wiZmV0Y2hNYXJrZXRcIl0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNob3dFZGl0TG9jYXRpb246IGZhbHNlLFxyXG4gICAgICBzaG93RGVsZXRlTG9jYXRpb246IGZhbHNlLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGJlZm9yZVVubW91bnQoKSB7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBmaW5hbGl6ZShyZXNldCkge1xyXG4gICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgcmVzZXQoKTtcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9LFxyXG4gICAgZ29Ub0xvY2F0aW9uRGV0YWlsc1BhZ2UoKSB7XHJcbiAgICAgIHRoaXMuJHJvdXRlci5wdXNoKFxyXG4gICAgICAgIGAvYWRtaW5pc3RyYXRpb24vbWFya2V0cy8ke3RoaXMuJHJvdXRlLnBhcmFtcy5tYXJrZXRJZH0vJHt0aGlzLmxvY2F0aW9uSW5mby5faWR9YFxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIHNob3dFZGl0TG9jYXRpb25EaWFsb2coeyByZXNldCB9KSB7XHJcbiAgICAgIHRoaXMuc2hvd0VkaXRMb2NhdGlvbiA9IHRydWU7XHJcbiAgICAgIHRoaXMuZmluYWxpemUocmVzZXQpO1xyXG4gICAgfSxcclxuICAgIHNob3dEZWxldGVMb2NhdGlvbkRpYWxvZyh7IHJlc2V0IH0pIHtcclxuICAgICAgdGhpcy5zaG93RGVsZXRlTG9jYXRpb24gPSB0cnVlO1xyXG4gICAgICB0aGlzLmZpbmFsaXplKHJlc2V0KTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBkZWxldGVMb2NhdGlvbigpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkuZGVsZXRlKFxyXG4gICAgICAgICAgYC9sb2NhdGlvbnMvJHt0aGlzLmxvY2F0aW9uSW5mby5faWR9LyR7dGhpcy4kcm91dGUucGFyYW1zLm1hcmtldElkfWBcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiZmV0Y2hNYXJrZXRcIik7XHJcbiAgICAgICAgICB0aGlzLnNob3dEZWxldGVMb2NhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGVkaXRMb2NhdGlvblN1Y2Nlc3MoKSB7XHJcbiAgICAgIHRoaXMuc2hvd0VkaXRMb2NhdGlvbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLiRlbWl0KFwiZmV0Y2hNYXJrZXRcIik7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLnRleHQtaDYge1xyXG4gIGNvbG9yOiAjMjY3Mzc4O1xyXG59XHJcbjwvc3R5bGU+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG4gICAgPEdNYXBNYXBcclxuICAgICAgOmNlbnRlcj1cIm15Q29vcmRpbmF0ZXNcIlxyXG4gICAgICA6em9vbT1cInpvb21cIlxyXG4gICAgICBjbGFzcz1cIm1hcC1zdHlsZVwiXHJcbiAgICAgIEBjbGljaz1cIm1hcmtMb2NhdGlvblwiXHJcbiAgICA+XHJcbiAgICAgIDxHTWFwTWFya2VyXHJcbiAgICAgICAgOmtleT1cImluZGV4XCJcclxuICAgICAgICB2LWZvcj1cIihsb2NhdGlvbiwgaW5kZXgpIGluIGxvY2F0aW9uc1RvQmVEaXNwbGF5ZWRcIlxyXG4gICAgICAgIDpwb3NpdGlvbj1cImxvY2F0aW9uLmNvb3JkaW5hdGVzXCJcclxuICAgICAgICA6aWNvbj1cImljb25cIlxyXG4gICAgICAgIDpjbGlja2FibGU9XCJ0cnVlXCJcclxuICAgICAgICBAY2xpY2s9XCJvcGVuTWFya2VyKGxvY2F0aW9uLl9pZClcIlxyXG4gICAgICAgID48R01hcEluZm9XaW5kb3dcclxuICAgICAgICAgIDpjbG9zZWNsaWNrPVwidHJ1ZVwiXHJcbiAgICAgICAgICBAY2xvc2VjbGljaz1cIm9wZW5NYXJrZXIobnVsbClcIlxyXG4gICAgICAgICAgOm9wZW5lZD1cIm9wZW5lZE1hcmtlcklEID09PSBsb2NhdGlvbi5faWRcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXY+e3sgbG9jYXRpb24uYWRkcmVzcyB9fTwvZGl2PlxyXG4gICAgICAgIDwvR01hcEluZm9XaW5kb3c+PC9HTWFwTWFya2VyXHJcbiAgICAgID5cclxuICAgIDwvR01hcE1hcD5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgb3BlbmVkTWFya2VySUQ6IG51bGwsXHJcbiAgICAgIG15Q29vcmRpbmF0ZXM6IHtcclxuICAgICAgICBsYXQ6IDAsXHJcbiAgICAgICAgbG5nOiAwLFxyXG4gICAgICB9LFxyXG4gICAgICB6b29tOiAxMCxcclxuICAgIH07XHJcbiAgfSxcclxuICBwcm9wczogW1wibWFya2V0XCIsIFwibG9jYXRpb25zVG9CZURpc3BsYXllZFwiXSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgaWNvbigpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1cmw6IHRoaXMubWFya2V0LmxvZ28sXHJcbiAgICAgICAgc2NhbGVkU2l6ZTogeyB3aWR0aDogMzAsIGhlaWdodDogMzAgfSxcclxuICAgICAgICBsYWJlbE9yaWdpbjogeyB4OiAxNiwgeTogLTEwIH0sXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3JlYXRlZCgpIHtcclxuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXHJcbiAgICAgIChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgIHRoaXMubXlDb29yZGluYXRlcy5sYXQgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XHJcbiAgICAgICAgdGhpcy5teUNvb3JkaW5hdGVzLmxuZyA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XHJcbiAgICAgIH0sXHJcbiAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIG1hcmtMb2NhdGlvbihlKSB7XHJcbiAgICAgIHRoaXMuJGVtaXQoXCJlbWl0Q29vcmRzXCIsIGUubGF0TG5nKTtcclxuICAgIH0sXHJcbiAgICBvcGVuTWFya2VyKGlkKSB7XHJcbiAgICAgIHRoaXMub3BlbmVkTWFya2VySUQgPSBpZDtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4uY29vcmRzLXN0eWxlIHtcclxuICBtYXgtd2lkdGg6IDgwMHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuXHJcbi5tYXAtc3R5bGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMzYwcHg7XHJcbiAgbWFyZ2luOiAxNnB4IGF1dG87XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgdi1pZj1cIm1hcmtldFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInN0eWxlXCI+XHJcbiAgICAgIDxpbWcgY2xhc3M9XCJsb2dvXCIgOnNyYz1cIm1hcmtldC5sb2dvXCIgYWx0PVwiTWFya2V0IExvZ29cIiAvPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibG9jYXRpb24taGVhZGVyXCI+e3sgbWFya2V0Lm5hbWUgfX08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPHEtYnRuIGNsYXNzPVwiYWRkLWxvY2F0aW9uX19idG5cIiBAY2xpY2s9XCJzaG93QWRkTG9jYXRpb24gPSB0cnVlXCJcclxuICAgICAgPkFkZCBMb2NhdGlvbjwvcS1idG5cclxuICAgID5cclxuICAgIDxkaXYgdi1pZj1cImZpbHRlcmVkTG9jYXRpb25zLmxlbmd0aFwiPlxyXG4gICAgICA8cS1pbnB1dCB2LW1vZGVsPVwic2VhcmNoXCIgZmlsbGVkIHR5cGU9XCJzZWFyY2hcIiBoaW50PVwiU2VhcmNoXCI+XHJcbiAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XHJcbiAgICAgICAgICA8cS1pY29uIG5hbWU9XCJzZWFyY2hcIiAvPlxyXG4gICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgIDwvcS1pbnB1dD5cclxuICAgICAgPGRpdiBjbGFzcz1cImxvY2F0aW9uLWNhcmRfX2xpc3RcIj5cclxuICAgICAgICA8TG9jYXRpb25DYXJkXHJcbiAgICAgICAgICB2LWZvcj1cImxvY2F0aW9uIGluIGZpbHRlcmVkTG9jYXRpb25zXCJcclxuICAgICAgICAgIDprZXk9XCJsb2NhdGlvbi5faWRcIlxyXG4gICAgICAgICAgOmxvY2F0aW9uSW5mbz1cImxvY2F0aW9uXCJcclxuICAgICAgICAgIDptYXJrZXRMb2dvPVwibWFya2V0LmxvZ29cIlxyXG4gICAgICAgICAgOm1hcmtldE5hbWU9XCJtYXJrZXQubmFtZVwiXHJcbiAgICAgICAgICBAZmV0Y2hNYXJrZXQ9XCJmZXRjaE1hcmtldFwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgdi1pZj1cIiFmaWx0ZXJlZExvY2F0aW9ucy5sZW5ndGhcIj5ObyBsb2NhdGlvbnMgdG8gc2hvdy48L2Rpdj5cclxuICAgIDxxLWRpYWxvZyBtYXhpbWl6ZWQgdi1tb2RlbD1cInNob3dBZGRMb2NhdGlvblwiPlxyXG4gICAgICA8cS1jYXJkPlxyXG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1wYi1ub25lXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPkFkZCBMb2NhdGlvbjwvZGl2PlxyXG4gICAgICAgICAgPHEtc3BhY2UgLz5cclxuICAgICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IHJvdW5kIGRlbnNlIHYtY2xvc2UtcG9wdXAgLz5cclxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG5cclxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgICAgICA8QWRkTG9jYXRpb25NYXBHb29nbGVcclxuICAgICAgICAgICAgQGVtaXRDb29yZHM9XCJvbkVtaXRDb29yZHNcIlxyXG4gICAgICAgICAgICA6bWFya2V0PVwibWFya2V0XCJcclxuICAgICAgICAgICAgOmxvY2F0aW9uc1RvQmVEaXNwbGF5ZWQ9XCJsb2NhdGlvbnNUb0JlRGlzcGxheWVkXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxOHB4XCI+QWRkcmVzczoge3sgYWRkcmVzcyB9fTwvZGl2PlxyXG4gICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cImxhdFwiIHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJMYXRpdHVkZVwiIC8+XHJcbiAgICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwibG5nXCIgdHlwZT1cInRleHRcIiBsYWJlbD1cIkxvbmdpdHVkZVwiIC8+XHJcbiAgICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwib3BlbmluZ0hvdXJzXCIgdHlwZT1cInRleHRcIiBsYWJlbD1cIk9wZW5pbmcgSG91cnNcIiAvPlxyXG4gICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgIHN0eWxlPVwibWFyZ2luOiAyMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjMjY3Mzc4OyBjb2xvcjogI2ZmZlwiXHJcbiAgICAgICAgICAgIEBjbGljaz1cInNhdmVMb2NhdGlvblwiXHJcbiAgICAgICAgICAgIGxhYmVsPVwiU2F2ZSBMb2NhdGlvblwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgIDwvcS1jYXJkPlxyXG4gICAgPC9xLWRpYWxvZz5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBMb2NhdGlvbkNhcmQgZnJvbSBcInNyYy9jb21wb25lbnRzL2FkbWluaXN0cmF0aW9uL0xvY2F0aW9uQ2FyZC52dWVcIjtcclxuaW1wb3J0IEFkZExvY2F0aW9uTWFwR29vZ2xlIGZyb20gXCJzcmMvY29tcG9uZW50cy9hZG1pbmlzdHJhdGlvbi9BZGRMb2NhdGlvbk1hcEdvb2dsZS52dWVcIjtcclxuaW1wb3J0IHsgdXNlRGFzaEhlYWRlclN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZGFzaC1oZWFkZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIk1hcmtldERldGFpbFBhZ2VcIixcclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgYXdhaXQgdGhpcy5mZXRjaE1hcmtldCgpO1xyXG4gICAgY29uc3QgZGFzaEhlYWRlciA9IHVzZURhc2hIZWFkZXJTdG9yZSgpO1xyXG4gICAgZGFzaEhlYWRlci4kcGF0Y2goeyB0aXRsZTogdGhpcy5tYXJrZXQubmFtZSwgc2hvd0JhY2tJY29uOiB0cnVlIH0pO1xyXG4gIH0sXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgTG9jYXRpb25DYXJkLFxyXG4gICAgQWRkTG9jYXRpb25NYXBHb29nbGUsXHJcbiAgfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWFya2V0OiBudWxsLFxyXG4gICAgICBzaG93QWRkTG9jYXRpb246IGZhbHNlLFxyXG4gICAgICBsYXQ6IG51bGwsXHJcbiAgICAgIGxuZzogbnVsbCxcclxuICAgICAgYWRkcmVzczogbnVsbCxcclxuICAgICAgbG9jYXRpb25zTGVuZ3RoOiAwLFxyXG4gICAgICBvcGVuaW5nSG91cnM6IFwiXCIsXHJcbiAgICAgIGxvY2F0aW9uc1RvQmVEaXNwbGF5ZWQ6IFtdLFxyXG4gICAgICBzZWFyY2g6IFwiXCIsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGZpbHRlcmVkTG9jYXRpb25zKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5tYXJrZXQubG9jYXRpb25zLmZpbHRlcihcclxuICAgICAgICAobG9jKSA9PiBsb2MuYWRkcmVzcy50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5zZWFyY2gpID4gLTFcclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBhc3luYyBzYXZlTG9jYXRpb24oKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb25OYW1lID0gdGhpcy5hZGRyZXNzLnNwbGl0KFwiLFwiKVswXTtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgbmFtZTogdGhpcy5tYXJrZXQubmFtZSArIFwiIFwiICsgbG9jYXRpb25OYW1lLFxyXG4gICAgICAgICAgYWRkcmVzczogdGhpcy5hZGRyZXNzLFxyXG4gICAgICAgICAgb3BlbmluZ0hvdXJzOiB0aGlzLm9wZW5pbmdIb3VycyxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzOiB7XHJcbiAgICAgICAgICAgIGxhdDogdGhpcy5sYXQsXHJcbiAgICAgICAgICAgIGxuZzogdGhpcy5sbmcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcHJvZHVjdHNMaXN0OiBbXSxcclxuICAgICAgICAgIG1hcmtldElkOiB0aGlzLiRyb3V0ZS5wYXJhbXMubWFya2V0SWQsXHJcbiAgICAgICAgICBjb29yZGluYXRlc0dlb0pTT046IHtcclxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFt0aGlzLmxhdCwgdGhpcy5sbmddLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5wb3N0KFwiL2xvY2F0aW9uc1wiLCBkYXRhKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgYXdhaXQgdGhpcy5mZXRjaE1hcmtldCgpO1xyXG4gICAgICAgICAgdGhpcy5zaG93QWRkTG9jYXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMucmVzZXRGaWVsZHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZmV0Y2hNYXJrZXQoKSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5nZXQoXHJcbiAgICAgICAgYC9tYXJrZXRzLyR7dGhpcy4kcm91dGUucGFyYW1zLm1hcmtldElkfWBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5tYXJrZXQgPSBPYmplY3QuYXNzaWduKHJlcy5kYXRhLmRhdGEubWFya2V0KTtcclxuICAgICAgdGhpcy5sb2NhdGlvbnNUb0JlRGlzcGxheWVkID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAgICB0aGlzLmxvY2F0aW9uc1RvQmVEaXNwbGF5ZWQsXHJcbiAgICAgICAgdGhpcy5tYXJrZXQubG9jYXRpb25zXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMubG9jYXRpb25zTGVuZ3RoID0gdGhpcy5tYXJrZXQubG9jYXRpb25zLmxlbmd0aDtcclxuICAgIH0sXHJcbiAgICByZXNldEZpZWxkcygpIHtcclxuICAgICAgdGhpcy5sYXQgPSBudWxsO1xyXG4gICAgICB0aGlzLmxuZyA9IG51bGw7XHJcbiAgICAgIHRoaXMuYWRkcmVzcyA9IFwiXCI7XHJcbiAgICAgIHRoaXMub3BlbmluZ0hvdXJzID0gXCJcIjtcclxuICAgIH0sXHJcbiAgICBhc3luYyBvbkVtaXRDb29yZHMoY29vcmRzKSB7XHJcbiAgICAgIHRoaXMubGF0ID0gY29vcmRzLmxhdCgpO1xyXG4gICAgICB0aGlzLmxuZyA9IGNvb3Jkcy5sbmcoKTtcclxuICAgICAgYXdhaXQgdGhpcy5nZXRTdHJlZXRBZGRyZXNzRnJvbSh0aGlzLmxhdCwgdGhpcy5sbmcpO1xyXG4gICAgICBpZiAodGhpcy5sb2NhdGlvbnNUb0JlRGlzcGxheWVkLmxlbmd0aCAtIHRoaXMubG9jYXRpb25zTGVuZ3RoID49IDEpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uc1RvQmVEaXNwbGF5ZWQuc3BsaWNlKC0xKTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uc1RvQmVEaXNwbGF5ZWQucHVzaCh7XHJcbiAgICAgICAgICBfaWQ6IERhdGUubm93KCksXHJcbiAgICAgICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3MsXHJcbiAgICAgICAgICBjb29yZGluYXRlczoge1xyXG4gICAgICAgICAgICBsYXQ6IHRoaXMubGF0LFxyXG4gICAgICAgICAgICBsbmc6IHRoaXMubG5nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uc1RvQmVEaXNwbGF5ZWQucHVzaCh7XHJcbiAgICAgICAgICBfaWQ6IERhdGUubm93KCksXHJcbiAgICAgICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3MsXHJcbiAgICAgICAgICBjb29yZGluYXRlczoge1xyXG4gICAgICAgICAgICBsYXQ6IHRoaXMubGF0LFxyXG4gICAgICAgICAgICBsbmc6IHRoaXMubG5nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldFN0cmVldEFkZHJlc3NGcm9tKGxhdCwgbG9uZykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHZhciB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuJGF4aW9zLmdldChcclxuICAgICAgICAgIFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9sYXRsbmc9XCIgK1xyXG4gICAgICAgICAgICBsYXQgK1xyXG4gICAgICAgICAgICBcIixcIiArXHJcbiAgICAgICAgICAgIGxvbmcgK1xyXG4gICAgICAgICAgICBcIiZrZXk9QUl6YVN5Q2FMcVJtemxZaDBoa0VJX0Z0Qng4blBoSVMwakpIOVYwXCJcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChkYXRhLmVycm9yX21lc3NhZ2UpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuZXJyb3JfbWVzc2FnZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEucmVzdWx0c1swXS5mb3JtYXR0ZWRfYWRkcmVzcztcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4ubG9jYXRpb24taGVhZGVyIHtcclxuICBmb250LXNpemU6IDMycHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi10b3A6IDIwcHg7XHJcbn1cclxuXHJcbi5sb2dvIHtcclxuICB3aWR0aDogODBweDtcclxuICBoZWlnaHQ6IDgwcHg7XHJcbn1cclxuXHJcbi5zdHlsZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBnYXA6IDMwcHg7XHJcbiAgbWFyZ2luOiAxMHB4IDA7XHJcbn1cclxuXHJcbi50ZXh0LWg2IHtcclxuICBjb2xvcjogIzI2NzM3ODtcclxufVxyXG5cclxuLmxvY2F0aW9uLWNhcmRfX2xpc3Qge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDIwcHg7XHJcbn1cclxuXHJcbi5hZGQtbG9jYXRpb25fX2J0biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2NzM3ODtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgbWFyZ2luOiAxMHB4O1xyXG59XHJcbjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6WyJfc2ZjX21haW4iLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9ob2lzdGVkXzEiLCJfY3JlYXRlVk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2hvaXN0ZWRfMiIsIl9ob2lzdGVkXzMiLCJfd2l0aFNjb3BlSWQiLCJfaG9pc3RlZF80IiwiX29wZW5CbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX2NyZWF0ZUJsb2NrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW1DQSxNQUFLQSxjQUFVO0FBQUEsRUFDYixPQUFPO0FBQ0wsV0FBTztBQUFBLE1BQ0wsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLFFBQ2IsS0FBSztBQUFBLFFBQ0wsS0FBSztBQUFBLE1BQ047QUFBQSxNQUNELFNBQVM7QUFBQSxNQUNULGNBQWM7QUFBQSxNQUNkLE1BQU07QUFBQTtFQUVUO0FBQUEsRUFDRCxPQUFPLENBQUMsZ0JBQWdCLGNBQWMsWUFBWTtBQUFBLEVBQ2xELFVBQVU7QUFDUixTQUFLLGNBQWMsTUFBTSxLQUFLLGFBQWEsWUFBWTtBQUN2RCxTQUFLLGNBQWMsTUFBTSxLQUFLLGFBQWEsWUFBWTtBQUN2RCxTQUFLLFVBQVUsS0FBSyxhQUFhO0FBQ2pDLFNBQUss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
