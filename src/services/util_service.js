import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth_store'
import { useUtilStore } from 'src/stores/util_store'

const authStore = useAuthStore()
const utilStore = useUtilStore()

export const utilService = () => {

  const carregarEstados = async () => {
    const response = await api.get('v1/utils/estados', {headers: {Authorization: authStore.auth.token}})
    utilStore.popularEstados(response.data)
  }

  const carregarEstabelecimentoComerciais = async () => {
    const response = await api.get('v1/utils/estabelecimentos', {headers: {Authorization: authStore.auth.token}})
    utilStore.popularEstabelecimentoComerciais(response.data)
  }

  return { carregarEstados, carregarEstabelecimentoComerciais }
}
