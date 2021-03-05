import { Vector3, Geometry, TextureLoader, PointsMaterial, Points } from 'three'

export default class Rain {

  constructor(scene) {
    this.scene = scene;
    this.rainGeometry = new Geometry()
    for (let i = 0; i < 6000; i++) {
      let drop = new Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      )
      drop.velocity = 0.3
      drop.acceleration = 0.02
      this.rainGeometry.vertices.push(drop)
    }
    const sprite = new TextureLoader().load('../../../../src/assets/images/water-drop.svg')
    const rainMaterial = new PointsMaterial({
      size: 0.6,
      transparent: true,
      map: sprite
    })

    this.rainObject = new Points(this.rainGeometry, rainMaterial)
  }

  /**
   * Update rain : rain falls
   */
  update() {
    this.rainGeometry.vertices.forEach(p => {
      p.velocity += p.acceleration
      p.y -= p.velocity
      if (p.y < -275) {
        p.y = 275
        p.velocity = 0
      }
    })
    this.rainGeometry.verticesNeedUpdate = true
  }
}