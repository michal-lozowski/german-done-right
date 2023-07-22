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

handleKeyPress ("u", "Uncaught SyntaxError: вспомогательный глагол")
handleKeyPress ("p", "Uncaught SyntaxError: форма глагола в Perfekt")
handleKeyPress ("v", "Uncaught SyntaxError: форма глагола")
handleKeyPress ("w", "Uncaught SyntaxError: глагол с изменяющейся гласной")
handleKeyPress ("f", "Uncaught SyntaxError: глагол с отделяемой приставкой"
)
handleKeyPress ("c", "Uncaught SyntaxError: падежи")
handleKeyPress ("j", "Uncaught SyntaxError: склонение прилагательных")

handleKeyPress ("s", "Uncaught LexicalError: произношение/форма слова")
handleKeyPress ("n", "Uncaught LexicalError: предлог(и)")
handleKeyPress ("m", "Uncaught LexicalError: модальный глагол")

document.addEventListener('keypress', function(event) {
  if (event.key === "z") {
    document.querySelector(".mainList").innerHTML = '';
  }
})