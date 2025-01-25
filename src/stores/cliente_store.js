import { defineStore } from "pinia";
import { ref } from "vue";

export const useClienteStore = defineStore('clienteStore', () => {

  const clientes = ref([])

  return { clientes }
})
