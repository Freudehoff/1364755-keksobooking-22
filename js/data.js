import {getRandomFloat, getRandomInt, getRandomArrayElement, getRandomArrayLength} from './util.js';

const DWELLINGS = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const EXTRAS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APPEARANCES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const OFFER_COUNT = 10;

const createOffer = function () {
  const LOCATION_X = getRandomFloat(35.65000, 35.70000);
  const LOCATION_Y = getRandomFloat(139.70000, 139.80000);
  const AVATAR_ID = getRandomInt(1, 8);

  return {
    author: {
      avatar: `img/avatars/user0${AVATAR_ID}.png`,
    },
    offer: {
      title: 'Та самая квартира',
      address: LOCATION_X + ' ' + LOCATION_Y,
      price: 45,
      type: getRandomArrayElement(DWELLINGS),
      rooms: 2,
      guests: 3,
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getRandomArrayLength(EXTRAS),
      description: 'Окна выходят во двор, на запад. Прямые лучи солнца попадают в окна только вечером.',
      photos: getRandomArrayLength(APPEARANCES),
    },
    location: {
      x: LOCATION_X,
      y: LOCATION_Y,
    },
  }
}

const randomElements = new Array(OFFER_COUNT).fill(null).map(() => createOffer());

export {randomElements};
