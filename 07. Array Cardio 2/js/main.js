// ## Array Cardio Day 2

const people = [
  {name: 'Wes', year: 1988},
  {name: 'Kait', year: 1986},
  {name: 'Irv', year: 1970},
  {name: 'Lux', year: 2015},
];

const comments = [
  {text: 'Love this!', id: 523423},
  {text: 'Super good', id: 823423},
  {text: 'You are the best', id: 2039842},
  {text: 'Ramen is my fav food ever', id: 123523},
  {text: 'Nice Nice Nice!', id: 542328},
];

const thisYear = new Date().getFullYear().toString();

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
const someNineteen = people.some((person) => {
  return person.year <= thisYear - 19;
});

console.log(someNineteen);

// Array.prototype.every() // is everyone 19 or older?
const everyNineteen = people.every((person) => {
  return person.year <= thisYear - 19;
});

console.log(everyNineteen);

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// Find the comment with the ID of 823423
const commentWeWant = comments.find((comment) => {
  return comment.id === 823423;
});

console.log(commentWeWant);

// Array.prototype.findIndex()
// Find the comment with this ID
// Delete the comment with the ID of 823423
const commentToDelete = comments.findIndex((comment) => comment.id === 823423);

const newComments = [
  ...comments.slice(0, commentToDelete),
  ...comments.slice(commentToDelete + 1),
];

console.log(newComments);
console.log(comments);
