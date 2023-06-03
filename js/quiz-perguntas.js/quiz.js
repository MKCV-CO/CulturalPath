"use strict"

const question = document.querySelector(".question")
const answers = document.querySelector(".answers")
const spanQtnd = document.querySelector(".spnQtd")
const textFinish = document.querySelector(".finish span")
const content = document.querySelector(".content")
const contentFinish = document.querySelector(".finish")
const btnRestart = document.querySelector(".finish button")

import questions from "./questions.js"

let currentIndex = 0
let questionCorrect = 0



btnRestart.onclick = () => {
    content.style.display = "flex"
    contentFinish.style.display = "flex"
    contentFinish.style.flexDirection = "row"
    contentFinish.style.gap = "5%"
    textFinish.style.display = "none"
    currentIndex = 0 
    questionCorrect = 0;
    loadQuestion()
}

function nextQuestion(e){
    if(e.target.getAttribute("data-correct") == "true"){
        questionCorrect++
    }
    if(currentIndex < questions.length - 1){
        currentIndex++
        loadQuestion()
        
    }
    else{
        finish()
    }
}


function finish() {
    if (questionCorrect > 5) {
        contentFinish.style.display = "flex";
        contentFinish.style.flexDirection = "column";
        textFinish.style.display = "flex"
        contentFinish.style.gap = "5%"
        textFinish.style.paddingBottom = "5%"
        textFinish.innerHTML = `Parabéns, você acertou ${questionCorrect} de ${questions.length} perguntas!`;
    } else {
        contentFinish.style.display = "flex";
        textFinish.style.display = "flex"
        contentFinish.style.flexDirection = "column";
        textFinish.style.paddingBottom = "5%"
        textFinish.innerHTML = `Poxa! Você acertou ${questionCorrect} de ${questions.length} perguntas. Continue praticando!`;
    }
    content.style.display = "none";
    contentFinish.style.display = "flex";
}



export function loadQuestion(){
    spanQtnd.innerHTML = `${currentIndex + 1}/${questions.length}`
    let item = questions[currentIndex];
    answers.innerHTML = ""
    question.innerHTML = item.question;

    item.answers.forEach((answer) => {
        const div = document.createElement("div")
        div.innerHTML = `
        <button class="answer" data-correct="${answer.correct}">
        ${answer.option}
        </button>`;

        answers.appendChild(div)

    })

    document.querySelectorAll(".answer").forEach((item) =>{
        item.addEventListener("click",nextQuestion)
    })
}

