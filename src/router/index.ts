import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'funnelsView',
      component: () => import('../views/FunnelView.vue'),
    },
    {
      path: '/steps/:id',
      name: 'CRMStepsView',
      component: () => import('../views/CRMStepsView.vue')
    },
    {
      path: '/contacts',
      name: 'ContactsListView',
      component: () => import('../views/ContactsListView.vue')
    },
    {
      name: '/favorites',
      name: 'FavoriteListView',
      component: () => import ('../views/FavoritesListView.vue')
    }
  ],
})

export default router
