const mainList = document.getElementsByClassName('mainList');

function handleKeyPress(key, errorMessage) {
  document.addEventListener('keypress', function(event) {
    if (event.key === key) {
      const existingItem = document.getElementById(key);
      
      if (existingItem) {
        document.getElementById(key).remove()
      } else {
        const newListItem = document.createElement('li');
        newListItem.textContent = errorMessage;
        newListItem.setAttribute('id', key);
        mainList[0].appendChild(newListItem);
      }
    }
  })
}

handleKeyPress ("o", "Uncaught SyntaxError: порядок слов")
handleKeyPress ("a", "Uncaught SyntaxError: вспомогательный глагол")