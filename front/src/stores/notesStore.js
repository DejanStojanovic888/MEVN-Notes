import { defineStore } from "pinia";
import { ref } from "vue";

const useNotesStore = defineStore("notes", () => {

    const notes = ref([]);

    async function saveNote(title, content) {
        const response = await fetch("http://localhost:3000/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ title, content }),
        })
        if(!response.ok) {
            throw new Error("Failed to save note");
        }
        const data = await response.json();
        notes.value.push(data);
    }

    async function fetchNotes() {
        const response = await fetch("http://localhost:3000/api/notes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
        if (!response.ok) {
            throw new Error("Failed to fetch notes");
        }
        const data = await response.json();
        // return data.notes;
        notes.value = data.notes;
    }

    return { saveNote, fetchNotes, notes };
});

export default useNotesStore;