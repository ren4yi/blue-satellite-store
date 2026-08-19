<template>
  <div class="cart-item">
    <img :src="item.capa" :alt="item.nome" class="item-capa" @error="onImgError" />
    <div class="item-info">
      <p class="item-nome">{{ item.nome }}</p>
      <p class="item-preco-unit">{{ formatarPreco(item.preco) }} / un.</p>
      <div class="qty-controls">
        <button @click="$emit('decrementar', item.id)">−</button>
        <span>{{ item.quantidade }}</span>
        <button @click="$emit('incrementar', item.id)">+</button>
      </div>
    </div>
    <div class="item-right">
      <p class="item-total">{{ formatarPreco(item.valorTotal) }}</p>
      <button class="remove-btn" @click="$emit('remover', item.id)" title="Remover">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { formatarPreco } from '../../utils/currencyUtils.js'

export default {
  name: 'CartItem',
  props: { item: { type: Object, required: true } },
  emits: ['incrementar', 'decrementar', 'remover'],
  methods: {
    formatarPreco,
    onImgError(e) {
      e.target.src = 'https://placehold.co/60x80/0d0a1f/8b5cf6?text=' + encodeURIComponent(this.item.nome)
    }
  }
}
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  align-items: center;
}

.item-capa {
  width: 50px;
  height: 68px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.item-info { flex: 1; min-width: 0; }

.item-nome {
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-preco-unit {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0 0 6px;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.qty-controls button {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: background 0.2s;
}

.qty-controls button:hover { background: rgba(139, 92, 246, 0.4); }

.qty-controls span {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  min-width: 20px;
  text-align: center;
}

.item-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
  flex-shrink: 0;
}

.item-total {
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.45;
  transition: opacity 0.2s;
  padding: 0;
  color: #ec4899;
  display: flex;
}

.remove-btn:hover { opacity: 1; }
</style>