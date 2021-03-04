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
            this.stopDisplayNeedPlant()
            this.plant.update()
        } else if (this.plant.pointDeViePlant <= 20) {
            this.displayNeedPlant('thirsty')
        } else if (this.plant.pointDeViePlant >= 30) {
            this.displayNeedPlant('drowning')
        }
    }

    displayNeedPlant(need) {
        const bubble = document.querySelector('.needsPlant')
        const bubbleNeed = document.querySelector('.needs')
        if(need == 'thirsty') {
            console.log("J'ai soiiiiiiiiiif")
            bubbleNeed.innerHTML = "J'ai soiiiiiiiiiif"
            bubble.style.display = 'block'
        } else if (need == 'drowning') {
            console.log("Je me noie")
            bubbleNeed.innerHTML = "Je me noie"
            bubble.style.display = 'block'
        }
    }

    stopDisplayNeedPlant() {
        const bubble = document.querySelector('.needsPlant')
        bubble.style.display = 'none'
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