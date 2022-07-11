import {createFewAds} from './data.js';
const generatedAds = createFewAds(2);
const cardTemplate = document.querySelector('#card').content;
const list = document.querySelector('.map__canvas');
const card = cardTemplate.querySelector('.popup');

console.log(generatedAds);

for (let i = 0; i < generatedAds.length; i++) {

  const newCard = card.cloneNode(true);

  newCard.querySelector('.popup__title').textContent = generatedAds[i].offer.title;
  newCard.querySelector('.popup__text--address').textContent = generatedAds[i].offer.address;
  newCard.querySelector('.popup__text--price').textContent = `${generatedAds[i].offer.price} ₽/ночь`;

  const cardType = newCard.querySelector('.popup__type');
  const generatedType = generatedAds[i].offer.type;

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

  newCard.querySelector('.popup__text--capacity').textContent = `${generatedAds[i].offer.rooms} комнаты для ${generatedAds[i].offer.guests} гостей`;
  newCard.querySelector('.popup__text--time').textContent =  `Заезд после ${generatedAds[i].offer.checkin}, выезд до ${generatedAds[i].offer.checkout}`;

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

  newCard.querySelector('.popup__description').textContent = generatedAds[i].offer.description;

  const photosList = newCard.querySelector('.popup__photos');
  const photo = newCard.querySelector('.popup__photo');
  const generatedPhotos = generatedAds[i].offer.photos;
  photo.src = generatedPhotos[0];
  generatedPhotos.shift();

  generatedPhotos.forEach((item) => {
    const newPhoto = photo.cloneNode(true);
    photosList.appendChild(newPhoto);
    newPhoto.src = item;
  });

  const avatar = newCard.querySelector('.popup__avatar');
  avatar.src = generatedAds[i].author.avatarURL;

  list.appendChild(newCard);
}




