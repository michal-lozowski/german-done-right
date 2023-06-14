let questions = [];
let answers = [];
let exerciseHTML = [];

// Read the questions from the questions.txt file
fetch('questions.txt')
    .then(response => response.text())
    .then(questionsText => {
        // Replace line breaks with <br> tags
        questionsText = questionsText.replace(/\n/g, '<br>');

        // Split the questions into an array
        questions = questionsText.split('_');
});

// Read the answers from the answers.txt file
fetch('answers.txt')
      .then(response => response.text())
      .then(answersText => {
        // Split the answers into an array
        answers = answersText.split(',');
});

// Function to generate the HTML for fill in the gaps exercise
function generateExerciseHTML() {
  document.getElementById("exercise-container").innerHTML = questions;
}

// Call the function to generate the exercise HTML
generateExerciseHTML();
