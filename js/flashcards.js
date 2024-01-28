
let vocabText
let questions = []
let answers = []
let shownQuestions = []
let randomNumber
let timerWasCalled
let answeredQuestionsCounter = 0

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

  answers = answers.map(answer => [answer.trim()])
  answers = answers.map(answer => {
    let bufferArray = answer[0].split(" $ ")
    return bufferArray
  })
}

function getRandomQuestionNumber() {
  if (answeredQuestionsCounter !== questions.length) {
    do {
      randomNumber = Math.floor(Math.random() * questions.length)
    } while (shownQuestions.includes(randomNumber))
    shownQuestions.push(randomNumber)
  }
}

function manipulateHtml() {
  container = document.getElementById('test-container')

  const spantext = document.createElement('span')
  if (answeredQuestionsCounter !== questions.length) spantext.innerHTML = questions[randomNumber] + " "
  else spantext.innerHTML = "geschafft!"

  const input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.setAttribute('id', randomNumber)
  input.setAttribute('class', "input")
  input.setAttribute('autocapitalize', "off")

  container.appendChild(spantext)
  if (answeredQuestionsCounter !== questions.length) container.appendChild(input)

  const blankspace = document.createElement('span')
  blankspace.innerHTML = " "
  container.appendChild(blankspace)

  const timer = document.createElement('span')
  timer.innerHTML = " "
  timer.setAttribute("id", "timer")
  container.appendChild(timer)

  const spelling = document.createElement("span")
  spelling.innerHTML = "<br><br> ä=oe ö=oe ü=ue ß=ss<br>"
  container.appendChild(spelling)

  const achievements = document.createElement('p')
  achievements.innerHTML = "Fragen erfolgreich beantwortet: " + (answeredQuestionsCounter) + " von " + questions.length
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
          answeredQuestionsCounter++
          getRandomQuestionNumber()
          manipulateHtml()
          checkAnswer()
        }, 400)
      }
    }
    const countdownInterval = setInterval(countdown, 450)
  }
}

function checkAnswer() {
  let isCorrect = false

  document.getElementById(randomNumber).addEventListener("blur", event => {
    answers[event.target.id].forEach(answer => {
      let originalInput = event.target.value.trim()
      let umlautInput = originalInput.replace("ae", "ä").replace("oe", "ö").replace("ue", "ü")
      let eszetInput = umlautInput.replace("ss", "ß")
      if (originalInput === answer || umlautInput === answer || eszetInput === answer) isCorrect = true
      if (isCorrect) {
        event.target.style.backgroundColor = "rgba(0, 128, 0, 0.5)"
        setTimer()
      }
    })
  })

  document.getElementById(randomNumber).addEventListener("keydown", event => {
    answers[event.target.id].forEach(answer => {
      let originalInput = event.target.value.trim()
      let umlautInput = originalInput.replace("ae", "ä").replace("oe", "ö").replace("ue", "ü")
      let eszetInput = umlautInput.replace("ss", "ß")
      if (event.key === "Enter" && (originalInput === answer || umlautInput === answer || eszetInput === answer)) isCorrect = true
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