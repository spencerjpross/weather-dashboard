const APIKey = '8d9373d71de8200217b15165749a980f';
const cityEl = document.getElementById("cityEl");
const fiveDayBox = document.querySelector('.five-day');
const todayBoard = document.querySelector('.today-board');
const allSearches = []

function getData(lat, lon, cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`) 
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            fiveDay(data);
            todayWeather(data, cityName)
        });
}


function getGeo(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`) 
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            getData(data[0].lat, data[0].lon, data[0].name) 
        });
}


cityEl.addEventListener("submit", function(e) {
    e.preventDefault();
    const cityInput = document.getElementById('city-input').value;
    getGeo(cityInput)
})

function todayWeather(data, cityName) {
    let dateEl = document.createElement('h3')
    let tempEl = document.createElement('p');
    let windEl = document.createElement('p');
    let humidityEl = document.createElement('p');
    let uvIndex = document.createElement('p');

    dateEl.textContent = `${cityName} (${dateConverter(data.daily[0].dt)})`;
    tempEl.textContent = `Temp: ${data.daily[0].temp.day} °F`;
    windEl.textContent = `Wind: ${data.daily[0].wind_speed} mph`;
    humidityEl.textContent = `Humidity: ${data.daily[0].humidity} %`;
    uvIndex.textContent = `UV Index: ${data.daily[0].uvi}`
    todayBoard.append(dateEl, tempEl, windEl, humidityEl, uvIndex);
}

function fiveDay(data) {
    console.log(data);

    for (var i = 1; i < 6; i++){
        let dateEl = document.createElement('h5');
        let emoji = document.createElement('img');
        let tempEl = document.createElement('p');
        let windEl = document.createElement('p');
        let humidityEl = document.createElement('p');
        let containerEl = document.createElement('div');
        dateEl.textContent = dateConverter(data.daily[i].dt);
        emoji.setAttribute('src', `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`);
        tempEl.textContent = `Temp: ${data.daily[i].temp.day} °F`;
        windEl.textContent = `Wind: ${data.daily[i].wind_speed} mph`;
        humidityEl.textContent = `Humidity: ${data.daily[i].humidity} %`;
        containerEl.append(dateEl, emoji, tempEl, windEl, humidityEl);
        fiveDayBox.appendChild(containerEl);
    }
}

function dateConverter(time){
    var date = new Date(time * 1000).toLocaleDateString("en-US");
    return date
}

localStorage.setItem('searches', JSON.stringify(allSearches))

document.addEventListener('submit', function(){
    document.getElementById
})