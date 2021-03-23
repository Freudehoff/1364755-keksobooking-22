import {showSuccessMessage, showErrorMessage} from './util.js';
import {sendData} from './api.js';
import {resetMarkerAndAddress} from './popup.js';
import {mapForm} from './map-filter.js';

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
const resetForm = form.querySelector('.ad-form__reset');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MAX_ROOM = 100;
const NOT_FOR_GUESTS = 0;

typeInput.addEventListener('change', (evt) => {
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

timeInInput.addEventListener('change', (evt) => {
  timeOutInput.value = evt.target.value;
});

timeOutInput.addEventListener('change', (evt) => {
  timeInInput.value = evt.target.value;
});

const validationRoomsAndGuests = () => { // Валидация количества комнат и гостей
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

roomNumberInput.addEventListener('change', () => {
  validationRoomsAndGuests();
});

guestsInput.addEventListener('change', () => {
  validationRoomsAndGuests();
});

titleInput.addEventListener('input', () => { // Валидация поля ввода заголовка объявления
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

priceInput.addEventListener('input', () => { // Валидация поля ввода цены
  const valuePrice = priceInput.value;

  if (valuePrice > MAX_PRICE) {
    priceInput.setCustomValidity(`Цена не может быть выше ${MAX_PRICE}`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

addressInput.setAttribute('readonly', 'readonly');

const disableForm = () => {
  form.classList.add('ad-form--disabled'); // Неактивное состояние формы
  photo.setAttribute('disabled', 'disabled');
  elements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

disableForm();

const activateForm = () => {
  form.classList.remove('ad-form--disabled'); // Активное состояние формы
  photo.removeAttribute('disabled', 'disabled');
  elements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
};

const sendFormSuccess = () => { // Успешная отправка формы
  showSuccessMessage();
  form.reset();
  mapForm.reset();
  resetMarkerAndAddress();
};

const sendFormError = () => { // Ошибка при отправки формы
  showErrorMessage();
};

const setUserFormSubmit = () => { // Отправка формы
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(sendFormSuccess, sendFormError, new FormData(evt.target));
  });
};

setUserFormSubmit();

resetForm.addEventListener('click', (evt) => { // Очистка формы по нажатию на кнопку
  evt.preventDefault();
  form.reset();
  mapForm.reset();
  resetMarkerAndAddress();
})


export {addressInput, activateForm};



