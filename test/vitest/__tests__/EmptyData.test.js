import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import EmptyData from "../../../src/components/customer/EmptyData.vue";

installQuasarPlugin();

describe("Empty Data", () => {
  it("should mount component", () => {
    const wrapper = mount(EmptyData, {
      props: {
        image: "Void.svg",
        title: "Test title",
        message: "Test message",
      },
    });
    expect(wrapper).toBeTruthy();
    console.log(wrapper.html());
  });

  it("should show empty data image", () => {
    const wrapper = mount(EmptyData, {
      props: {
        image: "Void.svg",
        title: "Test title",
        message: "Test message",
      },
    });
    const image = wrapper.find("img");
    expect(image.attributes().src).toBe("Void.svg");
  });

  it("should show empty data title", () => {
    const wrapper = mount(EmptyData, {
      props: {
        image: "Void.svg",
        title: "Test title",
        message: "Test message",
      },
    });
    const title = wrapper.find(".empty-data__title");
    expect(title.text()).toContain("Test title");
  });

  it("should show empty data message", () => {
    const wrapper = mount(EmptyData, {
      props: {
        image: "Void.svg",
        title: "Test title",
        message: "Test message",
      },
    });
    const message = wrapper.find(".message");
    expect(message.text()).toContain("Test message");
  });
});
