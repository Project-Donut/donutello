import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

export const createCard = () => {
    const backGeometry = new THREE.BoxGeometry(0.03, 0.001, 0.03);
    const cardGeometry = new THREE.BoxGeometry(0.025, 0.001, 0.025);
    const imagePlane = new THREE.PlaneGeometry(0.022, 0.022);

    const backMaterial = new THREE.MeshLambertMaterial({
        color: 0xf1e856,
    });
    const cardMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
    });
    const imageTexture = textureLoader.load("/mini_logo.webp");
    const imageMaterial = new THREE.MeshLambertMaterial({
        map: imageTexture,
        transparent: true,
    });

    const backMesh = new THREE.Mesh(backGeometry, backMaterial);
    const cardMesh = new THREE.Mesh(cardGeometry, cardMaterial);
    const imageMesh = new THREE.Mesh(imagePlane, imageMaterial);

    //rotate Image Mesh rotate 90 degrees
    imageMesh.rotation.x = -Math.PI / 2;
    imageMesh.position.set(0, 0.002, 0);
    cardMesh.position.set(0, 0.001, 0);

    // Three.js group meshes
    const label = new THREE.Group();
    label.add(backMesh);
    label.add(imageMesh);
    label.add(cardMesh);

    return label;
};

export const createDonut = (callback = () => null) => {
    gltfLoader.load("/bignut.glb", (gltf) => {
        let donut = gltf.scene;
        donut.scale.set(40, 40, 40);
        donut.rotation.y = Math.PI / -1.7;

        // fix donut texture scaling
        let donutTexture = donut.children[0].children[1].material;
        donutTexture.map.repeat.set(1, 5);


        let filling = donut.getObjectByName("filling");
        let icing = donut.getObjectByName("Icing001");
        let sprinkles = donut.getObjectByName("sprinkles");
        let crumble = donut.getObjectByName("crumble");
        let flakes = donut.getObjectByName("flakes");

        crumble.visible = false;
        flakes.visible = false;
        sprinkles.visible = true;

        // Load card on donut
        const card = createCard();
        card.position.set(-0.005, 0.021, 0.025);
        card.rotation.x = Math.PI / 0.51;
        card.rotation.y = Math.PI / 1.08;
        donut.add(card);

        let labelMaterial = card.children[1].material;

        callback(...[donut, filling, icing, sprinkles, crumble, flakes, labelMaterial]);
    });
}; 

export const createLights = () => {
    const lightGroup = new THREE.Group();
    
    const ambientLight = new THREE.AmbientLight(0xddccff, 0.5);

    const spotlightMain = new THREE.SpotLight(0xffffff, 1.2);
    spotlightMain.position.set(5, 4, -10);
    spotlightMain.castShadow = true;
    spotlightMain.shadow.mapSize.width = 1024;
    spotlightMain.shadow.mapSize.height = 1024;
    spotlightMain.shadow.camera.near = 500;
    spotlightMain.shadow.camera.far = 4000;
    spotlightMain.shadow.camera.fov = 30;

    const spotlight2 = new THREE.SpotLight(0xffffff, 0.8);
    spotlight2.position.set(-5, 4, 10);
    spotlight2.castShadow = true;
    spotlight2.shadow.mapSize.width = 1024;
    spotlight2.shadow.mapSize.height = 1024;
    spotlight2.shadow.camera.near = 500;
    spotlight2.shadow.camera.far = 4000;
    spotlight2.shadow.camera.fov = 30;

    // add lights to group
    lightGroup.add(ambientLight);
    lightGroup.add(spotlightMain);
    lightGroup.add(spotlight2);

    return lightGroup;
}