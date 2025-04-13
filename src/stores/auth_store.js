import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

const AUTH_TOKEN = 'api-token'

export const useAuthStore = defineStore('authStore', () => {
  const auth = ref(JSON.parse(localStorage.getItem(AUTH_TOKEN)) || null)
  const isAuth = ref(!!auth.value)

  const setAuth = (data) => {
    console.log('setAuth chamado com:', data)
    if (!data?.token) {
      console.error('Dados de autenticação inválidos:', data)
      return
    }
    auth.value = data
    isAuth.value = true
    try {
      localStorage.setItem(AUTH_TOKEN, JSON.stringify(data))
      console.log('Token salvo no localStorage:', localStorage.getItem(AUTH_TOKEN))
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error)
    }
  }

  const removeAuth = () => {
    auth.value = null
    isAuth.value = false
    localStorage.removeItem(AUTH_TOKEN)
  }

  const checkToken = async () => {
    if (!auth.value?.token) {
      removeAuth()
      return false
    }
    try {
      const bearerToken = `Bearer ${auth.value.token}`
      const { data } = await api.get('v1/auth/validar-token', {
        headers: { Authorization: bearerToken }
      })
      return data.valid || true
    } catch (error) {
      console.error('Erro ao validar token:', error.response?.data || error.message)
      removeAuth()
      return false
    }
  }

  return { auth, setAuth, checkToken, isAuth, removeAuth }
})
