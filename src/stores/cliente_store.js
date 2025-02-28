import { defineStore } from "pinia";
import { ref } from "vue";

export const useClienteStore = defineStore('clienteStore', () => {

  const clientes = ref([])
  const cliente = ref('')

  const carregarClientes = (data) => clientes.value = data

  const carregarClienteViaDocumento = (data) => cliente.value = data

  return { clientes, cliente, carregarClientes, carregarClienteViaDocumento }
})
