import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, SpotLight, Vector3, Geometry, TextureLoader, PointsMaterial, Points } from 'three'
import { OrbitControls } from './controls/OrbitControls'
// import { webglGuiFolder } from '../utils/gui'

import Sky from './objects/sky/Sky'
// import SkySphere from './objects/skySphere/SkySphere'
// import MagicalObject from './objects/MagicalObject'
import Plant from './objects/plant/Plant'
import Rain from './objects/rain/Rain'

export default class Webgl {
  constructor() {
    /* Variables */
    this.last = 0

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
    this.sky = new Sky({
      turbidity: 10,
      rayleigh: 2,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      sunPosition: new Vector3(),
      up: new Vector3(0, 1, 0),
      inclination: 0.5,
      azimuth: 0.25
    });
    this.sky.scale.setScalar(450000)
    this.scene.add(this.sky)

    /* Plant */
    this.plant = new Plant(this.scene)
    
    /* Gui */
    this.setGui()

    /* Start animation */
    this.start = this.start.bind(this)
  }
  
  setGui() {
    /* this.cube.setGui(webglGuiFolder) */
  }
  
  /* Rain */
  rain(booleanRain) {
    this.rains = new Rain(this.scene, booleanRain)
  }

  onResize () {
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
    
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.start)
  }
}
