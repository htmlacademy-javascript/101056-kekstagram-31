function getRandomNumber (from, to) {
  const lower = Math.ceil(Math.min(from, to));
  const upper = Math.floor(Math.max(from, to));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}


function isInteger(value) {
  return /^\d+$/.test(value);
}

function getRandomString (desiredStringLength = 1) {
  const primer = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < desiredStringLength; i++) {
    if (isInteger(i / 45)) {
      randomString += ' ';
    }
    randomString += primer.charAt(Math.floor(Math.random() * primer.length));
  }
  return randomString;
}


function getUniqueID(from, to) {
  let id = from;
  const ids = new Set();
  return function (){
    while (ids.has(id)) {
      id = getRandomNumber(from, to);
    }
    ids.add(id);
    return id;
  };
}


function isEscapeKey (evt) {
  return evt.keyCode === 27;
}

function isEnterKey (evt) {
  return evt.keyCode === 13;
}


export {getRandomNumber, getRandomString, getUniqueID, isEscapeKey, isEnterKey};
