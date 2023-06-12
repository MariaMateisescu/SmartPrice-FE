import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import EmptyState from "../../../src/components/customer/EmptyState.vue";

installQuasarPlugin();

describe("Empty State", () => {
  it("should mount component", () => {
    const wrapper = mount(EmptyState, {
      props: {
        image: "EmptyState.svg",
        title: "Ooops test title",
        message: "Ooops test message",
        hasTabs: true,
      },
    });
    expect(wrapper).toBeTruthy();
    console.log(wrapper.html());
  });

  it("should show empty state image", () => {
    const wrapper = mount(EmptyState, {
      props: {
        image: "EmptyState.svg",
        title: "Ooops test title",
        message: "Ooops test message",
        hasTabs: true,
      },
    });
    const image = wrapper.find("img");
    expect(image.attributes().src).toBe("EmptyState.svg");
  });

  it("should show empty state title", () => {
    const wrapper = mount(EmptyState, {
      props: {
        image: "EmptyState.svg",
        title: "Ooops test title",
        message: "Ooops test message",
        hasTabs: true,
      },
    });
    const title = wrapper.find(".empty-state__title");
    expect(title.text()).toContain("Ooops test title");
  });

  it("should show empty state message", () => {
    const wrapper = mount(EmptyState, {
      props: {
        image: "EmptyState.svg",
        title: "Ooops test title",
        message: "Ooops test message",
        hasTabs: true,
      },
    });
    const message = wrapper.find(".message");
    expect(message.text()).toContain("Ooops test message");
  });
});
