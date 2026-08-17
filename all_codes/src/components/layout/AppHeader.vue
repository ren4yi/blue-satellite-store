<template>
  <header class="app-header">
    <nav class="header-nav">
      <ul>
        <li
          class="nav-link"
          :class="{ active: filtroAtivo === '' }"
          @click="$emit('filtrar', '')"
        >Todos</li>

        <li class="nav-select">
          <select @change="$emit('ordenar', $event.target.value)" aria-label="Ordenar por">
            <option value="">Ordenar por</option>
            <option value="preco-asc">Menor preço</option>
            <option value="preco-desc">Maior preço</option>
            <option value="recente">Lançamentos recentes</option>
          </select>
        </li>

        <li class="nav-select">
          <select @change="$emit('filtrarGenero', $event.target.value)" aria-label="Categoria">
            <option value="">Categoria</option>
            <option v-for="genero in generos" :key="genero" :value="genero">{{ genero }}</option>
          </select>
        </li>

        <li class="nav-search">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Buscar produto"
            :value="busca"
            @input="$emit('buscar', $event.target.value)"
          />
        </li>

        <li
          class="nav-link"
          :class="{ active: filtroAtivo === 'maisVendido' }"
          @click="$emit('filtrar', 'maisVendido')"
        >Mais Vendidos</li>

        <li
          class="nav-link"
          :class="{ active: filtroAtivo === 'favoritos' }"
          @click="$emit('filtrar', 'favoritos')"
        >
          Favoritos<span class="fav-count" v-if="totalFavoritos > 0">{{ totalFavoritos }}</span>
        </li>

        <li class="nav-cart" @click="$emit('toggleCarrinho')" aria-label="Carrinho">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span class="cart-badge" v-if="totalItens > 0">{{ totalItens }}</span>
        </li>
      </ul>
    </nav>


  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    totalItens: { type: Number, default: 0 },
    totalFavoritos: { type: Number, default: 0 },
    filtroAtivo: { type: String, default: '' },
    busca: { type: String, default: '' },
    generos: { type: Array, default: () => [] }
  },
  emits: ['toggleCarrinho', 'filtrar', 'filtrarGenero', 'buscar', 'ordenar']
}
</script>

<style scoped>
.app-header {
  width: 100%;
  display: flex;
  padding: 1.5rem 4%;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.logo-text {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.header-nav {
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
}

.header-nav ul {
  display: flex;
  align-items: center;
  gap: 20px;
  list-style-type: none;
  background-color: rgba(255, 255, 255, 0.087);
  padding: 16px 20px;
  border-radius: 12px;
  backdrop-filter: blur(8px);
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.header-nav ul li {
  display: flex;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.85);
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: #c9a8ff;
}

.fav-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  margin-left: 5px;
  background: #ec4899;
  color: #fff;
  border-radius: 8px;
  font-size: 0.62rem;
  font-weight: 700;
}

/* Selects de ordenação e categoria */
.nav-select select {
  font-family: 'Poppins', sans-serif;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.9);
  border: none;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 4px 18px 4px 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 12px;
  width: 100px;
}

.nav-select select option {
  background-color: #0d0a1f;
  color: rgba(255, 255, 255, 0.9);
}

/* Campo de busca */
.nav-search {
  gap: 8px;
}

.nav-search svg {
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.5);
}

.nav-search input {
  font-family: 'Poppins', sans-serif;
  background-color: rgba(255, 255, 255, 0.08);
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.9);
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 14px;
  width: 160px;
  transition: all .3s;
}

.nav-search input::placeholder { color: rgba(255, 255, 255, 0.5); }
.nav-search input:focus {
  background-color: rgba(255, 255, 255, 0.15);
  width: 190px;
}

/* Ícone de carrinho */
.nav-cart {
  position: relative;
  opacity: 0.9;
  transition: all .2s;
}

.nav-cart:hover {
  opacity: 1;
  transform: scale(1.1);
  color: #c9a8ff;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background: #ec4899;
  color: #fff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 0.62rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-us:hover { color: #c9a8ff; }

@media (max-width: 1100px) {
  .header-nav ul { gap: 12px; padding: 12px 16px; }
  .nav-select, .nav-search { display: none; }
}

@media (max-width: 700px) {
  .header-nav ul .nav-link:not(:first-child) { display: none; }
  .about-us { display: none; }
}
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
