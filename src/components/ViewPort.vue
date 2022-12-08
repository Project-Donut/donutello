<script setup>
import { onMounted,ref, render, toHandlerKey } from 'vue';
import ThreeScene from '../scripts/three.js';
const viewPort = ref(null);
const canvasSetup = () => {
    if(viewPort.value){
    const model =  new ThreeScene(viewPort.value);
    model.sceneSetup();
    }
}


onMounted(()=>{
    
    canvasSetup();

});



</script>

<template>
    <div class="viewPort" ref="viewPort"></div>

</template>

<style scoped>
div{
    height: 100vh;
}
h1{
    background-color: red;
}
</style>
