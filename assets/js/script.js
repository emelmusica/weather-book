// Day.js Code

const dateEl =$('#date');
const weatherIcoEl =$('#weather-icon');
const weatherStaEl =$('#weather-status');
const temperatureEl =$('#temperature');
const cityEl =$('#city')
const driveTimeEl =$('#drive-time');
const pubTranTimeEl =$('#public-transport-time');
const walkTimeEl =$('#walk-time');
const shareTimeEl =$('#share-time');
const cycleTimeEl =$('#cycle-time');

var today = dayjs();

weatherStaEl.text('Sunny, Too Sunny, I hate it');
weatherIcoEl.text('Cloudy');
temperatureEl.text( 101 + ' F');
cityEl.text('Paris, Texas');
driveTimeEl.text(4+' minutes');
//pubTranTimeEl.text(5+' minutes');
walkTimeEl.text(123+' minutes');
shareTimeEl.text(66+' minutes');
cycleTimeEl.text(78+' minutes');

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

<<<<<<< Updated upstream
init();
=======
init();


//openweather api

function getWeather(lat, lon) {
  var weatherAPIKey = "1594fc5af48b8b63f31969ab3016de9e";
  var resultContentEl = $('#weatherAPI');
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&lon=" + lon + "&appid=" + weatherAPIKey + "&units=metric";

  fetch(queryURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (locRes) {


      console.log(locRes);

      if (!locRes) {
        console.log('No results found!');
        // resultContentEl.innerHTML = '<h3>couldn\'t find the weather!</h3>';
      } else {
        console.log(locRes.weather, locRes.main);
      }
      
    })
    .catch(function (error) {
      console.error(error);
    });

}

>>>>>>> Stashed changes
