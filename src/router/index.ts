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
      path: '/settings',
      name: 'User Settings',
      component: () => import('../views/UserSettingsView.vue')
    },
    {
      path: '/favorites',
      name: 'FavoriteListView',
      component: () => import('../views/FavoritesListView.vue')
    },
    {
      path: '/reports',
      name: 'ReportsView',
      component: () => import('../views/ReportsView.vue'),
      children: [
        {
          path: 'sales-by-period',
          name: 'Sales By Period',
          component: () => import('../views/Reports/SalesByPeriod.vue')
        },
        {
          path: 'profit-by-funnels-bar',
          name: 'Profit By Funnels Bar',
          component: () => import('../views/Reports/ProfitByFunnelsBar.vue')
        },
        {
          path: 'profit-by-funnels-line',
          name: 'Profit By Funnels Line',
          component: () => import('../views/Reports/ProfitByFunnelsLine.vue')
        },
        {
          path: 'percentage-by-funnel',
          name: 'Percentage By Funnel',
          component: () => import('../views/Reports/PercentageByFunnel.vue')
        },
        {
          path: 'total-rejection',
          name: 'Total Rejection',
          component: () => import('../views/Reports/RejectionRate.vue')
        },
        {
          path: 'full-approval',
          name: 'Full Approval',
          component: () => import('../views/Reports/ApprovalRate.vue')
        }
      ]
    }
  ],
})

export default router
