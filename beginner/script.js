
async function mainclown() {

    const responseGerman = await fetch ("german.txt");
    const german = await responseGerman.text();
    const responseRussian = await fetch ("russian.txt");
    const russian = await responseRussian.text();
    
    const germanContainer = document.getElementById('german-container');
    const russianContainer = document.getElementById('russian-container');
    
    const germanParagraphs = german.split("\n\n");
    const russianParagraphs = russian.split("\n\n");

    let germanIdCounter = 0;
    germanParagraphs.forEach((paragraph) => {
        const paragraphElement = document.createElement("p");
        const paragraphText = paragraph.replace(/\n/g, "<br>");
        paragraphElement.innerHTML = paragraphText;
        paragraphElement.id = "german-paragraph-" + germanIdCounter;
        paragraphElement.setAttribute("class", "german-paragraph"); 
        germanIdCounter++;
        germanContainer.appendChild(paragraphElement);
    })

    let russianIdCounter = 0;
    russianParagraphs.forEach((paragraph) => {
        const paragraphElement = document.createElement("p");
        const paragraphText = paragraph.replace(/\n/g, "<br>");
        paragraphElement.innerHTML = paragraphText;
        paragraphElement.id = "russian-paragraph-" + russianIdCounter;
        paragraphElement.setAttribute("class", "russian-paragraph");
        russianIdCounter++;
        russianContainer.appendChild(paragraphElement);
    })



}
  
mainclown()