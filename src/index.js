import './styles/main.scss'

import Webgl from './webgl/Webgl'

var webgl

function interactions() {
    
// HOME
const btnSubmit = document.querySelectorAll('.btnSubmit')
const home = document.querySelector('.home')
const input = document.querySelector('input')
const missName = document.querySelector('.missName')
const prenomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/

    /* Start the game */
    btnSubmit.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault()
            if(input.validity.valueMissing) {
                e.preventDefault()
                missName.textContent = 'Nom de la plante manquant'
                missName.style.color = '#da5454'
            } else if (prenomValid.test(input.value) == false) {
                e.preventDefault()
                missName.textContent = 'Format incorrect'
                missName.style.color = 'orange'
            } else {
                // value of the name
                let valueInput = input.value
                document.querySelectorAll('.displayName').forEach(i => i.innerHTML = valueInput)
                document.querySelector('.changeName').value = valueInput
                
                // value of the button submit (1, 2 ou 3)
                let valueSubmit = parseInt(element.value)
                webgl = new Webgl(valueSubmit)
                
                // start and display the webgl game
                webgl.start()
                document.querySelector('canvas').style.display = 'block'
                home.style.display = 'none'
            }
        })
    });


// POPUP
const overlayPopUp = document.querySelector('.overlayPopUp')
const popUp = document.querySelector('.popUp')
const popUpSettings = document.querySelector('.popUpSettings')

    /* Open/close popup parameters */
    popUpSettings.addEventListener('click', (e) => {
        e.preventDefault()
        overlayPopUp.style.display = 'flex'
        popUp.style.display = 'block'
        popUpSettings.style.background = '#C57B3C'
    })

    overlayPopUp.addEventListener('click', (e) => {
        e.preventDefault()
        overlayPopUp.style.display = 'none'
        popUp.style.display = 'none'
        popUpSettings.style.background = '#FFA45B'
    })

// SETTINGS
const btnSubmitSettings = document.querySelector('.submitSettings')
const inputChangeName = document.querySelector('.changeName')

    btnSubmitSettings.addEventListener('click', (e) => {
        e.preventDefault()
        // Name
        let valueInput = inputChangeName.value
        document.querySelectorAll('.displayName').forEach(i => i.innerHTML = valueInput)
        // Pot style
        var style = document.querySelector('[name="choice-pot"]:checked')
        webgl.changeStyle(style.value)
        // Color
        var color = document.querySelector('[name="choice-color"]:checked')
        webgl.pot.changeColor(color.value)
        // Close popup
        overlayPopUp.style.display = 'none'
        popUp.style.display = 'none'
        popUpSettings.style.background = '#FFA45B'
    })
}

window.onload = interactions()
