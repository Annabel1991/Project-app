let now = new Date();

let date = now.getDate();
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

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

let currentDate = document.querySelector("#date-today");
currentDate.innerHTML = `${day}, ${date} ${month} ${hours}:${minutes}${meridian}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayTemperature(response) {
  console.log(response);
  fahrenheitTemperature = response.data.temperature.current;
    console.log(fahrenheitTemperature);
  let weatherData = response.data;
  document.querySelector("#city").innerHTML = response.data.city;
   document.querySelector("#current-temp").innerHTML = Math.round(fahrenheitTemperature);
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    weatherData.wind.speed
  );
  document.querySelector("#pressure").innerHTML =
    response.data.temperature.pressure;

  let description = response.data.condition.description;
  let icon = response.data.condition.icon;

  let displayDescription = document.querySelector("#description");
  displayDescription.innerHTML = description;

  let displayIcon = document.querySelector("#icon");
  displayIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
  );

  getForecast(response.data.coordinates);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "dt229oa84d9dabc42ffabf7f5e40f673";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function search(event) {
  event.preventDefault();
  let apiKey = "dt229oa84d9dabc42ffabf7f5e40f673";
  let city = document.querySelector("#city-input").value.trim();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

let changeCityButton = document.querySelector("#change-city");
changeCityButton.addEventListener("click", search);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "dt229oa84d9dabc42ffabf7f5e40f673";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

let geoButton = document.querySelector("#geoposition");
geoButton.addEventListener("click", getCurrentLocation);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = (fahrenheitTemperature - 32) / 1.8;

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;
let celsius = document.querySelector("#current-celsius");
celsius.addEventListener("click", displayCelsiusTemperature);

let fahrenheit = document.querySelector("#current-fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(
            forecastDay.time
          )}</div>
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temperature.maximum
            )}° </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temperature.minimum
            )}° </span>
          </div>
        </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}