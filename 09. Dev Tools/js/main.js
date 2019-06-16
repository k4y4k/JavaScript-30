const dogs = [{name: 'Snickers', age: 2}, {name: 'hugo', age: 8}];

/**
 * Makes text green
 */
function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

const p = document.querySelector('p');

// Regular
console.log('that\'s pretty woomy');

// Interpolated
console.log('hello I am a %s string!', 'real');

// Styled
console.log('%c That\'s even more woomy', 'font-size: 50pt; background:red;');

// Warning!
console.warn('Final Fest soon...');

// Error :|
console.error('Splatoon 2 almost over :(');

// Info
console.info('Crocodiles exist in real life');

// Testing
// Second argument gets printed if first is false/y
console.assert(1 === 1, 'EERT');
console.assert(1 === 2, 'EERT');

// Clearing
console.clear();

// Viewing DOM Elements
console.log(p);
console.dir(p);

console.clear();

// Grouping together
dogs.forEach((dog) => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is about ${dog.age * 7} dog years old`);

  console.groupEnd(`${dog.name}`);
});

// Counting
console.count(`kayak`);
console.count(`kyak`);
console.count(`kayak`);

// Timing
console.time('fetching white house schematics for heist...');
fetch('https://api.github.com/users/by-k4y4k')
    .then((data) => data.json())
    .then((data) => {
      console.timeEnd('fetching white house schematics for heist...');
      console.log(data);
    });

console.table(dogs);
