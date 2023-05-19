import { _ as _export_sfc, bA as useUserStore, ci as useQuasar, o as openBlock, c as createElementBlock, a as createBaseVNode, aa as createVNode, b5 as withCtx, bC as QIcon, bE as QBtn, Q as Fragment, aH as pushScopeId, aF as popScopeId, aL as resolveComponent, M as toDisplayString, b7 as withDirectives, a2 as createBlock, a3 as createCommentVNode } from "./index.404ce4fc.js";
import { Q as QSpace, a as QDialog } from "./QDialog.61cd08a9.js";
import { Q as QCard, a as QCardSection } from "./QCard.facf2956.js";
import { C as ClosePopup } from "./ClosePopup.7842916c.js";
import { Q as QInput } from "./QInput.79283f08.js";
import { _ as _imports_0 } from "./Login.7b077154.js";
import { _ as _imports_0$1 } from "./SignUp.eb9627d6.js";
import { _ as _imports_0$2 } from "./ForgotPassword.bbba5c8c.js";
var LoginDialog_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$3 = {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      isPwd: true,
      useUser: useUserStore(),
      $q: useQuasar()
    };
  },
  emits: ["emitForgotPassword", "emitSignup"],
  methods: {
    async login() {
      try {
        const data = {
          email: this.email,
          password: this.password
        };
        const res = await this.$api.post("/users/login", data);
        if (res.data.status === "success") {
          this.$q.notify({
            type: "positive",
            position: "top",
            message: "Logged in successfully",
            color: "positive",
            timeout: "2500"
          });
          localStorage.setItem("token", res.data.token);
          this.useUser.setUser(res.data.data.user);
          this.$api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
          if (res.data.data.user.role === "admin") {
            this.$router.push("/administration");
          } else {
            this.$router.push("/");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
const _withScopeId$2 = (n) => (pushScopeId("data-v-7dae8222"), n = n(), popScopeId(), n);
const _hoisted_1$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "illustration" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    class: "illustration_img",
    src: _imports_0,
    alt: "Login Illustration"
  })
], -1));
const _hoisted_2$3 = { class: "login" };
const _hoisted_3$3 = { class: "inline-style" };
const _hoisted_4$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("p", null, "Don't have an account?", -1));
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1$3,
    createBaseVNode("div", _hoisted_2$3, [
      createVNode(QInput, {
        rounded: "",
        outlined: "",
        modelValue: $data.email,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.email = $event),
        type: "email",
        label: "Email"
      }, null, 8, ["modelValue"]),
      createVNode(QInput, {
        rounded: "",
        outlined: "",
        modelValue: $data.password,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.password = $event),
        type: $data.isPwd ? "password" : "text",
        label: "Password"
      }, {
        append: withCtx(() => [
          createVNode(QIcon, {
            name: $data.isPwd ? "visibility_off" : "visibility",
            class: "cursor-pointer",
            onClick: _cache[1] || (_cache[1] = ($event) => $data.isPwd = !$data.isPwd)
          }, null, 8, ["name"])
        ]),
        _: 1
      }, 8, ["modelValue", "type"]),
      createVNode(QBtn, {
        flat: "",
        class: "forgot-pass-btn",
        label: "Forgot password",
        onClick: _cache[3] || (_cache[3] = ($event) => this.$emit("emitForgotPassword"))
      }),
      createVNode(QBtn, {
        class: "login-btn",
        onClick: $options.login,
        label: "Log In"
      }, null, 8, ["onClick"]),
      createBaseVNode("div", _hoisted_3$3, [
        _hoisted_4$3,
        createVNode(QBtn, {
          class: "signup-btn",
          flat: "",
          label: "Sign Up",
          onClick: _cache[4] || (_cache[4] = ($event) => this.$emit("emitSignup"))
        })
      ])
    ])
  ], 64);
}
var LoginDialog = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-7dae8222"], ["__file", "LoginDialog.vue"]]);
var SignupDialog_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$2 = {
  name: "SignupPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      isPwd: true,
      isPwdConfirm: true,
      useUser: useUserStore(),
      $q: useQuasar()
    };
  },
  emits: ["emitLogin"],
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
          this.$q.notify({
            type: "positive",
            position: "top",
            message: "Account created successfully",
            color: "positive",
            timeout: "2500"
          });
          localStorage.setItem("token", res.data.token);
          this.$api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
          this.$router.push("/");
          this.useUser.setUser(res.data.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-4902184b"), n = n(), popScopeId(), n);
const _hoisted_1$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "illustration" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    class: "illustration_img",
    src: _imports_0$1,
    alt: "Signup Illustration"
  })
], -1));
const _hoisted_2$2 = { class: "signup" };
const _hoisted_3$2 = { class: "inline-style" };
const _hoisted_4$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("p", null, "Already have an account?", -1));
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1$2,
    createBaseVNode("div", _hoisted_2$2, [
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
      createBaseVNode("div", _hoisted_3$2, [
        _hoisted_4$2,
        createVNode(QBtn, {
          class: "login-btn",
          flat: "",
          label: "Log in",
          onClick: _cache[6] || (_cache[6] = ($event) => this.$emit("emitLogin"))
        })
      ])
    ])
  ], 64);
}
var SignupDialog = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-4902184b"], ["__file", "SignupDialog.vue"]]);
var ForgotPasswordDialog_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = {
  name: "ForgotPasswordPage",
  data() {
    return {
      email: ""
    };
  },
  emits: ["emitLogin"],
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
const _withScopeId = (n) => (pushScopeId("data-v-221d7b4a"), n = n(), popScopeId(), n);
const _hoisted_1$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "illustration" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    class: "illustration_img",
    src: _imports_0$2,
    alt: "Forogt Password Illustration"
  })
], -1));
const _hoisted_2$1 = { class: "forgot-password" };
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h3", { class: "forgot-password__header" }, "Forgot Password?", -1));
const _hoisted_4$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, "Enter your email address to retrieve your password", -1));
const _hoisted_5$1 = { class: "inline-style" };
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, "Go back to", -1));
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1$1,
    createBaseVNode("div", _hoisted_2$1, [
      _hoisted_3$1,
      _hoisted_4$1,
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
      createBaseVNode("div", _hoisted_5$1, [
        _hoisted_6,
        createVNode(QBtn, {
          class: "login-btn",
          flat: "",
          label: "Log In",
          onClick: _cache[1] || (_cache[1] = ($event) => this.$emit("emitLogin"))
        })
      ])
    ])
  ], 64);
}
var ForgotPasswordDialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-221d7b4a"], ["__file", "ForgotPasswordDialog.vue"]]);
var EmptyState_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  name: "EmptyState",
  props: ["image", "title", "message"],
  data() {
    return {
      showAuthDialog: false,
      state: ""
    };
  },
  components: {
    LoginDialog,
    SignupDialog,
    ForgotPasswordDialog
  },
  methods: {
    onLogin() {
      this.state = "Log In";
      this.showAuthDialog = true;
    },
    onSignup() {
      this.state = "Sign Up";
      this.showAuthDialog = true;
    },
    onForgotPassword() {
      this.state = "Forgot Password";
      this.showAuthDialog = true;
    }
  }
};
const _hoisted_1 = { class: "empty-state" };
const _hoisted_2 = ["src"];
const _hoisted_3 = { class: "empty-state__title" };
const _hoisted_4 = { class: "message" };
const _hoisted_5 = { class: "text-h6" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_LoginDialog = resolveComponent("LoginDialog");
  const _component_SignupDialog = resolveComponent("SignupDialog");
  const _component_ForgotPasswordDialog = resolveComponent("ForgotPasswordDialog");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("img", {
      src: `~assets/illustrations/${$props.image}`,
      alt: ""
    }, null, 8, _hoisted_2),
    createBaseVNode("div", _hoisted_3, toDisplayString($props.title), 1),
    createBaseVNode("div", _hoisted_4, toDisplayString($props.message), 1),
    createBaseVNode("div", null, [
      createVNode(QBtn, {
        class: "btn",
        style: { "background-color": "#267378", "color": "#fff" },
        label: "Log In",
        onClick: $options.onLogin
      }, null, 8, ["onClick"]),
      createVNode(QBtn, {
        class: "btn",
        style: { "background-color": "#267378", "color": "#fff" },
        label: "Sign Up",
        onClick: $options.onSignup
      }, null, 8, ["onClick"]),
      createVNode(QDialog, {
        modelValue: $data.showAuthDialog,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.showAuthDialog = $event),
        seamless: "",
        position: "bottom"
      }, {
        default: withCtx(() => [
          createVNode(QCard, { class: "q-card__height" }, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "row items-center q-pb-none" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_5, toDisplayString(this.state), 1),
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
                  this.state === "Log In" ? (openBlock(), createBlock(_component_LoginDialog, {
                    key: 0,
                    onEmitForgotPassword: $options.onForgotPassword,
                    onEmitSignup: $options.onSignup
                  }, null, 8, ["onEmitForgotPassword", "onEmitSignup"])) : createCommentVNode("", true),
                  this.state === "Sign Up" ? (openBlock(), createBlock(_component_SignupDialog, {
                    key: 1,
                    onEmitLogin: $options.onLogin
                  }, null, 8, ["onEmitLogin"])) : createCommentVNode("", true),
                  this.state === "Forgot Password" ? (openBlock(), createBlock(_component_ForgotPasswordDialog, {
                    key: 2,
                    onEmitLogin: $options.onLogin
                  }, null, 8, ["onEmitLogin"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ])
  ]);
}
var EmptyState = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3c88818d"], ["__file", "EmptyState.vue"]]);
export { EmptyState as E };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1wdHlTdGF0ZS4xY2EzZDJmMC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY3VzdG9tZXIvTG9naW5EaWFsb2cudnVlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY3VzdG9tZXIvU2lnbnVwRGlhbG9nLnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2N1c3RvbWVyL0ZvcmdvdFBhc3N3b3JkRGlhbG9nLnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2N1c3RvbWVyL0VtcHR5U3RhdGUudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiaWxsdXN0cmF0aW9uXCI+XHJcbiAgICA8aW1nXHJcbiAgICAgIGNsYXNzPVwiaWxsdXN0cmF0aW9uX2ltZ1wiXHJcbiAgICAgIHNyYz1cIn5hc3NldHMvaWxsdXN0cmF0aW9ucy9Mb2dpbi5zdmdcIlxyXG4gICAgICBhbHQ9XCJMb2dpbiBJbGx1c3RyYXRpb25cIlxyXG4gICAgLz5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibG9naW5cIj5cclxuICAgIDxxLWlucHV0IHJvdW5kZWQgb3V0bGluZWQgdi1tb2RlbD1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgbGFiZWw9XCJFbWFpbFwiIC8+XHJcbiAgICA8cS1pbnB1dFxyXG4gICAgICByb3VuZGVkXHJcbiAgICAgIG91dGxpbmVkXHJcbiAgICAgIHYtbW9kZWw9XCJwYXNzd29yZFwiXHJcbiAgICAgIDp0eXBlPVwiaXNQd2QgPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgbGFiZWw9XCJQYXNzd29yZFwiXHJcbiAgICA+XHJcbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgIDxxLWljb25cclxuICAgICAgICAgIDpuYW1lPVwiaXNQd2QgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcclxuICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgQGNsaWNrPVwiaXNQd2QgPSAhaXNQd2RcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICA8L3EtaW5wdXQ+XHJcbiAgICA8cS1idG5cclxuICAgICAgZmxhdFxyXG4gICAgICBjbGFzcz1cImZvcmdvdC1wYXNzLWJ0blwiXHJcbiAgICAgIGxhYmVsPVwiRm9yZ290IHBhc3N3b3JkXCJcclxuICAgICAgQGNsaWNrPVwidGhpcy4kZW1pdCgnZW1pdEZvcmdvdFBhc3N3b3JkJylcIlxyXG4gICAgLz5cclxuICAgIDxxLWJ0biBjbGFzcz1cImxvZ2luLWJ0blwiIEBjbGljaz1cImxvZ2luXCIgbGFiZWw9XCJMb2cgSW5cIiAvPlxyXG4gICAgPGRpdiBjbGFzcz1cImlubGluZS1zdHlsZVwiPlxyXG4gICAgICA8cD5Eb24ndCBoYXZlIGFuIGFjY291bnQ/PC9wPlxyXG4gICAgICA8cS1idG5cclxuICAgICAgICBjbGFzcz1cInNpZ251cC1idG5cIlxyXG4gICAgICAgIGZsYXRcclxuICAgICAgICBsYWJlbD1cIlNpZ24gVXBcIlxyXG4gICAgICAgIEBjbGljaz1cInRoaXMuJGVtaXQoJ2VtaXRTaWdudXAnKVwiXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IHVzZVVzZXJTdG9yZSB9IGZyb20gXCIuLi8uLi9zdG9yZXMvVXNlclN0b3JlXCI7XHJcbmltcG9ydCB1c2VRdWFzYXIgZnJvbSBcInF1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLXF1YXNhci5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiTG9naW5QYWdlXCIsXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgICBwYXNzd29yZDogXCJcIixcclxuICAgICAgaXNQd2Q6IHRydWUsXHJcbiAgICAgIHVzZVVzZXI6IHVzZVVzZXJTdG9yZSgpLFxyXG4gICAgICAkcTogdXNlUXVhc2FyKCksXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgZW1pdHM6IFtcImVtaXRGb3Jnb3RQYXNzd29yZFwiLCBcImVtaXRTaWdudXBcIl0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgYXN5bmMgbG9naW4oKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxyXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkucG9zdChcIi91c2Vycy9sb2dpblwiLCBkYXRhKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgdGhpcy4kcS5ub3RpZnkoe1xyXG4gICAgICAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkxvZ2dlZCBpbiBzdWNjZXNzZnVsbHlcIixcclxuICAgICAgICAgICAgY29sb3I6IFwicG9zaXRpdmVcIixcclxuICAgICAgICAgICAgdGltZW91dDogXCIyNTAwXCIsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9rZW5cIiwgcmVzLmRhdGEudG9rZW4pO1xyXG4gICAgICAgICAgdGhpcy51c2VVc2VyLnNldFVzZXIocmVzLmRhdGEuZGF0YS51c2VyKTtcclxuICAgICAgICAgIHRoaXMuJGFwaS5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbltcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCJcclxuICAgICAgICAgIF0gPSBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKX1gO1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLmRhdGEudXNlci5yb2xlID09PSBcImFkbWluXCIpIHtcclxuICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goXCIvYWRtaW5pc3RyYXRpb25cIik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaChcIi9cIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5pbGx1c3RyYXRpb24ge1xyXG4gIGhlaWdodDogNDB2aDtcclxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoI2JiZWFlYywgI2VlZWVlZSA3NSUpO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG4ubG9naW4ge1xyXG4gIHBhZGRpbmc6IDAgMjVweCAyNXB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMjBweDtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuLmxvZ2luX19oZWFkZXIge1xyXG4gIG1hcmdpbjogMHB4O1xyXG4gIGZvbnQtc2l6ZTogMzZweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGNvbG9yOiByZ2JhKDEwLCAyNSwgNDEsIDAuOCk7XHJcbn1cclxuLmZvcmdvdC1wYXNzLWJ0biB7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC42NSk7XHJcbn1cclxuLnEtaW5wdXQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbn1cclxuLmxvZ2luLWJ0biB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiAzMDBweDtcclxuICBiYWNrZ3JvdW5kOiAjMjY3Mzc4O1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG59XHJcbnAge1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC42NSk7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG59XHJcbi5zaWdudXAtYnRuIHtcclxuICBjb2xvcjogcmdiYSgxMCwgMjUsIDQxLCAwLjgpO1xyXG4gIHRleHQtc2hhZG93OiAwcHggNHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xyXG59XHJcbi5pbmxpbmUtc3R5bGUge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG48L3N0eWxlPlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImlsbHVzdHJhdGlvblwiPlxyXG4gICAgPGltZ1xyXG4gICAgICBjbGFzcz1cImlsbHVzdHJhdGlvbl9pbWdcIlxyXG4gICAgICBzcmM9XCJ+YXNzZXRzL2lsbHVzdHJhdGlvbnMvU2lnblVwLnN2Z1wiXHJcbiAgICAgIGFsdD1cIlNpZ251cCBJbGx1c3RyYXRpb25cIlxyXG4gICAgLz5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwic2lnbnVwXCI+XHJcbiAgICA8cS1pbnB1dCByb3VuZGVkIG91dGxpbmVkIHYtbW9kZWw9XCJuYW1lXCIgbGFiZWw9XCJOYW1lXCIgLz5cclxuICAgIDxxLWlucHV0IHJvdW5kZWQgb3V0bGluZWQgdi1tb2RlbD1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgbGFiZWw9XCJFbWFpbFwiIC8+XHJcbiAgICA8cS1pbnB1dFxyXG4gICAgICByb3VuZGVkXHJcbiAgICAgIG91dGxpbmVkXHJcbiAgICAgIHYtbW9kZWw9XCJwYXNzd29yZFwiXHJcbiAgICAgIDp0eXBlPVwiaXNQd2QgPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgbGFiZWw9XCJQYXNzd29yZFwiXHJcbiAgICA+XHJcbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgIDxxLWljb25cclxuICAgICAgICAgIDpuYW1lPVwiaXNQd2QgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcclxuICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgQGNsaWNrPVwiaXNQd2QgPSAhaXNQd2RcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICA8L3EtaW5wdXQ+XHJcblxyXG4gICAgPHEtaW5wdXRcclxuICAgICAgcm91bmRlZFxyXG4gICAgICBvdXRsaW5lZFxyXG4gICAgICB2LW1vZGVsPVwicGFzc3dvcmRDb25maXJtXCJcclxuICAgICAgOnR5cGU9XCJpc1B3ZENvbmZpcm0gPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgbGFiZWw9XCJDb25maXJtIFBhc3N3b3JkXCJcclxuICAgID5cclxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XHJcbiAgICAgICAgPHEtaWNvblxyXG4gICAgICAgICAgOm5hbWU9XCJpc1B3ZENvbmZpcm0gPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcclxuICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgQGNsaWNrPVwiaXNQd2RDb25maXJtID0gIWlzUHdkQ29uZmlybVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC90ZW1wbGF0ZT5cclxuICAgIDwvcS1pbnB1dD5cclxuICAgIDxxLWJ0biBjbGFzcz1cInNpZ251cC1idG5cIiBAY2xpY2s9XCJvblNpZ251cFwiIGxhYmVsPVwiU2lnbiBVcFwiIC8+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaW5saW5lLXN0eWxlXCI+XHJcbiAgICAgIDxwPkFscmVhZHkgaGF2ZSBhbiBhY2NvdW50PzwvcD5cclxuICAgICAgPHEtYnRuXHJcbiAgICAgICAgY2xhc3M9XCJsb2dpbi1idG5cIlxyXG4gICAgICAgIGZsYXRcclxuICAgICAgICBsYWJlbD1cIkxvZyBpblwiXHJcbiAgICAgICAgQGNsaWNrPVwidGhpcy4kZW1pdCgnZW1pdExvZ2luJylcIlxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyB1c2VVc2VyU3RvcmUgfSBmcm9tIFwiLi4vLi4vc3RvcmVzL1VzZXJTdG9yZVwiO1xyXG5pbXBvcnQgdXNlUXVhc2FyIGZyb20gXCJxdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1xdWFzYXIuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIlNpZ251cFBhZ2VcIixcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogXCJcIixcclxuICAgICAgZW1haWw6IFwiXCIsXHJcbiAgICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgICBwYXNzd29yZENvbmZpcm06IFwiXCIsXHJcbiAgICAgIGlzUHdkOiB0cnVlLFxyXG4gICAgICBpc1B3ZENvbmZpcm06IHRydWUsXHJcbiAgICAgIHVzZVVzZXI6IHVzZVVzZXJTdG9yZSgpLFxyXG4gICAgICAkcTogdXNlUXVhc2FyKCksXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgZW1pdHM6IFtcImVtaXRMb2dpblwiXSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBhc3luYyBvblNpZ251cCgpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgZW1haWw6IHRoaXMuZW1haWwsXHJcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcclxuICAgICAgICAgIHBhc3N3b3JkQ29uZmlybTogdGhpcy5wYXNzd29yZENvbmZpcm0sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkucG9zdChcIi91c2Vycy9zaWdudXBcIiwgZGF0YSk7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgIHRoaXMuJHEubm90aWZ5KHtcclxuICAgICAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJ0b3BcIixcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJBY2NvdW50IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5XCIsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcInBvc2l0aXZlXCIsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IFwiMjUwMFwiLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRva2VuXCIsIHJlcy5kYXRhLnRva2VuKTtcclxuICAgICAgICAgIHRoaXMuJGFwaS5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbltcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCJcclxuICAgICAgICAgIF0gPSBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKX1gO1xyXG4gICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goXCIvXCIpO1xyXG4gICAgICAgICAgdGhpcy51c2VVc2VyLnNldFVzZXIocmVzLmRhdGEuZGF0YS51c2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLmlsbHVzdHJhdGlvbiB7XHJcbiAgaGVpZ2h0OiAzMHZoO1xyXG4gIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudCgjYmJlYWVjLCAjZWVlZWVlIDc1JSk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5zaWdudXAge1xyXG4gIHBhZGRpbmc6IDAgMjVweCAyMHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMjBweDtcclxufVxyXG4ucS1pbnB1dCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiA1MDBweDtcclxufVxyXG5cclxuLnNpZ251cF9faGVhZGVyIHtcclxuICBtYXJnaW46IDBweDtcclxuICBmb250LXNpemU6IDM2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBjb2xvcjogcmdiYSgxMCwgMjUsIDQxLCAwLjgpO1xyXG59XHJcblxyXG4uc2lnbnVwLWJ0biB7XHJcbiAgLyogd2lkdGg6IDM0MHB4OyAqL1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogMzAwcHg7XHJcbiAgaGVpZ2h0OiA1NnB4O1xyXG4gIGJhY2tncm91bmQ6ICMyNjczNzg7XHJcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcclxufVxyXG4uaW5saW5lLXN0eWxlIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxucCB7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBjb2xvcjogcmdiYSgxMCwgMjUsIDQxLCAwLjY1KTtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIG1hcmdpbi1ib3R0b206IDA7XHJcbn1cclxuLmxvZ2luLWJ0biB7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC44KTtcclxuICB0ZXh0LXNoYWRvdzogMHB4IDRweCA0cHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcclxufVxyXG48L3N0eWxlPlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImlsbHVzdHJhdGlvblwiPlxyXG4gICAgPGltZ1xyXG4gICAgICBjbGFzcz1cImlsbHVzdHJhdGlvbl9pbWdcIlxyXG4gICAgICBzcmM9XCJ+YXNzZXRzL2lsbHVzdHJhdGlvbnMvRm9yZ290UGFzc3dvcmQuc3ZnXCJcclxuICAgICAgYWx0PVwiRm9yb2d0IFBhc3N3b3JkIElsbHVzdHJhdGlvblwiXHJcbiAgICAvPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJmb3Jnb3QtcGFzc3dvcmRcIj5cclxuICAgIDxoMyBjbGFzcz1cImZvcmdvdC1wYXNzd29yZF9faGVhZGVyXCI+Rm9yZ290IFBhc3N3b3JkPzwvaDM+XHJcbiAgICA8cD5FbnRlciB5b3VyIGVtYWlsIGFkZHJlc3MgdG8gcmV0cmlldmUgeW91ciBwYXNzd29yZDwvcD5cclxuICAgIDxxLWlucHV0IHJvdW5kZWQgb3V0bGluZWQgdi1tb2RlbD1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgbGFiZWw9XCJFbWFpbFwiIC8+XHJcbiAgICA8cS1idG4gY2xhc3M9XCJmb3Jnb3QtcGFzc3dvcmQtYnRuXCIgQGNsaWNrPVwib25TZW5kQ29kZVwiIGxhYmVsPVwiU2VuZCBDb2RlXCIgLz5cclxuICAgIDxkaXYgY2xhc3M9XCJpbmxpbmUtc3R5bGVcIj5cclxuICAgICAgPHA+R28gYmFjayB0bzwvcD5cclxuICAgICAgPHEtYnRuXHJcbiAgICAgICAgY2xhc3M9XCJsb2dpbi1idG5cIlxyXG4gICAgICAgIGZsYXRcclxuICAgICAgICBsYWJlbD1cIkxvZyBJblwiXHJcbiAgICAgICAgQGNsaWNrPVwidGhpcy4kZW1pdCgnZW1pdExvZ2luJylcIlxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogXCJGb3Jnb3RQYXNzd29yZFBhZ2VcIixcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZW1haWw6IFwiXCIsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgZW1pdHM6IFtcImVtaXRMb2dpblwiXSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBvblNlbmRDb2RlKCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICBlbWFpbDogdGhpcy5lbWFpbCxcclxuICAgICAgICB9O1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5pbGx1c3RyYXRpb24ge1xyXG4gIGhlaWdodDogNDB2aDtcclxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoI2JiZWFlYywgI2VlZWVlZSA3NSUpO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLmZvcmdvdC1wYXNzd29yZCB7XHJcbiAgcGFkZGluZzogMCAyNXB4IDI1cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAyMHB4O1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG4uZm9yZ290LXBhc3N3b3JkX19oZWFkZXIge1xyXG4gIG1hcmdpbjogMHB4O1xyXG4gIGZvbnQtc2l6ZTogMzZweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGNvbG9yOiByZ2JhKDEwLCAyNSwgNDEsIDAuOCk7XHJcbn1cclxuLnEtaW5wdXQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbn1cclxuLmZvcmdvdC1wYXNzd29yZC1idG4ge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogMzAwcHg7XHJcbiAgYmFja2dyb3VuZDogIzI2NzM3ODtcclxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpO1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG59XHJcbi5pbmxpbmUtc3R5bGUge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5wIHtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIGNvbG9yOiByZ2JhKDEwLCAyNSwgNDEsIDAuNjUpO1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgbWFyZ2luLWJvdHRvbTogMDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLmxvZ2luLWJ0biB7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC44KTtcclxuICB0ZXh0LXNoYWRvdzogMHB4IDRweCA0cHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcclxufVxyXG48L3N0eWxlPlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImVtcHR5LXN0YXRlXCI+XHJcbiAgICA8aW1nIDpzcmM9XCJgfmFzc2V0cy9pbGx1c3RyYXRpb25zLyR7aW1hZ2V9YFwiIGFsdD1cIlwiIC8+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZW1wdHktc3RhdGVfX3RpdGxlXCI+e3sgdGl0bGUgfX08L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlXCI+XHJcbiAgICAgIHt7IG1lc3NhZ2UgfX1cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdj5cclxuICAgICAgPHEtYnRuXHJcbiAgICAgICAgY2xhc3M9XCJidG5cIlxyXG4gICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzI2NzM3ODsgY29sb3I6ICNmZmZcIlxyXG4gICAgICAgIGxhYmVsPVwiTG9nIEluXCJcclxuICAgICAgICBAY2xpY2s9XCJvbkxvZ2luXCJcclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxxLWJ0blxyXG4gICAgICAgIGNsYXNzPVwiYnRuXCJcclxuICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICMyNjczNzg7IGNvbG9yOiAjZmZmXCJcclxuICAgICAgICBsYWJlbD1cIlNpZ24gVXBcIlxyXG4gICAgICAgIEBjbGljaz1cIm9uU2lnbnVwXCJcclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxxLWRpYWxvZyB2LW1vZGVsPVwic2hvd0F1dGhEaWFsb2dcIiBzZWFtbGVzcyBwb3NpdGlvbj1cImJvdHRvbVwiPlxyXG4gICAgICAgIDxxLWNhcmQgY2xhc3M9XCJxLWNhcmRfX2hlaWdodFwiPlxyXG4gICAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXBiLW5vbmVcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj57eyB0aGlzLnN0YXRlIH19PC9kaXY+XHJcbiAgICAgICAgICAgIDxxLXNwYWNlIC8+XHJcbiAgICAgICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IHJvdW5kIGRlbnNlIHYtY2xvc2UtcG9wdXAgLz5cclxuICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxyXG4gICAgICAgICAgICA8TG9naW5EaWFsb2dcclxuICAgICAgICAgICAgICB2LWlmPVwidGhpcy5zdGF0ZSA9PT0gJ0xvZyBJbidcIlxyXG4gICAgICAgICAgICAgIEBlbWl0Rm9yZ290UGFzc3dvcmQ9XCJvbkZvcmdvdFBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICBAZW1pdFNpZ251cD1cIm9uU2lnbnVwXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPFNpZ251cERpYWxvZ1xyXG4gICAgICAgICAgICAgIHYtaWY9XCJ0aGlzLnN0YXRlID09PSAnU2lnbiBVcCdcIlxyXG4gICAgICAgICAgICAgIEBlbWl0TG9naW49XCJvbkxvZ2luXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPEZvcmdvdFBhc3N3b3JkRGlhbG9nXHJcbiAgICAgICAgICAgICAgdi1pZj1cInRoaXMuc3RhdGUgPT09ICdGb3Jnb3QgUGFzc3dvcmQnXCJcclxuICAgICAgICAgICAgICBAZW1pdExvZ2luPVwib25Mb2dpblwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG4gICAgICAgIDwvcS1jYXJkPlxyXG4gICAgICA8L3EtZGlhbG9nPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgTG9naW5EaWFsb2cgZnJvbSBcInNyYy9jb21wb25lbnRzL2N1c3RvbWVyL0xvZ2luRGlhbG9nLnZ1ZVwiO1xyXG5pbXBvcnQgU2lnbnVwRGlhbG9nIGZyb20gXCJzcmMvY29tcG9uZW50cy9jdXN0b21lci9TaWdudXBEaWFsb2cudnVlXCI7XHJcbmltcG9ydCBGb3Jnb3RQYXNzd29yZERpYWxvZyBmcm9tIFwiLi9Gb3Jnb3RQYXNzd29yZERpYWxvZy52dWVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIkVtcHR5U3RhdGVcIixcclxuICBwcm9wczogW1wiaW1hZ2VcIiwgXCJ0aXRsZVwiLCBcIm1lc3NhZ2VcIl0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNob3dBdXRoRGlhbG9nOiBmYWxzZSxcclxuICAgICAgc3RhdGU6IFwiXCIsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgTG9naW5EaWFsb2csXHJcbiAgICBTaWdudXBEaWFsb2csXHJcbiAgICBGb3Jnb3RQYXNzd29yZERpYWxvZyxcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIG9uTG9naW4oKSB7XHJcbiAgICAgIHRoaXMuc3RhdGUgPSBcIkxvZyBJblwiO1xyXG4gICAgICB0aGlzLnNob3dBdXRoRGlhbG9nID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBvblNpZ251cCgpIHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IFwiU2lnbiBVcFwiO1xyXG4gICAgICB0aGlzLnNob3dBdXRoRGlhbG9nID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBvbkZvcmdvdFBhc3N3b3JkKCkge1xyXG4gICAgICB0aGlzLnN0YXRlID0gXCJGb3Jnb3QgUGFzc3dvcmRcIjtcclxuICAgICAgdGhpcy5zaG93QXV0aERpYWxvZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLmVtcHR5LXN0YXRlIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgcGFkZGluZzogMCA1MHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4uZW1wdHktc3RhdGVfX3RpdGxlIHtcclxuICBmb250LXNpemU6IDMwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxufVxyXG4ucS1jYXJkX19oZWlnaHQge1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtIDUwcHgpICFpbXBvcnRhbnQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcclxufVxyXG5cclxuLmJ0biB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiAzMDBweDtcclxuICBiYWNrZ3JvdW5kOiAjMjY3Mzc4O1xyXG4gIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSwgMC45KTtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcclxuICBtYXJnaW4tdG9wOiAyMHB4O1xyXG59XHJcblxyXG4ubWVzc2FnZSB7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG59XHJcbjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6WyJfc2ZjX21haW4iLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2hvaXN0ZWRfMiIsIl9ob2lzdGVkXzMiLCJfaG9pc3RlZF80IiwiX3dpdGhTY29wZUlkIiwiX2hvaXN0ZWRfMSIsIl9jcmVhdGVWTm9kZSIsIl9pbXBvcnRzXzAiLCJfaG9pc3RlZF81IiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZUJsb2NrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFnREEsTUFBS0EsY0FBVTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLFNBQVMsYUFBYztBQUFBLE1BQ3ZCLElBQUksVUFBVztBQUFBO0VBRWxCO0FBQUEsRUFDRCxPQUFPLENBQUMsc0JBQXNCLFlBQVk7QUFBQSxFQUMxQyxTQUFTO0FBQUEsSUFDUCxNQUFNLFFBQVE7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
