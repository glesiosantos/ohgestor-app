import { defineStore } from "pinia";
import { ref } from "vue";

export const useClienteStore = defineStore('clienteStore', () => {

  const clientes = ref([])

  const carregarClientes = (data) => clientes.value = data

  return { clientes, carregarClientes }
})
