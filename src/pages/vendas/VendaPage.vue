<template>
  <q-page padding>
    <q-card class="full-width q-pa-md">
      <q-form class="q-gutter-y-sm" @submit.prevent="handleForm">

        <div class="row q-col-gutter-sm">
          <q-input
            outlined
            disable
            v-model="clienteStore.cliente.cpfOuCnpj"
            label="CPF/CNPJ"
            class="col-12 col-md-4"
        />

        <q-input
            outlined
            v-model="clienteStore.cliente.razaoSocial"
            label="Nome/Razão Social"
            class="col-12 col-md-8"
            disable
        />
        </div>

        <div class="row q-col-gutter-sm q-mt-xs">
          <q-input
            outlined
            v-model="formVenda.cpf"
            label="CPF do Proprietário"
            mask="###.###.###-##"
            class="col-12 col-md-4"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'CPF é campo obrigatório']"
        />

        <q-input
          outlined
          v-model="formVenda.proprietario"
          label="Nome do proprietário"
          :style="{ textTransform: 'uppercase' }"
          class="col-12 col-md-8"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Nome é campo obrigatório']"
        />
        </div>

        <div class="row q-col-gutter-sm">
          <q-select
            outlined
            v-model="formVenda.plano"
            :options="utilStore.planos"
            option-value="sigla"
            option-label="descricao"
            label="Plano"
            class="col-12 col-md-4"
            lazy-rules
            emit-value
            map-options
            :rules="[val => (!!val) || 'PLANO é campo obrigatório']"
          />

          <div class="col-12 col-md-5 q-gutter-sm">
            <span class="block text-thin">Sugestões de Vencimento</span>
            <div class="flex justify-between">
              <q-radio v-model="formVenda.vencimento" v-for="vencimento in utilStore.vencimentos" :val="vencimento.descricao" :label="vencimento.dia.toString()" :key="vencimento.descricao" />
            </div>
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
import useNotify from 'src/composables/UseNotify'
import { clienteService } from 'src/services/cliente_service'
import { utilService } from 'src/services/util_service'
import { vendaService } from 'src/services/venda_service'
import { useClienteStore } from 'src/stores/cliente_store'
import { useUtilStore } from 'src/stores/util_store'
import { onMounted, reactive} from 'vue'
import { useRoute, useRouter } from 'vue-router'

const {carregarClientes, carregarClientePeloDocumento } = clienteService()
const { carregarPlanos, carregarVencimentos } = utilService()
const { registrarVendaCliente } = vendaService()

const utilStore = useUtilStore()
const clienteStore = useClienteStore()

const router = useRouter()
const route = useRoute()

const {notfifyError, notfifySucess} = useNotify()

let formVenda = reactive({
  idEstabelecimento: '',
  cpf: '',
  qtdUsuario: 0,
  proprietario: '',
  plano: '',
  vencimento: '',
})


const handleForm = async() => {
  try {
    const data = Object.assign({}, formVenda, {idEstabelecimento: clienteStore.cliente.id })

    console.log("**** **** ",data)
    await registrarVendaCliente(data)
    notfifySucess('Venda registrada com sucesso!!')
    router.push({name: 'finalizar-venda'})
    formVenda = {}
  } catch (error) {
    notfifyError(error.message)
  }
}

const handleCancelar = () => {
  router.replace({name: 'clientes'})
}

onMounted(() => {
  carregarClientes()
  carregarPlanos()
  carregarVencimentos()
  carregarClientePeloDocumento(route.params.documento)
})

</script>
