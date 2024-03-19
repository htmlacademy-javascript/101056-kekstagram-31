import {isEscapeKey} from './util.js';

const form = document.querySelector('.img-upload__form');
const formImgUploadInput = form.querySelector('.img-upload__input');
const formImgUploadCancel = form.querySelector('.img-upload__cancel');
const formImgUploadOverlay = form.querySelector('.img-upload__overlay');


function onFormEsc (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

function onFormClickCancel () {
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
}

function closeForm () {
  formImgUploadOverlay.classList.add('hidden');

  formImgUploadCancel.removeEventListener('click', onFormClickCancel);
  document.removeEventListener('keydown', onFormEsc);
}


