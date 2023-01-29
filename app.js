window.addEventListener("load", () => {
  let long;
  let lat;
  let dataSet;

  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  const geolocation = navigator.geolocation;
  const API_KEY = "350dbfa05e5f155a096a31789d1045f4";

  const storeJSON = (data) => {
    dataSet = data;
  };

  const kelvinToCelsius = (kelvinTemp) => {
    const KELVIN_MAGNITUDE = 273.15;
    return Math.round(kelvinTemp - KELVIN_MAGNITUDE);
  };

  const summary = (celsiusTemp) => {
    switch (true) {
      case celsiusTemp < 2:
        console.log("It's freaking cold");
        break;
      case celsiusTemp >= 2 && celsiusTemp < 13:
        console.log("It's cold");
        break;
      case celsiusTemp >= 13 && celsiusTemp < 20:
        console.log("It's a bit cold");
        break;
      case celsiusTemp >= 20 && celsiusTemp < 27:
        console.log("It's the perfect weather");
        break;
      case celsiusTemp >= 27 && celsiusTemp < 33:
        console.log("It's hot");
        break;
      case celsiusTemp >= 33 && celsiusTemp < 40:
        console.log("It's very hot");
        break;
      case celsiusTemp >= 40:
        console.log("So hot that you'll melt outside");
        break;
      default:
        console.log(`Sorry, we are out of ${celsiusTemp}.`);
    }
  };

  if (geolocation) {
    geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          storeJSON(data);
          console.log("dataSet", dataSet);
          const { temp } = dataSet.main;
          const tempDegreeCelsius = kelvinToCelsius(temp);
          const tempDescription = summary(tempDegreeCelsius);
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          temperatureDegree.textContent = tempDegreeCelsius;
          temperatureDescription.textContent = tempDescription;
          locationTimezone.textContent = timeZone;
        });
    });
  }
});
