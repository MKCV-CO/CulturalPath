// ALTERAÇÃO DA COR DO BOTÃO DOE
export const alterColor = (color) => {
    document.getElementById("button_doe").style.backgroundColor = color
    document.getElementById("button-footer").style.backgroundColor = color
}

// NAVBAR
let menu = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')

menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('open')
}

