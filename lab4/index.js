'use strict';

// PART I: Work with arrays, objects, strings
const numbers = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

// print arrays to console
console.log('Numbers:', numbers.join(', '));
console.log('Fruits:', fruits.join(', '));

// array sorting
console.log('Sorted numbers:', numbers.sort().join(', ')); // sort <number>
console.log('Sorted fruits:', fruits.sort().join(', ')); // sort <string>

numbers.shift(); // 1 and delete numbers[0]
numbers.pop(); // 55 and delete numbers[numbers.length - 1]

// difference bettwen value++ and ++value
let someValue = 13;
console.log(someValue++); // 13, but someValue = 14
console.log(++someValue); // 15, but someValue = 15

// diffence between let (const) and var
try {
  console.log('Before let', letVariable); // oops
  let letVariable = 11;
} catch (err) {
  console.error(err);
}

try {
  console.log('Before var', varVariable); // ok
  var varVariable = 22; 
} catch (err) {
  console.error(err);
}

// function declaration behavior
try {
  sayHiDeclaration(); // ok
  function sayHiDeclaration() {
    alert('Hi from function declaration');
  }
} catch (err) {
  console.error(err);
}

try {
  sayHiExression(); // oops
  const sayHiExression = () => alert('Hi from function expression');
} catch (err) {
  console.error(err);
}

// function and arrow context difference
const someDeclarationFunc= function () {
  console.log('Function this', this);
}
const someArrowFunc = () => console.log('Arrow this', this);
someDeclarationFunc();
someArrowFunc();

// for loop
{
  for (let i = 0; i < numbers.length; ++i) {
    (i & 1) && console.log('for', numbers[i]); // only odd i (1, 3, 5, ...)
  }
}
// or with continue
{
  for (let i = 0; i < numbers.length; ++i) {
    if (i & 1) { // if (!(i & 1)) continue ...
      console.log('for continue', numbers[i]);
    } else {
      continue;
    }
  }
} 

// while loop
let whileCounter = 0;
while (whileCounter < numbers.length) {
  console.log('while', numbers[whileCounter++]);
}

// do while loop
let doWhileCounter = 0;
do {
  console.log('do while', numbers[doWhileCounter++]);
} while (doWhileCounter < numbers.length);

// for of (iterate over values)
for (const element of numbers) {
  console.log('for of', element);
}

// for in (iterate over keys (indices))
for (const key in numbers) {
  console.log('for in', key);
}

// Array is rather collection that an array
const arrayWithoutType = [undefined, null, 'John Doe', 13, () => { console.log('func') }];
console.log(arrayWithoutType);

// indices does not matter
const smallArray = [1, 2, 3];
console.log(smallArray.length, smallArray.join(', '));
smallArray[20] = 'oops';
console.log(smallArray.length, smallArray.join(', '));

// array destructuring
const newArray = [1, 2, 3, 4, 5];
const [one, two, three] = newArray;
console.log('Destructured', one, two, three);

// strings
const someString = 'Some string here';
console.log('Are quotes equal?', 'aaa' === "aaa");

// indices work like with arrays
console.log(someString[0]); // 'S'
console.log(someString.charAt(0)); // 'S
console.log(someString[someString.length - 1]); // 'e'

// some methods
console.log('Upper', someString.toUpperCase());
console.log('Lower', someString.toLowerCase());

// parseInt or + ?
const almostNumericString = '123abc';
console.log(`+'${almostNumericString}' => `, +almostNumericString);
console.log(`parseInt('${almostNumericString}') => `, parseInt(almostNumericString));

// interesting typing
console.log(('ba' + +'???' + 'a').toLowerCase()); // banana
console.log(`'1' + 1 = `, '1' + 1); // 11
console.log(`+'1' + 1 = `, +'1' + 1); // 2
console.log(`1 - '1' = `, 1 - '1'); // 0
console.log(`'1' - 1 = `, '1' - 1); // 0

// objects
const objectJohn = {
  firstName: 'John',
  lastName: 'Doe',
  age: 18,
  sayHi() {
    return `Hi, I'm ${this.firstName} ${this.lastName}`;
  },
  // or sayHi: funtion() {}, but not sayHi: () => {}
};


// iterate over with for in
for (const objectKey in objectJohn) {
  console.log(`${objectKey}: ${objectJohn[objectKey]}`);
}

// call method
const johnHi = objectJohn.sayHi();
console.log('John says:', johnHi);

// set new attribute
objectJohn['company'] = 'Google';
console.log('With new attribute:', objectJohn);

// object destructuring
const { firstName, age } = objectJohn;
console.log(firstName, age);

// spread opperator
const obj = {'a': 1, 'b': 2, 'c': 3};
const [d, e] = [5, 6];
console.log('Spread', {...obj, d, e});

// PART II: Work with functions
// function declaration
function func() {
  return 'func1';
}

// function expression
const anotherFunc = function() { 
  return 'func2';
};

// arrow function expression
const arrowFun = () => 'func3';

// named function expression
const namedExpression = function named() {
  return 'func4';
};
console.log(namedExpression.name); // named;

// recursion with named function expression
const factorial = function factorial(n) {
  return (n >= 1) ? n * factorial(n - 1) : 1;
};

// anonymous function
console.log('Before function:', numbers);
console.log('After function:', numbers.map(x => x + 1));

// default arguments
const sumValues = (a = 1, b = 2) => a + b;
sumValues(); // 3
sumValues(100); // 102
sumValues(100, 100); // 200

// rest operator
const compose = (...funcs) => {
  return funcs.reduce((left, right) => {
    return (...args) => left(right(args));
  });
}
const composed = compose(x => x + 1, x => x * 2);
composed(5); // 12

// pointers
const pointerFunction = function sum(a, b) {
  return a + b;
};
console.log('Prototype before', pointerFunction.prototype);
const anotherPointer = pointerFunction;
anotherPointer.prototype = null;
console.log('Prototype after', pointerFunction.prototype);

// PART III: Closures
const makeAdder = a => b => a + b;
const addThree = makeAdder(3);
console.log(addThree(5)); // 8

// module
const Counter = (initialValue = 0) => {
  let value = initialValue;
  return {
    get: () => value,
    inc: () => { ++value },
    dec: () => { --value },
  }
};

// IEFE
const currentDate = (() => {
  const date = new Date();
  return date.toString();
})();
console.log('IEFE', currentDate);

// ES6 (look above)
// calcuated properties
{
  const Person = prefix => {
    return {
      [prefix + 'name']: 'John',
      [prefix + 'surname']: 'Doe',
    };
  };
  const obj = Person('super_');
  console.log(obj);
}