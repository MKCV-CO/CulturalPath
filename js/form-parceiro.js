"use strict";
const path = window.location.pathname;

console.log(path);

export const carregarFormParceiro = () => {
    const botao = document.getElementById("parceiro__form__button");
    botao.addEventListener("click", handleSubmit);
};

// var id_tipo_contato = document.querySelector('input[name=fav_language]:checked').value

const handleSubmit = async () => {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const razao_social = document.getElementById("razao").value;
  const cnpj = document.getElementById("cnpj").value;
  const mensagem = document.getElementById("motivo").selectedIndex + 1;
  //   const id_tipo_contato = document.getElementById("radio").selectedIndex;
  //   const id_tipo_contato = document.querySelectorAll('fav_language').value
  const id_tipo_contato = document.querySelector(
    "#radio__contato:checked");

  let jsonDados = {
    cnpj: cnpj,
    razao_social: razao_social,
    email: email,
    telefone: telefone,
    id_mensagem: mensagem,
    id_tipo_contato: Number(id_tipo_contato.value),
  };
  console.log(jsonDados);
//   console.log(id_tipo_contato.value);
//   console.log(id_tipo_contato.id);
  

    postParceiroApi(jsonDados);
};

const postParceiroApi = async (dadosBody) => {
  const dataBody = dadosBody;

  const initPost = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataBody),
  };

  const url = "http://localhost:8080/v1/cultural-path/empresa";
  const response = await fetch(url, initPost);
  const voluntario = await response.json();
  alert("Parceiro adicionada no sistema!");
};



