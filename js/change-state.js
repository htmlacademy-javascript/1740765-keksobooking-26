import {TOKYO_CENTER_COORDINATES} from "./util.js";
function changeState () {
  const form = document.querySelector('.ad-form');
  const fieldsSets = document.querySelectorAll('.ad-form__element', '.map__filter', '.map__filter', '.map__checkbox');
  const filtersForm = document.querySelector('.map__filters');
  const slider = form.querySelector('.ad-form__slider');

  form.classList.toggle('ad-form--disabled');
  slider.toggleAttribute('disabled');
  filtersForm.classList.toggle('map__filters--disabled');
  const address = form.querySelector('#address');
  address.readOnly = true;
  address.value = `${TOKYO_CENTER_COORDINATES.lat}, ${TOKYO_CENTER_COORDINATES.lng}`;

  fieldsSets.forEach((element) => {
    element.toggleAttribute('disabled');
  });
}
export {changeState};
changeState();
