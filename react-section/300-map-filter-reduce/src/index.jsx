var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.
const newNumbers = numbers.map((num) => num * 2)

//Filter - Create a new array by keeping the items that return true.
const newNumbers2 = numbers.filter((num) => num > 10);

//Reduce - Accumulate a value by doing something to each item in an array.
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

//Find - find the first item that matches from an array.
const firstEven = numbers.find((num) => num % 2 === 0);

//FindIndex - find the index of the first item that matches.
const match = numbers.findIndex((num) => num === 56);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
