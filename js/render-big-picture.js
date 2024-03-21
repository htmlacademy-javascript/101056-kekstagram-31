import {isEscapeKey} from './util.js';
import {renderFirstsComments, renderMoreComments} from './render-comments.js';

const modalBigPhoto = document.querySelector('.big-picture');
const bigPhoto = modalBigPhoto.querySelector('.big-picture__img');
const bigPictureSocial = modalBigPhoto.querySelector('.big-picture__social');
const commentsLoader = bigPictureSocial.querySelector('.comments-loader');


function findPhotoObject(pictureId, photoData) {
  return photoData.find((item) => item.id === parseInt(pictureId, 10));
}

function onModalKeydownEsc (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalBigPhoto();
  }
}

function onModalClickElsewhere (evt) {
  if (!evt.target.closest('.big-picture__preview')) {
    closeModalBigPhoto();
  }
}

function onModalClickLoadMore () {
  renderMoreComments();
}

function openModalBigPhoto (pictureId, photoData) {
  modalBigPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onModalKeydownEsc);
  modalBigPhoto.addEventListener('click', onModalClickElsewhere);
  commentsLoader.addEventListener('click', onModalClickLoadMore);

  const photoObject = findPhotoObject(pictureId, photoData);

  bigPhoto.querySelector('img').src = photoObject.url;
  bigPhoto.querySelector('img').alt = photoObject.description;
  bigPictureSocial.querySelector('.likes-count').textContent = photoObject.likes;
  bigPictureSocial.querySelector('.social__comment-total-count').textContent = photoObject.comments.length;
  bigPictureSocial.querySelector('.social__caption').textContent = photoObject.description;

  renderFirstsComments(photoObject.comments);
}

function closeModalBigPhoto () {
  modalBigPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalKeydownEsc);
  modalBigPhoto.removeEventListener('click', onModalClickElsewhere);
  commentsLoader.removeEventListener('click', onModalClickLoadMore);
}


export {openModalBigPhoto, closeModalBigPhoto};
