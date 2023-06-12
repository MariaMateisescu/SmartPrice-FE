import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import SignupDialog from "../../../src/components/customer/SignupDialog.vue";

installQuasarPlugin();

describe("Signup Dialog", () => {
  it("should mount component", () => {
    const wrapper = mount(SignupDialog, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper).toBeTruthy();
    console.log(wrapper.html());
  });

  it("should show signup illustration", () => {
    const wrapper = mount(SignupDialog);
    const illustration = wrapper.find(".illustration_img");
    expect(illustration.attributes().src).toBe(
      "/src/assets/illustrations/SignUp.svg"
    );
  });
});
