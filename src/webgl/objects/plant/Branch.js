
import { NearestFilter, LinearMipMapLinearFilter, TextureLoader, MeshStandardMaterial, Vector3 } from 'three'

import Cube from './Cube'

export default class Branch extends Cube {

  constructor(location = new Vector3(), rotation = new Vector3(), scale = new Vector3(1, 1, 1)) {
    const textureLoader = new TextureLoader();
    const texture0 = textureLoader.load(require("../../../assets/textures/log_oak.png"))
    const texture1 = textureLoader.load(require("../../../assets/textures/log_oak_top.png"))
    texture0.magFilter = NearestFilter;
    texture0.minFilter = LinearMipMapLinearFilter;
    texture1.magFilter = NearestFilter;
    texture1.minFilter = LinearMipMapLinearFilter;
    var material = [
      new MeshStandardMaterial( { map: texture0 } ),
      new MeshStandardMaterial( { map: texture0 } ),
      new MeshStandardMaterial( { map: texture1 } ),
      new MeshStandardMaterial( { map: texture1 } ),
      new MeshStandardMaterial( { map: texture0 } ),
      new MeshStandardMaterial( { map: texture0 } )
    ]

    super(location, rotation, scale, material);
  }
  
}