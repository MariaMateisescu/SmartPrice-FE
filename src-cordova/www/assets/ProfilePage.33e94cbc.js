import { Q as QInput } from "./QInput.11495055.js";
import { _ as _export_sfc, bB as useDashHeaderStore, bA as useUserStore, o as openBlock, c as createElementBlock, aa as createVNode, b5 as withCtx, bE as QBtn, a as createBaseVNode, M as toDisplayString, a2 as createBlock, ci as useQuasar, aL as resolveComponent, bC as QIcon, aH as pushScopeId, aF as popScopeId } from "./index.5a14f3c4.js";
import { Q as QToggle } from "./QToggle.27d1ec1b.js";
import { E as EmptyState } from "./EmptyState.4ff5feb6.js";
import "./use-dark.a5d47983.js";
import "./uid.42677368.js";
import "./focus-manager.d6507951.js";
import "./use-form.0026fe71.js";
import "./use-checkbox.e7258a8b.js";
import "./QDialog.8f997d51.js";
import "./use-timeout.a3a7dc24.js";
import "./ClosePopup.262ce3d8.js";
import "./QCard.133f47d5.js";
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
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      isPwd: true,
      isPwdConfirm: true,
      darkMode: null
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
  setup() {
    const userStore = useUserStore();
    const $q = useQuasar();
    const dashHeader = useDashHeaderStore();
    const toggleDarkMode = (e) => {
      $q.dark.set(e);
      dashHeader.$patch({
        darkMode: e
      });
    };
    return {
      userStore,
      toggleDarkMode
    };
  },
  methods: {
    onSaveChanges() {
      console.log("Saved Changes");
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-2d660bd1"), n = n(), popScopeId(), n);
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
    $setup.userStore.authUser ? (openBlock(), createElementBlock("div", _hoisted_2, [
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
        hint: "Password should have at least 8 characters",
        rounded: "",
        outlined: "",
        modelValue: $data.password,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.password = $event),
        type: $data.isPwd ? "password" : "text",
        label: "New Password"
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
        label: "Confirm New Password"
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
        class: "savechanges-btn",
        onClick: $options.onSaveChanges,
        label: "Save Changes"
      }, null, 8, ["onClick"]),
      createBaseVNode("div", _hoisted_4, [
        createBaseVNode("div", _hoisted_5, " Switch to " + toDisplayString($data.darkMode ? "light mode" : "dark mode"), 1),
        createVNode(QToggle, {
          modelValue: $data.darkMode,
          "onUpdate:modelValue": [
            _cache[6] || (_cache[6] = ($event) => $data.darkMode = $event),
            $setup.toggleDarkMode
          ],
          "checked-icon": "dark_mode",
          color: "cyan-9",
          size: "xl",
          "unchecked-icon": "light_mode"
        }, null, 8, ["modelValue", "onUpdate:modelValue"])
      ])
    ])) : (openBlock(), createBlock(_component_EmptyState, {
      key: 1,
      image: $data.image,
      title: $data.title,
      message: $data.message
    }, null, 8, ["image", "title", "message"]))
  ]);
}
var ProfilePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2d660bd1"], ["__file", "ProfilePage.vue"]]);
export { ProfilePage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZmlsZVBhZ2UuMzNlOTRjYmMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9Qcm9maWxlUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBhZ2VcIj5cclxuICAgIDxkaXYgdi1pZj1cInVzZXJTdG9yZS5hdXRoVXNlclwiIGNsYXNzPVwicHJvZmlsZS1wYWdlLWluZm9cIj5cclxuICAgICAgPHAgY2xhc3M9XCJwcm9maWxlLXBhZ2UtdGl0bGVcIj5BY2NvdW50IGluZm9ybWF0aW9uPC9wPlxyXG4gICAgICA8cS1pbnB1dCByb3VuZGVkIG91dGxpbmVkIHYtbW9kZWw9XCJuYW1lXCIgbGFiZWw9XCJOYW1lXCIgLz5cclxuICAgICAgPHEtaW5wdXQgcm91bmRlZCBvdXRsaW5lZCB2LW1vZGVsPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiBsYWJlbD1cIkVtYWlsXCIgLz5cclxuICAgICAgPHEtaW5wdXRcclxuICAgICAgICBoaW50PVwiUGFzc3dvcmQgc2hvdWxkIGhhdmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzXCJcclxuICAgICAgICByb3VuZGVkXHJcbiAgICAgICAgb3V0bGluZWRcclxuICAgICAgICB2LW1vZGVsPVwicGFzc3dvcmRcIlxyXG4gICAgICAgIDp0eXBlPVwiaXNQd2QgPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgICBsYWJlbD1cIk5ldyBQYXNzd29yZFwiXHJcbiAgICAgID5cclxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cclxuICAgICAgICAgIDxxLWljb25cclxuICAgICAgICAgICAgOm5hbWU9XCJpc1B3ZCA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eSdcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImN1cnNvci1wb2ludGVyXCJcclxuICAgICAgICAgICAgQGNsaWNrPVwiaXNQd2QgPSAhaXNQd2RcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L3RlbXBsYXRlPlxyXG4gICAgICA8L3EtaW5wdXQ+XHJcbiAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgcm91bmRlZFxyXG4gICAgICAgIG91dGxpbmVkXHJcbiAgICAgICAgdi1tb2RlbD1cInBhc3N3b3JkQ29uZmlybVwiXHJcbiAgICAgICAgOnR5cGU9XCJpc1B3ZENvbmZpcm0gPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgICAgICBsYWJlbD1cIkNvbmZpcm0gTmV3IFBhc3N3b3JkXCJcclxuICAgICAgPlxyXG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgICAgPHEtaWNvblxyXG4gICAgICAgICAgICA6bmFtZT1cImlzUHdkQ29uZmlybSA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eSdcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImN1cnNvci1wb2ludGVyXCJcclxuICAgICAgICAgICAgQGNsaWNrPVwiaXNQd2RDb25maXJtID0gIWlzUHdkQ29uZmlybVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgIDwvcS1pbnB1dD5cclxuICAgICAgPHEtYnRuXHJcbiAgICAgICAgY2xhc3M9XCJzYXZlY2hhbmdlcy1idG5cIlxyXG4gICAgICAgIEBjbGljaz1cIm9uU2F2ZUNoYW5nZXNcIlxyXG4gICAgICAgIGxhYmVsPVwiU2F2ZSBDaGFuZ2VzXCJcclxuICAgICAgLz5cclxuICAgICAgPGRpdiBjbGFzcz1cImZsZXggdG9nZ2xlLWRhcmtcIj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwicGFkZGluZy1sZWZ0OiAxOHB4XCI+XHJcbiAgICAgICAgICBTd2l0Y2ggdG8ge3sgZGFya01vZGUgPyBcImxpZ2h0IG1vZGVcIiA6IFwiZGFyayBtb2RlXCIgfX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8cS10b2dnbGVcclxuICAgICAgICAgIHYtbW9kZWw9XCJkYXJrTW9kZVwiXHJcbiAgICAgICAgICBjaGVja2VkLWljb249XCJkYXJrX21vZGVcIlxyXG4gICAgICAgICAgY29sb3I9XCJjeWFuLTlcIlxyXG4gICAgICAgICAgc2l6ZT1cInhsXCJcclxuICAgICAgICAgIHVuY2hlY2tlZC1pY29uPVwibGlnaHRfbW9kZVwiXHJcbiAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwidG9nZ2xlRGFya01vZGVcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8RW1wdHlTdGF0ZSB2LWVsc2UgOmltYWdlPVwiaW1hZ2VcIiA6dGl0bGU9XCJ0aXRsZVwiIDptZXNzYWdlPVwibWVzc2FnZVwiPlxyXG4gICAgPC9FbXB0eVN0YXRlPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgdXNlVXNlclN0b3JlIH0gZnJvbSBcIi4uL3N0b3Jlcy9Vc2VyU3RvcmVcIjtcclxuaW1wb3J0IHsgdXNlRGFzaEhlYWRlclN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZGFzaC1oZWFkZXJcIjtcclxuaW1wb3J0IEVtcHR5U3RhdGUgZnJvbSBcInNyYy9jb21wb25lbnRzL2N1c3RvbWVyL0VtcHR5U3RhdGUudnVlXCI7XHJcbmltcG9ydCB7IHVzZVF1YXNhciB9IGZyb20gXCJxdWFzYXJcIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiUHJvZmlsZVBhZ2VcIixcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICBFbXB0eVN0YXRlLFxyXG4gIH0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGltYWdlOiBcIkVtcHR5U3RhdGUuc3ZnXCIsXHJcbiAgICAgIHRpdGxlOiBcIk9vb3BzISBZb3UgYXJlIG5vdCBsb2dnZWQgaW4hXCIsXHJcbiAgICAgIG1lc3NhZ2U6IFwiTG9nIGluIHRvIHZpZXcgeW91ciBwcm9maWxlXCIsXHJcbiAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgICBwYXNzd29yZDogXCJcIixcclxuICAgICAgcGFzc3dvcmRDb25maXJtOiBcIlwiLFxyXG4gICAgICBpc1B3ZDogdHJ1ZSxcclxuICAgICAgaXNQd2RDb25maXJtOiB0cnVlLFxyXG4gICAgICBkYXJrTW9kZTogbnVsbCxcclxuICAgIH07XHJcbiAgfSxcclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgY29uc3QgZGFzaEhlYWRlciA9IHVzZURhc2hIZWFkZXJTdG9yZSgpO1xyXG4gICAgZGFzaEhlYWRlci4kcGF0Y2goe1xyXG4gICAgICB0aXRsZTogXCJQcm9maWxlXCIsXHJcbiAgICAgIHNob3dCYWNrSWNvbjogZmFsc2UsXHJcbiAgICB9KTtcclxuICAgIHRoaXMuZGFya01vZGUgPSBkYXNoSGVhZGVyLiRzdGF0ZS5kYXJrTW9kZTtcclxuICAgIGlmICh0aGlzLnVzZXJTdG9yZS5hdXRoVXNlcikge1xyXG4gICAgICB0aGlzLm5hbWUgPSB0aGlzLnVzZXJTdG9yZS5hdXRoVXNlci5uYW1lO1xyXG4gICAgICB0aGlzLmVtYWlsID0gdGhpcy51c2VyU3RvcmUuYXV0aFVzZXIuZW1haWw7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZXR1cCgpIHtcclxuICAgIGNvbnN0IHVzZXJTdG9yZSA9IHVzZVVzZXJTdG9yZSgpO1xyXG4gICAgY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcclxuICAgIGNvbnN0IGRhc2hIZWFkZXIgPSB1c2VEYXNoSGVhZGVyU3RvcmUoKTtcclxuICAgIGNvbnN0IHRvZ2dsZURhcmtNb2RlID0gKGUpID0+IHtcclxuICAgICAgJHEuZGFyay5zZXQoZSk7XHJcbiAgICAgIGRhc2hIZWFkZXIuJHBhdGNoKHtcclxuICAgICAgICBkYXJrTW9kZTogZSxcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdXNlclN0b3JlLFxyXG4gICAgICB0b2dnbGVEYXJrTW9kZSxcclxuICAgIH07XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBvblNhdmVDaGFuZ2VzKCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlNhdmVkIENoYW5nZXNcIik7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLnByb2ZpbGUtcGFnZSB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcbi5wcm9maWxlLXBhZ2UtaW5mbyB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAvKiBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgKi9cclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1hcmdpbi10b3A6IDEgMHB4O1xyXG59XHJcbi5xLWlucHV0IHtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXgtd2lkdGg6IDMwMHB4O1xyXG4gIG1hcmdpbi10b3A6IDIwcHg7XHJcbn1cclxuLnNhdmVjaGFuZ2VzLWJ0biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2NzM3ODtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgbWFyZ2luOiAxMHB4O1xyXG4gIG1hcmdpbi10b3A6IDMwcHg7XHJcbn1cclxuLnByb2ZpbGUtcGFnZS10aXRsZSB7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIG1hcmdpbi10b3A6IDMwcHg7XHJcbn1cclxuLnRvZ2dsZS1kYXJrIHtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBnYXA6IDYwcHg7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZUJsb2NrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWtFQSxNQUFLLFlBQVU7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLFlBQVk7QUFBQSxJQUNWO0FBQUEsRUFDRDtBQUFBLEVBQ0QsT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLGlCQUFpQjtBQUFBLE1BQ2pCLE9BQU87QUFBQSxNQUNQLGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQTtFQUViO0FBQUEsRUFDRCxNQUFNLFVBQVU7QUFDZCxVQUFNLGFBQWE7QUFDbkIsZUFBVyxPQUFPO0FBQUEsTUFDaEIsT0FBTztBQUFBLE1BQ1AsY0FBYztBQUFBLElBQ2hCLENBQUM7QUFDRCxTQUFLLFdBQVcsV0FBVyxPQUFPO0FBQ2xDLFFBQUksS0FBSyxVQUFVLFVBQVU7QUFDM0IsV0FBSyxPQUFPLEtBQUssVUFBVSxTQUFTO0FBQ3BDLFdBQUssUUFBUSxLQUFLLFVBQVUsU0FBUztBQUFBLElBQ3ZDO0FBQUEsRUFDRDtBQUFBLEVBQ0QsUUFBUTtBQUNOLFVBQU0sWUFBWTtBQUNsQixVQUFNLEtBQUs7QUFDWCxVQUFNLGFBQWE7QUFDbkIsVUFBTSxpQkFBaUIsQ0FBQyxNQUFNO0FBQzVCLFNBQUcsS0FBSyxJQUFJLENBQUM7QUFDYixpQkFBVyxPQUFPO0FBQUEsUUFDaEIsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBO0FBRUgsV0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUE7RUFFSDtBQUFBLEVBQ0QsU0FBUztBQUFBLElBQ1AsZ0JBQWdCO0FBQ2QsY0FBUSxJQUFJLGVBQWU7QUFBQSxJQUM1QjtBQUFBLEVBQ0Y7QUFDSDs7QUFwSE8sTUFBQSxhQUFBLEVBQUEsT0FBTSxlQUFjOzs7RUFDUSxPQUFNOztBQUNuQyxNQUFBLGFBQUEsNkJBQUEsTUFBQUEsZ0NBQXFELEtBQWxELEVBQUEsT0FBTSx3QkFBcUIsdUJBQW1CLEVBQUEsQ0FBQTtBQXVDNUMsTUFBQSxhQUFBLEVBQUEsT0FBTSxtQkFBa0I7QUFDdEIsTUFBQSxhQUFBLEVBQUEsT0FBQSxFQUEwQixnQkFBQSxPQUFBLEVBQUE7OztBQTFDckMsU0FBQUMsVUFBQSxHQUFBQyxtQkF5RE0sT0F6RE4sWUF5RE07QUFBQSxJQXhETyxPQUFBLFVBQVUsWUFBckJELGFBQUFDLG1CQXFETSxPQXJETixZQXFETTtBQUFBLE1BcERKO0FBQUEsTUFDQUMsWUFBd0QsUUFBQTtBQUFBLFFBQS9DLFNBQUE7QUFBQSxRQUFRLFVBQUE7QUFBQSxvQkFBa0IsTUFBSTtBQUFBLHFFQUFKLE1BQUksT0FBQTtBQUFBLFFBQUUsT0FBTTtBQUFBO01BQy9DQSxZQUF1RSxRQUFBO0FBQUEsUUFBOUQsU0FBQTtBQUFBLFFBQVEsVUFBQTtBQUFBLG9CQUFrQixNQUFLO0FBQUEscUVBQUwsTUFBSyxRQUFBO0FBQUEsUUFBRSxNQUFLO0FBQUEsUUFBUSxPQUFNO0FBQUE7TUFDN0RBLFlBZVUsUUFBQTtBQUFBLFFBZFIsTUFBSztBQUFBLFFBQ0wsU0FBQTtBQUFBLFFBQ0EsVUFBQTtBQUFBLG9CQUNTLE1BQVE7QUFBQSxxRUFBUixNQUFRLFdBQUE7QUFBQSxRQUNoQixNQUFNLE1BQUssUUFBQSxhQUFBO0FBQUEsUUFDWixPQUFNO0FBQUE7UUFFVyxnQkFDZixNQUlFO0FBQUEsVUFKRkEsWUFJRSxPQUFBO0FBQUEsWUFIQyxNQUFNLE1BQUssUUFBQSxtQkFBQTtBQUFBLFlBQ1osT0FBTTtBQUFBLFlBQ0wsU0FBSyxPQUFBLE9BQUEsT0FBQSxLQUFBLFlBQUUsTUFBSyxRQUFBLENBQUksTUFBSztBQUFBOzs7O01BSTVCQSxZQWNVLFFBQUE7QUFBQSxRQWJSLFNBQUE7QUFBQSxRQUNBLFVBQUE7QUFBQSxvQkFDUyxNQUFlO0FBQUEscUVBQWYsTUFBZSxrQkFBQTtBQUFBLFFBQ3ZCLE1BQU0sTUFBWSxlQUFBLGFBQUE7QUFBQSxRQUNuQixPQUFNO0FBQUE7UUFFVyxnQkFDZixNQUlFO0FBQUEsVUFKRkEsWUFJRSxPQUFBO0FBQUEsWUFIQyxNQUFNLE1BQVksZUFBQSxtQkFBQTtBQUFBLFlBQ25CLE9BQU07QUFBQSxZQUNMLFNBQUssT0FBQSxPQUFBLE9BQUEsS0FBQSxZQUFFLE1BQVksZUFBQSxDQUFJLE1BQVk7QUFBQTs7OztNQUkxQ0EsWUFJRSxNQUFBO0FBQUEsUUFIQSxPQUFNO0FBQUEsUUFDTCxTQUFPLFNBQWE7QUFBQSxRQUNyQixPQUFNO0FBQUE7TUFFUkgsZ0JBWU0sT0FaTixZQVlNO0FBQUEsUUFYSkEsZ0JBRU0sT0FGTixZQUFnQyxnQ0FDakIsTUFBUSxXQUFBLGVBQUEsV0FBQSxHQUFBLENBQUE7QUFBQSxRQUV2QkcsWUFPRSxTQUFBO0FBQUEsc0JBTlMsTUFBUTtBQUFBO2tEQUFSLE1BQVEsV0FBQTtBQUFBLFlBS0ksT0FBYztBQUFBO1VBSm5DLGdCQUFhO0FBQUEsVUFDYixPQUFNO0FBQUEsVUFDTixNQUFLO0FBQUEsVUFDTCxrQkFBZTtBQUFBOzt3QkFLckJDLFlBQ2EsdUJBQUE7QUFBQTtNQURPLE9BQU8sTUFBSztBQUFBLE1BQUcsT0FBTyxNQUFLO0FBQUEsTUFBRyxTQUFTLE1BQU87QUFBQTs7Ozs7In0=
