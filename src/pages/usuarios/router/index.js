const UsuariosPage = import('../UsuariosPage.vue')
const UsuarioFormPage = import('../UsuarioFormPage.vue')

export default [
  { path: '/usuarios', name: 'usuarios', component: () =>  UsuariosPage},
  { path: '/add-usuario', name: 'usuario-form', component: () =>  UsuarioFormPage}
]
