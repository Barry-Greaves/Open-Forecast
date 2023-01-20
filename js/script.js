const weatherAPIKey = 'eeb6b90e8ef375f3964761f6c685dbf4';
const weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + weatherAPIKey;
const forecastBaseEndpoint = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + weatherAPIKey;
const geocodingBaseEndpoint = 'https://api.openweathermap.org/geo/1.0/direct?&limit=5&appid='+weatherAPIKey+'&q=';

let searchInp = document.querySelector('.weather__search');
let city = document.querySelector('.weather__city');
let day = document.querySelector('.weather__day');
let humidity = document.querySelector('.weather__indicator--humidity>.value');
let wind = document.querySelector('.weather__indicator--wind>.value');
let pressure = document.querySelector('.weather__indicator--pressure>.value');
let image = document.querySelector('.weather__image');
let temperature = document.querySelector('.weather__temperature>.value');
let forecastBlock = document.querySelector('.weather__forecast');
let datalist = document.getElementById('suggestions');


/**
 * This function retrieves the value of the input element with the ID "citybg" and uses it to set the background
 * image of the page using the Unsplash API. The background image is set to the body element of the page.
 */
function backgroundImage () {
var bg = document.getElementById("citybg").value;
document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + bg + "')";
}

/**
 * weatherImages - an array of objects that map weather conditions to corresponding images
 * 
 * Each object in the array has two properties:
 * - url: the URL of the image to display for the corresponding weather condition
 * - ids: an array of weather condition IDs that map to the corresponding image
 * 
 * This array is used to determine which image to display for a given weather condition based on the 
 * weather condition ID received from the OpenWeatherMap API.
 */
let weatherImages = [
  {
      url: 'images/sunny.png',
      ids: [800]
  },
  {
      url: 'images/scattered-clouds.png',
      ids: [803, 804]
  },
  {
      url: 'images/few-clouds.png',
      ids: [801]
  },
  {
      url: 'images/mist.png',
      ids: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781]
  },
  {
      url: 'images/rain.png',
      ids: [500, 501, 502, 503, 504]
  },
  {
      url: 'images/scattered-clouds.png',
      ids: [802]
  },
  {
      url: 'images/shower-rain.png',
      ids: [520, 521, 522, 531, 300, 301, 302, 310, 311, 312, 313, 314, 321]
  },
  {
      url: 'images/snow.png',
      ids: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622]
  },
  {
      url: 'images/thnderstorm.png',
      ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]
  }
];

/**
 Retrieves the current weather data for a given city from the OpenWeatherMap API
 This function takes a city name as an argument and constructs an API endpoint using the weatherBaseEndpoint 
 and the city name. Then it fetches the weather data from the API and returns a JSON object containing the weather data.
 If the API returns a status code other than "ok" it will show an alert with an error message to the user,
 and it will return an object with a cod property set to "404"
 */
let getWeatherByCityName = async (city) => {
    let endpoint = weatherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    if(!response.ok) {
        alert("I'm sorry that is not a valid city name. Please check your spelling and submit again");
        return {cod: '404'};
    }
    let weather = await response.json();
    return weather;
};


/**
 Retrieves the forecast data for a given city from the OpenWeatherMap API
 This function takes a city name as an argument and constructs an API endpoint using the forecastBaseEndpoint 
 and the city name. Then it fetches the forecast data from the API, filters the data to only include forecasts
 for 12:00 PM, and returns an array of filtered forecast objects.
 */
let getForecastByCityName = async (city) => {
    let endpoint = forecastBaseEndpoint + '&q=' + city;
    let result = await fetch(endpoint);
    let forecast = await result.json();
    let forecastList = forecast.list;
    let daily = [];
    forecastList.forEach(day => {
        let date = new Date(day.dt_txt.replace(' ', 'T'));
        let hours = date.getHours();
        if(hours === 12) {
            daily.push(day);
        }
    });
    return daily;
};
let getForecastByCityID = async (id) => {
    let endpoint = forecastBaseEndpoint + '&id=' + id;
    let result = await fetch(endpoint);
    let forecast = await result.json();
    let forecastList = forecast.list;
    let daily = [];
    forecastList.forEach(day => {
        let date = new Date(day.dt_txt.replace(' ', 'T'));
        let hours = date.getHours();
        if(hours === 12) {
            daily.push(day);
        }
    });
    return daily; 
};

/**
This function asynchronously retrieves the current weather and forecast for a given city using the city's name.
The function first calls the getWeatherByCityName function to get the current weather for the city,
then uses the returned weather object's id property to call the getForecastByCityID function to get the forecast for the city.
Both the current weather and forecast are then passed to their respective update functions, updateCurrentWeather and updateForecast,
to update the current weather and forecast data for the city.
*/
let weatherForCity = async (city) => {
    let weather = await getWeatherByCityName(city);
    let cityID = weather.id;
    updateCurrentWeather(weather);
    let forecast = await getForecastByCityID(cityID);
    updateForecast(forecast);
};

/**
Event listener that listens for the "keydown" event on the search input element.
When the event is triggered, the function checks if the key code of the pressed key is 13 (Enter).
If the key code is 13, the function will execute the following:
calls the getWeatherByCityName function with the value of the search input as the city name
gets the city ID from the returned weather object
calls the updateCurrentWeather function with the returned weather object
calls the getForecastByCityID function with the city ID and gets the forecast
calls the updateForecast function with the returned forecast
calls the backgroundImage function
*/
searchInp.addEventListener('keydown', async (e) => {
    if(e.keyCode === 13) {
        let weather = await getWeatherByCityName(searchInp.value);
        let cityID = weather.id;
        updateCurrentWeather(weather);
        let forecast = await getForecastByCityID(cityID);
        updateForecast(forecast);
        backgroundImage();
    }
});

/**
Event listener that listens for the "input" event on the search input element.
When the event is triggered, the function checks if the input value length is less than or equal to 2 characters.
If it is, the function will exit and not execute the rest of the code.
If the input value length is more than 2 characters, the function will
construct an API endpoint using the geocodingBaseEndpoint global variable and the input value
fetch the geocoding data from the API using the endpoint
clear the suggestions datalist's innerHTML
create an option element for each city in the result and append to the suggestions datalist
set the value and label of the option element to the city's name, state (if exists), and country
*/
searchInp.addEventListener('input', async () => {
    if(searchInp.value.length <= 2) {
        return;
    }
    let endpoint = geocodingBaseEndpoint + searchInp.value;
    let result = await (await fetch(endpoint)).json();
    datalist.innerHTML = '';
    result.forEach((city) => {
        let option = document.createElement('option');
        option.value = `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`;
        option.label = option.value;
        datalist.appendChild(option);
    });
});

let updateCurrentWeather = (data) => {
    city.textContent = data.name + ', ' + data.sys.country;
    day.textContent = dayOfWeek();
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
    let windDirection;
    let deg = data.wind.deg;
    if(deg > 45 && deg <= 135) {
        windDirection = 'East';
    } else if(deg > 135 && deg <= 225) {
        windDirection = 'South';
    } else if(deg > 225 && deg <= 315) {
        windDirection = 'West';
    } else {
        windDirection = 'North';
    }
    wind.textContent = windDirection + ', ' + data.wind.speed;
    temperature.textContent = data.main.temp > 0 ? 
                                '+' + Math.round(data.main.temp) : 
                                Math.round(data.main.temp);
    let imgID = data.weather[0].id;
    weatherImages.forEach(obj => {
        if(obj.ids.includes(imgID)) {
            image.src = obj.url;
        }
    });
};

/**
Updates the current weather information on the webpage with the data received from the API.
Takes in a data object containing the weather data.
Updates the following elements on the webpage with the corresponding values from the data object:
city name and country code
day of the week
humidity
pressure
wind direction and speed
temperature
weather image based on the weather condition id
*/
let updateForecast = (forecast) => {
    forecastBlock.innerHTML = '';
    forecast.forEach(day => {
        let iconUrl = 'https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png';
        let dayName = dayOfWeek(day.dt * 1000);
        let temperature = day.main.temp > 0 ? 
                    '+' + Math.round(day.main.temp) : 
                    Math.round(day.main.temp);
        let forecatItem = `
            <article class="weather__forecast__item">
                <img src="${iconUrl}" alt="${day.weather[0].description}" class="weather__forecast__icon">
                <h3 class="weather__forecast__day">${dayName}</h3>
                <p class="weather__forecast__temperature"><span class="value">${temperature}</span> &deg;C</p>
            </article>
        `;
        forecastBlock.insertAdjacentHTML('beforeend', forecatItem);
    });
};

/**
Returns the current day of the week or the day of the week for a given date.
Takes an optional parameter dt, which is a timestamp in milliseconds.
If no parameter is passed, the function uses the current date and time.
*/
let dayOfWeek = (dt = new Date().getTime()) => {
    return new Date(dt).toLocaleDateString('en-EN', {'weekday': 'long'});
};

/**
Generates a weather report for a given city.
Takes in a city name as an argument, it calls the getForecastByCityName function to get the forecast for the city.
Creates a report variable and sets it to "Weather Report for {city}:<br><br>"
Loops through the forecast data and for each day, it creates a variable for each of the following:
the day's name
the weather description
the temperature
the humidity
the wind speed
the pressure
the icon image associated with the weather condition
The function then adds the information to the report variable in a formatted string
*/
async function generateWeatherReport(city) {
    let forecast = await getForecastByCityName(city);
    let report = "Weather Report for " + city + ":<br><br>";
    let reportText = "";
    document.querySelector('#report').innerText = reportText;

    forecast.forEach(day => {
        let date = new Date(day.dt_txt.replace(' ', 'T'));
        let dayName = date.toLocaleString('default', {weekday: 'long'});
        let weather = day.weather[0];
        let temp = day.main.temp;
        let humidity = day.main.humidity;
        let wind = day.wind.speed;
        let pressure = day.main.pressure;
        
        report += "On " + dayName + ", the weather will be " + weather.description + " with a high of " + temp + " degrees and a low of " + temp + " &deg;C. The humidity will be around " + humidity + "%, the wind will be blowing at " + wind + "m/s, and the pressure will be around " + pressure + "hPa.<br><br>";

    });
    let reportContainer = document.getElementById("report");
    reportContainer.innerHTML = report;
}

let searchInput = document.querySelector('.weather__search');
searchInput.addEventListener('change', function(){
    let city = searchInput.value;
    generateWeatherReport(city);
});

/**
Initialization function that is called when the webpage loads.
The function calls the weatherForCity function with the argument 'London' which gets the current weather and forecast for London.
*/
let init = async () => {
    await weatherForCity('London');
};

init();
backgroundImage ();
