<script setup>
import {ref} from 'vue';
import ViewPort from './components/ViewPort.vue';
import UserInterface from './components/UserInterface.vue';

</script>

<template>
  <span class="app">
   <div class="__header">
      <h1>Header</h1>
    </div>
    <div class="__userInterface">
      <UserInterface />
    </div>
    <div  class="__viewPort" >
      <ViewPort />
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
      
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      grid-area: ui;
      background-color: aquamarine;
    }
   .__viewPort{
      grid-area: viewport;
      background-color: #FF4C8E;
      height: 100vh;
    }
</style>
