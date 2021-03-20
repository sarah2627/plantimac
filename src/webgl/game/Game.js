import Sound from '../objects/sound/Sound'

export default class Game {
    constructor(camera, scene, plant, pot, rain, background) {
        this.camera = camera
        this.scene = scene
        this.plant = plant
        this.gameInProgress = true
        
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
        this.soundWin = new Sound(this.camera, this.scene, 'win.mp3')
        this.sounds = [this.soundAmbient, this.soundNight, this.soundRain, this.soundButton, this.soundBubble, this.soundWin]
        this.booleanAudio = false
        this.initSound()

        // PopUp settings
        this.pot = pot
        this.initPopUpSettings()
    }

    /** 
     * Update plant : bubble and growth
     */ 
    updatePlant() {
        const bubble = document.querySelector('#needsPlant')
        const needsImage = document.querySelector('#needsImage')

        if(this.pointsThirst > 25 && this.pointsThirst < 75 && this.pointsSun > 25 && this.pointsSun < 75) {
            bubble.style.display = 'none'
            this.plant.update()
            if(this.plant.sizeBar >= 100) {
                this.endGame()
            }
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

    /** 
     * Update points plant and bars 
     */
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

    /** 
     * Add/remove rain 
     */
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
    
    /** 
     * Animation rain 
     */
    updateRain() {
        if(this.booleanThirst) {
            this.rain.update()
        }
    }

    /** 
     * Add/remove sun 
     */
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

    /** 
     * Initialize sound : add/remove sound 
     */
    initSound() {
        const sound = document.getElementById('sound').children[0]
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

    /** 
     * Initialize popUp settings 
     */
    initPopUpSettings() {

        // Display/close popUp settings
        const bgPopUpSettings = document.getElementById('bgPopUpSettings')
        const popUpSettings = document.getElementById('popUpSettings')
        const btnPopUpSettings = document.getElementById('btnPopUpSettings')

        btnPopUpSettings.addEventListener('click', (e) => {
            e.preventDefault()
            this.soundButton.playSound()
            bgPopUpSettings.style.display = 'flex'
            popUpSettings.style.display = 'block'
            btnPopUpSettings.classList.add('activated')
        })
        bgPopUpSettings.addEventListener('click', (e) => {
            e.preventDefault()
            this.soundButton.playSound()
            bgPopUpSettings.style.display = 'none'
            popUpSettings.style.display = 'none'
            btnPopUpSettings.classList.remove('activated')
        })

        // Validate form popUp : change style pot / color pot / name plant
        const btnSubmitSettings = document.getElementById('btnSubmitSettings')
        const inputChangeName = document.getElementById('inputChangeName')

        btnSubmitSettings.addEventListener('click', (e) => {
            e.preventDefault()
            this.soundButton.playSound()
            // Name of the plant
            let valueInput = inputChangeName.value
            document.getElementById('displayName').innerHTML = valueInput
            // Color pot
            var color = document.querySelector('[name="choiceColor"]:checked')
            this.pot.changeColor(color.value)
            // Style pot
            var style = document.querySelector('[name="choiceStyle"]:checked')
            this.pot.changeStyle(style.value)
            // Close popUp
            bgPopUpSettings.style.display = 'none'
            popUpSettings.style.display = 'none'
            btnPopUpSettings.classList.remove('activated')
        })
    }

    /** 
     * End of the game : display pop up if the width of the barGrowth = 100 
     */
     endGame() {
        this.gameInProgress = false

        this.soundWin.playSound()

        const bgPopUpEnd = document.getElementById('bgPopUpEnd')
        const popUpEnd = document.getElementById('popUpEnd')
        const inputChangeName = document.getElementById('inputChangeName')

        // Name of the plant
        let valueInput = inputChangeName.value
        document.getElementById('displayNameEnd').innerHTML = valueInput
        // Display popUp
        bgPopUpEnd.style.display = 'flex'
        popUpEnd.style.display = 'block'
        // Close popUp
        bgPopUpEnd.addEventListener('click', (e) => {
            e.preventDefault()
            this.soundButton.playSound()
            bgPopUpEnd.style.display = 'none'
            popUpEnd.style.display = 'none'
        })
    }
}