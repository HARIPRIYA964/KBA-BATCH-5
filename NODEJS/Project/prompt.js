import prompt from 'prompt-sync';
const input = prompt();
// const prompt = require('prompt-sync')();

// const name = input('What is your name?')
// console.log(`your name is ${name}`);


const num1 = input(" Enter the first number: ");
const num2 = input(" Enter the second number: ");
const sum = parseInt(num1) + parseInt(num2);
console.log(`The sum of the two numbers is ${sum}`);