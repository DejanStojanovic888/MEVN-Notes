<script setup>
import router from '@/router';
import useAuthStore from '@/stores/authStore';
import { onMounted, ref } from 'vue';
const store = useAuthStore();

const theme = ref('dark');

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  theme.value = savedTheme;
  document.documentElement.setAttribute('data-theme', theme.value); // document.documentElement je html element
})

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', theme.value);
  document.documentElement.setAttribute('data-theme', theme.value);
}

const logout = async () => {
  await store.logout();  // AWAIT !!
  router.push('/');
}


</script>

<template>
  <nav>
    <ul>
        <li v-if="!store.user">
            <router-link to="/">Welcome</router-link>
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
        </li>
        <li v-else>
          <router-link to="/dashboard">Dashboard</router-link>
          <button @click="logout">Logout</button>
        </li>
        <li><i @click="toggleTheme" :class="{ 'bi-moon-fill': theme === 'light', 'bi-sun': theme === 'dark'}"></i></li> 
    </ul>
  </nav>
</template>

<style lang = 'sass' scoped>
.router-link-active.router-link-exact-active
  font-weight: bold
  color: orangered
  text-decoration: none
a
  margin-right: 10px
i
  cursor: pointer
</style>