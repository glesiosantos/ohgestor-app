<template>
  <router-view />
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth_store';

const store = useAuthStore()
const router = useRouter()

if(store.isAuth && store.auth) {
  (async() => {
    try {
      await store.checkToken()
      router.push({ name: 'dashboard'})
    } catch (error) {
      console.log('Token invalido ', error)
      store.removeAuth()
      router.push({ name: 'sign-in'})
    }
  })()
}

</script>
