const formImgUploadWrapper = document.querySelector('.img-upload__wrapper');
const levelSlider = formImgUploadWrapper.querySelector('.effect-level__slider');
const levelValue = formImgUploadWrapper.querySelector('.effect-level__value');

noUiSlider.create (levelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 10,
  connect: 'lower',
});

levelSlider.noUiSlider.on('update', () => {
  levelValue.value = levelSlider.noUiSlider.get();
});

