import {openModalBigPhoto, closeModalBigPhoto} from './render-big-picture.js';
import {getData} from './api.js';
import {showFilters} from './filters.js';

const thumbnailContainer = document.querySelector('.pictures');
const modalBigPicture = document.querySelector('.big-picture');
const bigPictureCancel = modalBigPicture.querySelector('.big-picture__cancel');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

let photoData;

function getDataForFiltering (){
  return photoData;
}

function showError() {
  const errorTemplate = document.getElementById('data-error');
  const clone = document.importNode(errorTemplate.content, true);
  const errorElement = document.createElement('div');
  errorElement.appendChild(clone);
  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
}

function renderThumbnailList (data) {
  photoData = data;
  const photoListFragment = document.createDocumentFragment();

  data.forEach((element) => {
    const photoElement = thumbnailTemplate.cloneNode(true);
    photoElement.dataset.pictureId = element.id;
    photoElement.querySelector('img').src = element.url;
    photoElement.querySelector('img').alt = element.description;
    photoElement.querySelector('.picture__likes').textContent = element.likes;
    photoElement.querySelector('.picture__comments').textContent = element.comments.length;
    photoListFragment.appendChild(photoElement);
  });

  thumbnailContainer.appendChild(photoListFragment);
}


function onSuccess (data){
  renderThumbnailList(data, true);
  getDataForFiltering(data);
  showFilters();
}

document.addEventListener('DOMContentLoaded', () => {
  getData(onSuccess, showError);
});


thumbnailContainer.addEventListener('click', (evt) =>{
  const clickedThumbnail = evt.target.closest('.picture');

  if (clickedThumbnail) {
    evt.preventDefault();
    openModalBigPhoto(clickedThumbnail.dataset.pictureId, photoData);
  }
});

bigPictureCancel.addEventListener('click', () =>{
  closeModalBigPhoto();
});

export {renderThumbnailList, getDataForFiltering};
