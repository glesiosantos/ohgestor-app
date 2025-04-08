import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar()

  const notifySucess = (message) => $q.notify({
    type: 'positive',
    message
  })

  const notifyError = (message) => $q.notify({
    type: 'negative',
    message: message || 'Failed!'
  })

  const notifyWarning = (message) => $q.notify({
    type: 'warning',
    message: message || 'Warning!'
  })


  return { notifySucess, notifyError, notifyWarning }

}
