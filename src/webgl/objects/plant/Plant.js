import { Vector3 } from 'three'

import LSystem from './LSystem'
import Branch from './Branch'
import Leaf from './Leaf'

export default class Plant {

  constructor(scene, seed = 1) {
    this.scene = scene
    let lSystem = 0
    switch (seed) {
      case 2:
        lSystem = new LSystem("X", {'X' : 'F+F[[X]-XL]-F[-FXL]+XL'}, 10*Math.PI/180, 3)
        break;
      case 3:
        lSystem = new LSystem("X", {'FFL' : 'FF', 'X' : 'F+F[[XL]-X]-F[-FXL]+X'}, 25*Math.PI/180, 3)
        break;
      default:
        lSystem = new LSystem("X", {'X' : 'F+F[[XLL]-XL]-FLL[-XLL]+X'}, 30*Math.PI/180, 3)
    }
    this.plant = lSystem.shape
    this.partPlant = 0
    this.sizeBar = 0
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

  /**
   * Update plant : draw a part if not maximum growth and update barGrowth
   */
  update() {
    if(this.plant.length && this.partPlant<this.plant.length) {
      this.drawPartPlant(this.plant[this.partPlant])
      this.partPlant++
      const barGrowth = document.getElementById("barGrowth").children[0]
      this.sizeBar = 100*this.partPlant/this.plant.length
      barGrowth.style.width = this.sizeBar + "%";
    }
  }
}
