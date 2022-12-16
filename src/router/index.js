import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/UserBoard.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/HomePage.vue')
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
        component: () => import('@/views/ProductDetail.vue')
      },
      {
        path: 'cart',
        component: () => import('@/views/CartPage.vue')
      },
      {
        path: 'checkout/',
        component: () => import('@/views/CheckoutPage.vue')
      },
      {
        path: 'checkout/:orderId',
        component: () => import('@/views/PaymentPage.vue')
      },
      {
        path: 'complete',
        component: () => import('@/views/CompleteCheckout.vue')
      },
      {
        path: 'favorite',
        component: () => import('@/views/FavoritePage.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  },
  {
    path: '/dashboard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/ProductsPage.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/AdminOrders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/AdminCoupons.vue')
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
