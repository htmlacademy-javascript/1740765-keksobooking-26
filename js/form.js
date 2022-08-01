import {sendData} from "./load.js";
import {escPressed} from "./util.js";
const form = document.querySelector('.ad-form');
const submitButton = form.querySelector('.ad-form__submit');

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
  return 'Комнат должно быть не меньше, чем гостей. 100 комнат — не для гостей.';
}

pristine.addValidator (rooms, validateGuests, getGuestsErrorMessage);
pristine.addValidator (guests, validateGuests);

const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const closeErrorModal = errorModal.querySelector('.error__button');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const showSuccessModal = () => {
  document.body.appendChild(successModal);
  document.addEventListener('keydown', (evt) => {
    if (escPressed(evt)) {
      evt.preventDefault();
      successModal.remove();
    }
  });
  document.addEventListener('click', () => {
    successModal.remove();
  });
};

const showErrorModal = () => {
  document.body.appendChild(errorModal);
  document.addEventListener('keydown', (evt) => {
    if (escPressed(evt)) {
      evt.preventDefault();
      errorModal.remove();
    }
  });
  closeErrorModal.addEventListener('click', () => {
    errorModal.remove();
  });
  document.addEventListener('click', () => {
    errorModal.remove();
  });
};


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isFormValid = pristine.validate();
  if (isFormValid) {
    const formData = new FormData(evt.target);
    blockSubmitButton();
    sendData(() => {
      showSuccessModal();
      unblockSubmitButton();
    }, showErrorModal, formData);
  }
});
