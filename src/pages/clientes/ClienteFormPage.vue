<template>
  <q-page padding>
    <q-card class="full-width q-pa-md">
      <q-form @submit.prevent="handleForm">
        <fieldset>
          <legend class="text-caption text-weight-light">Dados da empresa</legend>
        <div class="row q-col-gutter-sm">
          <q-input
            outlined
            class="col-12 col-md-2"
            type="text"
            v-model="documento"
            :mask="documentoInput"
            label="CPF/CNPJ"
          />
          <q-input
            outlined
            class="col-12 col-md-5"
            type="text"
            v-model="formCliente.razao"
            label="Razão Social"
          />
          <q-input
            outlined
            v-model="formCliente.fantasia"
            class="col-12 col-md-5"
            type="text"
            label="Nome Fantasia"
          />
        </div>
        <div class="row q-col-gutter-sm q-my-sm">
          <q-select
            outlined
            class="col-12"
            type="text"
            label="Segmento"
            v-model="formCliente.segmento"
            :options="segmentosComerciais"
            option-label="nome"
            option-value="id"
          />
        </div>
        </fieldset>
        <fieldset>
          <legend class="text-caption text-weight-light">Dados do estabelecimento</legend>

          <div class="row q-col-gutter-sm q-my-sm">
            <q-input
              outlined
              class="col-12 col-md-2"
              type="text"
              v-model="formCliente.cep"
              label="CEP"
            />
            <q-input
              outlined
              class="col-12 col-md-7"
              type="text"
              v-model="formCliente.logradouro"
              label="Logradouro"
            />
            <q-input
              outlined
              class="col-12 col-md-3"
              type="text"
              label="Bairro"
              v-model="formCliente.bairro"
            />
          </div>
          <div class="row q-col-gutter-sm q-my-sm">
            <q-input
              outlined
              class="col-12 col-md-3"
              type="text"
              label="Cidade"
              v-model="formCliente.cidade"
            />
            <q-select
              outlined
              :options="estados"
              option-label="nome"
              option-value="sigla"
              class="col-12 col-md-3"
              type="text"
              label="Estado"
              v-model="formCliente.estado"
              emit-value
              map-options
            />
            <q-input
              outlined
              class="col-12 col-md-3"
              type="text"
              label="Latitude"
              v-model="formCliente.cidade"
            />
            <q-input
              outlined
              class="col-12 col-md-3"
              type="text"
              label="Longitude"
              v-model="formCliente.cidade"
            />
          </div>
        </fieldset>
        <div class="flex flex-center q-my-sm">
          <q-btn label="Cadastar cliente" type="submit" size="md" color="primary" :class="{'full-width': $q.screen.xs}"/>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';

const estados = ref([
{ sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' }
])

const segmentosComerciais = [
  { id: 1, nome: 'Agronegócio' },
  { id: 2, nome: 'Alimentos e Bebidas' },
  { id: 3, nome: 'Automóveis e Peças' },
  { id: 4, nome: 'Construção Civil' },
  { id: 5, nome: 'Comércio Varejista' },
  { id: 6, nome: 'Comércio Atacadista' },
  { id: 7, nome: 'Educação' },
  { id: 8, nome: 'Eletrônicos e Informática' },
  { id: 9, nome: 'Energia' },
  { id: 10, nome: 'Entretenimento e Lazer' },
  { id: 11, nome: 'Farmácia e Drogarias' },
  { id: 12, nome: 'Finanças e Seguros' },
  { id: 13, nome: 'Saúde e Bem-estar' },
  { id: 14, nome: 'Indústria' },
  { id: 15, nome: 'Moda e Vestuário' },
  { id: 16, nome: 'Serviços de TI' },
  { id: 17, nome: 'Transporte e Logística' },
  { id: 18, nome: 'Turismo e Viagens' },
  { id: 19, nome: 'Telecomunicações' },
  { id: 20, nome: 'Imobiliário' },
  { id: 21, nome: 'Meio Ambiente' },
  { id: 22, nome: 'Tecnologia' },
  { id: 23, nome: 'Comunicação e Marketing' },
  { id: 24, nome: 'Produtos de Limpeza' },
  { id: 25, nome: 'Pet Shop' },
  { id: 26, nome: 'Varejo Online' }
]

const documento = ref('')

const formCliente = reactive({
  cpfCnpj: '',
  razao: '',
  fantasia: '',
  segmento: '',
  cep: '',
  logradouro: '',
  bairro: '',
  cidade: '',
  estado: '',
  latitude: '',
  longitude: ''
})

const documentoInput = computed(() => {
  const input = documento.value.trim()
  console.log('*** **** *** ', input)
  return input.length <= 11 ? '###.###.###-##' : '##.###.###/####-##'})

const handleForm = () => {}

</script>
