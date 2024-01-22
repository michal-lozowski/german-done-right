let shownQuestions = []

async function mainclown() {

    let seconds = 3;
    function updateTimer() {
        document.getElementById("timer").innerHTML = seconds

        if (seconds !== 0) {
            seconds--;
            timeoutId = setTimeout(updateTimer, 800);
        }
    }


    const baseURL = window.location.href.endsWith('/') ? window.location.href : window.location.href + '/';

    const responseQuestions = await fetch(baseURL + "questions.txt");
    let questionsText = await responseQuestions.text();

    let answers = []
    answerFound = false
    answerCounter = -1
    for (let i = 0; i < questionsText.length; i++) {
        if (questionsText[i - 1] === "(") {
            answerFound = true
            dollarCounter = 0
            answerCounter++
        }
        if (questionsText[i] === ")") answerFound = false
        if (answerFound) {
            if (answers.length === answerCounter) answers.push("")
            answers[answerCounter] = answers[answerCounter] + questionsText[i]
        }
    }

    questionsText = questionsText.replace(/\(.+\)/g, "")

    questions = questionsText.split("\n");

    do {
    randomNumber = Math.floor(Math.random() * questions.length)
    } while (shownQuestions.includes(randomNumber))
    shownQuestions.push(randomNumber)

    container = document.getElementById('test-container');

    const spantext = document.createElement('span');
    if (shownQuestions.length !== questions.length) spantext.innerHTML = questions[randomNumber] + " "
    else spantext.innerHTML = "geschafft!"

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', randomNumber);
    input.setAttribute('class', "input");
    input.setAttribute('autocapitalize', "off");

    container.appendChild(spantext)
    if (shownQuestions.length !== questions.length) container.appendChild(input)

    const blankspace = document.createElement('span')
    blankspace.innerHTML = " "
    container.appendChild(blankspace)

    const timer = document.createElement('span')
    timer.innerHTML = " "
    timer.setAttribute("id", "timer")
    container.appendChild(timer)

    
    const achievements = document.createElement('p')
    achievements.innerHTML = "Fragen erfolgreich beantwortet: " + (shownQuestions.length - 1)
    achievements.setAttribute("id", "achievements")
    container.appendChild(achievements)

    document.getElementById(randomNumber).addEventListener("blur", event => {
        if ((event.target.value.trim() === answers[event.target.id])) {
            event.target.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
            updateTimer()
        }
        else if ((event.target.value.trim() === answers[event.target.id])) {
            event.target.style.backgroundColor = "";
        }
    });

    document.getElementById(randomNumber).addEventListener("keydown", event => {
        if ((event.key === "Enter") && (event.target.value.trim() === answers[event.target.id])) {
            event.target.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
            updateTimer()
        }
        else if ((event.target.value.trim() === answers[event.target.id])) {
            event.target.style.backgroundColor = "";
        }
    })

    setInterval(document.getElementById(randomNumber).focus(), 500)
}

mainclown()

function checkTimerValue() {
    const timerElement = document.getElementById("timer");
    const currentValue = parseInt(timerElement.innerHTML);

    if (currentValue === 0) {
        document.getElementById('test-container').innerHTML = "";
        mainclown();
    }
}

setInterval(checkTimerValue, 1100)