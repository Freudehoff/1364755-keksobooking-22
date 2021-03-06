import {MAIN_LAT, MAIN_LNG} from './map.js';

const typeInput = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInInput = document.querySelector('#timein');
const timeOutInput = document.querySelector('#timeout');
const addressInput = document.querySelector('#address');
const titleInput = document.querySelector('#title');
const roomNumberInput = document.querySelector('#room_number');
const guestsInput = document.querySelector('#capacity');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MAX_ROOM = 100;
const NOT_FOR_GUESTS = 0;

typeInput.addEventListener('change', function (evt) {
  switch (evt.target.value) {
    case 'bungalow':
      priceInput.min = 0;
      priceInput.placeholder = 0;
      break;
    case 'flat':
      priceInput.min = 1000;
      priceInput.placeholder = 1000;
      break;
    case 'house':
      priceInput.min = 5000;
      priceInput.placeholder = 5000;
      break;
    case 'palace':
      priceInput.min = 10000;
      priceInput.placeholder = 10000;
      break;
  }
});

timeInInput.addEventListener('change', function (evt) {
  timeOutInput.value = evt.target.value;
});

timeOutInput.addEventListener('change', function (evt) {
  timeInInput.value = evt.target.value;
});

const validationRoomsAndGuests = function () { // Валидация количества комнат и гостей
  const roomValue = Number(roomNumberInput.value);
  const guestsValue = Number(guestsInput.value);

  if (roomValue < guestsValue && guestsValue !== NOT_FOR_GUESTS) {
    roomNumberInput.setCustomValidity('Слишком мало комнат');
  } else if (roomValue === MAX_ROOM && guestsValue !== NOT_FOR_GUESTS) {
    roomNumberInput.setCustomValidity('Такое количество комнат не для гостей');
  } else if (roomValue !== MAX_ROOM && guestsValue === NOT_FOR_GUESTS) {
    roomNumberInput.setCustomValidity('Выберите другой вариант');
  } else {
    roomNumberInput.setCustomValidity('');
  }

  roomNumberInput.reportValidity();
};

roomNumberInput.addEventListener('change', function () {
  validationRoomsAndGuests();
});

guestsInput.addEventListener('change', function () {
  validationRoomsAndGuests();
});

titleInput.addEventListener('input', function () { // Валидация поля ввода заголовка объявления
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  }  else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

priceInput.addEventListener('input', function () { // Валидация поля ввода цены
  const valuePrice = priceInput.value;

  if (valuePrice > MAX_PRICE) {
    priceInput.setCustomValidity(`Цена не может быть выше ${MAX_PRICE}`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

addressInput.setAttribute('readonly', 'readonly');
addressInput.value = MAIN_LAT.toFixed(5) + ' ' + MAIN_LNG.toFixed(5);

export {addressInput};



