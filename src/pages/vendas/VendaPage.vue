<template>
  <q-page padding>
    <q-card class="full-width q-pa-md">
      <q-form class="q-gutter-y-sm" @submit.prevent="handleForm">
      <div class="row">
        <q-select
          v-model="formVenda.idEstabelecimento"
          :options="clientes"
          option-label="razaoSocial"
          option-value="id"
          label="Buscar Cliente"
          filled
          use-input
          input-debounce="300"
          @filter="filtrarClientes"
          hint="Informe no minimo 2 caracteres"
          class="col-12"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
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
        class="col-12 col-md-8"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Nome é campo obrigatório']"
      />
      </div>

      <div class="row q-col-gutter-sm">
        <q-select
          outlined
          v-model="formVenda.modulo"
          :options="utilStore.modulos"
          option-value="sigla"
          option-label="descricao"
          label="Módulo"
          class="col-12 col-md-6"
          emit-value
          map-options
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'MÓDULO é campo obrigatório']"
        />
        <div class="col-12 col-md-6 q-gutter-sm flex justify-between">
          <q-radio v-model="formVenda.vencimento" v-for="vencimento in utilStore.vencimentos" :val="vencimento.descricao" :label="vencimento.dia.toString()" :key="vencimento.descricao" />
        </div>

      </div>
      <div class="flex flex-center q-my-sm">
          <q-btn label="Registrar " type="submit" size="md" color="primary" :class="{'full-width': $q.screen.xs}"/>
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
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const {carregarClientes } = clienteService()
const { carregarModulos, carregarVencimentos } = utilService()
const { registrarVendaCliente } = vendaService()
const clienteStore = useClienteStore()
const utilStore = useUtilStore()
const router = useRouter()
const {notfifyError, notfifySucess} = useNotify()

const clientes = ref([])

let formVenda = reactive({
  idEstabelecimento: '',
  cpf: '',
  proprietario: '',
  modulo: '',
  vencimento: 0
})

const filtrarClientes = (val, update) => {
  update(() => {
    const index = val.toLowerCase()
    clientes.value = clienteStore.clientes.filter(v => v.razaoSocial.toLowerCase().indexOf(index) > -1)
  })
}

const handleForm = () => {
  try {
    const data = Object.assign({}, formVenda, { idEstabelecimento: formVenda.idEstabelecimento.id })
    console.log('***** ', data)
    registrarVendaCliente(data)
    notfifySucess('Venda registrada com sucesso!!')
    router.push({name: 'clientes'})
    formVenda = {}
  } catch (error) {
    notfifyError(error.message)
  }
}

onMounted(() => {
  carregarClientes()
  carregarModulos()
  carregarVencimentos()
})

</script>
