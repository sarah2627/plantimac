import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, SpotLight, Vector3, Geometry, TextureLoader, PointsMaterial, Points, sRGBEncoding, ACESFilmicToneMapping } from 'three'
import { OrbitControls } from './controls/OrbitControls'
// import { webglGuiFolder } from '../utils/gui'

import Background from './objects/background/Background'
// import MagicalObject from './objects/MagicalObject'
import Plant from './objects/plant/Plant'
import Rain from './objects/rain/Rain'
import Pot from './objects/pot/Pot'
import Game from './game/Game'

let sky, sun

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
    this.camera.position.z = 10
    this.renderer = new WebGLRenderer()
    this.renderer.setPixelRatio( window.devicePixelRatio )
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    this.renderer.outputEncoding = sRGBEncoding;
		this.renderer.toneMapping = ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 0.5;

    // where the canva will be display
    const canvas = document.querySelector('.canvas')
    canvas.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 5, 0);
    this.controls.update();  

    /* Lights */
    this.light = new AmbientLight(0x404040, 2) // soft white light
    this.scene.add(this.light)
    this.spotlight = new SpotLight(0xffffff, 0.8)
    this.spotlight.position.set(2, 10, -10)
    this.scene.add(this.spotlight)

    /* Background (with Sky) */
    this.background = new Background(this.scene, this.renderer, this.camera)

    /* Plant */
    this.plant = new Plant(this.scene)

    /* Rain */
    this.rains = new Rain(this.scene)
    
    /* Game */
    this.game = new Game(this.scene, this.plant, this.rains)
    
    /* Gui */
    this.setGui()

    /* Start animation */
    this.start = this.start.bind(this)
    
    /* Plant pot */
    this.style = "pot-1"
    this.addPot(this.style)

    /* Gui */
    this.setGui();
  }

  setGui() {
    /* this.cube.setGui(webglGuiFolder) */
  }
  
  /* Sun and sky */
  sky() {
    this.background.toggleBackground()
    this.light.intensity = 0.5
    this.spotlight.intensity = 0.2
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
  }

  start(time) {
    
    if(time - this.last >= 5000) {
      this.last = time
      this.game.updatePlant()
    }

    /* Movement in the scene */
    this.controls.update()

    this.game.updateRain()

    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.start)
  }
}
