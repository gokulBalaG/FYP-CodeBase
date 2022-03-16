"use strict";

// for HOME route

if (window.location.href === "/home") {
  const productDivs = document.querySelectorAll(".product-div");

  productDivs.forEach((pd) => {
    pd.addEventListener("click", (e) => {
      const route = pd.children[0].getAttribute("routeName");

      window.location.href = `/${route}`;
    });
  });
}

// for HOME route

//
//

// for weather forecast

const getLocation = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

window.addEventListener("load", async (e) => {
  try {
    const coords = await getLocation();

    const [lat, lng] = [coords.coords.latitude, coords.coords.longitude];

    const inputLatLng = document.querySelector(".input-latlng");

    if (inputLatLng) inputLatLng.value = `${lat},${lng}`;
  } catch (e) {
    console.log(e, "Could not get location.");
  }
});

// document.querySelector('.btn-get-weather').addEventListener('click', e=> {
//   const wcDiv = document.querySelector('.weather-condition-div');

//   if (wcDiv.classList.contains('hidden')) wcDiv.classList.remove('hidden')

// });

// for weather forecast
