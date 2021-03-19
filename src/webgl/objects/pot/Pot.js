import { Mesh, Color, CylinderGeometry, MeshStandardMaterial } from 'three'

export default class Pot extends Mesh {
  
    constructor(stylePot) {
      const radius = []
      if (stylePot === 'pot1') {
        radius[0] = 3
        radius[1] = 2
      } else if (stylePot === 'pot2') {
        radius[0] = 1
        radius[1] = 1
      } else if (stylePot === 'pot2') {
        radius[0] = 4
        radius[1] = 1
      }
      const cylinderGeometry = new CylinderGeometry(radius[0], radius[1], 2, 10)
      const material = new MeshStandardMaterial( { color: '#da5454' } )
      super(cylinderGeometry, material)
    }

    getStyle(stylePot) {
      const radius = []
      if (stylePot === 'pot1') {
        radius[0] = 3
        radius[1] = 2
      } else if (stylePot === 'pot2') {
        radius[0] = 1
        radius[1] = 1
      } else if (stylePot === 'pot3') {
        radius[0] = 4
        radius[1] = 1
      }
      return radius
    }

    changeColor(color) {
        this.material.color.set(new Color(color))
    }

    changeStyle(stylePot) {
      const radius = this.getStyle(stylePot)
      this.geometry.dispose()
      this.geometry = new CylinderGeometry(radius[0], radius[1], 2, 10)
  }
}