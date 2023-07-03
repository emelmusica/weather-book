var weatherAPIKey = "1594fc5af48b8b63f31969ab3016de9e";
// var city = "Sydney";
var resultContentEl = $('#weatherAPI');
var defaultCity = "Sydney";

var destInputEl = $("#destination");



var city

if (city != null) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherAPIKey + "&units=metric";
} else {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + defaultCity + "&appid=" + weatherAPIKey + "&units=metric";
}



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
      resultContentEl.innerHTML = '<h3>couldn\'t find the weather!</h3>';
    } else {
      $.each( locRes, function( key, value ) {
        var listItem = $('<li>').text(`${JSON.stringify(key).replace(/["]+/g, '')}: ${JSON.stringify(value).replace(/["]+/g, '')}`);
        $('#weatherAPI').append(listItem);
      });


    }
    
    

  })
  .catch(function (error) {
    console.error(error);
  });



