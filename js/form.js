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
          if(upload__local == 'imageInputRg'){
            urlRg = downloadURL
          }else{
            urlDiploma = downloadURL
          }
          
        })
      }
    ) 

    if(url != undefined) {
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
      logradouro: logradouro ,
      cep: cep,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cidade: cidade,
      estado: estado
    }
    let jsonVoluntario = {voluntario: jsonDadosPessoais, endereco: jsonDadosEndereco}
    console.log(jsonVoluntario);
    
    postVoluntarioApi(jsonVoluntario)

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

    const url = 'http://localhost:8080/v1/cultural-path/voluntario';
    const response = await fetch(url, initPost);
    const voluntario = await response.json()
    alert('Voluntário adicionada no sistema!');
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