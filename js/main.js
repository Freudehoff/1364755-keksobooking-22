
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

const dwellings = ['palace', 'flat', 'house', 'bungalow'];
const time = ['12:00', '13:00', '14:00'];
const extras = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const appearances = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const locationX = getRandomFloat(35.65000, 35.70000);
const locationY = getRandomFloat(139.70000, 139.80000);
const avatarId = getRandomInt(1, 8);

const offer_count = 1;

const createOffer = function () {
  return {
    author: {
      avatar: `img/avatars/user0${avatarId}.png`,
    },
    offer: {
      title: 'Та самая квартира',
      address: locationX + ' ' + locationY,
      price: 45,
      type: getRandomArrayElement(dwellings),
      rooms: 2,
      guests: 3,
      checkin: getRandomArrayElement(time),
      checkout: getRandomArrayElement(time),
      features: getRandomArrayElement(extras),
      description: 'Окна выходят во двор, на запад. Прямые лучи солнца попадают в окна только вечером.',
      photos: getRandomArrayElement(appearances),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  }
}

const randomElements = new Array(offer_count).fill(null).map(() => createOffer());

randomElements();
