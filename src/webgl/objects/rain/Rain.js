import { Vector3, Geometry, TextureLoader, PointsMaterial, Points } from 'three'

let rainGeo, rains;

export default class Rain {

  constructor(scene) {
    this.scene = scene;
    rainGeo = new Geometry()
    for (let i=0 ; i<6000 ; i++) {
        let rain = new Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        )
        rain.velocity = 0
        rain.acceleration = 0.02
        rainGeo.vertices.push(rain)
    }

    const sprite = new TextureLoader().load('../../../../src/assets/images/water-drop.png')
    const rainMaterial = new PointsMaterial({
        // color: 0xaaaaaa,
        size: 0.7,
        transparent: true,
        map: sprite
    })

    rains = new Points(rainGeo, rainMaterial)
  }
  getRains() {
    return rains
  }
  update() {
    rainGeo.vertices.forEach(p => {
        p.velocity += p.acceleration
        p.y -= p.velocity
    
        if (p.y < -200) {
        p.y = 200
        p.velocity = 0
        }
    })
    rainGeo.verticesNeedUpdate = true
  }
}