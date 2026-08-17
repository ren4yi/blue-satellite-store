<template>
  <transition name="slide">
    <div class="cart-overlay" v-if="visivel" @click.self="$emit('fechar')">
      <div class="cart-panel">
        <div class="cart-header">
          <h2>Meu carrinho</h2>

          <button class="close-btn" @click="$emit('fechar')">
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div class="cart-empty" v-if="carrinho.items.length === 0">
          <p>Seu carrinho está vazio.</p>
          <small>Adicione alguns títulos ao carrinho.</small>
        </div>

        <div class="cart-items" v-else>
          <CartItem
            v-for="item in carrinho.items"
            :key="item.id"
            :item="item"
            @incrementar="$emit('incrementar', $event)"
            @decrementar="$emit('decrementar', $event)"
            @remover="$emit('remover', $event)"
          />
        </div>

        <cartSummary
          :carrinho="carrinho"
          @finalizar="$emit('finalizar')"
          @limpar="$emit('limpar')"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import CartItem from './CartItem.vue'
import cartSummary from './cartSummary.vue'

export default {
  name: 'CartPanel',

  components: {
    CartItem,
    cartSummary
  },

  props: {
    carrinho: {
      type: Object,
      required: true
    },

    visivel: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    'fechar',
    'incrementar',
    'decrementar',
    'remover',
    'finalizar',
    'limpar'
  ]
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(3, 0, 19, 0.65);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  justify-content: flex-end;
}

.cart-panel {
  background: #0d0a1f;
  width: 380px;
  max-width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  overflow-y: auto;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.cart-header h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
}

.close-btn {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  color: #fff;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(236, 72, 153, 0.35);
}

.cart-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
  gap: 0.5rem;
}

.cart-empty p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}

.cart-empty small {
  font-size: 0.8rem;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-active .cart-panel,
.slide-leave-active .cart-panel {
  transition: transform 0.3s ease;
}

.slide-enter-from .cart-panel,
.slide-leave-to .cart-panel {
  transform: translateX(100%);
}
</style>
