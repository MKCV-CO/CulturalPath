// ALTERAÇÃO DA COR DO BOTÃO DOE
export const alterColor = (color) => {
    document.getElementById("button_doe").style.backgroundColor = color
    document.getElementById("button-footer").style.backgroundColor = color
}

// GLIDER.JS >> CRIAÇÃO DO CARROSSEL
let menu = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')

// DOTS DE NAVEGAÇÃO
menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('open')
}

// CRIAÇÃO DO OBJETO CARROSSEL
export const createCarousel = () => {
    const carousel = document.getElementById('video__container')

    new Glider(carousel, {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        // dots: '.dots',
        arrows: {
            prev: '.prev',
            next: '.next'
        },
        scrollLock: true,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })
}

export const formatDate = () => {
    var dt_nasc = document.querySelector("#dt_nasc");
    var idade = document.querySelector("#idade");

    // PREENCHIMENTO AUTOMÁTICO DO CAMPO IDADE
    dt_nasc.addEventListener("blur", function () {

        let data_brasileira = dt_nasc.value;
        let data_americana = data_brasileira.split('/').reverse().join('-');

        console.log(data_americana);


        const today = new Date();
        const birthDate = new Date(data_americana);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        idade.value = age;
    })

    document.getElementById('cep').addEventListener('blur', preencherDados)

}

// GETELEMENT DAS VARIAVEIS DATA DE NASCIMENTO E IDADE


// PESQUISAR O CEP ATRAVÉS DA API VIACEP
const pesquisarCep = async (cep) => {

    const url = `https://viacep.com.br/ws/${cep}/json/`

    const response = await fetch(url)
    const data = await response.json()

    return {
        municipio: data.localidade,
        estado: data.uf,
        bairro: data.bairro,
        logradouro: data.logradouro
    }

}

// PREENCHER OS DADOS COM O RETORNO DA FUNÇÃO 'PESQUISAR CEP'
const preencherDados = async () => {

    const cepDigitado = document.getElementById('cep').value
    const cep = await pesquisarCep(cepDigitado)
    document.getElementById('endereco').value = cep.logradouro
    document.getElementById('bairro').value = cep.bairro
    document.getElementById('cidade').value = cep.municipio
    document.getElementById('estado').value = cep.estado

}

// EVENTO DE BLUR PARA CHAMAR A FUNÇÃO PREENCHER DADOS
