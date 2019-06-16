const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;

/** Handles checking of checkboxes
 * @param {any} e The event from the browser
 */
function handleCheck(e) {
  console.log(e);
  // Check for shift key
  // AND check for checking (not unchecking)

  let inBetween = false;
  if (e.shiftKey && this.checked) {
    checkboxes.forEach((checkbox) => {
      console.log(checkbox);
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
        console.log('Starting to check them in between');
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }

  lastChecked = this;
}

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener('click', handleCheck)
);
