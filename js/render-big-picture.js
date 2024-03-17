import {photoData} from './render-thumbnails.js';
import {isEscapeKey} from './util.js';
import {renderFirstsComments, renderMoreComments} from './render-comments.js';

const modalBigPhoto = document.querySelector('.big-picture');
const bigPictureCancel = modalBigPhoto.querySelector('.big-picture__cancel');
const bigPhoto = modalBigPhoto.querySelector('.big-picture__img');
const bigPictureSocial = modalBigPhoto.querySelector('.big-picture__social');
const socialComments = modalBigPhoto.querySelector('.social__comments');
const commentsLoader = bigPictureSocial.querySelector('.comments-loader');


function findPhotoObject(pictureId) {
  return photoData.find((item) => item.id === parseInt(pictureId, 10));
}

function changeBigPhoto (pictureId) {
  const photoObject = findPhotoObject(pictureId);

  bigPhoto.querySelector('img').src = photoObject.url;
  bigPhoto.querySelector('img').alt = photoObject.description;
  bigPictureSocial.querySelector('.likes-count').textContent = photoObject.likes;
  bigPictureSocial.querySelector('.social__comment-total-count').textContent = photoObject.comments.length;
  bigPictureSocial.querySelector('.social__caption').textContent = photoObject.description;

  renderFirstsComments();
}

function onModalBigPhotoEsc (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalBigPhoto();
  }
}

function onModalBigPhotoClickElsewhere (evt) {
  if (!evt.target.closest('.big-picture__preview')) {
    closeModalBigPhoto();
  }
}

function openModalBigPhoto (pictureId) {
  modalBigPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPhoto.dataset.pictureId = pictureId;

  document.addEventListener('keydown', onModalBigPhotoEsc);
  modalBigPhoto.addEventListener('click', onModalBigPhotoClickElsewhere);
  commentsLoader.addEventListener('click', renderMoreComments);

  changeBigPhoto(pictureId);
}

function closeModalBigPhoto () {
  modalBigPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalBigPhotoEsc);
  modalBigPhoto.removeEventListener('click', onModalBigPhotoClickElsewhere);
  commentsLoader.removeEventListener('click', renderMoreComments);
  socialComments.innerHTML = '';
}

bigPictureCancel.addEventListener('click', () =>{
  closeModalBigPhoto();
});

export {openModalBigPhoto, closeModalBigPhoto, findPhotoObject};
