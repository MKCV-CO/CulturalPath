'use strict'

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
     
      function async () {
        // Upload concluído com sucesso
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('Imagem enviada com sucesso:', downloadURL)
          url = downloadURL
          
        })
      }
    ) 

    if(url != undefined) {
        return url   
    }

  }

const button__submit = document.getElementById('form__submit')

const botao2 = document.getElementById('botao2')

const handleSubmit = async () => {
    // const telefone = document.getElementById('telefone').value
    const fotoRg = await uploadImage('imageInputRg')
    // const nome = document.getElementById('nome').value
    // const cpf = document.getElementById('cpf').value
    // const rg = document.getElementById('rg').value
    // const email = document.getElementById('email').value
 

    
    

     console.log('aaaaa ' + fotoRg);
    

    console.log(button__submit.value);
    
    
    let jsonVoluntario = {}
    let jsonDadosPessoais = {}
    let jsonDadosEndereco = {}



}




button__submit.addEventListener('click', handleSubmit)
