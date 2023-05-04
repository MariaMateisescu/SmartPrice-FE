<template>
  <div class="recipe-card__title">{{ recipeInfo.title }}</div>
  <q-card class="recipe-card">
    <div class="asd" @click="$emit('detailedRecipe', recipeInfo)">
      <q-img class="recipe-card__image" :src="recipeInfo.image"> </q-img>
    </div>
    <q-icon
      v-if="!isSaved"
      name="favorite_border"
      class="recipe-card__heart"
      @click="onAddToFavourites"
    />
    <q-icon
      v-if="isSaved"
      name="favorite"
      class="recipe-card__heart"
      @click="onRemoveFromFavourites"
    />
  </q-card>
</template>

<script>
import { matFavoriteBorder } from "@quasar/extras/material-icons";

export default {
  name: "RecipeCard",
  props: ["recipeInfo", "isSaved"],

  created() {
    this.matFavoriteBorder = matFavoriteBorder;
  },
  emits: ["recipeSaved", "recipeUnsaved", "detailedRecipe"],
  methods: {
    async onAddToFavourites() {
      const res = await this.$api.patch(`/recipes/save/${this.recipeInfo.id}`);
      this.$emit("recipeSaved", this.recipeInfo);
    },
    async onRemoveFromFavourites() {
      const res = await this.$api.patch(
        `/recipes/unsave/${this.recipeInfo.id}`
      );
      this.$emit("recipeUnsaved", this.recipeInfo);
    },
  },
};
</script>

<style scoped>
.recipe-card {
  border-radius: 15px;
  margin: 0 5px 20px;
}
.recipe-card__image {
  height: 150px;
  border-radius: 15px;
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
  background: rgb(54, 62, 75);
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0) 75%,
    rgba(34, 31, 31, 0.456) 120%
  );
}
.recipe-card__title {
  font-size: 16px;
  margin: 0px 5px 0px;
}
.recipe-card__heart {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
  font-size: 28px;
  color: #fff;
}
</style>
