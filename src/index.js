import './styles/main.scss'

import Webgl from './webgl/Webgl'

let webgl

function interactions() {

    const home = document.getElementById('home')
    const btnSubmit = document.querySelectorAll('.btnSubmit')
    const chooseNamePlant = document.getElementById('chooseNamePlant')
    const missName = document.getElementById('missName')
    const nameValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/

    // Start the application
    btnSubmit.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault()
            if (chooseNamePlant.validity.valueMissing) {
                e.preventDefault()
                missName.textContent = 'Nom de la plante manquant'
                missName.style.color = '#da5454'
            } else if (nameValid.test(chooseNamePlant.value) == false) {
                e.preventDefault()
                missName.textContent = 'Format incorrect'
            } else {
                // Value of the name
                let valueInput = chooseNamePlant.value
                document.getElementById('displayName').innerHTML = valueInput
                document.getElementById('inputChangeName').value = valueInput

                // Value of the seed / button submit (1, 2 or 3)
                let valueSubmit = parseInt(element.value)
                webgl = new Webgl(valueSubmit)

                // Start and display the WebGL game
                webgl.start()
                document.getElementById('canvas').style.display = 'block'
                home.style.display = 'none'
            }
        })
    });
}

window.onload = interactions()
