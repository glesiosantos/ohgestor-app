<template>
  <q-page padding>
    <q-table
      flat
      bordered
      :columns="columns"
      :rows="rows"
      :filter="filter"
    >
      <template v-slot:top>
        <q-btn color="primary" label="Adicionar Cliente" @click="formCliente" />
        <q-space />
        <q-input outlined color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-contatos="props">
        <q-td :props="props">
          <!-- Exibe apenas o primeiro contato -->
          {{ props.row.contatos[0] }}
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
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth_store';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()
const filter = ref('')

const columns = [
  {
    label: 'CPF/CNPJ',
    field: row => row.cpfCnpj,
    format: val => `${val}`,
    sortable: true
  },
  {
    label: 'Razão',
    field: row => row.razaoSocial,
    format: val => `${val}`,
    sortable: true
   },
  { label: 'Nome Fantasia', field: 'nomeFantasia', sortable: true },
  { label: 'Proprietário', field: 'proprietario' },
  { label: 'Vencimento', field: 'dataVencimento', align: 'center' },
  { label: 'Contato', field: 'contatos', name: 'contatos', align: 'center' },
  { label: 'Modulos', field: 'modulos', name: 'modulos'},
  { label: 'Ações', field: 'actions', name: 'actions', align: 'center'}
]

const rows = ref([])

const formCliente = () => router.push({ name: 'cliente-form'})

async function loadCliente () {
  const response = await api.get('v1/clientes', {headers: {Authorization: authStore.auth.token}})
  rows.value = response.data
}

onMounted(() => loadCliente())

</script>
