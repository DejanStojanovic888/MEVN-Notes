import { defineStore } from "pinia";

const useNotesStore = defineStore("notes", () => {
    async function saveNote(title, content) {
        const response = await fetch("http://localhost:3000/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ title, content }),
        })
        if (response.ok) {
            const data = await response.json();
            return data;
        }
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
        return data.notes;
        
    }


    return { saveNote, fetchNotes };
});

export default useNotesStore;