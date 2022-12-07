<script setup>
import { onMounted,ref, render } from 'vue';
import model from '../scripts/three.js';


onMounted(()=>{
    
    const viewPort = ref(model);
    
    //import donut glb
    //let donut;
    //const loader = new GLTFLoader();
    //loader.load('/bignut.glb', (gltf) => {
    //    donut = gltf.scene;
      //  donut.scale.set(40,40,40);
       // scene.add(donut);
    //});
    
});



</script>

<template>
  <canvas ref="viewPort"> 
  </canvas>
  <h1>test</h1>
</template>

<style scoped>
h1{
    background-color: red;
}
</style>
