<template>
  <q-page padding>
    <q-select
        v-model="formVenda.cliente"
        :options="clientes"
        option-label="razaoSocial"
        option-value="id"
        label="Buscar Cliente"
        filled
        use-input
        input-debounce="300"
        @filter="filtrarClientes"
        hint="Minimum 2 characters to trigger filtering"
        class="col-12"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>

  </q-page>
</template>

<script setup>
import { clienteService } from 'src/services/cliente_service';
import { useClienteStore } from 'src/stores/cliente_store'
import { onMounted, reactive, ref } from 'vue'

const {carregarClientes} = clienteService()
const clienteStore = useClienteStore()

const clientes = ref([])

const formVenda = reactive({
  cliente: ''
})

const filtrarClientes = (val, update) => {
  update(() => {
    const index = val.toLowerCase()
    clientes.value = clienteStore.clientes.filter(v => v.razaoSocial.toLowerCase().indexOf(index) > -1)
  })
}

onMounted(() => carregarClientes())

</script>
