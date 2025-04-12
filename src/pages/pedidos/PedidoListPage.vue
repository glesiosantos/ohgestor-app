<template>
  <q-page padding>
    <!-- Filtros -->
    <div class="flex flex-center col-12 q-pa-md">
      <div class="row justify-between full-width q-gutter-md">
        <q-input
          v-model="filtroDataInicio"
          outlined
          dense
          label="Data Início"
          type="date"
          class="col-12 col-md-3 col-lg-3"
          style="min-width: 150px;"
        />
        <q-input
          v-model="filtroDataFim"
          outlined
          dense
          label="Data Fim"
          type="date"
          class="col-12 col-md-3 col-lg-3"
          style="min-width: 150px;"
        />
        <q-select
          v-model="filtroSituacao"
          outlined
          dense
          label="Filtrar por Situação"
          :options="situacaoOptions"
          class="col-12 col-md-3 col-lg-3"
          emit-value
          map-options
          style="min-width: 150px;"
        />
        <div class="col-12 col-md-2">
          <q-btn
            color="primary"
            label="Filtrar"
            icon="filter_alt"
            @click="aplicarFiltros"
          />
          <q-btn
            flat
            color="grey"
            label="Limpar"
            icon="clear"
            @click="limparFiltros"
          />
        </div>
      </div>
    </div>

    <!-- Tabela de pedidos -->
    <q-table
      title="Lista de Pedidos"
      :rows="filteredPedidos"
      :columns="columns"
      row-key="id"
      :loading="loading"
    >
      <template v-slot:body-cell-situacao="props">
        <q-td :props="props">
          <q-badge :color="props.row.situacao === 'PENDENTE' ? 'orange' : 'grey'">
            {{ props.row.situacao }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            icon="qr_code"
            @click="detalhePedido(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Botão FAB -->
    <q-btn
      fab
      icon="add"
      color="primary"
      class="fab-button"
      @click="openDrawer('add')"
    />

    <!-- Drawer para formulário -->
    <q-drawer v-model="drawer" side="right" overlay elevated :width="400">
      <q-scroll-area class="fit">
        <pedido-form-drawer
          v-if="drawer"
          :is-edit="isEdit"
          :initial-data="currentData"
          @submit="handleSubmit"
          @cancel="closeDrawer"
        />
      </q-scroll-area>
    </q-drawer>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useDrawer } from 'src/composables/useDrawer'
import { useFormatDate } from 'src/composables/useFormatDate' // Novo composable
import PedidoFormDrawer from './components/PedidoFormDrawer.vue'
import { utilService } from 'src/services/util_service'
import { clienteService } from '../clientes/services/cliente_service'
import { pedidoService } from './services/pedido_service'
import useNotify from 'src/composables/UseNotify'
import { usePedidoStore } from 'src/stores/pedido_store'
import { useRouter } from 'vue-router'

const { drawer, openDrawer, closeDrawer, isEdit, currentData } = useDrawer()
const { notifySucess, notifyError, notifyWarning } = useNotify()
const router = useRouter()
const { formatarData } = useFormatDate() // Importa o composable

const pedidoStore = usePedidoStore()

const loading = ref(false)
const pedidos = ref([])

// Filtros
const filtroDataInicio = ref('')
const filtroDataFim = ref('')
const filtroSituacao = ref(null)
const situacaoOptions = [
  { label: 'Pendente', value: 'PENDENTE' },
  { label: 'Pago', value: 'PAGO' },
  { label: 'Expirado', value: 'EXPIRADO' }
]

// Pedidos filtrados
const filteredPedidos = ref(pedidoStore.pedidos)

const { carregarModulos, carregarPlanos, carregarVencimentos, carregarGratuidade } = utilService()
const { carregarClientes } = clienteService()
const { registrarPedido, carregarPedidos } = pedidoService()

const columns = [
  { label: 'ID Pedido', field: row => row.idPedido, align: 'center' },
  { label: 'Cliente', field: row => row.cliente, format: val => `${val}`, sortable: true, align: 'center' },
  { label: 'Modulo', field: row => row.modulo, format: val => `${val}`, sortable: true, align: 'center' },
  { label: 'Status', name: 'situacao', field: row => row.situacao, format: val => `${val}`, sortable: true, align: 'center' },
  { label: 'Data do Pedido', field: row => row.dataCriadoEm, format: val => formatarData(val), sortable: true, align: 'center' },
  { label: 'Plano', field: row => row.plano, format: val => `${val}`, sortable: true, align: 'center' },
  { name: 'acoes', label: 'Ações', field: 'acoes' }
]

// Função para aplicar filtros
const aplicarFiltros = () => {
  let result = pedidoStore.pedidos
  if (filtroDataInicio.value || filtroDataFim.value) {
    const inicio = filtroDataInicio.value ? new Date(filtroDataInicio.value) : null
    const fim = filtroDataFim.value ? new Date(filtroDataFim.value) : null
    result = result.filter(pedido => {
      const dataPedido = new Date(pedido.dataCriadoEm)
      if (inicio && fim) {
        return dataPedido >= inicio && dataPedido <= fim
      } else if (inicio) {
        return dataPedido >= inicio
      } else if (fim) {
        return dataPedido <= fim
      }
      return true
    })
  }
  if (filtroSituacao.value) {
    result = result.filter(pedido => pedido.situacao === filtroSituacao.value)
  }
  filteredPedidos.value = result
}

// Função para limpar filtros
const limparFiltros = () => {
  filtroDataInicio.value = ''
  filtroDataFim.value = ''
  filtroSituacao.value = null
  filteredPedidos.value = pedidoStore.pedidos
}

// Carregar pedidos do dia atual inicialmente
const carregarPedidosDoDia = async () => {
  const hoje = new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
  filtroDataInicio.value = hoje
  filtroDataFim.value = hoje
  await carregarPedidos()
  aplicarFiltros()
}

const handleSubmit = async (formData) => {
  try {
    loading.value = true
    if (isEdit.value) {
      console.log('Editando pedido:', formData)
    } else {
      await registrarPedido(formData)
    }
    await carregarPedidos()
    pedidos.value = await carregarPedidos()
    notifySucess(isEdit.value ? 'Pedido atualizado com sucesso!' : 'Pedido criado com sucesso!')
    closeDrawer()
  } catch (error) {
    console.error('Erro ao processar o pedido:', error)
    if (error.status === 400) {
      error.response.data.forEach(error => notifyWarning(error.mensagem))
    } else {
      notifyError('Erro ao salvar o pedido. Tente novamente.')
    }
  } finally {
    loading.value = false
  }
}

const detalhePedido = (pedido) => {
  router.push({ name: 'detalhe-pedido', params: { idPedido: pedido.idPedido } })
}

onMounted(async () => {
  try {
    loading.value = true
    await Promise.all([
      carregarClientes(),
      carregarModulos(),
      carregarPlanos(),
      carregarVencimentos(),
      carregarGratuidade()
    ])
    await carregarPedidosDoDia()
  } catch (error) {
    console.error('Erro ao carregar dados iniciais:', error)
    notifyError('Erro ao carregar os dados. Tente novamente.')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Estilo para o botão FAB */
.fab-button {
  position: fixed;
  bottom: 70px;
  right: 16px;
  z-index: 1000;
}

/* Ajuste responsivo para dispositivos móveis */
@media (max-width: 599px) {
  .fab-button {
    bottom: 80px;
    right: 16px;
  }
}

/* Ajuste adicional para garantir visibilidade em dispositivos com barras de sistema */
@media (max-height: 600px) {
  .fab-button {
    bottom: calc(env(safe-area-inset-bottom) + 80px);
  }
}
</style>
