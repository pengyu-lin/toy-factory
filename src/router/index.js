import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Userboard.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'products',
        component: () => import('@/views/ProductList.vue')
      },
      {
        path: 'about',
        component: () => import('@/views/AboutUs.vue')
      },
      {
        path: 'faq',
        component: () => import('@/views/FAQ.vue')
      },
      {
        path: 'products/:productId',
        component: () => import('@/views/UserProduct.vue')
      },
      {
        path: 'cart',
        component: () => import('@/views/Cart.vue')
      },
      {
        path: 'checkout/',
        component: () => import('@/views/Checkout.vue')
      },
      {
        path: 'checkout/:orderId',
        component: () => import('@/views/Payment.vue')
      },
      {
        path: 'complete',
        component: () => import('@/views/Complete.vue')
      },
      {
        path: 'favorite',
        component: () => import('@/views/Favorite.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Products.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/Orders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/Coupons.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
