
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three'

export default class MagicalObject extends Mesh {

  constructor() {
    const geometry = new BoxGeometry(2, 2, 2);
    const material = new MeshBasicMaterial( { color: 0xFF0080, wireframe: true } );
    super(geometry, material);
    
    this.position.x = 2
  }

  setGui(gui) {
    const params = {
      scale : 1,
      colors: {
        primary: '#FF0080'
      }
    }
    
    const magicalObjectFolder = gui.addFolder('MagicalObject');
    magicalObjectFolder.add(this.position, 'x').min(-10).max(10);
  
    magicalObjectFolder.add(params, 'scale').min(0).max(1).onChange((value) => {
      //this.cube.scale(value)
      this.scale.x = value
      this.scale.y = value
      this.scale.z = value
    })
    
    magicalObjectFolder.addColor(params.colors, 'primary').onChange((value) => {
      this.material.color = new Color(value)
    })
  }

  update() {
    this.rotation.x += 0.01;
    this.rotation.y += 0.01;
  }
}