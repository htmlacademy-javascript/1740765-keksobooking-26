// Function that gets random number with floating point from range (necessary for Kekstagram)
// Taken from: https://bobbyhadz.com/blog/javascript-get-random-float-in-range

function getRandomFPNumber(from, to, decimals) {
  const FPNumber = (Math.random() * (to - from) + from).toFixed(decimals);
  if (to >= from && from >= 0) {
    return parseFloat(FPNumber);
  }
  return null;
}

getRandomFPNumber(1, 5,5, 4);

// Function that gets random integer from range
// Slightly (clumsily) redesigned first function

function getRandomNumber(from, to) {
  const number = (Math.random() * (to - from) + from);
  if (to >= from && from >= 0) {
    return number.toFixed(0);
  }
  return null;
}

getRandomNumber(1, 5,5);
