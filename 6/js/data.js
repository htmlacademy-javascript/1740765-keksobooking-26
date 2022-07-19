import {getRandomPositiveInteger} from './util.js';
import {getRandomPositiveFloat} from './util.js';


const CHECK_INS_AND_CHECK_OUTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


function createAd (avatarID) {

  const latitude = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const longitude = getRandomPositiveFloat(139.70000, 139.80000, 5);

  const ad = {
    author: {
      avatarURL: avatarID < 10 ? `img/avatars/user0${avatarID}.png` :  `img/avatars/user${avatarID}.png`,
    },

    offer: {
      title: String.fromCharCode(Math.floor(Math.random() * 65535)),
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(5000, 100000),
      type: TYPES[getRandomPositiveInteger(0, 4)],
      rooms: getRandomPositiveInteger(1, 50),
      guests: getRandomPositiveInteger(1, 50),
      checkin: CHECK_INS_AND_CHECK_OUTS[getRandomPositiveInteger(0, CHECK_INS_AND_CHECK_OUTS.length - 1)],
      checkout: CHECK_INS_AND_CHECK_OUTS[getRandomPositiveInteger(0, CHECK_INS_AND_CHECK_OUTS.length - 1)],
      features: FEATURES.slice(0, getRandomPositiveInteger(1, 6)),
      description: 'Lorem Ipsum',
      photos: PHOTOS.slice(0, getRandomPositiveInteger(1, 3)),
    },

    location: {
      lat: latitude,
      lang: longitude
    }
  };
  return ad;
}

function createFewAds (numberOfAds) {
  const generatedAds = [];
  for (let i = 0; i < numberOfAds; i++) {
    const ad = createAd(i+1);
    generatedAds.push(ad);
  }
  return generatedAds;
}

export {createFewAds};
