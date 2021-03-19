const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.querySelectorAll('.map__filter');
const mapFeature = mapForm.querySelector('#housing-features');
const typeFilter = mapForm.querySelector('#housing-type');
const priceFilter = mapForm.querySelector('#housing-price');
const roomsFilter = mapForm.querySelector('#housing-rooms');
const guestsFilter = mapForm.querySelector('#housing-guests');


const defaultFilter = {
  typeFilter: 'any',
  priceFilter: 'any',
  roomsFilter: 'any',
  guestsFilter: 'any',
  wifi: false,
  dishwasher: false,
  parking: false,
  washer: false,
  elevator: false,
  conditioner: false,
};

const priceRange = {
  low: 10000,
  high: 50000,
}

const filter = (offers) => {
  let filteredOffers = offers.slice();

  if (typeFilter.value !== defaultFilter.typeFilter) {
    filteredOffers = filteredOffers.filter((createOffer) => createOffer.offer.type === typeFilter.value);
  }

  if (priceFilter.value !== defaultFilter.priceFilter) {
    switch (priceFilter.value) {
      case 'low':
        filteredOffers = filteredOffers.filter((createOffer) => createOffer.offer.price < priceRange.low);
        break;
      case 'middle':
        filteredOffers = filteredOffers.filter((createOffer) => createOffer.offer.price >= priceRange.low && createOffer.offer.price <= priceRange.high);
        break;
      case 'high':
        filteredOffers = filteredOffers.filter((createOffer) => createOffer.offer.price > priceRange.high);
        break;
    }
  }

  if (roomsFilter.value !== defaultFilter.roomsFilter) {
    filteredOffers = filteredOffers.filter((createOffer) => createOffer.offer.rooms.toString() === roomsFilter.value);
  }

  if (guestsFilter.value !== defaultFilter.guestsFilter) {
    filteredOffers = filteredOffers.filter((createOffer) => createOffer.offer.guests.toString() === guestsFilter.value);
  }

  const checkedFeatures = mapForm.querySelectorAll('#housing-features input:checked');
  checkedFeatures.forEach((element) => {
    filteredOffers = filteredOffers.filter((createOffer) => createOffer.offer.features.indexOf(element.value) !== -1);
  });

  return filteredOffers;
};

const setFilterChange = (cb) => {
  typeFilter.addEventListener('change', () => cb());
  priceFilter.addEventListener('change', () => cb());
  roomsFilter.addEventListener('change', () => cb());
  guestsFilter.addEventListener('change', () => cb());
  mapFeature.addEventListener('change', () => cb());
};

const disableFilter = () => { // Неактивное состояние фильтра карты
  mapForm.classList.add('map__filters--disabled');
  mapFilters.forEach((filter) => {
    filter.setAttribute('disabled', 'disabled');
  });
  mapFeature.setAttribute('disabled', 'disabled');
};

disableFilter();

const activateFilter = () => { // Активное состояние фильтра карты
  mapForm.classList.remove('map__filters--disabled');
  mapFilters.forEach((filter) => {
    filter.removeAttribute('disabled', 'disabled');
  });
  mapFeature.removeAttribute('disabled', 'disabled');
};



export {activateFilter, mapForm, filter, setFilterChange};
