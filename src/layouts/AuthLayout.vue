<template>
  <q-layout view="lhh lpr lFf">
    <q-page-container class="row auth-background">
        <div class="col-xs-12 col-md-4">
          <router-view />
        </div>
        <div class="col-xs-12 col-md-8 q-xs-hidden"></div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
// import { useAuthStore } from 'src/stores/auth_store'
// import { useRouter } from 'vue-router'

//   const router = useRouter()
//   const store = useAuthStore()

//   if(store.auth.token) {
//     router.push({name: 'dashboard'})
//   }else {
//     router.push({name: 'sign-in'})
//   }

</script>

