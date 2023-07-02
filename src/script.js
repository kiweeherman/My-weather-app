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
}
function displayImperial(data) {
  temp.innerHTML = `${data.data.temperature.current} °F`;
  userCity.innerHTML = data.data.city;
  let statement = data.data.condition.description;
  let windspeed = data.data.wind.speed;
  forecast.innerHTML = `Mr. Frog says today is a ${statement} day! <br> He also notes windspeeds of ${windspeed} mph`;
  console.log(data.data);

  let frogBoy = document.getElementById("frog-boy");
  frogBoy.src = `img/${data.data.condition.icon}.PNG`;
}
