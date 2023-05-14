import { _ as _export_sfc, bA as useUserStore, o as openBlock, c as createElementBlock, a as createBaseVNode, aa as createVNode, b5 as withCtx, bC as QIcon, bE as QBtn, Q as Fragment, aH as pushScopeId, aF as popScopeId, aL as resolveComponent, M as toDisplayString, b7 as withDirectives, a2 as createBlock, a3 as createCommentVNode } from "./index.5a14f3c4.js";
import { Q as QSpace, a as QDialog } from "./QDialog.8f997d51.js";
import { Q as QCard, a as QCardSection } from "./QCard.133f47d5.js";
import { C as ClosePopup } from "./ClosePopup.262ce3d8.js";
import { Q as QInput } from "./QInput.11495055.js";
import { _ as _imports_0 } from "./Login.d1b99dd8.js";
import { _ as _imports_0$1 } from "./SignUp.0068903c.js";
import { _ as _imports_0$2 } from "./ForgotPassword.9cb51cc9.js";
var LoginDialog_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$3 = {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      isPwd: true,
      useUser: useUserStore()
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
        localStorage.setItem("token", res.data.token);
        this.useUser.setUser(res.data.data.user);
        this.$api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        if (res.data.data.user.role === "admin") {
          this.$router.push("/administration");
        } else {
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
const _withScopeId$2 = (n) => (pushScopeId("data-v-419d9dc6"), n = n(), popScopeId(), n);
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
var LoginDialog = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-419d9dc6"], ["__file", "LoginDialog.vue"]]);
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
      useUser: useUserStore()
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
const _withScopeId$1 = (n) => (pushScopeId("data-v-19ca4876"), n = n(), popScopeId(), n);
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
var SignupDialog = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-19ca4876"], ["__file", "SignupDialog.vue"]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1wdHlTdGF0ZS40ZmY1ZmViNi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY3VzdG9tZXIvTG9naW5EaWFsb2cudnVlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY3VzdG9tZXIvU2lnbnVwRGlhbG9nLnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2N1c3RvbWVyL0ZvcmdvdFBhc3N3b3JkRGlhbG9nLnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2N1c3RvbWVyL0VtcHR5U3RhdGUudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiaWxsdXN0cmF0aW9uXCI+XHJcbiAgICA8aW1nXHJcbiAgICAgIGNsYXNzPVwiaWxsdXN0cmF0aW9uX2ltZ1wiXHJcbiAgICAgIHNyYz1cIn5hc3NldHMvaWxsdXN0cmF0aW9ucy9Mb2dpbi5zdmdcIlxyXG4gICAgICBhbHQ9XCJMb2dpbiBJbGx1c3RyYXRpb25cIlxyXG4gICAgLz5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibG9naW5cIj5cclxuICAgIDxxLWlucHV0IHJvdW5kZWQgb3V0bGluZWQgdi1tb2RlbD1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgbGFiZWw9XCJFbWFpbFwiIC8+XHJcbiAgICA8cS1pbnB1dFxyXG4gICAgICByb3VuZGVkXHJcbiAgICAgIG91dGxpbmVkXHJcbiAgICAgIHYtbW9kZWw9XCJwYXNzd29yZFwiXHJcbiAgICAgIDp0eXBlPVwiaXNQd2QgPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgbGFiZWw9XCJQYXNzd29yZFwiXHJcbiAgICA+XHJcbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgIDxxLWljb25cclxuICAgICAgICAgIDpuYW1lPVwiaXNQd2QgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcclxuICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgQGNsaWNrPVwiaXNQd2QgPSAhaXNQd2RcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICA8L3EtaW5wdXQ+XHJcbiAgICA8cS1idG5cclxuICAgICAgZmxhdFxyXG4gICAgICBjbGFzcz1cImZvcmdvdC1wYXNzLWJ0blwiXHJcbiAgICAgIGxhYmVsPVwiRm9yZ290IHBhc3N3b3JkXCJcclxuICAgICAgQGNsaWNrPVwidGhpcy4kZW1pdCgnZW1pdEZvcmdvdFBhc3N3b3JkJylcIlxyXG4gICAgLz5cclxuICAgIDxxLWJ0biBjbGFzcz1cImxvZ2luLWJ0blwiIEBjbGljaz1cImxvZ2luXCIgbGFiZWw9XCJMb2cgSW5cIiAvPlxyXG4gICAgPGRpdiBjbGFzcz1cImlubGluZS1zdHlsZVwiPlxyXG4gICAgICA8cD5Eb24ndCBoYXZlIGFuIGFjY291bnQ/PC9wPlxyXG4gICAgICA8cS1idG5cclxuICAgICAgICBjbGFzcz1cInNpZ251cC1idG5cIlxyXG4gICAgICAgIGZsYXRcclxuICAgICAgICBsYWJlbD1cIlNpZ24gVXBcIlxyXG4gICAgICAgIEBjbGljaz1cInRoaXMuJGVtaXQoJ2VtaXRTaWdudXAnKVwiXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IHVzZVVzZXJTdG9yZSB9IGZyb20gXCIuLi8uLi9zdG9yZXMvVXNlclN0b3JlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogXCJMb2dpblBhZ2VcIixcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZW1haWw6IFwiXCIsXHJcbiAgICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgICBpc1B3ZDogdHJ1ZSxcclxuICAgICAgdXNlVXNlcjogdXNlVXNlclN0b3JlKCksXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgZW1pdHM6IFtcImVtaXRGb3Jnb3RQYXNzd29yZFwiLCBcImVtaXRTaWdudXBcIl0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgYXN5bmMgbG9naW4oKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxyXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkucG9zdChcIi91c2Vycy9sb2dpblwiLCBkYXRhKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRva2VuXCIsIHJlcy5kYXRhLnRva2VuKTtcclxuICAgICAgICB0aGlzLnVzZVVzZXIuc2V0VXNlcihyZXMuZGF0YS5kYXRhLnVzZXIpO1xyXG4gICAgICAgIHRoaXMuJGFwaS5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbltcclxuICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiXHJcbiAgICAgICAgXSA9IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpfWA7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLmRhdGEudXNlci5yb2xlID09PSBcImFkbWluXCIpIHtcclxuICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKFwiL2FkbWluaXN0cmF0aW9uXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaChcIi9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5pbGx1c3RyYXRpb24ge1xyXG4gIGhlaWdodDogNDB2aDtcclxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoI2JiZWFlYywgI2VlZWVlZSA3NSUpO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG4ubG9naW4ge1xyXG4gIHBhZGRpbmc6IDAgMjVweCAyNXB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMjBweDtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuLmxvZ2luX19oZWFkZXIge1xyXG4gIG1hcmdpbjogMHB4O1xyXG4gIGZvbnQtc2l6ZTogMzZweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGNvbG9yOiByZ2JhKDEwLCAyNSwgNDEsIDAuOCk7XHJcbn1cclxuLmZvcmdvdC1wYXNzLWJ0biB7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC42NSk7XHJcbn1cclxuLnEtaW5wdXQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbn1cclxuLmxvZ2luLWJ0biB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiAzMDBweDtcclxuICBiYWNrZ3JvdW5kOiAjMjY3Mzc4O1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG59XHJcbnAge1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC42NSk7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG59XHJcbi5zaWdudXAtYnRuIHtcclxuICBjb2xvcjogcmdiYSgxMCwgMjUsIDQxLCAwLjgpO1xyXG4gIHRleHQtc2hhZG93OiAwcHggNHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xyXG59XHJcbi5pbmxpbmUtc3R5bGUge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG48L3N0eWxlPlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImlsbHVzdHJhdGlvblwiPlxyXG4gICAgPGltZ1xyXG4gICAgICBjbGFzcz1cImlsbHVzdHJhdGlvbl9pbWdcIlxyXG4gICAgICBzcmM9XCJ+YXNzZXRzL2lsbHVzdHJhdGlvbnMvU2lnblVwLnN2Z1wiXHJcbiAgICAgIGFsdD1cIlNpZ251cCBJbGx1c3RyYXRpb25cIlxyXG4gICAgLz5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwic2lnbnVwXCI+XHJcbiAgICA8cS1pbnB1dCByb3VuZGVkIG91dGxpbmVkIHYtbW9kZWw9XCJuYW1lXCIgbGFiZWw9XCJOYW1lXCIgLz5cclxuICAgIDxxLWlucHV0IHJvdW5kZWQgb3V0bGluZWQgdi1tb2RlbD1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgbGFiZWw9XCJFbWFpbFwiIC8+XHJcbiAgICA8cS1pbnB1dFxyXG4gICAgICByb3VuZGVkXHJcbiAgICAgIG91dGxpbmVkXHJcbiAgICAgIHYtbW9kZWw9XCJwYXNzd29yZFwiXHJcbiAgICAgIDp0eXBlPVwiaXNQd2QgPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgbGFiZWw9XCJQYXNzd29yZFwiXHJcbiAgICA+XHJcbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgIDxxLWljb25cclxuICAgICAgICAgIDpuYW1lPVwiaXNQd2QgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcclxuICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgQGNsaWNrPVwiaXNQd2QgPSAhaXNQd2RcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICA8L3EtaW5wdXQ+XHJcblxyXG4gICAgPHEtaW5wdXRcclxuICAgICAgcm91bmRlZFxyXG4gICAgICBvdXRsaW5lZFxyXG4gICAgICB2LW1vZGVsPVwicGFzc3dvcmRDb25maXJtXCJcclxuICAgICAgOnR5cGU9XCJpc1B3ZENvbmZpcm0gPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgbGFiZWw9XCJDb25maXJtIFBhc3N3b3JkXCJcclxuICAgID5cclxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XHJcbiAgICAgICAgPHEtaWNvblxyXG4gICAgICAgICAgOm5hbWU9XCJpc1B3ZENvbmZpcm0gPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcclxuICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgQGNsaWNrPVwiaXNQd2RDb25maXJtID0gIWlzUHdkQ29uZmlybVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC90ZW1wbGF0ZT5cclxuICAgIDwvcS1pbnB1dD5cclxuICAgIDxxLWJ0biBjbGFzcz1cInNpZ251cC1idG5cIiBAY2xpY2s9XCJvblNpZ251cFwiIGxhYmVsPVwiU2lnbiBVcFwiIC8+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaW5saW5lLXN0eWxlXCI+XHJcbiAgICAgIDxwPkFscmVhZHkgaGF2ZSBhbiBhY2NvdW50PzwvcD5cclxuICAgICAgPHEtYnRuXHJcbiAgICAgICAgY2xhc3M9XCJsb2dpbi1idG5cIlxyXG4gICAgICAgIGZsYXRcclxuICAgICAgICBsYWJlbD1cIkxvZyBpblwiXHJcbiAgICAgICAgQGNsaWNrPVwidGhpcy4kZW1pdCgnZW1pdExvZ2luJylcIlxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyB1c2VVc2VyU3RvcmUgfSBmcm9tIFwiLi4vLi4vc3RvcmVzL1VzZXJTdG9yZVwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogXCJTaWdudXBQYWdlXCIsXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgICBwYXNzd29yZDogXCJcIixcclxuICAgICAgcGFzc3dvcmRDb25maXJtOiBcIlwiLFxyXG4gICAgICBpc1B3ZDogdHJ1ZSxcclxuICAgICAgaXNQd2RDb25maXJtOiB0cnVlLFxyXG4gICAgICB1c2VVc2VyOiB1c2VVc2VyU3RvcmUoKSxcclxuICAgIH07XHJcbiAgfSxcclxuICBlbWl0czogW1wiZW1pdExvZ2luXCJdLFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGFzeW5jIG9uU2lnbnVwKCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICBlbWFpbDogdGhpcy5lbWFpbCxcclxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxyXG4gICAgICAgICAgcGFzc3dvcmRDb25maXJtOiB0aGlzLnBhc3N3b3JkQ29uZmlybSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5wb3N0KFwiL3VzZXJzL3NpZ251cFwiLCBkYXRhKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2tlblwiLCByZXMuZGF0YS50b2tlbik7XHJcbiAgICAgICAgICB0aGlzLiRhcGkuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bXHJcbiAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiXHJcbiAgICAgICAgICBdID0gYEJlYXJlciAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIil9YDtcclxuICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKFwiL1wiKTtcclxuICAgICAgICAgIHRoaXMudXNlVXNlci5zZXRVc2VyKHJlcy5kYXRhLmRhdGEudXNlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5pbGx1c3RyYXRpb24ge1xyXG4gIGhlaWdodDogMzB2aDtcclxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoI2JiZWFlYywgI2VlZWVlZSA3NSUpO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG4uc2lnbnVwIHtcclxuICBwYWRkaW5nOiAwIDI1cHggMjBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDIwcHg7XHJcbn1cclxuLnEtaW5wdXQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbn1cclxuXHJcbi5zaWdudXBfX2hlYWRlciB7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbiAgZm9udC1zaXplOiAzNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC44KTtcclxufVxyXG5cclxuLnNpZ251cC1idG4ge1xyXG4gIC8qIHdpZHRoOiAzNDBweDsgKi9cclxuICB3aWR0aDogMTAwJTtcclxuICBtYXgtd2lkdGg6IDMwMHB4O1xyXG4gIGhlaWdodDogNTZweDtcclxuICBiYWNrZ3JvdW5kOiAjMjY3Mzc4O1xyXG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSk7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbn1cclxuLmlubGluZS1zdHlsZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbnAge1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC42NSk7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG59XHJcbi5sb2dpbi1idG4ge1xyXG4gIGNvbG9yOiByZ2JhKDEwLCAyNSwgNDEsIDAuOCk7XHJcbiAgdGV4dC1zaGFkb3c6IDBweCA0cHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJpbGx1c3RyYXRpb25cIj5cclxuICAgIDxpbWdcclxuICAgICAgY2xhc3M9XCJpbGx1c3RyYXRpb25faW1nXCJcclxuICAgICAgc3JjPVwifmFzc2V0cy9pbGx1c3RyYXRpb25zL0ZvcmdvdFBhc3N3b3JkLnN2Z1wiXHJcbiAgICAgIGFsdD1cIkZvcm9ndCBQYXNzd29yZCBJbGx1c3RyYXRpb25cIlxyXG4gICAgLz5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiZm9yZ290LXBhc3N3b3JkXCI+XHJcbiAgICA8aDMgY2xhc3M9XCJmb3Jnb3QtcGFzc3dvcmRfX2hlYWRlclwiPkZvcmdvdCBQYXNzd29yZD88L2gzPlxyXG4gICAgPHA+RW50ZXIgeW91ciBlbWFpbCBhZGRyZXNzIHRvIHJldHJpZXZlIHlvdXIgcGFzc3dvcmQ8L3A+XHJcbiAgICA8cS1pbnB1dCByb3VuZGVkIG91dGxpbmVkIHYtbW9kZWw9XCJlbWFpbFwiIHR5cGU9XCJlbWFpbFwiIGxhYmVsPVwiRW1haWxcIiAvPlxyXG4gICAgPHEtYnRuIGNsYXNzPVwiZm9yZ290LXBhc3N3b3JkLWJ0blwiIEBjbGljaz1cIm9uU2VuZENvZGVcIiBsYWJlbD1cIlNlbmQgQ29kZVwiIC8+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaW5saW5lLXN0eWxlXCI+XHJcbiAgICAgIDxwPkdvIGJhY2sgdG88L3A+XHJcbiAgICAgIDxxLWJ0blxyXG4gICAgICAgIGNsYXNzPVwibG9naW4tYnRuXCJcclxuICAgICAgICBmbGF0XHJcbiAgICAgICAgbGFiZWw9XCJMb2cgSW5cIlxyXG4gICAgICAgIEBjbGljaz1cInRoaXMuJGVtaXQoJ2VtaXRMb2dpbicpXCJcclxuICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiRm9yZ290UGFzc3dvcmRQYWdlXCIsXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGVtaXRzOiBbXCJlbWl0TG9naW5cIl0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgb25TZW5kQ29kZSgpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgZW1haWw6IHRoaXMuZW1haWwsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4uaWxsdXN0cmF0aW9uIHtcclxuICBoZWlnaHQ6IDQwdmg7XHJcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KCNiYmVhZWMsICNlZWVlZWUgNzUlKTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5mb3Jnb3QtcGFzc3dvcmQge1xyXG4gIHBhZGRpbmc6IDAgMjVweCAyNXB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMjBweDtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuLmZvcmdvdC1wYXNzd29yZF9faGVhZGVyIHtcclxuICBtYXJnaW46IDBweDtcclxuICBmb250LXNpemU6IDM2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBjb2xvcjogcmdiYSgxMCwgMjUsIDQxLCAwLjgpO1xyXG59XHJcbi5xLWlucHV0IHtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXgtd2lkdGg6IDUwMHB4O1xyXG59XHJcbi5mb3Jnb3QtcGFzc3dvcmQtYnRuIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXgtd2lkdGg6IDMwMHB4O1xyXG4gIGJhY2tncm91bmQ6ICMyNjczNzg7XHJcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcclxufVxyXG4uaW5saW5lLXN0eWxlIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxucCB7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBjb2xvcjogcmdiYSgxMCwgMjUsIDQxLCAwLjY1KTtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5sb2dpbi1idG4ge1xyXG4gIGNvbG9yOiByZ2JhKDEwLCAyNSwgNDEsIDAuOCk7XHJcbiAgdGV4dC1zaGFkb3c6IDBweCA0cHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJlbXB0eS1zdGF0ZVwiPlxyXG4gICAgPGltZyA6c3JjPVwiYH5hc3NldHMvaWxsdXN0cmF0aW9ucy8ke2ltYWdlfWBcIiBhbHQ9XCJcIiAvPlxyXG4gICAgPGRpdiBjbGFzcz1cImVtcHR5LXN0YXRlX190aXRsZVwiPnt7IHRpdGxlIH19PC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibWVzc2FnZVwiPlxyXG4gICAgICB7eyBtZXNzYWdlIH19XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXY+XHJcbiAgICAgIDxxLWJ0blxyXG4gICAgICAgIGNsYXNzPVwiYnRuXCJcclxuICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICMyNjczNzg7IGNvbG9yOiAjZmZmXCJcclxuICAgICAgICBsYWJlbD1cIkxvZyBJblwiXHJcbiAgICAgICAgQGNsaWNrPVwib25Mb2dpblwiXHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8cS1idG5cclxuICAgICAgICBjbGFzcz1cImJ0blwiXHJcbiAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMjY3Mzc4OyBjb2xvcjogI2ZmZlwiXHJcbiAgICAgICAgbGFiZWw9XCJTaWduIFVwXCJcclxuICAgICAgICBAY2xpY2s9XCJvblNpZ251cFwiXHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8cS1kaWFsb2cgdi1tb2RlbD1cInNob3dBdXRoRGlhbG9nXCIgc2VhbWxlc3MgcG9zaXRpb249XCJib3R0b21cIj5cclxuICAgICAgICA8cS1jYXJkIGNsYXNzPVwicS1jYXJkX19oZWlnaHRcIj5cclxuICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1wYi1ub25lXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+e3sgdGhpcy5zdGF0ZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICA8cS1zcGFjZSAvPlxyXG4gICAgICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCByb3VuZCBkZW5zZSB2LWNsb3NlLXBvcHVwIC8+XHJcbiAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG5cclxuICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICAgICAgPExvZ2luRGlhbG9nXHJcbiAgICAgICAgICAgICAgdi1pZj1cInRoaXMuc3RhdGUgPT09ICdMb2cgSW4nXCJcclxuICAgICAgICAgICAgICBAZW1pdEZvcmdvdFBhc3N3b3JkPVwib25Gb3Jnb3RQYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgQGVtaXRTaWdudXA9XCJvblNpZ251cFwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxTaWdudXBEaWFsb2dcclxuICAgICAgICAgICAgICB2LWlmPVwidGhpcy5zdGF0ZSA9PT0gJ1NpZ24gVXAnXCJcclxuICAgICAgICAgICAgICBAZW1pdExvZ2luPVwib25Mb2dpblwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxGb3Jnb3RQYXNzd29yZERpYWxvZ1xyXG4gICAgICAgICAgICAgIHYtaWY9XCJ0aGlzLnN0YXRlID09PSAnRm9yZ290IFBhc3N3b3JkJ1wiXHJcbiAgICAgICAgICAgICAgQGVtaXRMb2dpbj1cIm9uTG9naW5cIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICA8L3EtY2FyZD5cclxuICAgICAgPC9xLWRpYWxvZz5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IExvZ2luRGlhbG9nIGZyb20gXCJzcmMvY29tcG9uZW50cy9jdXN0b21lci9Mb2dpbkRpYWxvZy52dWVcIjtcclxuaW1wb3J0IFNpZ251cERpYWxvZyBmcm9tIFwic3JjL2NvbXBvbmVudHMvY3VzdG9tZXIvU2lnbnVwRGlhbG9nLnZ1ZVwiO1xyXG5pbXBvcnQgRm9yZ290UGFzc3dvcmREaWFsb2cgZnJvbSBcIi4vRm9yZ290UGFzc3dvcmREaWFsb2cudnVlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogXCJFbXB0eVN0YXRlXCIsXHJcbiAgcHJvcHM6IFtcImltYWdlXCIsIFwidGl0bGVcIiwgXCJtZXNzYWdlXCJdLFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzaG93QXV0aERpYWxvZzogZmFsc2UsXHJcbiAgICAgIHN0YXRlOiBcIlwiLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIExvZ2luRGlhbG9nLFxyXG4gICAgU2lnbnVwRGlhbG9nLFxyXG4gICAgRm9yZ290UGFzc3dvcmREaWFsb2csXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBvbkxvZ2luKCkge1xyXG4gICAgICB0aGlzLnN0YXRlID0gXCJMb2cgSW5cIjtcclxuICAgICAgdGhpcy5zaG93QXV0aERpYWxvZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgb25TaWdudXAoKSB7XHJcbiAgICAgIHRoaXMuc3RhdGUgPSBcIlNpZ24gVXBcIjtcclxuICAgICAgdGhpcy5zaG93QXV0aERpYWxvZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgb25Gb3Jnb3RQYXNzd29yZCgpIHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IFwiRm9yZ290IFBhc3N3b3JkXCI7XHJcbiAgICAgIHRoaXMuc2hvd0F1dGhEaWFsb2cgPSB0cnVlO1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5lbXB0eS1zdGF0ZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHBhZGRpbmc6IDAgNTBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLmVtcHR5LXN0YXRlX190aXRsZSB7XHJcbiAgZm9udC1zaXplOiAzMHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbn1cclxuLnEtY2FyZF9faGVpZ2h0IHtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSA1MHB4KSAhaW1wb3J0YW50O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XHJcbn1cclxuXHJcbi5idG4ge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogMzAwcHg7XHJcbiAgYmFja2dyb3VuZDogIzI2NzM3ODtcclxuICBjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUsIDAuOSk7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG5cclxuLm1lc3NhZ2Uge1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxufVxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOlsiX3NmY19tYWluIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9ob2lzdGVkXzIiLCJfaG9pc3RlZF8zIiwiX2hvaXN0ZWRfNCIsIl93aXRoU2NvcGVJZCIsIl9ob2lzdGVkXzEiLCJfY3JlYXRlVk5vZGUiLCJfaW1wb3J0c18wIiwiX2hvaXN0ZWRfNSIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVCbG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBK0NBLE1BQUtBLGNBQVU7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLE9BQU87QUFDTCxXQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEs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
