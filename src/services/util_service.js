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

  const carregarModulos = async () => {
    const response = await api.get('v1/utils/modulos', {headers: {Authorization: authStore.auth.token}})
    utilStore.popularModulos(response.data)
  }

  const carregarVencimentos = async () => {
    const response = await api.get('v1/utils/vencimentos', {headers: {Authorization: authStore.auth.token}})
    utilStore.popularVencimentos(response.data)
  }

  const carregarPerfis = async () => {
    const response = await api.get('v1/utils/perfis', {headers: {Authorization: authStore.auth.token}})
    utilStore.popularPerfis(response.data)
  }

  const carregarPlanos = async () => {
    const response = await api.get('v1/utils/planos', {headers: {Authorization: authStore.auth.token}})
    utilStore.popularPlanos(response.data)
  }

  const carregarEnderecoViaCep = async (data) => {
    const cep = data.replaceAll('-','')
    const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`)
    return response.data
  }

  return { carregarEstados, carregarEstabelecimentoComerciais, carregarModulos, carregarVencimentos, carregarPerfis, carregarPlanos, carregarEnderecoViaCep }
}
