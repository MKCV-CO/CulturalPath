"use strict";


import { alterColor } from './style.js';
import { createCarousel } from './style.js';
import { formatDate } from './style.js';
import { carregarForm } from './form-voluntario.js';
import { loadContainer } from './app.js';
import { carregarFormParceiro } from './form-parceiro.js';
import { styleButtonRestart } from './quiz-perguntas.js/quiz.js';
import { loadQuestion } from './quiz-perguntas.js/quiz.js';
import { importQuerySelector } from './quiz-perguntas.js/quiz.js';
import { recreacaoLoad } from './recreacao.js';
import { createEncontrosCarousel } from './encontros.js';


const routes = {
  "/": "/index.html",
  "/encontros": "/pages/encontros.html",
  "/parceiro": "/pages/parceiro.html",
  "/calendario": "/pages/calendario.html",
  "/voluntario": "/pages/voluntario.html",
  "/recreacao": "/pages/recreacao.html",
  "/quiz": "/pages/quiz.html",
  "/quiz-perguntas": "/pages/quiz-perguntas.html",
  "/doe": "/pages/doe.html"
};

let valorDoInput

const route = async () => {
  window.event.preventDefault();
  window.history.pushState({}, "", window.event.target.href);
  const path = window.location.pathname;
  const route = routes[path];

  const response = await fetch(route);
  const html = await response.text();

  document.getElementById("root").innerHTML = html;

  if (path == "/" || path == "/index.html") {
    alterColor('#0D9ECC')

  } else if (path == "/encontros") {
    alterColor('#085871')
    createEncontrosCarousel()
  } else if (path == "/voluntario") {
    alterColor('#7675DC')
    formatDate()
    carregarForm()
  } else if (path == "/calendario") {
    alterColor('#79132A')
  } else if (path == "/parceiro") {
    carregarFormParceiro()
    alterColor('#E99922')

  } else if (path == "/recreacao") {
    alterColor('#009d78')
    loadContainer()
    createCarousel()
    recreacaoLoad()

  } else if (path == '/quiz') {
    alterColor('#79132a')
    const inputDoQuiz = document.getElementById('input-nome')
    const buttonDoQuiz = document.getElementById('button-inicio')
    buttonDoQuiz.addEventListener('click', function () {
      valorDoInput = inputDoQuiz.value
    })
  } else if (path == '/quiz-perguntas') {
    const btnRestart = document.querySelector(".finish button")
    importQuerySelector()
    btnRestart.addEventListener('click', styleButtonRestart)
    console.log('estou no quiz');
    loadQuestion()
  } else if (path == '/doe') {
    alterColor('#12252B')

  }
}





window.route = route;
