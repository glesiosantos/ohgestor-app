<template>
  <router-view />
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth_store';

const router = useRouter()
const store = useAuthStore()

if(store.auth) {
  router.push({name: 'dashboard'})
}

</script>
