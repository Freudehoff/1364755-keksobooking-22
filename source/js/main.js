/* global _:readonly */
import './popup.js';
import {activateFilter, setFilterChange} from './apartment-filter.js';
import './form.js';
import {getData} from './api.js';
import {renderOnMap, updateOffers} from './map.js';
import './photo.js';

const RERENDER_DELAY = 500;

getData((offers) => {
  renderOnMap(offers);
  activateFilter();
  setFilterChange(_.debounce(() => updateOffers(offers), RERENDER_DELAY));
});
