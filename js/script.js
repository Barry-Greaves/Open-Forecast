let searchInp = document.querySelector('.weather__search');
let city = document.querySelector('.weather__city');
let day = document.querySelector('.weather__day');
let humidity = document.querySelector('.weather__indicator--humidity>.value');
let wind = document.querySelector('.weather__indicator--wind>.value');
let pressure = document.querySelector('.weather__indicator--pressure>.value');
let image = document.querySelector('.weather__image');
let temperature = document.querySelector('.weather__temperature>.value');
let forecastBlock = document.querySelector('.weather__forecast');
let weatherAPIKey = 'eeb6b90e8ef375f3964761f6c685dbf4';
let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + weatherAPIKey;
let forecastBaseEndpoint = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + weatherAPIKey;
let geocodingBaseEndpoint = 'https://api.openweathermap.org/geo/1.0/direct?&limit=5&appid='+weatherAPIKey+'&q=';
let datalist = document.getElementById('suggestions');


function backgroundImage () {
document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/Tokyo')"
var bg = document.getElementById("citybg").value;
document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + bg + "')"
}


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


let getWeatherByCityName = async (city) => {
    let endpoint = weatherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    if(!response.ok) {
        return {cod: '404'};
    }
    let weather = await response.json();
    return weather;
}


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
}

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
    })
    return daily;
    
}

let weatherForCity = async (city) => {
    let endpoint = geocodingBaseEndpoint + city;
    let response = await fetch(endpoint);
    let data = await response.json();
    if(data.cod === '404' || data.count === 0) {
        alert("Sorry, the city name you entered is invalid or not found. Please try again.");
        return;
    }
    let weather = await getWeatherByCityName(city);
    if(weather.cod === '404') {
        alert("Sorry, the city name you entered is invalid or not found. Please try again.");
        return;
    }
    let cityID = weather.id;
    updateCurrentWeather(weather);
    let forecast = await getForecastByCityID(cityID);
    updateForecast(forecast);
}



searchInp.addEventListener('keydown', async (e) => {
    if(e.keyCode === 13) {
        let weather = await getWeatherByCityName(searchInp.value);
        let cityID = weather.id;
        updateCurrentWeather(weather);
        let forecast = await getForecastByCityID(cityID);
        updateForecast(forecast);
        backgroundImage()
    }
});




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
    })
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
    })
}

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
    })
}

let dayOfWeek = (dt = new Date().getTime()) => {
    return new Date(dt).toLocaleDateString('en-EN', {'weekday': 'long'});
}

async function generateWeatherReport(city) {
    let forecast = await getForecastByCityName(city);
    let report = "Weather Report for " + city + ":\n\n";
    forecastBlock.innerHTML = "";

    forecast.forEach(day => {
        let date = new Date(day.dt_txt.replace(' ', 'T'));
        let dayName = date.toLocaleString('default', {weekday: 'long'});
        let weather = day.weather[0];
        let temp = day.main.temp;
        let humidity = day.main.humidity;
        let wind = day.wind.speed;
        let pressure = day.main.pressure;
        let icon = weatherImages.find(function (val) { return val.ids.indexOf(weather.id) != -1 });
        report += "On " + dayName + ", the weather will be " + weather.description + " with a high of " + temp + " degrees and a low of " + temp + " degrees. The humidity will be around " + humidity + "%, the wind will be blowing at " + wind + "m/s, and the pressure will be around " + pressure + "hPa.\n\n"

        // Update the forecast section
        let forecastItem = document.createElement('article');
        forecastItem.classList.add('weather__forecast__item');
        forecastItem.innerHTML = `
            <img src="${icon.url}" alt="${weather.description}" class="weather__forecast__icon">
            <h3 class="weather__forecast__day">${dayName}</h3>
            <p class="weather__forecast__temperature"><span class="value">${temp}</span> &deg;C</p>
            <p class="weather__forecast__humidity">Humidity: ${humidity}%</p>
            <p class="weather__forecast__wind">Wind: ${wind}m/s</p>
            <p class="weather__forecast__pressure">Pressure: ${pressure} hPa</p>
        `;
        forecastBlock.appendChild(forecastItem);
    });
    let reportContainer = document.getElementById("report");
    reportContainer.innerHTML = report;
}

let searchInput = document.querySelector('.weather__search');
searchInput.addEventListener('change', function(){
    let city = searchInput.value;
    generateWeatherReport(city);
});


let init = async () => {
    await weatherForCity('Tokyo');
    document.body.style.filter = 'blur(0)';
}

init();
backgroundImage ();

