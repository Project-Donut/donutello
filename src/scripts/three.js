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
  }

  sceneSetup() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.view.offsetWidth / this.view.offsetHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.view.offsetWidth, this.view.offsetHeight);
    console.log(this.view);
    this.view.appendChild(this.renderer.domElement);
    this.renderer.setClearColor(0x000000, 0)

    this.render();
    this.orbitSetup();
    this.lightsSetup();
    this.modelSetup();
    this.animate();
  }
  modelSetup() {
        //import donut glb
        let donut;
        const loader = new GLTFLoader();
        loader.load('/bignut.glb', (gltf) => {
            donut = gltf.scene;
            donut.scale.set(40,40,40);
            donut.rotation.y = Math.PI / -1.7;
            this.scene.add(donut);
            donut.traverse((child) => {
                if (child.isMesh) {
                    const dough = donut.getObjectByName('Torus');
                    const donutBite = donut.getObjectByName('Torus_1');
                    const filling = donut.getObjectByName('filling');
                    const icing = donut.getObjectByName('Torus002');
                    const sprinkles = donut.getObjectByName('Torus002_1');
                }
            });
        });
        


  }
  orbitSetup() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        this.controls.autoRotate = true;
    }
animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.render();
  }
  

  lightsSetup() {
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.6 );
	this.scene.add( ambientLight );
    //add spotlight to donut
    const spotLight = new THREE.SpotLight( 0xffffff, 0.8 );
    spotLight.position.set( 5, 4, -10 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    this.scene.add( spotLight );
    //extra spotlight
    const spotLight2 = new THREE.SpotLight( 0xffffff, 0.5 );
    spotLight2.position.set( -5, 4, 10 );
    spotLight2.castShadow = true;
    spotLight2.shadow.mapSize.width = 1024;
    spotLight2.shadow.mapSize.height = 1024;
    spotLight2.shadow.camera.near = 500;
    spotLight2.shadow.camera.far = 4000;
    spotLight2.shadow.camera.fov = 30;
    this.scene.add( spotLight2 );



  }

  render() {
    this.renderer.render(this.scene, this.camera);
    
  }
}
