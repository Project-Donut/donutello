<script setup>
import {ref, onMounted} from 'vue';
import UserInterface from './components/UserInterface.vue';
import ThreeScene from './scripts/three.js';
let model = ref(null);
let taste = ref('0xd19c0a');
let viewPort = ref(null);
const canvasSetup = () => {
    if(viewPort.value){
    model.value =  new ThreeScene(viewPort.value);
    model.value.sceneSetup();
    //model.value.loadIcing(taste);
    }
}
onMounted(()=>{
    
    canvasSetup();

});
</script>

<template>
  <span class="app">
   <div class="__header">
      <h1>Header</h1>
    </div>
    <div class="__userInterface">
      <UserInterface :model="model" />
    </div>
    <div  class="__viewPort" >
      <div class="viewPort" ref="viewPort"></div>
  </div>
</span>
</template>

<style scoped>
.viewPort{
  height: 100vh;
}
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
