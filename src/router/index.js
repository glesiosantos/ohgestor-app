import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'src/stores/auth_store'

export default defineRouter(function () {
  const store = useAuthStore()

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) => {
    // Verifica o token se o usuário está autenticado
    if (store.isAuth) {
      const isValid = await store.checkToken()
      if (!isValid) store.removeAuth()
    }

    if (to.meta?.auth) {
      // Rota exige autenticação
      store.isAuth ? next() : next({ name: 'sign-in' })
    } else if (to.name === 'sign-in' && store.isAuth) {
      // Redireciona para dashboard se já autenticado
      next({ name: 'dashboard' })
    } else {
      next()
    }
  })

  return Router
})
