import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

const AUTH_TOKEN = 'api-token'

export const useAuthStore = defineStore('authStore', () => {

  const auth = ref(JSON.parse(localStorage.getItem(AUTH_TOKEN)))
  const isAuth = ref(auth.value ? true : false)

  const setAuth = (data) => {
    isAuth.value = true
    window.localStorage.setItem(AUTH_TOKEN, JSON.stringify(data))
  }

  const removeAuth = () => {
    isAuth.value = false
    window.localStorage.removeItem(AUTH_TOKEN)
  }

  const checkToken = async ()  => {
    try {
      const bearerToken = `Bearer ${auth.value.token}`
      const { data } = await api.get('v1/auth/validar-token', {headers: {
        Authorization: bearerToken
      }})
      return data
    }catch(error) {
      removeAuth()
      console.log(error.response.data)}
  }

  return { auth, setAuth, checkToken, isAuth, removeAuth }
})
