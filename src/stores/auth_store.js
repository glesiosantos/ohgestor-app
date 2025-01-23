import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

const AUTH_TOKEN = 'api-token'

export const useAuthStore = defineStore('authStore', () => {

  const auth = ref(null)

  const onLogin = async (data) => {
    const response = await api.post('v1/login', data)
    auth.value = response.data
    window.localStorage.setItem(AUTH_TOKEN,JSON.stringify(auth.value))
  }

  const removeAuth = () => {
    auth.value = null
    window.localStorage.removeItem(AUTH_TOKEN)
  }

  const getAuth = () => !!auth.value

  return { onLogin, auth, getAuth, removeAuth, AUTH_TOKEN }

})
