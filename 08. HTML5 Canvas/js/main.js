// TODO: customisable start colour
// TODO: customisable max width
// TODO: customisable bg
// TODO: customisable blend mode

const canvas = document.querySelector('#draw');

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#22d07f';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

/**
 * Draws a line when the mouse button is held down
 *
 * @param {*} e Event from the browser
 */
function draw(e) {
  if (!isDrawing) return; // Don't do anything if they're not holding mouse key
  ctx.beginPath();
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;

  // Start from:
  ctx.moveTo(lastX, lastY);

  // Go to:
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;

  if (hue >= 360) {
    hue = 0;
  }

  if (ctx.lineWidth >= 250 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener('mousedown', (e) => {
  [lastX, lastY] = [e.offsetX, e.offsetY];
  isDrawing = true;
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));
