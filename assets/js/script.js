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
let map, directionsService, directionsRenderer, geo;
let startAutocomplete, destinationAutocomplete, lat, lon;

async function initMap() {

  const { Map, Geocoder } = await google.maps.importLibrary("maps");
  const { Autocomplete } = await google.maps.importLibrary("places");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  geo = await new google.maps.Geocoder();
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
  };
  directionsService.route(request,function(result,status){
    if(status == "OK"){
      directionsRenderer.setDirections(result)
    }
  });

  geo.geocode( { address: dest}, function(results, status) {
      if (status == 'OK') {
        lat = results[0].geometry.location.lat();
        lon = results[0].geometry.location.lng();
        console.log(lat);
        console.log(lon);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }});
}

// On page Load, initialise these codes
function init(){
  initMap();
  getDate();
}

init();