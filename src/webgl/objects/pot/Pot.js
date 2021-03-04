import {
    Mesh,
    Color,
    CylinderGeometry,
    MeshBasicMaterial
} from 'three'
import Webgl from '../../Webgl'

//var webgl = new Webgl()

export default class Pot extends Mesh {
    constructor(style) {
      const stylePot = style
      var radiusT
      var radiusB

      if (stylePot == "pot-1") {
        radiusT = 6
        radiusB = 4
      } else if (stylePot == "pot-2") {
        radiusT = 2
        radiusB = 2
      } else {
        radiusT = 6
        radiusB = 2
      }
      var cylinderGeometry = new CylinderGeometry(radiusT, radiusB, 5, 8)
      const material = new MeshBasicMaterial( { color: 0x000000 } )
      super(cylinderGeometry, material)
    }
    changeColor(value) {
        this.material.color.set(new Color(value))
    }
    changeStyle(style) {
      if(this.stylePot != style) {
        //this.delete()
        webgl.addPot(style)
      }
    }
}