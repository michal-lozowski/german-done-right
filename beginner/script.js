
async function mainclown() {

    const responseGerman = await fetch ("german.txt");
    const german = await responseGerman.text();
    const responseRussian = await fetch ("russian.txt");
    const russian = await responseRussian.text();
    
    const germanContainer = document.getElementById('german-container');
    const russianContainer = document.getElementById('russian-container');
    
    const germanParagraphs = german.split("\n");
    const russianParagraphs = russian.split("\n");

    germanParagraphs.forEach((paragraph) => {
        const paragraphElement = document.createElement("p");
        let paragraphText = paragraph.replace(/\n/g, "<br>");
        paragraphText = document.createTextNode(paragraphText);
        paragraphElement.appendChild(paragraphText);
        germanContainer.appendChild(paragraphElement);
    })

    russianParagraphs.forEach((paragraph) => {
        const paragraphElement = document.createElement("p");
        let paragraphText = paragraph.replace(/\n/g, "<br>");
        paragraphText = document.createTextNode(paragraphText);
        paragraphElement.appendChild(paragraphText);
        russianContainer.appendChild(paragraphElement);
    })

}
  
mainclown()