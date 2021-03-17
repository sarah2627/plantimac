import {
    Mesh,
    Color,
    CylinderGeometry,
    MeshStandardMaterial
} from 'three'

export default class Pot extends Mesh {
    constructor(style) {
      const stylePot = style
      var radiusT
      var radiusB

      if (stylePot == "pot1") {
        radiusT = 3
        radiusB = 2
      } else if (stylePot == "pot2") {
        radiusT = 1
        radiusB = 1
      } else {
        radiusT = 4
        radiusB = 1
      }
      var cylinderGeometry = new CylinderGeometry(radiusT, radiusB, 2, 10)
      const material = new MeshStandardMaterial( { color: '#da5454' } )
      super(cylinderGeometry, material)
    }

    changeColor(value) {
        this.material.color.set(new Color(value))
    }
}