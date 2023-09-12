let answers;

async function mainclown() {

  const responseQuestions = await fetch("questions.txt");
  const questionsText = await responseQuestions.text();
  const responseAnswers = await fetch("answers.txt");
  const answersText = await responseAnswers.text();

  answers = answersText.split('\n');
  answers = answers.map(line => line.split(' $ '));

  let questions = questionsText.replace(/_+/g, "_");
  questions = questions.replace(/\n/g, "<br>").trim().split('_');

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


