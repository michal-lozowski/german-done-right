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


// Get all elements with the class name
const answerFieldsHTMLCollection = document.getElementsByClassName('answerField');

// Convert the HTMLCollection to an array
const answerFieldsHTMLCollectionArray = Array.from(answerFieldsHTMLCollection);

// Extract the IDs from the elements and sort them
const sortedIDs = answerFieldsHTMLCollectionArray.map(element => element.id).sort();

var answers;

fetch('answers.txt')
  .then(response => response.text())
  .then(answersText => {
    answers = answersText.split('\n');
  });

  const answerFields = document.querySelectorAll('.answerField');
  answerFields.forEach(input => {
    input.addEventListener('keyup', event => {
      if (event.keyCode === 13) {
        
        const inputId = event.target.id;
        
        const inputValue = event.target.value.trim();
        
        if (inputValue == answers[inputId]) {
          event.target.style.backgroundColor = 'green';
        }; 

      };
    });
  });

