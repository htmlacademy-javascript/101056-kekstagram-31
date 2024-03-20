import {renderThumbnailList} from './render-thumbnails.js';
import {openModalBigPhoto, closeModalBigPhoto} from './render-big-picture.js';
import {getPhotoData} from './get-photo-data.js';

const thumbnailContainer = document.querySelector('.pictures');
const modalBigPicture = document.querySelector('.big-picture');
const bigPictureCancel = modalBigPicture.querySelector('.big-picture__cancel');

const photoData = getPhotoData();
renderThumbnailList(photoData);

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
