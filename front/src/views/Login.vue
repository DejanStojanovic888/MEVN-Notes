<script setup>
import { ref } from 'vue';
// import { useRoute } from 'vue-router';
import useAuthStore from '@/stores/authStore';
import router from '@/router';

const store = useAuthStore();

const loginData = ref({
  email: '',
  password: ''
});

const login = async () => {
  
    await store.login(loginData.value.email, loginData.value.password);
    router.push('/dashboard');
}

</script>

<template>
  <h1>Login</h1>
  <article>
    <!-- <p v-if="fromRegister">Your registration is successful</p> -->
    <p v-if="store.flashMessage"> {{ store.flashMessage }} </p>
    <form @submit.prevent="login">
        <label for="email">Email</label>
        <input v-model="loginData.email" type="text" id="email"/>
        <label for="password">Password</label>
        <input v-model="loginData.password" type="password" id="password"/>
        <button type="submit">Login</button>
    </form>
  </article>
</template>

<style lang = 'sass' scoped>
p
  color: turquoise
</style>