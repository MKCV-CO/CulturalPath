'use strict'

import './router.js'



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



