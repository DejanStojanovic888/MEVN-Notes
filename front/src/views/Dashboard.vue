<script setup>
import useAuthStore from '@/stores/authStore';
const store = useAuthStore();
</script>

<template>
  <h1>Dashboard</h1>
  <div class="tom">
<!-- "/" je za public folder. Dobro za staticne slike -->
<!-- najbitnije je kako cemo na backendu raditi sa slikama pomocu MULTER-a -->
    <img src="@/assets/fffd.jpg" alt="">
  </div>
  <h1>Hello {{ store.user?.username }}</h1>
  <p>Email: {{ store.user?.email }}</p>
  <article>
    <router-link to="/dashboard/notes">Notes</router-link>
    <router-link to="/dashboard/expenses">Expanses</router-link>
    <router-link to="/dashboard">Close</router-link>
  </article>
  <article>
    <router-view></router-view>
  </article>
</template>

<style lang = 'sass' scoped>
a
  margin-right: 20px
.tom
  img
    border-radius: 20%
    height: 400px
</style>