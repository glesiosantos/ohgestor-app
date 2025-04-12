<template>
  <q-layout view="lhh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Gestor App
        </q-toolbar-title>

        <q-btn-dropdown :label="user.apelido" flat>
          <q-list>
            <q-item clickable v-close-popup @click="router.push({ name: 'profile'})">
                <q-item-section>
                  <q-item-label>Perfil do usuário</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="logout">
                <q-item-section>
                  <q-item-label>Sair do Sistema</q-item-label>
                </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-footer class="small-screen-only">
      <q-tabs>
        <q-route-tab exact replace icon="dashboard" label="Dashboard" :to="{name: 'dashboard'}" />
        <q-route-tab exact replace icon="payments" label="Vender" :to="{name: 'pedidos'}" />
        <q-route-tab exact replace icon="monetization_on" label="Pedidos" :to="{name: 'minhas-vendas'}"/>
        <q-route-tab exact replace icon="manage_accounts" label="Meu Perfil" :to="{name: 'profile'}"/>
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">{{ store.auth.apelido }}</div>
            <div>{{ store.auth.perfil }}</div>
          </div>
        </q-img>
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list>
            <q-item-label
              header
            >
              Essential Links
            </q-item-label>

            <EssentialLink
              v-for="link in linksList"
              :key="link.title"
              v-bind="link"
            />
          </q-list>
      </q-scroll-area>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth_store'
''
const store = useAuthStore()

const user = store.auth

const linksList = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    route: { name: 'dashboard' }
  },
  {
    title: 'Clientes',
    icon: 'groups',
    route: { name: 'clientes' }
  },
  {
    title: 'Usuarios',
    icon: 'manage_accounts',
    route: { name: 'usuarios' }
  },
  {
    title: 'Pedidos',
    icon: 'toc',
    route: { name: 'pedidos' }
  }
]

const router = useRouter()
const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  store.removeAuth()
  router.replace({ name: 'sign-in'})
}
</script>
