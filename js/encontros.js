export const createEncontrosCarousel = () => {
  const carousel = document.getElementById('carousel_encontro__container')

  new Glider(carousel, {
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    dots: '.dots',

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

