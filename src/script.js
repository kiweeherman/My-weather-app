// This section will now be working to change the name of the City at the top of the page when the user submits a city.

let cityName = document.getElementById("city-name");
let searchButton = document.getElementById("city-submit");
let searchField = document.getElementById("city-search");

searchButton.addEventListener("click", searchForCity);

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function searchForCity(event) {
  event.preventDefault();
  let apiKey = "af198b69f06145dba9541337231206";
  let cityTerm = searchField.value;
  let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityTerm}&aqi=no`;
  if (cityTerm === "") {
    cityName.innerHTML = "Lisbon";
  } else {
    cityName.innerHTML = toTitleCase(cityTerm);
  }
  return axios.get(apiUrl).then(produceTemp).catch(handleError);
}

function produceTemp(response) {
  let changeTemp = document.getElementById("city-temp");
  changeTemp.innerHTML = `${response.data.current.temp_f} ° F`;
}
function handleError(error) {
  console.log(`Error: ${error}`);
}
