// import Rain from '../objects/rain/Rain'

export default class Game {
    constructor(scene, plant, rains) {
        this.scene = scene
        this.plant = plant
        this.rains = rains
        this.rain()
    }

    updatePlant() {
        this.plant.pointDeViePlant -= 1
        
        if(this.plant.pointDeViePlant > 20 && this.plant.pointDeViePlant < 30) {
            this.plant.update()
        } else if (this.plant.pointDeViePlant <= 20) {
            console.log("J'ai soiiiiiiiiiif")
        } else if (this.plant.pointDeViePlant >= 30) {
            console.log("Je me noie") 
        }
    }

    /* Add/Remove rain */
    rain() {
        const rain = document.querySelector('#rain')
        let booleanRain = false
        let activeRain = this.rains.getRains()
    
        rain.addEventListener('click', (e) => {
            e.preventDefault()
            if (booleanRain === false) {
                booleanRain = true
                this.plant.pointDeViePlant += 1
                this.scene.add(activeRain)
            } else {
                booleanRain = false
                this.scene.remove(activeRain)
            }
        }) 
    }

    /* Animation rain */
    updateRain() {
        if(this.rains) {
            this.rains.update()
        }
    }
}