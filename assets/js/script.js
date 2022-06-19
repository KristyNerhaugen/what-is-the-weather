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
//var futureForcast = document.querySelector('#future-forcast');
var dayOneDate = document.querySelector("#day-one-date");
var dayOne = document.querySelector("#day-one-temp");
var dayOneWind = document.querySelector("#day-one-wind");
var dayOneHumidity = document.querySelector("#day-one-humidity");


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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=a3104bd878f3317330912583ab5d7928";

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

var displayWeather = function (data, cityName) {
    console.log(data);
    // check if api returned any information

    citySearchTerm.textContent = cityName;
    console.log(data.main);
    var tempInfo = data.main.temp;
    temp.textContent = "Temperature: " + tempInfo;

    var humidityInfo = data.main.humidity;
    humidity.textContent = "Humidity: " + humidityInfo;

    var windInfo = data.wind.speed;
    wind.textContent = "Wind Speed: " + windInfo;

    var dayInfo = moment().format("MMMM Do, YYYY");
    day.textContent = "Today's date: " + dayInfo;



    var apiKey = "a3104bd878f3317330912583ab5d7928";
    //  fetch second API to generate UV index and 5 day forcast using the latitude and longitude
    var latitude = data.coord.lat;
    console.log(data.coord.lat);
    var longitude = data.coord.lon;
    console.log(data.coord.lon);
    var apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units={imperial}&appid=${apiKey}`;

    // this fetch still isn't successful
    fetch(apiUrl2).then(function (response) {
        console.log(response);
        // if request is successful
        if (response.ok) {
            response.json().then(function (data) {
                var dailyWeather = data.daily;
                for (let i = 0; i < dailyWeather.length; i++) {
                    // var day = dailyWeather[i];
                    // fetching and diplaying uv index
                    var uvi = dailyWeather[0].uvi;
                    console.log(`uvi for day ${i}is : ${uvi}`);
                    uvIndex.textContent = `UV Index: ${uvi}`;

                    // fetching and displaying day one temp
                    var dayOneForcast = dailyWeather[1].temp.day;
                    console.log(`temperature for day ${1} is: ${dayOneForcast}`);
                    dayOne.textContent = `Temperature in Kelvin: ${dayOneForcast}`;

                    // fetching and displaying day one wind
                    var dayOneWindSpeed = dailyWeather[1].wind_speed;
                    console.log(`wind speed ${1} is: ${dayOneWindSpeed}`);
                    dayOneWind.textContent = `Wind Speed: ${dayOneWindSpeed}`;

                    // fetching and displaying day one humidity
                    var dayOneHumid = dailyWeather[1].humidity;
                    console.log(`Humidity ${1} is: ${dayOneHumid}`);
                    dayOneHumidity.textContent = `Humidity: ${dayOneHumid}`;

                    // var forcast = dailyWeather[i].
                    // futureForcast.textContent = `The seven day forcast is ${forcast}`;
                }
                console.log("daily weather is ", dailyWeather);
            });
        }
        else {
            alert("Alert--there was an issue with request for weather.");
        }

        //   var uvInfo = data.current.uvi;
        //   console.log(data.current.uvi);
        //uvIndex.textContent = "UV Index: " + uvInfo;
    })
};
//click event on search function to generate city info when clicked
searchButtonEl.addEventListener('click', formSubmitCity);
