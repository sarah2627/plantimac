import Sound from '../objects/sound/Sound'

export default class Game {
    constructor(camera, scene, plant, rain, background) {
        this.camera = camera
        this.scene = scene
        this.plant = plant
        
        // Thirst
        this.rain = rain
        this.initThist()
        this.booleanThirst = false
        this.pointsThirst = 50

        // Sun
        this.background = background
        this.initSun()
        this.booleanSun = false
        this.pointsSun = 50

        // Bubble
        this.booleanBubble = false

        // Sounds
        this.soundAmbient = new Sound(this.camera, this.scene, 'ambient.mp3')
        this.soundNight = new Sound(this.camera, this.scene, 'night.mp3')
        this.soundRain = new Sound(this.camera, this.scene, 'rain.mp3')
        this.soundButton = new Sound(this.camera, this.scene, 'button.ogg')
        this.soundBubble = new Sound(this.camera, this.scene, 'bubble.mp3')
        this.sounds = [this.soundAmbient, this.soundNight, this.soundRain, this.soundButton, this.soundBubble]
        this.booleanAudio = false
        this.initSound()
    }

    /* Update plant : bubble and growth */
    updatePlant() {
        const bubble = document.querySelector('#needsPlant')
        const needsImage = document.querySelector('#needsImage')

        if(this.pointsThirst > 25 && this.pointsThirst < 75 && this.pointsSun > 25 && this.pointsSun < 75) {
            bubble.style.display = 'none'
            this.plant.update()
        } else {
            if(bubble.style.display === 'none') {
                this.soundBubble.playSound()
                bubble.style.display = 'block' 
            }
            if (this.pointsThirst <= 25) {
                //J'ai soif
                needsImage.src  = 'src/assets/images/thirst1.png'
            } else if (this.pointsThirst >= 75) {
                //Je me noie
                needsImage.src  = 'src/assets/images/thirst2.png'
            } else if (this.pointsSun <= 25) {
                //J'ai froid
                needsImage.src  = 'src/assets/images/sun1.png'
            } else if (this.pointsSun >= 75) {
                //J'ai chaud
                needsImage.src  = 'src/assets/images/sun2.png'
            }
        }
    }

    /* Update points plant and bars */
    updatePointsPlant() {
        this.pointsThirst += this.booleanThirst ? 1 : -1
        if (this.pointsThirst <= 0) {
            this.pointsThirst = 0
        } else if (this.pointsThirst >= 100) {
            this.pointsThirst = 100
        }
        const barThirst = document.getElementById('barThirst').children[0]
        barThirst.style.width = this.pointsThirst+"%";
        this.pointsThirst <= 25 || this.pointsThirst >= 75 ? barThirst.classList.add("danger") : barThirst.classList.remove("danger")

        this.pointsSun += this.booleanSun ? -1 : 1
        if (this.pointsSun <= 0) {
            this.pointsSun = 0
        } else if (this.pointsSun >= 100) {
            this.pointsSun = 100
        }
        const barSun = document.getElementById('barSun').children[0]
        barSun.style.width = this.pointsSun+"%";
        this.pointsSun <= 25 || this.pointsSun >= 75 ? barSun.classList.add("danger") : barSun.classList.remove("danger")
    }

    /* Add/Remove rain */
    initThist() {
        const thirstButton = document.getElementById('thirstButton')
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
            this.soundButton.playSound()
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
        const sunButton = document.getElementById('sunButton')
        const infosDay = document.getElementById('infosDay')
        const infosNight = document.getElementById('infosNight')

        sunButton.addEventListener('click', (e) => {
            e.preventDefault()
            if (this.booleanSun) {
                this.booleanSun = false
                sunButton.style.background = '#FFA45B'
                infosDay.style.display = 'block'
                infosNight.style.display = 'none'
                this.background.putTheDay()
            } else {
                this.booleanSun = true
                sunButton.style.background = '#C57B3C'
                infosDay.style.display = 'none'
                infosNight.style.display = 'block'
                this.background.putTheNight()
            }
            this.soundButton.playSound()
            this.soundNight.toggleSound(this.booleanSun)
        })
    }

    /* Add/Remove sound */
    initSound() {
        const sound = document.getElementById('sound')
        const speaker = document.getElementById('speaker')
        const speakerStop = document.getElementById('speakerStop')

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