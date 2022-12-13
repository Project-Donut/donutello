import * as THREE from "three";
//import orbit controls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createDonut, createLights } from "../js/threeMeshes";
const textureLoader = new THREE.TextureLoader();

export default class ThreeScene {
    constructor(viewPort) {
        this.isMobile = window.innerWidth < 768;
        this.view = viewPort;
        this.scene;
        this.camera;
        this.renderer;
        this.isLoaded = false;
        this.labelMaterial;
    }

    sceneSetup() {
        this.scene = new THREE.Scene();
        let width = this.view.offsetWidth;
        let height = this.view.offsetHeight;
        if (this.isMobile) {
            height = this.view.offsetWidth;
        }
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );
        this.camera.position.z = 5;
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);

        this.view.appendChild(this.renderer.domElement);
        this.renderer.setClearColor(0x000000, 0);
        this.render();
        this.orbitSetup();
        this.lightsSetup();
        this.loadDonut();
        this.animate();
    }

    /**
     * @param {THREE.} gltf
     */
    loadDonut() {
        createDonut((donut, filling, icing, sprinkles, crumble, flakes, labelMaterial) => {
            this.filling = filling;
            this.icing = icing;
            this.sprinkles = sprinkles;
            this.crumble = crumble;
            this.flakes = flakes;
            this.scene.add(donut);
            this.labelMaterial = labelMaterial;

            this.loaded = true;
        });
    }

    loadIcing(flavour) {
        this.icing.material.color.setHex(flavour);
    }
    loadFilling(flavour) {
        this.filling.material.color.setHex(flavour);
    }
    loadSprinkles(flavour) {
        this.sprinkles.material.color.setHex(flavour);
    }
    loadTopping(flavour) {
        this.sprinkles.material.color.setHex(flavour);
        this.flakes.material.color.setHex(flavour);
    }
    loadCrumble(flavour) {
        this.crumble.material.color.setHex(flavour);
    }
    loadImage(image) {
        this.labelMaterial.map = textureLoader.load(image);
        this.labelMaterial.needsUpdate = true;
    }
    orbitSetup() {
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        this.controls.autoRotate = true;
    }
    animate = () => {
        requestAnimationFrame(this.animate);
        this.controls.update();
        this.render();
    };

    lightsSetup() {
        const lights = createLights();
        this.scene.add(lights);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
