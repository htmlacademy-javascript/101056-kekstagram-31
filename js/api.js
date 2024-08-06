const URL_TO_GET_DATA = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
const URL_TO_SEND_DATA = 'https://32.javascript.htmlacademy.pro/kekstagram';


// const getData = (onSuccess, onFail) => {
//   fetch(URL_TO_GET_DATA)
//     .then((response) => {
//       if (!response.ok) {
//         onFail();
//         throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       onSuccess(data);
//     })
//     .catch((error) => {
//       throw new Error(`Произошла ошибка: ${error.message}`);
//     });
// };

const getData = (successCallback, errorCallback) => fetch(URL_TO_GET_DATA, {
  method: 'GET',
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(successCallback)
  .catch(errorCallback);

const sendData = (formData) =>
  fetch(URL_TO_SEND_DATA, {
    method: 'POST',
    body: formData,
  });

export { getData, sendData };
