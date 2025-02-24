<template>
  <q-page padding>
    <h4 class="q-mx-md">Dashboard de Vendas</h4>

    <!-- Primeira linha - Cartões -->
    <div class="row q-col-gutter-md">
      <q-card class="col-12 col-md-4 q-pa-md" flat bordered>
        <q-card-section>
          <div class="text-h6">Vendas Hoje</div>
          <div class="text-subtitle2">R$ {{ todaySales.toFixed(2) }}</div>
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-md-4 q-pa-md" flat bordered>
        <q-card-section>
          <div class="text-h6">Vendas Mês</div>
          <div class="text-subtitle2">R$ {{ monthSales.toFixed(2) }}</div>
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-md-4 q-pa-md" flat bordered>
        <q-card-section>
          <div class="text-h6">Ticket Médio</div>
          <div class="text-subtitle2">R$ {{ averageTicket.toFixed(2) }}</div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Segunda linha - Gráficos -->
    <div class="row q-col-gutter-md q-my-md">
      <!-- Gráfico de acompanhamento de vendas -->
      <q-card class="col-12 col-md-6" flat bordered>
        <q-card-section>
          <div class="text-h6">Acompanhamento de Vendas</div>
          <VueApexCharts
            type="line"
            height="350"
            :options="salesChartOptions"
            :series="salesSeries"
          />
        </q-card-section>
      </q-card>

      <!-- Gráfico de desempenho -->

      <q-card class="col-12 col-md-6" flat bordered>
        <q-card-section>
          <div class="text-h6">Desempenho Mensal</div>
          <VueApexCharts
            type="bar"
            height="350"
            :options="performanceChartOptions"
            :series="performanceSeries"
          />
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-col-gutter-md q-mt-md">
      <q-card flat bordered class="full-width">
          <div class="text-h6">Últimas Vendas do Dia</div>
          <q-table class="full-width"
            :rows="lastSales"
            :columns="salesColumns"
            row-key="id"
            :pagination="{ rowsPerPage: 5 }"
            hide-pagination
          />
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// Dados dos cartões
const todaySales = ref(1500.00)
const monthSales = ref(24500.00)
const averageTicket = ref(850.00)

// Dados do gráfico de vendas
const salesSeries = ref([{
  name: 'Vendas',
  data: [1200, 1500, 900, 1800, 2000, 1500, 1700]
}])

const salesChartOptions = ref({
  chart: { type: 'line', height: 350 },
  xaxis: { categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'] },
  colors: ['#008FFB'],
  title: { text: 'Vendas Semanais' }
})

// Dados do gráfico de desempenho
const performanceSeries = ref([{
  name: 'Desempenho',
  data: [75, 82, 68, 95]
}])

const performanceChartOptions = ref({
  chart: { type: 'bar', height: 350 },
  xaxis: { categories: ['Jan', 'Fev', 'Mar', 'Abr'] },
  colors: ['#00E396'],
  title: { text: 'Desempenho Mensal (%)' }
})

// Dados da tabela de últimas vendas
const lastSales = ref([
  { id: 1, time: '09:15', customer: 'João Silva', value: 450.00 },
  { id: 2, time: '11:30', customer: 'Maria Souza', value: 320.00 },
  { id: 3, time: '14:45', customer: 'Pedro Santos', value: 780.00 }
])

const salesColumns = [
  { name: 'time', align: 'left', label: 'Hora', field: 'time' },
  { name: 'customer', align: 'left', label: 'Cliente', field: 'customer' },
  {
    name: 'value',
    align: 'right',
    label: 'Valor',
    field: 'value',
    format: (val) => `R$ ${val.toFixed(2)}`
  }
]

// Carregar dados iniciais
onMounted(() => {
  // Aqui você pode adicionar chamadas API para atualizar os dados reais
})
</script>

<style scoped>
.q-card {
  min-height: 100px;
}
</style>
