// var generateName = require('sillyname');
import generateName from 'sillyname';
import { randomSuperhero } from 'superHeroes';

var sillyName = generateName();
var superhero = randomSuperhero();

console.log(`My name is ${sillyName}.`);

console.log(`I am ${superhero}`);