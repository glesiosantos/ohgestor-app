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
            <q-item clickable v-close-popup @click="onItemClick">
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
        <q-route-tab  icon="mail" label="Mails" />
        <q-route-tab  icon="alarm" label="Alarms" />
        <q-route-tab  icon="movie" label="Movies" />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
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

const store = useAuthStore()

const user = store.auth

const linksList = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    route: { name: 'dashboard' }
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
