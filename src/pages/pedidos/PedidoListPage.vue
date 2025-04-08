<template>
  <q-page padding>
    <!-- Lista de pedidos -->
    <q-table
      title="Lista de Pedidos"
      :rows="pedidos"
      :columns="columns"
      row-key="id"
      :loading="loading"
    >
      <template v-slot:body-cell-acoes="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            icon="edit"
            @click="editarPedido(props.row)"
          />
          <q-btn
            flat
            round
            icon="delete"
            @click="deletarPedido(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <q-btn
      fab
      icon="add"
      color="primary"
      class="fixed-bottom-right q-mr-md q-mb-md"
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
import { useQuasar } from 'quasar'
import PedidoFormDrawer from './components/PedidoFormDrawer.vue'
import { utilService } from 'src/services/util_service'
import { clienteService } from '../clientes/services/cliente_service'

const $q = useQuasar()
const { drawer, openDrawer, closeDrawer, isEdit, currentData } = useDrawer()

const loading = ref(false)
const pedidos = ref([])

const { carregarModulos, carregarPlanos, carregarVencimentos } = utilService()
const { carregarClientes } = clienteService()

const columns = [
  { name: 'id', label: 'ID', field: 'id', sortable: true },
  { name: 'cliente', label: 'Cliente', field: 'cliente', sortable: true },
  { name: 'modulos', label: 'Módulos', field: 'modulos' },
  { name: 'status', label: 'Status', field: 'status' },
  { name: 'acoes', label: 'Ações', field: 'acoes' }
]

// Função para editar pedido (exemplo)
const editarPedido = (row) => {
  openDrawer('edit')
  currentData.value = row
}

// Função para deletar pedido (exemplo)
const deletarPedido = (row) => {
  console.log('Deletar pedido:', row)
  // Adicione lógica de deleção aqui
}

const handleSubmit = async (formData) => {
  try {
    loading.value = true

    if (isEdit.value) {
      // Lógica para editar pedido (substitua pela sua chamada real)
      console.log('Editando pedido:', formData)
      // Exemplo: await pedidoService.atualizarPedido(formData)
    } else {
      // Lógica para criar novo pedido (substitua pela sua chamada real)
      console.log('Criando novo pedido:', formData)
      // Exemplo: await pedidoService.criarPedido(formData)
    }

    // Atualiza a lista de pedidos (se necessário)
    pedidos.value = await carregarPedidos() // Assumindo que você tem essa função

    $q.notify({
      type: 'positive',
      message: isEdit.value ? 'Pedido atualizado com sucesso!' : 'Pedido criado com sucesso!'
    })

    closeDrawer()
  } catch (error) {
    console.error('Erro ao processar o pedido:', error)
    $q.notify({
      type: 'negative',
      message: 'Erro ao salvar o pedido. Tente novamente.'
    })
  } finally {
    loading.value = false
  }
}

// Função fictícia para carregar pedidos (substitua pela sua lógica real)
const carregarPedidos = async () => {
  // Exemplo: return await pedidoService.listarPedidos()
  return pedidos.value // Placeholder
}

onMounted(async () => {
  try {
    loading.value = true
    await Promise.all([
      carregarClientes(),
      carregarModulos(),
      carregarPlanos(),
      carregarVencimentos(),
      carregarPedidos().then(data => pedidos.value = data)
    ])
  } catch (error) {
    console.error('Erro ao carregar dados iniciais:', error)
    $q.notify({
      type: 'negative',
      message: 'Erro ao carregar os dados. Tente novamente.'
    })
  } finally {
    loading.value = false
  }
})
</script>
