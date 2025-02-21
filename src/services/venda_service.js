import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth_store'
import { usePedidoStore } from 'src/stores/pedido_store'

const authStore = useAuthStore()
const pedidoStore = usePedidoStore();

export const vendaService = () => {

  const registrarVendaCliente = async (data) => {
    const response = await api.post('/v1/pedidos', data, {headers: {Authorization: authStore.auth.token}})
    pedidoStore.popularPedido(response.data)
  }
  return { registrarVendaCliente }
}
