export default class Game {
    constructor(scene, plant, rain, background) {
        this.scene = scene
        this.plant = plant
        
        /* Thirst */
        this.rain = rain
        this.initThist()
        this.booleanThirst = false
        this.pointsThirst = 50

        /* Sun */
        this.background = background
        this.initSun()
        this.booleanSun = false
        this.pointsSun = 50
    }

    updatePlant() {
        if(this.pointsThirst > 25 && this.pointsThirst < 75 && this.pointsSun > 25 && this.pointsSun < 75) {
            this.plant.update()
            console.log("Je me sens bien")
        } else if (this.pointsThirst <= 25) {
            this.displayNeedPlant('thirsty')
        } else if (this.pointsThirst >= 75) {
            this.displayNeedPlant('drowning')
        } else if (this.pointsSun <= 25) {
            console.log("J'ai chaud")
        } else if (this.pointsSun >= 75) {
            console.log("J'ai froid")
        }
    }

    updatePointsPlant() {
        this.pointsThirst += this.booleanThirst ? 1 : -1
        if (this.pointsThirst <= 0) {
            this.pointsThirst = 0
        } else if (this.pointsThirst >= 100) {
            this.pointsThirst = 100
        }

        this.pointsSun += this.booleanSun ? 1 : -1
        if (this.pointsSun <= 0) {
            this.pointsSun = 0
        } else if (this.pointsSun >= 100) {
            this.pointsSun = 100
        }
        //console.log(this.pointsThirst)
    }

    displayNeedPlant(need) {
        const bubble = document.querySelector('.needsPlant')
        const bubbleNeed = document.querySelector('.needs')
        if(need == 'thirsty') {
            console.log("J'ai soif")
            bubbleNeed.innerHTML = "J'ai soif"
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
    initThist() {
        const thirstButton = document.querySelector('#thirst')
        const rainR = this.rain.getRain()
        thirstButton.addEventListener('click', (e) => {
            e.preventDefault()
            if (this.booleanThirst) {
                this.booleanThirst = false
                this.scene.remove(rainR)
            } else {
                this.booleanThirst = true
                this.scene.add(rainR)
            }
        })
    }

    /* Add/Remove rain */
    initSun() {
        const temps = document.querySelector('#temps')
        const jour = document.querySelector('.jour')
        const nuit = document.querySelector('.nuit')

        temps.addEventListener('click', (e) => {
            e.preventDefault()
            if (this.booleanSun) {
                this.booleanSun = false
                jour.style.display = 'block'
                nuit.style.display = 'none'
                this.background.putTheDay()
            } else {
                this.booleanSun = true
                jour.style.display = 'none'
                nuit.style.display = 'block'
                this.background.putTheNight()
            }
        })
    }

    /* Animation rain */
    updateRain() {
        if(this.booleanThirst) {
            this.rain.update()
        }
    }
}