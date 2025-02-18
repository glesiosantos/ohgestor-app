<template>
  <q-page padding>
    <q-card class="full-width q-pa-md">
      <q-form @submit.prevent="handleForm">
        <fieldset>
          <legend class="text-caption text-weight-light">Dados da empresa</legend>
          <div class="row q-col-gutter-sm">
            <q-input
              outlined
              class="col-12 col-md-2"
              type="text"
              label="CPF ou CNPJ (Somente números)"
              maxlength="14"
              mask="###############"
              v-model="formCliente.documento"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'CPF/CNPJ é campo obrigatório']"
            />
            <q-input
              outlined
              class="col-12 col-md-5"
              type="text"
              v-model="formCliente.razao"
              :style="{ textTransform: 'uppercase' }"
              label="Nome / Razão"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Nome/Razão é campo obrigatório']"
            />
            <q-input
              outlined
              v-model="formCliente.fantasia"
              class="col-12 col-md-5"
              type="text"
              label="Nome Fantasia"
              :style="{ textTransform: 'uppercase' }"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Nome Fantasia é campo obrigatório']"
            />
          </div>
          <div class="row q-col-gutter-sm">
            <q-input v-for="(contato, index) in 2" :key="index"
              outlined
              class="col-12 col-md-4"
              type="text"
              mask="(##) #####.####"
              v-model="formCliente.contatos[index]"
              label="Whatsapp / Celular"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Whatsapp/Celular é campo obrigatório']"
            />
          </div>
        </fieldset>
        <fieldset>
          <legend class="text-caption text-weight-light">Dados do estabelecimento</legend>

          <div class="row q-col-gutter-sm">
            <q-input
              outlined
              class="col-12 col-md-2"
              mask="#####-###"
              type="text"
              v-model="formCliente.cep"
              @blur="carregarEndereco"
              label="CEP"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'CEP é campo obrigatório']"
            />
            <q-input
              outlined
              class="col-12 col-md-10"
              type="text"
              v-model="formCliente.logradouro"
              label="Logradouro"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'LOGRADOURO é campo obrigatório']"
            />

          </div>
          <div class="row q-col-gutter-sm">
            <q-input
              outlined
              class="col-12 col-md-4"
              type="text"
              label="Bairro"
              v-model="formCliente.bairro"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'BAIRRO é campo obrigatório']"
            />
            <q-input
              outlined
              class="col-12 col-md-4"
              type="text"
              label="Cidade"
              v-model="formCliente.cidade"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'CIDADE é campo obrigatório']"
            />
            <q-select
              outlined
              :options="utilStore.estados"
              option-label="nome"
              option-value="sigla"
              class="col-12 col-md-4"
              type="text"
              label="Estado"
              v-model="formCliente.estado"
              emit-value
              map-options
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'ESTADO é campo obrigatório']"
            />

          </div>
          <div>
            <q-checkbox v-model="location" label="Você esta no local do cadastro agora?" @blur="obterLocalizacao" />
          </div>
        </fieldset>
        <div class="flex flex-center q-my-sm">
          <q-btn label="Cadastar cliente" type="submit" size="md" color="primary" :class="{'full-width': $q.screen.xs}"/>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { clienteService } from 'src/services/cliente_service'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import { utilService } from 'src/services/util_service'
import { useUtilStore } from 'src/stores/util_store'

const router = useRouter()
const {notfifyError, notfifySucess} = useNotify()
const {salvarCliente} = clienteService()
const { carregarEstados, carregarEstabelecimentoComerciais, carregarEnderecoViaCep } = utilService()

const utilStore = useUtilStore()

const location = ref(false)

let formCliente = reactive({
  documento: '',
  razao: '',
  fantasia: '',
  cep: '',
  logradouro: '',
  bairro: '',
  cidade: '',
  estado: '',
  latitude: '',
  longitude: '',
  contatos: []
})


const handleForm = async () => {
  try {
    const contatos = formCliente.contatos.filter(Boolean)
    const data =  Object.assign({}, formCliente, { contatos })
    await salvarCliente(data)

    notfifySucess('Cadastro realizado com sucesso')
    formCliente = {
      documento: '',
      razao: '',
      fantasia: '',
      cep: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: '',
      latitude: '',
      longitude: '',
      contatos: []
    }
    router.push({name: 'clientes'})
  } catch (error) {
    notfifyError(error.message)
  }
}

const carregarEndereco = async () => {
  const endereco = await carregarEnderecoViaCep(formCliente.cep)
  formCliente.logradouro = endereco.logradouro
  formCliente.bairro = endereco.bairro
  formCliente.cidade = endereco.localidade
  formCliente.estado = endereco.uf
}

const obterLocalizacao = () => {
  navigator.geolocation.getCurrentPosition(position => {
    formCliente.latitude = position.coords.latitude
    formCliente.longitude = position.coords.longitude
  })
}

onMounted(() => {
  carregarEstados()
  carregarEstabelecimentoComerciais()
})

</script>
