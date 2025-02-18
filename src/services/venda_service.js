import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth_store'

const authStore = useAuthStore()

export const vendaService = () => {

  const registrarVendaCliente = async (data) => {
     await api.post('/v1/vendas/registrar-modulo', data, {headers: {Authorization: authStore.auth.token}})
  }

  return { registrarVendaCliente }
}
