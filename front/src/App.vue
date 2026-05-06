<script setup>
import { onMounted } from "vue";
import  useAuthStore  from "./stores/authStore";

const store = useAuthStore();

onMounted(async () => {
  await store.me();
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
