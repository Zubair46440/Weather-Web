
const apiKey = 'ca695dcbc66c5fa3d0cb955033fd918f';

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const errorBox = document.getElementById('errorBox');
    const weatherContainer = document.getElementById('weatherContainer');

    if (!city) {
        errorBox.textContent = "Please enter a city name.";
        errorBox.style.display = "block";
        weatherContainer.style.display = "none";
        return;
    }

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await res.json();

        if (data.cod !== 200) throw new Error(data.message);

        const weather = data.weather[0].main.toLowerCase();
        setBackground(weather);

        document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('temp').textContent = `${data.main.temp}°C`;
        document.getElementById('feels').textContent = `${data.main.feels_like}°C`;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('wind').textContent = `${data.wind.speed} km/h`;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        errorBox.style.display = "none";
        weatherContainer.style.display = "block";

    } catch (err) {
        weatherContainer.style.display = "none";
        errorBox.textContent = `Error: ${err.message}`;
        errorBox.style.display = "block";
    }
}

function setBackground(weather) {
    let bg;
    switch (weather) {
        case 'clear':
            bg = 'url(images/clear.jpg)';
            break;
        case 'clouds':
            bg = 'url(images/cloudy.jpg)';
            break;
        case 'rain':
            bg = 'url(images/rainy.jpg)';
            break;
        case 'drizzle':
            bg = 'url(images/dezzle.jpg)';
            break;
        case 'snow':
            bg = 'url(images/show.jpg)';
            break;
        case 'thunderstorm':
            bg = 'url(images/thunderstrom.jpg)';
            break;
        default:
            bg = 'url(images/all.jpg)';
    }
    document.body.style.background = `${bg} no-repeat center center / cover`;
}
