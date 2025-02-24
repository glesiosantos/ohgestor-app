import { api } from "src/boot/axios"

export const authService = () => {
  const recuperarAcesso = async (email) => {
    await api.post('v1/auth/recuperar-acesso', {email})
  }

  return {recuperarAcesso}
}
