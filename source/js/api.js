import {showAlert} from './util.js';

const GET_SERVER = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_SERVER = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(GET_SERVER)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные');
    })
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
