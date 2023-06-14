// script.js

window.addEventListener('DOMContentLoaded', (event) => {
  // Load the questions and answers from the files
  fetch('questions.txt')
    .then(response => response.text())
    .then(questions => {
      fetch('answers.txt')
        .then(response => response.text())
        .then(answers => {
          // Split the questions and answers into arrays
          const questionArray = questions.split('_');
          const answerArray = answers.split(',');

          // Get the container element to add the questions
          const container = document.getElementById('test-container');

          // Loop through the questions and create input fields
          for (let i = 0; i < questionArray.length; i++) {
            // Create a new input field
            const input = document.createElement('input');
            input.type = 'text';

            // Set up event listener for the Enter key press
            input.addEventListener('keydown', (event) => {
              if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission

                // Check if the answer is correct
                const userAnswer = input.value.trim();
                const correctAnswer = answerArray[i].trim();
                if (userAnswer === correctAnswer) {
                  input.classList.remove('incorrect');
                  input.classList.add('correct');
                } else {
                  input.classList.remove('correct');
                  input.classList.add('incorrect');
                }

                // Move focus to the next input field
                const nextInput = document.querySelector('input:not(.correct):not(.incorrect)');
                if (nextInput) {
                  nextInput.focus();
                }
              }
            });

            // Add the input field to the container
            container.appendChild(input);

            // Add the question text after the input field
            const questionText = document.createTextNode(questionArray[i]);
            container.appendChild(questionText);
          }
        })
        .catch(error => {
          console.error('Error loading answers:', error);
        });
    })
    .catch(error => {
      console.error('Error loading questions:', error);
    });
});
