// TODO: Sort cities by closeness to user rather than by order of appearance in the original data

const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// Fetch returns a promise + a blob, not the "data"
fetch(endpoint)
// Blob doesn't know what it is.
// WE know it's JSON but IT doesn't, so we have to convert it
    .then((blob) =>
      blob
          .json()
      // Blob.json returns another promise, so when it fulfils, we do stuff
          .then((data) => cities.push(...data))
    );

/**
 * Finds any matches in the endpoint with a string as input.
 *
 * @param {string} wordToMatch The string to search for.
 * @param {array} cities The data to search inside.
 *
 * @return {*} filtered array of matching places
 */
function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    // Here we need to figure out if we have what we're trying to find
    const regex = new RegExp(wordToMatch, 'gi');
    // Return place.city.match(regex) || place.state.match(regex);
    return place.city.match(regex) || place.state.match(regex);
  });
}

/** Small function that adds commas to numbers via regex (for readability
 * purposes)
 *
 * @param {*} x The number to transform
 *
 * @return {string} x The number with commas added
 */
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Function that handles displaying of matches in HTML
 */
function displayMatches() {
  // Search in the array with the value of the input
  const matchArray = findMatches(this.value, cities);

  // Construct the HTML to return
  const html = matchArray
      .map((place) => {
      // Identify the fragment we've matched (i.e. "[new] york")
        const regex = new RegExp(this.value, 'gi');
        // Insert a highlight into the match
        const cityName = place.city.replace(
            regex,
            `<span class="hl">${this.value}</span>`
        );
        const stateName = place.state.replace(
            regex,
            `<span class="hl">${this.value}</span>`
        );
        return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span> 
    </li>`;
      })
      .join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
