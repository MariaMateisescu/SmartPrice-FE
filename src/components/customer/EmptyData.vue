<template>
  <div class="empty-data">
    <img :src="`src/assets/illustrations/${image}`" alt="" />
    <div class="empty-data__title">{{ title }}</div>
    <div class="message">
      {{ message }}
    </div>
    <slot name="button"></slot>
  </div>
</template>

<script>
export default {
  name: "EmptyData",
  props: ["image", "title", "message"],
};
</script>

<style scoped>
.empty-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 50px;
  text-align: center;
}
.empty-data__title {
  font-size: 30px;
  font-weight: 700;
}
/* .q-card__height {
  height: 100vh;
  max-height: calc(100vh - 50px) !important;
  background-color: #eee;
} */

.btn {
  width: 100%;
  max-width: 300px;
  background: #267378;
  color: rgb(255, 255, 255, 0.9);
  font-size: 20px;
  border-radius: 15px;
  margin-top: 20px;
}

.message {
  font-size: 18px;
}
</style>
