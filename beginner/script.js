
async function mainclown() {

    const responsegerman = await fetch ("german.txt");
    const german = await responsegerman.text();
    const responserussian = await fetch ("russian.txt");
    const russian = await responserussian.text();
    
    const germancontainer = document.getElementById('german-container');
    const russiancontainer = document.getElementById('russian-container');
  
    const germanTextNode = document.createTextNode(german);
    const russianTextNode = document.createTextNode(russian);

    germancontainer.appendChild(germanTextNode);
    russiancontainer.appendChild(russianTextNode);

}
  
mainclown()