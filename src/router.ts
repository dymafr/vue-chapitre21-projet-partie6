import { createRouter, createWebHistory } from 'vue-router'
import { ADMIN_ROUTES } from './features/admin/admin.routes'
import { initialFetchAdminProducts } from './features/admin/stores/adminProductStore'
import { initialFetchProducts } from './features/boutique/stores/productStore'
import AppNotFound from './views/AppNotFound.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/boutique',
    },
    {
      path: '/boutique',
      beforeEnter: [initialFetchProducts],
      component: () => import('@/features/boutique/AppBoutique.vue'),
    },
    {
      path: '/admin',
      beforeEnter: [initialFetchAdminProducts],
      component: () => import('@/features/admin/AppAdmin.vue'),
      children: ADMIN_ROUTES,
    },
    {
      path: '/:AppNotFound(.*)*',
      component: AppNotFound,
    },
  ],
})
