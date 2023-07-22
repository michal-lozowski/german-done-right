const mainList = document.querySelector('mainList');

document.addEventListener('keypress', function(event) {
  if (event.key === "o") {
    if (document.getElementById('o')) {document.getElementById('o').remove()} else {
      const newListItem = document.createElement('li');
      newListItem.textContent = 'Uncaught SyntaxError: порядок слов';
      newListItem.setAttribute('id', 'o');
      mainList.appendChild(newListItem);
      }
  }

if (event.key === "a") {
  if (document.getElementById('a')) {document.getElementById('a').remove()} else {
    const newListItem = document.createElement('li');
    newListItem.textContent = 'Uncaught SyntaxError: вспомогательный глагол';
    newListItem.setAttribute('id', 'a');
    mainList.appendChild(newListItem);
    }
}

});
