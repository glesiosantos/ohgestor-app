import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePedidoStore = defineStore('pedidoStore', () => {

  const pedido = ref([])

  const popularPedido = (data) => {
    console.log("******* ", data)
    pedido.value = data
  }

  return { popularPedido, pedido }
})
