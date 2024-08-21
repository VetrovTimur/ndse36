const http = require('http');
const url = require('url');
const config = require('./config');

const getWeather = (city) => {
    return new Promise((resolve, reject) => {
        const apiUrl = `${config.WEATHER_API_URL}?access_key=${config.WEATHER_API_KEY}&query=${encodeURIComponent(city)}`;

        http.get(apiUrl, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const weatherData = JSON.parse(data);
                if (weatherData.error) {
                    reject(weatherData.error.info);
                } else {
                    resolve(weatherData);
                }
            });
        }).on('error', (err) => {
            reject(err.message);
        });
    });
};

const city = process.argv[2];

if (!city) {
    console.error('Пожалуйста, укажите название города.');
    process.exit(1);
}

getWeather(city)
    .then((weather) => {
        console.log(`Погода в городе ${weather.location.name}, ${weather.location.country}:`);
        console.log(`Температура: ${weather.current.temperature}°C`);
        console.log(`Состояние: ${weather.current.weather_descriptions[0]}`);
        console.log(`Ветер: ${weather.current.wind_speed} км/ч`);
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    });