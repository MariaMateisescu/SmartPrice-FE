import { _ as _export_sfc, bA as useUserStore, c6 as useQuasar, o as openBlock, c as createElementBlock, a as createBaseVNode, aa as createVNode, b5 as withCtx, bC as QIcon, bE as QBtn, Q as Fragment, aH as pushScopeId, aF as popScopeId, aL as resolveComponent, M as toDisplayString, b7 as withDirectives, a2 as createBlock, a3 as createCommentVNode, d as normalizeClass } from "./index.0ce84b9b.js";
import { Q as QSpace, a as QDialog } from "./QDialog.27e255cd.js";
import { Q as QCard, a as QCardSection } from "./QCard.511536db.js";
import { C as ClosePopup } from "./ClosePopup.fcd43a0a.js";
import { Q as QInput } from "./QInput.4104ffc2.js";
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
      useUser: useUserStore(),
      $q: useQuasar(),
      emailRules: [
        (val) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          val
        ) || "Please enter a valid email"
      ]
    };
  },
  emits: ["emitForgotPassword", "emitSignup"],
  methods: {
    async login() {
      this.$refs.emailRef.validate();
      if (!this.$refs.emailRef.hasError) {
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
          this.$q.notify({
            type: "negative",
            position: "top",
            message: "Invalid email or password!",
            color: "negative",
            timeout: "2500"
          });
        }
      }
    }
  }
};
const _withScopeId$2 = (n) => (pushScopeId("data-v-5bf7c669"), n = n(), popScopeId(), n);
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
        "no-error-icon": "",
        "lazy-rules": "ondemand",
        outlined: "",
        modelValue: $data.email,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.email = $event),
        type: "email",
        label: "Email",
        rules: $data.emailRules,
        ref: "emailRef"
      }, null, 8, ["modelValue", "rules"]),
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
var LoginDialog = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-5bf7c669"], ["__file", "LoginDialog.vue"]]);
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
      $q: useQuasar(),
      nameRules: [
        (val) => val !== null && val !== "" || "Please type your name"
      ],
      emailRules: [
        (val) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          val
        ) || "Please enter a valid email"
      ],
      passwordRules: [
        (val) => val.length >= 6 || "Password should have at least 6 characters"
      ]
    };
  },
  emits: ["emitLogin"],
  methods: {
    async onSignup() {
      this.$refs.nameRef.validate();
      this.$refs.emailRef.validate();
      this.$refs.passwordRef.validate();
      this.$refs.passwordConfirmRef.validate();
      if (!this.$refs.nameRef.hasError && !this.$refs.emailRef.hasError && !this.$refs.passwordRef.hasError && !this.$refs.passwordConfirmRef.hasError) {
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
          this.$q.notify({
            type: "negative",
            position: "top",
            message: "Something went wrong!",
            color: "negative",
            timeout: "2500"
          });
        }
      }
    }
  },
  computed: {
    passwordConfirmRules() {
      return [
        (val) => val.length >= 6 || "Password should have at least 6 characters",
        (val) => val === this.password || "Passwords do not match"
      ];
    }
  }
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-6c072a06"), n = n(), popScopeId(), n);
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
        "no-error-icon": "",
        "lazy-rules": "ondemand",
        outlined: "",
        modelValue: $data.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.name = $event),
        label: "Name",
        rules: $data.nameRules,
        ref: "nameRef"
      }, null, 8, ["modelValue", "rules"]),
      createVNode(QInput, {
        rounded: "",
        "no-error-icon": "",
        "lazy-rules": "ondemand",
        outlined: "",
        modelValue: $data.email,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.email = $event),
        type: "email",
        label: "Email",
        rules: $data.emailRules,
        ref: "emailRef"
      }, null, 8, ["modelValue", "rules"]),
      createVNode(QInput, {
        rounded: "",
        "no-error-icon": "",
        "lazy-rules": "ondemand",
        outlined: "",
        modelValue: $data.password,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.password = $event),
        type: $data.isPwd ? "password" : "text",
        label: "Password",
        rules: $data.passwordRules,
        ref: "passwordRef"
      }, {
        append: withCtx(() => [
          createVNode(QIcon, {
            name: $data.isPwd ? "visibility_off" : "visibility",
            class: "cursor-pointer",
            onClick: _cache[2] || (_cache[2] = ($event) => $data.isPwd = !$data.isPwd)
          }, null, 8, ["name"])
        ]),
        _: 1
      }, 8, ["modelValue", "type", "rules"]),
      createVNode(QInput, {
        rounded: "",
        "no-error-icon": "",
        "lazy-rules": "ondemand",
        outlined: "",
        modelValue: $data.passwordConfirm,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.passwordConfirm = $event),
        type: $data.isPwdConfirm ? "password" : "text",
        label: "Confirm Password",
        rules: $options.passwordConfirmRules,
        ref: "passwordConfirmRef"
      }, {
        append: withCtx(() => [
          createVNode(QIcon, {
            name: $data.isPwdConfirm ? "visibility_off" : "visibility",
            class: "cursor-pointer",
            onClick: _cache[4] || (_cache[4] = ($event) => $data.isPwdConfirm = !$data.isPwdConfirm)
          }, null, 8, ["name"])
        ]),
        _: 1
      }, 8, ["modelValue", "type", "rules"]),
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
var SignupDialog = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-6c072a06"], ["__file", "SignupDialog.vue"]]);
var ForgotPasswordDialog_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = {
  name: "ForgotPasswordPage",
  data() {
    return {
      email: "",
      $q: useQuasar(),
      emailRules: [
        (val) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          val
        ) || "Please enter a valid email"
      ]
    };
  },
  emits: ["emitLogin"],
  methods: {
    async onSendCode() {
      this.$refs.emailRef.validate();
      if (!this.$refs.emailRef.hasError) {
        try {
          const data = {
            email: this.email
          };
          const res = await this.$api.post("users/forgotPassword", data);
          if (res.data.status === "success") {
            this.$q.notify({
              type: "positive",
              position: "top",
              message: "Code sent to the provided email.",
              color: "positive",
              timeout: "2500"
            });
          }
        } catch (error) {
          this.$q.notify({
            type: "negative",
            position: "top",
            message: "Something went wrong!",
            color: "negative",
            timeout: "2500"
          });
        }
      }
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-af22cdea"), n = n(), popScopeId(), n);
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
const _hoisted_5 = { class: "inline-style" };
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, "Go back to", -1));
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1$1,
    createBaseVNode("div", _hoisted_2$1, [
      _hoisted_3$1,
      _hoisted_4$1,
      createVNode(QInput, {
        rounded: "",
        "no-error-icon": "",
        "lazy-rules": "ondemand",
        outlined: "",
        modelValue: $data.email,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.email = $event),
        type: "email",
        label: "Email",
        rules: $data.emailRules,
        ref: "emailRef"
      }, null, 8, ["modelValue", "rules"]),
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
          onClick: _cache[1] || (_cache[1] = ($event) => this.$emit("emitLogin"))
        })
      ])
    ])
  ], 64);
}
var ForgotPasswordDialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-af22cdea"], ["__file", "ForgotPasswordDialog.vue"]]);
var EmptyState_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  name: "EmptyState",
  props: ["image", "title", "message", "hasTabs"],
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
const _hoisted_1 = ["src"];
const _hoisted_2 = { class: "empty-state__title" };
const _hoisted_3 = { class: "message" };
const _hoisted_4 = { class: "text-h6" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_LoginDialog = resolveComponent("LoginDialog");
  const _component_SignupDialog = resolveComponent("SignupDialog");
  const _component_ForgotPasswordDialog = resolveComponent("ForgotPasswordDialog");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["empty-state", { "with-tabs-height": $props.hasTabs, "without-tabs-height": !$props.hasTabs }])
  }, [
    createBaseVNode("img", {
      src: `src/assets/illustrations/${$props.image}`,
      alt: ""
    }, null, 8, _hoisted_1),
    createBaseVNode("div", _hoisted_2, toDisplayString($props.title), 1),
    createBaseVNode("div", _hoisted_3, toDisplayString($props.message), 1),
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
                  createBaseVNode("div", _hoisted_4, toDisplayString(this.state), 1),
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
  ], 2);
}
var EmptyState = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2415904c"], ["__file", "EmptyState.vue"]]);
export { EmptyState as E };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1wdHlTdGF0ZS5kMzBkNzUyMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY3VzdG9tZXIvTG9naW5EaWFsb2cudnVlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY3VzdG9tZXIvU2lnbnVwRGlhbG9nLnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2N1c3RvbWVyL0ZvcmdvdFBhc3N3b3JkRGlhbG9nLnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2N1c3RvbWVyL0VtcHR5U3RhdGUudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiaWxsdXN0cmF0aW9uXCI+XHJcbiAgICA8aW1nXHJcbiAgICAgIGNsYXNzPVwiaWxsdXN0cmF0aW9uX2ltZ1wiXHJcbiAgICAgIHNyYz1cIn5hc3NldHMvaWxsdXN0cmF0aW9ucy9Mb2dpbi5zdmdcIlxyXG4gICAgICBhbHQ9XCJMb2dpbiBJbGx1c3RyYXRpb25cIlxyXG4gICAgLz5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibG9naW5cIj5cclxuICAgIDxxLWlucHV0XHJcbiAgICAgIHJvdW5kZWRcclxuICAgICAgbm8tZXJyb3ItaWNvblxyXG4gICAgICBsYXp5LXJ1bGVzPVwib25kZW1hbmRcIlxyXG4gICAgICBvdXRsaW5lZFxyXG4gICAgICB2LW1vZGVsPVwiZW1haWxcIlxyXG4gICAgICB0eXBlPVwiZW1haWxcIlxyXG4gICAgICBsYWJlbD1cIkVtYWlsXCJcclxuICAgICAgOnJ1bGVzPVwiZW1haWxSdWxlc1wiXHJcbiAgICAgIHJlZj1cImVtYWlsUmVmXCJcclxuICAgIC8+XHJcbiAgICA8cS1pbnB1dFxyXG4gICAgICByb3VuZGVkXHJcbiAgICAgIG91dGxpbmVkXHJcbiAgICAgIHYtbW9kZWw9XCJwYXNzd29yZFwiXHJcbiAgICAgIDp0eXBlPVwiaXNQd2QgPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgbGFiZWw9XCJQYXNzd29yZFwiXHJcbiAgICA+XHJcbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgIDxxLWljb25cclxuICAgICAgICAgIDpuYW1lPVwiaXNQd2QgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcclxuICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgQGNsaWNrPVwiaXNQd2QgPSAhaXNQd2RcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICA8L3EtaW5wdXQ+XHJcbiAgICA8cS1idG5cclxuICAgICAgZmxhdFxyXG4gICAgICBjbGFzcz1cImZvcmdvdC1wYXNzLWJ0blwiXHJcbiAgICAgIGxhYmVsPVwiRm9yZ290IHBhc3N3b3JkXCJcclxuICAgICAgQGNsaWNrPVwidGhpcy4kZW1pdCgnZW1pdEZvcmdvdFBhc3N3b3JkJylcIlxyXG4gICAgLz5cclxuICAgIDxxLWJ0biBjbGFzcz1cImxvZ2luLWJ0blwiIEBjbGljaz1cImxvZ2luXCIgbGFiZWw9XCJMb2cgSW5cIiAvPlxyXG4gICAgPGRpdiBjbGFzcz1cImlubGluZS1zdHlsZVwiPlxyXG4gICAgICA8cD5Eb24ndCBoYXZlIGFuIGFjY291bnQ/PC9wPlxyXG4gICAgICA8cS1idG5cclxuICAgICAgICBjbGFzcz1cInNpZ251cC1idG5cIlxyXG4gICAgICAgIGZsYXRcclxuICAgICAgICBsYWJlbD1cIlNpZ24gVXBcIlxyXG4gICAgICAgIEBjbGljaz1cInRoaXMuJGVtaXQoJ2VtaXRTaWdudXAnKVwiXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IHVzZVVzZXJTdG9yZSB9IGZyb20gXCIuLi8uLi9zdG9yZXMvVXNlclN0b3JlXCI7XHJcbmltcG9ydCB1c2VRdWFzYXIgZnJvbSBcInF1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLXF1YXNhci5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiTG9naW5QYWdlXCIsXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgICBwYXNzd29yZDogXCJcIixcclxuICAgICAgaXNQd2Q6IHRydWUsXHJcbiAgICAgIHVzZVVzZXI6IHVzZVVzZXJTdG9yZSgpLFxyXG4gICAgICAkcTogdXNlUXVhc2FyKCksXHJcbiAgICAgIGVtYWlsUnVsZXM6IFtcclxuICAgICAgICAodmFsKSA9PlxyXG4gICAgICAgICAgL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC8udGVzdChcclxuICAgICAgICAgICAgdmFsXHJcbiAgICAgICAgICApIHx8IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWxcIixcclxuICAgICAgXSxcclxuICAgIH07XHJcbiAgfSxcclxuICBlbWl0czogW1wiZW1pdEZvcmdvdFBhc3N3b3JkXCIsIFwiZW1pdFNpZ251cFwiXSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBhc3luYyBsb2dpbigpIHtcclxuICAgICAgdGhpcy4kcmVmcy5lbWFpbFJlZi52YWxpZGF0ZSgpO1xyXG4gICAgICBpZiAoIXRoaXMuJHJlZnMuZW1haWxSZWYuaGFzRXJyb3IpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgICAgZW1haWw6IHRoaXMuZW1haWwsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5wb3N0KFwiL3VzZXJzL2xvZ2luXCIsIGRhdGEpO1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgdGhpcy4kcS5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcclxuICAgICAgICAgICAgICBwb3NpdGlvbjogXCJ0b3BcIixcclxuICAgICAgICAgICAgICBtZXNzYWdlOiBcIkxvZ2dlZCBpbiBzdWNjZXNzZnVsbHlcIixcclxuICAgICAgICAgICAgICBjb2xvcjogXCJwb3NpdGl2ZVwiLFxyXG4gICAgICAgICAgICAgIHRpbWVvdXQ6IFwiMjUwMFwiLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2tlblwiLCByZXMuZGF0YS50b2tlbik7XHJcbiAgICAgICAgICAgIHRoaXMudXNlVXNlci5zZXRVc2VyKHJlcy5kYXRhLmRhdGEudXNlcik7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwaS5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbltcclxuICAgICAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIlxyXG4gICAgICAgICAgICBdID0gYEJlYXJlciAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIil9YDtcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmRhdGEudXNlci5yb2xlID09PSBcImFkbWluXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaChcIi9hZG1pbmlzdHJhdGlvblwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaChcIi9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgdGhpcy4kcS5ub3RpZnkoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQhXCIsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcIm5lZ2F0aXZlXCIsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IFwiMjUwMFwiLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLmlsbHVzdHJhdGlvbiB7XHJcbiAgaGVpZ2h0OiA0MHZoO1xyXG4gIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudCgjYmJlYWVjLCAjZWVlZWVlIDc1JSk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5sb2dpbiB7XHJcbiAgcGFkZGluZzogMCAyNXB4IDI1cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiA1cHg7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcbi5sb2dpbl9faGVhZGVyIHtcclxuICBtYXJnaW46IDBweDtcclxuICBmb250LXNpemU6IDM2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBjb2xvcjogcmdiYSgxMCwgMjUsIDQxLCAwLjgpO1xyXG59XHJcbi5mb3Jnb3QtcGFzcy1idG4ge1xyXG4gIGNvbG9yOiByZ2JhKDEwLCAyNSwgNDEsIDAuNjUpO1xyXG59XHJcbi5xLWlucHV0IHtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXgtd2lkdGg6IDUwMHB4O1xyXG59XHJcbi5sb2dpbi1idG4ge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogMzAwcHg7XHJcbiAgYmFja2dyb3VuZDogIzI2NzM3ODtcclxuICBjb2xvcjogI2ZmZjtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcclxufVxyXG5wIHtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIGNvbG9yOiByZ2JhKDEwLCAyNSwgNDEsIDAuNjUpO1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgbWFyZ2luLWJvdHRvbTogMDtcclxufVxyXG4uc2lnbnVwLWJ0biB7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC44KTtcclxuICB0ZXh0LXNoYWRvdzogMHB4IDRweCA0cHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcclxufVxyXG4uaW5saW5lLXN0eWxlIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJpbGx1c3RyYXRpb25cIj5cclxuICAgIDxpbWdcclxuICAgICAgY2xhc3M9XCJpbGx1c3RyYXRpb25faW1nXCJcclxuICAgICAgc3JjPVwifmFzc2V0cy9pbGx1c3RyYXRpb25zL1NpZ25VcC5zdmdcIlxyXG4gICAgICBhbHQ9XCJTaWdudXAgSWxsdXN0cmF0aW9uXCJcclxuICAgIC8+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cInNpZ251cFwiPlxyXG4gICAgPHEtaW5wdXRcclxuICAgICAgcm91bmRlZFxyXG4gICAgICBuby1lcnJvci1pY29uXHJcbiAgICAgIGxhenktcnVsZXM9XCJvbmRlbWFuZFwiXHJcbiAgICAgIG91dGxpbmVkXHJcbiAgICAgIHYtbW9kZWw9XCJuYW1lXCJcclxuICAgICAgbGFiZWw9XCJOYW1lXCJcclxuICAgICAgOnJ1bGVzPVwibmFtZVJ1bGVzXCJcclxuICAgICAgcmVmPVwibmFtZVJlZlwiXHJcbiAgICAvPlxyXG4gICAgPHEtaW5wdXRcclxuICAgICAgcm91bmRlZFxyXG4gICAgICBuby1lcnJvci1pY29uXHJcbiAgICAgIGxhenktcnVsZXM9XCJvbmRlbWFuZFwiXHJcbiAgICAgIG91dGxpbmVkXHJcbiAgICAgIHYtbW9kZWw9XCJlbWFpbFwiXHJcbiAgICAgIHR5cGU9XCJlbWFpbFwiXHJcbiAgICAgIGxhYmVsPVwiRW1haWxcIlxyXG4gICAgICA6cnVsZXM9XCJlbWFpbFJ1bGVzXCJcclxuICAgICAgcmVmPVwiZW1haWxSZWZcIlxyXG4gICAgLz5cclxuICAgIDxxLWlucHV0XHJcbiAgICAgIHJvdW5kZWRcclxuICAgICAgbm8tZXJyb3ItaWNvblxyXG4gICAgICBsYXp5LXJ1bGVzPVwib25kZW1hbmRcIlxyXG4gICAgICBvdXRsaW5lZFxyXG4gICAgICB2LW1vZGVsPVwicGFzc3dvcmRcIlxyXG4gICAgICA6dHlwZT1cImlzUHdkID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0J1wiXHJcbiAgICAgIGxhYmVsPVwiUGFzc3dvcmRcIlxyXG4gICAgICA6cnVsZXM9XCJwYXNzd29yZFJ1bGVzXCJcclxuICAgICAgcmVmPVwicGFzc3dvcmRSZWZcIlxyXG4gICAgPlxyXG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cclxuICAgICAgICA8cS1pY29uXHJcbiAgICAgICAgICA6bmFtZT1cImlzUHdkID8gJ3Zpc2liaWxpdHlfb2ZmJyA6ICd2aXNpYmlsaXR5J1wiXHJcbiAgICAgICAgICBjbGFzcz1cImN1cnNvci1wb2ludGVyXCJcclxuICAgICAgICAgIEBjbGljaz1cImlzUHdkID0gIWlzUHdkXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L3RlbXBsYXRlPlxyXG4gICAgPC9xLWlucHV0PlxyXG5cclxuICAgIDxxLWlucHV0XHJcbiAgICAgIHJvdW5kZWRcclxuICAgICAgbm8tZXJyb3ItaWNvblxyXG4gICAgICBsYXp5LXJ1bGVzPVwib25kZW1hbmRcIlxyXG4gICAgICBvdXRsaW5lZFxyXG4gICAgICB2LW1vZGVsPVwicGFzc3dvcmRDb25maXJtXCJcclxuICAgICAgOnR5cGU9XCJpc1B3ZENvbmZpcm0gPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgbGFiZWw9XCJDb25maXJtIFBhc3N3b3JkXCJcclxuICAgICAgOnJ1bGVzPVwicGFzc3dvcmRDb25maXJtUnVsZXNcIlxyXG4gICAgICByZWY9XCJwYXNzd29yZENvbmZpcm1SZWZcIlxyXG4gICAgPlxyXG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cclxuICAgICAgICA8cS1pY29uXHJcbiAgICAgICAgICA6bmFtZT1cImlzUHdkQ29uZmlybSA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eSdcIlxyXG4gICAgICAgICAgY2xhc3M9XCJjdXJzb3ItcG9pbnRlclwiXHJcbiAgICAgICAgICBAY2xpY2s9XCJpc1B3ZENvbmZpcm0gPSAhaXNQd2RDb25maXJtXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L3RlbXBsYXRlPlxyXG4gICAgPC9xLWlucHV0PlxyXG4gICAgPHEtYnRuIGNsYXNzPVwic2lnbnVwLWJ0blwiIEBjbGljaz1cIm9uU2lnbnVwXCIgbGFiZWw9XCJTaWduIFVwXCIgLz5cclxuICAgIDxkaXYgY2xhc3M9XCJpbmxpbmUtc3R5bGVcIj5cclxuICAgICAgPHA+QWxyZWFkeSBoYXZlIGFuIGFjY291bnQ/PC9wPlxyXG4gICAgICA8cS1idG5cclxuICAgICAgICBjbGFzcz1cImxvZ2luLWJ0blwiXHJcbiAgICAgICAgZmxhdFxyXG4gICAgICAgIGxhYmVsPVwiTG9nIGluXCJcclxuICAgICAgICBAY2xpY2s9XCJ0aGlzLiRlbWl0KCdlbWl0TG9naW4nKVwiXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IHVzZVVzZXJTdG9yZSB9IGZyb20gXCIuLi8uLi9zdG9yZXMvVXNlclN0b3JlXCI7XHJcbmltcG9ydCB1c2VRdWFzYXIgZnJvbSBcInF1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLXF1YXNhci5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiU2lnbnVwUGFnZVwiLFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICBlbWFpbDogXCJcIixcclxuICAgICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICAgIHBhc3N3b3JkQ29uZmlybTogXCJcIixcclxuICAgICAgaXNQd2Q6IHRydWUsXHJcbiAgICAgIGlzUHdkQ29uZmlybTogdHJ1ZSxcclxuICAgICAgdXNlVXNlcjogdXNlVXNlclN0b3JlKCksXHJcbiAgICAgICRxOiB1c2VRdWFzYXIoKSxcclxuICAgICAgbmFtZVJ1bGVzOiBbXHJcbiAgICAgICAgKHZhbCkgPT4gKHZhbCAhPT0gbnVsbCAmJiB2YWwgIT09IFwiXCIpIHx8IFwiUGxlYXNlIHR5cGUgeW91ciBuYW1lXCIsXHJcbiAgICAgIF0sXHJcbiAgICAgIGVtYWlsUnVsZXM6IFtcclxuICAgICAgICAodmFsKSA9PlxyXG4gICAgICAgICAgL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC8udGVzdChcclxuICAgICAgICAgICAgdmFsXHJcbiAgICAgICAgICApIHx8IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWxcIixcclxuICAgICAgXSxcclxuICAgICAgcGFzc3dvcmRSdWxlczogW1xyXG4gICAgICAgICh2YWwpID0+XHJcbiAgICAgICAgICB2YWwubGVuZ3RoID49IDYgfHwgXCJQYXNzd29yZCBzaG91bGQgaGF2ZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnNcIixcclxuICAgICAgXSxcclxuICAgIH07XHJcbiAgfSxcclxuICBlbWl0czogW1wiZW1pdExvZ2luXCJdLFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGFzeW5jIG9uU2lnbnVwKCkge1xyXG4gICAgICB0aGlzLiRyZWZzLm5hbWVSZWYudmFsaWRhdGUoKTtcclxuICAgICAgdGhpcy4kcmVmcy5lbWFpbFJlZi52YWxpZGF0ZSgpO1xyXG4gICAgICB0aGlzLiRyZWZzLnBhc3N3b3JkUmVmLnZhbGlkYXRlKCk7XHJcbiAgICAgIHRoaXMuJHJlZnMucGFzc3dvcmRDb25maXJtUmVmLnZhbGlkYXRlKCk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICAhdGhpcy4kcmVmcy5uYW1lUmVmLmhhc0Vycm9yICYmXHJcbiAgICAgICAgIXRoaXMuJHJlZnMuZW1haWxSZWYuaGFzRXJyb3IgJiZcclxuICAgICAgICAhdGhpcy4kcmVmcy5wYXNzd29yZFJlZi5oYXNFcnJvciAmJlxyXG4gICAgICAgICF0aGlzLiRyZWZzLnBhc3N3b3JkQ29uZmlybVJlZi5oYXNFcnJvclxyXG4gICAgICApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICBlbWFpbDogdGhpcy5lbWFpbCxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkQ29uZmlybTogdGhpcy5wYXNzd29yZENvbmZpcm0sXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLnBvc3QoXCIvdXNlcnMvc2lnbnVwXCIsIGRhdGEpO1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgdGhpcy4kcS5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcclxuICAgICAgICAgICAgICBwb3NpdGlvbjogXCJ0b3BcIixcclxuICAgICAgICAgICAgICBtZXNzYWdlOiBcIkFjY291bnQgY3JlYXRlZCBzdWNjZXNzZnVsbHlcIixcclxuICAgICAgICAgICAgICBjb2xvcjogXCJwb3NpdGl2ZVwiLFxyXG4gICAgICAgICAgICAgIHRpbWVvdXQ6IFwiMjUwMFwiLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2tlblwiLCByZXMuZGF0YS50b2tlbik7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwaS5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbltcclxuICAgICAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIlxyXG4gICAgICAgICAgICBdID0gYEJlYXJlciAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIil9YDtcclxuICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goXCIvXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVzZVVzZXIuc2V0VXNlcihyZXMuZGF0YS5kYXRhLnVzZXIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBuZWdhdGl2ZSBub3RpZnlcclxuICAgICAgICAgIHRoaXMuJHEubm90aWZ5KHtcclxuICAgICAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJ0b3BcIixcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJTb21ldGhpbmcgd2VudCB3cm9uZyFcIixcclxuICAgICAgICAgICAgY29sb3I6IFwibmVnYXRpdmVcIixcclxuICAgICAgICAgICAgdGltZW91dDogXCIyNTAwXCIsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgcGFzc3dvcmRDb25maXJtUnVsZXMoKSB7XHJcbiAgICAgIHJldHVybiBbXHJcbiAgICAgICAgKHZhbCkgPT5cclxuICAgICAgICAgIHZhbC5sZW5ndGggPj0gNiB8fCBcIlBhc3N3b3JkIHNob3VsZCBoYXZlIGF0IGxlYXN0IDYgY2hhcmFjdGVyc1wiLFxyXG4gICAgICAgICh2YWwpID0+IHZhbCA9PT0gdGhpcy5wYXNzd29yZCB8fCBcIlBhc3N3b3JkcyBkbyBub3QgbWF0Y2hcIixcclxuICAgICAgXTtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4uaWxsdXN0cmF0aW9uIHtcclxuICBoZWlnaHQ6IDMwdmg7XHJcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KCNiYmVhZWMsICNlZWVlZWUgNzUlKTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuLnNpZ251cCB7XHJcbiAgcGFkZGluZzogMCAyNXB4IDIwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiA1cHg7XHJcbn1cclxuLnEtaW5wdXQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbn1cclxuXHJcbi5zaWdudXBfX2hlYWRlciB7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbiAgZm9udC1zaXplOiAzNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC44KTtcclxufVxyXG5cclxuLnNpZ251cC1idG4ge1xyXG4gIC8qIHdpZHRoOiAzNDBweDsgKi9cclxuICB3aWR0aDogMTAwJTtcclxuICBtYXgtd2lkdGg6IDMwMHB4O1xyXG4gIGhlaWdodDogNTZweDtcclxuICBiYWNrZ3JvdW5kOiAjMjY3Mzc4O1xyXG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSk7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbn1cclxuLmlubGluZS1zdHlsZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbnAge1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC42NSk7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG59XHJcbi5sb2dpbi1idG4ge1xyXG4gIGNvbG9yOiByZ2JhKDEwLCAyNSwgNDEsIDAuOCk7XHJcbiAgdGV4dC1zaGFkb3c6IDBweCA0cHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJpbGx1c3RyYXRpb25cIj5cclxuICAgIDxpbWdcclxuICAgICAgY2xhc3M9XCJpbGx1c3RyYXRpb25faW1nXCJcclxuICAgICAgc3JjPVwifmFzc2V0cy9pbGx1c3RyYXRpb25zL0ZvcmdvdFBhc3N3b3JkLnN2Z1wiXHJcbiAgICAgIGFsdD1cIkZvcm9ndCBQYXNzd29yZCBJbGx1c3RyYXRpb25cIlxyXG4gICAgLz5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiZm9yZ290LXBhc3N3b3JkXCI+XHJcbiAgICA8aDMgY2xhc3M9XCJmb3Jnb3QtcGFzc3dvcmRfX2hlYWRlclwiPkZvcmdvdCBQYXNzd29yZD88L2gzPlxyXG4gICAgPHA+RW50ZXIgeW91ciBlbWFpbCBhZGRyZXNzIHRvIHJldHJpZXZlIHlvdXIgcGFzc3dvcmQ8L3A+XHJcbiAgICA8cS1pbnB1dFxyXG4gICAgICByb3VuZGVkXHJcbiAgICAgIG5vLWVycm9yLWljb25cclxuICAgICAgbGF6eS1ydWxlcz1cIm9uZGVtYW5kXCJcclxuICAgICAgb3V0bGluZWRcclxuICAgICAgdi1tb2RlbD1cImVtYWlsXCJcclxuICAgICAgdHlwZT1cImVtYWlsXCJcclxuICAgICAgbGFiZWw9XCJFbWFpbFwiXHJcbiAgICAgIDpydWxlcz1cImVtYWlsUnVsZXNcIlxyXG4gICAgICByZWY9XCJlbWFpbFJlZlwiXHJcbiAgICAvPlxyXG4gICAgPHEtYnRuIGNsYXNzPVwiZm9yZ290LXBhc3N3b3JkLWJ0blwiIEBjbGljaz1cIm9uU2VuZENvZGVcIiBsYWJlbD1cIlNlbmQgQ29kZVwiIC8+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaW5saW5lLXN0eWxlXCI+XHJcbiAgICAgIDxwPkdvIGJhY2sgdG88L3A+XHJcbiAgICAgIDxxLWJ0blxyXG4gICAgICAgIGNsYXNzPVwibG9naW4tYnRuXCJcclxuICAgICAgICBmbGF0XHJcbiAgICAgICAgbGFiZWw9XCJMb2cgSW5cIlxyXG4gICAgICAgIEBjbGljaz1cInRoaXMuJGVtaXQoJ2VtaXRMb2dpbicpXCJcclxuICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHVzZVF1YXNhciBmcm9tIFwicXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtcXVhc2FyLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogXCJGb3Jnb3RQYXNzd29yZFBhZ2VcIixcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZW1haWw6IFwiXCIsXHJcbiAgICAgICRxOiB1c2VRdWFzYXIoKSxcclxuICAgICAgZW1haWxSdWxlczogW1xyXG4gICAgICAgICh2YWwpID0+XHJcbiAgICAgICAgICAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLy50ZXN0KFxyXG4gICAgICAgICAgICB2YWxcclxuICAgICAgICAgICkgfHwgXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbFwiLFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGVtaXRzOiBbXCJlbWl0TG9naW5cIl0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgYXN5bmMgb25TZW5kQ29kZSgpIHtcclxuICAgICAgdGhpcy4kcmVmcy5lbWFpbFJlZi52YWxpZGF0ZSgpO1xyXG4gICAgICBpZiAoIXRoaXMuJHJlZnMuZW1haWxSZWYuaGFzRXJyb3IpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgICAgZW1haWw6IHRoaXMuZW1haWwsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLnBvc3QoXCJ1c2Vycy9mb3Jnb3RQYXNzd29yZFwiLCBkYXRhKTtcclxuICAgICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHEubm90aWZ5KHtcclxuICAgICAgICAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXHJcbiAgICAgICAgICAgICAgcG9zaXRpb246IFwidG9wXCIsXHJcbiAgICAgICAgICAgICAgbWVzc2FnZTogXCJDb2RlIHNlbnQgdG8gdGhlIHByb3ZpZGVkIGVtYWlsLlwiLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiBcInBvc2l0aXZlXCIsXHJcbiAgICAgICAgICAgICAgdGltZW91dDogXCIyNTAwXCIsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICB0aGlzLiRxLm5vdGlmeSh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcclxuICAgICAgICAgICAgcG9zaXRpb246IFwidG9wXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiU29tZXRoaW5nIHdlbnQgd3JvbmchXCIsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcIm5lZ2F0aXZlXCIsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IFwiMjUwMFwiLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLmlsbHVzdHJhdGlvbiB7XHJcbiAgaGVpZ2h0OiA0MHZoO1xyXG4gIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudCgjYmJlYWVjLCAjZWVlZWVlIDc1JSk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uZm9yZ290LXBhc3N3b3JkIHtcclxuICBwYWRkaW5nOiAwIDI1cHggMjVweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDIwcHg7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcbi5mb3Jnb3QtcGFzc3dvcmRfX2hlYWRlciB7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbiAgZm9udC1zaXplOiAzNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC44KTtcclxufVxyXG4ucS1pbnB1dCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiA1MDBweDtcclxufVxyXG4uZm9yZ290LXBhc3N3b3JkLWJ0biB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiAzMDBweDtcclxuICBiYWNrZ3JvdW5kOiAjMjY3Mzc4O1xyXG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSk7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbn1cclxuLmlubGluZS1zdHlsZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbnAge1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgY29sb3I6IHJnYmEoMTAsIDI1LCA0MSwgMC42NSk7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4ubG9naW4tYnRuIHtcclxuICBjb2xvcjogcmdiYSgxMCwgMjUsIDQxLCAwLjgpO1xyXG4gIHRleHQtc2hhZG93OiAwcHggNHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xyXG59XHJcbjwvc3R5bGU+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2XHJcbiAgICBjbGFzcz1cImVtcHR5LXN0YXRlXCJcclxuICAgIDpjbGFzcz1cInsgJ3dpdGgtdGFicy1oZWlnaHQnOiBoYXNUYWJzLCAnd2l0aG91dC10YWJzLWhlaWdodCc6ICFoYXNUYWJzIH1cIlxyXG4gID5cclxuICAgIDxpbWcgOnNyYz1cImBzcmMvYXNzZXRzL2lsbHVzdHJhdGlvbnMvJHtpbWFnZX1gXCIgYWx0PVwiXCIgLz5cclxuICAgIDxkaXYgY2xhc3M9XCJlbXB0eS1zdGF0ZV9fdGl0bGVcIj57eyB0aXRsZSB9fTwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2VcIj5cclxuICAgICAge3sgbWVzc2FnZSB9fVxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8cS1idG5cclxuICAgICAgICBjbGFzcz1cImJ0blwiXHJcbiAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMjY3Mzc4OyBjb2xvcjogI2ZmZlwiXHJcbiAgICAgICAgbGFiZWw9XCJMb2cgSW5cIlxyXG4gICAgICAgIEBjbGljaz1cIm9uTG9naW5cIlxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPHEtYnRuXHJcbiAgICAgICAgY2xhc3M9XCJidG5cIlxyXG4gICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzI2NzM3ODsgY29sb3I6ICNmZmZcIlxyXG4gICAgICAgIGxhYmVsPVwiU2lnbiBVcFwiXHJcbiAgICAgICAgQGNsaWNrPVwib25TaWdudXBcIlxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPHEtZGlhbG9nIHYtbW9kZWw9XCJzaG93QXV0aERpYWxvZ1wiIHNlYW1sZXNzIHBvc2l0aW9uPVwiYm90dG9tXCI+XHJcbiAgICAgICAgPHEtY2FyZCBjbGFzcz1cInEtY2FyZF9faGVpZ2h0XCI+XHJcbiAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcGItbm9uZVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPnt7IHRoaXMuc3RhdGUgfX08L2Rpdj5cclxuICAgICAgICAgICAgPHEtc3BhY2UgLz5cclxuICAgICAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgcm91bmQgZGVuc2Ugdi1jbG9zZS1wb3B1cCAvPlxyXG4gICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgICAgICAgIDxMb2dpbkRpYWxvZ1xyXG4gICAgICAgICAgICAgIHYtaWY9XCJ0aGlzLnN0YXRlID09PSAnTG9nIEluJ1wiXHJcbiAgICAgICAgICAgICAgQGVtaXRGb3Jnb3RQYXNzd29yZD1cIm9uRm9yZ290UGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgIEBlbWl0U2lnbnVwPVwib25TaWdudXBcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8U2lnbnVwRGlhbG9nXHJcbiAgICAgICAgICAgICAgdi1pZj1cInRoaXMuc3RhdGUgPT09ICdTaWduIFVwJ1wiXHJcbiAgICAgICAgICAgICAgQGVtaXRMb2dpbj1cIm9uTG9naW5cIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8Rm9yZ290UGFzc3dvcmREaWFsb2dcclxuICAgICAgICAgICAgICB2LWlmPVwidGhpcy5zdGF0ZSA9PT0gJ0ZvcmdvdCBQYXNzd29yZCdcIlxyXG4gICAgICAgICAgICAgIEBlbWl0TG9naW49XCJvbkxvZ2luXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgICAgPC9xLWNhcmQ+XHJcbiAgICAgIDwvcS1kaWFsb2c+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBMb2dpbkRpYWxvZyBmcm9tIFwic3JjL2NvbXBvbmVudHMvY3VzdG9tZXIvTG9naW5EaWFsb2cudnVlXCI7XHJcbmltcG9ydCBTaWdudXBEaWFsb2cgZnJvbSBcInNyYy9jb21wb25lbnRzL2N1c3RvbWVyL1NpZ251cERpYWxvZy52dWVcIjtcclxuaW1wb3J0IEZvcmdvdFBhc3N3b3JkRGlhbG9nIGZyb20gXCIuL0ZvcmdvdFBhc3N3b3JkRGlhbG9nLnZ1ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiRW1wdHlTdGF0ZVwiLFxyXG4gIHByb3BzOiBbXCJpbWFnZVwiLCBcInRpdGxlXCIsIFwibWVzc2FnZVwiLCBcImhhc1RhYnNcIl0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNob3dBdXRoRGlhbG9nOiBmYWxzZSxcclxuICAgICAgc3RhdGU6IFwiXCIsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgTG9naW5EaWFsb2csXHJcbiAgICBTaWdudXBEaWFsb2csXHJcbiAgICBGb3Jnb3RQYXNzd29yZERpYWxvZyxcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIG9uTG9naW4oKSB7XHJcbiAgICAgIHRoaXMuc3RhdGUgPSBcIkxvZyBJblwiO1xyXG4gICAgICB0aGlzLnNob3dBdXRoRGlhbG9nID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBvblNpZ251cCgpIHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IFwiU2lnbiBVcFwiO1xyXG4gICAgICB0aGlzLnNob3dBdXRoRGlhbG9nID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBvbkZvcmdvdFBhc3N3b3JkKCkge1xyXG4gICAgICB0aGlzLnN0YXRlID0gXCJGb3Jnb3QgUGFzc3dvcmRcIjtcclxuICAgICAgdGhpcy5zaG93QXV0aERpYWxvZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLmVtcHR5LXN0YXRlIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBwYWRkaW5nOiAwIDUwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi53aXRoLXRhYnMtaGVpZ2h0IHtcclxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA5OXB4KTtcclxuICBtYXJnaW4tdG9wOiAtMzZweDtcclxufVxyXG4ud2l0aG91dC10YWJzLWhlaWdodCB7XHJcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gOTlweCk7XHJcbn1cclxuLmVtcHR5LXN0YXRlX190aXRsZSB7XHJcbiAgZm9udC1zaXplOiAzMHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbn1cclxuLnEtY2FyZF9faGVpZ2h0IHtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSA1MHB4KSAhaW1wb3J0YW50O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XHJcbn1cclxuXHJcbi5idG4ge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogMzAwcHg7XHJcbiAgYmFja2dyb3VuZDogIzI2NzM3ODtcclxuICBjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUsIDAuOSk7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG5cclxuLm1lc3NhZ2Uge1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxufVxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOlsiX3NmY19tYWluIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9ob2lzdGVkXzIiLCJfaG9pc3RlZF8zIiwiX2hvaXN0ZWRfNCIsIl93aXRoU2NvcGVJZCIsIl9ob2lzdGVkXzEiLCJfY3JlYXRlVk5vZGUiLCJfaW1wb3J0c18wIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9ub3JtYWxpemVDbGFzcyIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlQmxvY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQTBEQSxNQUFLQSxjQUFVO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQ0wsV0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsU0FBUyxhQUFjO0FBQUEsTUFDdkIsSUFBSSxVQUFXO0FBQUEsTUFDZixZQUFZO0FBQUEsUUFDVixDQUFDLFFBQ0MseUpBQXlKO0FBQUEsVUFDdko7QUFBQSxhQUNHO0FBQUEsTUFDUjtBQUFBO0VBRUo7QUFBQSxFQUNELE9B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
