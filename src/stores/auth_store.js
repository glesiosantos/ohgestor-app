import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

const AUTH_TOKEN = 'api-token'


export const useAuthStore = defineStore('authStore', () => {

  const user = ref({})

  const onLogin = (data) => {
    api.post('v1/login', data).then(response => {

      if(typeof window.localStorage !== 'undefined' && data) {
        window.localStorage.setItem(AUTH_TOKEN, JSON.stringify(response.data))
        user.value = response.data
      }

    }).catch(error => console.log(error))
  }

  const onLogout = () => {}

  return { AUTH_TOKEN, user, onLogout, onLogin }

})
