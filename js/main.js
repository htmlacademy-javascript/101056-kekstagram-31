import { getData } from './api.js';
import { closeForm } from './form-img-upload.js';
import { setUserFormSubmit } from './form-img-upload-sending-data.js';
import { renderThumbnailList, showError, showFilters, setThumbnailsClick } from './render-thumbnails.js';


getData(
  (data) => {
    renderThumbnailList(data);
    setThumbnailsClick(data);
    showFilters(data);
  },
  () => {
    showError();
  }
);


// getData(showThumbnailList, showError);
setUserFormSubmit(closeForm);
