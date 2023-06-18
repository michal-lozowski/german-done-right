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
        const uniqueId = 'input_' + i;  
        input.setAttribute('type', 'text');
        input.setAttribute('id', uniqueId);
        input.setAttribute('class', "answerField"); 
        spantext.appendChild(input);      
        };
        container.appendChild(spantext);
      
  };

  });

fetch('answers.txt')
  .then(response => response.text())
  .then(answersText => {
    const lines = answersText.split('\n');
    const answers = lines.map(line => line.split(','));
  });
