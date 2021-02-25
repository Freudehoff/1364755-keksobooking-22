import {addressInput} from './form.js';
import {randomElements} from './data.js';
import {createPopup} from './popup.js';

const form = document.querySelector('.ad-form');
const photo = form.querySelector('.ad-form-header');
const elements = form.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.querySelectorAll('.map__filter');
const mapFeature = mapForm.querySelector('.map__features');

form.classList.add('ad-form--disabled'); // Неактивное состояние формы
photo.setAttribute('disabled', 'disabled');
elements.forEach( function (element) {
  element.setAttribute('disabled', 'disabled');
});

mapForm.classList.add('map__filters--disabled'); // Неактивное состояние фильтра карты
mapFilters.forEach( function (filter) {
  filter.setAttribute('disabled', 'disabled');
});
mapFeature.setAttribute('disabled', 'disabled');

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', function () { // Инициализация карты и запуск активного состояния
    form.classList.remove('ad-form--disabled');
    photo.removeAttribute('disabled', 'disabled');
    elements.forEach( function (element) {
      element.removeAttribute('disabled', 'disabled');
    });

    mapForm.classList.remove('map__filters--disabled');
    mapFilters.forEach( function (filter) {
      filter.removeAttribute('disabled', 'disabled');
    });
    mapFeature.removeAttribute('disabled', 'disabled');
  })
  .setView({
    lat: 35.68950,
    lng: 139.69171,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon  = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68950,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const addressHandler = mainPinMarker.on('moveend', function (evt) {
  addressInput.value = evt.target.getLatLng().lat.toFixed(5) + ' ' + evt.target.getLatLng().lng.toFixed(5);
});

randomElements.forEach( function (rand) { // Добавляем метки из массива
  const lat = rand.location.x;
  const lng = rand.location.y;

  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(createPopup(rand),
      {
        keepInView: true,
      },
    );
});

export {addressHandler};
