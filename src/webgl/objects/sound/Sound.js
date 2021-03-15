import { AudioListener,  Audio, AudioLoader } from 'three'

let sound, sound1

export default class Sound {

    constructor(camera, pathImg) {

        const listener = new AudioListener()
        camera.add(listener)
        
        // load a sound and set it as the Audio object's buffer
        const audioLoader = new AudioLoader()

        if(pathImg === "oiseaux.ogg") {
            // create a global audio source
            sound = new Audio(listener)

            audioLoader.load('../../src/assets/sounds/' + pathImg, function(buffer) {
                sound.setBuffer(buffer);
                sound.setLoop(true);
                sound.setVolume(0.5);
                sound.play()
            })
        }

        if(pathImg === "pluie.mp3") {
            // create a global audio source
            sound1 = new Audio(listener)

            audioLoader.load('../../src/assets/sounds/' + pathImg, function(buffer) {
                sound1.setBuffer(buffer);
                sound1.setLoop(true);
                sound1.setVolume(0.5);
            })
        }
    }

    playSound(booleanAudio, pathImg) {

        if ((booleanAudio) && (pathImg === 'oiseaux.ogg')) {
            sound.play()
        } else if ((booleanAudio === 'false') && (pathImg === 'oiseaux.ogg')){
            console.log('stop Oiseaux 2', booleanAudio)
            sound.stop()
        } else {
            return
        }

        if ((booleanAudio) && (pathImg === 'pluie.mp3')) {
            sound1.play()
            console.log("tesssst")
        } else if ((booleanAudio === 'false') && (pathImg === 'pluie.mp3')) {
            sound1.stop()
            console.log("tesssst2")
        } else {
            console.log("tesssst3")
            return
        }
    }
}
