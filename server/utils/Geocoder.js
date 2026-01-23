const nodeGeocoder = require('node-geocoder');

const options = {
    provider: 'locationiq', // გამოიყენე ეს სახელი
    apiKey: process.env.GEOCODER_API_KEY, // ეს ისევ დატოვე ცვლადად
    formatter: null
};

const geocoder = nodeGeocoder(options);

module.exports = geocoder;