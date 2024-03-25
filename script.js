
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '{api-key}',
        'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
};

async function getWeather(city) {
    try {
        const url = 'https://yahoo-weather5.p.rapidapi.com/weather?format=json&u=f&location=';
        const response = await fetch(url + city, options);
        if (response.status == 500) {
            document.querySelector('.Start-Search').style.display='none'
            document.querySelector('.error').style.display='block'
            document.querySelector('.container').style.display='none'
        } else {
            const result = await response.json();

            CityName.innerHTML = result.location.city
            Country.innerHTML = result.location.country
            cond.innerHTML = result.current_observation.condition.text
            temp.innerHTML = result.current_observation.condition.temperature + '°C'
            hum.innerHTML = result.current_observation.atmosphere.humidity + '%'
            wind_speed.innerHTML = result.current_observation.wind.speed + 'km/h'
            sunrise.innerHTML = result.current_observation.astronomy.sunrise
            sunset.innerHTML = result.current_observation.astronomy.sunset

            if (result.current_observation.condition.text == 'Mostly Cloudy' || result.current_observation.condition.text == 'Cloudy') {
                weather_icon.src = 'images/clouds.png'
            } else if (result.current_observation.condition.text == 'Fair') {
                weather_icon.src = 'images/clear.png'
            } else if (result.current_observation.condition.text == 'Partly Cloudy') {
                weather_icon.src = 'images/mist.png'
            } else if (result.current_observation.condition.text == 'Showers' || result.current_observation.condition.text == 'Scattered Showers') {
                weather_icon.src = 'images/rain.png'
            } else if (result.current_observation.condition.text == 'Thunderstorms') {
                weather_icon.srcL = 'images/snow.png'
            }
            document.querySelector('.Start-Search').style.display='none'
            document.querySelector('.error').style.display='none'
            document.querySelector('.container').style.display='block'
            console.log(result);
        }

    } catch (error) {
        console.error(error);
    }
}

submit.addEventListener('click', (e) => {
    e.preventDefault()
    getWeather(SearchMe.value)
})

// getWeather('Delhi')
