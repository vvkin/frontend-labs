'use strict';

// PART I (array methods)

// declare arrays
const languages = ['js', 'python', 'go', 'rust', 'c++'];
const numbers = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

console.log('Languages:', languages);
console.log('Numbers:', numbers);

// forEach
const getColor = () => '#' + (((1 << 24) * Math.random()) | 0).toString(16);
document
  .querySelectorAll('.list .list__item')
  .forEach(node => (node.style.color = getColor()));

languages.forEach((item, idx) => idx & 1 && console.log(item));

// filter
const oddNumbers = numbers.filter(item => item & 1);
console.log('Odd numbers:', oddNumbers);

const longNameLanguages = languages.filter(item => item.length > 2);
console.log('Languages with name longer than 2 symbols:', longNameLanguages);

console.log(
  'There is not check for type:',
  numbers.filter(item => item - 1 > 0)
);

// map
const multipliedNumbers = numbers.map(item => item * 2);
console.log('After map:', multipliedNumbers);

const getMultiplcationTable = size => {
  const table = [];
  const sequence = Array.from({ length: size }, (_, i) => i + 1);

  for (let idx = 1; idx <= size; ++idx)
    table.push(sequence.map(item => item * idx));
  return table;
};
console.table(getMultiplcationTable(9));

// every
console.log(
  'Every number is greater than 0?',
  numbers.every(item => item > 0)
);

console.log(
  'Every language is js?',
  languages.every(item => item === 'js')
);

// some
console.log(
  'Is there number that is greater than 30?',
  numbers.some(item => item > 50)
);

console.log(
  'Is there js?',
  languages.some(item => item === 'js')
);

// reduce
const fibonacciSum = numbers.reduce((acc, val) => acc + val, 0);
console.log(`Sum of first ${numbers.length} fibonacci numbers =`, fibonacciSum);

const compose = (...funcs) =>
  funcs.reduce((left, right) => (...args) => right(left(args)));

const number = 11;
const composed = compose(
  x => x * 2,
  x => +x + 1,
  x => x / 5
);
console.log(`(${number} * 2 + 1) / 5 = `, composed(number));

// reduceRight
const languagesChain = languages.reduceRight((acc, val) => acc + val);
console.log('Reverse languages chain:', languagesChain);

numbers.reduceRight((previous, current) => {
  console.log(`previous: ${previous}, current: ${current}`);
  return current;
});
