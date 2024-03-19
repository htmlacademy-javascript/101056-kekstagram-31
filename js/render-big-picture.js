import {isEscapeKey} from './util.js';
import {renderFirstsComments, renderMoreComments} from './render-comments.js';

const modalBigPhoto = document.querySelector('.big-picture');
const bigPictureCancel = modalBigPhoto.querySelector('.big-picture__cancel');
const bigPhoto = modalBigPhoto.querySelector('.big-picture__img');
const bigPictureSocial = modalBigPhoto.querySelector('.big-picture__social');
const socialComments = modalBigPhoto.querySelector('.social__comments');
const commentsLoader = bigPictureSocial.querySelector('.comments-loader');


function findPhotoObject(pictureId, photoData) {
  return photoData.find((item) => item.id === parseInt(pictureId, 10));
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

function openModalBigPhoto (pictureId, photoData) {
  modalBigPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPhoto.dataset.pictureId = pictureId;

  document.addEventListener('keydown', onModalBigPhotoEsc);
  modalBigPhoto.addEventListener('click', onModalBigPhotoClickElsewhere);
  commentsLoader.addEventListener('click', renderMoreComments);

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

  document.removeEventListener('keydown', onModalBigPhotoEsc);
  modalBigPhoto.removeEventListener('click', onModalBigPhotoClickElsewhere);
  commentsLoader.removeEventListener('click', renderMoreComments);
  socialComments.innerHTML = '';
}

bigPictureCancel.addEventListener('click', () =>{
  closeModalBigPhoto();
});

export {openModalBigPhoto, closeModalBigPhoto};
