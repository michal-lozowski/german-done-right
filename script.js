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

// Function to generate the HTML for fill in the gaps exercise
function generateExerciseHTML() {
  var exerciseHTML = "";

  for (var i = 0; i < questions.length; i++) {
    exerciseHTML += questions[i];
    if (i !== questions.length - 1) {
      exerciseHTML += `<input class="gap-input" id="input-${i}" data-index="${i}" type="text" placeholder="Enter your answer">`;
    }
  }

  document.getElementById("exercise-container").innerHTML = exerciseHTML;
}

// Call the function to generate the exercise HTML
generateExerciseHTML();
