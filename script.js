// Read the questions from the questions.txt file
fetch('questions.txt')
    .then(response => response.text())
    .then(questionsText => {
        // Replace line breaks with <br> tags
        questionsText = questionsText.replace(/\n/g, '<br>');

        // Split the questions into an array
        const questions = questionsText;
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
    exerciseHTML += questions[i].replace("_", `<input id="input-${i}" class="gap-input" data-index="${i}" type="text">`);
  }
  
  document.getElementById("exercise-container").innerHTML = exerciseHTML;
  
  // Add event listeners to input fields
  var inputs = document.getElementsByClassName("gap-input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keyup", function(event) {
      if (event.keyCode === 13) { // Enter key
        checkAnswer(event.target);
        moveToNextGap(event.target);
      }
    });
  }
}

// Function to check the answer
function checkAnswer(input) {
  var index = input.dataset.index;
  var userAnswer = input.value.trim();
  var correctAnswer = answers[index];
  
  if (userAnswer === correctAnswer) {
    input.classList.add("correct");
  } else {
    input.classList.add("incorrect");
  }
}

// Function to move to the next gap
function moveToNextGap(input) {
  var index = input.dataset.index;
  var nextIndex = parseInt(index) + 1;
  var nextInput = document.getElementById("input-" + nextIndex);
  
  if (nextInput) {
    nextInput.focus();
  } else {
    // All gaps filled, do something (e.g., show results)
    console.log("Exercise completed!");
  }
}

// Call the function to generate the exercise HTML
generateExerciseHTML();
