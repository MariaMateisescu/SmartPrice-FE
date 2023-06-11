import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import RecipeCard from "../../../src/components/customer/RecipeCard.vue";

installQuasarPlugin();

describe("Recipe Card", () => {
  it("should mount component", () => {
    const wrapper = mount(RecipeCard, {
      props: {
        recipeInfo: {
          title: "One Yummy recipe",
          image: "src/assets/recipe-placeholder.jpg",
        },
      },
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper).toBeTruthy();
    console.log(wrapper.html());
  });
  it("should show recipe title", () => {
    const wrapper = mount(RecipeCard, {
      props: {
        recipeInfo: {
          title: "One Yummy recipe",
          image: "src/assets/recipe-placeholder.jpg",
        },
      },
    });
    const title = wrapper.find(".recipe-card__title");
    expect(title.text()).toContain("One Yummy recipe");
  });
  it("should show recipe image", () => {
    const wrapper = mount(RecipeCard, {
      props: {
        recipeInfo: {
          title: "One Yummy recipe",
          image: "someImage.png",
        },
      },
    });
    const image = wrapper.find(".q-img__image");
    expect(image.attributes().src).toBe("someImage.png");
  });
  it("should show recipe image placeholder", () => {
    const wrapper = mount(RecipeCard, {
      props: {
        recipeInfo: {
          title: "One Yummy recipe",
        },
      },
    });
    const image = wrapper.find(".q-img__image");
    expect(image.attributes().src).toBe("src/assets/recipe-placeholder.jpg");
  });
});
