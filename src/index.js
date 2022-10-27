function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dateIndex = date.getDate();

  return `${hours}:${minutes} ${day}, ${month} ${dateIndex}`;
}
let currentTime = new Date();
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = formatDate(currentTime);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Show Temperature based on the city

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `<div class="col">
              <div class="card next-day-card shadow-sm">
                <div class="card-body">
                  <p class="card-title next-day">${formatDay(
                    forecastDay.dt
                  )}</p>
                  <hr />
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" alt="raining" width="60" />
                  <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}° </span>
            <span class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}° </span>
          </div>
                </div>
              </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity-value").innerHTML = `${Math.round(
    response.data.main.humidity
  )}`;
  document.querySelector("#wind-value").innerHTML = `${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  showCelsius.classList.add("active");
  showFahrenheit.classList.remove("active");

  let regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  document.querySelector("#country").innerHTML = regionNamesInEnglish.of(
    response.data.sys.country
  );

  getForecast(response.data.coord);
}
// searchCity

function search(city) {
  let units = "metric";
  let apiKey = "428c5a1922cc616027d52a04d4c4168b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form-input").value;
  search(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// current city

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "428c5a1922cc616027d52a04d4c4168b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function findGeoposition() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentBtn = document.querySelector("#current-city-btn");
currentBtn.addEventListener("click", findGeoposition);

search("Kharkiv");
// temp change CelciusToFahrenheit

function changeToFahrenheit(event) {
  event.preventDefault();
  showCelsius.classList.remove("active");
  showFahrenheit.classList.add("active");
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}

function changeToCelsius(event) {
  event.preventDefault();
  showCelsius.classList.add("active");
  showFahrenheit.classList.remove("active");
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let showFahrenheit = document.querySelector("#fahrenheit-dergees");
showFahrenheit.addEventListener("click", changeToFahrenheit);

let showCelsius = document.querySelector("#celsius-degrees");
showCelsius.addEventListener("click", changeToCelsius);
