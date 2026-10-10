import "./style.css";
import weatherAPI from './weatherAPI.js';

const searchBtn = document.getElementById('search-btn');
const searchField = document.getElementById('search');

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    getWeatherData(searchField.value);
    searchField.value = "";
})

async function getWeatherData(location) {
    const url = `${weatherAPI.baseUrl}${location}?key=${weatherAPI.apiKey}&unitGroup=metric&include=days`;
    const response = await fetch(url);
    const json = await response.json();
    parseWeatherData(json);
}

function parseWeatherData(weatherJson) {
    const weatherNextWeek = [];
    for (let i = 0; i < 7; i++) {
        weatherNextWeek.push(getWeatherObject(weatherJson.days[i]));
    }
    console.log(weatherNextWeek);
}

function getWeatherObject(weather) {
    return {
        date: weather.datetime,
        temp: weather.temp,
        conditions: weather.conditions,
    };
}


