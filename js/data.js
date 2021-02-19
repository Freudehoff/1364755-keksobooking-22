import {getRandomFloat, getRandomInt, getRandomArrayElement, getRandomArrayLength} from './util.js';

const TITLE = ['Та самая квартира', 'Уютная квартира в центре Токио', 'Хата', 'Холостяцкая берлога'];
const PRICE = [45, 67, 22, 5768, 4443];
const ROOMS = [2, 3, 4];
const GUESTS = [1, 2, 3];
const DWELLINGS = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const EXTRAS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APPEARANCES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const DESCRIPTION = ['Светлая комната', 'Тёмная комната', 'Белая комната', 'Зелёная комната'];
const OFFER_COUNT = 1;

const createOffer = function () {
  const LOCATION_X = getRandomFloat(35.65000, 35.70000);
  const LOCATION_Y = getRandomFloat(139.70000, 139.80000);
  const AVATAR_ID = getRandomInt(1, 8);

  return {
    author: {
      avatar: `img/avatars/user0${AVATAR_ID}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLE),
      address: LOCATION_X + ' ' + LOCATION_Y,
      price: getRandomArrayElement(PRICE),
      type: getRandomArrayElement(DWELLINGS),
      rooms: getRandomArrayElement(ROOMS),
      guests: getRandomArrayElement(GUESTS),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getRandomArrayLength(EXTRAS),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomArrayLength(APPEARANCES),
    },
    location: {
      x: LOCATION_X,
      y: LOCATION_Y,
    },
  }
}

const randomElements = new Array(OFFER_COUNT).fill(null).map(() => createOffer());

export {randomElements, createOffer};
