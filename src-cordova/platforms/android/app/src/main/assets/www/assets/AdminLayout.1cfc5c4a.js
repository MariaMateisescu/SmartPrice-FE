import { _ as _export_sfc, ac as defineComponent, bA as useUserStore, bB as useDashHeaderStore, o as openBlock, a2 as createBlock, b5 as withCtx, aL as resolveComponent, aa as createVNode, bC as QIcon, a3 as createCommentVNode, a9 as createTextVNode, M as toDisplayString, c as createElementBlock, bE as QBtn, b7 as withDirectives } from "./index.404ce4fc.js";
import { Q as QToolbar, a as QToolbarTitle, b as QHeader } from "./QHeader.4201ca14.js";
import { Q as QItem, a as QItemSection } from "./QItem.9f28e6fb.js";
import { Q as QSeparator } from "./QSeparator.cfe50c1e.js";
import { Q as QList } from "./QList.7cb8c5cd.js";
import { Q as QMenu } from "./QMenu.d71314a5.js";
import { Q as QLayout, a as QPageContainer } from "./QLayout.47156dd8.js";
import { C as ClosePopup } from "./ClosePopup.7842916c.js";
import "./QResizeObserver.8c33f6fd.js";
import "./use-dark.efa419b2.js";
import "./selection.663e88ad.js";
import "./use-timeout.219926c0.js";
import "./focus-manager.d00a4595.js";
import "./QScrollObserver.0dc0c385.js";
var AdminLayout_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "AdminLayout",
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
    },
    goToAdministration() {
      this.$router.push("/administration/markets");
    }
  }
});
const _hoisted_1 = { key: 1 };
const _hoisted_2 = {
  key: 2,
  class: "auth-buttons"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, { view: "lHh Lpr lFf" }, {
    default: withCtx(() => [
      createVNode(QHeader, {
        elevated: "",
        class: "header"
      }, {
        default: withCtx(() => [
          createVNode(QToolbar, { style: { "justify-content": "space-between" } }, {
            default: withCtx(() => [
              _ctx.dashHeader.showBackIcon ? (openBlock(), createBlock(QIcon, {
                key: 0,
                name: "arrow_back_ios",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.go(-1)),
                style: { "margin-left": "10px", "font-size": "25px" }
              })) : createCommentVNode("", true),
              createVNode(QToolbarTitle, { class: "title" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.dashHeader.title), 1)
                ]),
                _: 1
              }),
              _ctx.userStore.authUser ? (openBlock(), createElementBlock("div", _hoisted_1, [
                createVNode(QBtn, { icon: "manage_accounts" }, {
                  default: withCtx(() => [
                    createVNode(QMenu, { offset: [0, 10] }, {
                      default: withCtx(() => [
                        createVNode(QList, { style: { "min-width": "100px" } }, {
                          default: withCtx(() => [
                            withDirectives((openBlock(), createBlock(QItem, {
                              padding: "none",
                              clickable: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [
                                    _ctx.userStore.authUser && _ctx.userStore.authUser.role === "admin" ? (openBlock(), createBlock(QBtn, {
                                      key: 0,
                                      style: { "color": "#267378" },
                                      padding: "none",
                                      flat: "",
                                      onClick: _ctx.goToAdministration
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Administration")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })), [
                              [ClosePopup]
                            ]),
                            createVNode(QSeparator),
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
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true),
              !_ctx.userStore.authUser ? (openBlock(), createElementBlock("div", _hoisted_2, [
                createVNode(QBtn, {
                  color: "white",
                  "text-color": "black",
                  label: "Login",
                  to: "/login"
                }),
                createVNode(QBtn, {
                  color: "white",
                  "text-color": "black",
                  label: "Sign Up",
                  to: "/signup"
                })
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          createVNode(_component_router_view)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var AdminLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-807a1d14"], ["__file", "AdminLayout.vue"]]);
export { AdminLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5MYXlvdXQuMWNmYzVjNGEuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXRzL0FkbWluTGF5b3V0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPHEtbGF5b3V0IHZpZXc9XCJsSGggTHByIGxGZlwiPlxyXG4gICAgPHEtaGVhZGVyIGVsZXZhdGVkIGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICAgIDxxLXRvb2xiYXIgc3R5bGU9XCJqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW5cIj5cclxuICAgICAgICA8cS1pY29uXHJcbiAgICAgICAgICB2LWlmPVwiZGFzaEhlYWRlci5zaG93QmFja0ljb25cIlxyXG4gICAgICAgICAgbmFtZT1cImFycm93X2JhY2tfaW9zXCJcclxuICAgICAgICAgIEBjbGljaz1cIiRyb3V0ZXIuZ28oLTEpXCJcclxuICAgICAgICAgIHN0eWxlPVwibWFyZ2luLWxlZnQ6IDEwcHg7IGZvbnQtc2l6ZTogMjVweFwiXHJcbiAgICAgICAgPjwvcS1pY29uPlxyXG4gICAgICAgIDxxLXRvb2xiYXItdGl0bGUgY2xhc3M9XCJ0aXRsZVwiPnt7IGRhc2hIZWFkZXIudGl0bGUgfX08L3EtdG9vbGJhci10aXRsZT5cclxuICAgICAgICA8ZGl2IHYtaWY9XCJ1c2VyU3RvcmUuYXV0aFVzZXJcIj5cclxuICAgICAgICAgIDxxLWJ0biBpY29uPVwibWFuYWdlX2FjY291bnRzXCI+XHJcbiAgICAgICAgICAgIDxxLW1lbnUgOm9mZnNldD1cIlswLCAxMF1cIj5cclxuICAgICAgICAgICAgICA8cS1saXN0IHN0eWxlPVwibWluLXdpZHRoOiAxMDBweFwiPlxyXG4gICAgICAgICAgICAgICAgPHEtaXRlbSBwYWRkaW5nPVwibm9uZVwiIGNsaWNrYWJsZSB2LWNsb3NlLXBvcHVwPlxyXG4gICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJTdG9yZS5hdXRoVXNlciAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyU3RvcmUuYXV0aFVzZXIucm9sZSA9PT0gJ2FkbWluJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwiY29sb3I6ICMyNjczNzhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZz1cIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgZmxhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwiZ29Ub0FkbWluaXN0cmF0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgID5BZG1pbmlzdHJhdGlvbjwvcS1idG5cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICA8L3EtaXRlbT5cclxuICAgICAgICAgICAgICAgIDxxLXNlcGFyYXRvciAvPlxyXG4gICAgICAgICAgICAgICAgPHEtaXRlbSBjbGlja2FibGUgdi1jbG9zZS1wb3B1cD5cclxuICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJjb2xvcjogIzI2NzM3OFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBmbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nPVwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJsb2dvdXRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgPkxvZ291dDwvcS1idG5cclxuICAgICAgICAgICAgICAgICAgICA+PC9xLWl0ZW0tc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8L3EtaXRlbT5cclxuICAgICAgICAgICAgICA8L3EtbGlzdD5cclxuICAgICAgICAgICAgPC9xLW1lbnU+XHJcbiAgICAgICAgICA8L3EtYnRuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhdXRoLWJ1dHRvbnNcIiB2LWlmPVwiIXVzZXJTdG9yZS5hdXRoVXNlclwiPlxyXG4gICAgICAgICAgPHEtYnRuIGNvbG9yPVwid2hpdGVcIiB0ZXh0LWNvbG9yPVwiYmxhY2tcIiBsYWJlbD1cIkxvZ2luXCIgdG89XCIvbG9naW5cIiAvPlxyXG4gICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgIGNvbG9yPVwid2hpdGVcIlxyXG4gICAgICAgICAgICB0ZXh0LWNvbG9yPVwiYmxhY2tcIlxyXG4gICAgICAgICAgICBsYWJlbD1cIlNpZ24gVXBcIlxyXG4gICAgICAgICAgICB0bz1cIi9zaWdudXBcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9xLXRvb2xiYXI+XHJcbiAgICA8L3EtaGVhZGVyPlxyXG4gICAgPHEtcGFnZS1jb250YWluZXI+XHJcbiAgICAgIDxyb3V0ZXItdmlldyAvPlxyXG4gICAgPC9xLXBhZ2UtY29udGFpbmVyPlxyXG4gIDwvcS1sYXlvdXQ+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBkZWZpbmVDb21wb25lbnQgfSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCB7IHVzZVVzZXJTdG9yZSB9IGZyb20gXCIuLi9zdG9yZXMvVXNlclN0b3JlXCI7XHJcbmltcG9ydCB7IHVzZURhc2hIZWFkZXJTdG9yZSB9IGZyb20gXCIuLi9zdG9yZXMvZGFzaC1oZWFkZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XHJcbiAgbmFtZTogXCJBZG1pbkxheW91dFwiLFxyXG5cclxuICBzZXR1cCgpIHtcclxuICAgIGNvbnN0IHVzZXJTdG9yZSA9IHVzZVVzZXJTdG9yZSgpO1xyXG4gICAgY29uc3QgZGFzaEhlYWRlciA9IHVzZURhc2hIZWFkZXJTdG9yZSgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdXNlclN0b3JlLFxyXG4gICAgICBkYXNoSGVhZGVyLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGxvZ291dCgpIHtcclxuICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgIHRoaXMuJHJvdXRlci5nbygpO1xyXG4gICAgfSxcclxuICAgIGdvVG9BZG1pbmlzdHJhdGlvbigpIHtcclxuICAgICAgdGhpcy4kcm91dGVyLnB1c2goXCIvYWRtaW5pc3RyYXRpb24vbWFya2V0c1wiKTtcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLmF1dGgtYnV0dG9ucyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDIwcHg7XHJcbn1cclxuLnRpdGxlIHtcclxuICBtYXgtd2lkdGg6IGZpdC1jb250ZW50O1xyXG59XHJcblxyXG4uaGVhZGVyIHtcclxuICBiYWNrZ3JvdW5kOiAjMjY3Mzc4O1xyXG4gIGhlaWdodDogNTBweDtcclxuICBib3gtc2hhZG93OiAwcHggMTBweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XHJcbn1cclxuPC9zdHlsZT5cclxuIl0sIm5hbWVzIjpbIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9vcGVuQmxvY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQW9FQSxNQUFLLFlBQWEsZ0JBQWE7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixRQUFRO0FBQ04sVUFBTSxZQUFZO0FBQ2xCLFVBQU0sYUFBYTtBQUNuQixXQUFPO0FBQUEsTUFD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
