'use strict'
let mapa
let cultural__estado
let estado

export const recreacaoLoad = () => {
  mapa = document.querySelector('#map')
  cultural__estado = document.getElementById('cultural__estado')
  estado = document.getElementById('estado')

  recreacaoEvents()
}


const getEstado = async ({ target }) => {
  const estado = target.id.replace('BR-', '')
  // const nomeEstado = target.getAttribute('title')


  console.log(estado);
}

let pathDoMapa

const mudarCor = () => {

  const inputOptionEstado = document.getElementById('estado').value
  const path = document.getElementsByTagName('path')
  if (pathDoMapa != null || pathDoMapa != undefined) {
    pathDoMapa.style.fill = '#009d78'
  }
  pathDoMapa = document.getElementById(`${inputOptionEstado}`)
  pathDoMapa.style.fill = '#00382b'
}

const recreacaoEvents = () => {
  estado.addEventListener('change', mudarCor)
  mapa.addEventListener('click', getEstado)
}
