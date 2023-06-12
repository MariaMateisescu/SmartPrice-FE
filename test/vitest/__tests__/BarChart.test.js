import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BarChart from "../../../src/components/customer/BarChart.vue";

installQuasarPlugin();

describe("Bar Chart", () => {
  it("should mount component", () => {
    const wrapper = mount(BarChart, {
      props: {
        completedLists: ["list1", "list2", "list3"],
      },
    });
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
