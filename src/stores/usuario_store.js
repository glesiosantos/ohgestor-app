import { defineStore } from "pinia"
import { ref } from "vue"

export const useUsuarioStore = defineStore('usuarioStore', () => {

  const usuarios = ref([])
  const usuario = ref('')

  const carregarUsuarios = (data) => usuarios.value = data

  const carregarUsuarioPeloEmail = (data) => usuario.value = data

  return { usuarios, usuario, carregarUsuarios, carregarUsuarioPeloEmail }
})
