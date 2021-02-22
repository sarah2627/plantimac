import { Scene, PerspectiveCamera, WebGLRenderer, Color, AmbientLight, SpotLight, PlaneGeometry, MeshBasicMaterial, DoubleSide, Mesh, Vector3 } from 'three'
import { OrbitControls } from './controls/OrbitControls'
import { webglGuiFolder } from '../utils/gui'

import { Sky } from './objects/sky/Sky';

let sky, sun;

// import SkySphere from './objects/skySphere/SkySphere'
import MagicalObject from './objects/MagicalObject'

export default class Webgl {
  constructor() {
    /* Variables */
    this.time = 0

    /* Functions & events */
    this.start = this.start.bind(this)
    this.onResize = this.onResize.bind(this)
    window.addEventListener('resize', this.onResize);

    /* Scene & camera */
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 5;
    this.renderer = new WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    // where the canva will be display
    const canvas = document.querySelector('.canvas');
    canvas.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    /* Lights */
    this.light = new AmbientLight(0x404040, 2); // soft white light
    this.scene.add(this.light);
    this.spotlight = new SpotLight(0xffffff);
    this.spotlight.position.set(10, 10, -10)
    this.scene.add(this.spotlight);

    /* Skysphere */
    // this.sky = new SkySphere({
    //   colorUp: 0x7ee5fc,
    //   colorDown: 0x1844d7
    // })
    // this.scene.add( this.sky );

    /* Sun and sky */
    // sun = new Vector3();

    sky = new Sky({
      turbidity: 10,
      rayleigh: 2,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      sunPosition: new Vector3(),
      up: new Vector3(0, 1, 0),
      inclination: 0.5,
      azimuth: 0.25
    });
    sky.scale.setScalar(450000);
    this.scene.add(sky);
    console.log(sky);
    sky.setInclination;
  
    /* Plant */
    this.cube = new MagicalObject()
    this.scene.add(this.cube);

    /* Gui */
    this.setGui();
  }
  
  setGui() {
    this.cube.setGui(webglGuiFolder)
  }

  onResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
  }

  start () {
    requestAnimationFrame(this.start);
    this.time += 0.01;
    this.cube.update();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
