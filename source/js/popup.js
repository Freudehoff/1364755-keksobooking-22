import {resetMarkerAndAddress} from './map.js';

const convertType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const createFeatureFragment = (createOffer) => {
  const featureFragment = document.createDocumentFragment();
  for (let i = 0; i < createOffer.offer.features.length; i++) {
    const featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + createOffer.offer.features[i];
    featureFragment.appendChild(featureItem);
  }
  return featureFragment;
}

const createPhotosFragment = (createOffer) => {
  const photosFragment = document.createDocumentFragment();
  for (let i = 0; i < createOffer.offer.photos.length; i++) {
    const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
    const popupPhoto = balloonTemplate.querySelector('.popup__photo');
    const popupPhotoItem = popupPhoto.cloneNode(true);
    popupPhotoItem.src = createOffer.offer.photos[i];
    photosFragment.appendChild(popupPhotoItem);
  }
  return photosFragment;
}

const createPopup = (createOffer) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = createOffer.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = createOffer.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = createOffer.offer.price + '₽/ночь';
  popupElement.querySelector('.popup__type').textContent = convertType[createOffer.offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = createOffer.offer.rooms + ' комнаты для ' + createOffer.offer.guests + ' гостей';
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + createOffer.offer.checkin + ', выезд до ' + createOffer.offer.checkout;
  popupElement.querySelector('.popup__features').innerHTML = '';
  popupElement.querySelector('.popup__features').appendChild(createFeatureFragment(createOffer));
  popupElement.querySelector('.popup__description').textContent = createOffer.offer.description;
  popupElement.querySelector('.popup__photos').removeChild(popupElement.querySelector('.popup__photo'));
  popupElement.querySelector('.popup__photos').appendChild(createPhotosFragment(createOffer));
  popupElement.querySelector('.popup__avatar').src = createOffer.author.avatar;

  return popupElement;
};

export {createPopup, resetMarkerAndAddress};


