/* CONSTANTS */
const apiKey = '05974b4b75ba8d5bd5e39c34c3de0a87';
const searchField = document.getElementById('search-field');
const searchIcon = document.getElementById('search-icon');
const emptySection = document.getElementById('empty-section');
const mainSection = document.getElementById('main-section');
const cityElem = document.getElementById('city');
const countryElem = document.getElementById('country');
const mainForecastElem = document.getElementById("main-forecast")
const forecastIcon = document.getElementById('forecast-icon');
const statusElem = document.getElementById('status');
const tempSectionElem = document.getElementById("tempreature-wrapper")
const minTempElem = document.querySelector('#min-wrapper span');
const feelTempElem = document.querySelector('#sensation-wrapper span');
const maxTempElem = document.querySelector('#max-wrapper span');

/* FUNCTIONS */
function updateElementStyling(weather) {
  const iconElem = forecastIcon;
  const isNight = weather.weather[0].icon.endsWith('n');
  const isCloudyOrRainy = weather.weather[0].main === 'Clouds' || weather.weather[0].main === 'Rain';
  iconElem.style.backgroundColor = isNight ? (isCloudyOrRainy ? "#36364b" : '#121856') : (isCloudyOrRainy ? "#7da6ba" : '#7edaffe9');
  mainForecastElem.style.color = isNight? "#fff" : "#000";
  mainForecastElem.style.backgroundColor = isNight? (isCloudyOrRainy ? "#3f455fd3" : "#243a9fde") : (isCloudyOrRainy ? "#7294a5e5" : "#58a6ffb4");
  statusElem.style.color = isNight? (isCloudyOrRainy ? "#bbbbbb" : "#fffcbd") : (isCloudyOrRainy ? "#e2e2e2" : "#000");
  tempSectionElem.style.backgroundColor = isNight? "#525252d3" : "#ffffffc5";
  tempSectionElem.style.color = isNight? "#fff" : "#000";
  iconElem.style.borderRadius = '50%';
  iconElem.style.padding = '8px';
}
function updateUI(weather, location) {
  cityElem.textContent = location.name;
  countryElem.textContent = location.country;
  statusElem.textContent = weather.weather[0].description;
  minTempElem.textContent = weather.main.temp_min.toFixed(1);
  feelTempElem.textContent = weather.main.feels_like.toFixed(1);
  maxTempElem.textContent = weather.main.temp_max.toFixed(1);
  const iconCode = weather.weather[0].icon;
  forecastIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  updateElementStyling(weather);
}
function showEmptySection() {
  emptySection.style.display = '';
  mainSection.style.display = 'none';
}
function showMainSection() {
  emptySection.style.display = 'none';
  mainSection.style.display = '';
}
async function getCoordinates(city) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.length === 0) throw new Error('City not found');
  return data[0];
}
async function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather data not found');
  return await res.json();
}
async function handleSearch() {
  const city = searchField.value.trim();
  if (!city) {
    showEmptySection();
    return;
  }
  try {
    const location = await getCoordinates(city);
    const weather = await getWeather(location.lat, location.lon);
    updateUI(weather, location);
    showMainSection();
  } catch (err) {
    showEmptySection();
    emptySection.querySelector('p').textContent = 'City not found. :( Please try again!';
  }
}

/* EVENT LISTENERS */
searchIcon.addEventListener('click', handleSearch);
searchField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSearch();
});

showEmptySection();
