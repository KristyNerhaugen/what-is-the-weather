//query selector variables
var searchFormEl = document.querySelector("#search-form");
var searchButtonEl = document.querySelector("#search-btn");
var cityInputEl = document.querySelector("#city-name");
var currentCity = document.querySelector("#current-city");
var weatherTodayEl = document.querySelector("#weather-today");
var day = document.querySelector("#current-day");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uv-index");
var citySearchTerm = document.querySelector('#city-search-term');

cityInputEl.value

// function to prompt user to enter valid city name 
var formSubmitCity = function (event) {
    // prevent page from refreshing
    event.preventDefault();
    //get value from input element
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getCityInfo(cityName);
        // clear out old city content
       // weatherTodayEl.textContent = '';
        cityInputEl.value = '';
        
    } else {
        alert("City name not found. Please enter a valid City name.")
    }
};

// function to fetch city information (current weather, city name, date, icon, temperature, humidity, wind speed, UV index)

var getCityInfo = function (cityName) {
    // OpenWeather one call weather API
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=a3104bd878f3317330912583ab5d7928";

    // fetch information from API
    fetch(apiUrl)
        .then(function (response) {
            // if request is successful
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    // call display weather once displayWeather function is created
                    displayWeather(data, cityName);
                });
            } else {
                alert('Error: City name not found.');
            }
        })
        // catch in case of network, API, etc. issues 
        .catch(function (error) {
            alert("Unable to connect with weather");
        });
};

var displayWeather = function(data, cityName) {
    console.log(data);
    // check if api returned any information
  
  citySearchTerm.textContent = cityName;
    console.log(data.main);
  var tempInfo = data.main.temp;
  temp.textContent = "Temperature in Kelvin: " + tempInfo;

  var humidityInfo = data.main.humidity;
  humidity.textContent = "Humidity: " + humidityInfo; 

  var windInfo = data.wind.speed;
  wind.textContent = "Wind Speed: " + windInfo;

  var dayInfo = moment().format("MMMM Do, YYYY");
  day.textContent = "Today's date: " + dayInfo;

//  started to fetch second API but wasn't successful, this API, once properly fetched, will be used to generate UV index and 5 day forcast 
//  var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?" +  cityName + "exclude=minutely,hourly&appid=a3104bd878f3317330912583ab5d7928";
  
//   fetch(apiUrl2)
//   .then(function (response) {
//       // if request is successful
//       var uvInfo = data.current.uvi;
//       console.log(data.current.uvi);
//       //uvIndex.textContent = "UV Index: " + uvInfo;
//   })

};

//click event on search function to generate city info when clicked
searchButtonEl.addEventListener('click', formSubmitCity);
