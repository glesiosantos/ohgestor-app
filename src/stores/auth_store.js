import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

const AUTH_TOKEN = 'api-token'

export const useAuthStore = defineStore('authStore', () => {

  let auth = ref(JSON.parse(localStorage.getItem(AUTH_TOKEN)))

  const setAuth = (data) => window.localStorage.setItem(AUTH_TOKEN, JSON.stringify(data))

  const removeAuth = () => window.localStorage.removeItem(AUTH_TOKEN)

  const checkToken = async ()  => {
    try {
      const bearerToken = `Bearer ${auth.value.token}`
      const { data } = await api.get('v1/auth/validar-token', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          Authorization: bearerToken
        }
      })
      return data
    }catch(error) { console.log(error.response.data)}
  }

  return { auth, setAuth, checkToken, removeAuth }
})
