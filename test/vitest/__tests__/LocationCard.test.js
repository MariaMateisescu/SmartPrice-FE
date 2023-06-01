import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import LocationCard from "../../../src/components/administration/LocationCard.vue";

installQuasarPlugin();

describe("Location Card", () => {
  it("should mount component", () => {
    const wrapper = mount(LocationCard, {
      props: {
        locationInfo: {
          name: "Penny",
          address: "Strada Mihai Viteazu, Timisoara",
          openingHours: "10:00-22:00",
        },
      },
    });
    expect(wrapper).toBeTruthy();
    console.log(wrapper.html());
  });

  it("should show location name", () => {
    const wrapper = mount(LocationCard, {
      props: {
        locationInfo: {
          name: "Penny",
          address: "Strada Mihai Viteazu, Timisoara",
          openingHours: "10:00-22:00",
        },
      },
    });
    const name = wrapper.find(".q-item__section > div:nth-child(1)");
    console.log(name);
    expect(name.text()).toBe("Penny");
  });

  it("should show address", () => {
    const wrapper = mount(LocationCard, {
      props: {
        locationInfo: {
          name: "Penny",
          address: "Strada Mihai Viteazu, Timisoara",
          openingHours: "10:00-22:00",
        },
      },
    });
    const address = wrapper.find(".q-item__section > div:nth-child(2)");
    expect(address.text()).toContain("Strada Mihai Viteazu, Timisoara");
  });

  it("should show openingHours", () => {
    const wrapper = mount(LocationCard, {
      props: {
        locationInfo: {
          name: "Penny",
          address: "Strada Mihai Viteazu, Timisoara",
          openingHours: "10:00-22:00",
        },
      },
    });
    const openingHours = wrapper.find(".q-item__section > div:nth-child(3)");
    expect(openingHours.text()).toContain("10:00-22:00");
  });
});
