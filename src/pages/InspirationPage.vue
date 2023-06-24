<template>
  <div v-if="!recipes" class="row justify-center loading-spinner">
    <q-spinner-oval color="cyan-9" size="5em" />
  </div>
  <div v-else class="inspiration-page">
    <div>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="cyan-9"
        indicator-color="cyan-9"
        align="justify"
        narrow-indicator
      >
        <q-tab name="allRecipes" label="All recipes" />
        <q-tab name="myRecipes" label="My recipes" />
      </q-tabs>

      <q-separator />

      <q-pull-to-refresh @refresh="refresh" color="cyan-9">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="allRecipes" class="all-recipes">
            <div class="text-h6">Browse for recipes</div>
            <RecipeCard
              v-for="recipe in recipes"
              :key="recipe.id"
              :recipeInfo="recipe"
              :isSaved="check(recipe.id)"
              @recipeSaved="addRecipeToSavedRecipes"
              @recipeUnsaved="removeRecipeFromSavedRecipes"
              @detailedRecipe="showDetailedRecipeDialog"
              @addToFavNoUser="tab = 'myRecipes'"
            />
            <EmptyData
              v-if="!recipes.length"
              image="Void.svg"
              title="Nothing to show"
              message=""
            ></EmptyData>
          </q-tab-panel>

          <q-tab-panel name="myRecipes" v-if="userStore.authUser">
            <div
              v-if="!savedRecipes"
              class="row justify-center loading-spinner"
            >
              <q-spinner-oval color="cyan-9" size="5em" />
            </div>
            <div v-else>
              <div class="text-h6">Saved recipes</div>
              <RecipeCard
                v-for="recipe in savedRecipes"
                :key="recipe.id"
                :recipeInfo="recipe"
                :isSaved="check(recipe.id)"
                @recipeUnsaved="removeRecipeFromSavedRecipes"
                @detailedRecipe="showDetailedRecipeDialog"
              />
              <EmptyData
                v-if="savedRecipes && !savedRecipes.length"
                image="Void.svg"
                title="Nothing to show"
                message="Save a recipe"
              ></EmptyData>
            </div>
          </q-tab-panel>
          <q-tab-panel name="myRecipes" v-else style="padding: 0px">
            <EmptyState
              :image="image"
              :title="title"
              :message="message"
              :hasTabs="true"
            >
            </EmptyState>
          </q-tab-panel>
        </q-tab-panels>
      </q-pull-to-refresh>
    </div>
    <q-dialog seamless maximized v-model="showDetailedRecipe">
      <q-card>
        <q-card-section class="recipe-info-upper-section">
          <div class="recipe-info-close-btn">
            <q-btn icon="close" flat round dense v-close-popup size="lg" />
          </div>

          <div class="asd">
            <q-img
              v-if="detailedRecipeToShow.image"
              :src="detailedRecipeToShow.image"
              alt="Recipe image"
              class="recipe-info-image"
            />
            <q-img
              v-if="!detailedRecipeToShow.image"
              class="recipe-card__image"
              src="src/assets/recipe-placeholder.jpg"
            >
            </q-img>
          </div>
        </q-card-section>
        <q-card-section
          ><div class="detailed-recipe-title">
            {{ detailedRecipeToShow.title }}
          </div></q-card-section
        >
        <q-card-section style="font-size: 16px">
          <div class="flex justify-between">
            <div class="ready-in">
              <q-icon name="restaurant" color="blue-grey-9"></q-icon>
              {{ detailedRecipeToShow.servings }}
              {{ detailedRecipeToShow.servings > 1 ? "servings" : "serving" }}
            </div>
            <div>
              <q-icon name="link" size="22px" class="q-mr-xs"></q-icon>
              <a
                :href="detailedRecipeToShow.sourceUrl"
                style="text-decoration: none"
                >See recipe</a
              >
            </div>
          </div>
          <div class="ready-in">
            <q-icon name="schedule" color="blue-grey-9"></q-icon> Ready in
            {{ detailedRecipeToShow.readyInMinutes }} minutes
          </div>
        </q-card-section>

        <q-card-section style="font-size: 16px">
          <div class="recipe-ingredients">
            <div class="you-will-need">
              You will need:
              <div>
                <q-btn
                  color="cyan-9"
                  icon="add_shopping_cart"
                  round
                  @click="createShoppingListFromRecipe"
                ></q-btn>
              </div>
            </div>
            <li
              v-for="ingredient in detailedRecipeToShow.extendedIngredients"
              :key="ingredient.id"
            >
              {{ ingredient.amount }} {{ ingredient.unit }}
              {{ ingredient.nameClean }}
            </li>
          </div>
        </q-card-section>
        <q-card-section style="font-size: 16px">
          <div>Instructions:</div>
          <div v-html="detailedRecipeToShow.instructions"></div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { useDashHeaderStore } from "src/stores/dash-header";
import EmptyState from "src/components/customer/EmptyState.vue";
import EmptyData from "src/components/customer/EmptyData.vue";
import RecipeCard from "src/components/customer/RecipeCard.vue";

import { useQuasar } from "quasar";
export default {
  name: "InspirationPage",
  components: {
    EmptyState,
    EmptyData,
    RecipeCard,
  },

  data() {
    return {
      image: "EmptyState.svg",
      title: "Ooops! You are not logged in!",
      message: "Log in to see recipes",
      tab: "allRecipes",
      recipes: null,
      savedRecipes: null,
      savedRecipesIds: [],
      showDetailedRecipe: false,
      detailedRecipeToShow: null,
      $q: useQuasar(),
    };
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Inspiration",
      showBackIcon: false,
    });
    try {
      await this.fetchRandomRecipes();
      if (this.userStore.authUser) {
        await this.fetchSavedRecipes();
      }
    } catch (err) {
      this.$q.notify({
        type: "negative",
        position: "top",
        message: "Something went wrong!",
        color: "negative",
        timeout: "2500",
      });
    }
  },
  methods: {
    async fetchRandomRecipes() {
      const options = {
        method: "GET",
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
        params: {
          number: "20",
        },
        headers: {
          "X-RapidAPI-Key": process.env.SPOONACULAR_API_KEY,
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      };
      const res = await this.$api.request(options);
      this.recipes = res.data.recipes;
    },
    async fetchSavedRecipes() {
      const res = await this.$api.get("/recipes/savedRecipes");
      this.savedRecipesIds = res.data.savedRecipes;

      const options = {
        method: "GET",
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk",
        params: { ids: res.data.savedRecipes.join(",") },
        headers: {
          "X-RapidAPI-Key": process.env.SPOONACULAR_API_KEY,
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      };
      const resRecipe = await this.$api.request(options);
      if (!this.savedRecipes) {
        this.savedRecipes = [];
      }
      this.savedRecipes = [...this.savedRecipes, ...resRecipe.data];
    },
    addRecipeToSavedRecipes(recipeInfo) {
      this.savedRecipes.unshift(recipeInfo);
      this.savedRecipesIds.unshift(recipeInfo.id);
    },
    removeRecipeFromSavedRecipes(recipeInfo) {
      const index = this.savedRecipes.indexOf(recipeInfo);
      if (index > -1) {
        this.savedRecipes.splice(index, 1);
      }
      const indexId = this.savedRecipesIds.indexOf(recipeInfo.id);
      if (index > -1) {
        this.savedRecipesIds.splice(indexId, 1);
      }
    },
    async createShoppingListFromRecipe() {
      const listItemsFromRecipe = [];
      this.detailedRecipeToShow.extendedIngredients.map((ing) => {
        const ingredient = ing.amount + " " + ing.unit + " " + ing.nameClean;
        listItemsFromRecipe.push(ingredient);
      });

      const data = {
        name: this.detailedRecipeToShow.title,
        selectedProducts: listItemsFromRecipe,
        isRecipe: this.detailedRecipeToShow.id,
      };
      const res = await this.$api.post(
        "/shopping-lists/create-shopping-list",
        data
      );
      if (res.status === 200) {
        this.$q.notify({
          type: "positive",
          position: "top",
          message: "Shopping list created successfully",
          color: "positive",
          timeout: "2500",
        });
      }
    },
    showDetailedRecipeDialog(recipeInfo) {
      this.showDetailedRecipe = true;
      this.detailedRecipeToShow = recipeInfo;
    },
    check(recId) {
      if (this.savedRecipesIds.includes(recId)) return true;
      else return false;
    },
    async refresh(done) {
      await this.fetchRandomRecipes();
      done();
    },
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
};
</script>

<style scoped lang="scss">
.inspiration-page {
  height: 100%;
  overflow-y: scroll;
}

.recipe-info-upper-section {
  position: relative;
  width: 100%;
  padding: 0;
}
.asd {
  position: relative;
}
.asd ::after {
  position: absolute;
  content: "";
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.07) 15%,
    rgba(0, 0, 0, 0.015) 30%,
    rgba(0, 0, 0, 0) 100%
  );
}

.recipe-info-close-btn {
  position: absolute !important;
  top: 10px;
  right: 15px;
  z-index: 999;
  width: fit-content;
  color: white;
}

.recipe-info-image {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.detailed-recipe-title {
  text-align: center;
  font-size: 24px;
}
.recipe-ingredients {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: 1px solid rgba(10, 25, 41, 0.5);
  border-radius: 10px;
  padding: 10px 16px 16px;
}
li {
  list-style: none;
}
li::before {
  content: "\2022";
  color: $cyan-9;
  font-weight: bold;
  display: inline-block;
  width: 1em;
}
.ready-in {
  display: flex;
  align-items: center;
  gap: 5px;
}
.you-will-need {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
