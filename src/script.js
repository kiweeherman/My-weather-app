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
console.log(now.getHours());
currentDay.innerHTML = `${currentWeekDay}, ${currentTime} ${amPm()}`;

// From here, the code will work to display the User's city when searched and submitted
let userCity = document.getElementById("city-name");
let search = document.getElementById("search-city");
let searchButton = document.getElementById("button-addon2");

searchButton.addEventListener("click", displayCity);

function displayCity(response) {
  response.preventDefault();
  userCity.innerHTML = search.value;
}
// For now, this will do while I work on the API integration
