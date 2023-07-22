document.addEventListener('keypress', function(event) {
  if (event.key === "o") {
    document.getElementById('word-order').style.display = (document.getElementById('word-order').style.display === 'block') ? 'none' : 'block';
  }
  if (event.key === "u") {
    document.getElementById('aux-verb').style.display = (document.getElementById('aux-verb').style.display === 'block') ? 'none' : 'block';
  }
  if (event.key === "p") {
    document.getElementById('perfekt-form').style.display = (document.getElementById('perfekt-form').style.display === 'block') ? 'none' : 'block';
  }
  if (event.key === "v") {
    document.getElementById('vowel-verb').style.display = (document.getElementById('vowel-verb').style.display === 'block') ? 'none' : 'block';
  }
  if (event.key === "r") {
    document.getElementById('pref-verb').style.display = (document.getElementById('pref-verb').style.display === 'block') ? 'none' : 'block';
  }
  if (event.key === "c") {
    document.getElementById('cases').style.display = (document.getElementById('cases').style.display === 'block') ? 'none' : 'block';
  }
  if (event.key === "a") {
    document.getElementById('adjectives').style.display = (document.getElementById('adjectives').style.display === 'block') ? 'none' : 'block';
  }
  if (event.key === "n") {
    document.getElementById('pron-spell').style.display = (document.getElementById('pron-spell').style.display === 'block') ? 'none' : 'block';
  }
  if (event.key === "e") {
    document.getElementById('preposition').style.display = (document.getElementById('preoposition').style.display === 'block') ? 'none' : 'block';
  }
  if (event.key === "m") {
    document.getElementById('modal-verb').style.display = (document.getElementById('modal-verb').style.display === 'block') ? 'none' : 'block';
  }
});