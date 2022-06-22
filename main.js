const startQuiz = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionCont = document.getElementById("question-container")
const questionEl = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const initialElement = document.getElementById("initial-container")
let score = document.getElementById("score")
const submit = document.getElementById("submitButton")
const initialDisplay = document.getElementById("initial-display")

let shuffledQuestions, currentQuestionIndex
let correctChoice;
let totalScore;
let quizDone;
let count = 30;


startQuiz.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})
submit.addEventListener("click", (e) => {
    e.preventDefault()
    let initials = document.forms["submit-initials"]["initials"].value;
    initialElement.classList.add("hide")
    initialDisplay.classList.remove("hide")
    let para = document.createElement('p')
    para.innerText = initials + "-" + totalScore + "%"
    initialDisplay.append(para)
    // initialDisplay.innerText = initials + totalScore
    console.log(initials + totalScore)
})



function startGame() {
    count = 30;
    startTimer()
    totalScore = 0
    correctChoice = 0
    quizDone = false
    startQuiz.classList.add("hide")
    initialDisplay.classList.add("hide")
    shuffledQuestions = questions.sort()
    currentQuestionIndex = 0
    questionCont.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtons.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (correct) {
        correctChoice++
    } else {
        count = count - 5;
    }
    // setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        questionCont.classList.add("hide")
        initialElement.classList.remove("hide")
        startQuiz.innerText = "Restart"
        startQuiz.classList.remove("hide")
        totalScore = (correctChoice / 5) * 100
        score.textContent = "Your Score is: " + totalScore + "%"
        quizDone = true
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

function startTimer() {
    // var count = 30
    var interval = setInterval(function(){
        document.getElementById('count').innerHTML=count;
        count--;

        if (count <= 0 || quizDone){
            clearInterval(interval);
            questionCont.classList.add("hide")
            startQuiz.innerText = "Restart"
            startQuiz.classList.remove("hide")
            totalScore = (correctChoice / 5) * 100
            initialElement.classList.remove("hide")
            score.textContent = "Your Score is: " + totalScore + "%"
            console.log(totalScore)
    // or...
    // alert("You're out of time!");
  }
}, 1000);

// button.addEventListener("click", selectAnswer)

}

const questions = [
    {
        question: "Commonly Used Data Types DO not include?",
        answers: [
            {text: "Strings", correct: false},
            {text: "Booleans", correct: false},
            {text: "Alerts", correct: true},
            {text: "Numbers", correct: false},
        ]
    },
    {
        question: "The condition in an if/else statement is encloes with?",
        answers: [
            {text: "Quotes", correct: false},
            {text: "Curly Brackets", correct: true},
            {text: "Parenthesis", correct: false},
            {text: "Square Brackets", correct: false},
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store?",
        answers: [
            {text: "Numbers and Strings", correct: false},
            {text: "Other Arrays", correct: false},
            {text: "Booleans", correct: false},
            {text: "All the Above", correct: true},
        ]
    },
    {
        question: "String values must be enclosed within___ when beimg assigned to variables?",
        answers: [
            {text: "Commas", correct: true},
            {text: "Curly Brackets", correct: false},
            {text: "Quotes", correct: false},
            {text: "Parenthesis", correct: false},
        ]
    },
    {
        question: "A useful tool for debugging to print content to the debugger is?",
        answers: [
            {text: "JavaScript", correct: false},
            {text: "Terminal/Bash", correct: false},
            {text: "For Loops", correct: false},
            {text: "console.log", correct: true},
        ]
    }
]

// const startQuiz = document.getElementById("start-btn")
// const answerChoice = document.getElementById("answer-buttons")
// const questionContainer = document.getElementById("question-container")
// const question = document.getElementById("question")
// const answer1 = document.getElementById("answer1")
// const answer2 = document.getElementById("answer2")
// const answer3 = document.getElementById("answer3")
// const answer4 = document.getElementById("answer4")

// startQuiz.addEventListener("click", startGame)

// function startGame() {
//     console.log("Quiz Started")
//     startQuiz.classList.add("hide")
//     questionContainer.classList.remove("hide")
//     question.textContent = "What is 2 + 2?";
//     answer1.innerText = "1";
//     answer2.innerText = "2";
//     answer3.innerText = "3";
//     answer4.innerText = "4";
//     selectAnswer();
// }

// function nextQuestion() {

// }

// function selectAnswer() {
//     answerChoice.addEventListener("click", function(e){
//         let answer = e.target
//         if (answer.innerText == "4") {
//             alert("Correct!")
//         } else {
//             alert("Incorrect!")
//         }
//     })
// }