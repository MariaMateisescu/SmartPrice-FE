<template>
  <q-card class="card-container" :style="{ backgroundColor: cardInfo.color }">
    <div class="card-name text-white">{{ cardInfo.name }}</div>
  </q-card>
</template>

<script>
export default {
  name: "FidelityCard",
  props: ["cardInfo"],
};
</script>

<style scoped>
.card-name {
  font-size: 24px;
  font-weight: 600;
  mix-blend-mode: difference;
}
.card-container {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
}
.code-img {
  width: 70px;
}
</style>
