
const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');
const resetButton = document.querySelector('.ad-form__reset');

valueElement.value = 5000;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', (...rest) => {
  valueElement.value = sliderElement.noUiSlider.get();
});

valueElement.addEventListener('change', function(){
  sliderElement.noUiSlider.set([this.value]);
});

resetButton.addEventListener('click', () => {
  valueElement.value = 5000;
  sliderElement.noUiSlider.set(valueElement.value);
});
