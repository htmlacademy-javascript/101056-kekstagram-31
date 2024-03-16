import {photoData} from './render-thumbnails.js';
import {isEscapeKey} from './util.js';
import {renderComments} from './render-comments.js';

const modalBigPhoto = document.querySelector('.big-picture');
const bigPictureCancel = modalBigPhoto.querySelector('.big-picture__cancel');
const bigPhoto = modalBigPhoto.querySelector('.big-picture__img');
const bigPictureSocial = modalBigPhoto.querySelector('.big-picture__social');
const socialComments = modalBigPhoto.querySelector('.social__comments');

const socialCommentCount = bigPictureSocial.querySelector('.social__comment-count');
const commentsLoader = bigPictureSocial.querySelector('.comments-loader');


function findPhotoObject(pictureId) {
  return photoData.find((item) => item.id === parseInt(pictureId, 10));
}

function changeBigPhoto (pictureId) {
  const photoObject = findPhotoObject(pictureId);

  bigPhoto.querySelector('img').src = photoObject.url;
  bigPhoto.querySelector('img').alt = photoObject.description;
  bigPictureSocial.querySelector('.likes-count').textContent = photoObject.likes;
  bigPictureSocial.querySelector('.social__comment-shown-count').textContent = photoObject.comments.length;
  bigPictureSocial.querySelector('.social__comment-total-count').textContent = photoObject.comments.length;
  bigPictureSocial.querySelector('.social__caption').textContent = photoObject.description;

  renderComments(photoObject.comments);
}

function onModalBigPhotoEsc (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalBigPhoto();
  }
}

function openModalBigPhoto (pictureId) {
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  modalBigPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onModalBigPhotoEsc);

  changeBigPhoto(pictureId);
}

function closeModalBigPhoto () {
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  modalBigPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalBigPhotoEsc);
  socialComments.innerHTML = '';
}

bigPictureCancel.addEventListener('click', () =>{
  closeModalBigPhoto();
});

export {openModalBigPhoto, closeModalBigPhoto};
