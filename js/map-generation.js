import {changeState} from './change-state.js';
import {renderCard} from './markup.js';
import {createFewAds} from './data.js';

const generatedAds = createFewAds(3);

const resetButton = document.querySelector('.ad-form__reset');
const map = L.map('map-canvas')
  .setView({
    lat: 35.652832,
    lng: 139.839478,
  }, 10);

map.whenReady(changeState);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.652832,
    lng: 139.839478,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);

marker.on('moveend', (evt) => {
  document.querySelector('#address').value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

resetButton.addEventListener('click', () => {
  marker.setLatLng({
    lat: 35.652832,
    lng: 139.839478,
  });

  map.setView({
    lat: 35.652832,
    lng: 139.839478,
  }, 10);
});

// let points = [];
// function trimAddress () {
//   for (let i = 0; i < generatedAds.length; i++) {
//     let result =  generatedAds[i].offer.address.split(',');
//     const lat  = result[0];
//     const lng = result[1];
//     points.push({lat: lat, lng: lng.slice(1)});
// }
// };

// trimAddress();

// const createCustomPopup = (point) => {
//   const template = document.querySelector('#card').content.querySelector('.popup');
//   const popupElement = template.cloneNode(true);

//   popupElement.querySelector('.popup__title').textContent = point.title;
//   popupElement.querySelector('.popup__text--address').textContent = `Координаты: ${point.lat}, ${point.lng}`;

//   return popupElement;
// };

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

generatedAds.forEach((ad) => {
  const {location: {lat, lng}} = ad;
  const pin = L.marker(
    {
      lat,
      lng: lng,
    },
    {
      icon,
    },
  );

  pin
    .addTo(map)
    .bindPopup(renderCard(ad));

});


