import Cube from './Cube'
import { Vector3, Euler, Quaternion } from 'three'

export default class LSystem {

  constructor(scene) {
    this.scene = scene
    this.plant = []
    let word = this.createWordLSystem("X", {'FFL' : 'FF', 'X' : 'F+F[[X]-X]-F[-FXL]+X'})
    /*let word = this.createWordLSystem("FFL", {'F' : 'F'})*/
    this.createShape(word, 25*Math.PI/180)
  }

  /**
   * Create word with L-System
   */
  createWordLSystem(axiom, rules, iterations = 3) {
    for (let i = 0; i < iterations; i++){
      let translation = ''
      for (let c of axiom) {
        c in rules ? translation += rules[c] : translation += c
      }
      axiom = translation
    }
    console.log(axiom)
    return axiom
  }

  /**
   * Create shape with a word (L-System)
   */
  createShape(word, alpha) {
    let position_saves = []
    let location = new Vector3(0, 0, 0)
    let rotation = new Euler(0, 0, 0, 'XYZ')

    for (let letter of word) {
      if(letter == 'F' || letter == 'L') {
        if(letter == 'F') {
          let direction = new Vector3(0, 1, 0)
          direction.applyEuler(rotation)
          location.add(direction)
          /*this.createBranch(location, rotation)*/
          this.plant.push({type: 0, location: location.clone(), rotation: rotation.clone()});
        } 
        if(letter == 'L') {
          let direction = new Vector3(0, 0.5, 0)
          direction.applyEuler(rotation)
          location.add(direction)
          /* this.createLeaf(location, rotation) */
          this.plant.push({type: 1, location: location.clone(), rotation: rotation.clone()});
        } 
      } else if (letter == 'L') {
        let direction = new Vector3(0, 1, 0)
        direction.applyEuler(rotation)
        location.add(direction)
        this.createLeaf(location, rotation)
      } else if(letter == '+' || letter == '-' || letter == '&' || letter == '^' || letter == '>' || letter == '<' || letter == '|') {
          rotation.x += this.getRandomArbitrary(-0.1, 0.1);
          rotation.y += this.getRandomArbitrary(0, 1);
          rotation.z += this.getRandomArbitrary(-0.1, 0.1);

        if (letter == '+') {
          rotation.z += alpha
        } else if(letter == '-') {
          rotation.z -= alpha
        } else if(letter == '&') {
          rotation.y += alpha
        } else if(letter == '^') {
          rotation.y -= alpha
        } else if(letter == '>') {
          rotation.x += alpha
        } else if(letter == '<') {
          rotation.x -= alpha
        } else if(letter == '|') {
          rotation.x += math.pi
        }
      } else if(letter == '[') {
        position_saves.push([location.clone(), rotation.clone()]);
      } else if(letter == ']') {
        let last_position_save = position_saves.pop()
        location = last_position_save[0]
        rotation = last_position_save[1]
      }
    }
    console.log(this.plant);
  }

  createBranch(location, rotation) {
    const cube = new Cube(location, rotation, new Vector3(0.2, 1, 0.2))
    this.scene.add(cube)
  }

  createLeaf(location, rotation) {
    const cube = new Cube(location, rotation, new Vector3(0.5, 0.5, 0.5))
    this.scene.add(cube)
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  drawPartPlant(partPlant) {
    if(partPlant.type == 0) {
      this.createBranch(partPlant.location, partPlant.rotation)
    } else if(partPlant.type == 1) {
      this.createLeaf(partPlant.location, partPlant.rotation)
    }
  }

  update() {
    if(this.plant.length) {
      console.log(this.plant)
      this.drawPartPlant(this.plant.shift())
    }
    
  }

}