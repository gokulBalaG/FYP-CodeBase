const btnGetWeather = document.querySelector('.btn-get-weather');
const inputCityName = document.querySelector('#input-city-name');
const checkboxGetLocation = document.querySelector('#input-location-access');

/**
 * Get the co-ordinates from the user
 * @returns {Object} A new Promise, with user's co-ordinates
 */

const getLocation = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

if (btnGetWeather) btnGetWeather.disabled = true;

const inputCityNameEvent = function (e) {
  if (this.value !== '') {
    checkboxGetLocation.checked = false;
    btnGetWeather.disabled = false;
  } else {
    btnGetWeather.disabled = true;
  }
};

const checkboxGetLocationEvent = async function (e) {
  if (e.target.checked) {
    if (inputCityName.value !== '') inputCityName.value = '';

    btnGetWeather.disabled = false;

    try {
      const coords = await getLocation();
      const [lat, lng] = [coords.coords.latitude, coords.coords.longitude];

      checkboxGetLocation.value = `${lat} ${lng}`;
    } catch (e) {
      console.log(e, 'Could not get location.');
    }
  } else btnGetWeather.disabled = true;
};

// clear checkbox on city name input
inputCityName && inputCityName.addEventListener('keydown', inputCityNameEvent);

// get location on checkbox "checked" and clear input city name field
checkboxGetLocation &&
  checkboxGetLocation.addEventListener('change', checkboxGetLocationEvent);
