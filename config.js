require('dotenv').config();

const config = {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY || 'bffb103e64848228560170138ecb8512',
    WEATHER_API_URL: 'http://api.weatherstack.com/current',
};

module.exports = config;