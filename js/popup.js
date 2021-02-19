import {randomElements, createOffer} from './data.js';

const convertType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const createFeatureFragment = function (createOffer) {
  const featureFragment = document.createDocumentFragment();
  for (let i = 0; i < createOffer.offer.features.length; i++) {
    const featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + createOffer.offer.features[i];
    featureFragment.appendChild(featureItem);
  }
  return featureFragment;
}

const createPhotosFragment = function (createOffer) {
  const photosFragment = document.createDocumentFragment();
  for (let i = 0; i < createOffer.offer.photos.length; i++) {
    const popupPhoto = cardTemplate.querySelector('.popup__photo');
    const popupPhotoItem = popupPhoto.cloneNode(true);
    popupPhotoItem.src = createOffer.offer.photos[i];
    photosFragment.appendChild(popupPhotoItem);
  }
  return photosFragment;
}

const advertisementArea = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const randomAdvertisements = randomElements;

randomAdvertisements.forEach((createOffer) => {
  const advertisementElement = cardTemplate.cloneNode(true);
  advertisementElement.querySelector('.popup__title').textContent = createOffer.offer.title;
  advertisementElement.querySelector('.popup__text--address').textContent = createOffer.offer.address;
  advertisementElement.querySelector('.popup__text--price').textContent = createOffer.offer.price + '₽/ночь';
  advertisementElement.querySelector('.popup__type').textContent = convertType[createOffer.offer.type];
  advertisementElement.querySelector('.popup__text--capacity').textContent = createOffer.offer.rooms + ' комнаты для ' + createOffer.offer.guests + ' гостей';
  advertisementElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + createOffer.offer.checkin + ', выезд до ' + createOffer.offer.checkout;
  advertisementElement.querySelector('.popup__features').innerHTML = '';
  advertisementElement.querySelector('.popup__features').appendChild(createFeatureFragment(createOffer));
  advertisementElement.querySelector('.popup__description').textContent = createOffer.offer.description;
  advertisementElement.querySelector('.popup__photos').removeChild(advertisementElement.querySelector('.popup__photo'));
  advertisementElement.querySelector('.popup__photos').appendChild(createPhotosFragment(createOffer));
  advertisementElement.querySelector('.popup__avatar').src = createOffer.author.avatar;
  advertisementArea.appendChild(advertisementElement);
});

createOffer();


