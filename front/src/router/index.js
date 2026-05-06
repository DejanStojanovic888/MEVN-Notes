import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import Welcome from '../views/Welcome.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import  useAuthStore  from '@/stores/authStore.js';
import Notes from '@/views/Notes.vue'
import Expenses from '@/views/Expenses.vue'
import NotesList from '@/views/NotesList.vue'
import AddNote from '@/views/AddNote.vue'

const router = createRouter({
  // da svaka putanja krece od root-a projekta(valjda). Sad to necemo raditi.
  // da sve pocinje od danilovesovic.com/
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: MainLayout, children: [
      { path: '/', component: Welcome, meta: { requiresGuest: true } },
      { path: '/login', component: Login, meta: { requiresGuest: true } },
      { path: '/register', component: Register, meta: { requiresGuest: true } },
      { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true }, children: [
        { path: 'notes', component: Notes, children: [  // iako je children apply-uje se meta: { requiresAuth: true } sa parent-a
          { path: "", component: NotesList },
          { path: "add", component: AddNote },
        ]}, 
        { path: 'expenses',  component: Expenses },  // ne sme "/expenses" jer je to onda apsolutna putanja
                                                     //  In children, never use a leading / unless you intentionally want an absolute path that bypasses the parent prefix.
      ]},
    ]},
  ],
})

router.beforeEach(async (to) => {  // ovo se prvo opaljuje ali samo na REFRESH !!!
  const store = useAuthStore();
  if (!store.checked) {
    await store.me();
  }

  if (to.meta.requiresAuth && !store.user) {
    return '/login';
  }

  if (to.meta.requiresGuest && store.user) {
    return '/dashboard';  // ako pokusamo da idemo na na primer /register a vec smo ulogovani, vraca nas na /dashboard
  }

  // if (to.matched.some(r => r.meta.requiresAuth) && !store.user) {
  //   return '/login';
  // }

  // if (to.matched.some(r => r.meta.requiresGuest) && store.user) {
  //   return '/dashboard';
  // }
})

export default router

// When you navigate to /dashboard/notes, Vue Router matches all routes that were involved in resolving that path — not just the final one. So to.matched is an array like:
// javascript[
//   { path: '/', meta: {} },               // MainLayout
//   { path: '/dashboard', meta: { requiresAuth: true } },  // Dashboard
//   { path: 'notes', meta: {} }            // Notes (no meta)
// ]
// .some(r => r.meta.requiresAuth)
// .some() loops through the array and returns true if at least one element satisfies the condition. So this is asking: "does any route in the chain have requiresAuth: true?"
// For /dashboard/notes, it finds it on the /dashboard parent → returns true.
// Without to.matched, you'd only check the current leaf route (notes), which has no meta → would return undefined (falsy) → guard never triggers.
// The full condition
// javascriptif (to.matched.some(r => r.meta.requiresAuth) && !store.user) {
//     return '/login';
// }
// Translates to plain English: "if any route in the chain requires auth, AND the user is not logged in → redirect to login."
// Same logic for the guest check — if any route in the chain requires a guest (not logged in) and the user IS logged in, redirect to dashboard.