
let questionsText
let questions = []
let answers = []

async function mainclown() {
  const baseURL = window.location.href.endsWith('/') ? window.location.href : window.location.href + '/'
  const responseQuestions = await fetch(baseURL + "questions.txt")
  questionsText = await responseQuestions.text()
}

function sortQandA() {

  answers = questionsText.match(/_\(.+?\)/g)
  answers = answers.map(answer => [answer.slice(2, -1)])
  answers = answers.map(answer => {
    let bufferArray = answer[0].split(" $ ")
    return bufferArray
  })
  answers = answers.map(arr => arr.map(answer => answer.trim()))

  questionsText = questionsText.replace(/_/g, "__")
  questionsText = questionsText.replace(/_\(.+?\)/g, "")
  questions = questionsText.replace(/_+/g, "_");
  questions = questions.replace(/\r\n/g, "<br>").split('_');

}

function manipulateHtml() {
  container = document.getElementById('test-container')
  const spelling = document.createElement("span")
  spelling.innerHTML = "ä=oe ö=oe ü=ue ß=ss<br><br>"
  container.appendChild(spelling)
  for (let i = 0; i < questions.length; i++) {
    const spantext = document.createElement('span')
    spantext.innerHTML = questions[i]
    if (i < questions.length - 1) {
      const input = document.createElement('input')
      input.setAttribute('type', 'text')
      input.setAttribute('id', i)
      input.setAttribute('class', "answerField")
      input.setAttribute('autocapitalize', "off")
      spantext.appendChild(input)
    }
    container.appendChild(spantext)
  }
}


function checkAnswers() {
  const answerFields = document.querySelectorAll(".answerField");
  answerFields.forEach(input => {
    input.addEventListener("blur", event => {
      let isCorrect = false
      answers[event.target.id].forEach(answer => {
        let originalInput = event.target.value.trim()
        let umlautInput = originalInput.replace("ae", "ä").replace("oe", "ö").replace("ue", "ü")
        let eszetInput = umlautInput.replace("ss", "ß")
        if (originalInput === answer || umlautInput === answer || eszetInput === answer) isCorrect = true
        if (isCorrect) {
          event.target.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
        }
        else event.target.style.backgroundColor = "";
      })
    });

    input.addEventListener("keydown", event => {
      let isCorrect = false
      answers[event.target.id].forEach(answer => {
        let originalInput = event.target.value.trim()
        let umlautInput = originalInput.replace("ae", "ä").replace("oe", "ö").replace("ue", "ü")
        let eszetInput = umlautInput.replace("ss", "ß")
        if (event.key === "Enter" && (originalInput === answer || umlautInput === answer || eszetInput === answer)) isCorrect = true
        if (isCorrect) {
          event.target.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
          document.getElementById(parseInt(event.target.id) + 1).focus();
        }
        else event.target.style.backgroundColor = "";
      })
    })
  });
}

mainclown()
  .then(() => {
    sortQandA()
    manipulateHtml()
    checkAnswers()
  })