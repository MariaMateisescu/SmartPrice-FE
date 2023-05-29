import { a as QTabPanels, Q as QTab, b as QTabPanel } from "./QTabPanels.5a74d7c9.js";
import { Q as QTabs } from "./QTabs.fc3e4dc8.js";
import { Q as QSeparator } from "./QSeparator.96f0308a.js";
import { bw as emptyRenderFn, a1 as computed, an as inject, bF as hSlot, ak as h, ah as getCurrentInstance, bz as layoutKey, bt as createComponent, _ as _export_sfc, bB as useDashHeaderStore, o as openBlock, c as createElementBlock, a2 as createBlock, b5 as withCtx, a3 as createCommentVNode, aa as createVNode, aL as resolveComponent, a as createBaseVNode, M as toDisplayString, Q as Fragment, aK as renderList, b7 as withDirectives, a9 as createTextVNode, bC as QIcon, bE as QBtn, bT as Ripple, aH as pushScopeId, aF as popScopeId } from "./index.0ce84b9b.js";
import { Q as QItem, a as QItemSection } from "./QItem.742a43b4.js";
import { Q as QList } from "./QList.1941924d.js";
import { a as QCheckbox, Q as QItemLabel } from "./QCheckbox.7ccc5998.js";
import { Q as QSlider } from "./QSlider.40059c2e.js";
import { a as QCardSection, Q as QCard } from "./QCard.511536db.js";
import { u as useGeolocationInfoStore } from "./geolocation-info.ddca1c37.js";
import { E as EmptyData } from "./EmptyData.56f5e511.js";
import "./use-dark.089fd8b8.js";
import "./TouchPan.43131768.js";
import "./selection.0c91ca54.js";
import "./use-cache.b0833c75.js";
import "./uid.42677368.js";
import "./QResizeObserver.0123dcfa.js";
import "./use-timeout.0140a5e1.js";
import "./rtl.b51694b1.js";
import "./use-checkbox.bf2f6301.js";
import "./use-form.e754bc19.js";
import "./format.2a3572e1.js";
const usePageStickyProps = {
  position: {
    type: String,
    default: "bottom-right",
    validator: (v) => [
      "top-right",
      "top-left",
      "bottom-right",
      "bottom-left",
      "top",
      "right",
      "bottom",
      "left"
    ].includes(v)
  },
  offset: {
    type: Array,
    validator: (v) => v.length === 2
  },
  expand: Boolean
};
function usePageSticky() {
  const { props, proxy: { $q } } = getCurrentInstance();
  const $layout = inject(layoutKey, emptyRenderFn);
  if ($layout === emptyRenderFn) {
    console.error("QPageSticky needs to be child of QLayout");
    return emptyRenderFn;
  }
  const attach = computed(() => {
    const pos = props.position;
    return {
      top: pos.indexOf("top") > -1,
      right: pos.indexOf("right") > -1,
      bottom: pos.indexOf("bottom") > -1,
      left: pos.indexOf("left") > -1,
      vertical: pos === "top" || pos === "bottom",
      horizontal: pos === "left" || pos === "right"
    };
  });
  const top = computed(() => $layout.header.offset);
  const right = computed(() => $layout.right.offset);
  const bottom = computed(() => $layout.footer.offset);
  const left = computed(() => $layout.left.offset);
  const style = computed(() => {
    let posX = 0, posY = 0;
    const side = attach.value;
    const dir = $q.lang.rtl === true ? -1 : 1;
    if (side.top === true && top.value !== 0) {
      posY = `${top.value}px`;
    } else if (side.bottom === true && bottom.value !== 0) {
      posY = `${-bottom.value}px`;
    }
    if (side.left === true && left.value !== 0) {
      posX = `${dir * left.value}px`;
    } else if (side.right === true && right.value !== 0) {
      posX = `${-dir * right.value}px`;
    }
    const css = { transform: `translate(${posX}, ${posY})` };
    if (props.offset) {
      css.margin = `${props.offset[1]}px ${props.offset[0]}px`;
    }
    if (side.vertical === true) {
      if (left.value !== 0) {
        css[$q.lang.rtl === true ? "right" : "left"] = `${left.value}px`;
      }
      if (right.value !== 0) {
        css[$q.lang.rtl === true ? "left" : "right"] = `${right.value}px`;
      }
    } else if (side.horizontal === true) {
      if (top.value !== 0) {
        css.top = `${top.value}px`;
      }
      if (bottom.value !== 0) {
        css.bottom = `${bottom.value}px`;
      }
    }
    return css;
  });
  const classes = computed(
    () => `q-page-sticky row flex-center fixed-${props.position} q-page-sticky--${props.expand === true ? "expand" : "shrink"}`
  );
  function getStickyContent(slots) {
    const content = hSlot(slots.default);
    return h(
      "div",
      {
        class: classes.value,
        style: style.value
      },
      props.expand === true ? content : [h("div", content)]
    );
  }
  return {
    $layout,
    getStickyContent
  };
}
var QPageSticky = createComponent({
  name: "QPageSticky",
  props: usePageStickyProps,
  setup(_, { slots }) {
    const { getStickyContent } = usePageSticky();
    return () => getStickyContent(slots);
  }
});
var ManageShoppingListPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  name: "ManageShoppingListPage",
  components: {
    EmptyData
  },
  data() {
    return {
      boughtItems: [],
      calculatedLocations: [],
      list: null,
      tab: "list",
      latlng: "",
      myCoordinates: {
        lat: 0,
        lng: 0
      },
      geolocationInfo: null,
      image: "Void.svg",
      title: "No location found in this radius",
      message: "Try to increase the radius"
    };
  },
  computed: {
    timeSpentShopping() {
      if (this.list.status === "completed") {
        const time = this.list.timeEnded - this.list.timeStarted;
        const formattedTime = new Date(time).toISOString().slice(11, 19);
        return formattedTime;
      } else
        return null;
    },
    filteredLocationsInRadius() {
      return this.calculatedLocations.filter((location) => location.count != 0);
    }
  },
  async mounted() {
    this.geolocationInfo = useGeolocationInfoStore();
    await this.fetchList();
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: this.list.name,
      showBackIcon: true,
      backIconTo: "/shopping"
    });
    try {
      let position = await this.getPosition();
      this.myCoordinates.lat = position.coords.latitude;
      this.myCoordinates.lng = position.coords.longitude;
      this.latlng = this.myCoordinates.lat + "," + this.myCoordinates.lng;
    } catch (err) {
      console.log(err);
    }
    await this.calculateLocations();
  },
  methods: {
    getPosition() {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    },
    async fetchList() {
      const res = await this.$api.get(
        `/shopping-lists/get-shopping-lists/${this.$route.params.shoppingListId}`
      );
      this.list = res.data.data.list;
    },
    async changeListStatus() {
      try {
        const data = {
          status: "active",
          timeStarted: Date.now()
        };
        const res = await this.$api.patch(
          `/shopping-lists/patch-shopping-list/${this.$route.params.shoppingListId}`,
          data
        );
        if (res.data.status === "success") {
          console.log("status changed successfully");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async startShopping() {
      await this.changeListStatus();
      await this.fetchList();
    },
    async endShopping() {
      try {
        const data = {
          status: "completed",
          timeEnded: Date.now(),
          boughtItems: this.boughtItems
        };
        const res = await this.$api.patch(
          `/shopping-lists/end-shopping-list/${this.$route.params.shoppingListId}`,
          data
        );
        if (res.data.status === "success") {
          await this.fetchList();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async reuseShoppingList() {
      try {
        const itemsToReuse = this.list.listItems.map((item) => item.item);
        const data = {
          name: new Date().toLocaleDateString("en-GB") + " " + new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }),
          selectedProducts: itemsToReuse
        };
        const res = await this.$api.post(
          "/shopping-lists/create-shopping-list",
          data
        );
        if (res.data.status === "success") {
          await this.$router.push(`/shopping/${res.data.newListId}`);
          this.$router.go(0);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async calculateLocations() {
      const res = await this.$api.get(
        `/locations/calculate-locations/${this.$route.params.shoppingListId}/within/${this.geolocationInfo.$state.radius}/center/${this.latlng}`
      );
      this.calculatedLocations = res.data.calculatedLocations;
    },
    async sliderChanged() {
      await this.calculateLocations();
    },
    addKm(value) {
      return value + "km";
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-7f5e6fab"), n = n(), popScopeId(), n);
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { class: "list-header" };
const _hoisted_3 = { class: "list-header__count" };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { class: "list-header__status" };
const _hoisted_6 = { class: "slider-box" };
const _hoisted_7 = { key: 0 };
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Locations List", -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_EmptyData = resolveComponent("EmptyData");
  return $data.list ? (openBlock(), createElementBlock("div", _hoisted_1, [
    !$data.list.isRecipe ? (openBlock(), createBlock(QTabs, {
      key: 0,
      modelValue: $data.tab,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.tab = $event),
      dense: "",
      class: "text-grey",
      "active-color": "teal",
      "indicator-color": "teal",
      align: "justify",
      "narrow-indicator": ""
    }, {
      default: withCtx(() => [
        createVNode(QTab, {
          name: "list",
          label: "List"
        }),
        createVNode(QTab, {
          name: "locations",
          label: "Locations"
        })
      ]),
      _: 1
    }, 8, ["modelValue"])) : createCommentVNode("", true),
    createVNode(QSeparator),
    createVNode(QTabPanels, {
      modelValue: $data.tab,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.tab = $event),
      animated: ""
    }, {
      default: withCtx(() => [
        createVNode(QTabPanel, { name: "list" }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, toDisplayString($data.list.listItems.length) + " " + toDisplayString($data.list.listItems.length < 2 ? "item" : "items"), 1),
              $options.timeSpentShopping ? (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString($options.timeSpentShopping), 1)) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_5, toDisplayString($data.list.status), 1)
            ]),
            $data.list.status !== "active" ? (openBlock(), createBlock(QList, {
              key: 0,
              dense: "",
              bordered: "",
              padding: "",
              class: "rounded-borders list"
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList($data.list.listItems, (item) => {
                  return withDirectives((openBlock(), createBlock(QItem, {
                    clickable: "",
                    key: item._id
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createBaseVNode("div", null, [
                            createTextVNode(toDisplayString(item.item) + " ", 1),
                            item.status === "bought" ? (openBlock(), createBlock(QIcon, {
                              key: 0,
                              name: "done_outline"
                            })) : createCommentVNode("", true),
                            item.status === "not_bought" ? (openBlock(), createBlock(QIcon, {
                              key: 1,
                              name: "close"
                            })) : createCommentVNode("", true)
                          ]),
                          createVNode(QSeparator)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)), [
                    [Ripple]
                  ]);
                }), 128))
              ]),
              _: 1
            })) : createCommentVNode("", true),
            $data.list.status === "active" ? (openBlock(), createBlock(QList, {
              key: 1,
              dense: "",
              bordered: "",
              padding: "",
              class: "rounded-borders"
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList($data.list.listItems, (item) => {
                  return withDirectives((openBlock(), createBlock(QItem, {
                    key: item._id,
                    tag: "label"
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QCheckbox, {
                            modelValue: $data.boughtItems,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.boughtItems = $event),
                            val: item.item,
                            color: "cyan-9"
                          }, null, 8, ["modelValue", "val"])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createVNode(QItemLabel, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.item), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)), [
                    [Ripple]
                  ]);
                }), 128))
              ]),
              _: 1
            })) : createCommentVNode("", true),
            createVNode(QPageSticky, {
              position: "bottom-right",
              class: "shopping-page-sticky"
            }, {
              default: withCtx(() => [
                $data.list.status === "pending" ? (openBlock(), createBlock(QBtn, {
                  key: 0,
                  onClick: $options.startShopping,
                  fab: "",
                  label: "go shopping",
                  color: "cyan-9",
                  class: "shopping-page-sticky-btn"
                }, null, 8, ["onClick"])) : createCommentVNode("", true),
                $data.list.status === "active" ? (openBlock(), createBlock(QBtn, {
                  key: 1,
                  onClick: $options.endShopping,
                  fab: "",
                  label: "end shopping",
                  color: "cyan-9",
                  class: "shopping-page-sticky-btn"
                }, null, 8, ["onClick"])) : createCommentVNode("", true),
                $data.list.status === "completed" ? (openBlock(), createBlock(QBtn, {
                  key: 2,
                  onClick: $options.reuseShoppingList,
                  fab: "",
                  icon: "refresh",
                  label: "reuse list",
                  color: "cyan-9",
                  class: "shopping-page-sticky-btn"
                }, null, 8, ["onClick"])) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QTabPanel, { name: "locations" }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_6, [
              createVNode(QSlider, {
                modelValue: $data.geolocationInfo.radius,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.geolocationInfo.radius = $event),
                markers: "",
                "marker-labels": $options.addKm,
                min: 1,
                max: 7,
                onChange: $options.sliderChanged
              }, null, 8, ["modelValue", "marker-labels", "onChange"])
            ]),
            $options.filteredLocationsInRadius.length ? (openBlock(), createElementBlock("div", _hoisted_7, [
              _hoisted_8,
              (openBlock(true), createElementBlock(Fragment, null, renderList($options.filteredLocationsInRadius, (location) => {
                return openBlock(), createElementBlock("div", {
                  key: location.coordinates
                }, [
                  location.count !== 0 ? (openBlock(), createBlock(QCard, {
                    key: 0,
                    flat: "",
                    bordered: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(QCardSection, null, {
                        default: withCtx(() => [
                          createBaseVNode("div", null, toDisplayString(location.name), 1),
                          createBaseVNode("div", null, toDisplayString(location.count) + "/" + toDisplayString($data.list.listItems.length) + " items available ", 1),
                          createVNode(QSeparator),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(location.availableItems, (avItem) => {
                            return openBlock(), createElementBlock("div", {
                              key: avItem._id
                            }, toDisplayString(avItem.name) + " | " + toDisplayString(avItem.price) + " lei ", 1);
                          }), 128)),
                          createVNode(QSeparator),
                          createBaseVNode("div", null, "Total: " + toDisplayString(location.total.toFixed(2)) + " lei", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)) : createCommentVNode("", true)
                ]);
              }), 128))
            ])) : (openBlock(), createBlock(_component_EmptyData, {
              key: 1,
              image: $data.image,
              title: $data.title,
              message: $data.message
            }, null, 8, ["image", "title", "message"]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ])) : createCommentVNode("", true);
}
var ManageShoppingListPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7f5e6fab"], ["__file", "ManageShoppingListPage.vue"]]);
export { ManageShoppingListPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFuYWdlU2hvcHBpbmdMaXN0UGFnZS42ZDQ2Y2RjYy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlLXN0aWNreS91c2UtcGFnZS1zdGlja3kuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3BhZ2Utc3RpY2t5L1FQYWdlU3RpY2t5LmpzIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL01hbmFnZVNob3BwaW5nTGlzdFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkLCBpbmplY3QsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGxheW91dEtleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGNvbnN0IHVzZVBhZ2VTdGlja3lQcm9wcyA9IHtcbiAgcG9zaXRpb246IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ2JvdHRvbS1yaWdodCcsXG4gICAgdmFsaWRhdG9yOiB2ID0+IFtcbiAgICAgICd0b3AtcmlnaHQnLCAndG9wLWxlZnQnLFxuICAgICAgJ2JvdHRvbS1yaWdodCcsICdib3R0b20tbGVmdCcsXG4gICAgICAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J1xuICAgIF0uaW5jbHVkZXModilcbiAgfSxcbiAgb2Zmc2V0OiB7XG4gICAgdHlwZTogQXJyYXksXG4gICAgdmFsaWRhdG9yOiB2ID0+IHYubGVuZ3RoID09PSAyXG4gIH0sXG4gIGV4cGFuZDogQm9vbGVhblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHsgcHJvcHMsIHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgJGxheW91dCA9IGluamVjdChsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4pXG4gIGlmICgkbGF5b3V0ID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgY29uc29sZS5lcnJvcignUVBhZ2VTdGlja3kgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUUxheW91dCcpXG4gICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgfVxuXG4gIGNvbnN0IGF0dGFjaCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBwb3MgPSBwcm9wcy5wb3NpdGlvblxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogcG9zLmluZGV4T2YoJ3RvcCcpID4gLTEsXG4gICAgICByaWdodDogcG9zLmluZGV4T2YoJ3JpZ2h0JykgPiAtMSxcbiAgICAgIGJvdHRvbTogcG9zLmluZGV4T2YoJ2JvdHRvbScpID4gLTEsXG4gICAgICBsZWZ0OiBwb3MuaW5kZXhPZignbGVmdCcpID4gLTEsXG4gICAgICB2ZXJ0aWNhbDogcG9zID09PSAndG9wJyB8fCBwb3MgPT09ICdib3R0b20nLFxuICAgICAgaG9yaXpvbnRhbDogcG9zID09PSAnbGVmdCcgfHwgcG9zID09PSAncmlnaHQnXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IHRvcCA9IGNvbXB1dGVkKCgpID0+ICRsYXlvdXQuaGVhZGVyLm9mZnNldClcbiAgY29uc3QgcmlnaHQgPSBjb21wdXRlZCgoKSA9PiAkbGF5b3V0LnJpZ2h0Lm9mZnNldClcbiAgY29uc3QgYm90dG9tID0gY29tcHV0ZWQoKCkgPT4gJGxheW91dC5mb290ZXIub2Zmc2V0KVxuICBjb25zdCBsZWZ0ID0gY29tcHV0ZWQoKCkgPT4gJGxheW91dC5sZWZ0Lm9mZnNldClcblxuICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBsZXQgcG9zWCA9IDAsIHBvc1kgPSAwXG5cbiAgICBjb25zdCBzaWRlID0gYXR0YWNoLnZhbHVlXG4gICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyAtMSA6IDFcblxuICAgIGlmIChzaWRlLnRvcCA9PT0gdHJ1ZSAmJiB0b3AudmFsdWUgIT09IDApIHtcbiAgICAgIHBvc1kgPSBgJHsgdG9wLnZhbHVlIH1weGBcbiAgICB9XG4gICAgZWxzZSBpZiAoc2lkZS5ib3R0b20gPT09IHRydWUgJiYgYm90dG9tLnZhbHVlICE9PSAwKSB7XG4gICAgICBwb3NZID0gYCR7IC1ib3R0b20udmFsdWUgfXB4YFxuICAgIH1cblxuICAgIGlmIChzaWRlLmxlZnQgPT09IHRydWUgJiYgbGVmdC52YWx1ZSAhPT0gMCkge1xuICAgICAgcG9zWCA9IGAkeyBkaXIgKiBsZWZ0LnZhbHVlIH1weGBcbiAgICB9XG4gICAgZWxzZSBpZiAoc2lkZS5yaWdodCA9PT0gdHJ1ZSAmJiByaWdodC52YWx1ZSAhPT0gMCkge1xuICAgICAgcG9zWCA9IGAkeyAtZGlyICogcmlnaHQudmFsdWUgfXB4YFxuICAgIH1cblxuICAgIGNvbnN0IGNzcyA9IHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7IHBvc1ggfSwgJHsgcG9zWSB9KWAgfVxuXG4gICAgaWYgKHByb3BzLm9mZnNldCkge1xuICAgICAgY3NzLm1hcmdpbiA9IGAkeyBwcm9wcy5vZmZzZXRbIDEgXSB9cHggJHsgcHJvcHMub2Zmc2V0WyAwIF0gfXB4YFxuICAgIH1cblxuICAgIGlmIChzaWRlLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICBpZiAobGVmdC52YWx1ZSAhPT0gMCkge1xuICAgICAgICBjc3NbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JyBdID0gYCR7IGxlZnQudmFsdWUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKHJpZ2h0LnZhbHVlICE9PSAwKSB7XG4gICAgICAgIGNzc1sgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnbGVmdCcgOiAncmlnaHQnIF0gPSBgJHsgcmlnaHQudmFsdWUgfXB4YFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChzaWRlLmhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgIGlmICh0b3AudmFsdWUgIT09IDApIHtcbiAgICAgICAgY3NzLnRvcCA9IGAkeyB0b3AudmFsdWUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKGJvdHRvbS52YWx1ZSAhPT0gMCkge1xuICAgICAgICBjc3MuYm90dG9tID0gYCR7IGJvdHRvbS52YWx1ZSB9cHhgXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNzc1xuICB9KVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGBxLXBhZ2Utc3RpY2t5IHJvdyBmbGV4LWNlbnRlciBmaXhlZC0keyBwcm9wcy5wb3NpdGlvbiB9YFxuICAgICsgYCBxLXBhZ2Utc3RpY2t5LS0keyBwcm9wcy5leHBhbmQgPT09IHRydWUgPyAnZXhwYW5kJyA6ICdzaHJpbmsnIH1gXG4gIClcblxuICBmdW5jdGlvbiBnZXRTdGlja3lDb250ZW50IChzbG90cykge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBoU2xvdChzbG90cy5kZWZhdWx0KVxuXG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlXG4gICAgfSxcbiAgICBwcm9wcy5leHBhbmQgPT09IHRydWVcbiAgICAgID8gY29udGVudFxuICAgICAgOiBbIGgoJ2RpdicsIGNvbnRlbnQpIF1cbiAgICApXG4gIH1cblxuICByZXR1cm4ge1xuICAgICRsYXlvdXQsXG4gICAgZ2V0U3RpY2t5Q29udGVudFxuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB1c2VQYWdlU3RpY2t5LCB7IHVzZVBhZ2VTdGlja3lQcm9wcyB9IGZyb20gJy4vdXNlLXBhZ2Utc3RpY2t5J1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVBhZ2VTdGlja3knLFxuXG4gIHByb3BzOiB1c2VQYWdlU3RpY2t5UHJvcHMsXG5cbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgZ2V0U3RpY2t5Q29udGVudCB9ID0gdXNlUGFnZVN0aWNreSgpXG4gICAgcmV0dXJuICgpID0+IGdldFN0aWNreUNvbnRlbnQoc2xvdHMpXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiB2LWlmPVwibGlzdFwiPlxyXG4gICAgPHEtdGFic1xyXG4gICAgICB2LWlmPVwiIWxpc3QuaXNSZWNpcGVcIlxyXG4gICAgICB2LW1vZGVsPVwidGFiXCJcclxuICAgICAgZGVuc2VcclxuICAgICAgY2xhc3M9XCJ0ZXh0LWdyZXlcIlxyXG4gICAgICBhY3RpdmUtY29sb3I9XCJ0ZWFsXCJcclxuICAgICAgaW5kaWNhdG9yLWNvbG9yPVwidGVhbFwiXHJcbiAgICAgIGFsaWduPVwianVzdGlmeVwiXHJcbiAgICAgIG5hcnJvdy1pbmRpY2F0b3JcclxuICAgID5cclxuICAgICAgPHEtdGFiIG5hbWU9XCJsaXN0XCIgbGFiZWw9XCJMaXN0XCIgLz5cclxuICAgICAgPHEtdGFiIG5hbWU9XCJsb2NhdGlvbnNcIiBsYWJlbD1cIkxvY2F0aW9uc1wiIC8+XHJcbiAgICA8L3EtdGFicz5cclxuICAgIDxxLXNlcGFyYXRvcj48L3Etc2VwYXJhdG9yPlxyXG4gICAgPHEtdGFiLXBhbmVscyB2LW1vZGVsPVwidGFiXCIgYW5pbWF0ZWQ+XHJcbiAgICAgIDxxLXRhYi1wYW5lbCBuYW1lPVwibGlzdFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWhlYWRlclwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtaGVhZGVyX19jb3VudFwiPlxyXG4gICAgICAgICAgICB7eyBsaXN0Lmxpc3RJdGVtcy5sZW5ndGggfX1cclxuICAgICAgICAgICAge3sgbGlzdC5saXN0SXRlbXMubGVuZ3RoIDwgMiA/IFwiaXRlbVwiIDogXCJpdGVtc1wiIH19XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgdi1pZj1cInRpbWVTcGVudFNob3BwaW5nXCI+e3sgdGltZVNwZW50U2hvcHBpbmcgfX08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWhlYWRlcl9fc3RhdHVzXCI+e3sgbGlzdC5zdGF0dXMgfX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8cS1saXN0XHJcbiAgICAgICAgICBkZW5zZVxyXG4gICAgICAgICAgYm9yZGVyZWRcclxuICAgICAgICAgIHBhZGRpbmdcclxuICAgICAgICAgIGNsYXNzPVwicm91bmRlZC1ib3JkZXJzIGxpc3RcIlxyXG4gICAgICAgICAgdi1pZj1cImxpc3Quc3RhdHVzICE9PSAnYWN0aXZlJ1wiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHEtaXRlbVxyXG4gICAgICAgICAgICBjbGlja2FibGVcclxuICAgICAgICAgICAgdi1yaXBwbGVcclxuICAgICAgICAgICAgdi1mb3I9XCJpdGVtIGluIGxpc3QubGlzdEl0ZW1zXCJcclxuICAgICAgICAgICAgOmtleT1cIml0ZW0uX2lkXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7eyBpdGVtLml0ZW0gfX1cclxuICAgICAgICAgICAgICAgIDxxLWljb24gdi1pZj1cIml0ZW0uc3RhdHVzID09PSAnYm91Z2h0J1wiIG5hbWU9XCJkb25lX291dGxpbmVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPHEtaWNvbiB2LWlmPVwiaXRlbS5zdGF0dXMgPT09ICdub3RfYm91Z2h0J1wiIG5hbWU9XCJjbG9zZVwiIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XHJcbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICA8L3EtaXRlbT5cclxuICAgICAgICA8L3EtbGlzdD5cclxuICAgICAgICA8cS1saXN0XHJcbiAgICAgICAgICBkZW5zZVxyXG4gICAgICAgICAgYm9yZGVyZWRcclxuICAgICAgICAgIHBhZGRpbmdcclxuICAgICAgICAgIGNsYXNzPVwicm91bmRlZC1ib3JkZXJzXCJcclxuICAgICAgICAgIHYtaWY9XCJsaXN0LnN0YXR1cyA9PT0gJ2FjdGl2ZSdcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxxLWl0ZW1cclxuICAgICAgICAgICAgdi1mb3I9XCJpdGVtIGluIGxpc3QubGlzdEl0ZW1zXCJcclxuICAgICAgICAgICAgOmtleT1cIml0ZW0uX2lkXCJcclxuICAgICAgICAgICAgdGFnPVwibGFiZWxcIlxyXG4gICAgICAgICAgICB2LXJpcHBsZVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxyXG4gICAgICAgICAgICAgIDxxLWNoZWNrYm94XHJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiYm91Z2h0SXRlbXNcIlxyXG4gICAgICAgICAgICAgICAgOnZhbD1cIml0ZW0uaXRlbVwiXHJcbiAgICAgICAgICAgICAgICBjb2xvcj1cImN5YW4tOVwiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgaXRlbS5pdGVtIH19PC9xLWl0ZW0tbGFiZWw+XHJcbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICA8L3EtaXRlbT5cclxuICAgICAgICA8L3EtbGlzdD5cclxuICAgICAgICA8cS1wYWdlLXN0aWNreSBwb3NpdGlvbj1cImJvdHRvbS1yaWdodFwiIGNsYXNzPVwic2hvcHBpbmctcGFnZS1zdGlja3lcIj5cclxuICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICB2LWlmPVwibGlzdC5zdGF0dXMgPT09ICdwZW5kaW5nJ1wiXHJcbiAgICAgICAgICAgIEBjbGljaz1cInN0YXJ0U2hvcHBpbmdcIlxyXG4gICAgICAgICAgICBmYWJcclxuICAgICAgICAgICAgbGFiZWw9XCJnbyBzaG9wcGluZ1wiXHJcbiAgICAgICAgICAgIGNvbG9yPVwiY3lhbi05XCJcclxuICAgICAgICAgICAgY2xhc3M9XCJzaG9wcGluZy1wYWdlLXN0aWNreS1idG5cIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICB2LWlmPVwibGlzdC5zdGF0dXMgPT09ICdhY3RpdmUnXCJcclxuICAgICAgICAgICAgQGNsaWNrPVwiZW5kU2hvcHBpbmdcIlxyXG4gICAgICAgICAgICBmYWJcclxuICAgICAgICAgICAgbGFiZWw9XCJlbmQgc2hvcHBpbmdcIlxyXG4gICAgICAgICAgICBjb2xvcj1cImN5YW4tOVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwic2hvcHBpbmctcGFnZS1zdGlja3ktYnRuXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8cS1idG5cclxuICAgICAgICAgICAgdi1pZj1cImxpc3Quc3RhdHVzID09PSAnY29tcGxldGVkJ1wiXHJcbiAgICAgICAgICAgIEBjbGljaz1cInJldXNlU2hvcHBpbmdMaXN0XCJcclxuICAgICAgICAgICAgZmFiXHJcbiAgICAgICAgICAgIGljb249XCJyZWZyZXNoXCJcclxuICAgICAgICAgICAgbGFiZWw9XCJyZXVzZSBsaXN0XCJcclxuICAgICAgICAgICAgY29sb3I9XCJjeWFuLTlcIlxyXG4gICAgICAgICAgICBjbGFzcz1cInNob3BwaW5nLXBhZ2Utc3RpY2t5LWJ0blwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvcS1wYWdlLXN0aWNreT5cclxuICAgICAgPC9xLXRhYi1wYW5lbD5cclxuICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJsb2NhdGlvbnNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic2xpZGVyLWJveFwiPlxyXG4gICAgICAgICAgPHEtc2xpZGVyXHJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJnZW9sb2NhdGlvbkluZm8ucmFkaXVzXCJcclxuICAgICAgICAgICAgbWFya2Vyc1xyXG4gICAgICAgICAgICA6bWFya2VyLWxhYmVscz1cImFkZEttXCJcclxuICAgICAgICAgICAgOm1pbj1cIjFcIlxyXG4gICAgICAgICAgICA6bWF4PVwiN1wiXHJcbiAgICAgICAgICAgIEBjaGFuZ2U9XCJzbGlkZXJDaGFuZ2VkXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiB2LWlmPVwiZmlsdGVyZWRMb2NhdGlvbnNJblJhZGl1cy5sZW5ndGhcIj5cclxuICAgICAgICAgIDxkaXY+TG9jYXRpb25zIExpc3Q8L2Rpdj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgdi1mb3I9XCJsb2NhdGlvbiBpbiBmaWx0ZXJlZExvY2F0aW9uc0luUmFkaXVzXCJcclxuICAgICAgICAgICAgOmtleT1cImxvY2F0aW9uLmNvb3JkaW5hdGVzXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHEtY2FyZCBmbGF0IGJvcmRlcmVkIHYtaWY9XCJsb2NhdGlvbi5jb3VudCAhPT0gMFwiPlxyXG4gICAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDxkaXY+e3sgbG9jYXRpb24ubmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAge3sgbG9jYXRpb24uY291bnQgfX0ve3sgbGlzdC5saXN0SXRlbXMubGVuZ3RoIH19IGl0ZW1zXHJcbiAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cclxuICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgdi1mb3I9XCJhdkl0ZW0gaW4gbG9jYXRpb24uYXZhaWxhYmxlSXRlbXNcIlxyXG4gICAgICAgICAgICAgICAgICA6a2V5PVwiYXZJdGVtLl9pZFwiXHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHt7IGF2SXRlbS5uYW1lIH19IHwge3sgYXZJdGVtLnByaWNlIH19IGxlaVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cclxuICAgICAgICAgICAgICAgIDxkaXY+VG90YWw6IHt7IGxvY2F0aW9uLnRvdGFsLnRvRml4ZWQoMikgfX0gbGVpPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICAgICAgPC9xLWNhcmQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPEVtcHR5RGF0YVxyXG4gICAgICAgICAgdi1lbHNlXHJcbiAgICAgICAgICA6aW1hZ2U9XCJpbWFnZVwiXHJcbiAgICAgICAgICA6dGl0bGU9XCJ0aXRsZVwiXHJcbiAgICAgICAgICA6bWVzc2FnZT1cIm1lc3NhZ2VcIlxyXG4gICAgICAgID48L0VtcHR5RGF0YT5cclxuICAgICAgPC9xLXRhYi1wYW5lbD5cclxuICAgIDwvcS10YWItcGFuZWxzPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgdXNlRGFzaEhlYWRlclN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZGFzaC1oZWFkZXJcIjtcclxuaW1wb3J0IHsgdXNlR2VvbG9jYXRpb25JbmZvU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9nZW9sb2NhdGlvbi1pbmZvXCI7XHJcbmltcG9ydCBFbXB0eURhdGEgZnJvbSBcInNyYy9jb21wb25lbnRzL2N1c3RvbWVyL0VtcHR5RGF0YS52dWVcIjtcclxuaW1wb3J0IHVzZVF1YXNhciBmcm9tIFwicXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtcXVhc2FyLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogXCJNYW5hZ2VTaG9wcGluZ0xpc3RQYWdlXCIsXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgRW1wdHlEYXRhLFxyXG4gIH0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGJvdWdodEl0ZW1zOiBbXSxcclxuICAgICAgY2FsY3VsYXRlZExvY2F0aW9uczogW10sXHJcbiAgICAgIGxpc3Q6IG51bGwsXHJcbiAgICAgIHRhYjogXCJsaXN0XCIsXHJcbiAgICAgIGxhdGxuZzogXCJcIixcclxuICAgICAgbXlDb29yZGluYXRlczoge1xyXG4gICAgICAgIGxhdDogMCxcclxuICAgICAgICBsbmc6IDAsXHJcbiAgICAgIH0sXHJcbiAgICAgIGdlb2xvY2F0aW9uSW5mbzogbnVsbCxcclxuICAgICAgaW1hZ2U6IFwiVm9pZC5zdmdcIixcclxuICAgICAgdGl0bGU6IFwiTm8gbG9jYXRpb24gZm91bmQgaW4gdGhpcyByYWRpdXNcIixcclxuICAgICAgbWVzc2FnZTogXCJUcnkgdG8gaW5jcmVhc2UgdGhlIHJhZGl1c1wiLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICB0aW1lU3BlbnRTaG9wcGluZygpIHtcclxuICAgICAgaWYgKHRoaXMubGlzdC5zdGF0dXMgPT09IFwiY29tcGxldGVkXCIpIHtcclxuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy5saXN0LnRpbWVFbmRlZCAtIHRoaXMubGlzdC50aW1lU3RhcnRlZDtcclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRUaW1lID0gbmV3IERhdGUodGltZSkudG9JU09TdHJpbmcoKS5zbGljZSgxMSwgMTkpO1xyXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRUaW1lO1xyXG4gICAgICB9IGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZmlsdGVyZWRMb2NhdGlvbnNJblJhZGl1cygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRlZExvY2F0aW9ucy5maWx0ZXIoKGxvY2F0aW9uKSA9PiBsb2NhdGlvbi5jb3VudCAhPSAwKTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgdGhpcy5nZW9sb2NhdGlvbkluZm8gPSB1c2VHZW9sb2NhdGlvbkluZm9TdG9yZSgpO1xyXG4gICAgYXdhaXQgdGhpcy5mZXRjaExpc3QoKTtcclxuICAgIGNvbnN0IGRhc2hIZWFkZXIgPSB1c2VEYXNoSGVhZGVyU3RvcmUoKTtcclxuXHJcbiAgICBkYXNoSGVhZGVyLiRwYXRjaCh7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmxpc3QubmFtZSxcclxuICAgICAgc2hvd0JhY2tJY29uOiB0cnVlLFxyXG4gICAgICBiYWNrSWNvblRvOiBcIi9zaG9wcGluZ1wiLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IHBvc2l0aW9uID0gYXdhaXQgdGhpcy5nZXRQb3NpdGlvbigpO1xyXG4gICAgICB0aGlzLm15Q29vcmRpbmF0ZXMubGF0ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xyXG4gICAgICB0aGlzLm15Q29vcmRpbmF0ZXMubG5nID0gcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZTtcclxuICAgICAgdGhpcy5sYXRsbmcgPSB0aGlzLm15Q29vcmRpbmF0ZXMubGF0ICsgXCIsXCIgKyB0aGlzLm15Q29vcmRpbmF0ZXMubG5nO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9XHJcblxyXG4gICAgYXdhaXQgdGhpcy5jYWxjdWxhdGVMb2NhdGlvbnMoKTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGdldFBvc2l0aW9uKCkge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihyZXMsIHJlaik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIGZldGNoTGlzdCgpIHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLmdldChcclxuICAgICAgICBgL3Nob3BwaW5nLWxpc3RzL2dldC1zaG9wcGluZy1saXN0cy8ke3RoaXMuJHJvdXRlLnBhcmFtcy5zaG9wcGluZ0xpc3RJZH1gXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMubGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgIH0sXHJcbiAgICBhc3luYyBjaGFuZ2VMaXN0U3RhdHVzKCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICBzdGF0dXM6IFwiYWN0aXZlXCIsXHJcbiAgICAgICAgICB0aW1lU3RhcnRlZDogRGF0ZS5ub3coKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5wYXRjaChcclxuICAgICAgICAgIGAvc2hvcHBpbmctbGlzdHMvcGF0Y2gtc2hvcHBpbmctbGlzdC8ke3RoaXMuJHJvdXRlLnBhcmFtcy5zaG9wcGluZ0xpc3RJZH1gLFxyXG4gICAgICAgICAgZGF0YVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXR1cyBjaGFuZ2VkIHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBzdGFydFNob3BwaW5nKCkge1xyXG4gICAgICBhd2FpdCB0aGlzLmNoYW5nZUxpc3RTdGF0dXMoKTtcclxuICAgICAgYXdhaXQgdGhpcy5mZXRjaExpc3QoKTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBlbmRTaG9wcGluZygpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxyXG4gICAgICAgICAgdGltZUVuZGVkOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgYm91Z2h0SXRlbXM6IHRoaXMuYm91Z2h0SXRlbXMsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkucGF0Y2goXHJcbiAgICAgICAgICBgL3Nob3BwaW5nLWxpc3RzL2VuZC1zaG9wcGluZy1saXN0LyR7dGhpcy4kcm91dGUucGFyYW1zLnNob3BwaW5nTGlzdElkfWAsXHJcbiAgICAgICAgICBkYXRhXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgYXdhaXQgdGhpcy5mZXRjaExpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyByZXVzZVNob3BwaW5nTGlzdCgpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBpdGVtc1RvUmV1c2UgPSB0aGlzLmxpc3QubGlzdEl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5pdGVtKTtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgbmFtZTpcclxuICAgICAgICAgICAgbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1HQlwiKSArXHJcbiAgICAgICAgICAgIFwiIFwiICtcclxuICAgICAgICAgICAgbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtcclxuICAgICAgICAgICAgICBob3VyOiBcIjItZGlnaXRcIixcclxuICAgICAgICAgICAgICBtaW51dGU6IFwiMi1kaWdpdFwiLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgIHNlbGVjdGVkUHJvZHVjdHM6IGl0ZW1zVG9SZXVzZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkucG9zdChcclxuICAgICAgICAgIFwiL3Nob3BwaW5nLWxpc3RzL2NyZWF0ZS1zaG9wcGluZy1saXN0XCIsXHJcbiAgICAgICAgICBkYXRhXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgIGF3YWl0IHRoaXMuJHJvdXRlci5wdXNoKGAvc2hvcHBpbmcvJHtyZXMuZGF0YS5uZXdMaXN0SWR9YCk7XHJcbiAgICAgICAgICB0aGlzLiRyb3V0ZXIuZ28oMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgY2FsY3VsYXRlTG9jYXRpb25zKCkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkuZ2V0KFxyXG4gICAgICAgIGAvbG9jYXRpb25zL2NhbGN1bGF0ZS1sb2NhdGlvbnMvJHt0aGlzLiRyb3V0ZS5wYXJhbXMuc2hvcHBpbmdMaXN0SWR9L3dpdGhpbi8ke3RoaXMuZ2VvbG9jYXRpb25JbmZvLiRzdGF0ZS5yYWRpdXN9L2NlbnRlci8ke3RoaXMubGF0bG5nfWBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5jYWxjdWxhdGVkTG9jYXRpb25zID0gcmVzLmRhdGEuY2FsY3VsYXRlZExvY2F0aW9ucztcclxuICAgIH0sXHJcbiAgICBhc3luYyBzbGlkZXJDaGFuZ2VkKCkge1xyXG4gICAgICBhd2FpdCB0aGlzLmNhbGN1bGF0ZUxvY2F0aW9ucygpO1xyXG4gICAgfSxcclxuICAgIGFkZEttKHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZSArIFwia21cIjtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4ubGlzdC1oZWFkZXIge1xyXG4gIHBhZGRpbmc6IDIwcHggMzBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG4ubGlzdC1oZWFkZXJfX2NvdW50IHtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxufVxyXG4ubGlzdC1oZWFkZXJfX3N0YXR1cyB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbn1cclxuLmxpc3Qge1xyXG4gIHBhZGRpbmctbGVmdDogMTBweDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuLnNob3BwaW5nLXBhZ2Utc3RpY2t5LWJ0biB7XHJcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbn1cclxuLnNsaWRlci1ib3gge1xyXG4gIHBvc2l0aW9uOiB0b3A7XHJcbiAgdG9wOiA4MHB4O1xyXG4gIHdpZHRoOiA4MCU7XHJcbiAgbGVmdDogLTQ1cHg7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgcGFkZGluZzogMCAxNXB4O1xyXG4gIC8qIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudCgjZTVlNWU1LCAjZTVlNWU1NjIpOyAqL1xyXG59XHJcbjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfb3BlbkJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfY3JlYXRlVGV4dFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS08sTUFBTSxxQkFBcUI7QUFBQSxFQUNoQyxVQUFVO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxXQUFXLE9BQUs7QUFBQSxNQUNkO0FBQUEsTUFBYTtBQUFBLE1BQ2I7QUFBQSxNQUFnQjtBQUFBLE1BQ2hCO0FBQUEsTUFBTztBQUFBLE1BQVM7QUFBQSxNQUFVO0FBQUEsSUFDaEMsRUFBTSxTQUFTLENBQUM7QUFBQSxFQUNiO0FBQUEsRUFDRCxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixXQUFXLE9BQUssRUFBRSxXQUFXO0FBQUEsRUFDOUI7QUFBQSxFQUNELFFBQVE7QUFDVjtBQUVlLFNBQUEsZ0JBQVk7QUFDekIsUUFBTSxFQUFFLE9BQU8sT0FBTyxFQUFFLEdBQUksRUFBQSxJQUFLLG1CQUFvQjtBQUVyRCxRQUFNLFVBQVUsT0FBTyxXQUFXLGFBQWE7QUFDL0MsTUFBSSxZQUFZLGVBQWU7QUFDN0IsWUFBUSxNQUFNLDBDQUEwQztBQUN4RCxXQUFPO0FBQUEsRUFDUjtBQUVELFFBQU0sU0FBUyxTQUFTLE1BQU07QUFDNUIsVUFBTSxNQUFNLE1BQU07QUFFbEIsV0FBTztBQUFBLE1BQ0wsS0FBSyxJQUFJLFFBQVEsS0FBSyxJQUFJO0FBQUEsTUFDMUIsT0FBTyxJQUFJLFFBQVEsT0FBTyxJQUFJO0FBQUEsTUFDOUIsUUFBUSxJQUFJLFFBQVEsUUFBUSxJQUFJO0FBQUEsTUFDaEMsTUFBTSxJQUFJLFFBQVEsTUFBTSxJQUFJO0FBQUEsTUFDNUIsVUFBVSxRQUFRLFNBQVMsUUFBUTtBQUFBLE1BQ25DLFlBQVksUUFBUSxVQUFVLFFBQVE7QUFBQSxJQUN2QztBQUFBLEVBQ0wsQ0FBRztBQUVELFFBQU0sTUFBTSxTQUFTLE1BQU0sUUFBUSxPQUFPLE1BQU07QUFD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
