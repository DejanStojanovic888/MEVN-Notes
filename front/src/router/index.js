import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import Welcome from '../views/Welcome.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'

const router = createRouter({
  // da svaka putanja krece od root-a projekta(valjda). Sad to necemo raditi.
  // da sve pocinje od danilovesovic.com/
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: MainLayout, children: [
      { path: '/', component: Welcome },
      { path: '/login', component: Login },
      { path: '/register', component: Register },
      { path: '/dashboard', component: Dashboard },
    ]
    },
  ],
})

export default router
