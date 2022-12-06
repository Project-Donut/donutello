<script setup>
import * as THREE from 'three'
//import orbit controls
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import gltf loader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { onMounted,ref } from 'vue';

const viewPort = ref(null);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
onMounted(()=>{
    const renderer = new THREE.WebGLRenderer({
        //render in canvas
        canvas: viewPort.value
    });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    //import donut glb
    let donut;
    const loader = new GLTFLoader();
    loader.load('/bignut.glb', (gltf) => {
        donut = gltf.scene;
        donut.scale.set(40,40,40);
        scene.add(donut);
    });
    
})



</script>

<template>
  <canvas ref="viewPort"> 
    
  </canvas>
  <h1>test</h1>
</template>

<style scoped>
body{
    background-color: red;
}
</style>
