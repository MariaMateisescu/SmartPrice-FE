import { Q as QInput } from "./QInput.4104ffc2.js";
import { _ as _export_sfc, c6 as useQuasar, bB as useDashHeaderStore, bA as useUserStore, o as openBlock, c as createElementBlock, a as createBaseVNode, aa as createVNode, b5 as withCtx, bE as QBtn, M as toDisplayString, a2 as createBlock, aL as resolveComponent, bC as QIcon } from "./index.0ce84b9b.js";
import { Q as QToggle } from "./QToggle.763578ad.js";
import { E as EmptyState } from "./EmptyState.d30d7522.js";
import "./use-dark.089fd8b8.js";
import "./uid.42677368.js";
import "./focus-manager.d6507951.js";
import "./use-form.e754bc19.js";
import "./use-checkbox.bf2f6301.js";
import "./QDialog.27e255cd.js";
import "./use-timeout.0140a5e1.js";
import "./ClosePopup.fcd43a0a.js";
import "./QCard.511536db.js";
import "./Login.d1b99dd8.js";
import "./SignUp.0068903c.js";
import "./ForgotPassword.9cb51cc9.js";
var ProfilePage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  name: "ProfilePage",
  components: {
    EmptyState
  },
  data() {
    return {
      image: "EmptyState.svg",
      title: "Ooops! You are not logged in!",
      message: "Log in to view your profile",
      imageCards: "FidelityCard.svg",
      titleCards: "Ooops! No cards to show!",
      messageCards: "Add your first card.",
      name: "",
      email: "",
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
      isPwd: true,
      isPwdConfirm: true,
      darkMode: null,
      $q: useQuasar(),
      dashHeader: useDashHeaderStore(),
      userStore: useUserStore()
    };
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Account information",
      showBackIcon: false
    });
    this.darkMode = dashHeader.$state.darkMode;
    if (this.userStore.authUser) {
      this.name = this.userStore.authUser.name;
      this.email = this.userStore.authUser.email;
    }
  },
  methods: {
    toggleDarkMode(e) {
      this.$q.dark.set(e);
      this.dashHeader.$patch({
        darkMode: e
      });
    },
    async onSaveChanges() {
      try {
        const data = {
          name: this.name,
          passwordCurrent: this.passwordCurrent,
          password: this.password,
          passwordConfirm: this.passwordConfirm
        };
        const res = await this.$api.patch("/users/updateMyPassword", data);
        if (res.data.status === "success") {
          console.log("succes");
          this.$q.notify({
            type: "positive",
            position: "top",
            message: "Changes saved successfully",
            color: "positive",
            timeout: "2500"
          });
          this.passwordCurrent = "";
          this.password = "";
          this.passwordConfirm = "";
        }
      } catch (err) {
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
};
const _hoisted_1 = { class: "profile-page" };
const _hoisted_2 = {
  key: 0,
  class: "profile-page-info"
};
const _hoisted_3 = { style: { "width": "100%" } };
const _hoisted_4 = { class: "inputs-style" };
const _hoisted_5 = { class: "flex toggle-dark" };
const _hoisted_6 = { style: { "padding-left": "18px" } };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_EmptyState = resolveComponent("EmptyState");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    $data.userStore.authUser ? (openBlock(), createElementBlock("div", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
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
            modelValue: $data.passwordCurrent,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.passwordCurrent = $event),
            type: $data.isPwd ? "password" : "text",
            label: "Current Password"
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
            modelValue: $data.password,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.password = $event),
            type: $data.isPwd ? "password" : "text",
            label: "New Password"
          }, {
            append: withCtx(() => [
              createVNode(QIcon, {
                name: $data.isPwd ? "visibility_off" : "visibility",
                class: "cursor-pointer",
                onClick: _cache[4] || (_cache[4] = ($event) => $data.isPwd = !$data.isPwd)
              }, null, 8, ["name"])
            ]),
            _: 1
          }, 8, ["modelValue", "type"]),
          createVNode(QInput, {
            hint: "Password should have at least 8 characters",
            rounded: "",
            outlined: "",
            modelValue: $data.passwordConfirm,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.passwordConfirm = $event),
            type: $data.isPwdConfirm ? "password" : "text",
            label: "Confirm New Password"
          }, {
            append: withCtx(() => [
              createVNode(QIcon, {
                name: $data.isPwdConfirm ? "visibility_off" : "visibility",
                class: "cursor-pointer",
                onClick: _cache[6] || (_cache[6] = ($event) => $data.isPwdConfirm = !$data.isPwdConfirm)
              }, null, 8, ["name"])
            ]),
            _: 1
          }, 8, ["modelValue", "type"]),
          createVNode(QBtn, {
            class: "savechanges-btn",
            onClick: $options.onSaveChanges,
            label: "Save Changes"
          }, null, 8, ["onClick"])
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, " Switch to " + toDisplayString($data.darkMode ? "light mode" : "dark mode"), 1),
          createVNode(QToggle, {
            modelValue: $data.darkMode,
            "onUpdate:modelValue": [
              _cache[8] || (_cache[8] = ($event) => $data.darkMode = $event),
              $options.toggleDarkMode
            ],
            "checked-icon": "dark_mode",
            color: "cyan-9",
            size: "xl",
            "unchecked-icon": "light_mode"
          }, null, 8, ["modelValue", "onUpdate:modelValue"])
        ])
      ])
    ])) : (openBlock(), createBlock(_component_EmptyState, {
      key: 1,
      image: $data.image,
      title: $data.title,
      message: $data.message
    }, null, 8, ["image", "title", "message"]))
  ]);
}
var ProfilePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-09b9b46c"], ["__file", "ProfilePage.vue"]]);
export { ProfilePage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZmlsZVBhZ2UuNmQyNTMyOGIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9Qcm9maWxlUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBhZ2VcIj5cclxuICAgIDxkaXYgdi1pZj1cInVzZXJTdG9yZS5hdXRoVXNlclwiIGNsYXNzPVwicHJvZmlsZS1wYWdlLWluZm9cIj5cclxuICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMDAlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0cy1zdHlsZVwiPlxyXG4gICAgICAgICAgPHEtaW5wdXQgcm91bmRlZCBvdXRsaW5lZCB2LW1vZGVsPVwibmFtZVwiIGxhYmVsPVwiTmFtZVwiIC8+XHJcbiAgICAgICAgICA8cS1pbnB1dFxyXG4gICAgICAgICAgICByb3VuZGVkXHJcbiAgICAgICAgICAgIG91dGxpbmVkXHJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJlbWFpbFwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXHJcbiAgICAgICAgICAgIGxhYmVsPVwiRW1haWxcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgICAgIHJvdW5kZWRcclxuICAgICAgICAgICAgb3V0bGluZWRcclxuICAgICAgICAgICAgdi1tb2RlbD1cInBhc3N3b3JkQ3VycmVudFwiXHJcbiAgICAgICAgICAgIDp0eXBlPVwiaXNQd2QgPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgICAgICAgbGFiZWw9XCJDdXJyZW50IFBhc3N3b3JkXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XHJcbiAgICAgICAgICAgICAgPHEtaWNvblxyXG4gICAgICAgICAgICAgICAgOm5hbWU9XCJpc1B3ZCA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eSdcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjdXJzb3ItcG9pbnRlclwiXHJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCJpc1B3ZCA9ICFpc1B3ZFwiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cclxuICAgICAgICAgIDwvcS1pbnB1dD5cclxuICAgICAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgICAgIHJvdW5kZWRcclxuICAgICAgICAgICAgb3V0bGluZWRcclxuICAgICAgICAgICAgdi1tb2RlbD1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgOnR5cGU9XCJpc1B3ZCA/ICdwYXNzd29yZCcgOiAndGV4dCdcIlxyXG4gICAgICAgICAgICBsYWJlbD1cIk5ldyBQYXNzd29yZFwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgICAgICAgIDxxLWljb25cclxuICAgICAgICAgICAgICAgIDpuYW1lPVwiaXNQd2QgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwiaXNQd2QgPSAhaXNQd2RcIlxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L3EtaW5wdXQ+XHJcbiAgICAgICAgICA8cS1pbnB1dFxyXG4gICAgICAgICAgICBoaW50PVwiUGFzc3dvcmQgc2hvdWxkIGhhdmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzXCJcclxuICAgICAgICAgICAgcm91bmRlZFxyXG4gICAgICAgICAgICBvdXRsaW5lZFxyXG4gICAgICAgICAgICB2LW1vZGVsPVwicGFzc3dvcmRDb25maXJtXCJcclxuICAgICAgICAgICAgOnR5cGU9XCJpc1B3ZENvbmZpcm0gPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgICAgICAgbGFiZWw9XCJDb25maXJtIE5ldyBQYXNzd29yZFwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgICAgICAgIDxxLWljb25cclxuICAgICAgICAgICAgICAgIDpuYW1lPVwiaXNQd2RDb25maXJtID8gJ3Zpc2liaWxpdHlfb2ZmJyA6ICd2aXNpYmlsaXR5J1wiXHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImN1cnNvci1wb2ludGVyXCJcclxuICAgICAgICAgICAgICAgIEBjbGljaz1cImlzUHdkQ29uZmlybSA9ICFpc1B3ZENvbmZpcm1cIlxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L3EtaW5wdXQ+XHJcbiAgICAgICAgICA8cS1idG5cclxuICAgICAgICAgICAgY2xhc3M9XCJzYXZlY2hhbmdlcy1idG5cIlxyXG4gICAgICAgICAgICBAY2xpY2s9XCJvblNhdmVDaGFuZ2VzXCJcclxuICAgICAgICAgICAgbGFiZWw9XCJTYXZlIENoYW5nZXNcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCB0b2dnbGUtZGFya1wiPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cInBhZGRpbmctbGVmdDogMThweFwiPlxyXG4gICAgICAgICAgICBTd2l0Y2ggdG8ge3sgZGFya01vZGUgPyBcImxpZ2h0IG1vZGVcIiA6IFwiZGFyayBtb2RlXCIgfX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHEtdG9nZ2xlXHJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJkYXJrTW9kZVwiXHJcbiAgICAgICAgICAgIGNoZWNrZWQtaWNvbj1cImRhcmtfbW9kZVwiXHJcbiAgICAgICAgICAgIGNvbG9yPVwiY3lhbi05XCJcclxuICAgICAgICAgICAgc2l6ZT1cInhsXCJcclxuICAgICAgICAgICAgdW5jaGVja2VkLWljb249XCJsaWdodF9tb2RlXCJcclxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cInRvZ2dsZURhcmtNb2RlXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8RW1wdHlTdGF0ZSB2LWVsc2UgOmltYWdlPVwiaW1hZ2VcIiA6dGl0bGU9XCJ0aXRsZVwiIDptZXNzYWdlPVwibWVzc2FnZVwiPlxyXG4gICAgPC9FbXB0eVN0YXRlPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgdXNlVXNlclN0b3JlIH0gZnJvbSBcIi4uL3N0b3Jlcy9Vc2VyU3RvcmVcIjtcclxuaW1wb3J0IHsgdXNlRGFzaEhlYWRlclN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZGFzaC1oZWFkZXJcIjtcclxuaW1wb3J0IEVtcHR5U3RhdGUgZnJvbSBcInNyYy9jb21wb25lbnRzL2N1c3RvbWVyL0VtcHR5U3RhdGUudnVlXCI7XHJcblxyXG5pbXBvcnQgdXNlUXVhc2FyIGZyb20gXCJxdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1xdWFzYXIuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIlByb2ZpbGVQYWdlXCIsXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgRW1wdHlTdGF0ZSxcclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpbWFnZTogXCJFbXB0eVN0YXRlLnN2Z1wiLFxyXG4gICAgICB0aXRsZTogXCJPb29wcyEgWW91IGFyZSBub3QgbG9nZ2VkIGluIVwiLFxyXG4gICAgICBtZXNzYWdlOiBcIkxvZyBpbiB0byB2aWV3IHlvdXIgcHJvZmlsZVwiLFxyXG4gICAgICBpbWFnZUNhcmRzOiBcIkZpZGVsaXR5Q2FyZC5zdmdcIixcclxuICAgICAgdGl0bGVDYXJkczogXCJPb29wcyEgTm8gY2FyZHMgdG8gc2hvdyFcIixcclxuICAgICAgbWVzc2FnZUNhcmRzOiBcIkFkZCB5b3VyIGZpcnN0IGNhcmQuXCIsXHJcbiAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgICBwYXNzd29yZEN1cnJlbnQ6IFwiXCIsXHJcbiAgICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgICBwYXNzd29yZENvbmZpcm06IFwiXCIsXHJcbiAgICAgIGlzUHdkOiB0cnVlLFxyXG4gICAgICBpc1B3ZENvbmZpcm06IHRydWUsXHJcbiAgICAgIGRhcmtNb2RlOiBudWxsLFxyXG4gICAgICAkcTogdXNlUXVhc2FyKCksXHJcbiAgICAgIGRhc2hIZWFkZXI6IHVzZURhc2hIZWFkZXJTdG9yZSgpLFxyXG4gICAgICB1c2VyU3RvcmU6IHVzZVVzZXJTdG9yZSgpLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGFzeW5jIG1vdW50ZWQoKSB7XHJcbiAgICBjb25zdCBkYXNoSGVhZGVyID0gdXNlRGFzaEhlYWRlclN0b3JlKCk7XHJcbiAgICBkYXNoSGVhZGVyLiRwYXRjaCh7XHJcbiAgICAgIHRpdGxlOiBcIkFjY291bnQgaW5mb3JtYXRpb25cIixcclxuICAgICAgc2hvd0JhY2tJY29uOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5kYXJrTW9kZSA9IGRhc2hIZWFkZXIuJHN0YXRlLmRhcmtNb2RlO1xyXG4gICAgaWYgKHRoaXMudXNlclN0b3JlLmF1dGhVc2VyKSB7XHJcbiAgICAgIHRoaXMubmFtZSA9IHRoaXMudXNlclN0b3JlLmF1dGhVc2VyLm5hbWU7XHJcbiAgICAgIHRoaXMuZW1haWwgPSB0aGlzLnVzZXJTdG9yZS5hdXRoVXNlci5lbWFpbDtcclxuICAgIH1cclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIHRvZ2dsZURhcmtNb2RlKGUpIHtcclxuICAgICAgdGhpcy4kcS5kYXJrLnNldChlKTtcclxuICAgICAgdGhpcy5kYXNoSGVhZGVyLiRwYXRjaCh7XHJcbiAgICAgICAgZGFya01vZGU6IGUsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIG9uU2F2ZUNoYW5nZXMoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgIHBhc3N3b3JkQ3VycmVudDogdGhpcy5wYXNzd29yZEN1cnJlbnQsXHJcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcclxuICAgICAgICAgIHBhc3N3b3JkQ29uZmlybTogdGhpcy5wYXNzd29yZENvbmZpcm0sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkucGF0Y2goXCIvdXNlcnMvdXBkYXRlTXlQYXNzd29yZFwiLCBkYXRhKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNcIik7XHJcbiAgICAgICAgICB0aGlzLiRxLm5vdGlmeSh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcclxuICAgICAgICAgICAgcG9zaXRpb246IFwidG9wXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiQ2hhbmdlcyBzYXZlZCBzdWNjZXNzZnVsbHlcIixcclxuICAgICAgICAgICAgY29sb3I6IFwicG9zaXRpdmVcIixcclxuICAgICAgICAgICAgdGltZW91dDogXCIyNTAwXCIsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMucGFzc3dvcmRDdXJyZW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMucGFzc3dvcmQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5wYXNzd29yZENvbmZpcm0gPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgdGhpcy4kcS5ub3RpZnkoe1xyXG4gICAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxyXG4gICAgICAgICAgcG9zaXRpb246IFwidG9wXCIsXHJcbiAgICAgICAgICBtZXNzYWdlOiBcIlNvbWV0aGluZyB3ZW50IHdyb25nIVwiLFxyXG4gICAgICAgICAgY29sb3I6IFwibmVnYXRpdmVcIixcclxuICAgICAgICAgIHRpbWVvdXQ6IFwiMjUwMFwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxyXG4ucHJvZmlsZS1wYWdlIHtcclxuICAvLyBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuLnByb2ZpbGUtcGFnZS1pbmZvIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuLnEtaW5wdXQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogMzAwcHg7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG4uc2F2ZWNoYW5nZXMtYnRuIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjY3Mzc4O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBtYXJnaW46IDEwcHg7XHJcbiAgbWFyZ2luLXRvcDogMzBweDtcclxufVxyXG4ucHJvZmlsZS1wYWdlLXRpdGxlIHtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbn1cclxuLnRvZ2dsZS1kYXJrIHtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBnYXA6IDYwcHg7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG4uaWxsdXN0cmF0aW9uIHtcclxuICBoZWlnaHQ6IDQwdmg7XHJcbiAgcGFkZGluZy10b3A6IDUwcHg7XHJcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KCNiYmVhZWMsICNlZWVlZWUgNzUlKTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuLmlucHV0cy1zdHlsZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuPC9zdHlsZT5cclxuIl0sIm5hbWVzIjpbIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVCbG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0RkEsTUFBSyxZQUFVO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixZQUFZO0FBQUEsSUFDVjtBQUFBLEVBQ0Q7QUFBQSxFQUNELE9BQU87QUFDTCxXQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxZQUFZO0FBQUEsTUFDWixZQUFZO0FBQUEsTUFDWixjQUFjO0FBQUEsTUFDZCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxpQkFBaUI7QUFBQSxNQUNqQixVQUFVO0FBQUEsTUFDVixpQkFBaUI7QUFBQSxNQUNqQixPQUFPO0FBQUEsTUFDUCxjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsTUFDVixJQUFJLFVBQVc7QUFBQSxNQUNmLFlBQVksbUJBQW9CO0FBQUEsTUFDaEMsV0FBVyxhQUFjO0FBQUE7RUFFNUI7QUFBQSxFQUNELE1BQU0sVUFBVTtBQUNkLFVBQU0sYUFBYTtBQUNuQixlQUFXLE9BQU87QUFBQSxNQUNoQixPQUFPO0FBQUEsTUFDUCxjQUFjO0FBQUEsSUFDaEIsQ0FBQztBQUNELFNBQUssV0FB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
