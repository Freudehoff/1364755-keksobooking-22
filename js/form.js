import {addressHandler} from './map.js';

const typeInput = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInInput = document.querySelector('#timein');
const timeOutInput = document.querySelector('#timeout');
const addressInput = document.querySelector('#address');

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
})

timeOutInput.addEventListener('change', function (evt) {
  timeInInput.value = evt.target.value;
})

addressInput.setAttribute('disabled', 'disabled');
addressInput.value = addressHandler._latlng.lat.toFixed(5) + ' ' + addressHandler._latlng.lng.toFixed(5);

export {addressInput};



