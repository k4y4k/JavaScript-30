const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const digitalSecond = document.querySelector('.digital-second');
const digitalMinute = document.querySelector('.digital-minute');
const digitalHour = document.querySelector('.digital-hour');

const setDate = () => {
  const now = new Date();
  changeAnalogClock(now);
  changeDigitalClock(now);
};

const changeAnalogClock = (now) => {
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  // See what the system date/time is and get what we need from it:

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

const changeDigitalClock = (now) => {
  digitalHour.textContent = ('0' + now.getHours()).slice(-2);
  digitalMinute.textContent = ('0' + now.getMinutes()).slice(-2);
  digitalSecond.textContent = ('0' + now.getSeconds()).slice(-2);

  /* Slice-2 just means "the last 2" - adding now.get__() to a string cocerces
  `now` to be a zero-padded string. If now.getHours is 3, then
  `digitalHour.textContent` becomes `03` ("0" + ~"3" = "03".slice(-2)). But if
  `now.getHours` is 10, it stays as 10 = "0" + ~"10" = "010".slice(-2). */
};

setInterval(setDate, 1000);
