let answers;

async function mainclown() {

  const responsequestions = await fetch ("questions.txt");
  const questionsText = await responsequestions.text();
  const responseanswers = await fetch ("answers.txt");
  const answersText = await responseanswers.text();

  answers = answersText.split('\n');
  const questions = questionsText.replace(/\n/g, "<br>").trim().split('_');
        
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
      spantext.appendChild(input);      
      };
    container.appendChild(spantext);
  };   
}

mainclown()
  .then(() => {
      const answerFields = document.querySelectorAll(".answerField");
      answerFields.forEach(input => {
        input.addEventListener("keyup", event => {
          if (event.key === Enter && event.target.value.trim() === answers[event.target.id]) {
            event.target.style.backgroundColor = "green";
          };
        });
      });
    });
  



















