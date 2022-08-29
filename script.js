const APIKey = '8d9373d71de8200217b15165749a980f';
const cityEl = document.getElementById("cityEl");
const fiveDayBox = document.querySelector('.five-day');
const todayBoard = document.querySelector('.today-board');
const searchBox = document.getElementById('search-history');
const containerEl = document.querySelector('.grid-container');
let allSearches = [];




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
            getData(data[0].lat, data[0].lon, data[0].name);
            cityList(data[0].name)
        });
}

function cityList(city){
    console.log(city);
    allSearches.push(city);
    localStorage.setItem('searches', JSON.stringify(allSearches));
    pastSearch()
};

function pastSearch(){
    //this clears the html container we're appending to so there's no duplicates
    searchBox.innerHTML ="";
    fiveDayBox.innerHTML = "";
    todayBoard.innerHTML = "";
    allSearches = [...new Set(allSearches)]
    for (var i = 0; i < allSearches.length; i++){
        let buttonEl = document.createElement('button');
        buttonEl.textContent = allSearches[i];
        buttonEl.setAttribute('data-city', allSearches[i]);

        searchBox.appendChild(buttonEl);
    }
}

function getCityList(){
    let getSearches = localStorage.getItem('searches');
    console.log(getSearches)
        if (getSearches){
            allSearches = JSON.parse(getSearches);
            console.log(allSearches);
        }
    pastSearch()
};

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

getCityList();

cityEl.addEventListener("submit", function(e) {
    e.preventDefault();
    const cityInput = document.getElementById('city-input').value;
    getGeo(cityInput)
});

searchBox.addEventListener('click', function(e) {
    const dataCity = e.target.getAttribute('data-city');
    getGeo(dataCity);
})


// buttonEl.addEventListener('click', () => {
//     console.log('btn clicked')
//     getGeo(city);
//     getData(lat, lon, cityName)
// });