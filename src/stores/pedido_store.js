import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePedidoStore = defineStore('pedidoStore', () => {

  const pedido = ref('')
  const pedidos = ref([])

  const popularPedido = (data) => pedido.value = data

  const carregarPedidos = (data) => pedidos.value = data

  return { popularPedido, carregarPedidos, pedido, pedidos}
})
