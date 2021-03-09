import {MAIN_LAT, MAIN_LNG} from './map.js';

const form = document.querySelector('.ad-form');
const photo = form.querySelector('.ad-form-header');
const elements = form.querySelectorAll('.ad-form__element');
const typeInput = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const timeInInput = form.querySelector('#timein');
const timeOutInput = form.querySelector('#timeout');
const addressInput = form.querySelector('#address');
const titleInput = form.querySelector('#title');
const roomNumberInput = form.querySelector('#room_number');
const guestsInput = form.querySelector('#capacity');

const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.querySelectorAll('.map__filter');
const mapFeature = mapForm.querySelector('.map__features');

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

const disableForm = () => {
  form.classList.add('ad-form--disabled'); // Неактивное состояние формы
  photo.setAttribute('disabled', 'disabled');
  elements.forEach( function (element) {
    element.setAttribute('disabled', 'disabled');
  });
};

disableForm();

const activateForm = () => {
  form.classList.remove('ad-form--disabled'); // Активное состояние формы
  photo.removeAttribute('disabled', 'disabled');
  elements.forEach( function (element) {
    element.removeAttribute('disabled', 'disabled');
  });
};

const disableFilter = () => {
  mapForm.classList.add('map__filters--disabled'); // Неактивное состояние фильтра карты
  mapFilters.forEach( function (filter) {
    filter.setAttribute('disabled', 'disabled');
  });
  mapFeature.setAttribute('disabled', 'disabled');
};

disableFilter();

const activateFilter = () => { // Активное состояние фильтра карты
  mapForm.classList.remove('map__filters--disabled');
  mapFilters.forEach( function (filter) {
    filter.removeAttribute('disabled', 'disabled');
  });
  mapFeature.removeAttribute('disabled', 'disabled');
};

export {addressInput, activateForm, activateFilter};



