fetch('questions.txt')
  .then(response => response.text())
  .then(questionsText => {
    questionsText = questionsText.replace("\n", "<br>")
    const questions = questionsText.trim().split('_');
  });

fetch('answers.txt')
  .then(response => response.text())
  .then(answersText => {
    const lines = answersText.split('\n');
    const array2D = lines.map(line => line.split(','));
  });
  
container = document.getElementById('test-container');
for (let i = 0; i < 10; i++) {
  const text = document.createTextNode(questions[i]);
  container.appendChild(text);
  const input = document.createElement('input');
  const uniqueId = 'input_' + i; // Unique ID for each input field 
  input.setAttribute('type', 'text');
  input.setAttribute('id', uniqueId);  
  container.appendChild(input);
  };
