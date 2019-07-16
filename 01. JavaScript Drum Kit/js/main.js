const playSound = (e) => {
  const audioToPlay = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const keyPressed = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  // If there is no audio to play, we don't want to do anything more...
  if (!audioToPlay) return;

  // If you mash a letter, we don't want to wait the 1+ seconds for the audio
  // File to be done, we want sounds and lots of 'em
  audioToPlay.currentTime = 0;

  // Then: play
  audioToPlay.play();

  // "Do" (for lack of a better term) the playing animation
  keyPressed.classList.add('playing');
};

// Function that removes 'playing' CSS class after sound is done playing
const removeTransition = (e) => {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
};

// Adding an event listener to know when the animation is done (to transition
// Back to the original - size, non - yellow state)
const allKeys = document.querySelectorAll('.key');
allKeys.forEach((key) =>
  key.addEventListener('transitionend', removeTransition)
);

window.addEventListener('keydown', playSound);

// Let's let the user change the keys they have to press to use the drum kit

const layouts = {
  qwerty: {
    1: 'a',
    2: 's',
    3: 'd',
    4: 'f',
    5: 'g',
    6: 'h',
    7: 'j',
    8: 'k',
    9: 'l',
  },
  colemak: {
    1: 'a',
    2: 'r',
    3: 's',
    4: 't',
    5: 'd',
    6: 'h',
    7: 'n',
    8: 'e',
    9: 'i',
  },
  dvorak: {
    1: 'a',
    2: 'o',
    3: 'e',
    4: 'u',
    5: 'i',
    6: 'd',
    7: 'h',
    8: 't',
    9: 'n',
  },
};

const layoutCheckboxLabels = document.querySelectorAll('label');

function changeLayout(textObj, layoutName) {
  const layoutKeys = Array.from(allKeys);

  if (layoutName) {
    layoutKeys.map((key, i) => {
      key.children[0].textContent = textObj[layoutName][i + 1].toUpperCase();
    });
  }
}

layoutCheckboxLabels.forEach(function(checkbox) {
  return checkbox.addEventListener('click', function(e) {
    return changeLayout(layouts, e.target.htmlFor);
  });
});

changeLayout();
