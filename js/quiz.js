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

let delayCounter = 180
let score = 0

async function mainclown() {
    const baseURL = window.location.href.endsWith('/') ? window.location.href : window.location.href + '/'
    const responseVocab = await fetch(baseURL + "vocab.txt")
    vocabText = await responseVocab.text()
}


function sortQandA() {
    questions = vocabText.split("\n")
    questions = questions.filter(question => question.length > 4)
    questions = questions.map(question => {
        let separatorIndex = question.search(" - ")
        let answer = question.slice(0, separatorIndex).trim()
        answers.push(answer)
        return (question.slice(separatorIndex + 3))
    })
}


function getQandA() {
    do {
        randomQuestionId = floor(random(questions.length))
    } while (shownQuestions.includes(randomQuestionId))


    do {
        randomAnswerIdA = floor(random(randomQuestionId - 3, randomQuestionId + 3))
        randomAnswerIdB = floor(random(randomQuestionId - 3, randomQuestionId + 3))
        if (randomAnswerIdA < 0) randomAnswerIdA = 0
        if (randomAnswerIdB < 0) randomAnswerIdB = 0
        if (randomAnswerIdA > questions.length - 1) randomAnswerIdA = questions.length - 1
        if (randomAnswerIdB > questions.length - 1) randomAnswerIdB = questions.length - 1
    } while (
        randomAnswerIdA === randomQuestionId ||
        randomAnswerIdB === randomQuestionId ||
        randomAnswerIdA === randomAnswerIdB
    )

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

    aCorrect.x = canvasW / 1.5
    aCorrect.y = canvasH / 4 + (canvasH / 4 * randomPositionCorrect)

    a1.x = canvasW / 1.5
    a1.y = canvasH / 4 + (canvasH / 4 * randomPositionA)

    a2.x = canvasW / 1.5
    a2.y = canvasH / 4 + (canvasH / 4 * randomPositionB)
}



async function setup() {
    await mainclown()


    canvasW = windowWidth / 1.5
    canvasH = windowHeight / 1.5
    createCanvas(canvasW, canvasH)

    sortQandA()
    getQandA()

}


async function draw() {

    clear()
    background(230)

    textSize(18)
    text("Fragen erfolgreich beantwortet: " + score + " von insgesamt " + questions.length, 20, canvasH - 20)

    if (lost === true || won === true) {
        if (lost === true) {
            background(200, 0, 0)
            textSize(20)
            text("Pech gehabt...", canvasW / 3, canvasH / 6)
        }
        if (won === true) {
            background(0, 200, 0)
            textSize(20)
            if (score < questions.length) text("Erfolg...", canvasW / 3, canvasH / 6)
            else text("alles geschafft!", canvasW / 3, canvasH / 6)
        }
        delayCounter--
        if (delayCounter === 0) {
            if (won === true) score++
            if (score < questions.length) {
                lost = false
                won = false
                q = null
                aCorrect = null
                a1 = null
                a2 = null
                positions = []
                delayCounter = 180
                getQandA()
            }
        }
    }

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
        let angle = atan2(mouseEndY - mouseStartY, mouseEndX - mouseStartX);
        push();
        translate(mouseEndX, mouseEndY);
        rotate(angle);
        triangle(-20, 8, 0, 0, -20, -8);
        pop();
    }

    if (collision(q, aCorrect)) {
        shownQuestions.push(randomQuestionId)
        won = true
    }
    if (collision(q, a1) || collision(q, a2)) lost = true

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


function Question(textToShow) {

    this.x = canvasW / 6
    this.y = canvasH / 2

    this.xSpeed = 0
    this.ySpeed = 0

    this.update = function () {


        /* if (Math.abs(this.ySpeed) > 0.2) */ this.ySpeed += -this.ySpeed * 0.03
        if (Math.abs(this.xSpeed) > 0.5) this.xSpeed += -this.xSpeed * 0.03

        this.x += this.xSpeed
        this.y += this.ySpeed * 0.5

        if ((this.x <= 10) || (this.x >= canvasW - 100)) {
            this.ySpeed = -this.ySpeed
            this.xSpeed = -this.xSpeed
        }

        if ((this.y <= 10) || (this.y >= canvasH - 50)) {
            this.ySpeed = -this.ySpeed
        }


        if ((this.x <= 1) || (this.x >= canvasW - 10) ||
            ((this.y <= 1) || (this.y >= canvasH - 5))) {
            this.x = canvasW / 5
            this.y = canvasH / 2
        }
        if (won === true ||
            lost === true) {
            this.xSpeed = 0
            this.ySpeed = 0
        }
    }

    this.show = function () {
        textSize(24)
        if (textToShow.length > 18) textSize(20)
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
        if (textToShow.length > 18) textSize(20)
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
    diffX = (mouseEndX - mouseStartX) / 80
    diffY = (mouseEndY - mouseStartY) / 80
    if (!mouseEndX || !mouseEndY) {
        diffX = 0
        diffY = 0
    }
    mouseStartX = undefined
    mouseStartY = undefined
    mouseEndX = undefined
    mouseEndY = undefined
}