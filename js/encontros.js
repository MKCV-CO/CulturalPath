import { alterColor } from './header-footer.js';


export const loadScreenEncontros = () => {
  const carousel = document.getElementById('carousel_encontro__container')

  new Glider(carousel, {
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    dots: '.dots',
    arrows: {
      prev: '.prev__encontros',
      next: '.next__encontros',
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

  alterColor('#085871')
}

