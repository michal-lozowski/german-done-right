
let vocabText
let questions = []
let answers = []
let shownQuestions = []
let randomNumber
let timerWasCalled

async function mainclown() {
  const baseURL = window.location.href.endsWith('/') ? window.location.href : window.location.href + '/'
  const responseVocab = await fetch(baseURL + "vocab.txt")
  vocabText = await responseVocab.text()
}

function sortQandA() {
  questions = vocabText.split("\n")
  questions = questions.map(question => {
    let separatorIndex = question.search(/-/)
    let answer = question.slice(0, separatorIndex - 1)
    answers.push(answer)
    return (question.slice(separatorIndex + 2))
  })

  answers = answers.map(answer => [answer])
  answers = answers.map(answer => {
    let bufferArray = answer[0].split(" $ ")
    return bufferArray
  })
}

function getRandomQuestionNumber() {
  do {
    randomNumber = Math.floor(Math.random() * questions.length)
  } while (shownQuestions.includes(randomNumber))
  shownQuestions.push(randomNumber)
}

function manipulateHtml() {
  container = document.getElementById('test-container')

  const spantext = document.createElement('span')
  if (shownQuestions.length !== questions.length) spantext.innerHTML = questions[randomNumber] + " "
  else spantext.innerHTML = "geschafft!"

  const input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.setAttribute('id', randomNumber)
  input.setAttribute('class', "input")
  input.setAttribute('autocapitalize', "off")

  container.appendChild(spantext)
  if (shownQuestions.length !== questions.length) container.appendChild(input)

  const blankspace = document.createElement('span')
  blankspace.innerHTML = " "
  container.appendChild(blankspace)

  const timer = document.createElement('span')
  timer.innerHTML = " "
  timer.setAttribute("id", "timer")
  container.appendChild(timer)

  const achievements = document.createElement('p')
  achievements.innerHTML = "Fragen erfolgreich beantwortet: " + (shownQuestions.length - 1)
  achievements.setAttribute("id", "achievements")
  container.appendChild(achievements)

  setInterval(document.getElementById(randomNumber).focus(), 500)
}

function setTimer() {
  let seconds = 3
  if (!timerWasCalled) {
    timerWasCalled = true
    document.getElementById("timer").innerHTML = seconds
    function countdown() {
      if (seconds !== 0) {
        seconds--
        document.getElementById("timer").innerHTML = seconds
      }
      if (seconds === 0) {
        clearInterval(countdownInterval)
        setTimeout(() => {
          document.getElementById('test-container').innerHTML = ""
          timerWasCalled = false
          getRandomQuestionNumber()
          manipulateHtml()
          checkAnswer()
        }, 500)
      }
    }
    const countdownInterval = setInterval(countdown, 800)
  }
}

function checkAnswer() {
  let isCorrect = false

  document.getElementById(randomNumber).addEventListener("blur", event => {
    answers[event.target.id].forEach(option => {
      if (event.target.value.trim() === option) isCorrect = true
      if (isCorrect) {
        event.target.style.backgroundColor = "rgba(0, 128, 0, 0.5)"
        setTimer()
      }
    })
  })

  document.getElementById(randomNumber).addEventListener("keydown", event => {
    answers[event.target.id].forEach(option => {
      if (event.key === "Enter" && event.target.value.trim() === option) isCorrect = true
      if (isCorrect) {
        event.target.style.backgroundColor = "rgba(0, 128, 0, 0.5)"
        setTimer()
      }
    })
  })
}

async function starter() {
  await mainclown()
  sortQandA()
  getRandomQuestionNumber()
  manipulateHtml()
  checkAnswer()
}

starter()