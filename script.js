// Function to read a text file
function readFile(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const contents = event.target.result;
      callback(contents);
    };
    reader.readAsText(file);
  }
  
  // Function to extract questions and answers from the text files
  function extractData() {
    const questionsFile = document.getElementById("questions-file").files[0];
    const answersFile = document.getElementById("answers-file").files[0];
  
    if (questionsFile && answersFile) {
      readFile(questionsFile, function(questionsContent) {
        const questions = questionsContent.split("\n").filter(Boolean);
  
        readFile(answersFile, function(answersContent) {
          const answers = answersContent.split(",").map(answer => answer.trim());
  
          if (questions.length === answers.length) {
            // Proceed with generating the exercise using questions and answers
            generateExercise(questions, answers);
          } else {
            alert("The number of questions does not match the number of answers.");
          }
        });
      });
    } else {
      alert("Please select both questions and answers files.");
    }
  }
  
  // Function to generate the exercise
  function generateExercise(questions, answers) {
    const container = document.getElementById("exercise-container");
  
    questions.forEach((question, index) => {
      const questionText = question.replace(/_/g, "<input type='text' id='input-" + index + "' />");
      const questionElement = document.createElement("p");
      questionElement.innerHTML = questionText;
  
      const inputs = questionElement.querySelectorAll("input");
  
      inputs.forEach((input, inputIndex) => {
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
            const nextInput = questionElement.querySelector("#input-" + (inputIndex + 1));
            if (nextInput) {
              nextInput.focus();
            }
          }
        });
      });
  
      container.appendChild(questionElement);
    });
  }
  
  
  // Add an event listener to the button for extracting data
  const extractButton = document.getElementById("extract-button");
  extractButton.addEventListener("click", extractData);
  