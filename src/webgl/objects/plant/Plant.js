import { Vector3 } from 'three'

import LSystem from './LSystem'
import Branch from './Branch'
import Leaf from './Leaf'

export default class Plant {

  constructor(scene) {
    this.scene = scene
    const lSystem = new LSystem("X", {'FFL' : 'FF', 'X' : 'F+F[[X]-X]-F[-FXL]+X'}, 25*Math.PI/180, 3)
    this.plant = lSystem.shape
    this.partPlant = 0
  }

  /**
   * Draw a part of the plant
   */
  drawPartPlant(partPlant) {
    if(partPlant.type == 0) {
      /* Create branch */
      const branch = new Branch(partPlant.location, partPlant.rotation, new Vector3(0.2, 1, 0.2))
      this.scene.add(branch)
    } else if(partPlant.type == 1) {
      /* Create leaf */
      const leaf = new Leaf(partPlant.location, partPlant.rotation, new Vector3(0.5, 0.5, 0.5))
      this.scene.add(leaf)
    }
  }

  update() {
    if(this.plant.length && this.partPlant<this.plant.length) {
      this.drawPartPlant(this.plant[this.partPlant])
      this.partPlant++
    }
  }

}