import { AudioListener, Audio, AudioLoader } from 'three'

export default class Sound {

    constructor(camera, scene, pathImg) {

        // Instantiate a listener
        const audioListener = new AudioListener()

        // Add the listener to the camera
        camera.add(audioListener)

        // Instantiate audio object
        const sound1 = new Audio(audioListener)

        // Add the audio object to the scene
        scene.add(sound1)
        
        // Instantiate a loader
        const audioLoader = new AudioLoader()

        // Load a resource
        audioLoader.load('../assets/sounds/' + pathImg, function(buffer) {
            sound1.setBuffer(buffer);
            sound1.setLoop(true);
            if(pathImg === "button.ogg" || pathImg === "bubble.mp3" || pathImg === "win.mp3") {
                sound1.setLoop(false);
            }
            sound1.setVolume(0.5);
            if(pathImg === "ambient.mp3") {
                sound1.play()
            }
        })
        this.sound1 = sound1
    }

    /**
     *  Play or stop sound (with boolean)
     */
    toggleSound(booleanAudio) {
        if(booleanAudio) {
            this.sound1.play()
        } else {
            this.sound1.stop()
        }
    }

    /**
     *  Play a sound (1 time or loop)
     */
    playSound() {
        this.sound1.play()
    }

    /**
     *  Mute or demute sound (with boolean)
     */
    toggleMuteSound(booleanMuteAudio) {
        if(booleanMuteAudio) {
            this.sound1.setVolume(0)
        } else {
            this.sound1.setVolume(0.5)
        }
    }

}
