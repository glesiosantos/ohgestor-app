const SignInPage = import('../SignInPage.vue')
const ForgoutPage = import('../ForgoutPage.vue')

export default [
  { path: '', name: 'sign-in', component: () =>  SignInPage},
  { path: 'forgout', name:'forgout', component: () =>  ForgoutPage},
]
