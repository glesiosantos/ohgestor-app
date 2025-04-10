<template>
  <q-page class="flex flex-center" padding>
    <q-card flat bordered class="q-ma-md full-width" style="max-width: 800px;">
      <!-- Cabeçalho -->
      <q-card-section class="bg-primary text-white">
        <div class="row items-center no-wrap">
          <q-icon name="qr_code" size="md" class="q-mr-sm" />
          <div class="text-h6">Detalhes do Pedido {{ pedidoStore.pedido.idPedido}}</div>
          <q-space />
          <q-btn flat round icon="close" @click="router.push({ name: 'pedidos' })" />
        </div>
      </q-card-section>

      <!-- Resumo do Pedido -->
      <q-card-section>
        <div class="text-subtitle1 q-mb-md">Resumo do Pedido</div>
        <q-list dense>
          <q-item>
            <q-item-section>
              <q-item-label>Cliente</q-item-label>
              <q-item-label caption>{{ pedidoStore.pedido.cliente }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Módulo</q-item-label>
              <q-item-label caption>{{ pedidoStore.pedido.modulo }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>Plano</q-item-label>
              <q-item-label caption>{{ pedidoStore.pedido.plano }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Situação</q-item-label>
              <q-item-label caption>
                <q-badge :color="pedidoStore.pedido.situacao === 'PENDENTE' ? 'orange' : 'green'">
                  {{ pedidoStore.pedido.situacao }}
                </q-badge>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>Valor</q-item-label>
              <q-item-label caption>R$ {{ pedidoStore.pedido.valor?.toFixed(2) }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Data de Criação</q-item-label>
              <q-item-label caption>{{ formatarData(pedidoStore.pedido.dataCriadoEm) }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>Data de Expiração</q-item-label>
              <q-item-label caption>{{ formatarData(pedidoStore.pedido.expirationDate) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <!-- QR Code Pix -->
      <q-card-section class="flex flex-center">
        <div class="text-center">
          <div class="text-subtitle1 q-mb-sm">Pague com Pix</div>
          <q-img :src="imageSrc" style="max-width: 250px;" spinner-color="primary" />
          <q-btn
            color="primary"
            label="Copiar Código Pix"
            icon="content_copy"
            class="q-mt-md"
            @click="copyPixCode"
          >
            <q-tooltip>Copiar código Pix para pagamento</q-tooltip>
          </q-btn>
        </div>
      </q-card-section>

      <!-- Botão Voltar -->
      <q-card-actions align="right" class="q-pa-md">
        <q-btn color="red" label="Voltar" @click="router.push({ name: 'pedidos' })" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePedidoStore } from 'src/stores/pedido_store'
import useNotify from 'src/composables/UseNotify'
import { pedidoService } from './services/pedido_service'

const router = useRouter()
const route = useRoute()

const pedidoStore = usePedidoStore()
const { notifySucess } = useNotify()
const { carregarPedidoPeloId } = pedidoService()

// Copiar o código Pix para a área de transferência
const copyPixCode = () => {
  navigator.clipboard.writeText(pedidoStore.pedido.payload)
  notifySucess('Código Pix copiado!')
}

// Converter a imagem base64 em src para o q-img
const imageSrc = computed(() => `data:image/png;base64,${pedidoStore.pedido.encodeImage}`)

// Formatar datas
const formatarData = (data) => {
  if (!data) return 'N/A'
  const date = new Date(data)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

onMounted(async () => {
  await carregarPedidoPeloId(route.params.id)
})
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>
