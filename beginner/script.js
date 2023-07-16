
async function mainclown() {

    const responsegerman = await fetch ("german.txt");
    const german = await responsegerman.text();
    const responserussian = await fetch ("russian.txt");
    const russian = await responserussian.text();
    
    const germancontainer = document.getElementById('german-container');
    const russiancontainer = document.getElementById('russian-container');
    
    const germantext = german.replace(/\n/g, "<br>").trim();
    const russiantext = russian.replace(/\n/g, "<br>").trim();
  
    germancontainer.appendChild(germantext);
    russiancontainer.appendChild(russiantext);   
}
  
mainclown()