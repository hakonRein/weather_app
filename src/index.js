import "./style.css";
import weatherAPI from './weatherAPI.js';

const body = document.querySelector('body');
const mainSection = document.getElementById('main');
const searchBtn = document.getElementById('search-btn');
const searchField = document.getElementById('search');
const loadingBox = document.getElementById('loading');

let weatherNextWeek = [];

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    getWeatherData(searchField.value);
    searchField.value = "";
})

async function getWeatherData(location) {
    const url = `${weatherAPI.baseUrl}${location}?key=${weatherAPI.apiKey}&unitGroup=metric&include=days`;
    loadingBox.style.display = "block";
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    loadingBox.style.display = "none";
    parseWeatherData(json);
}

function parseWeatherData(weatherJson) {
    weatherNextWeek = [];
    for (let i = 0; i < 7; i++) {
        weatherNextWeek.push(getWeatherObject(weatherJson.days[i]));
        weatherNextWeek[i].location = weatherJson.address;
    }
    renderWeatherData();
    console.log(weatherNextWeek);
}

function getWeatherObject(weather) {
    return {
        date: weather.datetime,
        temp: weather.temp,
        conditions: weather.conditions,
        icon: weather.icon,
    };
}

async function renderWeatherData() {
    mainSection.innerHTML = "";
    const locationName = document.createElement('h2');
    locationName.textContent = weatherNextWeek[0].location;
    mainSection.appendChild(locationName);
    let totalTemp = 0;
    for (const weather of weatherNextWeek) {
        const weatherDiv = document.createElement('div');
        weatherDiv.classList.add('weather-div');
        
        const dateEl = document.createElement('p');
        dateEl.textContent = (new Date(weather.date)).toDateString();
        const tempEl = document.createElement('p');
        tempEl.classList.add('temperature');
        tempEl.textContent = `${weather.temp}°C`;
        totalTemp += weather.temp;
        const conditionsEl = document.createElement('p');
        conditionsEl.textContent = weather.conditions;
        const iconEl = document.createElement('img');
        iconEl.classList.add('icon');
        const icon = await import(`./images/${weather.icon}.svg`);
        iconEl.src = icon.default;
        weatherDiv.append(dateEl);
        weatherDiv.append(tempEl);
        weatherDiv.append(conditionsEl);
        weatherDiv.append(iconEl);
        mainSection.appendChild(weatherDiv); 
    }
    const weatherColor = getWeatherColor(totalTemp / 7);
    body.style.background = `linear-gradient(180deg, ${weatherColor.bgColor}, white)`;
    body.style.color = weatherColor.color;

}

function getWeatherColor(temp) {
    let bgColor = "";
    let color = "black";
    if (temp < -10) {
        bgColor = "purple";
        color = "white";
    } else if (temp < -5) {
        bgColor = "darkblue";
        color = "white";
    } else if (temp < 0) {
        bgColor = "blue";
        color = "white";
    } else if (temp < 5) {
        bgColor = "lightblue";
    } else if (temp < 10) {
        bgColor = "lightGreen";
    } else if (temp < 15) {
        bgColor = "green";
        color = "white";
    } else if (temp < 20) {
        bgColor = "yellow";
    } else if (temp < 25) {
        bgColor = "orange";
    } else if (temp < 30) {
        bgColor = "red";
        color = "white";
    } else {
        bgColor = "darkred";
        color = "white";
    }
    return { bgColor, color };
}

