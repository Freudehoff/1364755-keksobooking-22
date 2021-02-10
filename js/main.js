
function getRandomFloat(from, to, decimal = 2) {
  if (to > from && from >= 0) {
    return (Math.random() * to).toFixed(decimal);
  }
  throw new Error('Input data error');
}

function getRandomInt(from, to) {
  if (to > from && from >= 0) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from)) + from;
  }
  throw new Error('Input data error');
}

const getRandomArrayElement = function (elements) {
  return elements[getRandomInt(0, elements.length - 1)];
};

const getRandomArrayLength = function (elements) {
  const newArray = [];
  let elementsLen = elements.length;

  for(let i=getRandomInt(0, elementsLen); i < elementsLen; i+=getRandomInt(1, elementsLen)) {
    newArray.push(elements[i]);
  }

  return newArray;
}

const DWELLINGS = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const EXTRAS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APPEARANCES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const LOCATION_X = getRandomFloat(35.65000, 35.70000);
const LOCATION_Y = getRandomFloat(139.70000, 139.80000);
const AVATAR_ID = getRandomInt(1, 8);

const OFFER_COUNT = 1;

const createOffer = function () {
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

randomElements;
