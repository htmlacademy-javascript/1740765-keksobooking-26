const form = document.querySelector('.ad-form');

const roomsCapacityMap = {
  1: ['1'],
  2: ['1','2'],
  3: ['1','2','3'],
  100: ['0']
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'error-label'
}, false);

const rooms = form.querySelector('#room_number');
const guests = form.querySelector('#capacity');

function validateGuests () {
  return roomsCapacityMap[rooms.value].includes(guests.value);
}

function getGuestsErrorMessage () {
  return "Комнат должно быть не меньше, чем гостей. 100 комнат — не для гостей."
}

pristine.addValidator (rooms, validateGuests, getGuestsErrorMessage);
pristine.addValidator (guests, validateGuests);

form.addEventListener('submit', (evt) => {
  const isFormValid = pristine.validate();
  if (isFormValid) {
    return true;
  }
  evt.preventDefault();
});
