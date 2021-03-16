import { Scene, PerspectiveCamera, WebGLRenderer, sRGBEncoding, ACESFilmicToneMapping, AudioListener, Audio, AudioLoader } from 'three'
import { OrbitControls } from './controls/OrbitControls'
// import { webglGuiFolder } from '../utils/gui'

import Background from './objects/environment/Environment'
// import MagicalObject from './objects/MagicalObject'
import Plant from './objects/plant/Plant'
import Rain from './objects/rain/Rain'
import Sound from './objects/sound/Sound'
import Pot from './objects/pot/Pot'
import Game from './game/Game'

export default class Webgl {

  constructor(seed = 1) {
    /* Variables */
    this.lastTime1 = 0
    this.lastTime2 = 0

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

    /* Background (with Sky) */
    this.background = new Background(this.scene, this.renderer, this.camera)

    /* Plant */
    this.plant = new Plant(this.scene, seed)

    /* Rain */
    this.rain = new Rain(this.scene)

    /* Game */
    this.game = new Game(this.camera, this.scene, this.plant, this.rain, this.background)

    /* Start animation */
    this.start = this.start.bind(this)
    
    /* Plant pot */
    this.style = "pot-1"
    this.addPot(this.style)
  }

  addPot(style) {
    this.pot = new Pot(style)
    this.scene.add(this.pot);
  }

  changeStyle(style) {
    if(this.style != style) {
      /* destroy pot */
      this.pot.geometry = undefined
      this.pot.material = undefined
      this.scene.remove(this.pot)
      /* add new stylish pot */
      this.addPot(style)
      this.style = style
    }
  }
  
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
  }

  start(time) {
    if(time - this.lastTime1 >= 400) {
      this.lastTime1 = time
      this.game.updatePlant()
    }

    if(time - this.lastTime2 >= 200) {
      this.lastTime2 = time
      this.game.updatePointsPlant()
    }

    /* Animaton rain */
    this.game.updateRain()

    /* Movement in the scene */
    this.controls.update()

    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.start)
  }
}
