// Function that gets random number with floating point from range (necessary for Kekstagram)
// Taken from: https://bobbyhadz.com/blog/javascript-get-random-float-in-range

function getRandomFPNumber(from, to, decimals) {
  const FPNumber = (Math.random() * (to - from) + from).toFixed(decimals);
  if (to >= from && from >= 0) {
    return parseFloat(FPNumber);
  }
  return null;
}

// Function that gets random integer from range
// Slightly (clumsily) redesigned first function

function getRandomNumber(from, to) {
  const number = (Math.random() * (to - from) + from);
  if (to >= from && from >= 0) {
    return +number.toFixed(0);
  }
  return null;
}

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

// Module 4, Task 1

const CHECK_IN_AND_OUT_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


function createAd (avatarID) {
  if (avatarID < 10) {
    avatarID = '0' + avatarID;
  }
  let latitude = getRandomPositiveFloat(35.65000, 35.70000, digits = 5);
  let longitude = getRandomPositiveFloat(139.70000, 139.80000, digits = 5);

  const ad = {
    author: {
      avatarURL: 'img/avatars/user' + avatarID + '.png'
    },

    offer: {
      title: String.fromCharCode(Math.floor(Math.random() * 65535)),
      address: latitude + ', ' + longitude,
      price: getRandomPositiveInteger(1, 1000000000),
      type: TYPE[getRandomPositiveInteger(0, 4)],
      rooms: getRandomPositiveInteger(1, 1000),
      guests: getRandomPositiveInteger(1, 1000),
      checkin: CHECK_IN_AND_OUT_TIME[getRandomPositiveInteger(0, CHECK_IN_AND_OUT_TIME.length - 1)],
      checkout: CHECK_IN_AND_OUT_TIME[getRandomPositiveInteger(0, CHECK_IN_AND_OUT_TIME.length - 1)],
      features: FEATURES.slice(0, getRandomPositiveInteger(1, 6)),
      description: 'Lorem Ipsum',
      photos: PHOTOS.slice(0, getRandomPositiveInteger(1, 3)),
    },

    location: {
      lat: latitude,
      lang: longitude
    }
  }
  return ad
}

console.log(createAd());

function createFewAds (numberOfAds) {
  let result = [];
  for (let i = 0; i < numberOfAds; i++) {
    let ad = createAd(i+1);
    result.push(ad);
  }
  return result
}

console.log(createFewAds(10));
