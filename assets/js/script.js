// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// function to search for new city

// function to persist and click saved cities

//query selector variables
// var searchFormEl = document.querySelector("#search-form");
// var searchButtonEl = document.querySelector("#search-btn");
var cityInputEl = document.querySelector("#city-name");
// use .value to get the input for city name 
cityInputEl.value

// function to prompt user to enter valid city name 
// var formSubmitHandler = function(event) {
//     // prevent page from refreshing
//     event.preventDefault();
// }

// function to fetch city information (current weather, city name, date, icon, temperature, humidity, wind speed, UV index)

var getCityInfo = function(cityName) {
    // one call weather API
    // var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=94.04&exclude=minutely,hourly&appid=a3104bd878f3317330912583ab5d7928";
   // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=94.04&appid=9859fc6998842f2d4d3f91cde44162d0";   
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=boston&APPID=9859fc6998842f2d4d3f91cde44162d0";
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=9859fc6998842f2d4d3f91cde44162d0";
    var templateLiteral = `https://api.openweathermap.org/data/2.5/weather?q=${Boston}&APPID=9859fc6998842f2d4d3f91cde44162d0`;
// fetch information from API
fetch(apiUrl)
    .then(function(response) {
        // if request is successful
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);

            });
        } else {
            alert('Error: City name not found.');
        }
    })
    .catch(function(error) {
        alert("Unable to connect with weather");
    });
};

getCityInfo();
// function to return information that is fetched from api

// event listeners so that when saved cities are clicked, information is displayed 

// click event on search function
// make sure successflly capturing CityEl
// see weather forcast for current city
// make second API call now that there is access to lat and long

//searchBtn.addEventLIstener('click), function(e) {
   // var citInEl = docu...
    //save this in to localStoarge ^^
   // getCityInfo(cityInputEl.value)
//}