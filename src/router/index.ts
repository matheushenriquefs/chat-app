import { createRouter, createWebHistory } from 'vue-router'
import { HomeView } from '../views/HomeView'
import { ChatView } from '../views/ChatView'
import { RegisterView } from '../views/RegisterView'

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
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

export default router
