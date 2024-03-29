const HOUSING_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const setData = function (element, valueToCheck, elementProperty = 'textContent', content) {
  if (valueToCheck === undefined || valueToCheck.includes(undefined)) {
    element.classList.add('hidden');
  } else {
    element[elementProperty] = content ? content : valueToCheck;
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
  if (generatedPhotos === undefined) {
    photo.classList.add('hidden');
  } else if (generatedPhotos.length > 0) {
    photo.src = generatedPhotos[0];
    if (generatedPhotos.length > 1) {
      for (let i = 1; i < generatedPhotos.length; i++) {
        const newPhoto = photo.cloneNode(true);
        photosList.appendChild(newPhoto);
        newPhoto.src = generatedPhotos[i];
      }
    }
  }
};

const renderCard = (card) => {

  const newCard = cardTemplate.cloneNode(true);

  setData(newCard.querySelector('.popup__title'), card.offer.title, 'textContent');
  setData(newCard.querySelector('.popup__text--address'), card.offer.address, 'textContent');
  setData(newCard.querySelector('.popup__text--price'), card.offer.price.toString(), 'textContent', `${card.offer.price.toString()} ₽/ночь`);

  setData(newCard.querySelector('.popup__type'), card.offer.type, 'textContent', HOUSING_TYPES[card.offer.type]);
  setData(newCard.querySelector('.popup__text--capacity'), [card.offer.rooms, card.offer.guests], 'textContent', `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`);
  setData(newCard.querySelector('.popup__text--time'), [card.offer.checkin, card.offer.checkout], 'textContent', `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`);

  setData(newCard.querySelector('.popup__description'), card.offer.description, 'textContent');

  if (card.offer.features) {
    createFeatures(newCard.querySelectorAll('.popup__feature'), card.offer.features);
  }
  createPhotos(newCard.querySelector('.popup__photos'), newCard.querySelector('.popup__photo'), card.offer.photos);

  setData(newCard.querySelector('.popup__avatar'), card.author.avatarURL, 'src');

  return newCard;
};

export {renderCard};

