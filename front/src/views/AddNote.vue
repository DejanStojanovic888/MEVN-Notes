<script setup>
import useNotesStore from '@/stores/notesStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const noteStore = useNotesStore();

const newNote = ref({
  title: '',
  content: ''
})

const saveNote = async () => {
  await noteStore.saveNote(newNote.value.title, newNote.value.content);
  router.push('/dashboard/notes');
}
</script>

<template>
  <h1>Add New Note</h1>
  <form action="" @submit.prevent="saveNote">
    <label for="title">Title</label>
    <input v-model="newNote.title" type="text" id="title" name="title">
    <label for="content">Content</label>
    <textarea v-model="newNote.content" name="content" id="content"></textarea>
    <button type="submit">Add Note</button>
  </form>
</template>

<style lang = 'sass' scoped>

</style>