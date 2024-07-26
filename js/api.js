function getData(onSuccess, onFail){
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        onFail();
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    });
}


// function sendData(onSuccess, onFail, body){

// }

export {getData};
