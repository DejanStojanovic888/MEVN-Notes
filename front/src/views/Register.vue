<script setup>
import useAuthStore from '@/stores/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const error = ref(null);

const store = useAuthStore();
const newUser = ref({
    username: '',
    email: '',
    password: ''
})

async function register() {
    try {
        const { username, email, password } = newUser.value;
        await store.register(username, email, password); // i u storu je isto ime register za f-ju
        newUser.value = {  // resetujemo formu
            username: '',
            email: '',
            password: ''
        }

        store.setFlashMessage('Registration successful'); // ovde postavimo pa u Login.vue preuzmemo // store.flashMessage = 'Registration successful'; // ovde postavimo pa u Login.vue preuzmemo
        router.push('/login');
        // router.push({path: '/login', query: {registered: true}}); // ovo je bitno!!
    } catch (e) {
        error.value = true
    }
}
</script>

<template>
  <h1>Register</h1>
  <article>
    <p v-if="error" style="color:brown">Registration failed!</p>
    <form @submit.prevent="register">
        <label for="username">Username</label>
        <input v-model="newUser.username" type="text" id="username"/>
        <label for="email">Email</label>
        <input v-model="newUser.email" type="email" id="email"/>
        <label for="password">Password</label>
        <input v-model="newUser.password" type="password" id="password"/>
        <button type="submit">Register</button>
    </form>
  </article>
</template>

<style lang = 'sass' scoped>

</style>