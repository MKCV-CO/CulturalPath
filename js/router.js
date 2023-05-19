"use strict";


import { alterColor } from './style.js';


const routes = {
  "/": "/index.html",
  "/encontros": "/pages/encontros.html",
  "/parceiro": "/pages/parceiro.html",
  "/calendario": "/pages/calendario.html",
  "/voluntario": "/pages/voluntario.html",
  "/recreacao": "/pages/recreacao.html",
};

const route = async () => {
  window.event.preventDefault();
  window.history.pushState({}, "", window.event.target.href);
  const path = window.location.pathname;
  const route = routes[path];

  const response = await fetch(route);
  const html = await response.text();

  document.getElementById("root").innerHTML = html;

  if (path == "/" || path == "/index.html") { 
    loadBannerFilm();
    alterColor('#0D9ECC')
  }else if (path == "/encontros"){
    alterColor('#085871')
  }else if (path == "/voluntario"){
    alterColor('#7675DC')
  }else if (path == "/calendario"){
    alterColor('#79132A')
  }else if (path == "/parceiro"){
    alterColor('#E99922')
  }else if (path == "/recreacao"){
    alterColor('#009d78')
  }
}



window.route = route;
