<template>
  <q-page padding>
    <q-list bordered class="rounded-borders" style="max-width: 350px">
      <q-item-label header>{{store.auth.perfil}}</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{store.auth.apelido}}</q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold">E-mail</span>

          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth_store';

const store = useAuthStore()
</script>
