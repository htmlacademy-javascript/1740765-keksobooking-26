/* // Function that gets random number with floating point from range (necessary for Kekstagram)
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
} */

const TOKYO_CENTER_COORDINATES = {
  lat: 35.652832,
  lng: 139.839478,
};

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

const escPressed = (evt) => evt.key === ('Escape' || 'Esc');

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {escPressed, getRandomPositiveInteger, getRandomPositiveFloat, TOKYO_CENTER_COORDINATES, debounce, throttle};
