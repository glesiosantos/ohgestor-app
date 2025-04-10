<template>
  <q-form ref="formRef" @submit="onSubmit" class="q-gutter-y-sm">
    <q-card-section class="bg-primary">
      <div class="row items-center no-wrap text-white">
        <div class="text-h6">
          {{ isEdit ? 'Editar Pedido' : 'Iniciar Pedido' }}
        </div>
        <q-space />
        <q-btn flat round dense icon="close" color="white" @click="emit('cancel')" />
      </div>
    </q-card-section>

    <q-card-section class="flex-1">
      <!-- Busca de cliente com autocomplete -->
      <q-select
        outlined
        v-model="form.idCliente"
        use-input
        input-debounce="300"
        label="Buscar por CPF/CNPJ ou Nome Fantasia/Razão Social"
        :options="clientesOptions"
        @filter="buscarCliente"
        class="q-mb-md"
        option-label="label"
        option-value="idCliente"
        emit-value
        map-options
        lazy-rules
        :rules="[val => !!val || 'Cliente é campo obrigatório']"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
              <q-item-label caption>
                {{ scope.opt.documento }} - {{ scope.opt.razao }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <!-- Dados do proprietário -->
      <q-input
        outlined
        v-model="form.cpfProprietario"
        label="CPF do Proprietário"
        mask="###.###.###-##"
        class="col-12 col-md-4 q-mb-md"
        lazy-rules
        :rules="[
          val => !!val || 'CPF é campo obrigatório',
          val => val && val.replace(/\D/g, '').length === 11 || 'CPF informado é inválido'
        ]"
      />

      <q-input
        outlined
        v-model="form.nomeProprietario"
        label="Nome do Proprietário"
        :style="{ textTransform: 'uppercase' }"
        class="col-12 col-md-8 q-mb-md"
        lazy-rules
        :rules="[val => !!val || 'Nome é campo obrigatório']"
      />

      <!-- Seleção de módulo -->
      <q-select
        outlined
        :options="utilStore.modulos"
        option-label="descricao"
        option-value="sigla"
        label="Selecione o Módulo"
        v-model="form.modulo"
        emit-value
        map-options
        class="q-mb-md"
        lazy-rules
        :rules="[val => !!val || 'Módulo é campo obrigatório']"
      />

      <q-select
        outlined
        :options="utilStore.planos"
        option-label="descricao"
        option-value="sigla"
        label="Selecione o Plano"
        v-model="form.plano"
        emit-value
        map-options
        class="q-mb-md"
        lazy-rules
        :rules="[val => !!val || 'Plano é campo obrigatório']"
      />

      <div class="col-12 col-md-5 q-gutter-sm q-mb-md">
        <span class="block text-thin">Sugestões de Vencimento</span>
        <div class="flex justify-between">
          <q-radio
            v-model="form.vencimento"
            v-for="vencimento in utilStore.vencimentos"
            :val="vencimento.descricao"
            :label="vencimento.dia.toString()"
            :key="vencimento.descricao"
          />
        </div>
      </div>

      <!-- Toggle para teste gratuito -->
      <q-toggle
        v-model="form.testeGratuito"
        label="Teste Gratuito"
        class="q-mb-md"
      />

      <!-- Campo visível apenas quando É teste -->
      <q-select
        v-if="form.testeGratuito"
        outlined
        v-model="form.periodoTeste"
        :options="utilStore.gratuitos"
        label="Período de Teste"
        option-label="descricao"
        option-value="sigla"
        class="q-mb-md"
        emit-value
        map-options
        lazy-rules
        :rules="[val => val !== null && val !== undefined || 'Período de teste é obrigatório']"
      />
    </q-card-section>

    <q-card-section class="footer-fixed q-pa-md text-right">
      <q-btn flat label="Cancelar" color="negative" @click="emit('cancel')" />
      <q-btn
        type="submit"
        color="primary"
        class="text-black"
        label="Salvar"
        :disable="loading"
      />
    </q-card-section>
  </q-form>
</template>

<script setup>
import { useClienteStore } from 'src/stores/cliente_store'
import { useUtilStore } from 'src/stores/util_store'
import { ref, watch, computed } from 'vue'

const utilStore = useUtilStore()
const clienteStore = useClienteStore()

const props = defineProps({
  isEdit: Boolean,
  initialData: Object,
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  idCliente: '',
  cpfProprietario: '',
  nomeProprietario: '',
  modulo: '',
  plano: '',
  vencimento: '',
  testeGratuito: false,
  periodoTeste: null
})

const formRef = ref(null) // Referência ao q-form
const clientesOptions = ref([])
const loading = ref(false)

// Inicializa o formulário com dados iniciais, se fornecidos
watch(() => props.initialData, (newVal) => {
  if (newVal) {
    form.value = { ...form.value, ...newVal }
  }
}, { immediate: true })

// Computa os clientes do store para garantir reatividade
const todosClientes = computed(() => {
  return clienteStore.clientes.map(cliente => ({
    idCliente: cliente.idCliente,
    label: cliente.fantasia || cliente.razao,
    documento: cliente.documento,
    razao: cliente.razao,
    tipoPessoa: cliente.tipoPessoa
  }))
})

// Função para buscar/filtrar clientes
const buscarCliente = (val, update) => {
  if (!val || val.length < 3) {
    update(() => {
      clientesOptions.value = todosClientes.value
    })
    return
  }

  update(() => {
    clientesOptions.value = todosClientes.value.filter(cliente =>
      cliente.documento.includes(val) ||
      cliente.razao.toLowerCase().includes(val.toLowerCase()) ||
      (cliente.label && cliente.label.toLowerCase().includes(val.toLowerCase()))
    )
  })
}

// Função para validar e enviar o formulário
const onSubmit = async () => {
  try {
    loading.value = true
    const isValid = await formRef.value.validate()
    if (!isValid) {
      console.log('Formulário inválido:', form.value)
      return
    }
    console.log('Formulário válido, enviando:', form.value)
    emit('submit', form.value)
  } catch (error) {
    console.error('Erro ao validar formulário:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
