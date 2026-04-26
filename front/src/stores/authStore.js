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

  return {
    user, register, flashMessage, setFlashMessage
  };
});

export default useAuthStore;