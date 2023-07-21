document.addEventListener('keypress', function(event) {
  if (event.key === "o") {
    document.getElementById('word-order').style.display = (document.getElementById('word-order').style.display === 'inline') ? 'none' : 'inline';
  }
  if (event.key === "u") {
    document.getElementById('aux-verb').style.display = (document.getElementById('aux-verb').style.display === 'inline') ? 'none' : 'inline';
  }
  if (event.key === "p") {
    document.getElementById('perfekt-form').style.display = (document.getElementById('perfekt-form').style.display === 'inline') ? 'none' : 'inline';
  }
  if (event.key === "v") {
    document.getElementById('vowel-verb').style.display = (document.getElementById('vowel-verb').style.display === 'inline') ? 'none' : 'inline';
  }
  if (event.key === "r") {
    document.getElementById('pref-verb').style.display = (document.getElementById('pref-verb').style.display === 'inline') ? 'none' : 'inline';
  }
  if (event.key === "c") {
    document.getElementById('cases').style.display = (document.getElementById('cases').style.display === 'inline') ? 'none' : 'inline';
  }
  if (event.key === "a") {
    document.getElementById('adjectives').style.display = (document.getElementById('adjectives').style.display === 'inline') ? 'none' : 'inline';
  }
  if (event.key === "n") {
    document.getElementById('pron-spell').style.display = (document.getElementById('pron-spell').style.display === 'inline') ? 'none' : 'inline';
  }
  if (event.key === "e") {
    document.getElementById('preposition').style.display = (document.getElementById('preoposition').style.display === 'inline') ? 'none' : 'inline';
  }
  if (event.key === "m") {
    document.getElementById('modal-verb').style.display = (document.getElementById('modal-verb').style.display === 'inline') ? 'none' : 'inline';
  }
});