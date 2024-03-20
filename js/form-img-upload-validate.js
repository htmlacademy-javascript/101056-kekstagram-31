import {removeTrailingSpaces, hasDuplicates} from './util.js';

let errorText = '';

function validateHashtags(value) {
  if (value === '') {
    return true;
  }
  const hashtagsString = removeTrailingSpaces(value.toLowerCase());
  const hashtags = hashtagsString.split(' ');
  const pattern = /^[#a-zA-Z0-9]+$/;

  if (hashtags.length > 5) {
    errorText = 'Нельзя указать больше пяти хэштегов';
    return false;
  }
  if (hasDuplicates(hashtags)) {
    errorText = 'Хэштеги не должны повторятся';
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (!hashtags[i].startsWith('#')) {
      errorText = 'Хэштег начинается с символа # ';
      return false;
    }
    if (!pattern.test(hashtags[i])) {
      errorText = 'Хэштег должен состоять из букв и чисел';
      return false;
    }
    if (hashtags[i] === '#') {
      errorText = 'Хеш-тег не может состоять только из одной решётки';
      return false;
    }
    if (hashtags[i].length > 20) {
      errorText = 'Максимальная длина хэштега - 20 символов';
      return false;
    }
  }
  return true;
}

function getErrorText () {
  return errorText;
}

export {validateHashtags, getErrorText};
