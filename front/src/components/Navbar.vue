<script setup>
import useAuthStore from '@/stores/authStore';
const store = useAuthStore();
</script>

<template>
  <nav>
    <ul>
        <li v-if="!store.user">
            <router-link to="/">Welcome</router-link>
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
        </li>
        <li v-else><router-link to="/dashboard">Dashboard</router-link></li>
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
</style>