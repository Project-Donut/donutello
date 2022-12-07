import * as THREE from 'three'
//import orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import gltf loader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class ThreeScene {
  constructor(viewPort) {
    this.view = viewPort;
    this.scene;
    this.camera;
    this.renderer;
    this.loader;
  }

  sceneSetup() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.view.offsetWidth / this.view.offsetHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.view.offsetWidth, this.view.offsetHeight);
    this.view.appendChild(this.renderer.domElement);
  }
  modelSetup() {
        //import donut glb
        let donut;
        const loader = new GLTFLoader();
        loader.load('/bignut.glb', (gltf) => {
            donut = gltf.scene;
            donut.scale.set(40,40,40);
            this.scene.add(donut);
        });
  }
animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }
  lightsSetup() {
    const light = new THREE.AmbientLight(0x404040); // soft white light
    this.scene.add(light);
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
