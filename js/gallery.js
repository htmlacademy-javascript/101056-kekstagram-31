import {renderThumbnailList} from './render-thumbnails.js';
import {openModalBigPhoto, closeModalBigPhoto} from './render-big-picture.js';

let photoData;

document.addEventListener('DOMContentLoaded', () => {
  let errorElement;
  const errorTemplate = document.getElementById('data-error');

  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        showError();
      }
      return response.json();
    })
    .then((data) => {
      photoData = data;
      renderThumbnailList(photoData);
    });


  function showError() {
    const clone = document.importNode(errorTemplate.content, true);
    errorElement = document.createElement('div');
    errorElement.appendChild(clone);
    document.body.appendChild(errorElement);

    setTimeout(() => {
      errorElement.remove();
    }, 5000);
  }
});


const thumbnailContainer = document.querySelector('.pictures');
const modalBigPicture = document.querySelector('.big-picture');
const bigPictureCancel = modalBigPicture.querySelector('.big-picture__cancel');

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
