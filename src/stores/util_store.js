import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUtilStore = defineStore('utilStore', () => {

  const estados = ref([])
  const estabelecimentos = ref([])

  const popularEstados = (data) => {
    estados.value = data
  }

  const popularEstabelecimentoComerciais = (data) => {
    estabelecimentos.value = data
  }

  return { popularEstados, popularEstabelecimentoComerciais, estados, estabelecimentos }
})
