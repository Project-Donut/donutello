<script setup>


const viewPort = ref(null);
const renderScene = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    viewPort.value.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    const animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    };
    animate();
}

onMounted(()=>{
    
    renderScene();
    
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
