import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar()

  const notfifySucess = (message) => $q.notify({
    type: 'positive',
    message
  })

  const notfifyError = (message) => $q.notify({
    type: 'negative',
    message: message || 'Failed!'
  })


  return { notfifySucess, notfifyError }

}
