import { refreshWeatherInformation } from "./DOMElements";

function validateSeachInput(input) {
  if (input.length > 1) {
    refreshWeatherInformation(
      input.replace(/^[^a-zA-Z0-9]*|[^a-zA-Z0-9]*$/g, "").toLowerCase()
    );
  }
}

export { validateSeachInput };
