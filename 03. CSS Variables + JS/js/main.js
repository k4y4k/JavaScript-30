const inputs = document.querySelectorAll('.controls input');

/**
 * Handles updates of inputs (colour picker, blur/spacing sliders)
 */
function handleUpdate() {
  /* Reads the unit specified in the `data-sizing` attribute of an input
  element, if one exists */
  const suffix = this.dataset.sizing || '';

  document.documentElement.style.setProperty(
      /* First, we need to know what variable we're updating (specifed in
      name="") */
      `--${this.name}`,
      // Then we get the value and append the suffix from earlier
      this.value + suffix
  );
}

inputs.forEach((input) => input.addEventListener('change', handleUpdate));
inputs.forEach((input) => input.addEventListener('mousemove', handleUpdate));
