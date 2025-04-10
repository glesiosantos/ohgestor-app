<template>
  <q-page padding>
    <q-table
      title="Lista de Pedidos"
      :rows="pedidoStore.pedidos"
      :columns="columns"
      row-key="id"
      :loading="loading"
    >
      <template v-slot:body-cell-situacao="props">
        <q-td :props="props">
          <q-badge :color="props.row.situacao ? 'orange' : 'grey'">
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

    <q-btn
      fab
      icon="add"
      color="primary"
      class="fab-button"
      @click="openDrawer('add')"
    />

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

const pedidoStore = usePedidoStore()

const loading = ref(false)
const pedidos = ref([])

const { carregarModulos, carregarPlanos, carregarVencimentos, carregarGratuidade } = utilService()
const { carregarClientes } = clienteService()
const { registrarPedido, carregarPedidos } = pedidoService()

const columns = [
  { label: 'ID Pedido', field: row => row.idPedido, align: 'center' },
  { label: 'Cliente', field: row => row.cliente, format: val => `${val}`, sortable: true, align: 'center' },
  { label: 'Modulo', field: row => row.modulo, format: val => `${val}`, sortable: true, align: 'center' },
  { label: 'Status', name: 'situacao', field: row => row.situacao, format: val => `${val}`, sortable: true, align: 'center' },
  { label: 'Plano', field: row => row.plano, format: val => `${val}`, sortable: true, align: 'center' },
  { name: 'acoes', label: 'Ações', field: 'acoes' }
]

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
  router.push({ name: 'detalhe-pedido', params: { id: pedido.idPedido } })
}

onMounted(async () => {
  try {
    loading.value = true
    await Promise.all([
      carregarClientes(),
      carregarModulos(),
      carregarPlanos(),
      carregarVencimentos(),
      carregarGratuidade(),
      carregarPedidos()
    ])
  } catch (error) {
    notifyError('Erro ao carregar os dados. Tente novamente. Error: '+error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Estilo para o botão FAB */
.fab-button {
  position: fixed;
  bottom: 70px; /* Aumentado para ficar acima do rodapé */
  right: 16px;
  z-index: 1000; /* Garante que o botão fique acima de outros elementos */
}

/* Ajuste responsivo para dispositivos móveis */
@media (max-width: 599px) {
  .fab-button {
    bottom: 80px; /* Mais espaço em telas pequenas para evitar o rodapé */
    right: 16px;
  }
}

/* Ajuste adicional para garantir visibilidade em dispositivos com barras de sistema */
@media (max-height: 600px) {
  .fab-button {
    bottom: calc(env(safe-area-inset-bottom) + 80px); /* Respeita o safe area do dispositivo */
  }
}
</style>
