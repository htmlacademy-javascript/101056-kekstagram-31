const getData = (onSuccess, onFail) => {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        onFail();
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      throw new Error(`Произошла ошибка: ${error.message}`);
    });
};

const sendData = (formData) =>
  fetch('https://32.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData,
  });

export { getData, sendData };
