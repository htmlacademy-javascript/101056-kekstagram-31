import {hasDuplicates} from './util.js';

const PATTERN = /^[#a-zа-яё0-9]+$/;
const HASHTAGS_MAX = 5;
let errorText = '';

function validateHashtags(value) {
  if (value === '') {
    return true;
  }
  const hashtagsString = value.trim().toLowerCase();
  const hashtags = hashtagsString.split(/\s+/).filter(Boolean);

  if (hashtags.length > HASHTAGS_MAX) {
    errorText = `Нельзя указать больше ${ HASHTAGS_MAX } хэштегов`;
    return false;
  }
  if (hasDuplicates(hashtags)) {
    errorText = 'Хэштеги не должны повторяться';
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (!hashtags[i].startsWith('#')) {
      errorText = 'Хэштег начинается с символа # ';
      return false;
    }
    if (!PATTERN.test(hashtags[i])) {
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

function validateDescription (value) {
  if (value.length > 140) {
    errorText = 'Длина комментария не более 140 символов';
    return false;
  }
  return true;
}

function getErrorText () {
  return errorText;
}

export {validateHashtags, getErrorText, validateDescription};
