<template>
  <div>
    <h3>Products List</h3>
    <div
      v-for="university in universities"
      :key="university.name"
      class="univ-card"
    >
      {{ university.name }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductsList",
  data() {
    return {
      universities: [],
    };
  },
  mounted() {
    axios
      .get("http://universities.hipolabs.com/search?country=United+States")
      .then((res) => {
        this.universities = res.data;
        console.log(this.universities);
      });
  },
};
</script>

<style scoped>
.univ-card {
  display: flex;
  padding: 10px;
  background-color: aquamarine;
}
</style>
