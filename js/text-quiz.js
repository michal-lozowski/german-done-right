// text-quiz.js

let questions = [];
let answers = [];

async function fetchQuestionsAndAnswers() {
    // Fetch the text file containing questions
    const response = await fetch('questions.txt');
    const questionsText = await response.text();

    // Parse the text into the questions and answers arrays
    processQuestionsAndAnswers(questionsText);
}

function processQuestionsAndAnswers(questionsText) {
    // Split the text into lines
    const lines = questionsText.split('\n');

    let currentQuestionText = '';
    let currentAnswers = [];
    let parsingAnswers = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Check if the line is empty
        if (line === '') {
            if (parsingAnswers) {
                // We've reached the end of the current question block
                if (currentQuestionText && currentAnswers.length > 0) {
                    // Save the current question and answers
                    questions.push(currentQuestionText.trim());
                    answers.push(currentAnswers);
                }
                // Reset for the next question
                currentQuestionText = '';
                currentAnswers = [];
                parsingAnswers = false;
            } else {
                // Empty line between question and answers
                parsingAnswers = true;
            }
            continue;
        }

        if (!parsingAnswers) {
            // Accumulate question text (preserve line breaks)
            currentQuestionText += line + '\n';
        } else {
            // Accumulate answers
            const isCorrect = line.startsWith('*');
            const answerText = line.replace(/^\*/, '').trim();
            currentAnswers.push({ text: answerText, isCorrect });
        }
    }

    // Handle the last question if file doesn't end with a blank line
    if (currentQuestionText && currentAnswers.length > 0) {
        questions.push(currentQuestionText.trim());
        answers.push(currentAnswers);
    }

    // Render the quiz
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById('test-container');
    container.innerHTML = ''; // Clear the container first

    questions.forEach((question, questionIndex) => {
        // Create a div for each question
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-block');

        // Create a paragraph for the question text
        const questionParagraph = document.createElement('p');
        questionParagraph.innerHTML = question.replace(/\n/g, '<br>'); // Use innerHTML to preserve line breaks
        questionParagraph.classList.add('question-text');
        questionDiv.appendChild(questionParagraph);

        // Create a list for the answers
        const answerList = document.createElement('ul');
        answerList.classList.add('answer-list');

        answers[questionIndex].forEach(answerObj => {
            const answerItem = document.createElement('li');
            answerItem.classList.add('answer-item');

            // Create a span to contain the answer text
            const answerSpan = document.createElement('span');
            answerSpan.textContent = answerObj.text;
            answerSpan.classList.add('answer-text');

            // Add click event to handle answer checking
            answerSpan.addEventListener('click', () => {
                // Toggle the highlighting
                if (answerSpan.classList.contains('correct') || answerSpan.classList.contains('incorrect')) {
                    answerSpan.classList.remove('correct', 'incorrect');
                } else {
                    if (answerObj.isCorrect) {
                        answerSpan.classList.add('correct');
                    } else {
                        answerSpan.classList.add('incorrect');
                    }
                }
            });

            answerItem.appendChild(answerSpan);
            answerList.appendChild(answerItem);
        });

        questionDiv.appendChild(answerList);
        container.appendChild(questionDiv);
    });
}

// Fetch and load questions and answers when the page loads
fetchQuestionsAndAnswers();
