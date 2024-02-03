
let vocabText
let questions = []
let answers = []
let shownQuestions = []
let randomNumber
let timerFunctionWasCalled
let answeredQuestionsCounter = 0
let timerActivated = true
let attemptsCounter = 0

async function mainclown() {
  const baseURL = window.location.href.endsWith('/') ? window.location.href : window.location.href + '/'
  const responseVocab = await fetch(baseURL + "vocab.txt")
  vocabText = await responseVocab.text()
}

function sortQandA() {
  questions = vocabText.split("\n")
  questions = questions.filter(question => question.length > 4)
  questions = questions.map(question => {
    let separatorIndex = question.search(/-/)
    let answer = question.slice(0, separatorIndex - 1)
    answers.push(answer)
    return (question.slice(separatorIndex + 2))
  })

  answers = answers.map(answer => [answer])
  answers = answers.map(answer => {
    let bufferArray = answer[0].split(" $ ")
    bufferArray = bufferArray.map(element => element.trim())
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

  const linebreakA = document.createElement('p')
  linebreakA.setAttribute("id", "linebreakA")
  blankspace.innerHTML = " "
  container.appendChild(linebreakA)

  const checkboxText = document.createElement("span")
  checkboxText.setAttribute("id", "checkboxText")
  checkboxText.innerHTML = "Timer soll laufen "
  container.appendChild(checkboxText)

  const timerCheckbox = document.createElement("input")
  timerCheckbox.setAttribute("type", "checkbox")
  timerCheckbox.setAttribute("id", "timerCheckbox")
  if (timerActivated) timerCheckbox.setAttribute("checked", "true")
  else timerCheckbox.removeAttribute("checked")
  container.appendChild(timerCheckbox)

  const spelling = document.createElement("span")
  spelling.innerHTML = "<br><br> ä=ae ö=oe ü=ue ß=ss<br>"
  container.appendChild(spelling)

  const achievements = document.createElement('p')
  achievements.innerHTML = "Fragen erfolgreich beantwortet: " + (answeredQuestionsCounter) + " von insgesamt " + questions.length
  achievements.setAttribute("id", "achievements")
  container.appendChild(achievements)

  setInterval(document.getElementById(randomNumber).focus(), 500)
}

function addTip() {

  if (attemptsCounter === 1) {
    attemptsCounter++
    const tipSuggestion = document.createElement("span")
    tipSuggestion.setAttribute("id", "tipSuggestion")
    tipSuggestion.innerHTML = "die richtige Antwort zeigen? "
    tipSuggestion.style.cursor = "pointer"

    const tip = document.createElement("span")
    tip.setAttribute("id", "tip")
    let tipAnswer = answers[randomNumber].map(answer => answer = " " + answer)
    tip.innerHTML = tipAnswer
    tip.style.visibility = "hidden"

    const linebreakB = document.createElement('p')
    linebreakB.innerHTML = " "

    const container = document.getElementById("test-container")
    container.appendChild(linebreakB)
    container.appendChild(tipSuggestion)
    container.appendChild(tip)

    document.getElementById("tipSuggestion").addEventListener("click", event => {
      if (tip.style.visibility === "visible") {
        tip.style.visibility = "hidden"
      } else tip.style.visibility = "visible"
    })
  }

}

function setTimer() {
  if (!timerActivated && !timerFunctionWasCalled) {
    timerFunctionWasCalled = true
    nextFlashcard()
  } else {
    let seconds = 3
    if (!timerFunctionWasCalled) {
      timerFunctionWasCalled = true
      document.getElementById("timer").innerHTML = seconds
      function countdown() {
        if (seconds !== 0) {
          seconds--
          document.getElementById("timer").innerHTML = seconds
        }
        if (seconds === 0) {
          clearInterval(countdownInterval)
          setTimeout(() => {
            nextFlashcard()
          }, 350)
        }
      }
      const countdownInterval = setInterval(countdown, 450)
    }
  }
}

function checkAnswer() {
  let isCorrect = false

  document.getElementById(randomNumber).addEventListener("blur", event => {
    answers[event.target.id].forEach(answer => {
      let originalInput = event.target.value.trim()
      let umlautInput = originalInput.replace("ae", "ä").replace("oe", "ö").replace("ue", "ü")
      let eszetInput = umlautInput.replace("ss", "ß")
      if (originalInput === answer || umlautInput === answer || eszetInput === answer) {
        isCorrect = true
      }
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
      if (event.key === "Enter") {
        if (originalInput === answer || umlautInput === answer || eszetInput === answer) {
          isCorrect = true
        } else attemptsCounter++
      }
    })
    if (isCorrect) {
      event.target.style.backgroundColor = "rgba(0, 128, 0, 0.5)"
      setTimer()
    } else addTip()
  })
}

function scaleInputField() {
  document.getElementById(randomNumber).addEventListener("input", event => {
    if (event.target.value.length > 20 && event.target.value.length < 60) event.target.style.width = event.target.value.length * 8 + "px"
    if (event.target.value.length < 20) event.target.style.width = ""
    if (event.target.value.length > 60) event.target.style.width = 60 * 9 + px
  })
}

function checkTimerCheckbox() {
  document.getElementById("timerCheckbox").addEventListener("change", event => {
    if (event.target.checked) timerActivated = true
    else timerActivated = false
  })
}

function nextFlashcard() {
  document.getElementById('test-container').innerHTML = ""
  timerFunctionWasCalled = false
  attemptsCounter = 0
  answeredQuestionsCounter++
  getRandomQuestionNumber()
  manipulateHtml()
  scaleInputField()
  checkAnswer()
  checkTimerCheckbox()
}

async function starter() {
  await mainclown()
  sortQandA()
  getRandomQuestionNumber()
  manipulateHtml()
  scaleInputField()
  checkAnswer()
  checkTimerCheckbox()
}

starter()