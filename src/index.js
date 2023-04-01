let now = new Date();
let hours = now.getHours();
var meridian = hours >= 12 ? "PM" : "AM";
if (hours > 12) {
  meridian = "PM";
  hours -= 12;
} else if (hours < 12) {
  meridian = "AM";
  if (hours === 0) {
    hours = 12;
  }
} else {
  meridian = "PM";
}
let minutes = String(now.getMinutes()).padStart(2, "0");

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = weekdays[now.getDay()];

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day}, ${hours}:${minutes}${meridian}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.daily;

  let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index) {
  if (index < 6) {
forecastHTML = forecastHTML + 
`
  <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="" width="45px">              
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°</span>|
      <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</span>
    </div>
  </div>
`;
}
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates);
let apiKey = "54d11e99c53adac5dcd32b4969b4b1cf";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);

function displayWeather(response) {
  console.log(response.data);
  let weatherData = response.data;
  document.querySelector("#city").innerHTML = weatherData.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
  Math.round(celsiusTemperature);
    
  document.querySelector("#humidity").innerHTML = weatherData.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    weatherData.wind.speed
  );
  document.querySelector("#sunUp").innerHTML = new Date(
    weatherData.sys.sunrise * 1000
  );
  document.querySelector("#sunDown").innerHTML = new Date(
    weatherData.sys.sunset * 1000
  );
  document.querySelector("#description").innerHTML =
    weatherData.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let apiKey = "54d11e99c53adac5dcd32b4969b4b1cf";
  let city = document.querySelector("#city-input").value.trim();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let changeCityButton = document.querySelector("#change-city");
changeCityButton.addEventListener("click", search);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "54d11e99c53adac5dcd32b4969b4b1cf";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

let geoButton = document.querySelector("#geoposition");
geoButton.addEventListener("click", getCurrentLocation);

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let form = document.querySelector("#search-form");

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  let city = cityInputElement.value.trim();
  searchCity(city);
}

form.addEventListener("submit", handleSubmit);

function searchCity(city) {
  let apiKey = "yourApiKey";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
