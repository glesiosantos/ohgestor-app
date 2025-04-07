<template>
  <q-form @submit="$emit('submit', form)" class="column">
    <!-- Cabeçalho -->
    <q-card-section class="bg-primary">
      <div class="row items-center no-wrap text-white">
        <div class="text-h6">
          {{ isEdit ? 'Editar Cliente' : 'Novo Cliente' }}
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
          v-model="form.tipo"
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
        :mask="documentoMask"
        :loading="loading"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || (form.tipo === 'PF' ? 'CPF é obrigatório' : 'CNPJ é obrigatório'),
          (val) => (form.tipo === 'PF' ? val.replace(/\D/g, '').length === 11 : val.replace(/\D/g, '').length === 14) || 'Número de dígitos inválido'
        ]"
      />

      <q-input v-if="form.tipo == 'PJ'"
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
      <q-btn flat label="Adicionar Contato" color="black" icon="add" @click="addContact" class="q-my-sm" />
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
import { ref, watch, computed } from 'vue';
import { debounce } from 'quasar';

const { carregarEnderecoViaCep } = utilService();
const utilStore = useUtilStore();

const props = defineProps({
  isEdit: Boolean,
  initialData: Object,
});

const location = ref(false);
defineEmits(['submit', 'cancel']);

const tipoCliente = ref([
  { tipo: 'PF', descricao: 'Pessoa Física' },
  { tipo: 'PJ', descricao: 'Pessoa Jurídica' },
]);

const form = ref({
  idCliente: null,
  tipo: 'PF',
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
  contatos: [''],
});

const loading = ref(false);

const documentoMask = computed(() => {
  return form.value.tipo === 'PF' ? '###.###.###-##' : '##.###.###/####-##';
});

function populateForm(data) {
  const newFormData = {
    tipo: data.tipoPessoa === 'PESSOA JURÍDICA' ? 'PJ' : 'PF',
    idCliente: data.idCliente || null,
    fantasia: data.fantasia || '',
    documento: data.documento || '',
    razao: data.razao || (data.tipoPessoa === 'PESSOA FÍSICA' ? data.fantasia : ''),
    cep: data.cep || '',
    logradouro: data.logradouro || '',
    bairro: data.bairro || '',
    cidade: data.cidade || '',
    estado: data.estado || '',
    latitude: data.latitude || '',
    longitude: data.longitude || '',
    modulo: data.modulo || '',
    contatos: Array.isArray(data.contatos) && data.contatos.length > 0 ? [...data.contatos] : [''],
  };
  form.value = { ...form.value, ...newFormData };
}

function addContact() {
  form.value.contatos.push('');
}

function removeContact(index) {
  if (form.value.contatos.length > 1) {
    form.value.contatos.splice(index, 1);
  }
}

const carregarEndereco = debounce(async () => {
  try {
    loading.value = true;
    const endereco = await carregarEnderecoViaCep(form.value.cep);
    form.value.logradouro = endereco.logradouro || '';
    form.value.bairro = endereco.bairro || '';
    form.value.cidade = endereco.localidade || '';
    form.value.estado = endereco.uf || '';
  } catch (error) {
    console.error('Erro ao carregar endereço:', error);
  } finally {
    loading.value = false;
  }
}, 200);

const obterLocalizacao = () => {
  if (location.value) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.value.latitude = position.coords.latitude.toString();
        form.value.longitude = position.coords.longitude.toString();
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
      }
    );
  }
};

watch(
  () => form.value.tipo,
  debounce((newVal) => {
    if (newVal === 'PF' && form.value.razao !== form.value.fantasia) {
      form.value.razao = form.value.fantasia || '';
    } else if (newVal === 'PJ' && form.value.razao === form.value.fantasia) {
      form.value.razao = '';
    }
    form.value.documento = '';
  }, 100)
);

watch(
  () => form.value.fantasia,
  (newVal) => {
    if (form.value.tipo === 'PF' && form.value.razao !== newVal) {
      form.value.razao = newVal || '';
    }
  }
);

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      populateForm(newData);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.q-mb-md > * {
  margin-bottom: 16px;
}
.q-mb-md:last-child {
  margin-bottom: 0;
}
</style>
