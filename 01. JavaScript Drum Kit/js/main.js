let chosenLayout = 'qwerty';
const audioList = document.querySelectorAll('audio[data-index');
const keyList = document.querySelectorAll('.key[data-index]');

// Our bible of mappings
const layouts = [
  [
    {letter: 'a', keyCode: 65},
    {letter: 's', keyCode: 83},
    {letter: 'd', keyCode: 68},
    {letter: 'f', keyCode: 70},
    {letter: 'g', keyCode: 71},
    {letter: 'h', keyCode: 72},
    {letter: 'j', keyCode: 74},
    {letter: 'k', keyCode: 75},
    {letter: 'l', keyCode: 76},
  ],
  [
    {letter: 'a', keyCode: 65},
    {letter: 'r', keyCode: 82},
    {letter: 's', keyCode: 83},
    {letter: 't', keyCode: 84},
    {letter: 'd', keyCode: 68},
    {letter: 'h', keyCode: 72},
    {letter: 'n', keyCode: 78},
    {letter: 'e', keyCode: 69},
    {letter: 'i', keyCode: 73},
  ],
  [
    {letter: 'a', keyCode: 65},
    {letter: 'o', keyCode: 79},
    {letter: 'e', keyCode: 69},
    {letter: 'u', keyCode: 85},
    {letter: 'i', keyCode: 73},
    {letter: 'd', keyCode: 68},
    {letter: 'h', keyCode: 72},
    {letter: 't', keyCode: 84},
    {letter: 'n', keyCode: 78},
  ],
];

const findSound = (e) => {
  // Here we scan for the index of the key that has a matching keyCode to us
  for (let i = 0; i < layouts[0].length; i++) {
    if (layouts[0][i].keyCode === e.keyCode) {
      return i;
    }
  }
};

const playSound = (e) => {
  // When we press a key:

  // We get the index of the key with the corresponding letter:
  const index = findSound(e);

  // If there's no matching key (i.e. we've pressed Q), stop everything
  if (index == undefined) return console.error('no matching key :(');

  // But if we DO have a match...
  const audioToPlay = audioList[index];
  const keyPressed = keyList[index];

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

const layoutCheckboxLabels = document.querySelectorAll('label');

console.log(`chosenLayout is ${chosenLayout}`);
/** Handles changing of letters on keys according to keymap
 * @param {array} textArr The keymaps to be read
 * @param {string} layoutName The name of the currently selected layout
 */
function changeLayout(textArr, layoutName) {
  const layoutKeys = Array.from(allKeys);

  if (layoutName) {
    // This index selects which of three (0/1/2) subarrays (keymaps) to pick
    let layoutIndex;

    if (layoutName === 'qwerty') {
      layoutIndex = 0;
    } else if (layoutName === 'colemak') {
      layoutIndex = 1;
    } else {
      layoutIndex = 2;
    }

    layoutKeys.map((key, i) => {
      key.children[0].textContent = textArr[layoutIndex][
          i
      ].letter.toUpperCase();
    });

    // Finally, update the global var
    chosenLayout = layoutName;
  }
}

layoutCheckboxLabels.forEach(function(checkbox) {
  return checkbox.addEventListener('click', function(e) {
    chosenLayout = e.target.htmlFor;
    return changeLayout(layouts, chosenLayout);
  });
});
