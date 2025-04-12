import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth_store'

const authStore = useAuthStore()

export const authService = () => {
  const login = async (data) => {
    const response = await api.post('v1/auth/autenticar', data)
    authStore.setAuth(response.data)
  }

  const recuperarAcesso = async (email) => {
      await api.post('v1/auth/recuperar-acesso', { email })
  }

  return { login, recuperarAcesso }
}
