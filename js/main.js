
import './popup.js';
import {setFilterChange} from './map-filter.js';
import './form.js';
import {renderOnMap, updateOffers} from './map.js';
import {getData} from './api.js';

getData((offers) => {
  renderOnMap(offers);
  setFilterChange(() => updateOffers(offers));
});
