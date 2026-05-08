<script setup>
import useAuthStore from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import useNotesStore from '@/stores/notesStore';
import { onMounted } from 'vue';
const store = useAuthStore();
const notesStore = useNotesStore();

const { notes } = storeToRefs(notesStore); // ovde mozemo ovako i bez onMounted

// ovo ispod Danilo nije stavio i radilo mu je bez onMounted da stavi onaj br. u zagradama
// na liniji 37 ali ne znam kako jer meni bez onMounted ovde ne radi
// tj. nije radilo kada se izlogujem pa opet ulogujem
onMounted(async () => {
  if (notes.value.length > 0) {
    return;
  }
  try {
    await notesStore.fetchNotes();
  } catch (error) {
    console.error(error);
  }
})

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
    <!-- ovde ne mora notes.value.length -->
    <router-link to="/dashboard/notes">Notes({{ notes.length }})</router-link>
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