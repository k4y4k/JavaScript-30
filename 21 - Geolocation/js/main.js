const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

navigator.geolocation.watchPosition(
    (data) => {
      console.log(data);
      speed.textContent = data.coords.speed;
      arrow.style.transform = `rotate(${data.coords.heading}deg)`;

    // TODO: no speed?
    // TODO: no rotation sensor?
    },
    (err) => {
      console.error(err);
      alert(
          'We sort of need location access for this. Want to reload and try that again, champ?'
      );
    }
);
