// Between here and the next note, the code works to display weekday and time in 12 hr. format with Am/Pm
let currentDay = document.getElementById("date-and-time");

let now = new Date();
let weekdays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
function amPm() {
  if (now.getHours < 12) {
    return "AM";
  } else {
    return "PM";
  }
}
let hours = now.getHours() % 12;
if (hours === 0) {
  hours = 12;
}
let mins = now.getMinutes();
if (mins < 10) {
  mins = `0${now.getMinutes()}`;
}
let currentTime = `${hours}:${mins}`;
let currentWeekDay = weekdays[now.getDay()];
currentDay.innerHTML = `${currentWeekDay}, ${currentTime} ${amPm()}`;

//This section will automatically update the forecast days to the correct days of the week
document.getElementById("forecast-1").innerHTML = weekdays[now.getDay() + 1];
document.getElementById("forecast-2").innerHTML = weekdays[now.getDay() + 2];
document.getElementById("forecast-3").innerHTML = weekdays[now.getDay() + 3];
document.getElementById("forecast-4").innerHTML = weekdays[now.getDay() + 4];
document.getElementById("forecast-5").innerHTML = weekdays[now.getDay() + 5];
document.getElementById("forecast-6").innerHTML = weekdays[now.getDay() + 6];

// From here, the code will work to display the User's city when searched and submitted
let userCity = document.getElementById("city-name");
let search = document.getElementById("search-city");
let searchButton = document.getElementById("button-addon2");
let temp = document.getElementById("current-temperature");
let forecast = document.getElementById("mrFrogSays");

searchButton.addEventListener("click", searchCity);

function searchCity(response) {
  response.preventDefault();
  let key = "3d95dc3f33f458odab21943t86b91c04";
  let city = search.value;
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=${unit}`;
  axios.get(apiUrl).then(displayCity);
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=${unit}`;
  axios.get(forecastUrl).then(displayForecastC);
}
function displayCity(data) {
  temp.innerHTML = `${data.data.temperature.current} °C`;
  userCity.innerHTML = data.data.city;
  let statement = data.data.condition.description;
  let windspeed = data.data.wind.speed;
  forecast.innerHTML = `Mr. Frog says today is a ${statement} day! <br> He also notes windspeeds of ${windspeed} kmph`;
  console.log(data.data);
  let frogBoy = document.getElementById("frog-boy");
  frogBoy.src = `img/${data.data.condition.icon}.PNG`;
}

function displayForecastC(data) {
  console.log(data);
  // Day 1
  document.getElementById(
    "temp-1"
  ).innerHTML = `${data.data.daily[0].temperature.day}° C`;
  // Day 2
  document.getElementById(
    "temp-2"
  ).innerHTML = `${data.data.daily[1].temperature.day}° C`;
  //Day 3
  document.getElementById(
    "temp-3"
  ).innerHTML = `${data.data.daily[2].temperature.day}° C`;
  //Day 4
  document.getElementById(
    "temp-4"
  ).innerHTML = `${data.data.daily[3].temperature.day}° C`;
  //Day 5
  document.getElementById(
    "temp-5"
  ).innerHTML = `${data.data.daily[4].temperature.day}° C`;
  //And Day 6
  document.getElementById(
    "temp-6"
  ).innerHTML = `${data.data.daily[5].temperature.day}° C`;
  // And now the function to change all of the images to match the forecast

  // Day 1
  document.getElementById(
    "img-1"
  ).src = `${data.data.daily[0].condition.icon_url}`;
  // Day 2
  document.getElementById(
    "img-2"
  ).src = `${data.data.daily[1].condition.icon_url}`;
  //Day 3
  document.getElementById(
    "img-3"
  ).src = `${data.data.daily[2].condition.icon_url}`;
  //Day 4
  document.getElementById(
    "img-4"
  ).src = `${data.data.daily[3].condition.icon_url}`;
  //Day 5
  document.getElementById(
    "img-5"
  ).src = `${data.data.daily[4].condition.icon_url}`;
  //And Day 6
  document.getElementById(
    "img-6"
  ).src = `${data.data.daily[5].condition.icon_url}`;
}

// Now let's figure out what we can do about finding the current location
let locator = document.getElementById("current-location");
locator.addEventListener("click", onSuccess);

function onSuccess() {
  navigator.geolocation.getCurrentPosition(displayingCurrentLocation);
}
function displayingCurrentLocation(position) {
  const { latitude, longitude } = position.coords;
  let key = "3d95dc3f33f458odab21943t86b91c04";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${key}`;
  axios.get(apiUrl).then(geolocator);
}
function geolocator(data) {
  temp.innerHTML = `${data.data.temperature.current} °C`;
  userCity.innerHTML = data.data.city;
  let statement = data.data.condition.description;
  let windspeed = data.data.wind.speed;
  forecast.innerHTML = `Mr. Frog says today is a ${statement} day! <br> He also notes windspeeds of ${windspeed}kmph`;
  let frogBoy = document.getElementById("frog-boy");
  frogBoy.src = `img/${data.data.condition.icon}.PNG`;
  let city = data.data.city;
  let key = "3d95dc3f33f458odab21943t86b91c04";
  let unit = metric;
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=${unit}`;
  axios.get(forecastUrl).then(displayForecastC);
}

// Word, now that that is done, we need to integrate the unit conversion between metric and imperial
//I already gave the two buttons C, and F, the ids metric and imperial respectively.
//let's focus on metric first
let buttonMetric = document.getElementById("metric");
buttonMetric.addEventListener("click", convertToC);

function convertToC() {
  let key = "3d95dc3f33f458odab21943t86b91c04";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${userCity.innerHTML}&key=${key}&units=metric`;
  axios.get(apiUrl).then(displayMetric);
  let apikey = "3d95dc3f33f458odab21943t86b91c04";
  let unit = metric;
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${userCity.innerHTML}&key=${apikey}&units=${unit}`;
  axios.get(forecastUrl).then(displayForecastC);
}
function displayMetric(data) {
  temp.innerHTML = `${data.data.temperature.current} °C`;
  userCity.innerHTML = data.data.city;
  let statement = data.data.condition.description;
  let windspeed = data.data.wind.speed;
  forecast.innerHTML = `Mr. Frog says today is a ${statement} day! <br> He also notes windspeeds of ${windspeed} kmph`;
  console.log(data.data);

  let frogBoy = document.getElementById("frog-boy");
  frogBoy.src = `img/${data.data.condition.icon}.PNG`;
}
// And now, we focus on imperial
let buttonImperial = document.getElementById("imperial");
buttonImperial.addEventListener("click", convertToF);

function convertToF() {
  let key = "3d95dc3f33f458odab21943t86b91c04";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${userCity.innerHTML}&key=${key}&units=imperial`;
  axios.get(apiUrl).then(displayImperial);
  let apikey = "3d95dc3f33f458odab21943t86b91c04";
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${userCity.innerHTML}&key=${apikey}&units=imperial`;
  axios.get(forecastUrl).then(displayForecastF);
}
function displayImperial(data) {
  temp.innerHTML = `${data.data.temperature.current} °F`;
  userCity.innerHTML = data.data.city;
  let statement = data.data.condition.description;
  let windspeed = data.data.wind.speed;
  forecast.innerHTML = `Mr. Frog says today is a ${statement} day! <br> He also notes windspeeds of ${windspeed} mph`;
}

// This will be the function "displayForecastF", which is a lot of annoying code. So I decided to leave it down here

function displayForecastF(data) {
  console.log(data);
  // Day 1
  document.getElementById(
    "temp-1"
  ).innerHTML = `${data.data.daily[0].temperature.day}° F`;
  // Day 2
  document.getElementById(
    "temp-2"
  ).innerHTML = `${data.data.daily[1].temperature.day}° F`;
  //Day 3
  document.getElementById(
    "temp-3"
  ).innerHTML = `${data.data.daily[2].temperature.day}° F`;
  //Day 4
  document.getElementById(
    "temp-4"
  ).innerHTML = `${data.data.daily[3].temperature.day}° F`;
  //Day 5
  document.getElementById(
    "temp-5"
  ).innerHTML = `${data.data.daily[4].temperature.day}° F`;
  //And Day 6
  document.getElementById(
    "temp-6"
  ).innerHTML = `${data.data.daily[5].temperature.day}° F`;
}
