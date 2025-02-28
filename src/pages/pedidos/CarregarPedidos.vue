<!-- src/components/OrderTracking.vue -->
<template>
  <q-page class="q-pa-md">
    <div class="q-mb-md">
      <h5>Acompanhamento de Pedidos</h5>
    </div>

    <!-- Filtros -->
    <div class="row q-gutter-md q-mb-md">
      <q-input
        v-model="filters.startDate"
        filled
        type="date"
        label="Data Inicial"
        style="max-width: 200px"
      />
      <q-input
        v-model="filters.endDate"
        filled
        type="date"
        label="Data Final"
        style="max-width: 200px"
      />
      <q-select
        v-model="filters.status"
        :options="statusOptions"
        label="Status"
        filled
        style="max-width: 200px"
        clearable
      />
      <q-btn
        color="primary"
        label="Filtrar"
        @click="fetchOrders"
      />
    </div>

    <!-- Tabela de Pedidos -->
    <q-table
      :rows="orders"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :pagination="pagination"
    >
      <template v-slot:body-cell-situacao="props">
        <q-td :props="props">
          <q-badge :color="getStatusColor(props.row.situacao)" :label="props.row.situacao" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import useNotify from 'src/composables/UseNotify'
import { pedidoService } from 'src/services/pedido_service'

const {notfifyError} = useNotify()
// Dados reativos
const orders = ref([])
const loading = ref(false)
const { carregarPedidos } = pedidoService()

let intervalId;

const filters = ref({
  startDate: null,
  endDate: null,
  status: null
})

// Opções de status
const statusOptions = ref([
  'PENDENTE',
  'CONCLUIDO',
  'CANCELADO'
])

// Configuração da tabela
const columns = [
  { name: 'id', label: 'ID', field: 'idPedido', sortable: true, align: 'center' },
  { name: 'date', label: 'Data Pedido', field: 'dataCriadoEm', sortable: true, align: 'center' },
  { name: 'customer', label: 'Cliente', field: 'cliente', sortable: true, align: 'center' },
  { name: 'total', label: 'Total', field: 'total', sortable: true, align: 'center' },
  { name: 'modulo', label: 'Modulo', field: 'modulo', sortable: true, align: 'center' },
  { name: 'situacao', label: 'Situacão', field: 'situacao', sortable: true, align: 'center' },
  { label: 'Opções', align: 'center' },
]

const pagination = ref({
  sortBy: 'date',
  descending: false,
  page: 1,
  rowsPerPage: 10
})

// Funções
const getStatusColor = (status) => {
  console.log("***** ",status)
  const colors = {
    'PENDENTE': 'yellow',
    'CONCLUIDO': 'green',
    'CANCELADO': 'red'
  }
  return colors[status] || 'yellow'
}

const fetchOrders = async () => {
  try {
    loading.value = true
    const params = {}

    if (filters.value.startDate) params.startDate = filters.value.startDate
    if (filters.value.endDate) params.endDate = filters.value.endDate
    if (filters.value.status) params.status = filters.value.status

    const response = await carregarPedidos(params)
    orders.value = response.data
  } catch (error) {
    console.log(error)
    notfifyError("Error ao carregar pedido")
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrders()
  intervalId = setInterval(fetchOrders, 60 * 1000)
})
onUnmounted(() => {

  if(intervalId) {
    clearInterval(intervalId)
  }
})
</script>
