<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="full-width q-pa-sm">
      <q-img src="./../../assets/img/oh_gestor.png" style="width: 150px;"/>
      <q-separator class="full-width q-ma-lg"/>
      <q-form @submit.prevent="handleForm" class="q-gutter-y-sm">
        <q-input
          outlined
          v-model="form.email"
          type="email"
          label="E-mail"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'E-mail é campo obrigatório']"
        />
        <q-input
          outlined
          v-model="form.senha"
          type="password"
          label="Senha"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Senha é campo obrigatório']"/>
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
import useNotify from 'src/composables/UseNotify'
import { useAuthStore } from 'src/stores/auth_store'
import { reactive } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const {notfifyError, notfifySucess} = useNotify()
const store = useAuthStore()

let form = reactive({
  email: '',
  senha: ''
})

const handleForm = () => {
  api.post('v1/auth/autenticar', form).then( response => {
    store.setAuth(response.data)
    form = {
      email: '',
      senha: ''
    }
    notfifySucess('Login realizado com sucesso')
    router.push({ name: 'dashboard'})
  }).catch(error => {
    router.push({ name: 'sign-in'})
    if(error.status === 403) notfifyError('Credenciais invalidas!')
  })
}

</script>
