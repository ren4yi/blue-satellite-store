<template>
  <section class="section1">
    <h2>Blue Satellite</h2>

    <div class="divPrincipal">
      <h1>Observe. Fotografe. Explore.</h1>

      <p>
        Instrumentos ópticos, projetores e câmeras para a contemplação e o registro do céu noturno
      </p>
   </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>

<style scoped>

.section1 {
  width: 100vw;
  min-height: 100vh;
  height: 100vh;

  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;

  background-image: url('/orion.JPEG');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 12.5vw;
  color: rgb(163, 160, 160);
  mix-blend-mode: color-dodge;
  margin-bottom: -20px;
}

h1 {
  color: rgb(163, 160, 160);
  mix-blend-mode: color-dodge;
  margin-top: -20px;
}

.divPrincipal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
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
