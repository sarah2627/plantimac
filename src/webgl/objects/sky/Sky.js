import {
	BackSide,
	BoxGeometry,
	Mesh,
	ShaderMaterial,
	UniformsUtils,
	Vector3
} from 'three';

import fragmentShader from './shaders/fragment.fs'
import vertexShader from './shaders/vertex.vs'

class Sky {
    constructor(options) {

        var parametersSun = {
            inclination: options.inclination,
            azimuth: options.azimuth
        }
    
        const theta = Math.PI * (parametersSun.inclination - 0.5);
        const phi = 2 * Math.PI * (parametersSun.azimuth - 0.5);
        
        let sun = new Vector3();

        sun.x = Math.cos(phi);
        sun.y = Math.sin(phi) * Math.sin(theta);
        sun.z = Math.sin(phi) * Math.cos(theta);
        
        let parameters = {
            turbidity: options.turbidity,
            rayleigh: options.rayleigh,
            mieCoefficient: options.mieCoefficient,
            mieDirectionalG: options.mieDirectionalG,
            sunPosition: new Vector3(sun.x, sun.y, sun.z),
            up: options.up,
        }        

        var material = new ShaderMaterial( {
            name: 'SkyShader',
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: UniformsUtils.clone({
                turbidity: { value: parameters.turbidity },
                rayleigh: { value: parameters.rayleigh },
                mieCoefficient: { value: parameters.mieCoefficient },
                mieCoefficientlG: { value: parameters.mieDirectionalG },
                sunPosition: { value: parameters.sunPosition },
                up: { value: parameters.up },
            }),
            side: BackSide,
            depthWrite: false
        });
    
        Mesh.call(this, new BoxGeometry(1, 1, 1 ), material);

    }

    setInclination() {
        var isClicked = false;

        console.log('test')

        const temps = document.querySelector('#temps');
        temps.addEventListener('click', (e) => {
            e.preventDefault();
            this.isClicked = true;
            parametersSun.inclination = 1;
        })
    }
};

	
// Sky.prototype.setInclination = function() {
//     alert('Salut!');
//     console.log('test')
// }

Sky.prototype = Object.create(Mesh.prototype);

export { Sky };