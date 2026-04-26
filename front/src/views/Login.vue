<script setup>
import { ref } from 'vue';
// import { useRoute } from 'vue-router';
import useAuthStore from '@/stores/authStore';

const store = useAuthStore();

// const route = useRoute(); 
// const fromRegister = ref(false);


// if(route.query.registered) {  // bitno!
//   fromRegister.value = true
// }
</script>

<template>
  <h1>Login</h1>
  <article>
    <!-- <p v-if="fromRegister">Your registration is successful</p> -->
    <p v-if="store.flashMessage"> {{ store.flashMessage }} </p>
    <form >
        <label for="email">Email</label>
        <input type="text" id="email"/>
        <label for="password">Password</label>
        <input type="password" id="password"/>
        <button type="submit">Login</button>
    </form>
  </article>
</template>

<style lang = 'sass' scoped>
p
  color: turquoise
</style>