var myData = {};

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
  $('#weather-icon').html("<img src=\"" + myData.weatherIcon + "\"></img>");
  $('#description').html(myData.weatherDesc);
  $('#temperature').html(myData.tempF + " &deg;F");
};

$(document).ready(function() {
  $.getJSON('https://api.wunderground.com/api/d036878575ebc85f/geolookup/conditions/q/autoip.json', function(json) {
    myData.weatherDesc = json.current_observation.weather;
    myData.weatherIcon = json.current_observation.icon_url;
    myData.tempC = json.current_observation.temp_c;
    myData.tempF = json.current_observation.temp_f;
    myData.tempK = (myData.tempC + 273.15).toFixed(2);
    myData.city = json.location.city;
    myData.country = json.location.country;

    // Update the page
    updateWeather();
  });
});