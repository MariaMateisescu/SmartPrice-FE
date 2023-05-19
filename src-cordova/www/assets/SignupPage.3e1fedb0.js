import { Q as QInput } from "./QInput.79283f08.js";
import { _ as _export_sfc, bA as useUserStore, o as openBlock, c as createElementBlock, a as createBaseVNode, aa as createVNode, b5 as withCtx, bE as QBtn, Q as Fragment, bC as QIcon, aH as pushScopeId, aF as popScopeId } from "./index.404ce4fc.js";
import { _ as _imports_0 } from "./SignUp.eb9627d6.js";
import "./use-dark.efa419b2.js";
import "./uid.7f2d5a47.js";
import "./focus-manager.d00a4595.js";
import "./use-form.74a30394.js";
var SignupPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  name: "SignupPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      isPwd: true,
      isPwdConfirm: true,
      useUser: useUserStore()
    };
  },
  methods: {
    async onSignup() {
      try {
        const data = {
          name: this.name,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm
        };
        const res = await this.$api.post("/users/signup", data);
        if (res.data.status === "success") {
          localStorage.setItem("token", res.data.token);
          this.$router.push("/");
          this.useUser.setUser(res.data.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-391720e9"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "illustration" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    class: "illustration_img",
    src: _imports_0,
    alt: "Signup Illustration"
  })
], -1));
const _hoisted_2 = { class: "signup" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h3", { class: "signup__header" }, "Sign Up", -1));
const _hoisted_4 = { class: "inline-style" };
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, "Already have an account?", -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1,
    createBaseVNode("div", _hoisted_2, [
      _hoisted_3,
      createVNode(QInput, {
        rounded: "",
        outlined: "",
        modelValue: $data.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.name = $event),
        label: "Name"
      }, null, 8, ["modelValue"]),
      createVNode(QInput, {
        rounded: "",
        outlined: "",
        modelValue: $data.email,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.email = $event),
        type: "email",
        label: "Email"
      }, null, 8, ["modelValue"]),
      createVNode(QInput, {
        rounded: "",
        outlined: "",
        modelValue: $data.password,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.password = $event),
        type: $data.isPwd ? "password" : "text",
        label: "Password"
      }, {
        append: withCtx(() => [
          createVNode(QIcon, {
            name: $data.isPwd ? "visibility_off" : "visibility",
            class: "cursor-pointer",
            onClick: _cache[2] || (_cache[2] = ($event) => $data.isPwd = !$data.isPwd)
          }, null, 8, ["name"])
        ]),
        _: 1
      }, 8, ["modelValue", "type"]),
      createVNode(QInput, {
        rounded: "",
        outlined: "",
        modelValue: $data.passwordConfirm,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.passwordConfirm = $event),
        type: $data.isPwdConfirm ? "password" : "text",
        label: "Confirm Password"
      }, {
        append: withCtx(() => [
          createVNode(QIcon, {
            name: $data.isPwdConfirm ? "visibility_off" : "visibility",
            class: "cursor-pointer",
            onClick: _cache[4] || (_cache[4] = ($event) => $data.isPwdConfirm = !$data.isPwdConfirm)
          }, null, 8, ["name"])
        ]),
        _: 1
      }, 8, ["modelValue", "type"]),
      createVNode(QBtn, {
        class: "signup-btn",
        onClick: $options.onSignup,
        label: "Sign Up"
      }, null, 8, ["onClick"]),
      createBaseVNode("div", _hoisted_4, [
        _hoisted_5,
        createVNode(QBtn, {
          class: "login-btn",
          flat: "",
          label: "Log in",
          to: "/login"
        })
      ])
    ])
  ], 64);
}
var SignupPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-391720e9"], ["__file", "SignupPage.vue"]]);
export { SignupPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lnbnVwUGFnZS4zZTFmZWRiMC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2F1dGhlbnRpY2F0aW9uL1NpZ251cFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiaWxsdXN0cmF0aW9uXCI+XHJcbiAgICA8aW1nXHJcbiAgICAgIGNsYXNzPVwiaWxsdXN0cmF0aW9uX2ltZ1wiXHJcbiAgICAgIHNyYz1cIn5hc3NldHMvaWxsdXN0cmF0aW9ucy9TaWduVXAuc3ZnXCJcclxuICAgICAgYWx0PVwiU2lnbnVwIElsbHVzdHJhdGlvblwiXHJcbiAgICAvPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJzaWdudXBcIj5cclxuICAgIDxoMyBjbGFzcz1cInNpZ251cF9faGVhZGVyXCI+U2lnbiBVcDwvaDM+XHJcbiAgICA8cS1pbnB1dCByb3VuZGVkIG91dGxpbmVkIHYtbW9kZWw9XCJuYW1lXCIgbGFiZWw9XCJOYW1lXCIgLz5cclxuICAgIDxxLWlucHV0IHJvdW5kZWQgb3V0bGluZWQgdi1tb2RlbD1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgbGFiZWw9XCJFbWFpbFwiIC8+XHJcbiAgICA8cS1pbnB1dFxyXG4gICAgICByb3VuZGVkXHJcbiAgICAgIG91dGxpbmVkXHJcbiAgICAgIHYtbW9kZWw9XCJwYXNzd29yZFwiXHJcbiAgICAgIDp0eXBlPVwiaXNQd2QgPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgbGFiZWw9XCJQYXNzd29yZFwiXHJcbiAgICA+XHJcbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgIDxxLWljb25cclxuICAgICAgICAgIDpuYW1lPVwiaXNQd2QgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcclxuICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgQGNsaWNrPVwiaXNQd2QgPSAhaXNQd2RcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICA8L3EtaW5wdXQ+XHJcblxyXG4gICAgPHEtaW5wdXRcclxuICAgICAgcm91bmRlZFxyXG4gICAgICBvdXRsaW5lZFxyXG4gICAgICB2LW1vZGVsPVwicGFzc3dvcmRDb25maXJtXCJcclxuICAgICAgOnR5cGU9XCJpc1B3ZENvbmZpcm0gPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgbGFiZWw9XCJDb25maXJtIFBhc3N3b3JkXCJcclxuICAgID5cclxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XHJcbiAgICAgICAgPHEtaWNvblxyXG4gICAgICAgICAgOm5hbWU9XCJpc1B3ZENvbmZpcm0gPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcclxuICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgQGNsaWNrPVwiaXNQd2RDb25maXJtID0gIWlzUHdkQ29uZmlybVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC90ZW1wbGF0ZT5cclxuICAgIDwvcS1pbnB1dD5cclxuICAgIDxxLWJ0biBjbGFzcz1cInNpZ251cC1idG5cIiBAY2xpY2s9XCJvblNpZ251cFwiIGxhYmVsPVwiU2lnbiBVcFwiIC8+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaW5saW5lLXN0eWxlXCI+XHJcbiAgICAgIDxwPkFscmVhZHkgaGF2ZSBhbiBhY2NvdW50PzwvcD5cclxuICAgICAgPHEtYnRuIGNsYXNzPVwibG9naW4tYnRuXCIgZmxhdCBsYWJlbD1cIkxvZyBpblwiIHRvPVwiL2xvZ2luXCIgLz5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgdXNlVXNlclN0b3JlIH0gZnJvbSBcIi4uLy4uL3N0b3Jlcy9Vc2VyU3RvcmVcIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiU2lnbnVwUGFnZVwiLFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICBlbWFpbDogXCJcIixcclxuICAgICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICAgIHBhc3N3b3JkQ29uZmlybTogXCJcIixcclxuICAgICAgaXNQd2Q6IHRydWUsXHJcbiAgICAgIGlzUHdkQ29uZmlybTogdHJ1ZSxcclxuICAgICAgdXNlVXNlcjogdXNlVXNlclN0b3JlKCksXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgYXN5bmMgb25TaWdudXAoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxyXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXHJcbiAgICAgICAgICBwYXNzd29yZENvbmZpcm06IHRoaXMucGFzc3dvcmRDb25maXJtLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLnBvc3QoXCIvdXNlcnMvc2lnbnVwXCIsIGRhdGEpO1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRva2VuXCIsIHJlcy5kYXRhLnRva2VuKTtcclxuICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKFwiL1wiKTtcclxuICAgICAgICAgIHRoaXMudXNlVXNlci5zZXRVc2VyKHJlcy5kYXRhLmRhdGEudXNlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5pbGx1c3RyYXRpb24ge1xyXG4gIGhlaWdodDogNDB2aDtcclxuICBwYWRkaW5nLXRvcDogNTBweDtcclxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoI2JiZWFlYywgI2VlZWVlZSA3NSUpO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG4uc2lnbnVwIHtcclxuICBwYWRkaW5nOiAwIDI1cHggMjBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDIwcHg7XHJcbn1cclxuLnEtaW5wdXQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbn1cclxuXHJcbi5zaWdudXBfX2hlYWRlciB7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbiAgZm9udC1zaXplOiAzNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC44KTtcclxufVxyXG5cclxuLnNpZ251cC1idG4ge1xyXG4gIC8qIHdpZHRoOiAzNDBweDsgKi9cclxuICB3aWR0aDogMTAwJTtcclxuICBtYXgtd2lkdGg6IDMwMHB4O1xyXG4gIGhlaWdodDogNTZweDtcclxuICBiYWNrZ3JvdW5kOiAjMjY3Mzc4O1xyXG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSk7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbn1cclxuLmlubGluZS1zdHlsZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbnAge1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC42NSk7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG59XHJcbi5sb2dpbi1idG4ge1xyXG4gIGNvbG9yOiByZ2JhKDEwLCAyNSwgNDEsIDAuOCk7XHJcbiAgdGV4dC1zaGFkb3c6IDBweCA0cHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XHJcbn1cclxuPC9zdHlsZT5cclxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBcURBLE1BQUssWUFBVTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLGlCQUFpQjtBQUFBLE1BQ2pCLE9BQU87QUFBQSxNQUNQLGNBQWM7QUFBQSxNQUNkLFNBQVMsYUFBYztBQUFBO0VBRTFCO0FBQUEsRUFDRCxTQUFTO0FBQUEsSUFDUCxNQUFNLFdBQVc7QUFDZixVQUFJO0FBQ0YsY0FBTSxPQUFPO0FBQUEsVUFDWCxNQUFNLEtBQUs7QUFBQSxVQUNYLE9BQU8sS0FBSztBQUFBLFVBQ1osVUFBVSxLQUFLO0FBQUEsVUFDZixpQkFBaUIsS0FBSztBQUFBO0FBRXhCLGNBQU0sTUFBTSxNQUFNLEtBQUssS0FBSyxLQUFLLGlCQUFpQixJQUFJO0FBQ3RELFlBQUksSUFBSSxLQUFLLFdBQVcsV0FBVztBQUNqQyx1QkFBYSxRQUFRLFNBQVMsSUFBSSxLQUFLLEtBQUs7QUFDNUMsZUFBSyxRQUFRLEtBQUssR0FBRztBQUNyQixlQUFLLFFBQVEsUUFBUSxJQUFJLEtBQUssS0FBSyxJQUFJO0FBQUEsUUFDekM7QUFBQSxNQUNBLFNBQU8sT0FBUDtBQUNBLGdCQUFRLElBQUksS0FBSztBQUFBLE1BQ25CO0FBQUEsSUFDRDtBQUFBLEVBQ0Y7QUFDSDs7c0RBckZFQSxnQ0FNTSxPQUFBLEVBTkQsT0FBTSxrQkFBYztBQUFBLEVBQ3ZCQSxnQ0FJRSxPQUFBO0FBQUEsSUFIQSxPQUFNO0FBQUEsSUFDTixLQUFBO0FBQUEsSUFDQSxLQUFJO0FBQUE7O0FBR0gsTUFBQSxhQUFBLEVBQUEsT0FBTSxTQUFRO0FBQ2pCLE1BQUEsYUFBQSw2QkFBQSxNQUFBQSxnQ0FBdUMsTUFBbkMsRUFBQSxPQUFNLG9CQUFpQixXQUFPLEVBQUEsQ0FBQTtBQW1DN0IsTUFBQSxhQUFBLEVBQUEsT0FBTSxlQUFjO0FBQ3ZCLE1BQUEsYUFBQSw2QkFBQSxNQUFBQSxnQ0FBK0IsV0FBNUIsNEJBQXdCLEVBQUEsQ0FBQTs7O0lBNUMvQjtBQUFBLElBT0FBLGdCQXdDTSxPQXhDTixZQXdDTTtBQUFBLE1BdkNKO0FBQUEsTUFDQUMsWUFBd0QsUUFBQTtBQUFBLFFBQS9DLFNBQUE7QUFBQSxRQUFRLFVBQUE7QUFBQSxvQkFBa0IsTUFBSTtBQUFBLHFFQUFKLE1BQUksT0FBQTtBQUFBLFFBQUUsT0FBTTtBQUFBO01BQy9DQSxZQUF1RSxRQUFBO0FBQUEsUUFBOUQsU0FBQTtBQUFBLFFBQVEsVUFBQTtBQUFBLG9CQUFrQixNQUFLO0FBQUEscUVBQUwsTUFBSyxRQUFBO0FBQUEsUUFBRSxNQUFLO0FBQUEsUUFBUSxPQUFNO0FBQUE7TUFDN0RBLFlBY1UsUUFBQTtBQUFBLFFBYlIsU0FBQTtBQUFBLFFBQ0EsVUFBQTtBQUFBLG9CQUNTLE1BQVE7QUFBQSxxRUFBUixNQUFRLFdBQUE7QUFBQSxRQUNoQixNQUFNLE1BQUssUUFBQSxhQUFBO0FBQUEsUUFDWixPQUFNO0FBQUE7UUFFVyxnQkFDZixNQUlFO0FBQUEsVUFKRkEsWUFJRSxPQUFBO0FBQUEsWUFIQyxNQUFNLE1BQUssUUFBQSxtQkFBQTtBQUFBLFlBQ1osT0FBTTtBQUFBLFlBQ0wsU0FBSyxPQUFBLE9BQUEsT0FBQSxLQUFBLFlBQUUsTUFBSyxRQUFBLENBQUksTUFBSztBQUFBOzs7O01BSzVCQSxZQWNVLFFBQUE7QUFBQSxRQWJSLFNBQUE7QUFBQSxRQUNBLFVBQUE7QUFBQSxvQkFDUyxNQUFlO0FBQUEscUVBQWYsTUFBZSxrQkFBQTtBQUFBLFFBQ3ZCLE1BQU0sTUFBWSxlQUFBLGFBQUE7QUFBQSxRQUNuQixPQUFNO0FBQUE7UUFFVyxnQkFDZixNQUlFO0FBQUEsVUFKRkEsWUFJRSxPQUFBO0FBQUEsWUFIQyxNQUFNLE1BQVksZUFBQSxtQkFBQTtBQUFBLFlBQ25CLE9BQU07QUFBQSxZQUNMLFNBQUssT0FBQSxPQUFBLE9BQUEsS0FBQSxZQUFFLE1BQVksZUFBQSxDQUFJLE1BQVk7QUFBQTs7OztNQUkxQ0EsWUFBOEQsTUFBQTtBQUFBLFFBQXZELE9BQU07QUFBQSxRQUFjLFNBQU8sU0FBUTtBQUFBLFFBQUUsT0FBTTtBQUFBO01BQ2xERCxnQkFHTSxPQUhOLFlBR007QUFBQSxRQUZKO0FBQUEsUUFDQUMsWUFBMkQsTUFBQTtBQUFBLFVBQXBELE9BQU07QUFBQSxVQUFZLE1BQUE7QUFBQSxVQUFLLE9BQU07QUFBQSxVQUFTLElBQUc7QUFBQTs7Ozs7OzsifQ==
