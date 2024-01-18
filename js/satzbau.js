
let answers;

async function mainclown() {

  const baseURL = window.location.href.endsWith('/') ? window.location.href : window.location.href + '/';

  const responseQuestions = await fetch(baseURL + "questions.txt");
  let questionsText = await responseQuestions.text();

  answers = []
  answerFound = false
  answerCounter = -1
  dollarCounter = 0
  for (let i = 0; i < questionsText.length; i++) {
    if (questionsText[i - 2] === "_" && questionsText[i - 1] === "(") {
      answerFound = true
      dollarCounter = 0
      answerCounter++
    }
    if (questionsText[i] === "$") {
      dollarCounter++
      continue
    }
    if (questionsText[i] === ")") answerFound = false
    if (answerFound) {
      if (answers.length === answerCounter) answers.push([])
      if (answers[answerCounter].length === dollarCounter) answers[answerCounter].push("")
      answers[answerCounter][dollarCounter] = answers[answerCounter][dollarCounter] + questionsText[i]
    }
  }

  questionsText = questionsText.replace(/_\(.+\)/g, "_")

  let questions = questionsText.replace(/_+/g, "_");
  questions = questions.replace(/\r\n/g, "<br>").trim().split('_');

  container = document.getElementById('test-container');

  for (let i = 0; i < questions.length; i++) {
    const spantext = document.createElement('span');
    spantext.innerHTML = questions[i];
    if (i < questions.length - 1) {
      const input = document.createElement('input');
      const uniqueId = i;
      input.setAttribute('type', 'text');
      input.setAttribute('id', uniqueId);
      input.setAttribute('class', "answerField");
      input.setAttribute('autocapitalize', "off");
      spantext.appendChild(input);
    };
    container.appendChild(spantext);
  };
}

mainclown()
  .then(() => {

    const answerFields = document.querySelectorAll(".answerField");
    answerFields.forEach(input => {
      input.addEventListener("blur", event => {
        for (i = 0; i < answers[event.target.id].length; i++) {
          if ((event.target.value.trim() === answers[event.target.id][i])) {
            event.target.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
          }
          else if ((event.target.value.trim() === answers[event.target.id][i])) {
            event.target.style.backgroundColor = "";
          }
        }
      });

      input.addEventListener("keydown", event => {
        for (i = 0; i < answers[event.target.id].length; i++) {
          if ((event.key === "Enter") && (event.target.value.trim() === answers[event.target.id][i])) {
            event.target.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
            document.getElementById(parseInt(event.target.id) + 1).focus();
          }
          else if ((event.target.value.trim() === answers[event.target.id][i])) {
            event.target.style.backgroundColor = "";
          }
        }
      })
    });
  });


