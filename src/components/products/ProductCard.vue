<template>
  <div class="product-card" @click="$emit('verDetalhes', produto)">
    <div class="card-image-wrap">
      <img
        :src="produto.capa"
        :alt="produto.titulo"
        class="card-image"
        @error="onImgError"
      />
      <div class="card-badges">
        <span class="badge badge-hit" v-if="produto.maisVendido">Mais vendido</span>
        <span class="badge badge-cheap" v-if="produto.maisBarato">Preço baixo</span>
      </div>
      <button
        class="fav-btn"
        @click.stop="toggleFavorito"
        :class="{ favoritado: isFavorito }"
        :title="isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" :fill="isFavorito ? '#ec4899' : 'none'" stroke="#ec4899" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>

    <div class="card-body">
      <span class="genre-tag">{{ produto.genero }}</span>
      <h3 class="card-title">{{ produto.titulo }}</h3>
      <p class="card-author">{{ produto.autor }}</p>
      <p class="card-resenha">{{ produto.resenha }}</p>
      <p class="card-year">Lançamento: {{ produto.lancamento }}</p>

      <div class="card-footer">
        <span class="card-price">{{ formatarPreco(produto.preco) }}</span>
        <button class="add-btn" @click.stop="$emit('adicionarAoCarrinho', produto)">
          Adicionar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatarPreco } from '../../utils/currencyUtils.js'

export default {
  name: 'ProductCard',
  props: {
    produto: { type: Object, required: true },
    favoritos: { type: Array, default: () => [] }
  },
  emits: ['adicionarAoCarrinho', 'toggleFavorito', 'verDetalhes'],
  computed: {
    isFavorito() {
      return this.favoritos.includes(this.produto.id)
    }
  },
  methods: {
    formatarPreco,
    toggleFavorito() {
      this.$emit('toggleFavorito', this.produto.id)
    },
    onImgError(e) {
      e.target.src = 'https://placehold.co/300x420/0d0a1f/8b5cf6?text=' + encodeURIComponent(this.produto.titulo)
    }
  }
}
</script>

<style scoped>
.product-card {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(4px);
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(139, 92, 246, 0.25);
  border-color: rgba(139, 92, 246, 0.5);
}

.card-image-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .card-image { transform: scale(1.04); }

.card-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.badge {
  font-size: 0.66rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 10px;
  backdrop-filter: blur(6px);
}

.badge-hit { background: rgba(236, 72, 153, 0.9); color: #fff; }
.badge-cheap { background: rgba(139, 92, 246, 0.9); color: #fff; }

.fav-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(3, 0, 19, 0.65);
  border: none;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: transform 0.2s;
}

.fav-btn:hover { transform: scale(1.15); }
.fav-btn.favoritado { background: rgba(236, 72, 153, 0.25); }

.card-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
}

.genre-tag {
  font-size: 0.68rem;
  font-weight: 600;
  color: #c9a8ff;
  background: rgba(139, 92, 246, 0.15);
  padding: 2px 8px;
  border-radius: 10px;
  align-self: flex-start;
  letter-spacing: 0.3px;
}

.card-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-author {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.card-resenha {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-year {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
  margin: 0;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.card-price {
  font-size: 1rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
}

.add-btn {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.35rem 0.9rem;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.2s;
}

.add-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 14px rgba(139, 92, 246, 0.5);
}
</style>git commit -m "feat: cria grid de livros com card individual"