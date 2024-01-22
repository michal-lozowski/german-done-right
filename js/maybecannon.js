

async function mainclown() {

    const baseURL = window.location.href.endsWith('/') ? window.location.href : window.location.href + '/';

    const responseQuestions = await fetch(baseURL + "questions.txt");
    let questionsText = await responseQuestions.text();

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
    questions = questionsText.split("\r\n");


}


let answers = []
let questions = []

let randomQuestionId
let randomAnswerIdA
let randomAnswerIdB
let shownQuestions = []

let randomPositionCorrect
let randomPositionA
let randomPositionB
let positions = []

let q, aCorrect, a1, a2
let canvasW, canvasH

let mouseStartX, mouseStartY
let mouseEndX, mouseEndY
let isDrawing = false
let diffX = 0
let diffY = 0

let wasReleased = false

let won = false
let lost = false
let gameOver = false

let fuckingCounter = 180
let score = 0

async function setup() {
    await mainclown()


    canvasW = windowWidth / 1.5
    canvasH = windowHeight / 1.5
    createCanvas(canvasW, canvasH)

    getQandA()

}


async function draw() {

    clear()
    background(230)

    textSize(18)
    text("Fragen erfolgreich beantwortet: " + score, 20, canvasH - 20)

    if (lost === true || won === true) {
        if (lost === true) {
            background(200, 0, 0)
            textSize(20)
            text("Pech gehabt...", canvasW / 3, canvasH / 6)
        }
        if (won === true) {
            background(0, 200, 0)
            textSize(20)
            text("Erfolg...", canvasW / 3, canvasH / 6)
        }
        fuckingCounter--
        if (fuckingCounter === 0) {
            if (won === true) score++
            lost = false
            won = false
            q = null
            aCorrect = null
            a1 = null
            a2 = null
            positions = []
            fuckingCounter = 180
            getQandA()
        }
    }

    c.update(Math.atan2(diffY, diffX))
    c.show()
    aCorrect.show()
    a1.show()
    a2.show()

    if (wasReleased) {
        q.xSpeed = diffX
        q.ySpeed = diffY
        wasReleased = false
    }

    q.update()
    q.show()

    if (isDrawing) {
        line(mouseStartX, mouseStartY, mouseEndX, mouseEndY);
    }

    if (collision(q, aCorrect)) won = true
    if (collision(q, a1) || collision(q, a2)) lost = true

}


function getQandA() {

    do {
        randomQuestionId = floor(random(questions.length))
    } while (shownQuestions.includes(randomQuestionId))
    shownQuestions.push(randomQuestionId)
    randomAnswerIdA = floor(random(answers.length))
    randomAnswerIdB = floor(random(answers.length))

    randomPositionCorrect = floor(random(3))
    positions.push(randomPositionCorrect)
    do {
        randomPositionA = floor(random(3))
    } while (positions.includes(randomPositionA))
    positions.push(randomPositionA)
    do {
        randomPositionB = floor(random(3))
    } while (positions.includes(randomPositionB))

    q = new Question(questions[randomQuestionId])
    aCorrect = new Answer(answers[randomQuestionId])
    a1 = new Answer(answers[randomAnswerIdA])
    a2 = new Answer(answers[randomAnswerIdB])

    c = new Cannon

    aCorrect.x = canvasW / 1.5
    aCorrect.y = canvasH / 4 + (canvasH / 4 * randomPositionCorrect)

    a1.x = canvasW / 1.5
    a1.y = canvasH / 4 + (canvasH / 4 * randomPositionA)

    a2.x = canvasW / 1.5
    a2.y = canvasH / 4 + (canvasH / 4 * randomPositionB)
}

function collision(a, b) {
    if (
        (a.br[0] > b.ul[0] &&
            a.br[0] < b.ur[0] &&
            a.br[1] > b.ul[1] &&
            a.br[1] < b.bl[1]) ||
        (a.bl[0] > b.ul[0] &&
            a.bl[0] < b.ur[0] &&
            a.bl[1] > b.ul[1] &&
            a.bl[1] < b.bl[1]) ||
        (a.ur[0] > b.ul[0] &&
            a.ur[0] < b.ur[0] &&
            a.ur[1] > b.ul[1] &&
            a.ur[1] < b.bl[1]) ||
        (a.bl[0] > b.ul[0] &&
            a.ul[0] < b.ur[0] &&
            a.ul[1] > b.ul[1] &&
            a.ul[1] < b.bl[1])
    )

        return true
    else return false
}

function Cannon() {

    this.angle = 0
    this.x = canvasW / 12
    this.y = canvasH / 1.5

    this.update = function (newAngle) {
        this.angle = newAngle
    }
 
    this.show = function () {
        fill(200)
        push()
        translate(this.x + 10, this.y - 40)
        rotate(this.angle)
        rect(0,0, 120, 40)
        pop()
        triangle(this.x, this.y, this.x + 50, this.y, this.x + 25, this.y-50)
    }

}

function Question(textToShow) {

    this.x = canvasW / 6
    this.y = canvasH / 2

    textSize(24)

    this.xSpeed = 0
    this.ySpeed = 0

    this.drag = 0.1

    this.update = function () {

        if (this.ySpeed !== 0) {
            this.ySpeed += this.drag
        }

        this.x += this.xSpeed
        this.y += this.ySpeed

        if ((this.x <= 10) || (this.x >= canvasW - 100) ||
            ((this.y <= 10) || (this.y >= canvasH - 50)) ||
            won === true ||
            lost === true) {
            this.xSpeed = 0
            this.ySpeed = 0
        }
    }

    this.show = function () {
        textSize(24)
        fill(0)
        text(textToShow, this.x, this.y)
        this.bl = [this.x, this.y + textDescent()];
        this.br = [this.x + textWidth(textToShow), this.y + textDescent()];
        this.ul = [this.x, this.y - textAscent()];
        this.ur = [this.x + textWidth(textToShow), this.y - textAscent()];
        point(this.br[0], this.br[1])
        point(this.bl[0], this.bl[1])
        point(this.ur[0], this.ur[1])
        point(this.ul[0], this.ul[1])
    }
}

function Answer(textToShow) {
    this.x = 0
    this.y = 0

    this.show = function () {
        fill(0)
        textSize(24)
        text(textToShow, this.x, this.y)
        this.bl = [this.x, this.y + textDescent()];
        this.br = [this.x + textWidth(textToShow), this.y + textDescent()];
        this.ul = [this.x, this.y - textAscent()];
        this.ur = [this.x + textWidth(textToShow), this.y - textAscent()];
        point(this.br[0], this.br[1])
        point(this.bl[0], this.bl[1])
        point(this.ur[0], this.ur[1])
        point(this.ul[0], this.ul[1])
    }
}

function mousePressed() {
    mouseStartX = mouseX
    mouseStartY = mouseY
    isDrawing = true
}

function mouseDragged() {
    mouseEndX = mouseX
    mouseEndY = mouseY
}

function mouseReleased() {
    wasReleased = true
    isDrawing = false
    diffX = (mouseEndX - mouseStartX) / 100
    diffY = (mouseEndY - mouseStartY) / 100
    mouseStartX = undefined
    mouseStartY = undefined
    mouseEndX = undefined
    mouseEndY = undefined
}