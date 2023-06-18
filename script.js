fetch('questions.txt')
  .then(response => response.text())
  .then(questionsText => {
    questionsText = questionsText.replace(/\n/g,"<br>")
    const questions = questionsText.trim().split('_');
      
    container = document.getElementById('test-container');
    for (let i = 0; i < questions.length; i++) {
      const questionContainer = document.createElement('div');
      const questionText = document.createElement('div');
      const inputContainer = document.createElement('div');
      
      questionText.innerHTML = questions[i];

      const input = document.createElement('input');
      const uniqueId = 'input_' + i;  
      input.setAttribute('type', 'text');
      input.setAttribute('id', uniqueId);
      input.setAttribute('class', "answerField");
      
      inputContainer.appendChild(input);
      questionContainer.appendChild(inputContainer);

      container.appendChild(input);
  };

  });

fetch('answers.txt')
  .then(response => response.text())
  .then(answersText => {
    const lines = answersText.split('\n');
    const answers = lines.map(line => line.split(','));
  });
