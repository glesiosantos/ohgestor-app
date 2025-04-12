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
    console.log('Token removido do localStorage')
  }

  const checkToken = async () => {
    if (!auth.value?.token) {
      console.log('Nenhum token encontrado')
      removeAuth()
      return false
    }
    try {
      console.log('Validando token:', auth.value.token.substring(0, 20) + '...') // Log parcial do token
      const bearerToken = `Bearer ${auth.value.token}`
      const { data } = await api.get('v1/auth/validar-token', {
        headers: { Authorization: bearerToken }
      })
      console.log('Resposta da validação:', data)
      return data.valid || true // Ajuste conforme a resposta da API
    } catch (error) {
      console.error('Erro ao validar token:', error.response?.data || error.message)
      removeAuth()
      return false
    }
  }

  return { auth, setAuth, checkToken, isAuth, removeAuth }
})
