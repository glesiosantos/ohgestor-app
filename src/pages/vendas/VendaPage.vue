<template>
  <q-page padding>
    <q-card class="full-width q-pa-md">
      <q-form class="q-gutter-y-sm">
      <div class="row">
        <q-select
          v-model="formVenda.cliente"
          :options="clientes"
          option-label="razao"
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
          v-model="formVenda.cpfProprietario"
          label="CPF do Proprietário"
          mask="###.###.###-##"
          class="col-12 col-md-4"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'CPF é campo obrigatório']"
      />

      <q-input
        outlined
        v-model="formVenda.nomeProprietario"
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
          :options="modulos"
          option-value=""
          label="Modulo"
          class="col-12 col-md-6"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'CPF é campo obrigatório']"
        />
        <div class="col-12 col-md-6 q-gutter-sm flex justify-between">
          <q-radio v-model="formVenda.vencimento" v-for="vencimento in vencimentos" :val="vencimento" :label="vencimento.toString()" :key="vencimento" />
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
import { clienteService } from 'src/services/cliente_service';
import { useClienteStore } from 'src/stores/cliente_store'
import { onMounted, reactive, ref } from 'vue'

const {carregarClientes} = clienteService()
const clienteStore = useClienteStore()

const clientes = ref([])
const modulos = ref(['Oficina Mecânica'])
const vencimentos = ref([5,10,15,25])

const formVenda = reactive({
  estabelecimento: '',
  cpfProprietario: '',
  nomeProprietario: '',
  modulo: '',
  vencimento: 0
})

const filtrarClientes = (val, update) => {
  update(() => {
    const index = val.toLowerCase()
    clientes.value = clienteStore.clientes.filter(v => v.razao.toLowerCase().indexOf(index) > -1)
  })
}

onMounted(() => carregarClientes())

</script>
