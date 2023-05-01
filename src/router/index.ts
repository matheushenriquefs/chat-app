import { createRouter, createWebHistory } from 'vue-router'
import { HomeView } from '../views/HomeView'
import { ChatView } from '../views/ChatView'

const router = createRouter({
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
})

export default router
