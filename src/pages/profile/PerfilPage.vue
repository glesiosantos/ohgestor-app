<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Meu Perfil</div>
      </q-card-section>

      <q-card-section>
        <q-list bordered separator>
          <q-item>
            <q-item-section>
              <q-item-label overline>Nome</q-item-label>
              <q-item-label>{{ store.auth.apelido }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>E-mail</q-item-label>
              <q-item-label>{{ store.auth.email }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>Perfil</q-item-label>
              <q-item-label>{{ store.auth.perfil }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section>
        <span>Alterar a senha de acesso</span>
        <q-form @submit="changePassword">
          <div class="row q-col-gutter-sm q-mt-xs">
            <q-input
            v-model="form.nova"
            label="Nova Senha"
            type="password"
            class="col-12 col-md-6"
            outlined
            lazy-rules
            :rules="[val => val.length >= 6 || 'A senha deve ter no mínimo 6 caracteres']"
          />

          <q-input
            v-model="form.confirmar"
            label="Confirma senha"
            type="password"
            class="col-12 col-md-6"
            outlined
            lazy-rules
            :rules="[val => val.length >= 6 || 'A senha deve ter no mínimo 6 caracteres']"
          />
          </div>

          <div class="row q-gutter-sm">
            <q-btn label="Alterar Senha" type="submit" color="primary" :class="{'full-width': $q.screen.xs}"/>
            <q-btn label="Cancelar" @click="handleCancelar" size="md" color="red" :class="{'full-width': $q.screen.xs}"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import useNotify from 'src/composables/UseNotify';
import { usuarioService } from 'src/services/usuario_service';
import { useAuthStore } from 'src/stores/auth_store';
import { reactive } from 'vue';

const store = useAuthStore()
const {notfifyWarning, notfifySucess, notfifyError} = useNotify()
const { alterarSenha } = usuarioService()

let form = reactive({
  nova: '',
  confirmar: ''
})

const changePassword = async () => {


  if (form.nova !== form.confirmar) {
    notfifyWarning("Senha diferente, por favor, tentar novamente")
    return
  }

  const response = await alterarSenha(form.nova)

  if(response.status === 204) {
    notfifySucess("Senha alterada com sucesso")
  } else {
    notfifyError("Ocorreu algum error, por favor, entre em contato com administrador!")
  }

  form = {}

}

const handleCancelar = () => {
  form = {}
}

</script>
