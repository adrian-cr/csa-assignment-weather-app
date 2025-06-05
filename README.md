# Assignment: Weather App

This project is a simple weather app designed to showcase the implementation of API consumption and asynchronous `JavaScript` functionality. The app allows users to search for the current weather in any city by entering the city name. It fetches weather data from an external API (OpenWeatherAPI) and displays relevant information dynamically.

The app uses external `CSS` for styling and Google Fonts for typography. All dynamic content is managed via `JavaScript` (`index.js`).

## Page Structure
### Header
Contains a search bar where users can input a city name and a search icon that can be clicked to trigger the search.

### Main Section
* **Title**: Displays the app's title with weather-themed emojis.
* **Empty Section**: Shows a prompt to enter a city name when no search has been made or an error message when data can't be found.
* **Main Section**: Displays the weather information for the searched city, including:
  * Location (city and country)
  * Weather status and icon
  * Temperature details (minimum, maximum, and "feels like" values), each with corresponding icons.

## `JavaScript` Functionality
The main `JS` script (`index.js`) implements the core logic for the weather application using the OpenWeatherMap API, managing user input, fetching geolocation and weather data, and updating the UI dynamically based on the results.

### Functions
* `getCoordinates()`
  Fetches the latitude and longitude for a given city name using the OpenWeatherMap Geocoding API; returns a location object containing latitude, longitude, name, and country.
* `getWeather()`
  Fetches the current weather data for the specified latitude and longitude using the OpenWeatherMap Weather API; returns a weather data object.
* `handleSearch()`
  Handles the search action, orchestrating the fetching of coordinates and weather data, updating the UI, and managing error states.
* `showEmptySection()`
  Displays the empty state section, typically used when no city is searched or when an error occurs.
* `showMainSection()`
Displays the main weather information section when valid weather data is available.
* `updateElementStyling()`
  Updates the visual styling of weather-related UI elements based on the current weather conditions and time of day.
* `updateUI()`
  Populates the main weather display section with the latest weather and location data.

### Event Listeners
* `searchIcon`, `'click'`:
  Triggers the `handleSearch()` function when the search icon is clicked.

* `searchField` `'keydown'`:
  Triggers the `handleSearch()` function when the Enter key is pressed in the search input field.

### Initialization
* `showEmptySection()` is called on load to display the empty state before any search is performed.
