import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/PayOrderView.vue'),
    },
  ],
})

export default router
