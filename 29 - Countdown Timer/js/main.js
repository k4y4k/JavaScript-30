/* eslint-disable require-jsdoc */
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // Clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // Do we need to stop it yet?
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutesRemaining = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  const display = `${minutesRemaining}:${
    secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining
  }`;

  timerDisplay.textContent = display;
  document.title = `${display} remaining`;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? '0' + minutes : minutes
  }`;
}

function startTimer() {
  console.log(this.dataset.time);
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});

timer(100);

// TODO: countdown hours
// TODO: customisable "be back at" message
// TODO: switchable 12/24h time
// TODO: "time over!" when time is elapsed
