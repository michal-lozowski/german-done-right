fetch('questions.txt')
  .then(response => response.text())
  .then(questionsText => {
    questionsText = questionsText.replace(/\n/g,"<br>")
    const questions = questionsText.trim().split('_');
      
    container = document.getElementById('test-container');
    for (let i = 0; i < questions.length; i++) {
      
      const divtext = document.createElement('div');
      divtext.innerHTML = questions[i];
      container.appendChild(divtext);

      const input = document.createElement('input');
      const uniqueId = 'input_' + i;  
      input.setAttribute('type', 'text');
      input.setAttribute('id', uniqueId);
      input.setAttribute('class', "answerField"); 
      input.style.display = 'inline';

      container.appendChild(input);
  };

  });

fetch('answers.txt')
  .then(response => response.text())
  .then(answersText => {
    const lines = answersText.split('\n');
    const answers = lines.map(line => line.split(','));
  });
