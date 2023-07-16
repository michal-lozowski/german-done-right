
async function mainclown() {

    const responsegerman = await fetch ("german.txt");
    const germantext = await responsegerman.text();
    const responserussian = await fetch ("russian.txt");
    const russiantext = await responserussian.text();
    
    germancontainer = document.getElementById('german-container');
    russiancontainer = document.getElementById('russian-container');
    
    const germanTextNode = document.createTextNode(germantext);
    const russianTextNode = document.createTextNode(russiantext);

    germancontainer.appendChild(germanTextNode);
    russiancontainer.appendChild(russianTextNode);   
}
  
mainclown()