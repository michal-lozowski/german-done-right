// Read the questions from the questions.txt file
fetch('questions.txt')
    .then(response => response.text())
    .then(questionsText => {
        // Replace line breaks with <br> tags
        questionsText = questionsText.replace(/\n/g, '<br>');

        // Split the questions into an array
        const questions = questionsText.split('_');
});
    

// Read the answers from the answers.txt file
fetch('answers.txt')
      .then(response => response.text())
      .then(answersText => {
        // Split the answers into an array
        const answers = answersText.split(',');
});
               

// Generate the exercise HTML
const exerciseContainer = document.getElementById('exercise-container');
let exerciseHTML = '';

for (let i = 0; i < questions.length - 1; i++) {
  exerciseHTML += questions[i];
  exerciseHTML += `<input type="text" id="input">`;
  }

exerciseHTML += questions[questions.length - 1];
exerciseContainer.innerHTML = exerciseHTML;
            
    

// Function to check the answer when the user presses ENTER
/* function checkAnswer(event, input) {
    if (event.keyCode === 13) {
        const userAnswer = input.value.trim();
        const correctAnswer = input.dataset.answer;

        if (userAnswer === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    }
} */

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();

    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = answers[index].toLowerCase();

    if (userAnswer === correctAnswer) {
      input.classList.remove("incorrect");
      input.classList.add("correct");
    } else {
      input.classList.remove("correct");
      input.classList.add("incorrect");
    }

    // Move focus to the next input field
    const nextInput = document.getElementById("input-" + (index + 1));
    if (nextInput) {
      nextInput.focus();
    }
  }
});
