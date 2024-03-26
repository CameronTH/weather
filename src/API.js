async function fetchFromAPI(searchLocation) {
  console.log(searchLocation);
  const location = searchLocation;
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=1c503f1c22b14158b5c215938241803&q=${location}&aqi=no`
  );
  try {
    if (!response.ok) {
      throw new Error(response.status, response.statusText);
    }
    const data = await response.json();
    return processAPIData(data);
  } catch (error) {
    console.error(error);
  }
}

function processAPIData(data) {
  const currentWeather = data.current;
  const currentLocation = data.location;

  const {
    feelslike_c,
    gust_mph,
    temp_c,
    wind_dir,
    wind_mph,
    humidity,
    condition,
  } = currentWeather;

  const { country, name, region } = currentLocation;

  return {
    country,
    name,
    region,
    feelslike_c,
    gust_mph,
    temp_c,
    wind_dir,
    wind_mph,
    humidity,
    condition,
  };
}

async function fetchLocationOptions(searchValue) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/search.json?q=${searchValue}&key=1c503f1c22b14158b5c215938241803`
  );
  try {
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// processAPIData("london");

export { fetchFromAPI, processAPIData, fetchLocationOptions };
