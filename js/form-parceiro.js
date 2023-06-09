"use strict";
const path = window.location.pathname;
import { alterColor } from './header-footer.js';

console.log(path);

export const loadScreenParceiro = () => {
  alterColor('#E99922')
  const botao = document.getElementById("parceiro__form__button");
  botao.addEventListener("click", handleSubmit);
};

const handleSubmit = async () => {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const razao_social = document.getElementById("razao").value;
  const cnpj = document.getElementById("cnpj").value;
  const mensagem = document.getElementById("motivo").selectedIndex + 1;
  const id_tipo_contato = document.querySelector(
    "#radio__contato:checked");

  if (
    nome == null || nome == undefined || nome == "" ||
    email == null || email == undefined || email == "" ||
    telefone == null || telefone == undefined || telefone == "" ||
    razao_social == null || razao_social == undefined || razao_social == "" ||
    cnpj == null || cnpj == undefined || cnpj == "" ||
    mensagem == null || mensagem == undefined || mensagem == "" ||
    id_tipo_contato == null || id_tipo_contato == undefined || id_tipo_contato == ""
  ) {
    iziToast.error({
      backgroundColor: '#FEB6BA',
      position: 'topCenter',
      title: 'ERRO AO CADASTRAR',
      message: 'Um ou mais dados não foram preenchidos',
    });
  } else {

    let jsonDados = {
      cnpj: cnpj,
      razao_social: razao_social,
      email: email,
      telefone: telefone,
      id_mensagem: mensagem,
      id_tipo_contato: Number(id_tipo_contato.value)
    };

    postParceiroApi(jsonDados);
  }
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

  const url = "https://api-culturalpath.up.railway.app/v1/cultural-path/empresa";
  const response = await fetch(url, initPost);
  const voluntario = await response.json();
  iziToast.success({
    backgroundColor: '#A3E1B2',
    position: 'topCenter',
    title: 'SUCESSO AO GRAVAR',
    message: 'O formulário foi gravado com sucesso.',
  });
};



