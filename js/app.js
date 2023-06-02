'use strict'

import './router.js'


const createCard =  (video) => {
    const card = document.createElement('iframe')
    // card.width = '400'
    // card.height = '200'
    // card.src =  `${video.url}`
    card.classList.add('video')
    card.src =  `https://www.youtube.com/embed/${video.url}`
    console.log(video.url);
    card.title = 'YouTube video player'
    card.frameBorder = '0'
    card.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
    card.allowFullscreen
    return card
}


export const loadContainer = async () => {
    const url = 'http://localhost:8080/v1/cultural-path/videos-infantil'
    const response = await fetch(url)
    const data = await response.json()
    const video = await data.videos
    const container = document.getElementById('video__container')
    const cards = video.map(createCard)
  
    container.replaceChildren(...cards)
}



