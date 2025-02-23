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
          :rules="[val => (val && val.length > 0) || 'E-mail é campo obrigatório']" />
        <q-btn color="primary" type="submit" label="Recuperar acesso" class="full-width"/>
      </q-form>
      <q-btn
        color="green-7"
        label="Acessar sistema"
        :to="{ name: 'sign-in'}"
        flat
        class="full-width q-mt-sm"

      />
    </q-card>
  </q-page>
</template>

<script setup>
import useNotify from 'src/composables/UseNotify';
import { authService } from 'src/services/auth_service';
import { reactive } from 'vue'
// import { useRouter } from 'vue-router'

const { notfifyError, notfifySucess} = useNotify()

const { recuperarAcesso } = authService()
// const router = useRouter()
let form = reactive({
  email: ''
})

const handleForm = async () => {
  await recuperarAcesso(form.email).then(response => {
      console.log(response)
      notfifySucess("Enviamos um e-mail para você informando a sua nova credencial")
    }).catch(error => {
      console.log(error)
      notfifyError(error.response.data.mensagem)
    })
  form.email = ''
   // router.push({ name: 'sign-in' })
}

</script>
