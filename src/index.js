function updateTemperature(response) {
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  let temperature = response.data.temperature.current;

  let locationElement = document.querySelector("#location");
  let location = response.data.city;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let weatherDescription = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;

  let windSpeedElement = document.querySelector("#wind-speed");
  let windSpeed = response.data.wind.speed;

  console.log(response.data);

  currentTemperatureElement.innerHTML = Math.round(temperature);
  locationElement.innerHTML = location;
  timeElement.innerHTML = formatDate(date);
  weatherDescriptionElement.innerHTML = weatherDescription;
  humidityElement.innerHTML = `${humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(windSpeed)}km/h`;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "7a8a3ab1of0tb43589746b74d2fe8452";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Melbourne");
