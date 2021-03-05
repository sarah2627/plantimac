import { AudioListener,  Audio, AudioLoader } from 'three'

export default class Sound {

    constructor(camera) {
        const listener = new AudioListener();
        camera.add(listener);

        // create a global audio source
        const sound = new Audio(listener);

        // load a sound and set it as the Audio object's buffer
        const audioLoader = new AudioLoader();
        audioLoader.load('../../src/assets/sounds/oieaux.ogg', function(buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            sound.play();
        });
        
        // sound.isPlaying = true
        // console.log(sound.isPlaying)
    }
}
