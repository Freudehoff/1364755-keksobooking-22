import {addressInput, activateForm} from './form.js';
import {activateFilter, filter} from './map-filter.js';
import {createPopup} from './popup.js';

const MAIN_LAT = 35.68950;
const MAIN_LNG = 139.69171;
const MAP_SCALE = 10;
const OFFERS_COUNT = 10;
const MAIN_PIN_URL = 'img/main-pin.svg';
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const OFFER_PIN_URL = 'img/pin.svg';
const OFFER_ICON_SIZE = [40, 40];
const OFFER_ICON_ANCHOR = [20, 40];

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
  iconUrl: MAIN_PIN_URL,
  iconSize: MAIN_ICON_SIZE,
  iconAnchor: MAIN_ICON_ANCHOR,
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

      const offerIcon = L.icon({
        iconUrl: OFFER_PIN_URL,
        iconSize: OFFER_ICON_SIZE,
        iconAnchor: OFFER_ICON_ANCHOR,
      });

      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon: offerIcon,
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
