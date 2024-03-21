import {isEscapeKey} from './util.js';
import {validateHashtags, getErrorText} from './form-img-upload-validate.js';

const form = document.querySelector('.img-upload__form');
const formImgUploadInput = form.querySelector('.img-upload__input');

const formImgUploadOverlay = form.querySelector('.img-upload__overlay');
const formImgUploadWrapper = formImgUploadOverlay.querySelector('.img-upload__wrapper');
const formImgPreviewContainer = formImgUploadWrapper.querySelector('.img-upload__preview-container');
const formImgUploadPreview = formImgPreviewContainer.querySelector('.img-upload__preview');
const formImgUploadCancel = formImgUploadOverlay.querySelector('.img-upload__cancel');

const formTextHashtags = formImgUploadOverlay.querySelector('.text__hashtags');
const formTextDescription = formImgUploadOverlay.querySelector('.text__description');


function onFormEsc (evt) {
  if (
    isEscapeKey(evt)
    && !document.activeElement.querySelector('.text__hashtags')
    && !document.activeElement.querySelector('.text__description')
  ) {
    evt.preventDefault();
    closeForm();
  }
}

function onFormClickCancel (evt) {
  evt.preventDefault();
  closeForm();
}

formImgUploadInput.addEventListener ('change', (evt) =>{
  evt.preventDefault();
  openForm();
});

function openForm () {
  formImgUploadOverlay.classList.remove('hidden');

  formImgUploadCancel.addEventListener('click', onFormClickCancel);
  document.addEventListener('keydown', onFormEsc);

  const file = formImgUploadInput.files[0];
  const imageURL = URL.createObjectURL(file);
  formImgUploadPreview.querySelector('img').src = imageURL;
}

function closeForm () {
  formImgUploadOverlay.classList.add('hidden');

  formImgUploadCancel.removeEventListener('click', onFormClickCancel);
  document.removeEventListener('keydown', onFormEsc);

  formImgUploadInput.value = null;
  formTextHashtags.value = null;
  formTextDescription.value = null;
}

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form_invalid',
  successClass: 'form_valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error',
  errorTextTag: 'div',
});


pristine.addValidator(form.querySelector('.text__hashtags'), validateHashtags, getErrorText);

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
