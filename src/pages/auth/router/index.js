const SignInPage = import('../SignInPage.vue')
const ForgoutPage = import('../SignInPage.vue')

export default [
  { path: '', name: 'sign-in', component: () =>  SignInPage},
  { path: 'forgout',name: 'forgout', component: () =>  ForgoutPage},
]
