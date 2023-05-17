// Get current date and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentHours = now.getHours();
let currentMinutes = now.getMinutes();
let h4 = document.querySelector("h4");
h4.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;

// Function to display current temperature and location
function showWeather(latitude, longitude) {
  let apiKey = "c8e80099513f3ce6eb6a2f4ded9e5380";
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
}

// Function to get current location and display weather
function getCurrentLocation() {
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    showWeather(latitude, longitude);
    showForecast(latitude, longitude);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}

// Event listener for the search form
let form = document.querySelector(".search-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let formControl = document.querySelector("#city-input");
  let city = formControl.value;
  showWeatherByCity(city);
});

// Function to display weather by city
function showWeatherByCity(city) {
  let apiKey = "c8e80099513f3ce6eb6a2f4ded9e5380";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    let latitude = response.data.coord.lat;
    let longitude = response.data.coord.lon;

    showWeather(latitude, longitude);
    showForecast(latitude, longitude);
  });
}

// Event listener for current location button
let currentLocationBtn = document.getElementById("current-location-btn");
currentLocationBtn.addEventListener("click", getCurrentLocation);

// Function to display weather forecast for the next 6 days
function showForecast(latitude, longitude) {
  let apiKey = "c8e80099513f3ce6eb6a2f4ded9e5380";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    let forecast = response.data.list;

    let weatherGrid = document.querySelector(".weather-grid");
    weatherGrid.innerHTML = "";

    let currentDay = new Date().getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    forecast.slice(0, 7).forEach(function (forecastData, index) {
      let timestamp = forecastData.dt * 1000;
      let date = new Date(timestamp);
      let dayIndex = (currentDay + index) % 7; // Calculate the correct day index
      let day = days[dayIndex];
      let temperature = Math.round(forecastData.main.temp);
      let description = forecastData.weather[0].description;

      let weatherItem = document.createElement("p");
      weatherItem.innerHTML = `
        <span class="emoji">${getWeatherEmoji(description)}</span>
        <br />
        <strong>${day}</strong>
        <br />
        ${temperature}°
        <br />
        ${description}
      `;

      weatherGrid.appendChild(weatherItem);
    });
  });
}


// Helper function to get weather emoji based on description
function getWeatherEmoji(description) {
  // Define mappings for different weather descriptions and corresponding emojis
  let emojiMappings = {
    "clear sky": "☀️",
    "few clouds": "🌤️",
    "scattered clouds": "⛅",
    "broken clouds": "☁️",
    "shower rain": "🌦️",
    rain: "🌧️",
    thunderstorm: "⛈️",
    snow: "❄️",
    mist: "🌫️",
    "light rain": "🌧️",
    "overcast clouds": "☁️",
  };

  // Check if the description exists in the mappings, if not return empty string
  if (description in emojiMappings) {
    return emojiMappings[description];
  } else {
    return "";
  }
}

// Call the showWeather and showForecast functions after retrieving current location
getCurrentLocation();
