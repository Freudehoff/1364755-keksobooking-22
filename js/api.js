import {showAlert} from './util.js';

const getData = (onSuccess) => { // Получаем данные с сервера
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные');
    })
};

export {getData};
