import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ProductCard from "../../../src/components/administration/ProductCard.vue";

installQuasarPlugin();

describe("Product Card", () => {
  it("should mount component", () => {
    const wrapper = mount(ProductCard, {
      props: {
        productInfo: {
          name: "Fussili",
          brand: "Barilla",
          category: {
            name: "Alimente de Baza",
          },
          weight: "500g",
          price: "10.49",
        },
      },
    });
    expect(wrapper).toBeTruthy();
    console.log(wrapper.html());
  });

  it("should show product name", () => {
    const wrapper = mount(ProductCard, {
      props: {
        productInfo: {
          name: "Fussili",
          brand: "Barilla",
          category: {
            name: "Alimente de Baza",
          },
          weight: "500g",
          price: "10.49",
        },
      },
    });
    const name = wrapper.find(".product");
    console.log(name);
    expect(name.text()).toContain("Fussili");
  });

  it("should show product brand", () => {
    const wrapper = mount(ProductCard, {
      props: {
        productInfo: {
          name: "Fussili",
          brand: "Barilla",
          category: {
            name: "Alimente de Baza",
          },
          weight: "500g",
          price: "10.49",
        },
      },
    });
    const brand = wrapper.find(".product");
    expect(brand.text()).toContain("Barilla");
  });

  it("should show product weight", () => {
    const wrapper = mount(ProductCard, {
      props: {
        productInfo: {
          name: "Fussili",
          brand: "Barilla",
          category: {
            name: "Alimente de Baza",
          },
          weight: "500g",
          price: "10.49",
        },
      },
    });
    const weight = wrapper.find(".product");
    expect(weight.text()).toContain("500g");
  });

  it("should show product weight", () => {
    const wrapper = mount(ProductCard, {
      props: {
        productInfo: {
          name: "Fussili",
          brand: "Barilla",
          category: {
            name: "Alimente de Baza",
          },
          weight: "500g",
          price: "10.49",
        },
      },
    });
    const price = wrapper.find(".product");
    expect(price.text()).toContain("10.49");
  });
});
