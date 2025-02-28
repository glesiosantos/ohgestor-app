const VendaPage = import('../VendaPage.vue')
const FinalizarVendaPage = import('../FinalizarPedidoPage.vue')
const AcompanhamentoVendaPage = import('../AcompanhamentoVendaPage.vue')

export default [
  { path: '/vender/:documento', name: 'vender-modulo', component: () =>  VendaPage},
  { path: '/vender/finalizar', name: 'finalizar-venda', component: () =>  FinalizarVendaPage},
  { path: '/acompanhamento', name: 'minhas-vendas', component: () =>  AcompanhamentoVendaPage}
]
