const PedidoListPage = import('../CarregarPedidos.vue')

export default [
  { path: '/pedidos', name: 'pedidos', component: () =>  PedidoListPage}
]
