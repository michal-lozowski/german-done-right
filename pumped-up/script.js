function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    audio.currentTime = 0;
    audio.play();
}

function highlightKey(e) {
    const pressedKey = document.querySelector(`span[data-key="${e.keyCode}"]`);
    pressedKey.style.color = "red";

    setTimeout(() => {
        pressedKey.style.color = "";
    }, 200);
}

function combinedFunction(e) {
    playSound(e);
    highlightKey(e);
}

window.addEventListener('keydown', combinedFunction);