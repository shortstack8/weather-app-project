// SEARCH BAR & CURRENT DAY WEATHER SECTION //

// This script fetches data from API and updates current day weather section //
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

  let iconElement = document.querySelector("#weather-icon");

  currentTemperatureElement.innerHTML = Math.round(temperature);
  locationElement.innerHTML = location;
  timeElement.innerHTML = formatDate(date);
  weatherDescriptionElement.innerHTML = weatherDescription;
  humidityElement.innerHTML = `${humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(windSpeed)}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

  getForecast(response.data.city);
}
// This function formats day and time for current day weather section to make it a more readble format //
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

// This function fetches search city data from API and updates the current day weather section by calling the updateTemperature function, as all data updates once a new city is searched for //
function searchCity(city) {
  let apiKey = "7a8a3ab1of0tb43589746b74d2fe8452";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemperature);
}

// This function handles the search form submission ie "Enter a city" and prevents the default action //
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

// 5 - DAY WEATHER FORECAST SECTION //

// This function formats the day for the 5-day weather forecast section to make it a more readable format //
// It takes a timestamp as input and returns the day of the week as a string //
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

// This function fetches the 5-day weather forecast data from API and updates the 5-day weather forecast section by calling the displayForecast function //
function getForecast(city) {
  let apiKey = "7a8a3ab1of0tb43589746b74d2fe8452";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// This function displays the 5-day weather forecast data in the 5-day weather forecast section //
function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
      <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>

          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}°</div>
          </div>
      </div>
    `;
    }
  });

  let weatherForecastElement = document.querySelector("#weather-forecast");
  weatherForecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Melbourne");
