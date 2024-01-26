
let questionsText
let questions = []
let answers = []

async function mainclown() {
  const baseURL = window.location.href.endsWith('/') ? window.location.href : window.location.href + '/'
  const responseQuestions = await fetch(baseURL + "questions.txt")
  questionsText = await responseQuestions.text()
}

function sortQandA() {

  answers = questionsText.match(/\(.+\)/g)
  answers = answers.map(answer => [answer.slice(1, -1)])
  answers = answers.map(answer => {
    let bufferArray = answer[0].split(" $ ")
    return bufferArray
  })

  questionsText = questionsText.replace(/_\(.+\)/g, "")
  questions = questionsText.replace(/_+/g, "_");
  questions = questions.replace(/\n/g, "<br>").split('_');

}

function manipulateHtml() {
  container = document.getElementById('test-container')
  for (let i = 0; i < questions.length; i++) {
    const spantext = document.createElement('span')
    spantext.innerHTML = questions[i]
    if (i < questions.length - 1) {
      const input = document.createElement('input')
      const uniqueId = i
      input.setAttribute('type', 'text')
      input.setAttribute('id', uniqueId)
      input.setAttribute('class', "answerField")
      input.setAttribute('autocapitalize', "off")
      spantext.appendChild(input)
    }
    container.appendChild(spantext)
  }
}


function checkAnswers() {
  const answerFields = document.querySelectorAll(".answerField");
  let isCorrect = false
  answerFields.forEach(input => {
    input.addEventListener("blur", event => {
      let isCorrect = false
      answers[event.target.id].forEach(answer => {
        if ((event.target.value.trim() === answer)) isCorrect = true
        if (isCorrect) {
          event.target.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
        }
        else event.target.style.backgroundColor = "";
      })
    });

    input.addEventListener("keydown", event => {
      let isCorrect = false
      answers[event.target.id].forEach(answer => {
        if ((event.key === "Enter") && (event.target.value.trim() === answer)) isCorrect = true
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