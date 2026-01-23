const nodeGeocoder = require('node-geocoder');

const options = {
    provider: 'positionstack',
    httpAdapter: 'http', // უფასო ტარიფისთვის მნიშვნელოვანია
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

const geocoder = nodeGeocoder(options);

module.exports = geocoder;