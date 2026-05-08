<script setup>
import useNotesStore from '@/stores/notesStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const noteStore = useNotesStore();

const { notes } = storeToRefs(noteStore)

onMounted(async () => {
  if (notes.value.length > 0) {
    return;
  }
  try {
    await noteStore.fetchNotes();
  } catch (error) {
    console.error(error);
  }
})

const grid = ref(false)
</script>

<template>
  <div class="one">
    <h2>All notes:</h2>
    <i @click="grid = !grid" class="bi bi-grid-3x2-gap-fill"></i>
  </div>
  <div  :class="grid ? 'grid' : ''">
    <article v-for="note in notes" :key="note.id">
      <h2>{{ note.title }}</h2>
      <p>{{ note.content }}</p>
    </article>
  </div>
</template>

<style lang = 'sass' scoped>
.one
  display: flex
  align-items: center
  justify-content: space-between
  gap: 20px
  margin-top: 20px
i
  cursor: pointer 
</style>