import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth_store'

const authStore = useAuthStore()

export const pedidoService = () => {

  const carregarPedidos = async () => {
    const response = await api.get('v1/pedidos',{ headers: {Authorization: authStore.auth.token}} )
    return response
  }

  const registrarPedido = async (data) => {
    console.log('*** *** *** ', data)
    const response = await api.post('v1/pedidos',data,{ headers: {Authorization: authStore.auth.token}} )
    return response
  }

  return { carregarPedidos, registrarPedido }
}
