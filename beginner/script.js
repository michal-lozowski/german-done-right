
async function mainclown() {

    const responsegerman = await fetch ("german.txt");
    const german = await responsegerman.text();
    const responserussian = await fetch ("russian.txt");
    const russian = await responserussian.text();
    
    germancontainer = document.getElementById('german-container');
    russiancontainer = document.getElementById('russian-container');
    
    const germantext = german.replace(/\n/g, "<br>").trim();
    const russiantext = russian.replace(/\n/g, "<br>").trim();
  
    const germanTextNode = document.createTextNode(germantext);
    const russianTextNode = document.createTextNode(russiantext);

    germancontainer.appendChild(germanTextNode);
    russiancontainer.appendChild(russianTextNode);   
}
  
mainclown()