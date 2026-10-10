import "./style.css";
import API_KEY from './api_key.js';

const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

async function getWeatherData(location) {
    const url = `${baseURL}${location}?key=${API_KEY}`;
    console.log(url);
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
}


getWeatherData('Oslo');
