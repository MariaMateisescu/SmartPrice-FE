import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import MarketCard from "../../../src/components/administration/MarketCard.vue";

installQuasarPlugin();

describe("Market Card", () => {
  it("should mount component", () => {
    const wrapper = mount(MarketCard, {
      props: {
        marketInfo: {
          name: "Test name",
          logo: "https://smart-price.s3.us-east-1.amazonaws.com/1683232274041profi3.jpg",
        },
      },
    });
    expect(wrapper).toBeTruthy();
    console.log(wrapper.html());
  });

  it("should show name", () => {
    const wrapper = mount(MarketCard, {
      props: {
        marketInfo: {
          name: "Test name",
          logo: "https://smart-price.s3.us-east-1.amazonaws.com/1683232274041profi3.jpg",
        },
      },
    });
    const name = wrapper.find(".market-card__name");
    expect(name.text()).toBe("Test name");
  });

  it("should show logo", () => {
    const wrapper = mount(MarketCard, {
      props: {
        marketInfo: {
          name: "Test name",
          logo: "https://smart-price.s3.us-east-1.amazonaws.com/1683232274041profi3.jpg",
        },
      },
    });
    const logo = wrapper.find(".q-avatar__content > img");
    expect(logo.attributes().src).toBe(
      "https://smart-price.s3.us-east-1.amazonaws.com/1683232274041profi3.jpg"
    );
  });
});
