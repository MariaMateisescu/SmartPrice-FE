import { Q as QTabPanels, a as QTab, b as QTabPanel } from "./QTabPanels.60312f62.js";
import { Q as QTabs } from "./QTabs.64f3958c.js";
import { bw as emptyRenderFn, a1 as computed, an as inject, bF as hSlot, ak as h, ah as getCurrentInstance, bz as layoutKey, bt as createComponent, _ as _export_sfc, bB as useDashHeaderStore, o as openBlock, c as createElementBlock, a2 as createBlock, b5 as withCtx, a3 as createCommentVNode, aa as createVNode, a as createBaseVNode, M as toDisplayString, Q as Fragment, aK as renderList, b7 as withDirectives, a9 as createTextVNode, bC as QIcon, bE as QBtn, bS as Ripple, aH as pushScopeId, aF as popScopeId } from "./index.5a14f3c4.js";
import { Q as QSeparator } from "./QSeparator.8089b31c.js";
import { Q as QItem, a as QItemSection } from "./QItem.aec05661.js";
import { Q as QList } from "./QList.70a760ee.js";
import { a as QCheckbox, Q as QItemLabel } from "./QCheckbox.dfa8d790.js";
import { u as useGeolocationInfoStore, Q as QSlider } from "./QSlider.30a19e1e.js";
import { a as QCardSection, Q as QCard } from "./QCard.133f47d5.js";
import "./use-dark.a5d47983.js";
import "./touch.70a9dd44.js";
import "./selection.f977ff01.js";
import "./use-cache.b0833c75.js";
import "./uid.42677368.js";
import "./QResizeObserver.af6df7b4.js";
import "./use-timeout.a3a7dc24.js";
import "./rtl.b51694b1.js";
import "./use-checkbox.e7258a8b.js";
import "./use-form.0026fe71.js";
import "./TouchPan.0f0bed18.js";
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
      geolocationInfo: null
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
const _withScopeId = (n) => (pushScopeId("data-v-24160c58"), n = n(), popScopeId(), n);
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { class: "list-header" };
const _hoisted_3 = { class: "list-header__count" };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { class: "list-header__status" };
const _hoisted_6 = { class: "slider-box" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Locations List:", -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
    createVNode(QTabPanels, {
      modelValue: $data.tab,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.tab = $event),
      animated: ""
    }, {
      default: withCtx(() => [
        createVNode(QTabPanel, { name: "list" }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, toDisplayString($data.list.listItems.length) + " items ", 1),
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
            _hoisted_7,
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.calculatedLocations, (location) => {
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
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ])) : createCommentVNode("", true);
}
var ManageShoppingListPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-24160c58"], ["__file", "ManageShoppingListPage.vue"]]);
export { ManageShoppingListPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFuYWdlU2hvcHBpbmdMaXN0UGFnZS5hOTMyYjhiNi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlLXN0aWNreS91c2UtcGFnZS1zdGlja3kuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3BhZ2Utc3RpY2t5L1FQYWdlU3RpY2t5LmpzIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL01hbmFnZVNob3BwaW5nTGlzdFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkLCBpbmplY3QsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGxheW91dEtleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGNvbnN0IHVzZVBhZ2VTdGlja3lQcm9wcyA9IHtcbiAgcG9zaXRpb246IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ2JvdHRvbS1yaWdodCcsXG4gICAgdmFsaWRhdG9yOiB2ID0+IFtcbiAgICAgICd0b3AtcmlnaHQnLCAndG9wLWxlZnQnLFxuICAgICAgJ2JvdHRvbS1yaWdodCcsICdib3R0b20tbGVmdCcsXG4gICAgICAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J1xuICAgIF0uaW5jbHVkZXModilcbiAgfSxcbiAgb2Zmc2V0OiB7XG4gICAgdHlwZTogQXJyYXksXG4gICAgdmFsaWRhdG9yOiB2ID0+IHYubGVuZ3RoID09PSAyXG4gIH0sXG4gIGV4cGFuZDogQm9vbGVhblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHsgcHJvcHMsIHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgJGxheW91dCA9IGluamVjdChsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4pXG4gIGlmICgkbGF5b3V0ID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgY29uc29sZS5lcnJvcignUVBhZ2VTdGlja3kgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUUxheW91dCcpXG4gICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgfVxuXG4gIGNvbnN0IGF0dGFjaCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBwb3MgPSBwcm9wcy5wb3NpdGlvblxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogcG9zLmluZGV4T2YoJ3RvcCcpID4gLTEsXG4gICAgICByaWdodDogcG9zLmluZGV4T2YoJ3JpZ2h0JykgPiAtMSxcbiAgICAgIGJvdHRvbTogcG9zLmluZGV4T2YoJ2JvdHRvbScpID4gLTEsXG4gICAgICBsZWZ0OiBwb3MuaW5kZXhPZignbGVmdCcpID4gLTEsXG4gICAgICB2ZXJ0aWNhbDogcG9zID09PSAndG9wJyB8fCBwb3MgPT09ICdib3R0b20nLFxuICAgICAgaG9yaXpvbnRhbDogcG9zID09PSAnbGVmdCcgfHwgcG9zID09PSAncmlnaHQnXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IHRvcCA9IGNvbXB1dGVkKCgpID0+ICRsYXlvdXQuaGVhZGVyLm9mZnNldClcbiAgY29uc3QgcmlnaHQgPSBjb21wdXRlZCgoKSA9PiAkbGF5b3V0LnJpZ2h0Lm9mZnNldClcbiAgY29uc3QgYm90dG9tID0gY29tcHV0ZWQoKCkgPT4gJGxheW91dC5mb290ZXIub2Zmc2V0KVxuICBjb25zdCBsZWZ0ID0gY29tcHV0ZWQoKCkgPT4gJGxheW91dC5sZWZ0Lm9mZnNldClcblxuICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBsZXQgcG9zWCA9IDAsIHBvc1kgPSAwXG5cbiAgICBjb25zdCBzaWRlID0gYXR0YWNoLnZhbHVlXG4gICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyAtMSA6IDFcblxuICAgIGlmIChzaWRlLnRvcCA9PT0gdHJ1ZSAmJiB0b3AudmFsdWUgIT09IDApIHtcbiAgICAgIHBvc1kgPSBgJHsgdG9wLnZhbHVlIH1weGBcbiAgICB9XG4gICAgZWxzZSBpZiAoc2lkZS5ib3R0b20gPT09IHRydWUgJiYgYm90dG9tLnZhbHVlICE9PSAwKSB7XG4gICAgICBwb3NZID0gYCR7IC1ib3R0b20udmFsdWUgfXB4YFxuICAgIH1cblxuICAgIGlmIChzaWRlLmxlZnQgPT09IHRydWUgJiYgbGVmdC52YWx1ZSAhPT0gMCkge1xuICAgICAgcG9zWCA9IGAkeyBkaXIgKiBsZWZ0LnZhbHVlIH1weGBcbiAgICB9XG4gICAgZWxzZSBpZiAoc2lkZS5yaWdodCA9PT0gdHJ1ZSAmJiByaWdodC52YWx1ZSAhPT0gMCkge1xuICAgICAgcG9zWCA9IGAkeyAtZGlyICogcmlnaHQudmFsdWUgfXB4YFxuICAgIH1cblxuICAgIGNvbnN0IGNzcyA9IHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7IHBvc1ggfSwgJHsgcG9zWSB9KWAgfVxuXG4gICAgaWYgKHByb3BzLm9mZnNldCkge1xuICAgICAgY3NzLm1hcmdpbiA9IGAkeyBwcm9wcy5vZmZzZXRbIDEgXSB9cHggJHsgcHJvcHMub2Zmc2V0WyAwIF0gfXB4YFxuICAgIH1cblxuICAgIGlmIChzaWRlLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICBpZiAobGVmdC52YWx1ZSAhPT0gMCkge1xuICAgICAgICBjc3NbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JyBdID0gYCR7IGxlZnQudmFsdWUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKHJpZ2h0LnZhbHVlICE9PSAwKSB7XG4gICAgICAgIGNzc1sgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnbGVmdCcgOiAncmlnaHQnIF0gPSBgJHsgcmlnaHQudmFsdWUgfXB4YFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChzaWRlLmhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgIGlmICh0b3AudmFsdWUgIT09IDApIHtcbiAgICAgICAgY3NzLnRvcCA9IGAkeyB0b3AudmFsdWUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKGJvdHRvbS52YWx1ZSAhPT0gMCkge1xuICAgICAgICBjc3MuYm90dG9tID0gYCR7IGJvdHRvbS52YWx1ZSB9cHhgXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNzc1xuICB9KVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGBxLXBhZ2Utc3RpY2t5IHJvdyBmbGV4LWNlbnRlciBmaXhlZC0keyBwcm9wcy5wb3NpdGlvbiB9YFxuICAgICsgYCBxLXBhZ2Utc3RpY2t5LS0keyBwcm9wcy5leHBhbmQgPT09IHRydWUgPyAnZXhwYW5kJyA6ICdzaHJpbmsnIH1gXG4gIClcblxuICBmdW5jdGlvbiBnZXRTdGlja3lDb250ZW50IChzbG90cykge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBoU2xvdChzbG90cy5kZWZhdWx0KVxuXG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlXG4gICAgfSxcbiAgICBwcm9wcy5leHBhbmQgPT09IHRydWVcbiAgICAgID8gY29udGVudFxuICAgICAgOiBbIGgoJ2RpdicsIGNvbnRlbnQpIF1cbiAgICApXG4gIH1cblxuICByZXR1cm4ge1xuICAgICRsYXlvdXQsXG4gICAgZ2V0U3RpY2t5Q29udGVudFxuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB1c2VQYWdlU3RpY2t5LCB7IHVzZVBhZ2VTdGlja3lQcm9wcyB9IGZyb20gJy4vdXNlLXBhZ2Utc3RpY2t5J1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVBhZ2VTdGlja3knLFxuXG4gIHByb3BzOiB1c2VQYWdlU3RpY2t5UHJvcHMsXG5cbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgZ2V0U3RpY2t5Q29udGVudCB9ID0gdXNlUGFnZVN0aWNreSgpXG4gICAgcmV0dXJuICgpID0+IGdldFN0aWNreUNvbnRlbnQoc2xvdHMpXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiB2LWlmPVwibGlzdFwiPlxyXG4gICAgPHEtdGFic1xyXG4gICAgICB2LWlmPVwiIWxpc3QuaXNSZWNpcGVcIlxyXG4gICAgICB2LW1vZGVsPVwidGFiXCJcclxuICAgICAgZGVuc2VcclxuICAgICAgY2xhc3M9XCJ0ZXh0LWdyZXlcIlxyXG4gICAgICBhY3RpdmUtY29sb3I9XCJ0ZWFsXCJcclxuICAgICAgaW5kaWNhdG9yLWNvbG9yPVwidGVhbFwiXHJcbiAgICAgIGFsaWduPVwianVzdGlmeVwiXHJcbiAgICAgIG5hcnJvdy1pbmRpY2F0b3JcclxuICAgID5cclxuICAgICAgPHEtdGFiIG5hbWU9XCJsaXN0XCIgbGFiZWw9XCJMaXN0XCIgLz5cclxuICAgICAgPHEtdGFiIG5hbWU9XCJsb2NhdGlvbnNcIiBsYWJlbD1cIkxvY2F0aW9uc1wiIC8+XHJcbiAgICA8L3EtdGFicz5cclxuICAgIDxxLXRhYi1wYW5lbHMgdi1tb2RlbD1cInRhYlwiIGFuaW1hdGVkPlxyXG4gICAgICA8cS10YWItcGFuZWwgbmFtZT1cImxpc3RcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1oZWFkZXJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWhlYWRlcl9fY291bnRcIj5cclxuICAgICAgICAgICAge3sgbGlzdC5saXN0SXRlbXMubGVuZ3RoIH19IGl0ZW1zXHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgdi1pZj1cInRpbWVTcGVudFNob3BwaW5nXCI+e3sgdGltZVNwZW50U2hvcHBpbmcgfX08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWhlYWRlcl9fc3RhdHVzXCI+e3sgbGlzdC5zdGF0dXMgfX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8cS1saXN0XHJcbiAgICAgICAgICBkZW5zZVxyXG4gICAgICAgICAgYm9yZGVyZWRcclxuICAgICAgICAgIHBhZGRpbmdcclxuICAgICAgICAgIGNsYXNzPVwicm91bmRlZC1ib3JkZXJzIGxpc3RcIlxyXG4gICAgICAgICAgdi1pZj1cImxpc3Quc3RhdHVzICE9PSAnYWN0aXZlJ1wiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHEtaXRlbVxyXG4gICAgICAgICAgICBjbGlja2FibGVcclxuICAgICAgICAgICAgdi1yaXBwbGVcclxuICAgICAgICAgICAgdi1mb3I9XCJpdGVtIGluIGxpc3QubGlzdEl0ZW1zXCJcclxuICAgICAgICAgICAgOmtleT1cIml0ZW0uX2lkXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7eyBpdGVtLml0ZW0gfX1cclxuICAgICAgICAgICAgICAgIDxxLWljb24gdi1pZj1cIml0ZW0uc3RhdHVzID09PSAnYm91Z2h0J1wiIG5hbWU9XCJkb25lX291dGxpbmVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPHEtaWNvbiB2LWlmPVwiaXRlbS5zdGF0dXMgPT09ICdub3RfYm91Z2h0J1wiIG5hbWU9XCJjbG9zZVwiIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XHJcbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICA8L3EtaXRlbT5cclxuICAgICAgICA8L3EtbGlzdD5cclxuICAgICAgICA8cS1saXN0XHJcbiAgICAgICAgICBkZW5zZVxyXG4gICAgICAgICAgYm9yZGVyZWRcclxuICAgICAgICAgIHBhZGRpbmdcclxuICAgICAgICAgIGNsYXNzPVwicm91bmRlZC1ib3JkZXJzXCJcclxuICAgICAgICAgIHYtaWY9XCJsaXN0LnN0YXR1cyA9PT0gJ2FjdGl2ZSdcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxxLWl0ZW1cclxuICAgICAgICAgICAgdi1mb3I9XCJpdGVtIGluIGxpc3QubGlzdEl0ZW1zXCJcclxuICAgICAgICAgICAgOmtleT1cIml0ZW0uX2lkXCJcclxuICAgICAgICAgICAgdGFnPVwibGFiZWxcIlxyXG4gICAgICAgICAgICB2LXJpcHBsZVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxyXG4gICAgICAgICAgICAgIDxxLWNoZWNrYm94XHJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiYm91Z2h0SXRlbXNcIlxyXG4gICAgICAgICAgICAgICAgOnZhbD1cIml0ZW0uaXRlbVwiXHJcbiAgICAgICAgICAgICAgICBjb2xvcj1cImN5YW4tOVwiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgaXRlbS5pdGVtIH19PC9xLWl0ZW0tbGFiZWw+XHJcbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICA8L3EtaXRlbT5cclxuICAgICAgICA8L3EtbGlzdD5cclxuICAgICAgICA8cS1wYWdlLXN0aWNreSBwb3NpdGlvbj1cImJvdHRvbS1yaWdodFwiIGNsYXNzPVwic2hvcHBpbmctcGFnZS1zdGlja3lcIj5cclxuICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICB2LWlmPVwibGlzdC5zdGF0dXMgPT09ICdwZW5kaW5nJ1wiXHJcbiAgICAgICAgICAgIEBjbGljaz1cInN0YXJ0U2hvcHBpbmdcIlxyXG4gICAgICAgICAgICBmYWJcclxuICAgICAgICAgICAgbGFiZWw9XCJnbyBzaG9wcGluZ1wiXHJcbiAgICAgICAgICAgIGNvbG9yPVwiY3lhbi05XCJcclxuICAgICAgICAgICAgY2xhc3M9XCJzaG9wcGluZy1wYWdlLXN0aWNreS1idG5cIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICB2LWlmPVwibGlzdC5zdGF0dXMgPT09ICdhY3RpdmUnXCJcclxuICAgICAgICAgICAgQGNsaWNrPVwiZW5kU2hvcHBpbmdcIlxyXG4gICAgICAgICAgICBmYWJcclxuICAgICAgICAgICAgbGFiZWw9XCJlbmQgc2hvcHBpbmdcIlxyXG4gICAgICAgICAgICBjb2xvcj1cImN5YW4tOVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwic2hvcHBpbmctcGFnZS1zdGlja3ktYnRuXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8cS1idG5cclxuICAgICAgICAgICAgdi1pZj1cImxpc3Quc3RhdHVzID09PSAnY29tcGxldGVkJ1wiXHJcbiAgICAgICAgICAgIEBjbGljaz1cInJldXNlU2hvcHBpbmdMaXN0XCJcclxuICAgICAgICAgICAgZmFiXHJcbiAgICAgICAgICAgIGljb249XCJyZWZyZXNoXCJcclxuICAgICAgICAgICAgbGFiZWw9XCJyZXVzZSBsaXN0XCJcclxuICAgICAgICAgICAgY29sb3I9XCJjeWFuLTlcIlxyXG4gICAgICAgICAgICBjbGFzcz1cInNob3BwaW5nLXBhZ2Utc3RpY2t5LWJ0blwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvcS1wYWdlLXN0aWNreT5cclxuICAgICAgPC9xLXRhYi1wYW5lbD5cclxuICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJsb2NhdGlvbnNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic2xpZGVyLWJveFwiPlxyXG4gICAgICAgICAgPHEtc2xpZGVyXHJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJnZW9sb2NhdGlvbkluZm8ucmFkaXVzXCJcclxuICAgICAgICAgICAgbWFya2Vyc1xyXG4gICAgICAgICAgICA6bWFya2VyLWxhYmVscz1cImFkZEttXCJcclxuICAgICAgICAgICAgOm1pbj1cIjFcIlxyXG4gICAgICAgICAgICA6bWF4PVwiN1wiXHJcbiAgICAgICAgICAgIEBjaGFuZ2U9XCJzbGlkZXJDaGFuZ2VkXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdj5Mb2NhdGlvbnMgTGlzdDo8L2Rpdj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICB2LWZvcj1cImxvY2F0aW9uIGluIGNhbGN1bGF0ZWRMb2NhdGlvbnNcIlxyXG4gICAgICAgICAgOmtleT1cImxvY2F0aW9uLmNvb3JkaW5hdGVzXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8cS1jYXJkIGZsYXQgYm9yZGVyZWQgdi1pZj1cImxvY2F0aW9uLmNvdW50ICE9PSAwXCI+XHJcbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICAgICAgICA8ZGl2Pnt7IGxvY2F0aW9uLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAge3sgbG9jYXRpb24uY291bnQgfX0ve3sgbGlzdC5saXN0SXRlbXMubGVuZ3RoIH19IGl0ZW1zIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxxLXNlcGFyYXRvcj48L3Etc2VwYXJhdG9yPlxyXG4gICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJhdkl0ZW0gaW4gbG9jYXRpb24uYXZhaWxhYmxlSXRlbXNcIiA6a2V5PVwiYXZJdGVtLl9pZFwiPlxyXG4gICAgICAgICAgICAgICAge3sgYXZJdGVtLm5hbWUgfX0gfCB7eyBhdkl0ZW0ucHJpY2UgfX0gbGVpXHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XHJcbiAgICAgICAgICAgICAgPGRpdj5Ub3RhbDoge3sgbG9jYXRpb24udG90YWwudG9GaXhlZCgyKSB9fSBsZWk8L2Rpdj5cclxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICAgIDwvcS1jYXJkPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3EtdGFiLXBhbmVsPlxyXG4gICAgPC9xLXRhYi1wYW5lbHM+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyB1c2VEYXNoSGVhZGVyU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9kYXNoLWhlYWRlclwiO1xyXG5pbXBvcnQgeyB1c2VHZW9sb2NhdGlvbkluZm9TdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2dlb2xvY2F0aW9uLWluZm9cIjtcclxuaW1wb3J0IHVzZVF1YXNhciBmcm9tIFwicXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtcXVhc2FyLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogXCJNYW5hZ2VTaG9wcGluZ0xpc3RQYWdlXCIsXHJcblxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBib3VnaHRJdGVtczogW10sXHJcbiAgICAgIGNhbGN1bGF0ZWRMb2NhdGlvbnM6IFtdLFxyXG4gICAgICBsaXN0OiBudWxsLFxyXG4gICAgICB0YWI6IFwibGlzdFwiLFxyXG4gICAgICBsYXRsbmc6IFwiXCIsXHJcbiAgICAgIG15Q29vcmRpbmF0ZXM6IHtcclxuICAgICAgICBsYXQ6IDAsXHJcbiAgICAgICAgbG5nOiAwLFxyXG4gICAgICB9LFxyXG4gICAgICBnZW9sb2NhdGlvbkluZm86IG51bGwsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIHRpbWVTcGVudFNob3BwaW5nKCkge1xyXG4gICAgICBpZiAodGhpcy5saXN0LnN0YXR1cyA9PT0gXCJjb21wbGV0ZWRcIikge1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLmxpc3QudGltZUVuZGVkIC0gdGhpcy5saXN0LnRpbWVTdGFydGVkO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFRpbWUgPSBuZXcgRGF0ZSh0aW1lKS50b0lTT1N0cmluZygpLnNsaWNlKDExLCAxOSk7XHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFRpbWU7XHJcbiAgICAgIH0gZWxzZSByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgfSxcclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgdGhpcy5nZW9sb2NhdGlvbkluZm8gPSB1c2VHZW9sb2NhdGlvbkluZm9TdG9yZSgpO1xyXG4gICAgYXdhaXQgdGhpcy5mZXRjaExpc3QoKTtcclxuICAgIGNvbnN0IGRhc2hIZWFkZXIgPSB1c2VEYXNoSGVhZGVyU3RvcmUoKTtcclxuXHJcbiAgICBkYXNoSGVhZGVyLiRwYXRjaCh7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmxpc3QubmFtZSxcclxuICAgICAgc2hvd0JhY2tJY29uOiB0cnVlLFxyXG4gICAgICBiYWNrSWNvblRvOiBcIi9zaG9wcGluZ1wiLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IHBvc2l0aW9uID0gYXdhaXQgdGhpcy5nZXRQb3NpdGlvbigpO1xyXG4gICAgICB0aGlzLm15Q29vcmRpbmF0ZXMubGF0ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xyXG4gICAgICB0aGlzLm15Q29vcmRpbmF0ZXMubG5nID0gcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZTtcclxuICAgICAgdGhpcy5sYXRsbmcgPSB0aGlzLm15Q29vcmRpbmF0ZXMubGF0ICsgXCIsXCIgKyB0aGlzLm15Q29vcmRpbmF0ZXMubG5nO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9XHJcblxyXG4gICAgYXdhaXQgdGhpcy5jYWxjdWxhdGVMb2NhdGlvbnMoKTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGdldFBvc2l0aW9uKCkge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihyZXMsIHJlaik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIGZldGNoTGlzdCgpIHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLmdldChcclxuICAgICAgICBgL3Nob3BwaW5nLWxpc3RzL2dldC1zaG9wcGluZy1saXN0cy8ke3RoaXMuJHJvdXRlLnBhcmFtcy5zaG9wcGluZ0xpc3RJZH1gXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMubGlzdCA9IHJlcy5kYXRhLmRhdGEubGlzdDtcclxuICAgIH0sXHJcbiAgICBhc3luYyBjaGFuZ2VMaXN0U3RhdHVzKCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICBzdGF0dXM6IFwiYWN0aXZlXCIsXHJcbiAgICAgICAgICB0aW1lU3RhcnRlZDogRGF0ZS5ub3coKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5wYXRjaChcclxuICAgICAgICAgIGAvc2hvcHBpbmctbGlzdHMvcGF0Y2gtc2hvcHBpbmctbGlzdC8ke3RoaXMuJHJvdXRlLnBhcmFtcy5zaG9wcGluZ0xpc3RJZH1gLFxyXG4gICAgICAgICAgZGF0YVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXR1cyBjaGFuZ2VkIHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBzdGFydFNob3BwaW5nKCkge1xyXG4gICAgICBhd2FpdCB0aGlzLmNoYW5nZUxpc3RTdGF0dXMoKTtcclxuICAgICAgYXdhaXQgdGhpcy5mZXRjaExpc3QoKTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBlbmRTaG9wcGluZygpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxyXG4gICAgICAgICAgdGltZUVuZGVkOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgYm91Z2h0SXRlbXM6IHRoaXMuYm91Z2h0SXRlbXMsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkucGF0Y2goXHJcbiAgICAgICAgICBgL3Nob3BwaW5nLWxpc3RzL2VuZC1zaG9wcGluZy1saXN0LyR7dGhpcy4kcm91dGUucGFyYW1zLnNob3BwaW5nTGlzdElkfWAsXHJcbiAgICAgICAgICBkYXRhXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgYXdhaXQgdGhpcy5mZXRjaExpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyByZXVzZVNob3BwaW5nTGlzdCgpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBpdGVtc1RvUmV1c2UgPSB0aGlzLmxpc3QubGlzdEl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5pdGVtKTtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgbmFtZTpcclxuICAgICAgICAgICAgbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1HQlwiKSArXHJcbiAgICAgICAgICAgIFwiIFwiICtcclxuICAgICAgICAgICAgbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtcclxuICAgICAgICAgICAgICBob3VyOiBcIjItZGlnaXRcIixcclxuICAgICAgICAgICAgICBtaW51dGU6IFwiMi1kaWdpdFwiLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgIHNlbGVjdGVkUHJvZHVjdHM6IGl0ZW1zVG9SZXVzZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkucG9zdChcclxuICAgICAgICAgIFwiL3Nob3BwaW5nLWxpc3RzL2NyZWF0ZS1zaG9wcGluZy1saXN0XCIsXHJcbiAgICAgICAgICBkYXRhXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgIGF3YWl0IHRoaXMuJHJvdXRlci5wdXNoKGAvc2hvcHBpbmcvJHtyZXMuZGF0YS5uZXdMaXN0SWR9YCk7XHJcbiAgICAgICAgICB0aGlzLiRyb3V0ZXIuZ28oMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgY2FsY3VsYXRlTG9jYXRpb25zKCkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkuZ2V0KFxyXG4gICAgICAgIGAvbG9jYXRpb25zL2NhbGN1bGF0ZS1sb2NhdGlvbnMvJHt0aGlzLiRyb3V0ZS5wYXJhbXMuc2hvcHBpbmdMaXN0SWR9L3dpdGhpbi8ke3RoaXMuZ2VvbG9jYXRpb25JbmZvLiRzdGF0ZS5yYWRpdXN9L2NlbnRlci8ke3RoaXMubGF0bG5nfWBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5jYWxjdWxhdGVkTG9jYXRpb25zID0gcmVzLmRhdGEuY2FsY3VsYXRlZExvY2F0aW9ucztcclxuICAgIH0sXHJcbiAgICBhc3luYyBzbGlkZXJDaGFuZ2VkKCkge1xyXG4gICAgICBhd2FpdCB0aGlzLmNhbGN1bGF0ZUxvY2F0aW9ucygpO1xyXG4gICAgfSxcclxuICAgIGFkZEttKHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZSArIFwia21cIjtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4ubGlzdC1oZWFkZXIge1xyXG4gIHBhZGRpbmc6IDIwcHggMzBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG4ubGlzdC1oZWFkZXJfX2NvdW50IHtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxufVxyXG4ubGlzdC1oZWFkZXJfX3N0YXR1cyB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbn1cclxuLmxpc3Qge1xyXG4gIHBhZGRpbmctbGVmdDogMTBweDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuLnNob3BwaW5nLXBhZ2Utc3RpY2t5LWJ0biB7XHJcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbn1cclxuLnNsaWRlci1ib3gge1xyXG4gIHBvc2l0aW9uOiB0b3A7XHJcbiAgdG9wOiA4MHB4O1xyXG4gIHdpZHRoOiA4MCU7XHJcbiAgbGVmdDogLTQ1cHg7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgcGFkZGluZzogMCAxNXB4O1xyXG4gIC8qIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudCgjZTVlNWU1LCAjZTVlNWU1NjIpOyAqL1xyXG59XHJcbjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfb3BlbkJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfY3JlYXRlVGV4dFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLTyxNQUFNLHFCQUFxQjtBQUFBLEVBQ2hDLFVBQVU7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULFdBQVcsT0FBSztBQUFBLE1BQ2Q7QUFBQSxNQUFhO0FBQUEsTUFDYjtBQUFBLE1BQWdCO0FBQUEsTUFDaEI7QUFBQSxNQUFPO0FBQUEsTUFBUztBQUFBLE1BQVU7QUFBQSxJQUNoQyxFQUFNLFNBQVMsQ0FBQztBQUFBLEVBQ2I7QUFBQSxFQUNELFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFdBQVcsT0FBSyxFQUFFLFdBQVc7QUFBQSxFQUM5QjtBQUFBLEVBQ0QsUUFBUTtBQUNWO0FBRWUsU0FBQSxnQkFBWTtBQUN6QixRQUFNLEVBQUUsT0FBTyxPQUFPLEVBQUUsR0FBSSxFQUFBLElBQUssbUJBQW9CO0FBRXJELFFBQU0sVUFBVSxPQUFPLFdBQVcsYUFBYTtBQUMvQyxNQUFJLFlBQVksZUFBZTtBQUM3QixZQUFRLE1BQU0sMENBQTBDO0FBQ3hELFdBQU87QUFBQSxFQUNSO0FBRUQsUUFBTSxTQUFTLFNBQVMsTUFBTTtBQUM1QixVQUFNLE1BQU0sTUFBTTtBQUVsQixXQUFPO0FBQUEsTUFDTCxLQUFLLElBQUksUUFBUSxLQUFLLElBQUk7QUFBQSxNQUMxQixPQUFPLElBQUksUUFBUSxPQUFPLElBQUk7QUFBQSxNQUM5QixRQUFRLElBQUksUUFBUSxRQUFRLElBQUk7QUFBQSxNQUNoQyxNQUFNLElBQUksUUFBUSxNQUFNLElBQUk7QUFBQSxNQUM1QixVQUFVLFFBQVEsU0FBUyxRQUFRO0FBQUEsTUFDbkMsWUFBWSxRQUFRLFVBQVUsUUFBUTtBQUFBLElBQ3ZDO0FB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
