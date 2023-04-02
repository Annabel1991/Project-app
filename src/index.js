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
  fahrenheitTemperature = response.data.main.temp;
  document.querySelector("#current-temp").innerHTML = Math.round(
    fahrenheitTemperature
  );

  document.querySelector("#humidity").innerHTML = weatherData.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    weatherData.wind.speed
  );
  document.querySelector("#sunUp").innerHTML = new Date(
    weatherData.sys.sunrise * 1000
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  document.querySelector("#sunDown").innerHTML = new Date(
    weatherData.sys.sunset * 1000
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  document.querySelector("#description").innerHTML =
    weatherData.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function search(event) {
  event.preventDefault();
  let apiKey = "54d11e99c53adac5dcd32b4969b4b1cf";
  let city = document.querySelector("#city-input").value.trim();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
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