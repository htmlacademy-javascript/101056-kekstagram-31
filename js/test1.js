// function getUniqueID() {
//   let uniqueID = `${new Date().getTime() }.`;
//   const primer = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const randomStringLenght = 10;
//   for (let i = 0; i < randomStringLenght; i++) {
//     uniqueID += primer.charAt(Math.floor(Math.random() * primer.length));
//   }
//   return uniqueID;
// }
// console.log(getUniqueID());
// // const users = Array.from({length: 100}, getUniqueID);
// // console.log(users);

function getUniqueID() {
  return `${new Date().getTime()}.${Math.round(Math.random() * 100000000000)}`;
}
// console.log(getUniqueID());

function getRandomNumber () {
  return Math.floor(Math.random() * 9);
}

// const users = Array.from({length: 100}, getRandomNumber);
// console.log(users);


function getRandomInteger (a, b) {
  const lower = Math.ceil(Math.min(a, b)); // округление вверх наименьшего числа
  const upper = Math.floor(Math.max(a, b)); // округление вниз наибольшего числа
  const result = Math.random() * (upper - lower + 1) + lower;
  // случайное число * (наибольшее - наименьшее + 1) + наименьшее

  return Math.floor(result); // вернуть округление результата
}

console.log(getRandomInteger(1, 10));
