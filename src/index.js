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

function displayWeather(response) {
  console.log(response.data);
  let weatherData = response.data;
  document.querySelector("#city").innerHTML = weatherData.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(weatherData.main.temp) + "°C";
  document.querySelector("#humidity").innerHTML = weatherData.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    weatherData.wind.speed
  );
  document.querySelector("#sunUp").innerHTML = new Date(
    weatherData.sys.sunrise * 1000
  ).toLocaleTimeString();
  document.querySelector("#sunDown").innerHTML = new Date(
    weatherData.sys.sunset * 1000
  ).toLocaleTimeString();
  document.querySelector("#currentIcon").innerHTML =
    weatherData.weather[0].description;
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

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

