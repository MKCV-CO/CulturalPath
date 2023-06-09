'use strict'
const path = window.location.pathname;

console.log(path);

let button__submit
let input__rg
let input__diploma

export const carregarForm = () => {
  getElementsForm()
  eventsForms()
}

const getElementsForm = () => {
  button__submit = document.getElementById('form__submit')
  input__rg = document.getElementById('imageInputRg')
  input__diploma = document.getElementById('imageInputDiploma')
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
  console.log(nome);
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
  console.log(contribuicao);


  if (nome, cpf, rg, email, telefone, data_nascimento, fotoRg, fotoDiploma, contribuicao, genero,
    estado_civil, logradouro, cep, complemento, numero, bairro, cidade, estado == null ||
    nome, cpf, rg, email, telefone, data_nascimento, fotoRg, fotoDiploma, contribuicao, genero,
    estado_civil, logradouro, cep, complemento, numero, bairro, cidade, estado == undefined
    || nome, cpf, rg, email, telefone, data_nascimento, fotoRg, fotoDiploma, contribuicao, genero,
    estado_civil, logradouro, cep, complemento, numero, bairro, cidade, estado == '') {

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
    } else if (contribuicao == undefined || contribuicao == '' || contribuicao == null) {
      iziToast.error({
        backgroundColor: '#FEB6BA',
        position: 'topCenter',
        title: 'FALHA AO CADASTRAR',
        message: 'O campo CONTRIBUIÇÃO não foi preenchido.',
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
  console.log();
  if (voluntario.status == '201') {
    iziToast.success({
      backgroundColor: '#A3E1B2',
      position: 'topCenter',
      title: 'SUCESSO AO GRAVAR',
      message: 'O voluntário foi cadastrado com sucesso.',
    });
  } else {
    iziToast.error({
      backgroundColor: '#FEB6BA',
      position: 'topCenter',
      title: 'FALHA AO CADASTRAR',
      message: 'O voluntário já foi cadastrado em nossas bases, em breve entraremos em contato.',
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