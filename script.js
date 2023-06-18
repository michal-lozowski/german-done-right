fetch('questions.txt')
  .then(response => response.text())
  .then(questionsText => {
    questionsText = questionsText.replace("\n","<br>")
    const questions = questionsText.trim().split('_');
      
    container = document.getElementById('test-container');
    for (let i = 0; i < questions.length; i++) {
      const text = document.createTextNode(questions[i]);
      container.appendChild(text);
      const input = document.createElement('input');
      const uniqueId = 'input_' + i; d 
      input.setAttribute('type', 'text');
      input.setAttribute('id', uniqueId);
      input.setAttribute('class', "answerField");   
      container.appendChild(input);
  };

  });

fetch('answers.txt')
  .then(response => response.text())
  .then(answersText => {
    const lines = answersText.split('\n');
    const answers = lines.map(line => line.split(','));
  });
