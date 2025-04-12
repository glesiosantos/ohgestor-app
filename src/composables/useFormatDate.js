export function useFormatDate() {
  const formatarData = (data) => {
    if (!data) return 'N/A'
    const date = new Date(data)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return { formatarData }
}
