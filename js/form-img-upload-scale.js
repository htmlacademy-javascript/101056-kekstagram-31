const imgUploadScale = document.querySelector('.img-upload__scale');
const controlValue = imgUploadScale.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

const STEP = 25;
let multiplier = '';

function updateImageScale(value) {
  const scaleValue = parseFloat(value) / 100;
  const transformValue = `scale(${scaleValue})`;
  imgUploadPreview.style.transform = transformValue;
}

function onFormClickScaleButtons(evt) {
  const clickedElementClassList = evt.target.classList;
  let value = parseInt(controlValue.value.slice(0, -1), 10);

  if (clickedElementClassList.contains('scale__control--bigger')) {
    multiplier = 1;
  } else if (clickedElementClassList.contains('scale__control--smaller')) {
    multiplier = -1;
  }

  value = value + STEP * multiplier;

  if (value >= 25 && value <= 100) {
    controlValue.value = `${value}%`;
    imgUploadPreview.dataset.imageScale = `${value}%`;
    updateImageScale(value);
  }
}

export {onFormClickScaleButtons, updateImageScale};
