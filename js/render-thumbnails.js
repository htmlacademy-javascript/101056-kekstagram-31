import {getPhotoData} from './get-photo-data.js';

const photoData = getPhotoData();
const thumbnailList = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

function renderThumbnailList () {
  const photoListFragment = document.createDocumentFragment();

  photoData.forEach((element) => {
    const photoElement = thumbnailTemplate.cloneNode(true);
    photoElement.querySelector('img').src = element.url;
    photoElement.querySelector('img').alt = element.description;
    photoElement.querySelector('.picture__likes').textContent = element.likes;
    photoElement.querySelector('.picture__comments').textContent = element.comments.length;
    photoListFragment.appendChild(photoElement);
  });

  thumbnailList.appendChild(photoListFragment);
}

function clearThumbnailList () {
  const elementsToDelete = thumbnailList.querySelectorAll('.picture');
  elementsToDelete.forEach((element) => {
    element.remove();
  });
}

export {renderThumbnailList, clearThumbnailList};
