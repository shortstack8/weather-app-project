function updateTemperature(response) {
  let currentTemperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let locationElement = document.querySelector("#location");

  locationElement.innerHTML = response.data.city;
  currentTemperatureElement.innerHTML = Math.round(temperature);
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
