<template>
  <q-page padding>
    <q-card class="full-width q-pa-md">
      <q-form @submit.prevent="handleForm" class="q-gutter-y-sm">
        <div class="row q-col-gutter-sm">
          <q-input
            outlined
            class="col-12 col-md-6"
            type="text"
            v-model="form.nome"
            :style="{ textTransform: 'uppercase' }"
            label="Nome"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'NOME é campo obrigatório']"
          />
          <q-input
            outlined
            class="col-12 col-md-6"
            type="email"
            v-model="form.email"
            label="E-mail"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'EMAIL é campo obrigatório']"
          />
        </div>
        <div class="row q-col-gutter-sm q-mt-xs">
          <q-select outlined
            v-model="form.perfil"
            :options="utilStore.perfis"
            option-value="nome"
            option-label="descricao"
            class="col-12 col-md-6"
            emit-value
            map-options
          />
          <div class="col-12 col-md-6">
            <span class="block text-thin">Usuário ativo?</span>
            <q-toggle v-model="form.ativo" label="Sim"/>
          </div>
        </div>
        <div class="flex flex-center q-gutter-sm q-my-sm">
          <q-btn label="Registrar " type="submit" size="md" color="primary" :class="{'full-width': $q.screen.xs}"/>
          <q-btn label="Cancelar" @click="handleCancelar" size="md" color="red" :class="{'full-width': $q.screen.xs}"/>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import useNotify from 'src/composables/UseNotify';
import { usuarioService } from 'src/services/usuario_service';
import { utilService } from 'src/services/util_service';
import { useUtilStore } from 'src/stores/util_store';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const { notfifySucess, notfifyError, notfifyWarning } = useNotify()
const { carregarPerfis } = utilService()
const { salvarUsuario } = usuarioService()

const utilStore = useUtilStore()

const form = reactive({
  nome: '',
  email: '',
  perfil: '',
  ativo: false
})

// validar email
// const emailValidate = (val) => val.test(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || "E-mail inválido"

const handleCancelar = () => router.replace({name: 'usuarios'})

const handleForm = async () => {
  const response = await salvarUsuario(form)
  if (response.status === 201) {
    notfifySucess("Cadastro realizando com sucesso!")
    router.replace({name: 'usuarios'})
  } else if (response.status === 401) {
    notfifyWarning(response.message)
    router.replace({name: 'usuarios'})
  } else {
    notfifyError(`Entre em contato com administrador. Mensagem: ${response.message}`)
    router.replace({name: 'usuarios'})
  }
}

onMounted(() =>
  carregarPerfis()
)
</script>
