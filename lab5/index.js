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
  numbers.filter(item => item - 1)
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
  numbers.some(item => item > 30)
);

console.log(
  'Is there js?',
  languages.some(item => item === 'js')
);

// reduce
const fibonacciSum = numbers.reduce((acc, val) => acc + val);
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

// PART II (OOP)

// constructor, this usage
const ProgrammingLanguage = function (name, author, createdAt) {
  this.name = name;
  this.author = author;
  this.createdAt = createdAt;
};

ProgrammingLanguage.prototype.toString = function () {
  return `<${this.name}>: created by ${
    this.author
  } at ${this.createdAt.toString()}`;
};

ProgrammingLanguage.prototype.getAge = function () {
  return new Date().getFullYear() - this.createdAt;
};

// create objects
const pascal = new ProgrammingLanguage('Pascal', 'Niklaus Wirth', 1970);
const cpp = new ProgrammingLanguage('C++', 'Bjarne Stroustrup', 1983);

console.log(pascal.toString());
console.log('Pascal is', pascal.getAge(), 'years old');
console.log(cpp.toString());
console.log('C++ is', cpp.getAge(), 'years old');

/* Inheriting & Polymorphism*/
// prototype
const TypedProgrammingLanguage = function (name, type, author, createdAt) {
  ProgrammingLanguage.call(this, name, author, createdAt);
  this.type = type;
};

TypedProgrammingLanguage.prototype = Object.create(
  ProgrammingLanguage.prototype
);

TypedProgrammingLanguage.prototype.constructor = TypedProgrammingLanguage;

TypedProgrammingLanguage.prototype.toString = function () {
  return `<${this.name}<${this.type}>>: created by ${
    this.author
  } at ${this.createdAt.toString()}`;
};

const python = new TypedProgrammingLanguage(
  'Python',
  'interpreted',
  'Guido van Rossum',
  1991
);

console.log(python.toString());
console.log('Python is', python.getAge(), 'years old');

// ES6
class ES6ProgrammingLanguage {
  constructor(name, author, createdAt) {
    this.name = name;
    this.author = author;
    this.createdAt = createdAt;
  }

  toString() {
    return `<${this.name}>: created by ${
      this.author
    } at ${this.createdAt.toString()}`;
  }

  getAge() {
    return new Date().getFullYear() - this.createdAt;
  }
}

class ES6TypedProgrammingLanguage extends ES6ProgrammingLanguage {
  constructor(name, type, author, createdAt) {
    super(name, author, createdAt);
    this.type = type;
  }

  toString() {
    return `<${this.name}<${this.type}>>: created by ${
      this.author
    } at ${this.createdAt.toString()}`;
  }
}

const go = new ES6ProgrammingLanguage('Go', 'Rob Pike', 2009);
const rust = new ES6TypedProgrammingLanguage(
  'Rust',
  'compiled',
  'Graydon Hor',
  2010
);

console.log(go.toString());
console.log('Go is', go.getAge(), 'years old');
console.log(rust.toString());
console.log('Rust is', rust.getAge(), 'years old');

/* Private attributes and methods */

// agreement
const AgreementPerson = function (name, age, password) {
  this.name = name;
  this.age = age;
  this._password = password;

  this.sayHello = function () {
    return `Hello! I'm ${this.name}`;
  };
};

const john = new AgreementPerson('John', 21, '12345');
console.log(`It's possible to access it:`, john._password);

// closure
const ClosurePerson = function (name, age, password) {
  this.name = name;
  this.age = age;
  const _password = password;

  this.sayHello = function () {
    return `Hello! I'm ${this.name}`;
  };

  this.checkPassword = function (password) {
    return _password === password;
  };
};

const vasia = new ClosurePerson('Vasia', 18, '12345');
console.log(`Vasia's password is`, vasia.password);
console.log(`Vasia's _password is`, vasia._password);
console.log(
  `Is Vasias's password equal to '12345'?`,
  vasia.checkPassword('12345')
);

// new syntax;
class ES2020Person {
  #password;

  constructor(name, age, password) {
    this.name = name;
    this.age = age;
    this.#password = this.#encodePassword(password);
  }

  #encodePassword(password) {
    return `  ${password}  `;
  }

  #decodePassword() {
    return this.#password.trim();
  }

  checkPassword(password) {
    return this.#decodePassword() === password;
  }
}

const petro = new ES2020Person('Petro', 21, 'qwerty');
console.log(petro.password);
console.log(petro.checkPassword('qwerty'));
console.log(petro.checkPassword('12345'));
