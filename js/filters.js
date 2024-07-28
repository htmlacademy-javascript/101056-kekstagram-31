import {sortArrayDescending, shuffleArray} from './util.js';
import {renderThumbnailList} from './render-thumbnails.js';

const imgFilters = document.querySelector('.img-filters');


function showFilters (data){
  imgFilters.classList.remove('img-filters--inactive');
  setFiltersClick(data);
}

function clearThumbnailList () {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((element) => {
    element.remove();
  });
}

function setFiltersClick (data) {
  imgFilters.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      const buttons = imgFilters.querySelectorAll('.img-filters__button');
      const button = evt.target.closest('.img-filters__button');

      if (
        button
        && !button.classList.contains('img-filters__button--active')
        || evt.target.closest('#filter-random')
      ){
        buttons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
        evt.target.classList.add('img-filters__button--active');
        changeThumbnailList(evt, data);
      }
    }
  });
}

function changeThumbnailList(evt, data) {
  const filterActions = {
    'filter-default': () => data,
    'filter-random': () => shuffleArray(data.slice()),
    'filter-discussed': () => sortArrayDescending(data.slice(), (item) => item.comments.length),
  };

  const filterButton = Object.keys(filterActions).find((filter) => evt.target.closest(`#${filter}`));

  if (filterButton) {
    clearThumbnailList();
    const filteredPhotoData = filterActions[filterButton]();
    renderThumbnailList(filteredPhotoData);
  }
}

export {showFilters};

