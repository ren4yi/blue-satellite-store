// cartUtils.js - Funções auxiliares para o carrinho de compras

export function adicionarAoCarrinho(carrinho, produto) {
  const itemExistente = carrinho.items.find(item => item.id === produto.id)

  if (itemExistente) {
    itemExistente.quantidade++
    itemExistente.valorTotal = itemExistente.quantidade * itemExistente.preco
  } else {
    carrinho.items.push({
      id: produto.id,
      nome: produto.titulo,
      preco: produto.preco,
      capa: produto.capa,
      quantidade: 1,
      valorTotal: produto.preco
    })
  }

  recalcularTotal(carrinho)
}

export function removerDoCarrinho(carrinho, itemId) {
  const index = carrinho.items.findIndex(item => item.id === itemId)
  if (index !== -1) {
    carrinho.items.splice(index, 1)
    recalcularTotal(carrinho)
  }
}

export function incrementarQuantidade(carrinho, itemId) {
  const item = carrinho.items.find(item => item.id === itemId)
  if (item) {
    item.quantidade++
    item.valorTotal = item.quantidade * item.preco
    recalcularTotal(carrinho)
  }
}

export function decrementarQuantidade(carrinho, itemId) {
  const item = carrinho.items.find(item => item.id === itemId)
  if (item) {
    if (item.quantidade > 1) {
      item.quantidade--
      item.valorTotal = item.quantidade * item.preco
      recalcularTotal(carrinho)
    } else {
      removerDoCarrinho(carrinho, itemId)
    }
  }
}

export function recalcularTotal(carrinho) {
  const subtotal = carrinho.items.reduce((acc, item) => acc + item.valorTotal, 0)
  carrinho.total = subtotal - carrinho.desconto + carrinho.frete
}

export function limparCarrinho(carrinho) {
  carrinho.items = []
  carrinho.frete = 0
  carrinho.desconto = 0
  carrinho.total = 0
}

export function totalItens(carrinho) {
  return carrinho.items.reduce((acc, item) => acc + item.quantidade, 0)
}