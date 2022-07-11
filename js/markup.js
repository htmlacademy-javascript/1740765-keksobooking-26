import {createFewAds} from './data.js';
const generatedAds = createFewAds(1);
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

for (let i = 0; i < generatedAds.length; i++) {
  const newCard = card.cloneNode(true);

  setData(newCard.querySelector('.popup__title'), generatedAds[i].offer.title, 'textContent');
  setData(newCard.querySelector('.popup__text--address'), generatedAds[i].offer.address, 'textContent');
  setData(newCard.querySelector('.popup__text--price'), generatedAds[i].offer.price.toString(), 'textContent', `${generatedAds[i].offer.price.toString()} ₽/ночь`);

  const cardType = newCard.querySelector('.popup__type');
  const generatedType = generatedAds[i].offer.type;
  if (generatedType === undefined) {
    cardType.classList.add('hidden');
  }

  const housingTypes = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель'
  };

  const typesKeys = Object.keys(housingTypes);
  const typesValues = Object.values(housingTypes);

  for (let j = 0; j < typesKeys.length && j < typesValues.length; j++) {
    if (typesKeys[j] === generatedType) {
      cardType.textContent = typesValues[j];
    }
  }

  setData(newCard.querySelector('.popup__text--capacity'), [generatedAds[i].offer.rooms, generatedAds[i].offer.guests], 'textContent', `${generatedAds[i].offer.rooms} комнаты для ${generatedAds[i].offer.guests} гостей`);
  setData(newCard.querySelector('.popup__text--time'), [generatedAds[i].offer.checkin, generatedAds[i].offer.checkout], 'textContent', `Заезд после ${generatedAds[i].offer.checkin}, выезд до ${generatedAds[i].offer.checkout}`);

  const featuresContainer = newCard.querySelector('.popup__features');
  const features = newCard.querySelectorAll('.popup__feature');
  const generatedFeatures = generatedAds[i].offer.features;
  const modifiers = generatedFeatures.map((feature) => 'popup__feature--' + feature);
  features.forEach((featuresItem) => {
    const modifier = featuresItem.classList[1];
    if (!modifiers.includes(modifier)) {
      featuresItem.remove();
    }
  });

  setData(newCard.querySelector('.popup__description'), generatedAds[i].offer.description, 'textContent');

  const photosList = newCard.querySelector('.popup__photos');
  const photo = newCard.querySelector('.popup__photo');
  const generatedPhotos = generatedAds[i].offer.photos;

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

  setData(newCard.querySelector('.popup__avatar'), generatedAds[i].author.avatarURL, 'src');

  list.appendChild(newCard);
}




