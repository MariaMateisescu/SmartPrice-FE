import { Q as QInput } from "./QInput.79283f08.js";
import { _ as _export_sfc, ci as useQuasar, bB as useDashHeaderStore, bA as useUserStore, o as openBlock, c as createElementBlock, aa as createVNode, b5 as withCtx, bE as QBtn, a as createBaseVNode, M as toDisplayString, a2 as createBlock, aL as resolveComponent, bC as QIcon, a9 as createTextVNode, aH as pushScopeId, aF as popScopeId } from "./index.404ce4fc.js";
import { Q as QToggle } from "./QToggle.7806b94b.js";
import { E as EmptyState } from "./EmptyState.1ca3d2f0.js";
import "./use-dark.efa419b2.js";
import "./uid.7f2d5a47.js";
import "./focus-manager.d00a4595.js";
import "./use-form.74a30394.js";
import "./use-checkbox.dbd2657e.js";
import "./QDialog.61cd08a9.js";
import "./use-timeout.219926c0.js";
import "./ClosePopup.7842916c.js";
import "./QCard.facf2956.js";
import "./Login.7b077154.js";
import "./SignUp.eb9627d6.js";
import "./ForgotPassword.bbba5c8c.js";
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
      title: "Profile",
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
        console.log(err);
      }
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-55a285fd"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "profile-page" };
const _hoisted_2 = {
  key: 0,
  class: "profile-page-info"
};
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", { class: "profile-page-title" }, "Account information", -1));
const _hoisted_4 = { class: "flex toggle-dark" };
const _hoisted_5 = { style: { "padding-left": "18px" } };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_EmptyState = resolveComponent("EmptyState");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    $data.userStore.authUser ? (openBlock(), createElementBlock("div", _hoisted_2, [
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
      }, null, 8, ["onClick"]),
      createBaseVNode("div", _hoisted_4, [
        createBaseVNode("div", _hoisted_5, " Switch to " + toDisplayString($data.darkMode ? "light mode" : "dark mode"), 1),
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
      ]),
      createVNode(QBtn, {
        onClick: _cache[9] || (_cache[9] = ($event) => _ctx.$router.push("/cards"))
      }, {
        default: withCtx(() => [
          createTextVNode("Go to CARDS")
        ]),
        _: 1
      })
    ])) : (openBlock(), createBlock(_component_EmptyState, {
      key: 1,
      image: $data.image,
      title: $data.title,
      message: $data.message
    }, null, 8, ["image", "title", "message"]))
  ]);
}
var ProfilePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-55a285fd"], ["__file", "ProfilePage.vue"]]);
export { ProfilePage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZmlsZVBhZ2UuYWM5MTI0MjcuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9Qcm9maWxlUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBhZ2VcIj5cclxuICAgIDxkaXYgdi1pZj1cInVzZXJTdG9yZS5hdXRoVXNlclwiIGNsYXNzPVwicHJvZmlsZS1wYWdlLWluZm9cIj5cclxuICAgICAgPHAgY2xhc3M9XCJwcm9maWxlLXBhZ2UtdGl0bGVcIj5BY2NvdW50IGluZm9ybWF0aW9uPC9wPlxyXG4gICAgICA8cS1pbnB1dCByb3VuZGVkIG91dGxpbmVkIHYtbW9kZWw9XCJuYW1lXCIgbGFiZWw9XCJOYW1lXCIgLz5cclxuICAgICAgPHEtaW5wdXQgcm91bmRlZCBvdXRsaW5lZCB2LW1vZGVsPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiBsYWJlbD1cIkVtYWlsXCIgLz5cclxuICAgICAgPHEtaW5wdXRcclxuICAgICAgICByb3VuZGVkXHJcbiAgICAgICAgb3V0bGluZWRcclxuICAgICAgICB2LW1vZGVsPVwicGFzc3dvcmRDdXJyZW50XCJcclxuICAgICAgICA6dHlwZT1cImlzUHdkID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0J1wiXHJcbiAgICAgICAgbGFiZWw9XCJDdXJyZW50IFBhc3N3b3JkXCJcclxuICAgICAgPlxyXG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgICAgPHEtaWNvblxyXG4gICAgICAgICAgICA6bmFtZT1cImlzUHdkID8gJ3Zpc2liaWxpdHlfb2ZmJyA6ICd2aXNpYmlsaXR5J1wiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgICBAY2xpY2s9XCJpc1B3ZCA9ICFpc1B3ZFwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgIDwvcS1pbnB1dD5cclxuICAgICAgPHEtaW5wdXRcclxuICAgICAgICByb3VuZGVkXHJcbiAgICAgICAgb3V0bGluZWRcclxuICAgICAgICB2LW1vZGVsPVwicGFzc3dvcmRcIlxyXG4gICAgICAgIDp0eXBlPVwiaXNQd2QgPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgICBsYWJlbD1cIk5ldyBQYXNzd29yZFwiXHJcbiAgICAgID5cclxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cclxuICAgICAgICAgIDxxLWljb25cclxuICAgICAgICAgICAgOm5hbWU9XCJpc1B3ZCA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eSdcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImN1cnNvci1wb2ludGVyXCJcclxuICAgICAgICAgICAgQGNsaWNrPVwiaXNQd2QgPSAhaXNQd2RcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L3RlbXBsYXRlPlxyXG4gICAgICA8L3EtaW5wdXQ+XHJcbiAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgaGludD1cIlBhc3N3b3JkIHNob3VsZCBoYXZlIGF0IGxlYXN0IDggY2hhcmFjdGVyc1wiXHJcbiAgICAgICAgcm91bmRlZFxyXG4gICAgICAgIG91dGxpbmVkXHJcbiAgICAgICAgdi1tb2RlbD1cInBhc3N3b3JkQ29uZmlybVwiXHJcbiAgICAgICAgOnR5cGU9XCJpc1B3ZENvbmZpcm0gPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgICBsYWJlbD1cIkNvbmZpcm0gTmV3IFBhc3N3b3JkXCJcclxuICAgICAgPlxyXG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgICAgPHEtaWNvblxyXG4gICAgICAgICAgICA6bmFtZT1cImlzUHdkQ29uZmlybSA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eSdcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImN1cnNvci1wb2ludGVyXCJcclxuICAgICAgICAgICAgQGNsaWNrPVwiaXNQd2RDb25maXJtID0gIWlzUHdkQ29uZmlybVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgIDwvcS1pbnB1dD5cclxuICAgICAgPHEtYnRuXHJcbiAgICAgICAgY2xhc3M9XCJzYXZlY2hhbmdlcy1idG5cIlxyXG4gICAgICAgIEBjbGljaz1cIm9uU2F2ZUNoYW5nZXNcIlxyXG4gICAgICAgIGxhYmVsPVwiU2F2ZSBDaGFuZ2VzXCJcclxuICAgICAgLz5cclxuICAgICAgPGRpdiBjbGFzcz1cImZsZXggdG9nZ2xlLWRhcmtcIj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwicGFkZGluZy1sZWZ0OiAxOHB4XCI+XHJcbiAgICAgICAgICBTd2l0Y2ggdG8ge3sgZGFya01vZGUgPyBcImxpZ2h0IG1vZGVcIiA6IFwiZGFyayBtb2RlXCIgfX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8cS10b2dnbGVcclxuICAgICAgICAgIHYtbW9kZWw9XCJkYXJrTW9kZVwiXHJcbiAgICAgICAgICBjaGVja2VkLWljb249XCJkYXJrX21vZGVcIlxyXG4gICAgICAgICAgY29sb3I9XCJjeWFuLTlcIlxyXG4gICAgICAgICAgc2l6ZT1cInhsXCJcclxuICAgICAgICAgIHVuY2hlY2tlZC1pY29uPVwibGlnaHRfbW9kZVwiXHJcbiAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwidG9nZ2xlRGFya01vZGVcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8cS1idG4gQGNsaWNrPVwiJHJvdXRlci5wdXNoKCcvY2FyZHMnKVwiPkdvIHRvIENBUkRTPC9xLWJ0bj5cclxuICAgIDwvZGl2PlxyXG4gICAgPEVtcHR5U3RhdGUgdi1lbHNlIDppbWFnZT1cImltYWdlXCIgOnRpdGxlPVwidGl0bGVcIiA6bWVzc2FnZT1cIm1lc3NhZ2VcIj5cclxuICAgIDwvRW1wdHlTdGF0ZT5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IHVzZVVzZXJTdG9yZSB9IGZyb20gXCIuLi9zdG9yZXMvVXNlclN0b3JlXCI7XHJcbmltcG9ydCB7IHVzZURhc2hIZWFkZXJTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Rhc2gtaGVhZGVyXCI7XHJcbmltcG9ydCBFbXB0eVN0YXRlIGZyb20gXCJzcmMvY29tcG9uZW50cy9jdXN0b21lci9FbXB0eVN0YXRlLnZ1ZVwiO1xyXG5pbXBvcnQgdXNlUXVhc2FyIGZyb20gXCJxdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1xdWFzYXIuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIlByb2ZpbGVQYWdlXCIsXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgRW1wdHlTdGF0ZSxcclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpbWFnZTogXCJFbXB0eVN0YXRlLnN2Z1wiLFxyXG4gICAgICB0aXRsZTogXCJPb29wcyEgWW91IGFyZSBub3QgbG9nZ2VkIGluIVwiLFxyXG4gICAgICBtZXNzYWdlOiBcIkxvZyBpbiB0byB2aWV3IHlvdXIgcHJvZmlsZVwiLFxyXG4gICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICBlbWFpbDogXCJcIixcclxuICAgICAgcGFzc3dvcmRDdXJyZW50OiBcIlwiLFxyXG4gICAgICBwYXNzd29yZDogXCJcIixcclxuICAgICAgcGFzc3dvcmRDb25maXJtOiBcIlwiLFxyXG4gICAgICBpc1B3ZDogdHJ1ZSxcclxuICAgICAgaXNQd2RDb25maXJtOiB0cnVlLFxyXG4gICAgICBkYXJrTW9kZTogbnVsbCxcclxuICAgICAgJHE6IHVzZVF1YXNhcigpLFxyXG4gICAgICBkYXNoSGVhZGVyOiB1c2VEYXNoSGVhZGVyU3RvcmUoKSxcclxuICAgICAgdXNlclN0b3JlOiB1c2VVc2VyU3RvcmUoKSxcclxuICAgIH07XHJcbiAgfSxcclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgY29uc3QgZGFzaEhlYWRlciA9IHVzZURhc2hIZWFkZXJTdG9yZSgpO1xyXG4gICAgZGFzaEhlYWRlci4kcGF0Y2goe1xyXG4gICAgICB0aXRsZTogXCJQcm9maWxlXCIsXHJcbiAgICAgIHNob3dCYWNrSWNvbjogZmFsc2UsXHJcbiAgICB9KTtcclxuICAgIHRoaXMuZGFya01vZGUgPSBkYXNoSGVhZGVyLiRzdGF0ZS5kYXJrTW9kZTtcclxuICAgIGlmICh0aGlzLnVzZXJTdG9yZS5hdXRoVXNlcikge1xyXG4gICAgICB0aGlzLm5hbWUgPSB0aGlzLnVzZXJTdG9yZS5hdXRoVXNlci5uYW1lO1xyXG4gICAgICB0aGlzLmVtYWlsID0gdGhpcy51c2VyU3RvcmUuYXV0aFVzZXIuZW1haWw7XHJcbiAgICB9XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICB0b2dnbGVEYXJrTW9kZShlKSB7XHJcbiAgICAgIHRoaXMuJHEuZGFyay5zZXQoZSk7XHJcbiAgICAgIHRoaXMuZGFzaEhlYWRlci4kcGF0Y2goe1xyXG4gICAgICAgIGRhcmtNb2RlOiBlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBvblNhdmVDaGFuZ2VzKCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICBwYXNzd29yZEN1cnJlbnQ6IHRoaXMucGFzc3dvcmRDdXJyZW50LFxyXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXHJcbiAgICAgICAgICBwYXNzd29yZENvbmZpcm06IHRoaXMucGFzc3dvcmRDb25maXJtLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLnBhdGNoKFwiL3VzZXJzL3VwZGF0ZU15UGFzc3dvcmRcIiwgZGF0YSk7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2VzXCIpO1xyXG4gICAgICAgICAgdGhpcy4kcS5ub3RpZnkoe1xyXG4gICAgICAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkNoYW5nZXMgc2F2ZWQgc3VjY2Vzc2Z1bGx5XCIsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcInBvc2l0aXZlXCIsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IFwiMjUwMFwiLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLnBhc3N3b3JkQ3VycmVudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMucGFzc3dvcmRDb25maXJtID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4ucHJvZmlsZS1wYWdlIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuLnByb2ZpbGUtcGFnZS1pbmZvIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuLnEtaW5wdXQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogMzAwcHg7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG4uc2F2ZWNoYW5nZXMtYnRuIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjY3Mzc4O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBtYXJnaW46IDEwcHg7XHJcbiAgbWFyZ2luLXRvcDogMzBweDtcclxufVxyXG4ucHJvZmlsZS1wYWdlLXRpdGxlIHtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgbWFyZ2luLXRvcDogMzBweDtcclxufVxyXG4udG9nZ2xlLWRhcmsge1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGdhcDogNjBweDtcclxuICBtYXJnaW4tdG9wOiAyMHB4O1xyXG59XHJcbjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfY3JlYXRlQmxvY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUZBLE1BQUssWUFBVTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sWUFBWTtBQUFBLElBQ1Y7QUFBQSxFQUNEO0FBQUEsRUFDRCxPQUFPO0FBQ0wsV0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsaUJBQWlCO0FBQUEsTUFDakIsVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsT0FBTztBQUFBLE1BQ1AsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsSUFBSSxVQUFXO0FBQUEsTUFDZixZQUFZLG1CQUFvQjtBQUFBLE1BQ2hDLFdBQVcsYUFBYztBQUFBO0VBRTVCO0FBQUEsRUFDRCxNQUFNLFVBQVU7QUFDZCxVQUFNLGFBQWE7QUFDbkIsZUFBVyxPQUFPO0FBQUEsTUFDaEIsT0FBTztBQUFBLE1BQ1AsY0FBYztBQUFBLElBQ2hCLENBQUM7QUFDRCxTQUFLLFdBQVcsV0FBVyxPQUFPO0FBQ2xDLFFBQUksS0FBSyxVQUFVLFVBQVU7QUFDM0IsV0FBSyxPQUFPLEtBQUssVUFBVSxTQUFTO0FBQ3BDLFdBQUssUUFBUSxLQUFLLFVBQVUsU0FBUztBQUFBLElBQ3ZDO0FBQUEsRUFDRDtB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
