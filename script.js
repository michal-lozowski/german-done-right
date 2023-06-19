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
        if (i = 0) input.setAttribute('autofocus');
        spantext.appendChild(input);      
        };
      container.appendChild(spantext);
      
  };

  });
/*
fetch('answers.txt')
  .then(response => response.text())
  .then(answersText => {
    const lines = answersText.split('\n');
    const answers = lines.map(line => line.split(','));
    
    
    function checkInput(event, index) {
      if (event.key === 'Enter') {
        const inputField = document.getElementById('input_' + i);
        const nextInputField = document.getElementById('input_' + (i+1));
        
        const inputValue = event.target.value.trim();

        event.preventDefault();
        nextInputField.focus();
        
        let isCorrect = false;
        for (let i = 0; i < answers[index]; i++) {
          for (let j = 0; j < answers[index].length; j++)
            if (inputValue === answers[index]) isCorrect = true;
        };
        if (isCorrect) inputField.style.border = "2px solid green";  
      };
  };


  });
*/
