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
    await store.register(username, email, password); // ne moze ovako: await store.register(newUser.value);
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

/////
const suggestions = ref([]);
let debounceTimer = null;
const showSuggestions = ref(false);
function closeDropdown() {
  showSuggestions.value = false;
}

function onInput() {
  clearTimeout(debounceTimer);
  showSuggestions.value = false;

  if (newUser.value.username.trim().length < 2) return;

  debounceTimer = setTimeout(async () => {
    try {
      await store.searchInput(newUser.value.username, suggestions, showSuggestions);
    } catch (err) {
      console.error('Search failed:', err);
    }
  }, 400);
}

function selectSuggestion(name) {
  newUser.value.username = name;
  showSuggestions.value = false;
}
/////

// // Email autocomplete refs
const emailSuggestions = ref([]);
let emailDebounceTimer = null;
const showEmailSuggestions = ref(false);
function closeEmailDropdown() {
  showEmailSuggestions.value = false;
}

function onEmailInput() {
  clearTimeout(emailDebounceTimer);
  showEmailSuggestions.value = false;

  if (newUser.value.email.trim().length < 2) return;

  emailDebounceTimer = setTimeout(async () => {
    try {
      await store.searchEmail(newUser.value.email, emailSuggestions, showEmailSuggestions);
    } catch (err) {
      console.error('Email search failed:', err);
    }
  }, 400);
}

function selectEmailSuggestion(email) {
  newUser.value.email = email;
  showEmailSuggestions.value = false;
}
// //

</script>

<template>
  <h1>Register</h1>
  <article>
    <p v-if="error" style="color:brown">Registration failed!</p>
    <form @submit.prevent="register">
      <label for="username">Username</label>
      <div class="autocomplete-wrapper">
        <!-- @input fires onInput on every keystroke(pritisak tastera, paste, etc.) to trigger the debounced search -->
        <!-- @blur - aktivira se kada se izgubi fokus sa elementa -->
        <input @input="onInput" @blur="closeDropdown" v-model="newUser.username" type="text" id="username"
          autocomplete="off" />
        <Transition name="dropdown">
          <ul v-if="suggestions.length && showSuggestions" class="suggestions">
            <!-- The @mousedown.prevent on the <li> items prevents @blur from firing when clicking a suggestion, so those still work correctly. -->
            <li v-for="name in suggestions" :key="name" @mousedown.prevent="selectSuggestion(name)">
              <span class="match">{{ name.slice(0, newUser.username.length) }}</span>
              <span>{{ name.slice(newUser.username.length) }}</span>
            </li>
          </ul>
        </Transition>
      </div>

      <label for="email">Email</label>
      <div class="autocomplete-wrapper">
        <input @input="onEmailInput" @blur="closeEmailDropdown" v-model="newUser.email" type="email" id="email"
          autocomplete="off" />
        <Transition name="dropdown">
          <ul v-if="emailSuggestions.length && showEmailSuggestions" class="suggestions">
            <li v-for="e in emailSuggestions" :key="e" @mousedown.prevent="selectEmailSuggestion(e)">
              <span class="match">{{ e.slice(0, newUser.email.length) }}</span>
              <span>{{ e.slice(newUser.email.length) }}</span>
            </li>
          </ul>
        </Transition>
      </div>
      <label for="password">Password</label>
      <input v-model="newUser.password" type="password" id="password" />
      <button type="submit">Register</button>
    </form>
  </article>
</template>

<style lang="sass" scoped>
.autocomplete-wrapper
  position: relative

.suggestions
  position: absolute
  top: calc(100% + 4px)
  left: 0
  right: 0
  z-index: 100
  margin: 0
  padding: 0.25rem
  list-style: none
  background: var(--pico-card-background-color)
  border: 1px solid var(--pico-muted-border-color)
  border-radius: var(--pico-border-radius)
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4)
  overflow: hidden

  li
    padding: 0.5rem 0.75rem
    border-radius: calc(var(--pico-border-radius) - 2px)
    cursor: pointer
    font-size: 0.9rem
    color: var(--pico-color)
    transition: background 0.15s ease

    .match
      color: var(--pico-primary)
      font-weight: 600

    &:hover
      background: var(--pico-primary-focus)

// Transition animation
.dropdown-enter-active,
.dropdown-leave-active
  transition: opacity 0.15s ease, transform 0.15s ease

.dropdown-enter-from,
.dropdown-leave-to
  opacity: 0
  transform: translateY(-4px)
</style>
