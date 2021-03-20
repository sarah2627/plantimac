
import { NearestFilter, LinearMipMapLinearFilter, TextureLoader, MeshStandardMaterial, Vector3 } from 'three'

import Cube from './Cube'

export default class Leaf extends Cube {

  constructor(location = new Vector3(), rotation = new Vector3(), scale = new Vector3(1, 1, 1)) {
    const textureLoader = new TextureLoader()
    const texture0 = textureLoader.load(require('../../../assets/textures/leaves.png'))
    texture0.magFilter = NearestFilter
    texture0.minFilter = LinearMipMapLinearFilter
    let material = new MeshStandardMaterial( { map: texture0 } )

    super(location, rotation, scale, material);
  }
  
}