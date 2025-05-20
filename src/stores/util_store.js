import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUtilStore = defineStore('utilStore', () => {

  const estados = ref([])
  const estabelecimentos = ref([])
  const modulos = ref([])
  const segmentos = ref([])
  const vencimentos = ref([])
  const perfis = ref([])
  const planos = ref([])
  const gratuitos = ref([])

  const popularEstados = (data) => estados.value = data

  const popularEstabelecimentoComerciais = (data) => estabelecimentos.value = data

  const popularModulos = (data) => modulos.value = data

  const popularVencimentos = (data) => vencimentos.value = data

  const popularPerfis = (data) => perfis.value = data

  const popularGratuito = (data) => gratuitos.value = data

  const popularPlanos = (data) => planos.value = data

  const popularSegmentos = (data) => segmentos.value = data

  return { popularEstados, popularEstabelecimentoComerciais, popularModulos, popularVencimentos, popularPerfis, popularPlanos, popularGratuito, popularSegmentos,
    estados, estabelecimentos, modulos, vencimentos, perfis, planos, gratuitos, segmentos
  }
})
