import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth_store'
import { useClienteStore } from 'src/stores/cliente_store'

const authStore = useAuthStore()
const clienteStore = useClienteStore()

export const clienteService = () => {

  const carregarClientes = async () => {
    const response = await api.get('v1/clientes', {headers: {Authorization: authStore.auth.token}})
    clienteStore.carregarClientes(response.data)
  }

  const salvarCliente = async (data) => {
    await api.post('v1/clientes', data, {headers: {Authorization: authStore.auth.token}})
  }

  return { carregarClientes, salvarCliente }
}
