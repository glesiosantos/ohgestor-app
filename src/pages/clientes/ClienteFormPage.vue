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
              label="CPF ou CNPJ"
              maxlength="14"
              mask="###############"
              v-model="formCliente.documento"
              reverse-fill-mask
              hint="Somente numeros"
            />
            <q-input
              outlined
              class="col-12 col-md-5"
              type="text"
              v-model="formCliente.razao"
              label="Razão Social"
            />
            <q-input
              outlined
              v-model="formCliente.fantasia"
              class="col-12 col-md-5"
              type="text"
              label="Nome Fantasia"
            />
          </div>
          <div class="row q-col-gutter-sm q-mt-xs">
            <q-input v-for="(contato, index) in 2" :key="index"
              outlined
              class="col-12 col-md-4"
              type="text"
              mask="(##) #####.####"
              v-model="formCliente.contatos[index]"
              label="Celular"
            />
            <q-select
              outlined
              :options="utilStore.estabelecimentos"
              option-label="nome"
              option-value="sigla"
              class="col-12 col-md-4"
              type="text"
              label="Tipo de Comercio"
              v-model="formCliente.estabelecimento"
              emit-value
              map-options
            />
          </div>
        </fieldset>
        <fieldset>
          <legend class="text-caption text-weight-light">Dados do estabelecimento</legend>

          <div class="row q-col-gutter-sm q-my-sm">
            <q-input
              outlined
              class="col-12 col-md-2"
              mask="#####-###"
              type="text"
              v-model="formCliente.cep"
              label="CEP"
            />
            <q-input
              outlined
              class="col-12 col-md-7"
              type="text"
              v-model="formCliente.logradouro"
              label="Logradouro"
            />
            <q-input
              outlined
              class="col-12 col-md-3"
              type="text"
              label="Bairro"
              v-model="formCliente.bairro"
            />
          </div>
          <div class="row q-col-gutter-sm q-my-sm">
            <q-input
              outlined
              class="col-12 col-md-3"
              type="text"
              label="Cidade"
              v-model="formCliente.cidade"
            />
            <q-select
              outlined
              :options="utilStore.estados"
              option-label="nome"
              option-value="sigla"
              class="col-12 col-md-3"
              type="text"
              label="Estado"
              v-model="formCliente.estado"
              emit-value
              map-options
            />
            <q-input
              outlined
              class="col-12 col-md-3"
              type="text"
              label="Latitude"
              v-model="formCliente.latitude"
            />
            <q-input
              outlined
              class="col-12 col-md-3"
              type="text"
              label="Longitude"
              v-model="formCliente.longitude"
            />
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
import { onMounted, reactive } from 'vue'
import { clienteService } from 'src/services/cliente_service'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import { utilService } from 'src/services/util_service'
import { useUtilStore } from 'src/stores/util_store'

const router = useRouter()
const {notfifyError, notfifySucess} = useNotify()
const {salvarCliente} = clienteService()
const { carregarEstados, carregarEstabelecimentoComerciais } = utilService()

const utilStore = useUtilStore()

let formCliente = reactive({
  documento: '',
  razao: '',
  fantasia: '',
  estabelecimento: '',
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

onMounted(() => {
  carregarEstados()
  carregarEstabelecimentoComerciais()
})

</script>
