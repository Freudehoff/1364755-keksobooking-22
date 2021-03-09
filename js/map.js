import {addressInput, activateForm, activateFilter} from './form.js';
import {getData} from './api.js';
import {createPopup} from './popup.js';

const MAIN_LAT = 35.68950;
const MAIN_LNG = 139.69171;

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => { // Инициализация карты и запуск активного состояния
    activateForm();
    activateFilter();
  })
  .setView({
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon  = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', function (evt) {
  addressInput.value = evt.target.getLatLng().lat.toFixed(5) + ' ' + evt.target.getLatLng().lng.toFixed(5);
});

getData((offers) => {
  offers.forEach( function (createOffer) { // Добавляем метки из массива
    const lat = createOffer.location.lat;
    const lng = createOffer.location.lng;

    const icon = L.icon({
      iconUrl: 'img/pin.svg',
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
      .bindPopup(createPopup(createOffer),
        {
          keepInView: true,
        },
      );
  });
});

export {MAIN_LAT, MAIN_LNG};
