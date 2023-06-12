import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import LoginDialog from "../../../src/components/customer/LoginDialog.vue";

installQuasarPlugin();

describe("Login Dialog", () => {
  it("should mount component", () => {
    const wrapper = mount(LoginDialog, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper).toBeTruthy();
    console.log(wrapper.html());
  });

  it("should show login illustration", () => {
    const wrapper = mount(LoginDialog);
    const illustration = wrapper.find(".illustration_img");
    expect(illustration.attributes().src).toBe(
      "/src/assets/illustrations/Login.svg"
    );
  });

  // it("should show email input", () => {
  //   const wrapper = mount(LoginDialog);
  //   const inputElements = wrapper.find(".login");

  //   console.log(inputElements);
  //   // expect(inputElements[0].element).toBe("email");
  // });

  // it("should show password input", () => {
  //   const wrapper = mount(LoginDialog);
  //   const illustration = wrapper.find(".illustration_img");
  //   expect(illustration.attributes().src).toBe(
  //     "/src/assets/illustrations/Login.svg"
  //   );
  // });
});
