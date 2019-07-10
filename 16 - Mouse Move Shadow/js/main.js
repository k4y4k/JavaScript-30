const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 100;

/**
 * Moves text shadow according to cursor position.
 * @param {*} e
 */
function shadow(e) {
  const {offsetWidth: width, offsetHeight: height} = hero;

  let {offsetX: x, offsetY: y} = e;

  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }

  /*
    1. get percentage of how far right the cursor is (0 = totally left, 1 = all
      the way right)
    2. make that percentage relative to the walk value (i.e. a cursor that's all
      the way to the right of the screen on a walk value of 300 should be
      returning 300)
    3. clamp 2 by taking away half of the walk value

    (i) Our walk is the TOTAL RANGE of movement we allow - e.g. a walk of 100
        is split between -50 -> 0 -> +50
   */
  const xWalk = Math.round((x / width) * walk - walk / 2);

  // Do the same for y
  const yWalk = Math.round((y / height) * walk - walk / 2);

  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 2px  rgba(17, 103, 134, 0.7),
    ${xWalk * -1}px ${yWalk * -1}px 2px rgba(17, 103, 134, 0.7)
  `;
}

hero.addEventListener('mousemove', shadow);

// TODO: show hint that text is editable
// TODO: set shadow colours + quantity
