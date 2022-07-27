import {changeState} from './change-state.js';
import {renderCard} from './markup.js';
import {createFewAds} from './data.js';
import {TOKYO_CENTER_COORDINATES} from './util.js';
import {getData} from './load.js';
const generatedAds = createFewAds(3);

const resetButton = document.querySelector('.ad-form__reset');
const map = L.map('map-canvas')
  .setView({
    lat: TOKYO_CENTER_COORDINATES.lat,
    lng: TOKYO_CENTER_COORDINATES.lng,
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
    lat: TOKYO_CENTER_COORDINATES.lat,
    lng: TOKYO_CENTER_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);

marker.on('drag', (evt) => {
  document.querySelector('#address').value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

resetButton.addEventListener('click', () => {
  document.querySelector('#address').value = `${TOKYO_CENTER_COORDINATES.lat}, ${TOKYO_CENTER_COORDINATES.lng}`;

  marker.setLatLng({
    lat: TOKYO_CENTER_COORDINATES.lat,
    lng: TOKYO_CENTER_COORDINATES.lng,
  });

  map.setView({
    lat: TOKYO_CENTER_COORDINATES.lat,
    lng: TOKYO_CENTER_COORDINATES.lng,
  }, 10);
});

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
      lng
    },
    {
      icon,
    },
  );

  pin
    .addTo(map)
    .bindPopup(renderCard(ad));

});
