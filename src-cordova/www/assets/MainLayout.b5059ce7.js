import { bt as createComponent, bu as useRouterLinkProps, bv as useRouterLink, a1 as computed, b0 as watch, bw as emptyRenderFn, y as ref, bx as isRuntimeSsrPreHydration, av as onBeforeUnmount, by as hMergeSlot, ak as h, an as inject, ah as getCurrentInstance, bz as layoutKey, _ as _export_sfc, ac as defineComponent, bA as useUserStore, bB as useDashHeaderStore, o as openBlock, a2 as createBlock, b5 as withCtx, aL as resolveComponent, aa as createVNode, bC as QIcon, a3 as createCommentVNode, a9 as createTextVNode, M as toDisplayString, c as createElementBlock, bD as QAvatar, b7 as withDirectives, bE as QBtn } from "./index.404ce4fc.js";
import { Q as QToolbar, a as QToolbarTitle, b as QHeader } from "./QHeader.4201ca14.js";
import { Q as QItem, a as QItemSection } from "./QItem.9f28e6fb.js";
import { Q as QList } from "./QList.7cb8c5cd.js";
import { Q as QMenu } from "./QMenu.d71314a5.js";
import { u as useTabProps, a as useTabEmits, b as useTab, Q as QTabs } from "./QTabs.b8138d58.js";
import { Q as QResizeObserver } from "./QResizeObserver.8c33f6fd.js";
import { Q as QLayout, a as QPageContainer } from "./QLayout.47156dd8.js";
import { C as ClosePopup } from "./ClosePopup.7842916c.js";
import "./use-dark.efa419b2.js";
import "./selection.663e88ad.js";
import "./use-timeout.219926c0.js";
import "./focus-manager.d00a4595.js";
import "./uid.7f2d5a47.js";
import "./rtl.8137048b.js";
import "./QScrollObserver.0dc0c385.js";
var QRouteTab = createComponent({
  name: "QRouteTab",
  props: {
    ...useRouterLinkProps,
    ...useTabProps
  },
  emits: useTabEmits,
  setup(props, { slots, emit }) {
    const routeData = useRouterLink({
      useDisableForRouterLinkProps: false
    });
    const { renderTab, $tabs } = useTab(
      props,
      slots,
      emit,
      {
        exact: computed(() => props.exact),
        ...routeData
      }
    );
    watch(() => `${props.name} | ${props.exact} | ${(routeData.resolvedLink.value || {}).href}`, () => {
      $tabs.verifyRouteModel();
    });
    return () => renderTab(routeData.linkTag.value, routeData.linkAttrs.value);
  }
});
var QFooter = createComponent({
  name: "QFooter",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    bordered: Boolean,
    elevated: Boolean,
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  emits: ["reveal", "focusin"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QFooter needs to be child of QLayout");
      return emptyRenderFn;
    }
    const size = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);
    const windowHeight = ref(
      isRuntimeSsrPreHydration.value === true || $layout.isContainer.value === true ? 0 : window.innerHeight
    );
    const fixed = computed(
      () => props.reveal === true || $layout.view.value.indexOf("F") > -1 || $q.platform.is.ios && $layout.isContainer.value === true
    );
    const containerHeight = computed(() => $layout.isContainer.value === true ? $layout.containerHeight.value : windowHeight.value);
    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0;
      }
      if (fixed.value === true) {
        return revealed.value === true ? size.value : 0;
      }
      const offset2 = $layout.scroll.value.position + containerHeight.value + size.value - $layout.height.value;
      return offset2 > 0 ? offset2 : 0;
    });
    const hidden = computed(
      () => props.modelValue !== true || fixed.value === true && revealed.value !== true
    );
    const revealOnFocus = computed(
      () => props.modelValue === true && hidden.value === true && props.reveal === true
    );
    const classes = computed(
      () => "q-footer q-layout__section--marginal " + (fixed.value === true ? "fixed" : "absolute") + "-bottom" + (props.bordered === true ? " q-footer--bordered" : "") + (hidden.value === true ? " q-footer--hidden" : "") + (props.modelValue !== true ? " q-layout--prevent-focus" + (fixed.value !== true ? " hidden" : "") : "")
    );
    const style = computed(() => {
      const view = $layout.rows.value.bottom, css = {};
      if (view[0] === "l" && $layout.left.space === true) {
        css[$q.lang.rtl === true ? "right" : "left"] = `${$layout.left.size}px`;
      }
      if (view[2] === "r" && $layout.right.space === true) {
        css[$q.lang.rtl === true ? "left" : "right"] = `${$layout.right.size}px`;
      }
      return css;
    });
    function updateLayout(prop, val) {
      $layout.update("footer", prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function onResize({ height }) {
      updateLocal(size, height);
      updateLayout("size", height);
    }
    function updateRevealed() {
      if (props.reveal !== true) {
        return;
      }
      const { direction, position, inflectionPoint } = $layout.scroll.value;
      updateLocal(revealed, direction === "up" || position - inflectionPoint < 100 || $layout.height.value - containerHeight.value - position - size.value < 300);
    }
    function onFocusin(evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }
      emit("focusin", evt);
    }
    watch(() => props.modelValue, (val) => {
      updateLayout("space", val);
      updateLocal(revealed, true);
      $layout.animate();
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(() => props.reveal, (val) => {
      val === false && updateLocal(revealed, props.modelValue);
    });
    watch(revealed, (val) => {
      $layout.animate();
      emit("reveal", val);
    });
    watch([size, $layout.scroll, $layout.height], updateRevealed);
    watch(() => $q.screen.height, (val) => {
      $layout.isContainer.value !== true && updateLocal(windowHeight, val);
    });
    const instance = {};
    $layout.instances.footer = instance;
    props.modelValue === true && updateLayout("size", size.value);
    updateLayout("space", props.modelValue);
    updateLayout("offset", offset.value);
    onBeforeUnmount(() => {
      if ($layout.instances.footer === instance) {
        $layout.instances.footer = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = hMergeSlot(slots.default, [
        h(QResizeObserver, {
          debounce: 0,
          onResize
        })
      ]);
      props.elevated === true && child.push(
        h("div", {
          class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
        })
      );
      return h("footer", {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child);
    };
  }
});
var MainLayout_vue_vue_type_style_index_0_scoped_true_lang = "";
var MainLayout_vue_vue_type_style_index_1_lang = "";
const _sfc_main = defineComponent({
  name: "MainLayout",
  setup() {
    const userStore = useUserStore();
    const dashHeader = useDashHeaderStore();
    return {
      userStore,
      dashHeader
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.go();
    }
  }
});
const _hoisted_1 = { key: 2 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, { view: "lHh Lpr lFf" }, {
    default: withCtx(() => [
      createVNode(QHeader, {
        elevated: "",
        class: "header"
      }, {
        default: withCtx(() => [
          createVNode(QToolbar, null, {
            default: withCtx(() => [
              _ctx.dashHeader.showBackIcon && !_ctx.dashHeader.backIconTo ? (openBlock(), createBlock(QIcon, {
                key: 0,
                name: "arrow_back_ios",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.go(-1)),
                style: { "margin-left": "10px", "font-size": "25px" }
              })) : createCommentVNode("", true),
              _ctx.dashHeader.showBackIcon && _ctx.dashHeader.backIconTo ? (openBlock(), createBlock(QIcon, {
                key: 1,
                name: "arrow_back_ios",
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$router.push(`${_ctx.dashHeader.backIconTo}`)),
                style: { "margin-left": "10px", "font-size": "25px" }
              })) : createCommentVNode("", true),
              createVNode(QToolbarTitle, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.dashHeader.title), 1)
                ]),
                _: 1
              }),
              _ctx.userStore.authUser ? (openBlock(), createElementBlock("div", _hoisted_1, [
                createVNode(QAvatar, {
                  color: "brown-3",
                  "text-color": "white"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.userStore.authUser.name[0]), 1)
                  ]),
                  _: 1
                }),
                createVNode(QMenu, { offset: [0, 10] }, {
                  default: withCtx(() => [
                    createVNode(QList, { style: { "min-width": "100px" } }, {
                      default: withCtx(() => [
                        withDirectives((openBlock(), createBlock(QItem, { clickable: "" }, {
                          default: withCtx(() => [
                            createVNode(QItemSection, null, {
                              default: withCtx(() => [
                                createVNode(QBtn, {
                                  style: { "color": "#267378" },
                                  flat: "",
                                  padding: "none",
                                  onClick: _ctx.logout
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Logout")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })), [
                          [ClosePopup]
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QFooter, {
        bordered: "",
        class: "bg-white text-primary"
      }, {
        default: withCtx(() => [
          createVNode(QTabs, {
            "no-caps": "",
            "active-color": "white",
            class: "text-white shadow-2",
            style: { "background-color": "#267378" },
            align: "justify"
          }, {
            default: withCtx(() => [
              createVNode(QRouteTab, {
                style: { "background-color": "#267378", "color": "#fff" },
                name: "map",
                icon: "map",
                to: "/",
                exact: ""
              }),
              createVNode(QRouteTab, {
                style: { "background-color": "#267378", "color": "#fff" },
                name: "inspo",
                icon: "menu_book",
                to: "/inspiration",
                exact: ""
              }),
              createVNode(QRouteTab, {
                style: { "background-color": "#267378", "color": "#fff" },
                name: "cart",
                icon: "shopping_basket",
                to: "/shopping",
                exact: ""
              }),
              createVNode(QRouteTab, {
                style: { "background-color": "#267378", "color": "#fff" },
                name: "insights",
                icon: "bar_chart",
                to: "/insights",
                exact: ""
              }),
              createVNode(QRouteTab, {
                style: { "background-color": "#267378", "color": "#fff" },
                name: "account",
                icon: "person",
                to: "/profile",
                exact: ""
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QPageContainer, { class: "q-page-container__style" }, {
        default: withCtx(() => [
          createVNode(_component_router_view)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5d4b92d2"], ["__file", "MainLayout.vue"]]);
export { MainLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkxheW91dC5iNTA1OWNlNy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWJzL1FSb3V0ZVRhYi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvZm9vdGVyL1FGb290ZXIuanMiLCIuLi8uLi8uLi9zcmMvbGF5b3V0cy9NYWluTGF5b3V0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wdXRlZCwgd2F0Y2ggfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VSb3V0ZXJMaW5rLCB7IHVzZVJvdXRlckxpbmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJvdXRlci1saW5rLmpzJ1xuaW1wb3J0IHVzZVRhYiwgeyB1c2VUYWJQcm9wcywgdXNlVGFiRW1pdHMgfSBmcm9tICcuL3VzZS10YWIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVJvdXRlVGFiJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVJvdXRlckxpbmtQcm9wcyxcbiAgICAuLi51c2VUYWJQcm9wc1xuICB9LFxuXG4gIGVtaXRzOiB1c2VUYWJFbWl0cyxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHJvdXRlRGF0YSA9IHVzZVJvdXRlckxpbmsoe1xuICAgICAgdXNlRGlzYWJsZUZvclJvdXRlckxpbmtQcm9wczogZmFsc2VcbiAgICB9KVxuXG4gICAgY29uc3QgeyByZW5kZXJUYWIsICR0YWJzIH0gPSB1c2VUYWIoXG4gICAgICBwcm9wcyxcbiAgICAgIHNsb3RzLFxuICAgICAgZW1pdCxcbiAgICAgIHtcbiAgICAgICAgZXhhY3Q6IGNvbXB1dGVkKCgpID0+IHByb3BzLmV4YWN0KSxcbiAgICAgICAgLi4ucm91dGVEYXRhXG4gICAgICB9XG4gICAgKVxuXG4gICAgd2F0Y2goKCkgPT4gYCR7IHByb3BzLm5hbWUgfSB8ICR7IHByb3BzLmV4YWN0IH0gfCAkeyAocm91dGVEYXRhLnJlc29sdmVkTGluay52YWx1ZSB8fCB7fSkuaHJlZiB9YCwgKCkgPT4ge1xuICAgICAgJHRhYnMudmVyaWZ5Um91dGVNb2RlbCgpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiByZW5kZXJUYWIocm91dGVEYXRhLmxpbmtUYWcudmFsdWUsIHJvdXRlRGF0YS5saW5rQXR0cnMudmFsdWUpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBpbmplY3QsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uIH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxuaW1wb3J0IFFSZXNpemVPYnNlcnZlciBmcm9tICcuLi9yZXNpemUtb2JzZXJ2ZXIvUVJlc2l6ZU9ic2VydmVyLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGxheW91dEtleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FGb290ZXInLFxuXG4gIHByb3BzOiB7XG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIHJldmVhbDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBlbGV2YXRlZDogQm9vbGVhbixcblxuICAgIGhlaWdodEhpbnQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDUwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdyZXZlYWwnLCAnZm9jdXNpbicgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkbGF5b3V0ID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRRm9vdGVyIG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCBzaXplID0gcmVmKHBhcnNlSW50KHByb3BzLmhlaWdodEhpbnQsIDEwKSlcbiAgICBjb25zdCByZXZlYWxlZCA9IHJlZih0cnVlKVxuICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHJlZihcbiAgICAgIGlzUnVudGltZVNzclByZUh5ZHJhdGlvbi52YWx1ZSA9PT0gdHJ1ZSB8fCAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gMFxuICAgICAgICA6IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIClcblxuICAgIGNvbnN0IGZpeGVkID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLnJldmVhbCA9PT0gdHJ1ZVxuICAgICAgfHwgJGxheW91dC52aWV3LnZhbHVlLmluZGV4T2YoJ0YnKSA+IC0xXG4gICAgICB8fCAoJHEucGxhdGZvcm0uaXMuaW9zICYmICRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgPT09IHRydWUpXG4gICAgKVxuXG4gICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICRsYXlvdXQuY29udGFpbmVySGVpZ2h0LnZhbHVlXG4gICAgICAgIDogd2luZG93SGVpZ2h0LnZhbHVlXG4gICAgKSlcblxuICAgIGNvbnN0IG9mZnNldCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgICB9XG4gICAgICBpZiAoZml4ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHJldmVhbGVkLnZhbHVlID09PSB0cnVlID8gc2l6ZS52YWx1ZSA6IDBcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9mZnNldCA9ICRsYXlvdXQuc2Nyb2xsLnZhbHVlLnBvc2l0aW9uICsgY29udGFpbmVySGVpZ2h0LnZhbHVlICsgc2l6ZS52YWx1ZSAtICRsYXlvdXQuaGVpZ2h0LnZhbHVlXG4gICAgICByZXR1cm4gb2Zmc2V0ID4gMCA/IG9mZnNldCA6IDBcbiAgICB9KVxuXG4gICAgY29uc3QgaGlkZGVuID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm1vZGVsVmFsdWUgIT09IHRydWUgfHwgKGZpeGVkLnZhbHVlID09PSB0cnVlICYmIHJldmVhbGVkLnZhbHVlICE9PSB0cnVlKVxuICAgIClcblxuICAgIGNvbnN0IHJldmVhbE9uRm9jdXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMubW9kZWxWYWx1ZSA9PT0gdHJ1ZSAmJiBoaWRkZW4udmFsdWUgPT09IHRydWUgJiYgcHJvcHMucmV2ZWFsID09PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1mb290ZXIgcS1sYXlvdXRfX3NlY3Rpb24tLW1hcmdpbmFsICdcbiAgICAgICsgKGZpeGVkLnZhbHVlID09PSB0cnVlID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZScpICsgJy1ib3R0b20nXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1mb290ZXItLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAoaGlkZGVuLnZhbHVlID09PSB0cnVlID8gJyBxLWZvb3Rlci0taGlkZGVuJyA6ICcnKVxuICAgICAgKyAoXG4gICAgICAgIHByb3BzLm1vZGVsVmFsdWUgIT09IHRydWVcbiAgICAgICAgICA/ICcgcS1sYXlvdXQtLXByZXZlbnQtZm9jdXMnICsgKGZpeGVkLnZhbHVlICE9PSB0cnVlID8gJyBoaWRkZW4nIDogJycpXG4gICAgICAgICAgOiAnJ1xuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3RcbiAgICAgICAgdmlldyA9ICRsYXlvdXQucm93cy52YWx1ZS5ib3R0b20sXG4gICAgICAgIGNzcyA9IHt9XG5cbiAgICAgIGlmICh2aWV3WyAwIF0gPT09ICdsJyAmJiAkbGF5b3V0LmxlZnQuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcgXSA9IGAkeyAkbGF5b3V0LmxlZnQuc2l6ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAodmlld1sgMiBdID09PSAncicgJiYgJGxheW91dC5yaWdodC5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3NbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ2xlZnQnIDogJ3JpZ2h0JyBdID0gYCR7ICRsYXlvdXQucmlnaHQuc2l6ZSB9cHhgXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjc3NcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTGF5b3V0IChwcm9wLCB2YWwpIHtcbiAgICAgICRsYXlvdXQudXBkYXRlKCdmb290ZXInLCBwcm9wLCB2YWwpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWwgKHByb3AsIHZhbCkge1xuICAgICAgaWYgKHByb3AudmFsdWUgIT09IHZhbCkge1xuICAgICAgICBwcm9wLnZhbHVlID0gdmFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZXNpemUgKHsgaGVpZ2h0IH0pIHtcbiAgICAgIHVwZGF0ZUxvY2FsKHNpemUsIGhlaWdodClcbiAgICAgIHVwZGF0ZUxheW91dCgnc2l6ZScsIGhlaWdodClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVSZXZlYWxlZCAoKSB7XG4gICAgICBpZiAocHJvcHMucmV2ZWFsICE9PSB0cnVlKSB7IHJldHVybiB9XG5cbiAgICAgIGNvbnN0IHsgZGlyZWN0aW9uLCBwb3NpdGlvbiwgaW5mbGVjdGlvblBvaW50IH0gPSAkbGF5b3V0LnNjcm9sbC52YWx1ZVxuXG4gICAgICB1cGRhdGVMb2NhbChyZXZlYWxlZCwgKFxuICAgICAgICBkaXJlY3Rpb24gPT09ICd1cCdcbiAgICAgICAgfHwgcG9zaXRpb24gLSBpbmZsZWN0aW9uUG9pbnQgPCAxMDBcbiAgICAgICAgfHwgJGxheW91dC5oZWlnaHQudmFsdWUgLSBjb250YWluZXJIZWlnaHQudmFsdWUgLSBwb3NpdGlvbiAtIHNpemUudmFsdWUgPCAzMDBcbiAgICAgICkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c2luIChldnQpIHtcbiAgICAgIGlmIChyZXZlYWxPbkZvY3VzLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZUxvY2FsKHJldmVhbGVkLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdmb2N1c2luJywgZXZ0KVxuICAgIH1cblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsIHZhbCA9PiB7XG4gICAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgdmFsKVxuICAgICAgdXBkYXRlTG9jYWwocmV2ZWFsZWQsIHRydWUpXG4gICAgICAkbGF5b3V0LmFuaW1hdGUoKVxuICAgIH0pXG5cbiAgICB3YXRjaChvZmZzZXQsIHZhbCA9PiB7XG4gICAgICB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIHZhbClcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMucmV2ZWFsLCB2YWwgPT4ge1xuICAgICAgdmFsID09PSBmYWxzZSAmJiB1cGRhdGVMb2NhbChyZXZlYWxlZCwgcHJvcHMubW9kZWxWYWx1ZSlcbiAgICB9KVxuXG4gICAgd2F0Y2gocmV2ZWFsZWQsIHZhbCA9PiB7XG4gICAgICAkbGF5b3V0LmFuaW1hdGUoKVxuICAgICAgZW1pdCgncmV2ZWFsJywgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaChbIHNpemUsICRsYXlvdXQuc2Nyb2xsLCAkbGF5b3V0LmhlaWdodCBdLCB1cGRhdGVSZXZlYWxlZClcblxuICAgIHdhdGNoKCgpID0+ICRxLnNjcmVlbi5oZWlnaHQsIHZhbCA9PiB7XG4gICAgICAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlICE9PSB0cnVlICYmIHVwZGF0ZUxvY2FsKHdpbmRvd0hlaWdodCwgdmFsKVxuICAgIH0pXG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IHt9XG5cbiAgICAkbGF5b3V0Lmluc3RhbmNlcy5mb290ZXIgPSBpbnN0YW5jZVxuICAgIHByb3BzLm1vZGVsVmFsdWUgPT09IHRydWUgJiYgdXBkYXRlTGF5b3V0KCdzaXplJywgc2l6ZS52YWx1ZSlcbiAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgcHJvcHMubW9kZWxWYWx1ZSlcbiAgICB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIG9mZnNldC52YWx1ZSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBpZiAoJGxheW91dC5pbnN0YW5jZXMuZm9vdGVyID09PSBpbnN0YW5jZSkge1xuICAgICAgICAkbGF5b3V0Lmluc3RhbmNlcy5mb290ZXIgPSB2b2lkIDBcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdzaXplJywgMClcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCAwKVxuICAgICAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgZmFsc2UpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW1xuICAgICAgICBoKFFSZXNpemVPYnNlcnZlciwge1xuICAgICAgICAgIGRlYm91bmNlOiAwLFxuICAgICAgICAgIG9uUmVzaXplXG4gICAgICAgIH0pXG4gICAgICBdKVxuXG4gICAgICBwcm9wcy5lbGV2YXRlZCA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWxheW91dF9fc2hhZG93IGFic29sdXRlLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZm9vdGVyJywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgICBvbkZvY3VzaW5cbiAgICAgIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtbGF5b3V0IHZpZXc9XCJsSGggTHByIGxGZlwiPlxuICAgIDxxLWhlYWRlciBlbGV2YXRlZCBjbGFzcz1cImhlYWRlclwiPlxuICAgICAgPHEtdG9vbGJhcj5cbiAgICAgICAgPHEtaWNvblxuICAgICAgICAgIHYtaWY9XCJkYXNoSGVhZGVyLnNob3dCYWNrSWNvbiAmJiAhZGFzaEhlYWRlci5iYWNrSWNvblRvXCJcbiAgICAgICAgICBuYW1lPVwiYXJyb3dfYmFja19pb3NcIlxuICAgICAgICAgIEBjbGljaz1cIiRyb3V0ZXIuZ28oLTEpXCJcbiAgICAgICAgICBzdHlsZT1cIm1hcmdpbi1sZWZ0OiAxMHB4OyBmb250LXNpemU6IDI1cHhcIlxuICAgICAgICA+PC9xLWljb24+XG4gICAgICAgIDxxLWljb25cbiAgICAgICAgICB2LWlmPVwiZGFzaEhlYWRlci5zaG93QmFja0ljb24gJiYgZGFzaEhlYWRlci5iYWNrSWNvblRvXCJcbiAgICAgICAgICBuYW1lPVwiYXJyb3dfYmFja19pb3NcIlxuICAgICAgICAgIEBjbGljaz1cIiRyb3V0ZXIucHVzaChgJHtkYXNoSGVhZGVyLmJhY2tJY29uVG99YClcIlxuICAgICAgICAgIHN0eWxlPVwibWFyZ2luLWxlZnQ6IDEwcHg7IGZvbnQtc2l6ZTogMjVweFwiXG4gICAgICAgID48L3EtaWNvbj5cbiAgICAgICAgPHEtdG9vbGJhci10aXRsZT57eyBkYXNoSGVhZGVyLnRpdGxlIH19PC9xLXRvb2xiYXItdGl0bGU+XG4gICAgICAgIDxkaXYgdi1pZj1cInVzZXJTdG9yZS5hdXRoVXNlclwiPlxuICAgICAgICAgIDxxLWF2YXRhciBjb2xvcj1cImJyb3duLTNcIiB0ZXh0LWNvbG9yPVwid2hpdGVcIj57e1xuICAgICAgICAgICAgdXNlclN0b3JlLmF1dGhVc2VyLm5hbWVbMF1cbiAgICAgICAgICB9fTwvcS1hdmF0YXI+XG4gICAgICAgICAgPHEtbWVudSA6b2Zmc2V0PVwiWzAsIDEwXVwiPlxuICAgICAgICAgICAgPHEtbGlzdCBzdHlsZT1cIm1pbi13aWR0aDogMTAwcHhcIj5cbiAgICAgICAgICAgICAgPHEtaXRlbSBjbGlja2FibGUgdi1jbG9zZS1wb3B1cD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJjb2xvcjogIzI2NzM3OFwiXG4gICAgICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZz1cIm5vbmVcIlxuICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJsb2dvdXRcIlxuICAgICAgICAgICAgICAgICAgICA+TG9nb3V0PC9xLWJ0blxuICAgICAgICAgICAgICAgICAgPjwvcS1pdGVtLXNlY3Rpb25cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgICAgPC9xLW1lbnU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLXRvb2xiYXI+XG4gICAgPC9xLWhlYWRlcj5cbiAgICA8cS1mb290ZXIgYm9yZGVyZWQgY2xhc3M9XCJiZy13aGl0ZSB0ZXh0LXByaW1hcnlcIj5cbiAgICAgIDxxLXRhYnNcbiAgICAgICAgbm8tY2Fwc1xuICAgICAgICBhY3RpdmUtY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgIGNsYXNzPVwidGV4dC13aGl0ZSBzaGFkb3ctMlwiXG4gICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzI2NzM3OFwiXG4gICAgICAgIGFsaWduPVwianVzdGlmeVwiXG4gICAgICA+XG4gICAgICAgIDxxLXJvdXRlLXRhYlxuICAgICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzI2NzM3ODsgY29sb3I6ICNmZmZcIlxuICAgICAgICAgIG5hbWU9XCJtYXBcIlxuICAgICAgICAgIGljb249XCJtYXBcIlxuICAgICAgICAgIHRvPVwiL1wiXG4gICAgICAgICAgZXhhY3RcbiAgICAgICAgLz5cbiAgICAgICAgPHEtcm91dGUtdGFiXG4gICAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMjY3Mzc4OyBjb2xvcjogI2ZmZlwiXG4gICAgICAgICAgbmFtZT1cImluc3BvXCJcbiAgICAgICAgICBpY29uPVwibWVudV9ib29rXCJcbiAgICAgICAgICB0bz1cIi9pbnNwaXJhdGlvblwiXG4gICAgICAgICAgZXhhY3RcbiAgICAgICAgLz5cbiAgICAgICAgPHEtcm91dGUtdGFiXG4gICAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMjY3Mzc4OyBjb2xvcjogI2ZmZlwiXG4gICAgICAgICAgbmFtZT1cImNhcnRcIlxuICAgICAgICAgIGljb249XCJzaG9wcGluZ19iYXNrZXRcIlxuICAgICAgICAgIHRvPVwiL3Nob3BwaW5nXCJcbiAgICAgICAgICBleGFjdFxuICAgICAgICAvPlxuICAgICAgICA8cS1yb3V0ZS10YWJcbiAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICMyNjczNzg7IGNvbG9yOiAjZmZmXCJcbiAgICAgICAgICBuYW1lPVwiaW5zaWdodHNcIlxuICAgICAgICAgIGljb249XCJiYXJfY2hhcnRcIlxuICAgICAgICAgIHRvPVwiL2luc2lnaHRzXCJcbiAgICAgICAgICBleGFjdFxuICAgICAgICAvPlxuICAgICAgICA8cS1yb3V0ZS10YWJcbiAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICMyNjczNzg7IGNvbG9yOiAjZmZmXCJcbiAgICAgICAgICBuYW1lPVwiYWNjb3VudFwiXG4gICAgICAgICAgaWNvbj1cInBlcnNvblwiXG4gICAgICAgICAgdG89XCIvcHJvZmlsZVwiXG4gICAgICAgICAgZXhhY3RcbiAgICAgICAgLz5cbiAgICAgIDwvcS10YWJzPlxuICAgIDwvcS1mb290ZXI+XG4gICAgPHEtcGFnZS1jb250YWluZXIgY2xhc3M9XCJxLXBhZ2UtY29udGFpbmVyX19zdHlsZVwiPlxuICAgICAgPHJvdXRlci12aWV3IC8+XG4gICAgPC9xLXBhZ2UtY29udGFpbmVyPlxuICA8L3EtbGF5b3V0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IGRlZmluZUNvbXBvbmVudCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZVVzZXJTdG9yZSB9IGZyb20gXCIuLi9zdG9yZXMvVXNlclN0b3JlXCI7XG5pbXBvcnQgeyB1c2VEYXNoSGVhZGVyU3RvcmUgfSBmcm9tIFwiLi4vc3RvcmVzL2Rhc2gtaGVhZGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XG4gIG5hbWU6IFwiTWFpbkxheW91dFwiLFxuICBzZXR1cCgpIHtcbiAgICBjb25zdCB1c2VyU3RvcmUgPSB1c2VVc2VyU3RvcmUoKTtcbiAgICBjb25zdCBkYXNoSGVhZGVyID0gdXNlRGFzaEhlYWRlclN0b3JlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJTdG9yZSxcbiAgICAgIGRhc2hIZWFkZXIsXG4gICAgfTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGxvZ291dCgpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgdGhpcy4kcm91dGVyLmdvKCk7XG4gICAgfSxcbiAgfSxcbn0pO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5hdXRoLWJ1dHRvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDIwcHg7XG59XG4ucS1wYWdlLWNvbnRhaW5lcl9fc3R5bGUge1xuICBoZWlnaHQ6IDEwMHZoO1xufVxuLmhlYWRlciB7XG4gIGJhY2tncm91bmQ6ICRicmFuZC1jb2xvcjtcbiAgaGVpZ2h0OiA1MHB4O1xuICBjb2xvcjogI2ZmZjtcbiAgYm94LXNoYWRvdzogMHB4IDEwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xufVxuPC9zdHlsZT5cblxuPHN0eWxlPlxuLnEtdGFiX19pY29uIHtcbiAgZm9udC1zaXplOiAzOHB4ICFpbXBvcnRhbnQ7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIm9mZnNldCIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLElBQUEsWUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsRUFDSjtBQUFBLEVBRUQsT0FBTztBQUFBLEVBRVAsTUFBTyxPQUFPLEVBQUUsT0FBTyxLQUFJLEdBQUk7QUFDN0IsVUFBTSxZQUFZLGNBQWM7QUFBQSxNQUM5Qiw4QkFBOEI7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
