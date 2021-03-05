import { Vector3, Geometry, TextureLoader, PointsMaterial, Points } from 'three'

let rainGeo, rain;

export default class Rain {

  constructor(scene) {
    this.scene = scene;
    rainGeo = new Geometry()
    for (let i=0 ; i<6000 ; i++) {
        let drop = new Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        )
        drop.velocity = 0.3
        drop.acceleration = 0.02
        rainGeo.vertices.push(drop)
    }

    const sprite = new TextureLoader().load('../../../../src/assets/images/water-drop.svg')
    const rainMaterial = new PointsMaterial({
        size: 0.6,
        transparent: true,
        map: sprite
    })

    rain = new Points(rainGeo, rainMaterial)
  }

  getRain() {
    return rain
  }
  
  update() {
    rainGeo.vertices.forEach(p => {
        p.velocity += p.acceleration
        p.y -= p.velocity
    
        if (p.y < -275) {
          p.y = 275
          p.velocity = 0
        }
    })
    rainGeo.verticesNeedUpdate = true
  }
}