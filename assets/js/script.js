const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const answersCorrect = 0;

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
  
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
      
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: '¿Cúal fue el primer lenguaje de programación moderno?',
    answers: [
      { text: 'Fortran', correct: true },
      { text: 'HTML', correct: false },
      { text: 'Cobol', correct: false },
      { text: 'JavaScript', correct: false }
    ]
  },
  {
    question: '¿Cómo se llaman los profes de Programación?',
    answers: [
      { text: 'Nico y Fede', correct: true },
      { text: 'Nicolas y Ezequiel', correct: false},
      { text: 'Nicolás y Federico', correct: true },
      { text: 'Fede y Marcos', correct: false }
    ]
  },
  {
    question: 'Es divertido programar?',
    answers: [
      { text: 'No', correct: false },
      { text: 'SI!', correct: true },
      { text: 'Poco', correct: false },
      { text: 'A veces', correct: false }
    ]
  },
  {
    question: '¿Cúal es el lenguaje de las computadoras?',
    answers: [
      { text: 'Sistema operativo', correct: false },
      { text: 'Hexadecimal', correct: false },
      { text: 'Binario', correct: true },
      { text: 'CSS', correct: false }
    ]
  }
]

