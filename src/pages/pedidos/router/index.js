const PedidoListPage = import('../PedidoListPage.vue')
const PedidoDetalhePage = import('../PedidoDetalhePage.vue')

export default [
  { path: '/pedidos', name: 'pedidos', component: () =>  PedidoListPage},
  { path: '/pedidos/:id', name: 'detalhe-pedido', component: () =>  PedidoDetalhePage},
]
