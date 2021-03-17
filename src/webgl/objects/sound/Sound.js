import { AudioListener, Audio, AudioLoader } from 'three'

export default class Sound {

    constructor(camera, scene, pathImg) {

        // instantiate a listener
        const audioListener = new AudioListener()

        // add the listener to the camera
        camera.add(audioListener)

        // instantiate audio object
        const sound1 = new Audio(audioListener)

        // add the audio object to the scene
        scene.add(sound1)
        
        // instantiate a loader
        const audioLoader = new AudioLoader()

        // load a resource
        audioLoader.load('../../src/assets/sounds/' + pathImg, function(buffer) {
            sound1.setBuffer(buffer);
            sound1.setLoop(true);
            if(pathImg === "button.ogg" || pathImg === "bubble.mp3") {
                sound1.setLoop(false);
            }
            sound1.setVolume(0.1);
            if(pathImg === "ambient.mp3") {
                sound1.play()
            }
        })
        this.sound1 = sound1
    }

    toggleSound(booleanAudio) {
        if(booleanAudio) {
            this.sound1.play()
        } else {
            this.sound1.stop()
        }
    }

    playSound() {
        this.sound1.play()
    }

    toggleMuteSound(booleanMuteAudio) {
        if(booleanMuteAudio) {
            this.sound1.setVolume(0)
        } else {
            this.sound1.setVolume(0.1)
        }
    }

}
