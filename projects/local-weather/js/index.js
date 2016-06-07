var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?';
var apiKey = '72680b4fd147f5f91328a7e8b3d80b36';
var myData = {};

var getWeatherData = function(lat, lon) {
  var myUrl = apiUrl + "lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;
  $.getJSON(myUrl, function(json) {
    // Process the json weather data
    myData.weatherID = json.weather[0].id;
    myData.weatherDesc = json.weather[0].main;
    myData.tempK = json.main.temp;
    myData.tempC = Math.floor(myData.tempK - 273.15);
    myData.tempF = Math.floor((myData.tempK * (9 / 5)) - 459.67);
    myData.city = json.name;
    myData.country = json.sys.country;
    if (json.dt > json.sys.sunrise && json.dt < json.sys.sunset) {
      myData.dayNight = "day";
    } else {
      myData.dayNight = "night";
    }

    // Update the page
    updateWeather();
  });
};

var setupTempButton = function () {
  // This function is called after document.ready() and json is received.
  $('#tempButton').prop('disabled', false);
  $('#getTempF').on('click', function (e) {
    e.preventDefault();
    $('#temperature').html(myData.tempF + " &deg;F");
  });
  $('#getTempC').on('click', function (e) {
    e.preventDefault();
    $('#temperature').html(myData.tempC + " &deg;C");
  });
  $('#getTempK').on('click', function (e) {
    e.preventDefault();
    $('#temperature').html(myData.tempK + " &deg;K");
  });
  
};

var updateWeather = function() {
  // We should have weather data, so enable our temp button and
  // register our event handlers for changing the temp between
  // Kelvin/Celcius/Fahr.
  setupTempButton();
  
  // Update DOM
  $('#pageTitle').html('Local Weather for ' + myData.city + ", " + myData.country);
  $('#weather-icon').addClass('wi-owm-' + myData.dayNight + "-" + myData.weatherID);
  $('#description').html(myData.weatherDesc);
  $('#temperature').html(myData.tempF + " &deg;F");
};

$(document).ready(function() {
  $.getJSON('http://ip-api.com/json', function(geo) {
    getWeatherData(geo.lat, geo.lon);
  });
});