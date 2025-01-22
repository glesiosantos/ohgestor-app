<template>
    <q-page class="flex flex-center q-pa-md">
    <div class="full-width q-pa-none">
      <q-img src="./../../assets/img/oh_gestor.png" style="width: 150px;"/>
      <q-separator class="full-width q-ma-lg"/>
      <q-form @submit.prevent="handleForm" class="q-gutter-y-sm">
        <q-input outlined v-model="form.email" label="E-mail" />
        <q-btn color="primary" type="submit" label="Recuperar acesso" class="full-width"/>
      </q-form>
      <q-btn
        color="green"
        label="Acessar sistema"
        :to="{ name: 'sign-in'}"
        flat
        class="full-width q-mt-sm"
      />
    </div>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const form = reactive({
  email: ''
})

const handleForm = () => {
  console.log(form)
  router.push({ name: 'dashboard' })
}

</script>
