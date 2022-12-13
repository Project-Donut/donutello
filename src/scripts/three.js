import * as THREE from "three";
//import orbit controls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createDonut, createLights } from "../js/threeMeshes";
const textureLoader = new THREE.TextureLoader();

export default class ThreeScene {
    constructor(viewPort) {
        this.donut;
        this.isMobile = window.innerWidth < 768;
        this.view = viewPort;
        this.scene;
        this.camera;
        this.renderer;
        this.isLoaded = false;
        this.labelMaterial;
        this.start = Date.now();
        this.time = 0;
    }

    sceneSetup() {
        this.scene = new THREE.Scene();
        let width = this.view.offsetWidth;
        let height = this.view.offsetHeight;
        if (this.isMobile) {
            height = this.view.offsetWidth;
            this.camera = new THREE.OrthographicCamera(
                width / -120,
                width / 120,
                height / 120,
                height / -120,
                1,
                1000
            );
        }   
        else {
            this.camera = new THREE.PerspectiveCamera(
                75,
                width / height,
                0.1,
                1000
            );
        }
        let distance = 4;
        if (this.isMobile) {
            distance = 3;
        }
        this.camera.position.z = distance;
        this.camera.position.y = 3;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);

        this.view.appendChild(this.renderer.domElement);
        this.renderer.setClearColor(0x000000, 0);
        //set camera to orthographic
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
            this.donut = donut;

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
        this.controls.enableZoom = false;
        this.controls.minPolarAngle = Math.PI / 6;
        this.controls.maxPolarAngle = Math.PI / 2.5;
        if (!this.isMobile) {
            this.controls.autoRotate = true;
        }
    }

    mobileHover() {
        if (this.loaded) {
            this.donut.rotation.x = this.oscillate(this.donut.rotation.x, 0.5, 0.0015);
            this.donut.rotation.y = this.oscillate(this.donut.rotation.y, 0.5, 0.0015);
        }
    }

    oscillate(value, speed, amplitude) {
        return value + Math.sin(this.time * speed / 1000) * amplitude;
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.time = Date.now() - this.start / 1000;
        this.controls.update();
        if (this.isMobile) {
            this.mobileHover();
        }
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
