<script setup>
import useNotesStore from '@/stores/notesStore';
import { onMounted, ref } from 'vue';

const noteStore = useNotesStore();

const notes = ref([]);

onMounted(async () => {
  try {
    const response = await noteStore.fetchNotes();
    // console.log(response);
    notes.value = response; 
  } catch (error) {
    console.error(error);
  }
})
</script>

<template>
  <h2>All notes:</h2>
  <ul>
    <li v-for="note in notes" :key="note.id">
      <h2>{{ note.title }}</h2>
      <p>{{ note.content }}</p>
    </li>
  </ul>
</template>

<style lang = 'sass' scoped>

</style>