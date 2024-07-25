import {validateHashtags, getErrorText, validateDescription} from './form-img-upload-validate.js';

const form = document.querySelector('.img-upload__form');


const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(form.querySelector('.text__hashtags'), validateHashtags, getErrorText);
pristine.addValidator(form.querySelector('.text__description'), validateDescription, getErrorText);


function setUserFormSubmit(onSuccess){
  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    evt.preventDefault();
    if (isValid) {
      const formData = new FormData(evt.target);

      fetch(
        'https://32.javascript.htmlacademy.pro/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      ).then(() => onSuccess());
    }
  });
}

export {setUserFormSubmit};
