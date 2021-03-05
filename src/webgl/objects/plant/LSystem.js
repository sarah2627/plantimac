import { Vector3, Euler } from 'three'

import  { getRandomArbitrary } from '../../../utils/functions'

export default class LSystem {

  constructor(axiom, rules, alpha, iterations = 1) {
    this.word = this.createWordLSystem(axiom, rules, iterations)
    this.shape = this.createShape(this.word, alpha)
  }

  /**
   * Create word with L-System
   */
  createWordLSystem(axiom, rules, iterations = 1) {
    for (let i = 0; i < iterations; i++){
      let translation = ''
      for (let c of axiom) {
        c in rules ? translation += rules[c] : translation += c
      }
      axiom = translation
    }
    return axiom
  }

  /**
   * Create shape with a word (L-System)
   */
  createShape(word, alpha) {
    let shape = []
    let position_saves = []
    let location = new Vector3(0, 0, 0)
    let rotation = new Euler(0, 0, 0, 'XYZ')

    for (let letter of word) {
      if(letter == 'F' || letter == 'L') {
        if(letter == 'F') {
          let direction = new Vector3(0, 1, 0)
          direction.applyEuler(rotation)
          location.add(direction)
          shape.push({type: 0, location: location.clone(), rotation: rotation.clone()});
        } 
        if(letter == 'L') {
          let direction = new Vector3(0, 0.5, 0)
          direction.applyEuler(rotation)
          location.add(direction)
          shape.push({type: 1, location: location.clone(), rotation: rotation.clone()});
        } 
      } else if (letter == 'L') {
        let direction = new Vector3(0, 1, 0)
        direction.applyEuler(rotation)
        location.add(direction)
        this.createLeaf(location, rotation)
      } else if(letter == '+' || letter == '-' || letter == '&' || letter == '^' || letter == '>' || letter == '<' || letter == '|') {
          rotation.x += getRandomArbitrary(-0.05, 0.05);
          rotation.y += getRandomArbitrary(0, 1);
          rotation.z += getRandomArbitrary(-0.05, 0.05);

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
    return shape
  }

}