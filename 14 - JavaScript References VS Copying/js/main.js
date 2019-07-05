// Start with strings, numbers and booleans
let age = 100;
const age2 = age;
console.log(age, age2);
age = 200;

console.log(age, age2);

let name = 'kayak';
const name2 = name;
console.log(name, name2);
name = 'wakka kakka';

console.log(name, name2);

// Let's say we have an array
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// And we want to make a copy of it.
const team = players;

// You might think we can just do something like this:
team[3] = 'Lux';

// However what happens when we update that array?
console.log(players);

// Now here is the problem!
console.log(team);

// Oh no - we have edited the original array too!
// Why? It's because that is an array reference, not an array copy. They both point to the same array!
// So, how do we fix this? We take a copy instead!

// One way
const team2 = players.slice();
team2[3] = 'Woomy';

console.log(players, team2);

// Or create a new array and concat the old one in
const team3 = [].concat(players);
team3[3] = 'Ngyes';

console.log(players, team3);

// Or use the new ES6 Spread
const team4 = [...players];
team4[3] = 'Veemo';

console.log(players, team4);

const team5 = Array.from(players);
team5[3] = 'Oomi';

console.log(players, team5);
// Now when we update it, the original one isn't changed

// The same thing goes for objects, let's say we have a person object

// With Objects
const person = {
  name: 'John Smith',
  age: 80,
};

// And think we make a copy:
const captain = person;
person.number = 99;

console.log(captain, person);

// How do we take a copy instead?

const cap2 = Object.assign({}, person, {
  number: 45,
  age: 12,
});

console.log(cap2, person);

// We will hopefully soon see the object ...spread

// Things to note - this is only 1 level deep - both for Arrays and Objects.
// Lodash has a cloneDeep method, but you should think twice before using it.
