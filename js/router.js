"use strict";


import { alterColor } from './header-footer.js';
import { loadScreenVoluntario } from './form-voluntario.js';
import { loadScreenParceiro } from './form-parceiro.js';
import { loadScreenRecreacao } from './recreacao.js';
import { loadScreenEncontros } from './encontros.js';
import { loadScreenQuiz } from './quiz/quiz.js';
import { loadScreenQuizQuestion } from './quiz/questions.js';
import { loadCalendarioScreen } from './calendario.js';


const routes = {
  "/": "/index.html",
  "/encontros": "/pages/encontros.html",
  "/parceiro": "/pages/parceiro.html",
  "/calendario": "/pages/calendario.html",
  "/voluntario": "/pages/voluntario.html",
  "/recreacao": "/pages/recreacao.html",
  "/quiz": "/pages/quiz.html",
  "/questions": "/pages/questions.html",
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
    loadScreenEncontros()
  } else if (path == "/voluntario") {
    loadScreenVoluntario()
  } else if (path == "/calendario") {
    loadCalendarioScreen()
    alterColor('#79132A')
  } else if (path == "/parceiro") {
    loadScreenParceiro()
  } else if (path == "/recreacao") {
    loadScreenRecreacao()
  } else if (path == '/quiz') {
    loadScreenQuiz()
  } else if (path == '/questions') {
    loadScreenQuizQuestion()
  } else if (path == '/doe') {
    alterColor('#12252B')

  }
}





window.route = route;
