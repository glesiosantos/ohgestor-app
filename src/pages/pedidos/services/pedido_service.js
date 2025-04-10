import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth_store'
import { usePedidoStore } from 'src/stores/pedido_store'

const authStore = useAuthStore()
const pedidoStore = usePedidoStore()

export const pedidoService = () => {

  const carregarPedidos = async () => {
    const response = await api.get('v1/pedidos',{ headers: {Authorization: authStore.auth.token}} )
    console.log('*** *** ', response.data)
    pedidoStore.popularPedido(response.data)
  }

  const registrarPedido = async (data) => {
    const response = await api.post('v1/pedidos',data,{ headers: {Authorization: authStore.auth.token}} )
    return response
  }

  return { carregarPedidos, registrarPedido }
}
