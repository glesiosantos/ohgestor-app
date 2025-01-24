<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="full-width q-pa-sm">
      <q-img src="./../../assets/img/oh_gestor.png" style="width: 150px;"/>
      <q-separator class="full-width q-ma-lg"/>
      <q-form @submit.prevent="handleForm" class="q-gutter-y-sm">
        <q-input outlined v-model="form.email" label="E-mail" />
        <q-input outlined v-model="form.senha" type="password" label="Senha" />
        <q-btn color="primary" type="submit" label="Acessar plataforma" class="full-width"/>
      </q-form>
      <q-btn
        color="red"
        label="Esqueci da senha"
        :to="{ name: 'forgout'}"
        flat
        class="full-width q-mt-sm"
      />
    </q-card>
  </q-page>
</template>

<script setup>
import { api} from 'boot/axios'
import { useAuthStore } from 'src/stores/auth_store'
import { reactive } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useAuthStore()

const form = reactive({
  email: '',
  senha: ''
})

const handleForm = () => {
  api.post('v1/auth/autenticar', form).then( response => {
    store.setAuth('*** data ',response.data)
    router.push({ name: 'dashboard'})
  }).catch(error => console.log('Error ',error))
}

</script>
