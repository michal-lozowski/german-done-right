//take 2 txt files questions.txt and answers.txt and produce an html for an interactive fill-in-the-blanks exercise out of it 
let answers;

async function mainclown() {
  //check if there is a slash at the end of the url and add one if necessary
  const baseURL = window.location.href.endsWith('/') ? window.location.href : window.location.href + '/';
  //get the answers and the questions text from corresponding files
  const responseQuestions = await fetch(baseURL + "questions.txt");
  const questionsText = await responseQuestions.text();
  const responseAnswers = await fetch(baseURL + "answers.txt");
  const answersText = await responseAnswers.text();
  //answers are divided by line breaks, multiple correct answers are divided by $, make a 2-dimensional array
  answers = answersText.split('\n');
  answers = answers.map(line => line.split(' $ '));
  //places in the questions text where an input field has to be inserted are marked with one or possibly multiple undersocer(s) 
  let questions = questionsText.replace(/_+/g, "_");
  questions = questions.replace(/\n/g, "<br>").trim().split('_');

  container = document.getElementById('test-container');
  //each piece of text goes to a separate span, between spans where there initially were underscores we now place the input fields 
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
    //if an input field has been in focus and then the focus is lost AND the input is correct - highlight the input field in green
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
      //if enter is hit the correctness of the input is checked (highlight in green if correct) and the focus is switched to the next input field  
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


