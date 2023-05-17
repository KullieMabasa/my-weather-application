// Function to get current location and display weather
function getCurrentLocation() {
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    showForecast(latitude, longitude);
  }

  navigator.geolocation.getCurrentPosition(showPosition);

  // Show weather using the current location
  showWeatherByCurrentLocation();
}

// Function to display weather using current location
function showWeatherByCurrentLocation() {
  let apiKey = "c8e80099513f3ce6eb6a2f4ded9e5380";

  navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(function (response) {
      let city = response.data.name;
      let temperature = Math.round(response.data.main.temp);
      let description = response.data.weather[0].description;
      let humidity = response.data.main.humidity;

      let h1 = document.querySelector("h1");
      h1.innerHTML = city;

      let emoji1 = document.querySelector(".emoji-h1");
      emoji1.innerHTML = `
        <span class="emoji">${getWeatherEmoji(description)}</span>
      `;

      let temperatureElement = document.querySelector(".celsius-temp");
      temperatureElement.innerHTML = `${temperature}°C`;

      let h2 = document.querySelector("h2");
      h2.innerHTML = description;

      let humidityElement = document.querySelector(".humidity");
      humidityElement.innerHTML = `Humidity: ${humidity}%`;
    });
  });
}

// Call the showForecast function after retrieving current location
getCurrentLocation();
