function getRandomNumber (from, to) {
  const lower = Math.ceil(Math.min(from, to));
  const upper = Math.floor(Math.max(from, to));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}


function getRandomString (desiredStringLength = 1) {
  const primer = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < desiredStringLength; i++) {
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

export {getRandomNumber, getRandomString, getUniqueID};
