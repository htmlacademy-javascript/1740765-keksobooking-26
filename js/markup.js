import {createFewAds} from './data.js';

const housingTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const cardTemplate = document.querySelector('#card').content;
const list = document.querySelector('.map__canvas');
const card = cardTemplate.querySelector('.popup');

const setData = function (element, valuetoCheck, elementProperty = 'textContent', content) {
  if (valuetoCheck.includes(undefined) || valuetoCheck === undefined) {
    element.classList.add('hidden');
  } else {
    element[elementProperty] = content ? content : valuetoCheck;
  }
};

const createFeatures = function (features, generatedFeatures) {
  const modifiers = generatedFeatures.map((feature) => `popup__feature--${feature}`);
  features.forEach((featuresItem) => {
    const modifier = featuresItem.classList[1];
    if (!modifiers.includes(modifier)) {
      featuresItem.remove();
    }
  });
};

const createPhotos = function (photosList, photo, generatedPhotos) {

  photo.src = generatedPhotos[0];
  generatedPhotos.shift();

  generatedPhotos.forEach((item) => {
    const newPhoto = photo.cloneNode(true);
    if (item === undefined) {
      newPhoto.classlist.add('hidden');
    }
    photosList.appendChild(newPhoto);
    newPhoto.src = item;
  });
};

const renderCards = function (generatedAds) {

  for (let i = 0; i < generatedAds.length; i++) {

    const newCard = card.cloneNode(true);

    setData(newCard.querySelector('.popup__title'), generatedAds[i].offer.title, 'textContent');
    setData(newCard.querySelector('.popup__text--address'), generatedAds[i].offer.address, 'textContent');
    setData(newCard.querySelector('.popup__text--price'), generatedAds[i].offer.price.toString(), 'textContent', `${generatedAds[i].offer.price.toString()} ₽/ночь`);

    setData(newCard.querySelector('.popup__type'), generatedAds[i].offer.type, 'textContent', housingTypes[generatedAds[i].offer.type]);
    setData(newCard.querySelector('.popup__text--capacity'), [generatedAds[i].offer.rooms, generatedAds[i].offer.guests], 'textContent', `${generatedAds[i].offer.rooms} комнаты для ${generatedAds[i].offer.guests} гостей`);
    setData(newCard.querySelector('.popup__text--time'), [generatedAds[i].offer.checkin, generatedAds[i].offer.checkout], 'textContent', `Заезд после ${generatedAds[i].offer.checkin}, выезд до ${generatedAds[i].offer.checkout}`);

    setData(newCard.querySelector('.popup__description'), generatedAds[i].offer.description, 'textContent');

    createFeatures(newCard.querySelectorAll('.popup__feature'), generatedAds[i].offer.features);
    createPhotos(newCard.querySelector('.popup__photos'), newCard.querySelector('.popup__photo'), generatedAds[i].offer.photos);

    setData(newCard.querySelector('.popup__avatar'), generatedAds[i].author.avatarURL, 'src');

    list.appendChild(newCard);
  }
};

renderCards(createFewAds(3));
