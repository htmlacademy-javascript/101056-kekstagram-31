import {renderThumbnailList} from './render-thumbnails.js';
import {openModalBigPhoto, closeModalBigPhoto} from './render-big-picture.js';
let photoData;

fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    photoData = data;
    renderThumbnailList(data);
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
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
