import authRouter from './../pages/auth/router'
import clienteRouter from './../pages/clientes/router'
import vendasRouter from './../pages/vendas/router'
import usuarioRouters from './../pages/usuarios/router'
import pedidoRouter from './../pages/pedidos/router'

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
      { path: '', name: 'dashboard', component: () => import('src/pages/dashboard/IndexPage.vue') },
      { path: '/profile', name: 'profile', component: () => import('src/pages/profile/PerfilPage.vue') },
      ...clienteRouter,
      ...vendasRouter,
      ...usuarioRouters,
      ...pedidoRouter
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
