'use strict'
let mapa
let cultural__estado
let estado
import { alterColor } from './header-footer.js';

export const loadScreenRecreacao = () => {
  mapa = document.querySelector('#map')
  cultural__estado = document.getElementById('cultural__estado')
  estado = document.getElementById('select_estado')
  alterColor('#009d78')
  loadContainer()
  recreacaoEvents()
  createCarousel()
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
  comida.textContent = `${estado.comida}`.replaceAll(',', ', ')

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



export const createCarousel = () => {
  const carousel = document.getElementById('video__container')

  new Glider(carousel, {
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    dots: '.dots',
    arrows: {
      prev: '.prev',
      next: '.next'
    },
    scrollLock: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  })
}

const createCard = (video) => {

  let card = document.createElement('div')
  card.classList = 'video'
  card.innerHTML = `<iframe
  src="https://www.youtube.com/embed/${video.url}"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowfullscreen></iframe>`
  return card
}

export const loadContainer = async () => {
  const url = 'https://api-culturalpath.up.railway.app/v1/cultural-path/videos-infantil'
  const response = await fetch(url)
  const data = await response.json()
  const video = await data.videos
  const container = document.getElementById('video__container')
  const cards = video.map(createCard)

  container.replaceChildren(...cards)

}