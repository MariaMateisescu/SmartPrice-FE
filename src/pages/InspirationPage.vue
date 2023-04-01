<template>
  <div class="inspiration-page">
    <div v-if="userStore.authUser">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="teal"
        indicator-color="teal"
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
            @recipeSaved="fetchSavedRecipes"
            @recipeUnsaved="fetchSavedRecipes"
          />
        </q-tab-panel>

        <q-tab-panel name="myRecipes">
          <div class="text-h6">Saved recipes</div>
          <RecipeCard
            v-for="recipe in savedRecipes"
            :key="recipe.id"
            :recipeInfo="recipe"
            :isSaved="check(recipe.id)"
            @recipeUnsaved="fetchSavedRecipes"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <EmptyState v-else :image="image" :title="title" :message="message">
    </EmptyState>
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
    await this.fetchRecipes();
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
    };
  },
  methods: {
    async fetchRecipes() {
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
