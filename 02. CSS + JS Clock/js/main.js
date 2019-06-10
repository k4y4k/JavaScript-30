// TODO: Digital clock underneath?

const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

const setDate = () => {
  // See what the system date/time is and get what we need from it:
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  /* Time is base-60, we need base-100 to calculate what % of 360deg it is
  (where "the big hand on the 6" would be 50 % of 360deg), and then add the
  offset of 90deg defined in CSS. */
  const secondsDegrees = (seconds / 60) * 360 + 90;

  // The same is true for the minute hand
  const minsDegrees = (minutes / 60) * 360 + 90;

  // The hour hand is 0 - 12 so it's a bit different
  const hoursDegrees = (hours / 12) * 360 + 90;

  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minHand.style.transform = `rotate(${minsDegrees}deg)`;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
};

setInterval(setDate, 1000);
