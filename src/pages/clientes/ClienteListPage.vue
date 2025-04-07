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

            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="q-gutter-x-xs text-center">
                <!-- <q-btn round dense color="primary text-black" size="md" @click="openDrawer('edit', props.row)" title="Adicionar um Carro">
                  <span class="material-symbols-outlined" style="font-size: 20px;">transportation</span>
                </q-btn> -->
                <q-btn
                  round
                  dense
                  color="green"
                  size="md"
                  icon="visibility"
                  @click="visualizarCliente(props.row)"
                  title="Visualizar Cliente"
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

// import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import { utilService } from 'src/services/util_service'
import { clienteService } from './services/cliente_service'
import { useClienteStore } from 'src/stores/cliente_store'

const { drawer, openDrawer,closeDrawer, isEdit, currentData } = useDrawer()
const { notifyError, notifyWarning } = useNotify()

const { carregarEstados, carregarModulos } = utilService()
const { salvarCliente, carregarClientes } = clienteService()


const clienteStore = useClienteStore()

const filter = ref('')
// const router = useRouter()

const columns = [
  { label: 'CPF ou CNPJ',
    field: row => row.cpfOuCnpj
  },
  { label: 'Razão Social', field: row => row.razaoSocial, format: val => `${val}`, align: 'left' },
  { label: 'Nome', name: 'tipo', field: row => row.nomeFantasia, format: val => `${val}`, sortable: true, align: 'left' },
  { label: 'Tipo de Pessoa', name: 'tipo', field: row => row.tipoPessoa, format: val => `${val}`, sortable: true, align: 'left' },
  { label: 'Módulo', name: 'tipo', field: row => row.modulo, format: val => `${val}`, sortable: true, align: 'left' },
  { label: 'Status do Cliente', name: 'tipo', field: row => row.ativo, format: val => `${val}`, sortable: true, align: 'center' },
  { label: 'Dia do Venc.', name: 'tipo', field: row => row.vencimento, format: val => `${val}`, sortable: true, align: 'center' },
  { label: 'Integrado', name: 'tipo', field: row => row.integrado, format: val => `${val}`, sortable: true, align: 'center' },
  { label: 'Tipo de Pessoa', name: 'tipo', field: row => row.tipoPessoa, format: val => `${val}`, sortable: true, align: 'left' },
  { label: 'Contatos', name: 'perfil', field: row => row.contatos[0], format: val => `${val}`, sortable: true, align: 'left' },
  { label: 'Ações', field: 'actions', name: 'actions', align: 'center' }
]


const handleSubmit = async (formData) => {
  try {
    if (isEdit.value) {
      console.log('', formData)
    } else {
      const response = await salvarCliente(formData)
      console.log('*** *** ', response)
    }
    await nextTick()
    closeDrawer()
  } catch (error) {

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
