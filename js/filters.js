import {getRandomNumber} from './util.js';
import {renderThumbnailList, getDataForFiltering} from './render-thumbnails.js';

const imgFilters = document.querySelector('.img-filters');

let photoData;

function showFilters (){
  imgFilters.classList.remove('img-filters--inactive');
  photoData = getDataForFiltering();
}

function clearThumbnailList () {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((element) => {
    element.remove();
  });
}

imgFilters.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    const buttons = imgFilters.querySelectorAll('.img-filters__button');
    buttons.forEach((btn) => btn.classList.remove('img-filters__button--active'));

    evt.target.classList.add('img-filters__button--active');
    changeThumbnailList(evt);
  }
});

function changeThumbnailList (evt){
  if (evt.target.closest('#filter-default')){
    clearThumbnailList();
    renderThumbnailList(photoData,);

  } else if (evt.target.closest('#filter-random')){
    const shuffledPhotoData = shuffleArray(photoData.slice());
    clearThumbnailList();
    renderThumbnailList(shuffledPhotoData,);

  } else if (evt.target.closest('#filter-discussed')){
    const sortedByCommentsCountPhotoData = sortDescending(photoData.slice());
    clearThumbnailList();
    renderThumbnailList(sortedByCommentsCountPhotoData,);
  }
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomNumber(0, i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function sortDescending(array) {
  return [...array].sort((a, b) => b.comments.length - a.comments.length);
}

export {showFilters};

