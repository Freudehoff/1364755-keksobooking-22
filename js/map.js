import {addressInput, activateForm} from './form.js';
import {activateFilter, filter} from './map-filter.js';
import {createPopup} from './popup.js';

const MAIN_LAT = 35.68950;
const MAIN_LNG = 139.69171;
const MAP_SCALE = 10;
const OFFERS_COUNT = 10;

const mainAddress = () => {
  addressInput.value = MAIN_LAT.toFixed(5) + ' ' + MAIN_LNG.toFixed(5);
};

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => { // Инициализация карты и запуск активного состояния
    activateForm();
    activateFilter();
    mainAddress();
  })
  .setView({
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  }, MAP_SCALE);

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

mainPinMarker.on('moveend', (evt) => {
  addressInput.value = evt.target.getLatLng().lat.toFixed(5) + ' ' + evt.target.getLatLng().lng.toFixed(5);
});

const markers = L.layerGroup().addTo(map);

const renderOnMap = (offers) => {
  offers
    .slice(0, OFFERS_COUNT)
    .forEach((createOffer) => { // Добавляем метки из массива
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

      const title = createPopup(createOffer);
      marker
        .addTo(markers)
        .bindPopup(title,
          {
            keepInView: true,
          },
        );
    });
};

const resetMarkerAndAddress = () => {
  map.setView({
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  }, MAP_SCALE);
  map.closePopup();
  mainPinMarker.setLatLng({
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  });
  mainAddress();
};

const resetMarkers = () => {
  markers.clearLayers();
}

const updateOffers = (offers) => {
  resetMarkers();
  const filteredOffers = filter(offers);
  renderOnMap(filteredOffers);
};

export {resetMarkerAndAddress, renderOnMap, updateOffers};
