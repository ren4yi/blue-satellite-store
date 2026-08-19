<template>
  <div class="home">
    <HeroSection v-if="!temFiltroAtivo" />

    <section class="home-section" v-if="temFiltroAtivo">
      <ProductList
        :produtos="produtosFiltrados"
        :favoritos="favoritos"
        :titulo="tituloLista"
        destaque
        @adicionarAoCarrinho="$emit('adicionarAoCarrinho', $event)"
        @toggleFavorito="$emit('toggleFavorito', $event)"
        @verDetalhes="abrirModal"
      />
    </section>

    <section class="home-section" v-if="!temFiltroAtivoOuOrdenacao">
      <ProductList
        :produtos="maisVendidos"
        :favoritos="favoritos"
        titulo="Mais vendidos"
        @adicionarAoCarrinho="$emit('adicionarAoCarrinho', $event)"
        @toggleFavorito="$emit('toggleFavorito', $event)"
        @verDetalhes="abrirModal"
      />
    </section>

    <section class="home-section" v-if="!temFiltroAtivoOuOrdenacao">
      <ProductList
        :produtos="maisBaratos"
        :favoritos="favoritos"
        titulo="Melhores preços"
        @adicionarAoCarrinho="$emit('adicionarAoCarrinho', $event)"
        @toggleFavorito="$emit('toggleFavorito', $event)"
        @verDetalhes="abrirModal"
      />
    </section>

    <section class="home-section">
      <ProductList
        :produtos="produtosOrdenados"
        :favoritos="favoritos"
        :titulo="tituloCatalogo"
        @adicionarAoCarrinho="$emit('adicionarAoCarrinho', $event)"
        @toggleFavorito="$emit('toggleFavorito', $event)"
        @verDetalhes="abrirModal"
      />
    </section>

    <BookModal
      :livro="livroSelecionado"
      :favoritos="favoritos"
      @fechar="livroSelecionado = null"
      @adicionarAoCarrinho="$emit('adicionarAoCarrinho', $event)"
      @toggleFavorito="$emit('toggleFavorito', $event)"
    />
  </div>
</template>

<script>
import HeroSection from './HeroSection.vue'
import ProductList from '../products/ProductList.vue'
import BookModal from '../products/BookModal.vue'

export default {
  name: 'HomeView',
  components: { HeroSection, ProductList, BookModal },
  props: {
    produtos: { type: Array, default: () => [] },
    favoritos: { type: Array, default: () => [] },
    filtroAtivo: { type: String, default: '' },
    filtroGenero: { type: String, default: '' },
    busca: { type: String, default: '' },
    ordenarPor: { type: String, default: '' }
  },
  emits: ['adicionarAoCarrinho', 'toggleFavorito'],
  data() {
    return { livroSelecionado: null }
  },
  computed: {
    temFiltroAtivo() {
      return !!(this.filtroAtivo || this.filtroGenero || this.busca)
    },
    temFiltroAtivoOuOrdenacao() {
      return this.temFiltroAtivo || !!this.ordenarPor
    },
    maisVendidos() {
      return this.produtos.filter(p => p.maisVendido)
    },
    maisBaratos() {
      return this.produtos.filter(p => p.maisBarato)
    },
    produtosOrdenados() {
      return this.aplicarOrdenacao([...this.produtos])
    },
    produtosFiltrados() {
      let lista = [...this.produtos]
      if (this.filtroAtivo === 'favoritos') {
        lista = lista.filter(p => this.favoritos.includes(p.id))
      } else if (this.filtroAtivo === 'maisVendido') {
        lista = lista.filter(p => p.maisVendido)
      } else if (this.filtroAtivo === 'maisBarato') {
        lista = lista.filter(p => p.maisBarato)
      }
      if (this.filtroGenero) {
        lista = lista.filter(p => p.genero === this.filtroGenero)
      }
      if (this.busca) {
        const q = this.busca.toLowerCase()
        lista = lista.filter(p =>
          p.titulo.toLowerCase().includes(q) ||
          p.autor.toLowerCase().includes(q) ||
          p.genero.toLowerCase().includes(q)
        )
      }
      return this.aplicarOrdenacao(lista)
    },
    tituloLista() {
      if (this.filtroAtivo === 'favoritos') return 'Meus favoritos'
      if (this.busca) return `Resultados para "${this.busca}"`
      if (this.filtroGenero) return this.filtroGenero
      if (this.filtroAtivo === 'maisVendido') return 'Mais vendidos'
      if (this.filtroAtivo === 'maisBarato') return 'Melhores preços'
      return 'Resultados'
    },
    tituloCatalogo() {
      if (!this.temFiltroAtivo && this.ordenarPor) {
        if (this.ordenarPor === 'preco-asc') return 'Catálogo — menor preço primeiro'
        if (this.ordenarPor === 'preco-desc') return 'Catálogo — maior preço primeiro'
        if (this.ordenarPor === 'recente') return 'Catálogo — lançamentos recentes primeiro'
      }
      return 'Catálogo completo'
    }
  },
  methods: {
    abrirModal(produto) {
      this.livroSelecionado = produto
    },
    aplicarOrdenacao(lista) {
      if (this.ordenarPor === 'preco-asc') {
        return lista.sort((a, b) => a.preco - b.preco)
      }
      if (this.ordenarPor === 'preco-desc') {
        return lista.sort((a, b) => b.preco - a.preco)
      }
      if (this.ordenarPor === 'recente') {
        return lista.sort((a, b) => Number(b.lancamento) - Number(a.lancamento))
      }
      return lista
    }
  }
}
</script>

<style scoped>
.home { min-height: 100vh; }
.home-section { margin-bottom: 2rem; }
:deep(html),
:deep(body) {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

:deep(html::-webkit-scrollbar),
:deep(body::-webkit-scrollbar) {
  display: none;
  width: 0;
  height: 0;
}
</style>
