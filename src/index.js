// date
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
  let shortDay = day.slice(0, 3);
  let month = months[date.getMonth()];
  let dateIndex = date.getDate();

  return `${hours}:${minutes} ${day}, ${month} ${dateIndex}`;
}
let currentTime = new Date();
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = formatDate(currentTime);

// Show Temperature based on the city

function showTemperature(response) {
  console.log(response);
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

  let regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  document.querySelector("#country").innerHTML = regionNamesInEnglish.of(
    response.data.sys.country
  );
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
  console.log(position);
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

// function changeToFahrenheit(event) {
//   event.preventDefault();
//   // let temp = 18;
//   let currentTemp = document.querySelector("#temperature");
//   let temperature = currentTemp.innerHTML;
//   temperature = Number(temperature);
//   currentTemp.innerHTML = Math.round((temperature * 9) / 5 + 32);
// }

// function changeToCelsius(event) {
//   event.preventDefault();
//   // let temp = 18;
//   let currentTemp = document.querySelector("#temperature");
//   let temperature = currentTemp.innerHTML;
//   temperature = Number(temperature);
//   currentTemp.innerHTML = Math.round(((temperature - 32) * 5) / 9);
// }

// let showFahrenheit = document.querySelector("#fahrenheit-dergees");
// showFahrenheit.addEventListener("click", changeToFahrenheit);

// let showCelsius = document.querySelector("#celsius-degrees");
// showCelsius.addEventListener("click", changeToCelsius);
//
