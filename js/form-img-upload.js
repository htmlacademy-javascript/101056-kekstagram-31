import {isEscapeKey} from './util.js';
import {onFormClickScaleButtons, updateImageScale} from './form-img-upload-scale.js';
import {onFormClickFilter, resetFilter} from './form-img-upload-slider.js';

const form = document.querySelector('.img-upload__form');
const formImgUploadInput = form.querySelector('.img-upload__input');

const formImgUploadOverlay = form.querySelector('.img-upload__overlay');
const formImgUploadWrapper = formImgUploadOverlay.querySelector('.img-upload__wrapper');
const formImgPreviewContainer = formImgUploadWrapper.querySelector('.img-upload__preview-container');
const formImgUploadPreview = formImgPreviewContainer.querySelector('.img-upload__preview');
const formImgUploadCancel = formImgUploadOverlay.querySelector('.img-upload__cancel');
const formImgUploadScale = formImgUploadWrapper.querySelector('.img-upload__scale');
const imgUploadEffects = formImgUploadWrapper.querySelector('.img-upload__effects');
const slider = formImgUploadWrapper.querySelector('.img-upload__effect-level');


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

function resetForm () {
  form.reset();
  formImgUploadPreview.querySelector('img').src = 'img/upload-default-image.jpg';
  resetFilter();
  updateImageScale(100);
}

formImgUploadInput.addEventListener ('change', (evt) =>{
  evt.preventDefault();
  openForm();
});

function showError() {
  const existingError = document.querySelector('.data-error');
  if (existingError) {
    existingError.remove();
  }

  const errorTemplate = document.getElementById('data-error');
  const clone = document.importNode(errorTemplate.content, true);
  const errorElement = document.createElement('div');
  errorElement.appendChild(clone);
  document.body.appendChild(errorElement);
  const errorText = document.body.querySelector('.data-error__title');
  errorText.textContent = 'Не верный формат файла. Загружайте: .jpg / .jpeg / .png';

  setTimeout(() => {
    errorElement.remove();
  }, 2000);
}

function openForm () {
  const file = formImgUploadInput.files[0];
  const fileName = file.name;

  if ((fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png'))){
    const imageURL = URL.createObjectURL(file);
    formImgUploadPreview.querySelector('img').src = imageURL;

    formImgUploadOverlay.classList.remove('hidden');
    slider.classList.add('hidden');

    formImgUploadCancel.addEventListener('click', onFormClickCancel);
    document.addEventListener('keydown', onFormEsc);
    formImgUploadScale.addEventListener('click', onFormClickScaleButtons);
    imgUploadEffects.addEventListener('change', onFormClickFilter);
  } else {
    showError();
    formImgUploadInput.value = '';
  }
}

function closeForm (isError) {
  formImgUploadOverlay.classList.add('hidden');

  if (!isError){
    formImgUploadCancel.removeEventListener('click', onFormClickCancel);
    document.removeEventListener('keydown', onFormEsc);
    formImgUploadScale.removeEventListener('click', onFormClickScaleButtons);
    imgUploadEffects.removeEventListener('change', onFormClickFilter);

    resetForm();
  }
}

export {closeForm};
