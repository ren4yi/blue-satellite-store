<template>
  <transition name="fade">
    <div class="modal-overlay" v-if="livro" @click.self="$emit('fechar')">
      <div class="modal">
        <button class="modal-close" @click="$emit('fechar')">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="modal-body">
          <div class="modal-image-side">
            <img
              :src="livro.capa"
              :alt="livro.titulo"
              class="modal-capa"
              @error="onImgError"
            />
            <div class="modal-badges">
              <span class="badge badge-hit" v-if="livro.maisVendido">Mais vendido</span>
              <span class="badge badge-cheap" v-if="livro.maisBarato">Preço baixo</span>
            </div>
          </div>

          <div class="modal-info">
            <span class="modal-genre">{{ livro.genero }}</span>
            <h2 class="modal-title">{{ livro.titulo }}</h2>
            <p class="modal-author">{{ livro.autor }}</p>
            <p class="modal-year">Lançamento: {{ livro.lancamento }}</p>

            <hr class="modal-divider" />

            <h4>Descrição</h4>
            <p class="modal-resenha">{{ livro.resenha }}</p>

            <hr class="modal-divider" />

            <div class="modal-footer">
              <span class="modal-price">{{ formatarPreco(livro.preco) }}</span>
              <div class="modal-actions">
                <button
                  class="fav-modal-btn"
                  :class="{ favoritado: isFavorito }"
                  @click="$emit('toggleFavorito', livro.id)"
                >
                  {{ isFavorito ? 'Favoritado' : 'Favoritar' }}
                </button>
                <button class="add-modal-btn" @click="adicionarEFechar">
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { formatarPreco } from '../../utils/currencyUtils.js'

export default {
  name: 'BookModal',
  props: {
    livro: { type: Object, default: null },
    favoritos: { type: Array, default: () => [] }
  },
  emits: ['fechar', 'adicionarAoCarrinho', 'toggleFavorito'],
  computed: {
    isFavorito() {
      return this.livro && this.favoritos.includes(this.livro.id)
    }
  },
  methods: {
    formatarPreco,
    adicionarEFechar() {
      this.$emit('adicionarAoCarrinho', this.livro)
      this.$emit('fechar')
    },
    onImgError(e) {
      e.target.src = 'https://placehold.co/300x420/0d0a1f/8b5cf6?text=' + encodeURIComponent(this.livro.titulo)
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(3, 0, 19, 0.75);
  backdrop-filter: blur(6px);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal {
  background: #0d0a1f;
  border-radius: 24px;
  max-width: 720px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  cursor: pointer;
  color: #fff;
  z-index: 2;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover { background: rgba(236, 72, 153, 0.4); }

.modal-body {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 2rem;
  padding: 2rem;
}

.modal-image-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.modal-capa {
  width: 100%;
  border-radius: 14px;
  box-shadow: 0 12px 30px rgba(139, 92, 246, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.modal-badges { display: flex; gap: 0.4rem; flex-wrap: wrap; justify-content: center; }

.badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 10px;
}
.badge-hit { background: rgba(236, 72, 153, 0.9); color: #fff; }
.badge-cheap { background: rgba(139, 92, 246, 0.9); color: #fff; }

.modal-genre {
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(139, 92, 246, 0.15);
  color: #c9a8ff;
  padding: 3px 12px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 0.4rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 0.4rem;
  line-height: 1.2;
}

.modal-author { font-size: 0.85rem; color: rgba(255, 255, 255, 0.5); margin: 0 0 0.3rem; }
.modal-year { font-size: 0.8rem; color: rgba(255, 255, 255, 0.35); margin: 0; }

.modal-divider { border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 1rem 0; }

.modal-info h4 { font-size: 0.85rem; color: rgba(255, 255, 255, 0.85); font-weight: 700; margin: 0 0 0.5rem; }

.modal-resenha { font-size: 0.88rem; color: rgba(255, 255, 255, 0.6); line-height: 1.7; margin: 0; }

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.modal-price { font-size: 1.5rem; font-weight: 800; color: #fff; }

.modal-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }

.fav-modal-btn {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 12px;
  padding: 0.6rem 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: background 0.2s;
}
.fav-modal-btn.favoritado { background: rgba(236, 72, 153, 0.35); }
.fav-modal-btn:hover { background: rgba(236, 72, 153, 0.35); }

.add-modal-btn {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border: none;
  border-radius: 12px;
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.add-modal-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.5);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 600px) {
  .modal-body { grid-template-columns: 1fr; }
  .modal-image-side { flex-direction: row; align-items: flex-start; }
  .modal-capa { width: 120px; }
}
</style>