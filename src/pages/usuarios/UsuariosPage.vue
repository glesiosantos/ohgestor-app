<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-table
      flat
      bordered
      :columns="columns"
      :rows="usuarioStore.usuarios"
      :filter="filter"
    >
      <template v-slot:top>
        <q-input outlined color="primary" v-model="filter" class="col-4" :class="{'full-width': $q.screen.xs}">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <q-btn color="primary" label="Adicionar Usuario" @click="formUsuario" :class="{'full-width q-mt-sm': $q.screen.xs}"/>
      </template>

      <template v-slot:body-cell-ativo="props">
        <q-td :props="props">
          <q-icon name="circle" :color="props.row.ativo ? 'green-10' : 'red-10'"/>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-xs">
          <!-- Botões de Editar e Excluir -->
          <q-btn
            round
            dense
            color="primary"
            size="sm"
            icon="edit"
          />
          <q-btn
            round
            dense
            color="red"
            size="sm"
            icon="lock"
          />
        </q-td>
      </template>
  </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUsuarioStore } from 'src/stores/usuario_store'
import { usuarioService } from 'src/services/usuario_service'


const router = useRouter()
const filter = ref('')

const { carregarUsuarios } = usuarioService()
const usuarioStore = useUsuarioStore()

const columns = [
  {
    label: 'Nome',
    field: row => row.nome,
    format: val => `${val}`,
    align: 'rigth'
  },
  {
    label: 'E-mail',
    field: row => row.email,
    format: val => `${val}`,
    sortable: true,
    align: 'rigth'
   },
  { label: 'Perfil do usuário', field: 'perfil', align: 'center' },
  { label: 'Situação', field: 'ativo', name: "ativo", align: 'center' },
  { label: 'Ações', field: 'actions', name: 'actions', align: 'center'}
]

const formUsuario = () => router.push({ name: 'usuario-form'})
onMounted(() => carregarUsuarios())
</script>
