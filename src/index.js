function handleSearchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let location = document.querySelector("#location");
  location.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchCity);
