const dateEl =$('#date');
const weatherIcoEl =$('#weather-icon');
const weatherStaEl =$('#weather-status');

var today = dayjs();


weatherStaEl.text('Sunny, Too Sunny, I hate it')
weatherIcoEl.text('Sunny')

let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -33.868, lng: 151.209 },
    zoom: 12,
  });
}


function getDate() {
  dateEl.text(today.format('dddd, MMMM D'))
}

function init(){
  initMap();
  getDate();
}

init();

  // Add click event handler for the "Add Address" button
  $('#addAddressBtn').click(() => {
    addMarker();
  });

async function initMap() {
const { Map, Geocoder } = await google.maps.importLibrary("maps");

map = new Map(document.getElementById("map"), {
  center: { lat: -33.868, lng: 151.209 },
  zoom: 12,
});
}

function addMarker() {
const addressInput = $('#addressInput');
const address = addressInput.val().trim();

if (address !== '') {
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      const location = results[0].geometry.location;
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: address,
      });
      markers.push(marker);
      map.setCenter(location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

  addressInput.val('');
}
}
