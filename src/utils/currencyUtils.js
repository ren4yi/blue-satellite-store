

export function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`
}

export function calcularDesconto(valor, porcentagem) {
  return valor * (porcentagem / 100)
}

export function calcularFrete(total) {
  if (total >= 150) return 0
  if (total >= 80) return 9.90
  return 19.90
}