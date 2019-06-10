// TODO: not everyone uses QWERTY, Wes...

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
