<template>
  <q-form @submit="$emit('submit', form)" class="column">
    <!-- Cabeçalho -->
    <q-card-section class="bg-primary">
      <div class="row items-center no-wrap text-white">
        <div class="text-h6">
          {{ isEdit ? 'Adicionar Veículo' : 'Novo Cliente' }}
        </div>
        <q-space />
        <q-btn flat round dense icon="close" color="black" @click="$emit('cancel')" />
      </div>
    </q-card-section>

    <q-card-section class="flex-1">
      <!-- Tipo de Cliente -->
      <div class="q-gutter-sm q-mb-sm text-center">
        <q-radio
          :disable="isEdit"
          v-for="t in tipoCliente"
          v-model="form.tipoCliente"
          :val="t.tipo"
          :label="t.descricao"
          :key="t.tipo"
        />
      </div>

      <!-- CPF ou CNPJ -->
      <q-input
        v-model="form.documento"
        :disable="isEdit"
        label="CPF ou CNPJ"
        outlined
        :mask="form.tipoCliente === 'PF' ? '###.###.###-##' : '##.###.###/####-##'"
        :loading="loading"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || (form.tipoCliente === 'PF' ? 'CPF é obrigatório' : 'CNPJ é obrigatório'),
          (val) => (form.tipoCliente === 'PF' ? val.replace(/\D/g, '').length === 11 : val.replace(/\D/g, '').length === 14) || 'Número de dígitos inválido'
        ]"
      />

      <q-input v-if="form.tipoCliente == 'PJ'"
        v-model="form.razao"
        :disable="isEdit"
        label="Razão Social"
        :style="{ textTransform: 'uppercase' }"
        outlined
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Razão social é obrigatório']"
      />

      <q-input
        v-model="form.fantasia"
        :disable="isEdit"
        label="Nome Completo ou Nome Fantasia"
        :style="{ textTransform: 'uppercase' }"
        outlined
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Nome Completo é obrigatório']"
      />
      <q-input
        outlined
        class="col-12 col-md-2"
        mask="#####-###"
        type="text"
        v-model="form.cep"
        @blur="carregarEndereco"
        label="CEP"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'CEP é campo obrigatório']"
      />
      <q-input
        outlined
        class="col-12 col-md-10"
        type="text"
        v-model="form.logradouro"
        label="Logradouro"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'LOGRADOURO é campo obrigatório']"
      />

      <q-input
        outlined
        class="col-12 col-md-4"
        type="text"
        label="Bairro"
        v-model="form.bairro"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'BAIRRO é campo obrigatório']"
      />
      <q-input
        outlined
        class="col-12 col-md-4"
        type="text"
        label="Cidade"
        v-model="form.cidade"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'CIDADE é campo obrigatório']"
      />
      <q-select
        outlined
        :options="utilStore.estados"
        option-label="nome"
        option-value="sigla"
        class="col-12 col-md-4"
        type="text"
        label="Estado"
        v-model="form.estado"
        emit-value
        map-options
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'ESTADO é campo obrigatório']"
      />

      <q-checkbox v-model="location" label="Você esta no local do cadastro agora?" class="col-12 q-mb-sm" @blur="obterLocalizacao" />

      <q-select
        outlined
        :options="utilStore.modulos"
        option-label="descricao"
        option-value="sigla"
        class="col-12 col-md-4"
        type="text"
        label="Modulo"
        v-model="form.modulo"
        emit-value
        map-options
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'MÓDULO é campo obrigatório']"
      />

      <!-- Contatos -->
      <div v-for="(contato, index) in form.contatos" :key="index">
        <q-input
          v-model="form.contatos[index]"
          :disable="isEdit"
          mask="(##) #.####-####"
          :label="index === 0 ? 'Contato Principal' : `Contato ${index + 1}`"
          outlined
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Contato é obrigatório']"
        >
          <template v-slot:append>
            <q-btn
              v-if="index > 0"
              round
              dense
              flat
              icon="delete"
              color="negative"
              @click="removeContact(index)"
            />
          </template>
        </q-input>
      </div>
      <q-btn flat label="Adicionar Contato" color="black" icon="add" @click="addContact" class="q-my-sm" v-if="!isEdit"/>
    </q-card-section>

    <!-- Rodapé (botões) -->
    <q-card-section class="footer-fixed q-pa-md text-right">
      <q-btn flat label="Cancelar" color="negative" @click="$emit('cancel')" />
      <q-btn type="submit" color="primary" class="text-black" label="Salvar" :disable="loading" />
    </q-card-section>
  </q-form>
</template>

<script setup>
import { utilService } from 'src/services/util_service';
import { useUtilStore } from 'src/stores/util_store';
import { ref, watch } from 'vue'

const { carregarEnderecoViaCep } = utilService()
const utilStore = useUtilStore()

const props = defineProps({
  isEdit: Boolean,
  initialData: Object
})

const location = ref(false)

defineEmits(['submit', 'cancel']);

const tipoCliente = ref([
  { tipo: 'PF', descricao: 'Pessoa Física' },
  { tipo: 'PJ', descricao: 'Pessoa Jurídica' },
]);

const form = ref({
  idCliente: null,
  tipoCliente: '',
  fantasia: '',
  documento: '',
  razao: '',
  cep: '',
  logradouro: '',
  bairro: '',
  cidade: '',
  estado: '',
  latitude: '',
  longitude: '',
  modulo: '',
  contatos: ['']
});

const loading = ref(false);

function populateForm(data) {
  const newFormData = {
    tipoCliente: data.tipo === 'Pessoa Física' ? 'PF' : 'PJ',
    idCliente: data.idCliente || null,
    fantasia: data.fantasia || '',
    documento: data.documento || '', // Mantém o valor bruto da API
    razao: data.razao || (data.tipo === 'Pessoa Física' ? data.fantasia : ''),
    cep: data.cep || null,
    logradouro: data.logradouro || null,
    bairro: data.bairro || null,
    cidade: data.cidade || null,
    estado: data.estado || null,
    latitude: data.latitude || null,
    longitude: data.longitude || null,
    modulo: data.modulo || null,
    contatos: data.contatos && Array.isArray(data.contatos) ? [...data.contatos] : [''],
  };

  Object.assign(form.value, newFormData);
}

// Funções auxiliares
function addContact() {
  form.value.contatos.push('');
}

function removeContact(index) {
  if (form.value.contatos.length > 1) {
    form.value.contatos.splice(index, 1);
  }
}

const carregarEndereco = async () => {
  const endereco = await carregarEnderecoViaCep(form.value.cep)
  form.value.logradouro = endereco.logradouro
  form.value.bairro = endereco.bairro
  form.value.cidade = endereco.localidade
  form.value.estado = endereco.uf
}

const obterLocalizacao = () => {
  navigator.geolocation.getCurrentPosition(position => {
    form.value.latitude = position.coords.latitude
    form.value.longitude = position.coords.longitude
  })
}

watch(() => form.value.tipoCliente, (newVal) => {
  if (newVal === 'PF') {
    form.value.razao = form.value.nome;
  }
});

watch(() => form.value.nome, (newVal) => {
  if (form.value.tipoCliente === 'PF') {
    form.value.razao = newVal;
  }
});

watch(() => props.initialData, (newData) => {
  if (newData) {
    populateForm(newData);
  }
}, { immediate: true });

watch(() => form.value.tipoCliente, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    form.value.documento = '';
    if (newVal === 'PF') {
      form.value.razao = form.value.nome;
    }
  }
});
</script>

<style scoped>
.q-mb-md > * {
  margin-bottom: 16px;
}
.q-mb-md:last-child {
  margin-bottom: 0;
}
</style>
