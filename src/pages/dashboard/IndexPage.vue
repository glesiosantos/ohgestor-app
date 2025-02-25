<!-- DashboardAdmin.vue -->
<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Cards de Informações -->
      <div class="col-12 col-md-3">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Total de Clientes</div>
          </q-card-section>
          <q-card-section class="text-center">
            <div class="text-h4">{{ totalClientes }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Total de Pedidos</div>
          </q-card-section>
          <q-card-section class="text-center">
            <div class="text-h4">{{ totalPedidos }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Total de Pedidos</div>
          </q-card-section>
          <q-card-section class="text-center">
            <div class="text-h4">{{ totalPedidos }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Total de Pedidos</div>
          </q-card-section>
          <q-card-section class="text-center">
            <div class="text-h4">{{ totalPedidos }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Gráficos -->
    <div class="row q-mt-md q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Acompanhamento de Atendimentos</div>
          </q-card-section>
          <q-card-section>
            <VueApexCharts type="line" height="350" :options="chartOptions" :series="atendimentoSeries"/>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Vendas (Serviços e Produtos)</div>
          </q-card-section>
          <q-card-section>
            <VueApexCharts type="bar" height="350" :options="chartOptions" :series="vendasSeries"/>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Lista de Serviços -->
    <div class="row q-mt-md">
      <div class="col-12 col-md-6">
        <q-card class="q-pa-sm">
          <q-card-section>
            <div class="text-h6">Ultimos Clientes</div>
          </q-card-section>
          <q-table
            :rows="servicos"
            :columns="columns"
            row-key="id"
            hide-pagination=""
          />
          <div class="flex flex-center q-my-sm">
            <q-btn label="Listar Pedidos" size="md" color="secondary" :class="{'full-width': $q.screen.xs}" @click="pedidosRouter"/>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import router from 'src/router'
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

  const totalClientes = ref(150)
  const totalPedidos = ref(300)

  const chartOptions = ref({
    chart: { id: 'basic-chart' },
    xaxis: { categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'] },
  })

  const atendimentoSeries = ref([{ name: 'Atendimentos', data: [30, 40, 35, 50, 49, 60] }])

  const vendasSeries= ref([
    { name: 'Serviços', data: [20, 30, 25, 40, 35, 50] },
    { name: 'Produtos', data: [10, 15, 20, 25, 30, 35] },
  ])

  const columns = ([
    { name: 'id', label: 'ID', field: 'id', sortable: true },
    { name: 'cliente', label: 'Cliente', field: 'cliente', sortable: true },
    { name: 'servico', label: 'Modulo', field: 'servico', sortable: true },
    { name: 'status', label: 'Status', field: 'status', sortable: true },
  ])

  const servicos = ref([
    { id: 1, cliente: 'João Silva', servico: 'Troca de Óleo', status: 'Pendente' },
    { id: 2, cliente: 'Maria Souza', servico: 'Alinhamento', status: 'Concluido' },
  ])

  const pedidosRouter = () => router.push({name: 'pedidos'})

  // const pagination = ref ({ rowsPerPage: 10 })
</script>

<style>
.my-card {
  height: 100%;
}
</style>
