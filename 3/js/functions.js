// Задание 1

const checkLengthString = (string = '', maxSymbols = 1) => (string.length <= maxSymbols);

console.log('Вывод в консоль результата проверки задания 1:');
console.log(checkLengthString('проверяемая строка', 20));
console.log(checkLengthString('проверяемая строка', 18));
console.log(checkLengthString('проверяемая строка', 10));


// Задание 2

function checkPalindromic (string = '') {
  const modifiedString = string.replace(/ /g, '').toLowerCase();
  const reverseString = modifiedString.split('').reverse().join('');
  return modifiedString === reverseString;
}

console.log('Вывод в консоль результата проверки задания 2:');
console.log(checkPalindromic('Лёша на полке клопа нашёл'));
console.log(checkPalindromic('Лёша на пОлке   клопа н аШёл'));
console.log(checkPalindromic('Люблю пирожки с картошкой'));


// Задание 3

function stringToNumber (value) {
  return parseInt(value.toString().replace(/[^0-9]/g, ''), 10);
}

console.log('Вывод в консоль результата проверки задания 3:');
console.log(stringToNumber(-1));
console.log(stringToNumber(2));
console.log(stringToNumber(1.5));
console.log(stringToNumber('2023 год'));
console.log(stringToNumber('ECMAScript 2022'));
console.log(stringToNumber('1 кефир, 0.5 батона'));
console.log(stringToNumber('-1 кефир, 0.5 батона'));
console.log(stringToNumber('агент 007'));
console.log(stringToNumber('а я томат'));
