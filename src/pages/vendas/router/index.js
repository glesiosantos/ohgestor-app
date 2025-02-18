const VendaPage = import('../VendaPage.vue')
const AcompanhamentoVendaPage = import('../AcompanhamentoVendaPage.vue')

export default [
  { path: '/vender/:documento', name: 'vender-modulo', component: () =>  VendaPage},
  { path: '/acompanhamento', name: 'minhas-vendas', component: () =>  AcompanhamentoVendaPage}
]
