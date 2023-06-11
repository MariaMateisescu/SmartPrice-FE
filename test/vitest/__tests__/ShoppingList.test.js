import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import ShoppingList from "../../../src/components/customer/ShoppingList.vue";

installQuasarPlugin();

describe("Shopping List", () => {
  it("should mount component", () => {
    const wrapper = mount(ShoppingList, {
      props: {
        shoppingListInfo: {
          name: "My test shopping list",
          listItems: ["milk", "cheese", "asparagus", "oats", "water"],
          status: "pending",
        },
      },
      // global: {
      //   plugins: [createTestingPinia()],
      // },
    });
    expect(wrapper).toBeTruthy();
    console.log(wrapper.html());
  });

  it("should show list name", () => {
    const wrapper = mount(ShoppingList, {
      props: {
        shoppingListInfo: {
          name: "My test shopping list",
          listItems: ["milk", "cheese", "asparagus", "oats", "water"],
          status: "pending",
        },
      },
    });
    const name = wrapper.find(".q-item__label");
    expect(name.text()).toContain("My test shopping list");
  });

  it("should show list length", () => {
    const wrapper = mount(ShoppingList, {
      props: {
        shoppingListInfo: {
          name: "My test shopping list",
          listItems: ["milk", "cheese", "asparagus", "oats", "water"].length,
          status: "pending",
        },
      },
    });
    const listItems = wrapper.find(".q-item__label--caption");
    console.log(listItems.text());
    expect(listItems.text()).toContain("Barilla");
  });

  // it("should show product weight", () => {
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
  //   const weight = wrapper.find(".product");
  //   expect(weight.text()).toContain("500g");
  // });
});
