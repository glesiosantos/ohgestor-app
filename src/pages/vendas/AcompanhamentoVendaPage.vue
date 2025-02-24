<template>
  <q-page class="q-pa-md">
    <div class="q-mb-md">
      <h4>Acompanhamento de Vendas</h4>
    </div>

    <!-- Filtros -->
    <div class="q-mb-md row q-gutter-md">
      <q-input
        v-model="dateFilter"
        filled
        type="date"
        label="Filtrar por data"
        style="max-width: 200px"
      />
      <q-select
        v-model="statusFilter"
        :options="statusOptions"
        label="Status"
        filled
        style="max-width: 200px"
      />
    </div>

    <!-- Tabela de vendas -->
    <q-table
      :rows="filteredSales"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :pagination="pagination"
    >
      <!-- Slot para ações -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            icon="visibility"
            @click="viewSale(props.row)"
          />
          <q-btn
            flat
            round
            icon="edit"
            @click="editSale(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Dados mock para exemplo
const sales = ref([
  { id: 1, date: '2025-02-24', customer: 'João Silva', value: 1500.00, status: 'Concluída' },
  { id: 2, date: '2025-02-23', customer: 'Maria Souza', value: 850.00, status: 'Pendente' },
  { id: 3, date: '2025-02-22', customer: 'Pedro Santos', value: 2300.00, status: 'Concluída' }
])

// Configuração da tabela
const columns = [
  { name: 'date', align: 'left', label: 'Data', field: 'date', sortable: true },
  { name: 'customer', align: 'left', label: 'Cliente', field: 'customer', sortable: true },
  {
    name: 'value',
    align: 'right',
    label: 'Valor',
    field: 'value',
    sortable: true,
    format: (val) => `R$ ${val.toFixed(2)}`
  },
  { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
  { name: 'actions', align: 'center', label: 'Ações', field: 'actions' }
]

const pagination = ref({
  sortBy: 'date',
  descending: true,
  page: 1,
  rowsPerPage: 10
})

const loading = ref(false)
const dateFilter = ref('')
const statusFilter = ref('')
const statusOptions = ['Concluída', 'Pendente', 'Cancelada']

// Computado para filtrar vendas
const filteredSales = computed(() => {
  let result = [...sales.value]

  if (dateFilter.value) {
    result = result.filter(sale => sale.date === dateFilter.value)
  }

  if (statusFilter.value) {
    result = result.filter(sale => sale.status === statusFilter.value)
  }

  return result
})

// Funções de ação
const viewSale = (sale) => {
  console.log('Visualizar venda:', sale)
  // Aqui você pode adicionar lógica para abrir um modal ou navegar para detalhes
}

const editSale = (sale) => {
  console.log('Editar venda:', sale)
  // Aqui você pode adicionar lógica para edição
}

// Carregar dados iniciais
onMounted(() => {
  // Aqui você pode substituir por uma chamada API real
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
