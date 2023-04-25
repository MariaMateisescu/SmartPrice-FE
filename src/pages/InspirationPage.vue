<template>
  <div class="inspiration-page">
    <div v-if="userStore.authUser">
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

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="allRecipes">
          <div class="text-h6">Browse for recipes</div>
          <RecipeCard
            v-for="recipe in recipes"
            :key="recipe.id"
            :recipeInfo="recipe"
            :isSaved="check(recipe.id)"
            @recipeSaved="addRecipeToSavedRecipes"
            @recipeUnsaved="removeRecipeFromSavedRecipes"
            @detailedRecipe="showDetailedRecipeDialog"
          />
        </q-tab-panel>

        <q-tab-panel name="myRecipes">
          <div class="text-h6">Saved recipes</div>
          <RecipeCard
            v-for="recipe in savedRecipes"
            :key="recipe.id"
            :recipeInfo="recipe"
            :isSaved="check(recipe.id)"
            @recipeUnsaved="removeRecipeFromSavedRecipes"
            @detailedRecipe="showDetailedRecipeDialog"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <EmptyState v-else :image="image" :title="title" :message="message">
    </EmptyState>
    <q-dialog maximized v-model="showDetailedRecipe">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-btn icon="close" flat round dense v-close-popup />
          <img
            :src="detailedRecipeToShow.image"
            alt="Recipe image"
            width="300"
            height="300"
          />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">{{ detailedRecipeToShow.title }}</div>
          <q-space />
          <div>Servings: {{ detailedRecipeToShow.servings }}</div>
          <div>Ready in: {{ detailedRecipeToShow.readyInMinutes }} minutes</div>
          <a :href="detailedRecipeToShow.sourceUrl">See recipe</a>
          <div>
            <li
              v-for="ingredient in detailedRecipeToShow.extendedIngredients"
              :key="ingredient.id"
            >
              {{ ingredient.amount }} {{ ingredient.unit }}
              {{ ingredient.nameClean }}
            </li>
          </div>
          <q-btn style="color: #267378" @click="createShoppingListFromRecipe"
            >Make a shopping list</q-btn
          >
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
import RecipeCard from "src/components/customer/RecipeCard.vue";

export default {
  name: "InspirationPage",
  components: {
    EmptyState,
    RecipeCard,
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Inspiration",
      showBackIcon: false,
    });
    await this.fetchRandomRecipes();
    await this.fetchSavedRecipes();
  },
  data() {
    return {
      image: "EmptyState.svg",
      title: "you are not logged in",
      message: "Log in to see recipes",
      tab: "allRecipes",
      recipes: [],
      savedRecipes: [],
      savedRecipesIds: [],
      showDetailedRecipe: false,
      detailedRecipeToShow: null,
    };
  },
  methods: {
    async fetchRandomRecipes() {
      const res = await this.$api.get(
        "https://api.spoonacular.com/recipes/random?apiKey=9f0ab28e89cd42ae85e66402ba83f236&number=10"
      );
      this.recipes = res.data.recipes;
    },
    async fetchSavedRecipes() {
      const res = await this.$api.get("/recipes/savedRecipes");
      this.savedRecipesIds = res.data.savedRecipes;

      const resRecipe = await this.$api.get(
        `https://api.spoonacular.com/recipes/informationBulk?apiKey=9f0ab28e89cd42ae85e66402ba83f236&ids=${res.data.savedRecipes.join(
          ","
        )}`
      );
      this.savedRecipes = resRecipe.data;
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
      console.log("click");
      const listItemsFromRecipe = [];
      this.detailedRecipeToShow.extendedIngredients.map((ing) => {
        const ingredient = ing.amount + " " + ing.unit + " " + ing.nameClean;
        listItemsFromRecipe.push(ingredient);
      });
      console.log(listItemsFromRecipe);
      const data = {
        name: this.detailedRecipeToShow.title,
        selectedProducts: listItemsFromRecipe,
      };
      const res = await this.$api.post(
        "/shopping-lists/create-shopping-list",
        data
      );
      console.log(res);
    },
    showDetailedRecipeDialog(recipeInfo) {
      this.showDetailedRecipe = true;
      this.detailedRecipeToShow = recipeInfo;
      console.log(this.detailedRecipeToShow);
    },
    check(recId) {
      if (this.savedRecipesIds.includes(recId)) return true;
      else return false;
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

<style scoped>
.inspiration-page {
  height: 100%;
}
</style>
