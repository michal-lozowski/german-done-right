fetch('questions.txt')
  .then(response => response.text())
  .then(questionsText => {
    questionsText = questionsText.replace(/\n/g,"<br>")
    const questions = questionsText.trim().split('_');
      
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

  });

var answers;

fetch('answers.txt')
  .then(response => response.text())
  .then(answersText => {
    answers = answersText.split('\n');
  });

document.addEventListener('DOMContentLoaded', () => {
console.log("dom done loading!!");
const answerFields = document.querySelectorAll("answerField");
answerFields.forEach(input => {
  input.addEventListener("keydown", event => {
    event.preventDefault();
    if (event.key === "Enter") {
       event.target.style.backgroundColor = "green";
    };
  });
});

});
