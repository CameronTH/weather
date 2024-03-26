import { validateSeachInput } from "./formValidation";
import { fetchFromAPI, fetchLocationOptions } from "./API";

function addSearchButtonEventListener() {
  const setLocationButton = document.querySelector("#set-location-button");
  setLocationButton.addEventListener("click", (e) => {
    document
      .querySelector(".drop-down-list")
      .parentElement.classList.remove("active");
    validateSeachInput(e.target.parentElement.querySelector("input").value);
  });
}

async function refreshWeatherInformation(searchLocation) {
  const data = await fetchFromAPI(searchLocation || "london");

  const location = document.querySelector(".location");
  const temperature = document.querySelector(".temperature");
  const feelsLike = document.querySelector(".feels-like");
  const condition = document.querySelector(".condition");
  const humidity = document.querySelector(".humidity");
  const windSpeed = document.querySelector(".wind-speed");
  const windGusts = document.querySelector(".wind-gusts");
  const windDirection = document.querySelector(".wind-direction");
  const weatherIcon = document.querySelector(".weather-icon");

  location.textContent = `${data.name}, ${data.country}`;
  temperature.textContent = `${data.temp_c}°C`;
  feelsLike.textContent = `Feels Like ${data.feelslike_c}°C`;
  condition.textContent = data.condition.text;

  humidity.textContent = `${data.humidity}%`;
  windSpeed.textContent = `${data.wind_mph} mph`;
  windGusts.textContent = `${data.gust_mph} mph`;
  windDirection.textContent = `${data.wind_dir}`;

  weatherIcon.src = data.condition.icon.replace(/64/g, "128");
}

async function refreshLocationDropDown(location) {
  const dropDown = document.querySelector(".drop-down-list");
  const mainDropDown = dropDown.parentElement;

  if (location.length > 2) {
    const locationArray = await fetchLocationOptions(location);
    mainDropDown.classList.add("active");

    dropDown.replaceChildren();

    locationArray.forEach((location, index) => {
      const listItem = document.createElement("li");
      listItem.addEventListener(
        "click",
        addSelectionLocationEventListener(locationArray[index])
      );
      listItem.textContent = `${location.name}, ${location.country}`;
      dropDown.append(listItem);
    });
  } else {
    mainDropDown.classList.remove("active");
  }
}

function addSelectionLocationEventListener(locationArray) {
  return function () {
    const input = document.querySelector("#set-location-input");
    input.value = `${locationArray.name}, ${locationArray.country}`;
    refreshLocationDropDown(`${locationArray.name}, ${locationArray.country}`);
  };
}

function addSearchInputEventListener() {
  const input = document.querySelector("#set-location-input");
  const dropDown = document.querySelector(".drop-down-list");
  const mainDropDown = dropDown.parentElement;

  input.addEventListener("input", () => {
    refreshLocationDropDown(input.value);
  });

  input.addEventListener("blur", function () {
    setTimeout(() => {
      mainDropDown.classList.remove("active");
    }, 150);
  });
}

addSearchButtonEventListener();
addSearchInputEventListener();
refreshWeatherInformation();

export { addSearchButtonEventListener, refreshWeatherInformation };
