import './styles/main.scss'

import Webgl from './webgl/Webgl'

var webgl = new Webgl()

const btnSubmit = document.querySelector('.btnSubmit')
const canvas = document.querySelector('canvas')
const home = document.querySelector('.home')

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    let valueInput = document.querySelector('input').value
    let displayName = document.querySelector('.displayName').innerHTML = valueInput
    webgl.start()
    canvas.style.display = 'block'
    home.style.display = 'none'
})