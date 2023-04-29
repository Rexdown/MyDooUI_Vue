import { createRouter, createWebHistory } from 'vue-router'
import AuthorizationPage from '@/pages/AuthorizationPage.vue'
import MainPage from '@/pages/MainPage.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: AuthorizationPage
  },
  {
    path: '/main',
    name: 'main',
    component: MainPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
