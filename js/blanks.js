let answers;

async function mainclown() {

  const responseQuestions = await fetch ("questions.txt");
  const questionsText = await responseQuestions.text();
  const responseAnswers = await fetch ("answers.txt");
  const answersText = await responseAnswers.text();

  answers = answersText.split('\n');
  let questions = questionsText.replace(/_+/g,"_");
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
          if ((event.target.value.trim() === answers[event.target.id])) {
            event.target.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
          };
        });
        input.addEventListener("keydown", event => {
          if ((event.key === "Enter") && (event.target.value.trim() === answers[event.target.id])) {
            event.target.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
            document.getElementById(parseInt(event.target.id) + 1).focus();
          };
        })
      });
    });
  

