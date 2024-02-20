function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);


function checkPalindromic (string) {
  // const modifiedString = string.replace(/ /g, '').toLowerCase();
  // const stringToArray = modifiedString.split('');
  // stringToArray.reverse();
  // const reverseString = stringToArray.join('');
  // return modifiedString === reverseString;

  // мне было непонятно, поэтому вначале написал длинный вариант
  // вот так будет короче

  const modifiedString = string.replace(/ /g, '').toLowerCase();
  const reverseString = modifiedString.split('').reverse().join('');
  return modifiedString === reverseString;
}

checkPalindromic('Лёша на полке клопа нашёл');
checkPalindromic('Лёша на пОлке   клопа н аШёл');
checkPalindromic('Люблю пирожки с картошкой');


function stringToNumber (value) {
  return parseInt(value.toString().replace(/[^0-9]/g, ''), 10);
}

stringToNumber(-1);
stringToNumber(2);
stringToNumber(1.5);
stringToNumber('2023 год');
stringToNumber('ECMAScript 2022');
stringToNumber('1 кефир, 0.5 батона');
stringToNumber('-1 кефир, 0.5 батона');
stringToNumber('агент 007');
stringToNumber('а я томат');
