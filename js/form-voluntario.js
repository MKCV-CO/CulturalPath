'use strict'
const path = window.location.pathname;
import { alterColor } from './header-footer.js';

console.log(path);

let button__submit
let input__rg
let input__diploma

export const loadScreenVoluntario = () => {
  alterColor('#7675DC')
  getElementsForm()
  eventsForms()
  formatDate()
}

const getElementsForm = () => {
  button__submit = document.getElementById('form__submit')
  input__rg = document.getElementById('imageInputRg')
  input__diploma = document.getElementById('imageInputDiploma')
}

function validarCPF(cpf) {
  // Remove os pontos e traços do CPF
  cpf = cpf.replace(/\./g, '').replace(/-/g, '');

  // Verifica se o CPF possui 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais, o que é inválido para um CPF válido
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let primeiroDigito = 11 - (soma % 11);
  if (primeiroDigito > 9) {
    primeiroDigito = 0;
  }

  // Verifica se o primeiro dígito verificador está correto
  if (parseInt(cpf.charAt(9)) !== primeiroDigito) {
    return false;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let segundoDigito = 11 - (soma % 11);
  if (segundoDigito > 9) {
    segundoDigito = 0;
  }

  // Verifica se o segundo dígito verificador está correto
  if (parseInt(cpf.charAt(10)) !== segundoDigito) {
    return false;
  }

  // Se todas as verificações passaram, o CPF é válido
  return true;
}



var firebaseConfig = {
  apiKey: 'AIzaSyDwrJfuzsQn3DNsI7QjGorZqvdFEXcQzMs',
  authDomain: 'culturalpath-f11f9.firebaseapp.com',
  projectId: 'culturalpath-f11f9',
  storageBucket: 'culturalpath-f11f9.appspot.com',
  messagingSenderId: '721761154595',
  appId: '1:721761154595:web:ea111175b670097618e396',
  measurementId: 'G-FFD5H0QTR2'
}

firebase.initializeApp(firebaseConfig)

let urlRg
let urlDiploma

// Função para realizar o upload da imagem
function uploadImage(upload__local) {
  var fileInput = document.getElementById(`${upload__local}`)
  iziToast.info({
    title: 'UPLOAD',
    message: 'Aguarde o fim do upload!',
  });
  // LEMBRAR DE PUXAR TODOS OS ARQUIVOS >> AQUI SÓ PUXA UMMMM
  // var file = fileInput.files[0]
  var url = undefined
  var file = fileInput.files[0]
  var storageRef = firebase.storage().ref()
  var imageRef = storageRef.child('imagens/' + file.name)
  var uploadTask = imageRef.put(file)

  // Acompanhar o progresso do upload
  uploadTask.on(
    'state_changed',
    function (snapshot) {
      // Acompanhar o progresso do upload (opcional)
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Progresso do Upload: ' + progress + '%')
    },
    function (error) {
      // Tratar erros durante o upload
      console.error('Erro no upload:', error)
    },

    function () {
      // Upload concluído com sucesso
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('Imagem enviada com sucesso:', downloadURL)
        if (upload__local == 'imageInputRg') {
          urlRg = downloadURL
          iziToast.success({
            title: 'UPLOAD',
            message: 'Foto do rg cadastrado',
          });
        } else {
          urlDiploma = downloadURL
          iziToast.success({
            title: 'UPLOAD',
            message: 'Foto do diploma cadastrado',
          });
        }

      })
    }
  )

  if (url != undefined) {
    return url
  }

}





const handleSubmit = async () => {
  const nome = document.getElementById('nome').value
  const cpf = document.getElementById('cpf').value
  const rg = document.getElementById('rg').value
  const email = document.getElementById('email').value
  const telefone = document.getElementById('telefone').value
  let data_brasileira = document.getElementById('dt_nasc').value
  const data_nascimento = data_brasileira.split('/').reverse().join('-');
  let fotoRg = urlRg
  let fotoDiploma = urlDiploma
  let contribuicao = document.getElementById('contribuicao__text').value
  const genero = document.getElementById('genero').selectedIndex + 1
  const estado_civil = document.getElementById('civil').selectedIndex + 1
  const logradouro = document.getElementById('endereco').value
  const cep = document.getElementById('cep').value
  const complemento = document.getElementById('complemento').value
  const numero = document.getElementById('numero').value
  const bairro = document.getElementById('bairro').value
  const cidade = document.getElementById('cidade').value
  const estado = document.getElementById('estado').value

  if (
    nome == null || nome == undefined || nome == '' ||
    cpf == null || cpf == undefined || cpf == '' ||
    rg == null || rg == undefined || rg == '' ||
    email == null || email == undefined || email == '' ||
    telefone == null || telefone == undefined || telefone == '' ||
    data_nascimento == null || data_nascimento == undefined || data_nascimento == '' ||
    contribuicao == null || contribuicao == undefined || contribuicao == '' ||
    genero == null || genero == undefined || genero == '' ||
    estado_civil == null || estado_civil == undefined || estado_civil == '' ||
    logradouro == null || logradouro == undefined || logradouro == '' ||
    cep == null || cep == undefined || cep == '' ||
    complemento == null || complemento == undefined || complemento == '' ||
    numero == null || numero == undefined || numero == '' ||
    bairro == null || bairro == undefined || bairro == '' ||
    cidade == null || cidade == undefined || cidade == '' ||
    estado == null || estado == undefined || estado == ''

  ) {

    iziToast.error({
      backgroundColor: '#FEB6BA',
      position: 'topCenter',
      title: 'ERRO AO CADASTRAR',
      message: 'Um ou mais dados não foram preenchidos',
    });

  } else {

    if (fotoRg == undefined || fotoRg == '' || fotoRg == null) {
      iziToast.error({
        backgroundColor: '#FEB6BA',
        position: 'topCenter',
        title: 'FALHA AO CADASTRAR',
        message: 'A foto do RG não foi inserida ou o upload não foi completado, aguarde ou reenvie.',
      });
    } else if (fotoDiploma == undefined || fotoDiploma == '' || fotoDiploma == null) {
      iziToast.error({
        backgroundColor: '#FEB6BA',
        position: 'topCenter',
        title: 'FALHA AO CADASTRAR',
        message: 'A foto do DIPLOMA não foi inserida ou o upload não foi completado, aguarde ou reenvie.',
      });
    } else if (!validarCPF(cpf)) {
      iziToast.error({
        backgroundColor: '#FEB6BA',
        position: 'topCenter',
        title: 'ERRO AO CADASTRAR',
        message: 'O CPF preenchido é inválido',
      });
    }
    else {

      let jsonDadosPessoais = {
        nome: nome,
        cpf: cpf,
        rg: rg,
        email: email,
        telefone: telefone,
        data_nascimento: data_nascimento,
        foto_rg: fotoRg,
        foto_diploma: fotoDiploma,
        contribuicao: contribuicao,
        id_genero: genero,
        id_estado_civil: estado_civil
      }
      let jsonDadosEndereco = {
        logradouro: logradouro,
        cep: cep,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado
      }
      let jsonVoluntario = { voluntario: jsonDadosPessoais, endereco: jsonDadosEndereco }
      console.log(jsonVoluntario);


      postVoluntarioApi(jsonVoluntario)
    }
  }

}

const postVoluntarioApi = async (dadosBody) => {

  const dataBody = dadosBody

  const initPost = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataBody)
  }

  const url = 'https://api-culturalpath.up.railway.app/v1/cultural-path/voluntario';
  const response = await fetch(url, initPost);
  const voluntario = await response.json()
  if (voluntario.status == '201') {
    iziToast.success({
      backgroundColor: '#A3E1B2',
      position: 'topCenter',
      title: 'SUCESSO AO GRAVAR',
      message: 'O voluntário foi cadastrado com sucesso.',
    });
  } else if (voluntario.status == '404') {
    iziToast.error({
      backgroundColor: '#FEB6BA',
      position: 'topCenter',
      title: 'FALHA AO CADASTRAR',
      message: 'O voluntário já foi cadastrado em nossas bases, em breve entraremos em contato.',
    });
  } else {
    iziToast.error({
      backgroundColor: '#FEB6BA',
      position: 'topCenter',
      title: 'FALHA AO CADASTRAR',
      message: 'O servidor de banco de dados está fora do ar, entre em contato com o nosso suporte (11) 3333-3333.',
    });
  }

}



const handleRg = () => {
  uploadImage('imageInputRg')
}

const handleDiploma = () => {
  uploadImage('imageInputDiploma')
}


const eventsForms = () => {

  input__rg.addEventListener('change', handleRg)
  input__diploma.addEventListener('change', handleDiploma)
  button__submit.addEventListener('click', handleSubmit)
}

const formatDate = () => {
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
