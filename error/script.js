const mainList = document.getElementsByClassName('mainList');

document.addEventListener('keypress', function(event) {
  if (event.key === "o") {
    if (document.getElementById('o')) {document.getElementById('o').remove()} else {
      const newListItem = document.createElement('li');
      newListItem.textContent = 'Uncaught SyntaxError: порядок слов';
      newListItem.setAttribute('id', 'o');
      mainList[0].appendChild(newListItem);
      }
  }

if (event.key === "a") {
  if (document.getElementById('a')) {document.getElementById('a').remove()} else {
    const newListItem = document.createElement('li');
    newListItem.textContent = 'Uncaught SyntaxError: вспомогательный глагол';
    newListItem.setAttribute('id', 'a');
    mainList[0].appendChild(newListItem);
    }
}

});
