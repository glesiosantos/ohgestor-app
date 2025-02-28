const ClienteListPage = import('../ClienteListPage.vue')
const ClienteFormPage = import('../ClienteFormPage.vue')

export default [
  { path: '/listar-cliente', name: 'clientes', component: () =>  ClienteListPage},
  { path: '/add-cliente', name: 'cliente-form', component: () =>  ClienteFormPage}
]
