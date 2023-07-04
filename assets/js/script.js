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
let directionsDriving, directionsBicycling, directionsTransit, directionsWalking;
let timeWalking, timeDriving, timeTransit, timeBicycling;

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

function mapDriving(){
  if (setDirections === true){
    directionsRenderer.setDirections(directionsDriving);
  }
}
function mapWalking(){
  if (setDirections === true){
    directionsRenderer.setDirections(directionsWalking);
  }
}
function mapBicycling(){
  if (setDirections === true){
    directionsRenderer.setDirections(directionsBicycling);
  }
}
function mapTransit(){
  if (setDirections === true){
    directionsRenderer.setDirections(directionsTransit);
  }
}

function calcRoute(){
  var start = document.getElementById('start').value;
  var dest = document.getElementById('dest').value;
  directionsService.route({origin:start, destination:dest, travelMode: 'DRIVING'},function(result,status){
    if(status == "OK"){
      directionsDriving = result;
      timeDriving = directionsDriving.routes[0].legs[0].duration.text;
      console.log('it takes ' + timeDriving + ' to drive to your destination.');
      directionsRenderer.setDirections(directionsDriving);
      console.log("Directions Driving");
      console.log(directionsDriving);
      console.log(directionsDriving.routes[0].legs[0].duration.text);
    }
  });

  directionsService.route({origin:start, destination:dest, travelMode: 'WALKING'},function(result,status){
    if(status == "OK"){
      directionsWalking = result;
      timeWalking = directionsWalking.routes[0].legs[0].duration.text;
      console.log('it takes ' + timeWalking + ' to walk to your destination.');
      console.log("Directions Walking");
      console.log(directionsWalking);
      console.log(directionsWalking.routes[0].legs[0].duration.text);
    }
  });
  
  directionsService.route({origin:start, destination:dest, travelMode: 'BICYCLING'},function(result,status){
    if(status == "OK"){
      directionsBicycling = result;
      timeBicycling = directionsBicycling.routes[0].legs[0].duration.text;
      console.log('it takes ' + timeBicycling + ' to cycle to your destination.');
      console.log("Directions Bicycling");
      console.log(directionsBicycling);
      console.log(directionsBicycling.routes[0].legs[0].duration.text);
    }
  });
  directionsService.route({origin:start, destination:dest, travelMode: 'TRANSIT'},function(result,status){
    if(status == "OK"){
      directionsTransit = result;
      timeTransit = directionsTransit.routes[0].legs[0].duration.text;
      console.log('it takes ' + timeTransit + ' to take public transport to your destination.');
      console.log("Directions Transit");
      console.log(directionsTransit);
      console.log(directionsTransit.routes[0].legs[0].duration.text);
    }
  });
  


  geo.geocode( { address: dest}, function(results, status) {
      if (status == 'OK') {
        lat = results[0].geometry.location.lat();
        lon = results[0].geometry.location.lng();
        console.log(lat);
        console.log(lon);
        getWeather(lat, lon);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }});
} // Google Maps API Ends here



// On page Load, initialise these codes
function init(){
  initMap();
  getDate();
}

init();


//openweather api

function getWeather(lat, lon) {
  var weatherAPIKey = "1594fc5af48b8b63f31969ab3016de9e";
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
      } else {
        console.log(locRes.weather, locRes.main);
        $('#weather-status').text(locRes.weather[0].description);
        $('#temperature').text(locRes.main.temp + "°C");
        $('#weather-icon').attr('src', 'https://openweathermap.org/img/wn/' + locRes.weather[0].icon +'@2x.png')  
      }
    })
    .catch(function (error) {
      console.error(error);
    });

}

