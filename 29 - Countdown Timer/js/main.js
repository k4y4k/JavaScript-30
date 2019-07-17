let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const endTimeTime = document.querySelector('span');
const buttons = document.querySelectorAll('[data-time]');

/**
 * Controls the timer.
 * @param {number} seconds The number of seconds to count down.
 */
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
/**
 * Displays the time left, as well as handles text changes when all time has
 * been elapsed.
 * @param {number} seconds The number of seconds to count down.
 */
function displayTimeLeft(seconds) {
  let secondsLeft = seconds;

  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft = secondsLeft % 3600;

  const minutes = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft % 60;

  const display = `${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}`;

  timerDisplay.textContent = display;
  document.title = `${display} remaining`;

  if (seconds === 0) {
    document.title = 'All done!';
    timerDisplay.textContent = 'Time up!';
    endTime.textContent = 'Choose an option above to start a new timer.';
    endTimeTime.textContent = '';
  }
}
/**
 * Handles displaying of the time when the countdown will finish
 * @param {any} timestamp
 */
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  endTimeTime.textContent = `${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? '0' + minutes : minutes
  }`;
  endTime.textContent = 'Be back at';
}

/**
 * Starts the timer.
 */
function startTimer() {
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

timer(2);
