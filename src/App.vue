<script setup>

</script>

<template>
  <span class="app">
   <div class="__header">
      <h1>Header</h1>
    </div>
    <div class="__userInterface">
      <h1>User Interface</h1>
    </div>
    <div :ref="canvas" class="__viewPort" >
      <h1>Canvas</h1>
  </div>
</span>
</template>

<style scoped>
.app{
    display: grid;
    grid-template-columns: 4fr 8fr;
    grid-template-rows: 200px 1fr;
    grid-template-areas: 
    "header viewport"
    "ui viewport";
}
    .__header{
      grid-area: header;
      background-color: blanchedalmond;
    }
    .__uiserInterface{
      grid-area: ui;
      background-color: aquamarine;
    }
   .__viewPort{
      grid-area: viewport;
      background-color: red;
      height: 100vh;
    }
</style>
