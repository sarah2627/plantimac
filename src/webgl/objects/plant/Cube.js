
import { BoxGeometry, Mesh, Vector3 } from 'three'

export default class Cube extends Mesh {

  constructor(location = new Vector3(), rotation = new Vector3(), scale = new Vector3(1, 1, 1), material) {
    const geometry = new BoxGeometry(scale.x, scale.y, scale.z);
    geometry.translate(0, -(scale.y/2), 0)

    /* const material = new MeshBasicMaterial( { color: color, wireframe: false } ); */
    super(geometry, material);
    
    this.position.set(location.x, location.y, location.z)
    this.rotation.set(rotation.x, rotation.y, rotation.z);
  }

}