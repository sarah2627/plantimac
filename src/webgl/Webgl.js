import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, SpotLight, Vector3, Geometry, TextureLoader, PointsMaterial, Points } from 'three'
import { OrbitControls } from './controls/OrbitControls'
// import { webglGuiFolder } from '../utils/gui'

import { Sky } from './objects/sky/Sky'
// import SkySphere from './objects/skySphere/SkySphere'
// import MagicalObject from './objects/MagicalObject'
import Plant from './objects/plant/Plant'
import Rain from './objects/rain/Rain'

let sky, sun

export default class Webgl {

  constructor() {
    /* Variables */
    this.last = 0
    this.inclination = 0.5

    /* Functions & events */
    this.onResize = this.onResize.bind(this)
    window.addEventListener('resize', this.onResize)

    /* Scene & camera */
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 5
    this.renderer = new WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight )

    // where the canva will be display
    const canvas = document.querySelector('.canvas')
    canvas.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    /* Lights */
    this.light = new AmbientLight(0x404040, 2) // soft white light
    this.scene.add(this.light)
    this.spotlight = new SpotLight(0xffffff)
    this.spotlight.position.set(10, 10, -10)
    this.scene.add(this.spotlight)

    /* Skysphere */
    // this.sky = new SkySphere({
    //   colorUp: 0x7ee5fc,
    //   colorDown: 0x1844d7
    // })
    // this.scene.add( this.sky );

    /* Sun and sky */
    sky = new Sky()
    sky.scale.setScalar(450000)
    this.scene.add(sky)

    sun = new Vector3()

    /* Plant */
    this.plant = new Plant(this.scene)
    
    /* Gui */
    this.setGui()

    /* Start animation */
    this.start = this.start.bind(this)
  }

  /// GUI
  updateSky(renderer, scene, camera, inclination) {

    const effectController = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      inclination: 0.5, // elevation / inclination
      azimuth: 0.25, // Facing front,
      exposure: renderer.toneMappingExposure
    }

    effectController.inclination = inclination;

    const uniforms = sky.material.uniforms
    uniforms["turbidity"].value = effectController.turbidity
    uniforms["rayleigh"].value = effectController.rayleigh
    uniforms["mieCoefficient"].value = effectController.mieCoefficient
    uniforms["mieDirectionalG"].value = effectController.mieDirectionalG

    const theta = Math.PI * (effectController.inclination - 0.5)
    const phi = 2 * Math.PI * (effectController.azimuth - 0.5)

    sun.x = Math.cos(phi)
    sun.y = Math.sin(phi) * Math.sin(theta)
    sun.z = Math.sin(phi) * Math.cos(theta)

    uniforms["sunPosition"].value.copy(sun)

    renderer.toneMappingExposure = effectController.exposure
    renderer.render(scene, camera)
  }
  
  setGui() {
    /* this.cube.setGui(webglGuiFolder) */
  }
  
  /* Rain */
  rain(booleanRain) {
    this.rains = new Rain(this.scene, booleanRain)
  }

  /* Sun and sky */
  sky(booleanInclination) {
    this.inclination = booleanInclination
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
  }

  start(time) {
    
    if(time - this.last >= 100) {
      this.last = time
      this.plant.update()
    }
    this.controls.update()

    if(this.rains) {
      this.rains.update()
    }
    
    this.updateSky(this.renderer, this.scene, this.camera, this.inclination)

    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.start)
  }
}
