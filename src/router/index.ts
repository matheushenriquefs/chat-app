import { createRouter, createWebHistory } from 'vue-router'
import { HomeView } from '../views/HomeView'
import ChatView from '../views/ChatView.vue'

export const options = {
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView
    }
  ]
}

const router = createRouter(options)

export default router
