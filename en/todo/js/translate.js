
let russianText
let germanText
let russianParagraphs = []
let germanParagraphs = []

async function mainclown() {
    const baseURL = window.location.href.endsWith('/') ? window.location.href : window.location.href + '/'
    const responseRussian = await fetch(baseURL + "russian.txt")
    russianText = await responseRussian.text()
    const responseGerman = await fetch(baseURL + "german.txt")
    germanText = await responseGerman.text()
}

function splitFetchedText() {
    germanParagraphs = germanText.split("\n\n")
    russianParagraphs = russianText.split("\n\n")
    germanParagraphs = germanParagraphs.map(paragraph => paragraph.replace(/\n/g, "<br>"))
    russianParagraphs = russianParagraphs.map(paragraph => paragraph.replace(/\n/g, "<br>"))
}

function manipulateHtml() {
    const germanContainer = document.getElementById('german-container')
    const russianContainer = document.getElementById('russian-container')

    let germanIdCounter = 0;
    germanParagraphs.forEach(paragraph => {
        const paragraphElement = document.createElement("p")
        paragraphElement.innerHTML = paragraph
        paragraphElement.id = "german-paragraph-" + germanIdCounter
        paragraphElement.classList.add("german-paragraph")
        germanIdCounter++
        germanContainer.appendChild(paragraphElement)
    })

    let russianIdCounter = 0;
    russianParagraphs.forEach(paragraph => {
        const paragraphElement = document.createElement("p")
        paragraphElement.innerHTML = paragraph
        paragraphElement.id = "russian-paragraph-" + russianIdCounter
        paragraphElement.classList.add("russian-paragraph")
        russianIdCounter++
        russianContainer.appendChild(paragraphElement)
    })
}

function checkAnswers() {
    const russianParagraphs = document.querySelectorAll(".russian-paragraph")
    russianParagraphs.forEach(input => {
        input.addEventListener("click", event => {
            const clickedRussianParagraphId = event.target.id
            const germanParagraphId = clickedRussianParagraphId.replace("russian", "german")
            console.log(germanParagraphId)
            const germanParagraph = document.getElementById(germanParagraphId)
            if (germanParagraph.style.visibility === "visible") {
                germanParagraph.style.visibility = "hidden"
            } else germanParagraph.style.visibility = "visible"
        })
    })
}

function equalizeParagraphSizes() {
    for (i = 0; i < russianParagraphs.length; i++) {
        const russianHeight = document.getElementById("russian-paragraph-" + i).getBoundingClientRect().height
        const germanHeight = document.getElementById("german-paragraph-" + i).getBoundingClientRect().height

        if (russianHeight > germanHeight) {
            document.getElementById("german-paragraph-" + i).style.height = russianHeight + "px"
        } else {
            document.getElementById("russian-paragraph-" + i).style.height = germanHeight + "px"
        }
    }
}

mainclown()
    .then(() => {
        splitFetchedText()
        manipulateHtml()
        checkAnswers()

        equalizeParagraphSizes()
        window.onresize = equalizeParagraphSizes;
    });

