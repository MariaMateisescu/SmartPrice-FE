import { _ as _export_sfc, aL as resolveComponent, o as openBlock, c as createElementBlock, aa as createVNode, b5 as withCtx, a as createBaseVNode, M as toDisplayString, bE as QBtn, aH as pushScopeId, aF as popScopeId, bC as QIcon, a9 as createTextVNode, b7 as withDirectives, Q as Fragment, aK as renderList, a2 as createBlock, bB as useDashHeaderStore, a3 as createCommentVNode } from "./index.0ce84b9b.js";
import { Q as QInput } from "./QInput.4104ffc2.js";
import { Q as QSpace, a as QDialog } from "./QDialog.27e255cd.js";
import { Q as QCard, a as QCardSection } from "./QCard.511536db.js";
import { C as ClosePopup } from "./ClosePopup.fcd43a0a.js";
import { Q as QItem, a as QItemSection } from "./QItem.742a43b4.js";
import { Q as QSlideItem } from "./QSlideItem.ca1c7a33.js";
import { Q as QCardActions } from "./QCardActions.9dd12f15.js";
import "./use-dark.089fd8b8.js";
import "./uid.42677368.js";
import "./focus-manager.d6507951.js";
import "./use-form.e754bc19.js";
import "./use-timeout.0140a5e1.js";
import "./TouchPan.43131768.js";
import "./selection.0c91ca54.js";
import "./use-cache.b0833c75.js";
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
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + `&key=${"AIzaSyCaLqRmzlYh0hkEI_FtBx8nPhIS0jJH9V0"}`
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
const _withScopeId$2 = (n) => (pushScopeId("data-v-30789d56"), n = n(), popScopeId(), n);
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
var EditLocationDialog = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-30789d56"], ["__file", "EditLocationDialog.vue"]]);
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
        let res = await this.$axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + `&key=${"AIzaSyCaLqRmzlYh0hkEI_FtBx8nPhIS0jJH9V0"}`
        );
        if (res.data.error_message) {
          console.log(res.data.error_message);
        } else {
          this.address = res.data.results[0].formatted_address;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-ffc7cc8c"), n = n(), popScopeId(), n);
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { class: "style" };
const _hoisted_3 = ["src"];
const _hoisted_4 = { class: "location-header" };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = { class: "location-card__list" };
const _hoisted_7 = { key: 1 };
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Add Location", -1));
const _hoisted_9 = { style: { "font-size": "18px" } };
const _hoisted_10 = { class: "save-location__container" };
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
    $options.filteredLocations.length ? (openBlock(), createElementBlock("div", _hoisted_5, [
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
                createBaseVNode("div", _hoisted_10, [
                  createVNode(QBtn, {
                    style: { "background-color": "#267378", "color": "#fff" },
                    onClick: $options.saveLocation,
                    label: "Save Location"
                  }, null, 8, ["onClick"])
                ])
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
var MarketDetailsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ffc7cc8c"], ["__file", "MarketDetailsPage.vue"]]);
export { MarketDetailsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya2V0RGV0YWlsc1BhZ2UuMjgwNmI0NjkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2FkbWluaXN0cmF0aW9uL0VkaXRMb2NhdGlvbkRpYWxvZy52dWUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hZG1pbmlzdHJhdGlvbi9Mb2NhdGlvbkNhcmQudnVlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYWRtaW5pc3RyYXRpb24vQWRkTG9jYXRpb25NYXBHb29nbGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0aW9uL01hcmtldERldGFpbHNQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb29yZHMtc3R5bGVcIj48L2Rpdj5cclxuICAgIDxHTWFwTWFwXHJcbiAgICAgIDpjZW50ZXI9XCJteUNvb3JkaW5hdGVzXCJcclxuICAgICAgOnpvb209XCJ6b29tXCJcclxuICAgICAgY2xhc3M9XCJtYXAtc3R5bGVcIlxyXG4gICAgICBAY2xpY2s9XCJtYXJrTG9jYXRpb25cIlxyXG4gICAgPlxyXG4gICAgICA8R01hcE1hcmtlclxyXG4gICAgICAgIDpwb3NpdGlvbj1cIm15Q29vcmRpbmF0ZXNcIlxyXG4gICAgICAgIDppY29uPVwiaWNvblwiXHJcbiAgICAgICAgOmNsaWNrYWJsZT1cInRydWVcIlxyXG4gICAgICAgIEBjbGljaz1cIm9wZW5NYXJrZXIobG9jYXRpb25JbmZvLl9pZClcIlxyXG4gICAgICAgID48R01hcEluZm9XaW5kb3dcclxuICAgICAgICAgIDpjbG9zZWNsaWNrPVwidHJ1ZVwiXHJcbiAgICAgICAgICBAY2xvc2VjbGljaz1cIm9wZW5NYXJrZXIobnVsbClcIlxyXG4gICAgICAgICAgOm9wZW5lZD1cIm9wZW5lZE1hcmtlcklEID09PSBsb2NhdGlvbkluZm8uX2lkXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2Pnt7IGFkZHJlc3MgfX08L2Rpdj5cclxuICAgICAgICA8L0dNYXBJbmZvV2luZG93PjwvR01hcE1hcmtlclxyXG4gICAgICA+XHJcbiAgICA8L0dNYXBNYXA+XHJcbiAgICA8ZGl2PkFkZHJlc3M6IHt7IGFkZHJlc3MgfX08L2Rpdj5cclxuICAgIDxxLWlucHV0IHYtbW9kZWw9XCJteUNvb3JkaW5hdGVzLmxhdFwiIHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJMYXRpdHVkZVwiIC8+XHJcbiAgICA8cS1pbnB1dCB2LW1vZGVsPVwibXlDb29yZGluYXRlcy5sbmdcIiB0eXBlPVwidGV4dFwiIGxhYmVsPVwiTG9uZ2l0dWRlXCIgLz5cclxuICAgIDxxLWlucHV0IHYtbW9kZWw9XCJvcGVuaW5nSG91cnNcIiB0eXBlPVwidGV4dFwiIGxhYmVsPVwiT3BlbmluZyBIb3Vyc1wiIC8+XHJcbiAgICA8cS1idG5cclxuICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMjY3Mzc4OyBjb2xvcjogI2ZmZlwiXHJcbiAgICAgIEBjbGljaz1cIm9uU2F2ZUxvY2F0aW9uQ2hhbmdlc1wiXHJcbiAgICAgIGxhYmVsPVwiU2F2ZSBDaGFuZ2VzXCJcclxuICAgIC8+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgb3BlbmVkTWFya2VySUQ6IG51bGwsXHJcbiAgICAgIG15Q29vcmRpbmF0ZXM6IHtcclxuICAgICAgICBsYXQ6IDAsXHJcbiAgICAgICAgbG5nOiAwLFxyXG4gICAgICB9LFxyXG4gICAgICBhZGRyZXNzOiBcIlwiLFxyXG4gICAgICBvcGVuaW5nSG91cnM6IFwiXCIsXHJcbiAgICAgIHpvb206IDE0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIHByb3BzOiBbXCJsb2NhdGlvbkluZm9cIiwgXCJtYXJrZXRMb2dvXCIsIFwibWFya2V0TmFtZVwiXSxcclxuICBtb3VudGVkKCkge1xyXG4gICAgdGhpcy5teUNvb3JkaW5hdGVzLmxhdCA9IHRoaXMubG9jYXRpb25JbmZvLmNvb3JkaW5hdGVzLmxhdDtcclxuICAgIHRoaXMubXlDb29yZGluYXRlcy5sbmcgPSB0aGlzLmxvY2F0aW9uSW5mby5jb29yZGluYXRlcy5sbmc7XHJcbiAgICB0aGlzLmFkZHJlc3MgPSB0aGlzLmxvY2F0aW9uSW5mby5hZGRyZXNzO1xyXG4gICAgdGhpcy5vcGVuaW5nSG91cnMgPSB0aGlzLmxvY2F0aW9uSW5mby5vcGVuaW5nSG91cnM7XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgaWNvbigpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1cmw6IHRoaXMubWFya2V0TG9nbyxcclxuICAgICAgICBzY2FsZWRTaXplOiB7IHdpZHRoOiAzMCwgaGVpZ2h0OiAzMCB9LFxyXG4gICAgICAgIGxhYmVsT3JpZ2luOiB7IHg6IDE2LCB5OiAtMTAgfSxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBhc3luYyBtYXJrTG9jYXRpb24oZSkge1xyXG4gICAgICB0aGlzLm15Q29vcmRpbmF0ZXMubGF0ID0gZS5sYXRMbmcubGF0KCk7XHJcbiAgICAgIHRoaXMubXlDb29yZGluYXRlcy5sbmcgPSBlLmxhdExuZy5sbmcoKTtcclxuICAgICAgYXdhaXQgdGhpcy5nZXRTdHJlZXRBZGRyZXNzRnJvbShcclxuICAgICAgICB0aGlzLm15Q29vcmRpbmF0ZXMubGF0LFxyXG4gICAgICAgIHRoaXMubXlDb29yZGluYXRlcy5sbmdcclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgICBvcGVuTWFya2VyKGlkKSB7XHJcbiAgICAgIHRoaXMub3BlbmVkTWFya2VySUQgPSBpZDtcclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRTdHJlZXRBZGRyZXNzRnJvbShsYXQsIGxvbmcpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB2YXIgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLiRheGlvcy5nZXQoXHJcbiAgICAgICAgICBcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/bGF0bG5nPVwiICtcclxuICAgICAgICAgICAgbGF0ICtcclxuICAgICAgICAgICAgXCIsXCIgK1xyXG4gICAgICAgICAgICBsb25nICtcclxuICAgICAgICAgICAgYCZrZXk9JHtwcm9jZXNzLmVudi5HT09HTEVfTUFQU19BUElfS0VZfWBcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChkYXRhLmVycm9yX21lc3NhZ2UpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuZXJyb3JfbWVzc2FnZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEucmVzdWx0c1swXS5mb3JtYXR0ZWRfYWRkcmVzcztcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBvblNhdmVMb2NhdGlvbkNoYW5nZXMoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb25OYW1lID0gdGhpcy5hZGRyZXNzLnNwbGl0KFwiLFwiKVswXTtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgbmFtZTogdGhpcy5tYXJrZXROYW1lICsgXCIgXCIgKyBsb2NhdGlvbk5hbWUsXHJcbiAgICAgICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3MsXHJcbiAgICAgICAgICBvcGVuaW5nSG91cnM6IHRoaXMub3BlbmluZ0hvdXJzLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IHtcclxuICAgICAgICAgICAgbGF0OiB0aGlzLm15Q29vcmRpbmF0ZXMubGF0LFxyXG4gICAgICAgICAgICBsbmc6IHRoaXMubXlDb29yZGluYXRlcy5sbmcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLnBhdGNoKFxyXG4gICAgICAgICAgYC9sb2NhdGlvbnMvJHt0aGlzLmxvY2F0aW9uSW5mby5faWR9YCxcclxuICAgICAgICAgIGRhdGFcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiZWRpdExvY2F0aW9uU3VjY2Vzc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLmNvb3Jkcy1zdHlsZSB7XHJcbiAgbWF4LXdpZHRoOiA4MDBweDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4ubWFwLXN0eWxlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDM2MHB4O1xyXG4gIG1hcmdpbjogMTZweCBhdXRvO1xyXG59XHJcbjwvc3R5bGU+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8cS1zbGlkZS1pdGVtXHJcbiAgICBAbGVmdD1cInNob3dFZGl0TG9jYXRpb25EaWFsb2dcIlxyXG4gICAgQHJpZ2h0PVwic2hvd0RlbGV0ZUxvY2F0aW9uRGlhbG9nXCJcclxuICAgIEBjbGljaz1cImdvVG9Mb2NhdGlvbkRldGFpbHNQYWdlXCJcclxuICA+XHJcbiAgICA8dGVtcGxhdGUgdi1zbG90OmxlZnQ+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyXCI+PHEtaWNvbiBsZWZ0IG5hbWU9XCJlZGl0XCIgLz4gRWRpdDwvZGl2PlxyXG4gICAgPC90ZW1wbGF0ZT5cclxuICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cmlnaHQ+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyXCI+RGVsZXRlIDxxLWljb24gcmlnaHQgbmFtZT1cImRlbGV0ZVwiIC8+PC9kaXY+XHJcbiAgICA8L3RlbXBsYXRlPlxyXG5cclxuICAgIDxxLWl0ZW0+XHJcbiAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgICA8ZGl2Pnt7IGxvY2F0aW9uSW5mby5uYW1lIH19PC9kaXY+XHJcbiAgICAgICAgPGRpdj5BZHJlc2E6IHt7IGxvY2F0aW9uSW5mby5hZGRyZXNzIH19PC9kaXY+XHJcbiAgICAgICAgPGRpdj5Qcm9ncmFtOiB7eyBsb2NhdGlvbkluZm8ub3BlbmluZ0hvdXJzIH19PC9kaXY+PC9xLWl0ZW0tc2VjdGlvblxyXG4gICAgICA+XHJcbiAgICA8L3EtaXRlbT5cclxuICA8L3Etc2xpZGUtaXRlbT5cclxuICA8cS1kaWFsb2cgbWF4aW1pemVkIHYtbW9kZWw9XCJzaG93RWRpdExvY2F0aW9uXCI+XHJcbiAgICA8cS1jYXJkPlxyXG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcGItbm9uZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+RWRpdCBMb2NhdGlvbjwvZGl2PlxyXG4gICAgICAgIDxxLXNwYWNlIC8+XHJcbiAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgcm91bmQgZGVuc2Ugdi1jbG9zZS1wb3B1cCAvPlxyXG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG5cclxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxyXG4gICAgICAgIDxFZGl0TG9jYXRpb25EaWFsb2dcclxuICAgICAgICAgIEBlZGl0TG9jYXRpb25TdWNjZXNzPVwiZWRpdExvY2F0aW9uU3VjY2Vzc1wiXHJcbiAgICAgICAgICA6bG9jYXRpb25JbmZvPVwibG9jYXRpb25JbmZvXCJcclxuICAgICAgICAgIDptYXJrZXRMb2dvPVwibWFya2V0TG9nb1wiXHJcbiAgICAgICAgICA6bWFya2V0TmFtZT1cIm1hcmtldE5hbWVcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcbiAgICA8L3EtY2FyZD5cclxuICA8L3EtZGlhbG9nPlxyXG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwic2hvd0RlbGV0ZUxvY2F0aW9uXCIgcGVyc2lzdGVudD5cclxuICAgIDxxLWNhcmQ+XHJcbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInEtbWwtc21cIlxyXG4gICAgICAgICAgPkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUge3sgbG9jYXRpb25JbmZvLm5hbWUgfX0/PC9zcGFuXHJcbiAgICAgICAgPlxyXG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG5cclxuICAgICAgPHEtY2FyZC1hY3Rpb25zIGFsaWduPVwicmlnaHRcIj5cclxuICAgICAgICA8cS1idG4gZmxhdCBsYWJlbD1cIkNhbmNlbFwiIGNvbG9yPVwicHJpbWFyeVwiIHYtY2xvc2UtcG9wdXAgLz5cclxuICAgICAgICA8cS1idG4gZmxhdCBsYWJlbD1cIkRlbGV0ZVwiIGNvbG9yPVwicmVkXCIgQGNsaWNrPVwiZGVsZXRlTG9jYXRpb25cIiAvPlxyXG4gICAgICA8L3EtY2FyZC1hY3Rpb25zPlxyXG4gICAgPC9xLWNhcmQ+XHJcbiAgPC9xLWRpYWxvZz5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBFZGl0TG9jYXRpb25EaWFsb2cgZnJvbSBcInNyYy9jb21wb25lbnRzL2FkbWluaXN0cmF0aW9uL0VkaXRMb2NhdGlvbkRpYWxvZy52dWVcIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiTG9jYXRpb25DYXJkXCIsXHJcbiAgcHJvcHM6IFtcImxvY2F0aW9uSW5mb1wiLCBcIm1hcmtldExvZ29cIiwgXCJtYXJrZXROYW1lXCJdLFxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIEVkaXRMb2NhdGlvbkRpYWxvZyxcclxuICB9LFxyXG4gIGVtaXRzOiBbXCJmZXRjaE1hcmtldFwiXSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2hvd0VkaXRMb2NhdGlvbjogZmFsc2UsXHJcbiAgICAgIHNob3dEZWxldGVMb2NhdGlvbjogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgYmVmb3JlVW5tb3VudCgpIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGZpbmFsaXplKHJlc2V0KSB7XHJcbiAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICByZXNldCgpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0sXHJcbiAgICBnb1RvTG9jYXRpb25EZXRhaWxzUGFnZSgpIHtcclxuICAgICAgdGhpcy4kcm91dGVyLnB1c2goXHJcbiAgICAgICAgYC9hZG1pbmlzdHJhdGlvbi9tYXJrZXRzLyR7dGhpcy4kcm91dGUucGFyYW1zLm1hcmtldElkfS8ke3RoaXMubG9jYXRpb25JbmZvLl9pZH1gXHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgc2hvd0VkaXRMb2NhdGlvbkRpYWxvZyh7IHJlc2V0IH0pIHtcclxuICAgICAgdGhpcy5zaG93RWRpdExvY2F0aW9uID0gdHJ1ZTtcclxuICAgICAgdGhpcy5maW5hbGl6ZShyZXNldCk7XHJcbiAgICB9LFxyXG4gICAgc2hvd0RlbGV0ZUxvY2F0aW9uRGlhbG9nKHsgcmVzZXQgfSkge1xyXG4gICAgICB0aGlzLnNob3dEZWxldGVMb2NhdGlvbiA9IHRydWU7XHJcbiAgICAgIHRoaXMuZmluYWxpemUocmVzZXQpO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIGRlbGV0ZUxvY2F0aW9uKCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5kZWxldGUoXHJcbiAgICAgICAgICBgL2xvY2F0aW9ucy8ke3RoaXMubG9jYXRpb25JbmZvLl9pZH0vJHt0aGlzLiRyb3V0ZS5wYXJhbXMubWFya2V0SWR9YFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJmZXRjaE1hcmtldFwiKTtcclxuICAgICAgICAgIHRoaXMuc2hvd0RlbGV0ZUxvY2F0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZWRpdExvY2F0aW9uU3VjY2VzcygpIHtcclxuICAgICAgdGhpcy5zaG93RWRpdExvY2F0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuJGVtaXQoXCJmZXRjaE1hcmtldFwiKTtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4udGV4dC1oNiB7XHJcbiAgY29sb3I6ICMyNjczNzg7XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXY+XHJcbiAgICA8R01hcE1hcFxyXG4gICAgICA6Y2VudGVyPVwibXlDb29yZGluYXRlc1wiXHJcbiAgICAgIDp6b29tPVwiem9vbVwiXHJcbiAgICAgIGNsYXNzPVwibWFwLXN0eWxlXCJcclxuICAgICAgQGNsaWNrPVwibWFya0xvY2F0aW9uXCJcclxuICAgID5cclxuICAgICAgPEdNYXBNYXJrZXJcclxuICAgICAgICA6a2V5PVwiaW5kZXhcIlxyXG4gICAgICAgIHYtZm9yPVwiKGxvY2F0aW9uLCBpbmRleCkgaW4gbG9jYXRpb25zVG9CZURpc3BsYXllZFwiXHJcbiAgICAgICAgOnBvc2l0aW9uPVwibG9jYXRpb24uY29vcmRpbmF0ZXNcIlxyXG4gICAgICAgIDppY29uPVwiaWNvblwiXHJcbiAgICAgICAgOmNsaWNrYWJsZT1cInRydWVcIlxyXG4gICAgICAgIEBjbGljaz1cIm9wZW5NYXJrZXIobG9jYXRpb24uX2lkKVwiXHJcbiAgICAgICAgPjxHTWFwSW5mb1dpbmRvd1xyXG4gICAgICAgICAgOmNsb3NlY2xpY2s9XCJ0cnVlXCJcclxuICAgICAgICAgIEBjbG9zZWNsaWNrPVwib3Blbk1hcmtlcihudWxsKVwiXHJcbiAgICAgICAgICA6b3BlbmVkPVwib3BlbmVkTWFya2VySUQgPT09IGxvY2F0aW9uLl9pZFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdj57eyBsb2NhdGlvbi5hZGRyZXNzIH19PC9kaXY+XHJcbiAgICAgICAgPC9HTWFwSW5mb1dpbmRvdz48L0dNYXBNYXJrZXJcclxuICAgICAgPlxyXG4gICAgPC9HTWFwTWFwPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBvcGVuZWRNYXJrZXJJRDogbnVsbCxcclxuICAgICAgbXlDb29yZGluYXRlczoge1xyXG4gICAgICAgIGxhdDogMCxcclxuICAgICAgICBsbmc6IDAsXHJcbiAgICAgIH0sXHJcbiAgICAgIHpvb206IDEwLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIHByb3BzOiBbXCJtYXJrZXRcIiwgXCJsb2NhdGlvbnNUb0JlRGlzcGxheWVkXCJdLFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICBpY29uKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHVybDogdGhpcy5tYXJrZXQubG9nbyxcclxuICAgICAgICBzY2FsZWRTaXplOiB7IHdpZHRoOiAzMCwgaGVpZ2h0OiAzMCB9LFxyXG4gICAgICAgIGxhYmVsT3JpZ2luOiB7IHg6IDE2LCB5OiAtMTAgfSxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBjcmVhdGVkKCkge1xyXG4gICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcclxuICAgICAgKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgdGhpcy5teUNvb3JkaW5hdGVzLmxhdCA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcclxuICAgICAgICB0aGlzLm15Q29vcmRpbmF0ZXMubG5nID0gcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZTtcclxuICAgICAgfSxcclxuICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgbWFya0xvY2F0aW9uKGUpIHtcclxuICAgICAgdGhpcy4kZW1pdChcImVtaXRDb29yZHNcIiwgZS5sYXRMbmcpO1xyXG4gICAgfSxcclxuICAgIG9wZW5NYXJrZXIoaWQpIHtcclxuICAgICAgdGhpcy5vcGVuZWRNYXJrZXJJRCA9IGlkO1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5jb29yZHMtc3R5bGUge1xyXG4gIG1heC13aWR0aDogODAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuLm1hcC1zdHlsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAzNjBweDtcclxuICBtYXJnaW46IDE2cHggYXV0bztcclxufVxyXG48L3N0eWxlPlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiB2LWlmPVwibWFya2V0XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwic3R5bGVcIj5cclxuICAgICAgPGltZyBjbGFzcz1cImxvZ29cIiA6c3JjPVwibWFya2V0LmxvZ29cIiBhbHQ9XCJNYXJrZXQgTG9nb1wiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJsb2NhdGlvbi1oZWFkZXJcIj57eyBtYXJrZXQubmFtZSB9fTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8cS1idG4gY2xhc3M9XCJhZGQtbG9jYXRpb25fX2J0blwiIEBjbGljaz1cInNob3dBZGRMb2NhdGlvbiA9IHRydWVcIlxyXG4gICAgICA+QWRkIExvY2F0aW9uPC9xLWJ0blxyXG4gICAgPlxyXG4gICAgPHEtaW5wdXQgdi1tb2RlbD1cInNlYXJjaFwiIGZpbGxlZCB0eXBlPVwic2VhcmNoXCIgaGludD1cIlNlYXJjaFwiPlxyXG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cclxuICAgICAgICA8cS1pY29uIG5hbWU9XCJzZWFyY2hcIiAvPlxyXG4gICAgICA8L3RlbXBsYXRlPlxyXG4gICAgPC9xLWlucHV0PlxyXG4gICAgPGRpdiB2LWlmPVwiZmlsdGVyZWRMb2NhdGlvbnMubGVuZ3RoXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJsb2NhdGlvbi1jYXJkX19saXN0XCI+XHJcbiAgICAgICAgPExvY2F0aW9uQ2FyZFxyXG4gICAgICAgICAgdi1mb3I9XCJsb2NhdGlvbiBpbiBmaWx0ZXJlZExvY2F0aW9uc1wiXHJcbiAgICAgICAgICA6a2V5PVwibG9jYXRpb24uX2lkXCJcclxuICAgICAgICAgIDpsb2NhdGlvbkluZm89XCJsb2NhdGlvblwiXHJcbiAgICAgICAgICA6bWFya2V0TG9nbz1cIm1hcmtldC5sb2dvXCJcclxuICAgICAgICAgIDptYXJrZXROYW1lPVwibWFya2V0Lm5hbWVcIlxyXG4gICAgICAgICAgQGZldGNoTWFya2V0PVwiZmV0Y2hNYXJrZXRcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IHYtaWY9XCIhZmlsdGVyZWRMb2NhdGlvbnMubGVuZ3RoXCI+Tm8gbG9jYXRpb25zIHRvIHNob3cuPC9kaXY+XHJcbiAgICA8cS1kaWFsb2cgbWF4aW1pemVkIHYtbW9kZWw9XCJzaG93QWRkTG9jYXRpb25cIj5cclxuICAgICAgPHEtY2FyZD5cclxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcGItbm9uZVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5BZGQgTG9jYXRpb248L2Rpdj5cclxuICAgICAgICAgIDxxLXNwYWNlIC8+XHJcbiAgICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCByb3VuZCBkZW5zZSB2LWNsb3NlLXBvcHVwIC8+XHJcbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuXHJcbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxyXG4gICAgICAgICAgPEFkZExvY2F0aW9uTWFwR29vZ2xlXHJcbiAgICAgICAgICAgIEBlbWl0Q29vcmRzPVwib25FbWl0Q29vcmRzXCJcclxuICAgICAgICAgICAgOm1hcmtldD1cIm1hcmtldFwiXHJcbiAgICAgICAgICAgIDpsb2NhdGlvbnNUb0JlRGlzcGxheWVkPVwibG9jYXRpb25zVG9CZURpc3BsYXllZFwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMThweFwiPkFkZHJlc3M6IHt7IGFkZHJlc3MgfX08L2Rpdj5cclxuICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJsYXRcIiB0eXBlPVwidGV4dFwiIGxhYmVsPVwiTGF0aXR1ZGVcIiAvPlxyXG4gICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cImxuZ1wiIHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJMb25naXR1ZGVcIiAvPlxyXG4gICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cIm9wZW5pbmdIb3Vyc1wiIHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJPcGVuaW5nIEhvdXJzXCIgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzYXZlLWxvY2F0aW9uX19jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMjY3Mzc4OyBjb2xvcjogI2ZmZlwiXHJcbiAgICAgICAgICAgICAgQGNsaWNrPVwic2F2ZUxvY2F0aW9uXCJcclxuICAgICAgICAgICAgICBsYWJlbD1cIlNhdmUgTG9jYXRpb25cIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuICAgICAgPC9xLWNhcmQ+XHJcbiAgICA8L3EtZGlhbG9nPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IExvY2F0aW9uQ2FyZCBmcm9tIFwic3JjL2NvbXBvbmVudHMvYWRtaW5pc3RyYXRpb24vTG9jYXRpb25DYXJkLnZ1ZVwiO1xyXG5pbXBvcnQgQWRkTG9jYXRpb25NYXBHb29nbGUgZnJvbSBcInNyYy9jb21wb25lbnRzL2FkbWluaXN0cmF0aW9uL0FkZExvY2F0aW9uTWFwR29vZ2xlLnZ1ZVwiO1xyXG5pbXBvcnQgeyB1c2VEYXNoSGVhZGVyU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9kYXNoLWhlYWRlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiTWFya2V0RGV0YWlsUGFnZVwiLFxyXG4gIGFzeW5jIG1vdW50ZWQoKSB7XHJcbiAgICBhd2FpdCB0aGlzLmZldGNoTWFya2V0KCk7XHJcbiAgICBjb25zdCBkYXNoSGVhZGVyID0gdXNlRGFzaEhlYWRlclN0b3JlKCk7XHJcbiAgICBkYXNoSGVhZGVyLiRwYXRjaCh7IHRpdGxlOiB0aGlzLm1hcmtldC5uYW1lLCBzaG93QmFja0ljb246IHRydWUgfSk7XHJcbiAgfSxcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICBMb2NhdGlvbkNhcmQsXHJcbiAgICBBZGRMb2NhdGlvbk1hcEdvb2dsZSxcclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtYXJrZXQ6IG51bGwsXHJcbiAgICAgIHNob3dBZGRMb2NhdGlvbjogZmFsc2UsXHJcbiAgICAgIGxhdDogbnVsbCxcclxuICAgICAgbG5nOiBudWxsLFxyXG4gICAgICBhZGRyZXNzOiBudWxsLFxyXG4gICAgICBsb2NhdGlvbnNMZW5ndGg6IDAsXHJcbiAgICAgIG9wZW5pbmdIb3VyczogXCJcIixcclxuICAgICAgbG9jYXRpb25zVG9CZURpc3BsYXllZDogW10sXHJcbiAgICAgIHNlYXJjaDogXCJcIixcclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgZmlsdGVyZWRMb2NhdGlvbnMoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1hcmtldC5sb2NhdGlvbnMuZmlsdGVyKFxyXG4gICAgICAgIChsb2MpID0+IGxvYy5hZGRyZXNzLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnNlYXJjaCkgPiAtMVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGFzeW5jIHNhdmVMb2NhdGlvbigpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbk5hbWUgPSB0aGlzLmFkZHJlc3Muc3BsaXQoXCIsXCIpWzBdO1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICBuYW1lOiB0aGlzLm1hcmtldC5uYW1lICsgXCIgXCIgKyBsb2NhdGlvbk5hbWUsXHJcbiAgICAgICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3MsXHJcbiAgICAgICAgICBvcGVuaW5nSG91cnM6IHRoaXMub3BlbmluZ0hvdXJzLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IHtcclxuICAgICAgICAgICAgbGF0OiB0aGlzLmxhdCxcclxuICAgICAgICAgICAgbG5nOiB0aGlzLmxuZyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBwcm9kdWN0c0xpc3Q6IFtdLFxyXG4gICAgICAgICAgbWFya2V0SWQ6IHRoaXMuJHJvdXRlLnBhcmFtcy5tYXJrZXRJZCxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzR2VvSlNPTjoge1xyXG4gICAgICAgICAgICBjb29yZGluYXRlczogW3RoaXMubGF0LCB0aGlzLmxuZ10sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLnBvc3QoXCIvbG9jYXRpb25zXCIsIGRhdGEpO1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmZldGNoTWFya2V0KCk7XHJcbiAgICAgICAgICB0aGlzLnNob3dBZGRMb2NhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5yZXNldEZpZWxkcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBmZXRjaE1hcmtldCgpIHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLmdldChcclxuICAgICAgICBgL21hcmtldHMvJHt0aGlzLiRyb3V0ZS5wYXJhbXMubWFya2V0SWR9YFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLm1hcmtldCA9IE9iamVjdC5hc3NpZ24ocmVzLmRhdGEuZGF0YS5tYXJrZXQpO1xyXG4gICAgICB0aGlzLmxvY2F0aW9uc1RvQmVEaXNwbGF5ZWQgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgIHRoaXMubG9jYXRpb25zVG9CZURpc3BsYXllZCxcclxuICAgICAgICB0aGlzLm1hcmtldC5sb2NhdGlvbnNcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5sb2NhdGlvbnNMZW5ndGggPSB0aGlzLm1hcmtldC5sb2NhdGlvbnMubGVuZ3RoO1xyXG4gICAgfSxcclxuICAgIHJlc2V0RmllbGRzKCkge1xyXG4gICAgICB0aGlzLmxhdCA9IG51bGw7XHJcbiAgICAgIHRoaXMubG5nID0gbnVsbDtcclxuICAgICAgdGhpcy5hZGRyZXNzID0gXCJcIjtcclxuICAgICAgdGhpcy5vcGVuaW5nSG91cnMgPSBcIlwiO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIG9uRW1pdENvb3Jkcyhjb29yZHMpIHtcclxuICAgICAgdGhpcy5sYXQgPSBjb29yZHMubGF0KCk7XHJcbiAgICAgIHRoaXMubG5nID0gY29vcmRzLmxuZygpO1xyXG4gICAgICBhd2FpdCB0aGlzLmdldFN0cmVldEFkZHJlc3NGcm9tKHRoaXMubGF0LCB0aGlzLmxuZyk7XHJcbiAgICAgIGlmICh0aGlzLmxvY2F0aW9uc1RvQmVEaXNwbGF5ZWQubGVuZ3RoIC0gdGhpcy5sb2NhdGlvbnNMZW5ndGggPj0gMSkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25zVG9CZURpc3BsYXllZC5zcGxpY2UoLTEpO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25zVG9CZURpc3BsYXllZC5wdXNoKHtcclxuICAgICAgICAgIF9pZDogRGF0ZS5ub3coKSxcclxuICAgICAgICAgIGFkZHJlc3M6IHRoaXMuYWRkcmVzcyxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzOiB7XHJcbiAgICAgICAgICAgIGxhdDogdGhpcy5sYXQsXHJcbiAgICAgICAgICAgIGxuZzogdGhpcy5sbmcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25zVG9CZURpc3BsYXllZC5wdXNoKHtcclxuICAgICAgICAgIF9pZDogRGF0ZS5ub3coKSxcclxuICAgICAgICAgIGFkZHJlc3M6IHRoaXMuYWRkcmVzcyxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzOiB7XHJcbiAgICAgICAgICAgIGxhdDogdGhpcy5sYXQsXHJcbiAgICAgICAgICAgIGxuZzogdGhpcy5sbmcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0U3RyZWV0QWRkcmVzc0Zyb20obGF0LCBsb25nKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuJGF4aW9zLmdldChcclxuICAgICAgICAgIFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9sYXRsbmc9XCIgK1xyXG4gICAgICAgICAgICBsYXQgK1xyXG4gICAgICAgICAgICBcIixcIiArXHJcbiAgICAgICAgICAgIGxvbmcgK1xyXG4gICAgICAgICAgICBgJmtleT0ke3Byb2Nlc3MuZW52LkdPT0dMRV9NQVBTX0FQSV9LRVl9YFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yX21lc3NhZ2UpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLmVycm9yX21lc3NhZ2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmFkZHJlc3MgPSByZXMuZGF0YS5yZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5sb2NhdGlvbi1oZWFkZXIge1xyXG4gIGZvbnQtc2l6ZTogMzJweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG5cclxuLmxvZ28ge1xyXG4gIHdpZHRoOiA4MHB4O1xyXG4gIGhlaWdodDogODBweDtcclxufVxyXG5cclxuLnN0eWxlIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGdhcDogMzBweDtcclxuICBtYXJnaW46IDEwcHggMDtcclxufVxyXG5cclxuLnRleHQtaDYge1xyXG4gIC8qIGNvbG9yOiAjMjY3Mzc4OyAqL1xyXG59XHJcblxyXG4ubG9jYXRpb24tY2FyZF9fbGlzdCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMTBweDtcclxufVxyXG5cclxuLmFkZC1sb2NhdGlvbl9fYnRuIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjY3Mzc4O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBtYXJnaW46IDEwcHg7XHJcbn1cclxuLnNhdmUtbG9jYXRpb25fX2NvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBtYXJnaW4tdG9wOiAzMHB4O1xyXG59XHJcbjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6WyJfc2ZjX21haW4iLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9ob2lzdGVkXzEiLCJfY3JlYXRlVk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2hvaXN0ZWRfMiIsIl9ob2lzdGVkXzMiLCJfd2l0aFNjb3BlSWQiLCJfaG9pc3RlZF80IiwiX29wZW5CbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX2NyZWF0ZUJsb2NrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW1DQSxNQUFLQSxjQUFVO0FBQUEsRUFDYixPQUFPO0FBQ0wsV0FBTztBQUFBLE1BQ0wsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLFFBQ2IsS0FBSztBQUFBLFFBQ0wsS0FBSztBQUFBLE1BQ047QUFBQSxNQUNELFNBQVM7QUFBQSxNQUNULGNBQWM7QUFBQSxNQUNkLE1BQU07QUFB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
