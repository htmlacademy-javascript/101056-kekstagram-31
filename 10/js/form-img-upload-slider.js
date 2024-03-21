const formImgUploadWrapper = document.querySelector('.img-upload__wrapper');
const formEffectLevelSlider = formImgUploadWrapper.querySelector('.effect-level__slider');
const formEffectLevelValue = formImgUploadWrapper.querySelector('.effect-level__value');


noUiSlider.create (formEffectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 10,
  connect: 'lower',
});

formEffectLevelSlider.noUiSlider.on('update', () => {
  formEffectLevelValue.value = formEffectLevelSlider.noUiSlider.get();
});

