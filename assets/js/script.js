// Day.js Code

const dateEl =$('#date');
const weatherIcoEl =$('#weather-icon');
const weatherStaEl =$('#weather-status');

var today = dayjs();

weatherStaEl.text('Sunny, Too Sunny, I hate it')
weatherIcoEl.text('Sunny')

function getDate() {
  dateEl.text(today.format('dddd, MMMM D'))
}

// Google Maps API Code Starts

let map, directionsService, directionsRenderer;
let startAutocomplete, destinationAutocomplete;

async function initMap() {

  const { Map, Geocoder } = await google.maps.importLibrary("maps");
  const { Autocomplete } = await google.maps.importLibrary("places");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: { lat: -33.868, lng: 151.209 },
    zoom: 12,
  });
  google.maps.event.addListener(map, "click", function(event){
    this.setOptions({scrollwheel:true});
  })
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  startAutocomplete = new google.maps.places.Autocomplete(
    document.getElementById('start')
  );
  destinationAutocomplete = new google.maps.places.Autocomplete(
    document.getElementById('dest')
  );
}

function calcRoute(){
  var start = document.getElementById('start').value;
  var dest = document.getElementById('dest').value;
  let request = {
    origin:start,
    destination:dest,
    travelMode: 'DRIVING'
  }
  directionsService.route(request,function(result,status){
    if(status == "OK"){
      directionsRenderer.setDirections(result)
    }
  })
}

// To be reviewed for conflicts
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

// async function initMap() {
//   // The location of Uluru
//   const position = { lat: -25.344, lng: 131.031 };
//   // Request needed libraries.
//   //@ts-ignore
//   const { Map } = await google.maps.importLibrary("maps");
//   const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//   // The map, centered at Uluru
//   map = new Map(document.getElementById("map"), {
//     zoom: 4,
//     center: position,
//     mapId: "DEMO_MAP_ID",
//   });

//   // The marker, positioned at Uluru
//   const marker = new AdvancedMarkerElement({
//     map: map,
//     position: position,
//     title: "Uluru",
//   });
// }

// To be reviewed for conflicts **END**

// On page Load, initialise these codes
function init(){
  initMap();
  getDate();
}

init();