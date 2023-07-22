const mainList = document.getElementsByClassName('mainList');

document.addEventListener('keypress', function(event) {
  if ((event.key === "o") && (!document.getElementById('o'))) {
    const newListItem = document.createElement('li');
    newListItem.textContent = 'Uncaught SyntaxError: порядок слов';
    newListItem.setAttribute('id', 'o');
    mainList[0].appendChild(newListItem)
  } else {document.getElementById('o').remove()};

  if ((event.key === "a") && (!document.getElementById('a'))) {
    const newListItem = document.createElement('li');
    newListItem.textContent = 'Uncaught SyntaxError: вспомогательный глагол';
    newListItem.setAttribute('id', 'a');
    mainList[0].appendChild(newListItem)
  } else {document.getElementById('a').remove()};
  
  if ((event.key === "p") && (!document.getElementById('p'))) {
    const newListItem = document.createElement('li');
    newListItem.textContent = 'Uncaught SyntaxError: форма глагола в Perfekt';
    newListItem.setAttribute('id', 'p');
    mainList[0].appendChild(newListItem)
  } else {document.getElementById('p').remove()};
});