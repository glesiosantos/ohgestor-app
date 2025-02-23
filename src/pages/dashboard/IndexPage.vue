<template>
  <q-page class="q-pa-md">
    <!-- Linha de Cards -->
    <div class="row q-col-gutter-xs">
      <q-card class="col-12 col-md-2 bg-primary text-white small-card q-mb-md">
        <q-card-section class="flex items-center">
          <q-icon name="groups" size="3em" class="q-mr-sm animate-icon" />
          <div>
            <div class="text-h6">Clientes</div>
            <div class="text-subtitle1">{{ clientesTotal }}</div>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-md-2 bg-secondary text-white small-card q-mb-md">
        <q-card-section class="flex items-justify">
          <q-icon name="person_add" size="3em" class="q-mr-sm animate-icon" />
          <div class="flex">
            <div class="text-h6">Captado Hoje</div>
            <div class="text-subtitle1">{{ clientesHoje }}</div>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-md-2 bg-accent text-white small-card q-mb-md">
        <q-card-section class="flex items-center">
          <q-icon name="attach_money" size="3em" class="q-mr-sm animate-icon" />
          <div>
            <div class="text-h6">Financeiro</div>
            <div class="text-subtitle1">R$ {{ financeiro }}</div>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-md-2 bg-positive text-white small-card q-mb-md">
        <q-card-section class="flex items-center">
          <q-icon name="people" size="3em" class="q-mr-sm animate-icon" />
          <div>
            <div class="text-h6">Usuários</div>
            <div class="text-subtitle1">{{ usuariosTotal }}</div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Linha do Gráfico -->
    <!-- <div class="row q-mt-md">
      <q-card class="col-12 q-pa-md">
        <q-card-section>
          <div class="text-h6">Evolução de Captação</div>
          <canvas ref="chartCanvas"></canvas>
        </q-card-section>
      </q-card>
    </div> -->

    <!-- Linha da Tabela -->
    <div class="row q-mt-md">
      <q-card class="col-12 q-pa-md">
        <q-card-section>
          <div class="text-h6">Clientes Captados</div>
          <q-table :rows="clientes" :columns="colunas" row-key="id" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const clientesTotal = ref(1500);
    const clientesHoje = ref(8);
    const financeiro = ref(50000);
    const usuariosTotal = ref(250);
    const chartCanvas = ref(null);

    const clientes = ref([
      { id: 1, nome: 'Empresa X', vendedor: 'Carlos Silva' },
      { id: 2, nome: 'Empresa Y', vendedor: 'Ana Souza' },
      { id: 3, nome: 'Empresa Z', vendedor: 'Marcos Lima' }
    ]);

    const colunas = [
      { name: 'nome', label: 'Cliente', align: 'left', field: 'nome' },
      { name: 'vendedor', label: 'Vendedor', align: 'left', field: 'vendedor' }
    ];

    // onMounted(() => {
    //   new Chart(chartCanvas.value, {
    //     type: 'line',
    //     data: {
    //       labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    //       datasets: [{
    //         label: 'Captação de Clientes',
    //         data: [5, 15, 10, 20, 25, 30],
    //         borderColor: '#007bff',
    //         borderWidth: 2,
    //         fill: false
    //       }]
    //     },
    //     options: {
    //       responsive: true,
    //       maintainAspectRatio: false
    //     }
    //   });
    // });

    return { clientesTotal, clientesHoje, financeiro, usuariosTotal, chartCanvas, clientes, colunas };
  }
};
</script>

<style scoped>
.q-card.small-card {
  padding: 10px;
  text-align: center;
  min-height: 100px;
  margin: 10px;
  border-radius: 10px;
}

.animate-icon {
  animation: pulse 1.5s infinite alternate;
}

@keyframes pulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.2); }
}
</style>
