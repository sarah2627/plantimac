import {
  Mesh,
  SphereBufferGeometry,
  RawShaderMaterial,
  BackSide,
  Color
} from 'three'

import fragmentShader from './shaders/skySphere.fs'
import vertexShader from './shaders/skySphere.vs'

/**
 * @class - Sky - Sphere with gradient from 2 colors
 * 
 * @typedef {Object} options
 * @property {hex} options.colorUp 
 * @property {hex} options.colorDown
 **/

export default class Sky extends Mesh {
  constructor(options) {
    let colors = {
      up: options.colorUp ? new Color(options.colorUp) : new Color(0x000000),
      down: options.colorDown ? new Color(options.colorDown) : new Color(0x000000)
    }

    let radius = options.radius ? options.radius : 10

    const geometry = new SphereBufferGeometry(radius, 32, 32)
    const material = new RawShaderMaterial({
      uniforms: {
        uColorUp: {
          value: colors.up
        },
        uColorDown: {
          value: colors.down
        }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: BackSide
    })

    super(geometry, material)

    this.colors = {
      up: colors.up.getHex(),
      down: colors.down.getHex()
    }
  }

  /**
   *
   * @param {Object GUI} gui
   */

  setGui(gui) {
    const GUI = gui.addFolder('SkySphere')

    GUI.addColor(this.colors, 'up').onChange((value) => {
      this.material.uniforms.uColorUp.value = new Color(value)
    })
    GUI.addColor(this.colors, 'down').onChange((value) => {
      this.material.uniforms.uColorDown.value = new Color(value)
    })
  }
}
