let day = document.querySelector('.weather__day');
let city = document.querySelector('.weather__city');
let image = document.querySelector('.weather__image');
let humidity = document.querySelector('.weather__indicator--humidity>.value');
let wind = document.querySelector('.weather__indicator--wind>.value');
let pressure = document.querySelector('.weather__indicator--pressure>.value');
let temperature = document.querySelector('.weather__temperature>.value');
let weatherAPIKey = 'eeb6b90e8ef375f3964761f6c685dbf4';
let weatherBaseEndpoint = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + weatherAPIKey;

let getWeatherByCityName = async (city) => {
    let endpoint = weatherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    let weather = await response.json();
    return weather;
  }