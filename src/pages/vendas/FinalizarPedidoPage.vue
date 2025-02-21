<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="q-pa-md">
      <!-- Resumo do Pedido -->
      <q-card-section>
        <div class="text-h6 text-center">Resumo do Pedido</div>
        <q-separator />
        <q-list separator>
          <q-item>
            <q-item-section>
              <q-item-label>{{ pedidoStore.pedido.modulo }}</q-item-label>
              <q-item-label caption>{{ pedidoStore.pedido.quantidade }} Usuário(s) x R$ {{ pedidoStore.pedido.valor.toFixed(2) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-separator />
        <div class="text-h6 text-center q-mt-md">Total: R$ {{ total.toFixed(2)}}</div>
      </q-card-section>

      <!-- QR Code Pix -->
      <q-card-section class="flex flex-center">
        <Qrcode :value="pedidoStore.pedido.payload" :size="200" level="H" />
      </q-card-section>

      <!-- Botão Copiar Código Pix -->
      <q-card-section class="text-center">
        <q-btn color="primary" @click="copyPixCode">Copiar Código Pix</q-btn>
        <q-tooltip>Copiar código Pix para pagamento</q-tooltip>
      </q-card-section>
      <q-btn color="primary" @click="router.push({ name: 'clientes'})">Todos os Clientes</q-btn>
    </q-card>
  </q-page>
</template>

<script setup>
import Qrcode from 'qrcode.vue'
import useNotify from 'src/composables/UseNotify'
import { usePedidoStore } from 'src/stores/pedido_store'
import { computed} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const pedidoStore = usePedidoStore()
const {notfifySucess} = useNotify()

const copyPixCode = () => {
      navigator.clipboard.writeText(pedidoStore.pedido.payload);
      notfifySucess("Código Pix copiado!")
}

const total = computed(() => pedidoStore.pedido.quantidade * pedidoStore.pedido.valor)
</script>
