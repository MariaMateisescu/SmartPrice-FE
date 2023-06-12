import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import FidelityCard from "../../../src/components/customer/FidelityCard.vue";

installQuasarPlugin();

describe("Fidelity Card", () => {
  it("should mount component", () => {
    const wrapper = mount(FidelityCard, {
      props: {
        cardInfo: {
          name: "test card name",
        },
      },
    });
    expect(wrapper).toBeTruthy();
    console.log(wrapper.html());
  });

  it("should show card name", () => {
    const wrapper = mount(FidelityCard, {
      props: {
        cardInfo: {
          name: "test card name",
        },
      },
    });
    const name = wrapper.find(".card-name");
    console.log(name);
    expect(name.text()).toContain("test card name");
  });
});
