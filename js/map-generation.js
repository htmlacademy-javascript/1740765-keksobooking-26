import {changeState} from './change-state.js';
import { getData } from './load.js';
import {renderCard} from './markup.js';
import {TOKYO_CENTER_COORDINATES} from './util.js';
const resetButton = document.querySelector('.ad-form__reset');

changeState(true);

const map = L.map('map-canvas')
  .setView({
    lat: TOKYO_CENTER_COORDINATES.lat,
    lng: TOKYO_CENTER_COORDINATES.lng,
  }, 10);

const markerGroup = L.layerGroup().addTo(map);

const clearMarkers = () => {
  markerGroup.clearLayers();
};

const onSuccess = (data) => {
  clearMarkers();
  data.forEach((ad) => createMarker(ad));
};

changeState(true);

map.on('load', changeState(false), getData(onSuccess, () => {}));

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


function createMarker(ad) {
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
    .addTo(markerGroup)
    .bindPopup(renderCard(ad));

}

