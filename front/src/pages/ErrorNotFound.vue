<template>
  <div class="fullscreen bg-whit text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        <img height="300"  src="\public\logo.png" class="img-thumbnail" id="fotoimg" alt="">
        
      </div>

      <div class="text-h2 text-blue" style="opacity:.9">
        Pagina no encontrada
      </div>

      <q-btn
        class="q-mt-xl"
        color="black"
        text-color="blue"
        unelevated
        to="/"
        label="Ir a Inicio"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'ErrorNotFound'
});
</script>
