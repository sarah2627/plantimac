import { Vector3, AmbientLight, SpotLight } from 'three'

import Sky from './Sky'

export default class Background {

  constructor(scene, renderer, camera) {

    // Add Sky
    this.sky = new Sky();
    this.sky.scale.setScalar( 450000 );
    scene.add( this.sky );

    // Add sun
    this.sun = new Vector3();

    // Parameters sky
    const effectController = {
      turbidity: 0.15,
      rayleigh: 0.1,
      mieCoefficient: 0.01,
      mieDirectionalG: 0.95,
      inclination: 0.3, // elevation / inclination
      azimuth: 0.35, // Facing front,
      exposure: renderer.toneMappingExposure
    }
    const uniforms = this.sky.material.uniforms
    uniforms["turbidity"].value = effectController.turbidity
    uniforms["rayleigh"].value = effectController.rayleigh
    uniforms["mieCoefficient"].value = effectController.mieCoefficient
    uniforms["mieDirectionalG"].value = effectController.mieDirectionalG
    const theta = Math.PI * (effectController.inclination - 0.5)
    const phi = 2 * Math.PI * (effectController.azimuth - 0.5)

    // Parameters sun
    this.sun.x = Math.cos(phi)
    this.sun.y = Math.sin(phi) * Math.sin(theta)
    this.sun.z = Math.sin(phi) * Math.cos(theta)
    uniforms["sunPosition"].value.copy(this.sun)

    renderer.toneMappingExposure = effectController.exposure
    renderer.render(scene, camera)

    // Lights
    this.light = new AmbientLight(0x404040, 2) // soft white light
    scene.add(this.light)
    this.spotlight = new SpotLight(0xffffff, 0.8)
    this.spotlight.position.set(2, 10, -10)
    scene.add(this.spotlight)
  }

  /**
   * Switch to the night
   */
  putTheNight() {
    this.sky.material.uniforms["turbidity"].value = 0.0005
    this.sky.material.uniforms["rayleigh"].value = 0.003
    this.light.intensity = 0.5
    this.spotlight.intensity = 0.2
  }

  /**
   * Switch to the day
   */
  putTheDay() {
    this.sky.material.uniforms["turbidity"].value = 0.15
    this.sky.material.uniforms["rayleigh"].value = 0.1
    this.light.intensity = 2
    this.spotlight.intensity = 0.8
  }

}