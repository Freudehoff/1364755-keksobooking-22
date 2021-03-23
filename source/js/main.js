/* global _:readonly */
import './popup.js';
import {setFilterChange} from './map-filter.js';
import './form.js';
import {renderOnMap, updateOffers} from './map.js';
import {getData} from './api.js';
import './photo.js';

const RERENDER_DELAY = 500;

getData((offers) => {
  renderOnMap(offers);
  setFilterChange(_.debounce(() => updateOffers(offers), RERENDER_DELAY));
});
