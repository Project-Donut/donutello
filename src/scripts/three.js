import * as THREE from 'three'
//import orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import gltf loader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class ThreeScene {
  constructor() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.loader = new GLTFLoader()
    this.camera.position.z = 5
    this.animate()
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
  
}
