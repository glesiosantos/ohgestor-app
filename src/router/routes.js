import authRouter from './../pages/auth/router'

const routes = [
  {
    path: '',
    component: () => import('layouts/AuthLayout.vue'),
    children: [...authRouter]
  },
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('src/pages/dashboard/IndexPage.vue') }
    ],
    meta: {
      auth: true
    }
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
