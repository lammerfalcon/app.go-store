import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '@/views/ProductsView.vue'
import PayOrderView from '@/views/PayOrderView.vue'
import PaymentView from '@/views/PaymentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: ProductsView,
      meta: { transition: 'slide-right' },

    },
    {
      path: '/order',
      name: 'order',
      component: PayOrderView,
      meta: { transition: 'slide-left' },

    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentView,
      meta: { transition: 'slide-left' },

    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
