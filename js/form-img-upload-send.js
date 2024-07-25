import {validateHashtags, getErrorText, validateDescription} from './form-img-upload-validate.js';
import {isEscapeKey} from './util.js';

const form = document.querySelector('.img-upload__form');
const templateSuccess = document.querySelector('#success');
const templateError = document.querySelector('#error');

let notificationElement;
let notificationCancel;
let isResponseOk;

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(form.querySelector('.text__hashtags'), validateHashtags, getErrorText);
pristine.addValidator(form.querySelector('.text__description'), validateDescription, getErrorText);

function onNotificationEsc (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeNotification();
  }
}
function onNotificationClickCancel (evt) {
  evt.preventDefault();
  closeNotification();
}
function onNotificationClickElsewhere(evt) {
  if (!evt.target.closest('.error__inner') && isResponseOk === true) {
    closeNotification();
  } else if (!evt.target.closest('.success__inner') && isResponseOk === false){
    closeNotification();
  }
}

function showNotification(isError) {
  let clone;
  if (isError) {
    clone = document.importNode(templateError.content, true);
  } else {
    clone = document.importNode(templateSuccess.content, true);
  }

  if (notificationElement) {
    document.body.removeChild(notificationElement);
  }

  notificationElement = document.createElement('div');
  notificationElement.appendChild(clone);
  document.body.appendChild(notificationElement);

  if (isError){
    notificationCancel = document.querySelector('.error__button');
  } else {
    notificationCancel = document.querySelector('.success__button');
  }

  notificationCancel.addEventListener('click', onNotificationClickCancel);
  document.addEventListener('keydown', onNotificationEsc);
  notificationElement.addEventListener('click', onNotificationClickElsewhere);
}

function closeNotification() {
  if (notificationCancel) {
    notificationCancel.removeEventListener('click', onNotificationClickCancel);
    notificationElement.removeEventListener('click', onNotificationClickElsewhere);
  }
  document.removeEventListener('keydown', onNotificationEsc);
  if (notificationElement) {
    notificationElement.remove();
    notificationElement = null;
  }
}

function setUserFormSubmit(onSuccess){
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);

      fetch(
        'https://32.javascript.htmlacademy.pro/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      ).then((response) => {
        isResponseOk = !response.ok;
        showNotification(!response.ok);
        onSuccess(!response.ok);
      });
    }
  });
}

export {setUserFormSubmit};
