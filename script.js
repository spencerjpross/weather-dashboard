const APIKey = '8d9373d71de8200217b15165749a980f'
const cityEl = document.getElementById("cityEl")

function getData(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`) 
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        });
}


function getGeo(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`) 
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            getData(data[0].lat, data[0].lon) 
        });
}


cityEl.addEventListener("submit", function(e) {
    e.preventDefault()
    const cityInput = document.getElementById('city-input').value
    getGeo(cityInput)
})

