'use strict'
let mapa
let cultural__estado
let estado

export const recreacaoLoad = () => {
  mapa = document.querySelector('#map')
  cultural__estado = document.getElementById('cultural__estado')
  estado = document.getElementById('select_estado')

  recreacaoEvents()
}


const getEstado = async ({ target }) => {
  const estado = target.id.replace('BR-', '')
  // const nomeEstado = target.getAttribute('title')


  console.log(estado);
}

let pathDoMapa

const mudarCor = () => {

  const inputOptionEstado = document.getElementById('select_estado').value
  const path = document.getElementsByTagName('path')
  if (pathDoMapa != null || pathDoMapa != undefined) {
    pathDoMapa.style.fill = '#009d78'
  }
  pathDoMapa = document.getElementById(`${inputOptionEstado}`)
  let sigla = pathDoMapa.id.replace('BR-', '')
  pathDoMapa.style.fill = '#00382b'
  console.log(carregarEstado(sigla));
}

const recreacaoEvents = () => {
  estado.addEventListener('change', mudarCor)
  mapa.addEventListener('click', getEstado)
}

const criarEstado = (estado) => {
  const card = document.createElement('div')
  card.classList.add('data-estado__card')

  const titulo = document.createElement('h2')
  titulo.classList.add('data-estado__title')
  titulo.textContent = `${estado.estado}`

  const comida = document.createElement('span')
  comida.classList.add('data-estado__comida')
  // comida é um array, tenho que ver o que retorna
  comida.textContent = `${estado.comida}`

  const regiao = document.createElement('span')
  regiao.classList.add('data-estado__regiao')
  regiao.textContent = `${estado.regiao}`

  const bioma = document.createElement('span')
  bioma.classList.add('data-estado__bioma')
  bioma.textContent = `${estado.bioma[0]}`

  const descricao = document.createElement('span')
  descricao.classList.add('data-estado__descricao')
  descricao.textContent = `${estado.descricao}`


  card.append(titulo, comida, regiao, bioma, descricao)
  return card

}

const carregarEstado = async (sigla) => {
  const url = `https://api-culturalpath.up.railway.app/v1/cultural-path/estado?sigla=${sigla}`
  const response = await fetch(url)
  const data = await response.json()
  const estado = await data.estado
  const container = document.getElementById('data-estado__container')
  const card = criarEstado(estado)

  container.replaceChildren(card)

}
