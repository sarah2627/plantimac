import './styles/main.scss'

import Webgl from './webgl/Webgl'

var webgl

function interactions() {

    /* HOME */
    const home = document.getElementById('home')
    const btnSubmit = document.querySelectorAll('.btnSubmit')
    const input = document.querySelector('input')
    const missName = document.querySelector('.missName')
    const nameValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/

    // Start the application
    btnSubmit.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault()
            if (input.validity.valueMissing) {
                e.preventDefault()
                missName.textContent = 'Nom de la plante manquant'
                missName.style.color = '#da5454'
            } else if (nameValid.test(input.value) == false) {
                e.preventDefault()
                missName.textContent = 'Format incorrect'
                missName.style.color = 'orange'
            } else {
                // Value of the name
                let valueInput = input.value
                document.getElementById('displayName').innerHTML = valueInput
                document.getElementById('changeName').value = valueInput

                // Value of the button submit (1, 2 or 3)
                let valueSubmit = parseInt(element.value)
                webgl = new Webgl(valueSubmit)

                // Start and display the webgl game
                webgl.start()
                document.getElementById('canvas').style.display = 'block'
                home.style.display = 'none'
            }
        })
    });


    /* POPUP */
    const overlayPopUp = document.getElementById('overlayPopUp')
    const popUp = document.getElementById('popUp')
    const popUpSettings = document.getElementById('popUpSettings')

    // Open/close popup parameters
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

    // Change settings
    const btnSubmitSettings = document.getElementById('submitSettings')
    const inputChangeName = document.getElementById('changeName')

    btnSubmitSettings.addEventListener('click', (e) => {
        e.preventDefault()
        // Name
        let valueInput = inputChangeName.value
        document.getElementById('displayName').innerHTML = valueInput
        // Color
        var color = document.querySelector('[name="choiceColor"]:checked')
        webgl.pot.changeColor(color.value)
        // Style
        var style = document.querySelector('[name="choiceStyle"]:checked')
        webgl.changeStyle(style.value)
        // Close popup
        overlayPopUp.style.display = 'none'
        popUp.style.display = 'none'
        popUpSettings.style.background = '#FFA45B'
    })
}

window.onload = interactions()
