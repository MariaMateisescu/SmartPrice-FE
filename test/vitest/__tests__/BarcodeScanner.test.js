import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BarcodeScanner from "../../../src/components/customer/BarcodeScanner.vue";

installQuasarPlugin();

describe("Barcode Scanner", () => {
  it("should mount component", () => {
    const wrapper = mount(BarcodeScanner);
    expect(wrapper).toBeTruthy();
    console.log(wrapper.html());
  });

  // it("should show product name", () => {
  //   const wrapper = mount(ProductCard, {
  //     props: {
  //       productInfo: {
  //         name: "Fussili",
  //         brand: "Barilla",
  //         category: {
  //           name: "Alimente de Baza",
  //         },
  //         weight: "500g",
  //         price: "10.49",
  //       },
  //     },
  //   });
  //   const name = wrapper.find(".product");
  //   console.log(name);
  //   expect(name.text()).toContain("Fussili");
  // });
});
