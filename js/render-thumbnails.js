import {getPhotoData} from './get-photo-data.js';
import {openModalBigPhoto} from './render-big-picture.js';

const photoData = getPhotoData();
const thumbnailContainer = document.querySelector('.pictures');
const thumbnails = thumbnailContainer.querySelectorAll('.picture');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

function renderThumbnailList () {
  const photoListFragment = document.createDocumentFragment();

  photoData.forEach((element) => {
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

function clearThumbnailList () {
  thumbnails.forEach((element) => {
    element.remove();
  });
}

thumbnailContainer.addEventListener('click', (evt) =>{
  const clickedThumbnail = evt.target.closest('.picture');

  if (clickedThumbnail) {
    evt.preventDefault();
    openModalBigPhoto(clickedThumbnail.dataset.pictureId, photoData);
  }
});

export {renderThumbnailList, clearThumbnailList};
