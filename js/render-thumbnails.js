const thumbnailContainer = document.querySelector('.pictures');
const thumbnails = thumbnailContainer.querySelectorAll('.picture');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

function renderThumbnailList (photoData) {
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

export {renderThumbnailList, clearThumbnailList};
