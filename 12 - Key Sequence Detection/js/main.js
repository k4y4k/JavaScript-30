const pressed = [];
const secretCode = 'kayak';

window.addEventListener('keyup', (e) => {
  console.log(e.key);
  pressed.push(e.key);

  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);

  if (pressed.join('').includes(secretCode)) {
    console.log(':)');
    cornify_add();
  }
});

// TODO: "who's the greatest web dev?"
