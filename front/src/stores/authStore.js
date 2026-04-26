import { defineStore } from "pinia";
import { ref } from "vue";

const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  const flashMessage = ref(null);
  function setFlashMessage(message) {
    flashMessage.value = message;
    setTimeout(() => {
      flashMessage.value = null;
    }, 3000);
  }
  
  const register = async (username, email,  password) => {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, email, password }),
    });
    if (response.ok) {
        const data = await response.json();
        user.value = data;
    } else {
        user.value = null;
        throw new Error("Registration failed");
    }
  };

  const searchInput = async (username, suggestions, showSuggestions) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/search?username=${encodeURIComponent(username)}`);  
      suggestions.value = await res.json();      
      showSuggestions.value = true; 
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const searchEmail = async (email, suggestions, showSuggestions) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users/search-email?email=${encodeURIComponent(email)}`);
    suggestions.value = await res.json();
    showSuggestions.value = true;
  } catch (err) {
    console.error('Email search failed:', err);
  }
};

  return {
    user, register, flashMessage, setFlashMessage, searchInput, searchEmail
  };
});

export default useAuthStore;