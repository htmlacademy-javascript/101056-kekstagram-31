const filtersData = {
  none: {range: {min: 0, max: 1}, step: 0.1},
  chrome: {range: {min: 0, max: 1}, step: 0.1},
  sepia: {range: {min: 0, max: 1}, step: 0.1},
  marvin: {range: {min: 0, max: 100}, step: 1},
  phobos: {range: {min: 0, max: 3}, step: 0.1},
  heat: {range: {min: 1, max: 3}, step: 0.1}
};

let currentFilter;

const formImgUploadWrapper = document.querySelector('.img-upload__wrapper');
const slider = formImgUploadWrapper.querySelector('.img-upload__effect-level');
const levelSlider = formImgUploadWrapper.querySelector('.effect-level__slider');
const levelValue = formImgUploadWrapper.querySelector('.effect-level__value');
const imgUploadPreview = formImgUploadWrapper.querySelector('.img-upload__preview');
const noneRadioButton = formImgUploadWrapper.querySelector('#effect-none');

function changeFilter (filter, value) {
  switch (filter) {
    case 'none' : imgUploadPreview.style.filter = ''; break;
    case 'chrome' : imgUploadPreview.style.filter = `grayscale(${value})`; break;
    case 'sepia' : imgUploadPreview.style.filter = `sepia(${value})`; break;
    case 'marvin' : imgUploadPreview.style.filter = `invert(${value}%)`; break;
    case 'phobos' : imgUploadPreview.style.filter = `blur(${value}px)`; break;
    case 'heat' : imgUploadPreview.style.filter = `brightness(${value})`; break;
  }
}

noUiSlider.create (levelSlider, {
  range: {
    min: filtersData.none.range.min,
    max: filtersData.none.range.max
  },
  start: filtersData.none.range.max,
  step: filtersData.none.step,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

levelSlider.noUiSlider.on('update', () => {
  levelValue.value = levelSlider.noUiSlider.get();
  changeFilter(currentFilter, levelValue.value);
});

levelSlider.setAttribute('disabled', true);

function resetFilter () {
  levelSlider.removeAttribute('disabled');
  noneRadioButton.checked = true;
  levelSlider.noUiSlider.set(0);
  levelSlider.setAttribute('disabled', true);
}

function onFormClickFilter (evt) {
  slider.classList.remove('hidden');
  const clickedElementId = evt.target.id.split('-')[1];
  if (clickedElementId !== 'none') {
    levelSlider.removeAttribute('disabled');
    currentFilter = clickedElementId;
    levelSlider.noUiSlider.updateOptions({
      range: {
        min: filtersData[clickedElementId].range.min,
        max: filtersData[clickedElementId].range.max
      },
      start: filtersData[clickedElementId].range.max,
      step: filtersData[clickedElementId].step
    });
  } else {
    slider.classList.add('hidden');
    resetFilter();
  }
}

export {onFormClickFilter, resetFilter};
