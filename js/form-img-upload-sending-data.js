import {validateHashtags, getErrorText, validateDescription} from './form-img-upload-validate.js';
import {isEscapeKey} from './util.js';
import {sendData} from './api.js';

const form = document.querySelector('.img-upload__form');
const formImgUploadOverlay = form.querySelector('.img-upload__overlay');
const templateSuccess = document.querySelector('#success');
const templateError = document.querySelector('#error');
const submitButton = form.querySelector('.img-upload__submit');

let notificationElement;
let notificationCancel;
let isResponseError;

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
  if (!evt.target.closest('.error__inner') && isResponseError === true) {
    closeNotification();
  } else if (!evt.target.closest('.success__inner') && isResponseError === false){
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
  if (isResponseError){
    formImgUploadOverlay.classList.remove('hidden');
  }
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

function blockSubmitButton (){
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую';
}
function unblockSubmitButton (){
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

function setUserFormSubmit(onSuccess) {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (!isValid) {
      return;
    }

    const formData = new FormData(evt.target);
    blockSubmitButton();

    try {
      const response = await sendData(formData);
      isResponseError = !response.ok;
      showNotification(isResponseError);
      onSuccess(isResponseError);
    } finally {
      unblockSubmitButton();
    }
  });
}

export {setUserFormSubmit};
