import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth_store'
import { useUsuarioStore } from 'src/stores/usuario_store'

const authStore = useAuthStore()
const usuarioStore = useUsuarioStore()

export const usuarioService = () => {

  const carregarUsuarios = async () => {
    const response = await api.get('v1/usuarios', {headers: {Authorization: authStore.auth.token}})
    usuarioStore.carregarUsuarios(response.data)
  }

  const salvarUsuario = async (data) => {
    const response = await api.post('v1/usuarios', data, {headers: {Authorization: authStore.auth.token}})
    return response
  }

  return { carregarUsuarios, salvarUsuario }
}
