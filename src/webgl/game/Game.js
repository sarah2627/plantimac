import Sound from '../objects/sound/Sound'

export default class Game {
    constructor(camera, scene, plant, rain, background) {
        this.camera = camera
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

        /* Sound */
        this.soundBirds = new Sound(this.camera, this.scene, 'oiseaux.ogg')
        this.soundRain = new Sound(this.camera, this.scene, 'pluie.mp3')
        this.sounds = [this.soundBirds, this.soundRain]
        this.booleanAudio = false
        this.initSound()
    }

    updatePlant() {
        const bubble = document.querySelector('.needsPlant')
        //const bubbleNeed = document.querySelector('.needs')
        const needsImage = document.querySelector('.needsImage')

        if(this.pointsThirst > 25 && this.pointsThirst < 75 && this.pointsSun > 25 && this.pointsSun < 75) {
            bubble.style.display = 'none'
            this.plant.update()
        } else {
            bubble.style.display = 'block' 
            if (this.pointsThirst <= 25) {
                needsImage.src  = 'src/assets/images/thirst_2.png'
                //bubbleNeed.innerHTML = "J'ai soif"
            } else if (this.pointsThirst >= 75) {
                needsImage.src  = 'src/assets/images/thirst_1.png'
                //bubbleNeed.innerHTML = "Je me noie"
            } else if (this.pointsSun <= 25) {
                needsImage.src  = 'src/assets/images/sun_1.png'
                //bubbleNeed.innerHTML = "J'ai froid"
            } else if (this.pointsSun >= 75) {
                needsImage.src  = 'src/assets/images/sun_2.png'
                //bubbleNeed.innerHTML = "J'ai chaud"
            }
        }
    }

    updatePointsPlant() {
        this.pointsThirst += this.booleanThirst ? 1 : -1
        if (this.pointsThirst <= 0) {
            this.pointsThirst = 0
        } else if (this.pointsThirst >= 100) {
            this.pointsThirst = 100
        }
        const barThirst = document.getElementById("barThirst").children[0]
        barThirst.style.width = this.pointsThirst+"%";
        this.pointsThirst <= 25 || this.pointsThirst >= 75 ? barThirst.classList.add("danger") : barThirst.classList.remove("danger")

        this.pointsSun += this.booleanSun ? -1 : 1
        if (this.pointsSun <= 0) {
            this.pointsSun = 0
        } else if (this.pointsSun >= 100) {
            this.pointsSun = 100
        }
        const barSun = document.getElementById("barSun").children[0]
        barSun.style.width = this.pointsSun+"%";
        this.pointsSun <= 25 || this.pointsSun >= 75 ? barSun.classList.add("danger") : barSun.classList.remove("danger")
    }

    /* Add/Remove rain */
    initThist() {
        const thirstButton = document.querySelector('#thirst')
        const rainR = this.rain.rainObject
        thirstButton.addEventListener('click', (e) => {
            e.preventDefault()
            if (this.booleanThirst) {
                this.booleanThirst = false
                this.scene.remove(rainR)
                thirstButton.style.background = '#FFA45B'
            } else {
                this.booleanThirst = true
                this.scene.add(rainR)
                thirstButton.style.background = '#C57B3C'
            }
            this.soundRain.toggleSound(this.booleanThirst)
        })
    }
    
    /* Animation rain */
    updateRain() {
        if(this.booleanThirst) {
            this.rain.update()
        }
    }

    /* Add/Remove sun */
    initSun() {
        const temps = document.querySelector('#temps')
        const jour = document.querySelector('.jour')
        const nuit = document.querySelector('.nuit')

        temps.addEventListener('click', (e) => {
            e.preventDefault()
            if (this.booleanSun) {
                this.booleanSun = false
                temps.style.background = '#FFA45B'
                jour.style.display = 'block'
                nuit.style.display = 'none'
                this.background.putTheDay()
                
            } else {
                this.booleanSun = true
                temps.style.background = '#C57B3C'
                jour.style.display = 'none'
                nuit.style.display = 'block'
                this.background.putTheNight()
            }
            this.soundBirds.toggleSound(this.booleanSun)
        })
    }

    /* Add/Remove sound */
    initSound() {
        const sound = document.querySelector('.sound')
        const speaker = document.querySelector('.speaker')
        const speakerStop = document.querySelector('.speakerStop')

        sound.addEventListener('click', (e) => {
            e.preventDefault()
            if (this.booleanAudio) {
                speaker.style.display = 'flex'
                speakerStop.style.display = 'none'
                this.booleanAudio = false
            } else {
                speaker.style.display = 'none'
                speakerStop.style.display = 'flex'
                this.booleanAudio = true
            }
            // Mute all sounds
            const booleanAudio = this.booleanAudio
            this.sounds.forEach(function(item) {
                item.toggleMuteSound(booleanAudio)
            })
        })
    }
}