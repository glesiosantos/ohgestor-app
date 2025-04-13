<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="full-width q-pa-sm">
      <q-img src="./../../assets/img/ohGestor.png" style="width: 150px;"/>
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
import { reactive } from 'vue';
import { authService } from './services/auth_service'
import useNotify from 'src/composables/UseNotify';
import { useRouter } from 'vue-router'

const {notifyError} = useNotify()
const {login} = authService()

const router = useRouter()

let form = reactive({
  email: '',
  senha: ''
})

const handleForm = async () => {
  try {
    await login(form)
    router.push({ name: 'dashboard' })
  } catch (error) {
    notifyError(`Acesso negado! Mensagem: ${error.message}`)
  }
}

</script>
