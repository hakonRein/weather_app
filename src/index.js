import "./style.css";
import API_KEY from './api_key.js';

const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

async function getWeatherData(location) {
    const url = `${baseURL}${location}?key=${API_KEY}&unitGroup=metric&include=days`;
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

getWeatherData('Oslo');


