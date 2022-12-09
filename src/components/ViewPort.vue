<script setup>
import { onMounted,ref, render, toHandlerKey,defineProps } from 'vue';
import ThreeScene from '../scripts/three.js';
const viewPort = ref(null);
const props = defineProps(['model'])
let taste = ref('0xd19c0a');
const canvasSetup = () => {
    if(viewPort.value){
    const model =  new ThreeScene(viewPort.value);
    model.sceneSetup();
    model.loadIcing(taste);
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
