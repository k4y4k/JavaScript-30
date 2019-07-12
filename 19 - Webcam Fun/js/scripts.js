const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices
      .getUserMedia({video: true, audio: false})
      .then((localMediaStream) => {
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
      })
      .catch((err) => {
        console.error(`that's not very woomy`, err);
      });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;

  console.log('++');
  console.log(video.videoHeight);

  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // Take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);

    // Mess with them (apply effects, melt CPU, w/e)
    // Pixels = redEffect(pixels);
    // Pixels = rgbSplit(pixels);
    pixels = greenScreen(pixels);

    // Put them back on the page, now with effect applied
    ctx.putImageData(pixels, 0, 0);
  }, 20);
}

function takePhoto() {
  // Play sound effect
  snap.currentTime = 0;
  snap.play();

  // Take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  console.log(data);

  // Create download link
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'stunning');
  link.innerHTML = `<img src="${data}" alt="Stunning person"></img>`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // Red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // Blue
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Green
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 550] = pixels.data[i + 0]; // Red
    pixels.data[i + 550] = pixels.data[i + 1]; // Blue
    pixels.data[i - 550] = pixels.data[i + 2]; // Green
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
