import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView/HomeView.vue')
const ChatView = () => import('../views/ChatView/ChatView.vue')
const RegisterView = () => import('../views/RegisterView/RegisterView.vue')

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
