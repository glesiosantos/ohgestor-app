<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-table
      flat
      bordered
      :columns="columns"
      :rows="clienteStore.clientes"
      :filter="filter"
    >
      <template v-slot:top>
        <q-input outlined color="primary" v-model="filter" class="col-4" :class="{'full-width': $q.screen.xs}">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <q-btn color="primary" label="Adicionar Cliente" @click="formCliente" :class="{'full-width q-mt-sm': $q.screen.xs}"/>
      </template>

      <template v-slot:body-cell-contatos="props">
        <q-td :props="props">
          <!-- Exibe apenas o primeiro contato -->
          {{ props.row.contatos[0] }}
        </q-td>
      </template>

      <template v-slot:body-cell-integrado="props">
        <q-td :props="props">
          <q-icon name="circle" :color="props.row.integrado ? 'green-10' : 'red-10'"/>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <!-- Botões de Editar e Excluir -->
          <q-btn
            round
            dense
            color="primary"
            size="sm"
            icon="edit"
          />
        </q-td>
      </template>
  </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { clienteService } from 'src/services/cliente_service'
import { useClienteStore } from 'src/stores/cliente_store'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const { carregarClientes } = clienteService()

const clienteStore = useClienteStore()
const router = useRouter()
const filter = ref('')

const columns = [
  {
    label: 'CPF/CNPJ',
    field: row => row.cpfCnpj,
    format: val => `${val}`,
    align: 'center'
  },
  {
    label: 'Razão',
    field: row => row.razao,
    format: val => `${val}`,
    sortable: true,
    align: 'rigth'
   },
  {
    label: 'Nome Fantasia',
    align: 'center',
    field: row => row.fantasia,
    format: val => `${val}`,
   },
  { label: 'Proprietário', field: 'proprietario', align: 'rigth' },
  { label: 'Estabelecimento', field: row => row.estabelecimento, align: 'rigth' },
  { label: 'Integrado', field: 'integrado', name: 'integrado', align: 'center' },
  { label: 'Vencimento', field: 'vencimento', align: 'center' },
  { label: 'Contato', field: 'contatos', name: 'contatos', align: 'rigth' },
  { label: 'Ações', field: 'actions', name: 'actions', align: 'center'}
]

const formCliente = () => router.push({ name: 'cliente-form'})

onMounted(() => carregarClientes())

</script>
