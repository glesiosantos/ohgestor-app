<template>
  <q-page padding>
    <div class="row">
      <q-card class="col-12 col-sm-12">
        <q-card-section>
          <q-table
            flat
            bordered
            :columns="columns"
            :rows="clienteStore.clientes"
            :filter="filter"
            :pagination="pagination"
          >
            <template v-slot:top>
              <q-input outlined color="primary" v-model="filter" class="col-4 " :class="{'full-width': $q.screen.xs}">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-space />
              <q-btn
                color="primary"
                class="text-white"
                label="Adicionar cliente"
                @click="openDrawer('add')"
                :class="{'full-width q-mt-sm': $q.screen.xs}"/>
            </template>

            <template v-slot:body-cell-ativo="props">
              <q-td :props="props">
                <q-icon name="circle" :color="props.row.ativo ? 'green-10' : 'red-10'"/>
              </q-td>
            </template>

            <template v-slot:body-cell-integrado="props">
              <q-td :props="props">
                <q-icon name="circle" :color="props.row.integrado ? 'green-10' : 'red-10'"/>
              </q-td>
            </template>

            <template v-slot:body-cell-periodoDeTeste="props">
              <q-td :props="props">
                <q-badge :color="props.row.periodoDeTeste ? 'red' : 'grey'">
                  {{ props.row.periodoDeTeste ? 'SIM' : 'NÃO' }}
                </q-badge>
                <!-- <q-icon name="circle" :color="props.row.teste ? 'green-10' : 'red-10'"/> -->
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="q-gutter-x-xs text-center">
                <!-- <q-btn round dense color="primary text-black" size="md" @click="openDrawer('edit', props.row)" title="Adicionar um Carro">
                  <span class="material-symbols-outlined" style="font-size: 20px;">transportation</span>
                </q-btn> -->
                <q-btn
                  round
                  dense
                  color="warning"
                  size="md"
                  icon="edit"
                  @click="openDrawer('edit', props.row)"
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>

    <q-drawer v-model="drawer" side="right" overlay elevated :width="400">
      <q-scroll-area class="fit">
        <cliente-form
          v-if="drawer"
          :is-edit="isEdit"
          :initial-data="currentData"
          @submit="handleSubmit"
          @cancel="closeDrawer"
        />
      </q-scroll-area>
    </q-drawer>

  </q-page>
</template>
<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { useDrawer } from 'src/composables/useDrawer'
import ClienteForm from './components/ClienteForm.vue'

import useNotify from 'src/composables/UseNotify'
import { utilService } from 'src/services/util_service'
import { clienteService } from './services/cliente_service'
import { useClienteStore } from 'src/stores/cliente_store'
import { useFormatarDocumento } from 'src/composables/useFormatarDocumento'

const { drawer, openDrawer,closeDrawer, isEdit, currentData } = useDrawer()
const { notifyError, notifyWarning, notifySucess } = useNotify()
const { formatarDocumento } = useFormatarDocumento()

const { carregarEstados, carregarModulos } = utilService()
const { salvarCliente, carregarClientes } = clienteService()


const clienteStore = useClienteStore()

const filter = ref('')

const columns = [
  { label: 'CPF ou CNPJ',
    field: row => formatarDocumento(row.documento),
    align: 'rigth'
  },
  { label: 'Razão Social', field: row => row.razao, format: val => `${val}`, align: 'left' },
  { label: 'Nome', name: 'tipo', field: row => row.fantasia, format: val => `${val}`, sortable: true, align: 'left' },
  { label: 'Tipo de Pessoa', name: 'tipo', field: row => row.tipoPessoa, format: val => `${val}`, sortable: true, align: 'left' },
  { label: 'Módulo', field: row => row.modulo, align: 'center' },
  { label: 'Plano Contrado', name: 'tipo', field: row => row.plano, format: val => `${val}`, sortable: true, align: 'left' },
  { label: 'Período de Test', name: 'periodoDeTeste', field: row => row.periodoDeTeste, format: val => `${val}`, sortable: true, align: 'center' },
  { label: 'Status do Cliente', name: 'ativo', field: row => row.ativo, format: val => `${val}`, sortable: true, align: 'center' },
  { label: 'Dia do Venc.', name: 'vencimento', field: row => row.diaVencimento, format: val => `${val}`, sortable: true, align: 'center' },
  { label: 'Integrado', name: 'integrado', field: row => row.integrado, format: val => `${val}`, sortable: true, align: 'center' },
  { label: 'Tipo de Pessoa', name: 'tipo', field: row => row.tipoPessoa, format: val => `${val}`, sortable: true, align: 'left' },
  { label: 'Contatos', name: 'perfil', field: row => `+55${row.contatos[0]}`, format: val => `${val}`, sortable: true, align: 'left' },
  { label: 'Ações', field: 'actions', name: 'actions', align: 'center' }
]

const pagination = {
  rowsPerPage: 10, // Ajuste o número de registros por página aqui
  page: 1,
  sortBy: 'id',
  descending: false
}


const handleSubmit = async (formData) => {
  try {
    if (isEdit.value) {
      const response = await salvarCliente(formData)

      if (response.status === 201) {
        notifySucess('Cliente atualizado com sucesso!')
      }

    } else {
      const response = await salvarCliente(formData)
      console.log('***** ****** response: ', response)
      if (response.status === 201) {
        notifySucess('Cadastro realizado com sucesso!')
      }

    }

    await carregarClientes()

    await nextTick()
    closeDrawer()
  } catch (error) {
    console.log('***** ****** response: ', error.data)
    if(error.response.data.status === 400) {
      notifyWarning(error.response.data.mensagem);
    } else {
      notifyError('Erro ao salvar cliente: ' + (error.message || 'Erro desconhecido'))
    }

    await nextTick()
    closeDrawer()
  }
}

onMounted(async () => {
  await carregarEstados()
  await carregarModulos()
  await carregarClientes()
})
</script>
