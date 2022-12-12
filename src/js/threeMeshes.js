import * as THREE from "three";
/**
 *
 * @param {THREE.Scene} scene
 */
const textureLoader = new THREE.TextureLoader();
export const createCard = () => {
    const cardGeometry = new THREE.BoxGeometry(0.025, 0.002, 0.025);
    const imagePlane = new THREE.PlaneGeometry(0.025, 0.025);

    const cardMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
    });
    const imageTexture = textureLoader.load("/mini_logo.webp");
    const imageMaterial = new THREE.MeshLambertMaterial({
        map: imageTexture,
        transparent: true,
    });

    const cardMesh = new THREE.Mesh(cardGeometry, cardMaterial);
    const imageMesh = new THREE.Mesh(imagePlane, imageMaterial);

    //rotate Image Mesh rotate 90 degrees
    imageMesh.rotation.x = -Math.PI / 2;
    imageMesh.position.set(0, 0.002, 0);

    // Three.js group meshes
    const label = new THREE.Group();
    label.add(imageMesh);
    label.add(cardMesh);

    return label;
};