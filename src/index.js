import './styles/main.scss'

import Webgl from './webgl/Webgl'
import Rain from './webgl/objects/rain/Rain'

var webgl = new Webgl()

function interactions() {
    const btnSubmit = document.querySelector('.btnSubmit')
    const home = document.querySelector('.home')
    const canvas = document.querySelector('canvas')

    const input = document.querySelector('input')
    const missName = document.querySelector('.missName');
    const prenomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/

    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault()
        if(input.validity.valueMissing) {
            e.preventDefault()
            missName.textContent = 'Nom de la plante manquant'
            missName.style.color = '#da5454'
        } else if (prenomValid.test(input.value) == false) {
            e.preventDefault()
            missName.textContent = 'Format incorrect';
            missName.style.color = 'orange';
        } else {
            let valueInput = input.value
            document.querySelector('.displayName').innerHTML = valueInput
            webgl.start()
            canvas.style.display = 'block'
            home.style.display = 'none'
        }
    })

    const overlayPopUp = document.querySelector('.overlayPopUp')
    const popUp = document.querySelector('.popUp')
    const popUpSettings = document.querySelector('.popUpSettings')

    popUpSettings.addEventListener('click', (e) => {
        e.preventDefault()
        overlayPopUp.style.display = 'flex'
        popUp.style.display = 'block'
    })

    overlayPopUp.addEventListener('click', (e) => {
        e.preventDefault()
        overlayPopUp.style.display = 'none'
        popUp.style.display = 'none'
    })

    /* Add/Remove rain */
    const rain = document.querySelector('#rain')
    let booleanRain = false;

    rain.addEventListener('click', (e) => {
        e.preventDefault()
        if (booleanRain === false) {
            booleanRain = true;
            webgl.rain(booleanRain)
        } else {
            booleanRain = false;
            webgl.rain(booleanRain)
        }
    }) 

    /* Inclination sun */
    const temps = document.querySelector('#temps')
    let inclination = 0.5;

    temps.addEventListener('click', (e) => {
        e.preventDefault()
        if (inclination === 0.5) {
            inclination = 0.48;
            webgl.sky(inclination)
        } else {
            inclination = 0.5;
            webgl.sky(inclination)
        }
    })
}

window.onload = interactions()
