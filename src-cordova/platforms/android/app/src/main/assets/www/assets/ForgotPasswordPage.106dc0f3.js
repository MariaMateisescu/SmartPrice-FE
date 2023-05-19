import { Q as QInput } from "./QInput.79283f08.js";
import { _ as _export_sfc, o as openBlock, c as createElementBlock, a as createBaseVNode, aa as createVNode, bE as QBtn, Q as Fragment, aH as pushScopeId, aF as popScopeId } from "./index.404ce4fc.js";
import { _ as _imports_0 } from "./ForgotPassword.bbba5c8c.js";
import "./use-dark.efa419b2.js";
import "./uid.7f2d5a47.js";
import "./focus-manager.d00a4595.js";
import "./use-form.74a30394.js";
var ForgotPasswordPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  name: "ForgotPasswordPage",
  data() {
    return {
      email: ""
    };
  },
  methods: {
    onSendCode() {
      try {
        const data = {
          email: this.email
        };
      } catch (error) {
        console.log(error);
      }
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-563ee0d6"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "illustration" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    class: "illustration_img",
    src: _imports_0,
    alt: "Forogt Password Illustration"
  })
], -1));
const _hoisted_2 = { class: "forgot-password" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h3", { class: "forgot-password__header" }, "Forgot Password?", -1));
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, "Enter your email address to retrieve your password", -1));
const _hoisted_5 = { class: "inline-style" };
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, "Go back to", -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1,
    createBaseVNode("div", _hoisted_2, [
      _hoisted_3,
      _hoisted_4,
      createVNode(QInput, {
        rounded: "",
        outlined: "",
        modelValue: $data.email,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.email = $event),
        type: "email",
        label: "Email"
      }, null, 8, ["modelValue"]),
      createVNode(QBtn, {
        class: "forgot-password-btn",
        onClick: $options.onSendCode,
        label: "Send Code"
      }, null, 8, ["onClick"]),
      createBaseVNode("div", _hoisted_5, [
        _hoisted_6,
        createVNode(QBtn, {
          class: "login-btn",
          flat: "",
          label: "Log In",
          to: "/login"
        })
      ])
    ])
  ], 64);
}
var ForgotPasswordPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-563ee0d6"], ["__file", "ForgotPasswordPage.vue"]]);
export { ForgotPasswordPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9yZ290UGFzc3dvcmRQYWdlLjEwNmRjMGYzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvYXV0aGVudGljYXRpb24vRm9yZ290UGFzc3dvcmRQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImlsbHVzdHJhdGlvblwiPlxyXG4gICAgPGltZ1xyXG4gICAgICBjbGFzcz1cImlsbHVzdHJhdGlvbl9pbWdcIlxyXG4gICAgICBzcmM9XCJ+YXNzZXRzL2lsbHVzdHJhdGlvbnMvRm9yZ290UGFzc3dvcmQuc3ZnXCJcclxuICAgICAgYWx0PVwiRm9yb2d0IFBhc3N3b3JkIElsbHVzdHJhdGlvblwiXHJcbiAgICAvPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJmb3Jnb3QtcGFzc3dvcmRcIj5cclxuICAgIDxoMyBjbGFzcz1cImZvcmdvdC1wYXNzd29yZF9faGVhZGVyXCI+Rm9yZ290IFBhc3N3b3JkPzwvaDM+XHJcbiAgICA8cD5FbnRlciB5b3VyIGVtYWlsIGFkZHJlc3MgdG8gcmV0cmlldmUgeW91ciBwYXNzd29yZDwvcD5cclxuICAgIDxxLWlucHV0IHJvdW5kZWQgb3V0bGluZWQgdi1tb2RlbD1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgbGFiZWw9XCJFbWFpbFwiIC8+XHJcbiAgICA8cS1idG4gY2xhc3M9XCJmb3Jnb3QtcGFzc3dvcmQtYnRuXCIgQGNsaWNrPVwib25TZW5kQ29kZVwiIGxhYmVsPVwiU2VuZCBDb2RlXCIgLz5cclxuICAgIDxkaXYgY2xhc3M9XCJpbmxpbmUtc3R5bGVcIj5cclxuICAgICAgPHA+R28gYmFjayB0bzwvcD5cclxuICAgICAgPHEtYnRuIGNsYXNzPVwibG9naW4tYnRuXCIgZmxhdCBsYWJlbD1cIkxvZyBJblwiIHRvPVwiL2xvZ2luXCIgLz5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiRm9yZ290UGFzc3dvcmRQYWdlXCIsXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIG9uU2VuZENvZGUoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLmlsbHVzdHJhdGlvbiB7XHJcbiAgaGVpZ2h0OiA0MHZoO1xyXG4gIHBhZGRpbmctdG9wOiA1MHB4O1xyXG4gIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudCgjYmJlYWVjLCAjZWVlZWVlIDc1JSk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uZm9yZ290LXBhc3N3b3JkIHtcclxuICBwYWRkaW5nOiAwIDI1cHggMjVweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZ2FwOiAyMHB4O1xyXG59XHJcbi5mb3Jnb3QtcGFzc3dvcmRfX2hlYWRlciB7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbiAgZm9udC1zaXplOiAzNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC44KTtcclxufVxyXG4uZm9yZ290LXBhc3N3b3JkLWJ0biB7XHJcbiAgd2lkdGg6IDM0MHB4O1xyXG4gIGhlaWdodDogNTZweDtcclxuICBiYWNrZ3JvdW5kOiAjMjY3Mzc4O1xyXG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSk7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbn1cclxuLmlubGluZS1zdHlsZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbnAge1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC42NSk7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG59XHJcbi5sb2dpbi1idG4ge1xyXG4gIGNvbG9yOiByZ2JhKDEwLCAyNSwgNDEsIDAuOCk7XHJcbiAgdGV4dC1zaGFkb3c6IDBweCA0cHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XHJcbn1cclxuPC9zdHlsZT5cclxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBcUJBLE1BQUssWUFBVTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLE9BQU87QUFBQTtFQUVWO0FBQUEsRUFDRCxTQUFTO0FBQUEsSUFDUCxhQUFhO0FBQ1gsVUFBSTtBQUNGLGNBQU0sT0FBTztBQUFBLFVBQ1gsT0FBTyxLQUFLO0FBQUE7TUFFZCxTQUFPLE9BQVA7QUFDQSxnQkFBUSxJQUFJLEtBQUs7QUFBQSxNQUNuQjtBQUFBLElBQ0Q7QUFBQSxFQUNGO0FBQ0g7O3NEQXRDRUEsZ0NBTU0sT0FBQSxFQU5ELE9BQU0sa0JBQWM7QUFBQSxFQUN2QkEsZ0NBSUUsT0FBQTtBQUFBLElBSEEsT0FBTTtBQUFBLElBQ04sS0FBQTtBQUFBLElBQ0EsS0FBSTtBQUFBOztBQUdILE1BQUEsYUFBQSxFQUFBLE9BQU0sa0JBQWlCO0FBQzFCLE1BQUEsYUFBQSw2QkFBQSxNQUFBQSxnQ0FBeUQsTUFBckQsRUFBQSxPQUFNLDZCQUEwQixvQkFBZ0IsRUFBQSxDQUFBO0FBQ3BELE1BQUEsYUFBQSw2QkFBQSxNQUFBQSxnQ0FBeUQsV0FBdEQsc0RBQWtELEVBQUEsQ0FBQTtBQUdoRCxNQUFBLGFBQUEsRUFBQSxPQUFNLGVBQWM7QUFDdkIsTUFBQSxhQUFBLDZCQUFBLE1BQUFBLGdDQUFpQixXQUFkLGNBQVUsRUFBQSxDQUFBOzs7SUFiakI7QUFBQSxJQU9BQSxnQkFTTSxPQVROLFlBU007QUFBQSxNQVJKO0FBQUEsTUFDQTtBQUFBLE1BQ0FDLFlBQXVFLFFBQUE7QUFBQSxRQUE5RCxTQUFBO0FBQUEsUUFBUSxVQUFBO0FBQUEsb0JBQWtCLE1BQUs7QUFBQSxxRUFBTCxNQUFLLFFBQUE7QUFBQSxRQUFFLE1BQUs7QUFBQSxRQUFRLE9BQU07QUFBQTtNQUM3REEsWUFBMkUsTUFBQTtBQUFBLFFBQXBFLE9BQU07QUFBQSxRQUF1QixTQUFPLFNBQVU7QUFBQSxRQUFFLE9BQU07QUFBQTtNQUM3REQsZ0JBR00sT0FITixZQUdNO0FBQUEsUUFGSjtBQUFBLFFBQ0FDLFlBQTJELE1BQUE7QUFBQSxVQUFwRCxPQUFNO0FBQUEsVUFBWSxNQUFBO0FBQUEsVUFBSyxPQUFNO0FBQUEsVUFBUyxJQUFHO0FBQUE7Ozs7Ozs7In0=
