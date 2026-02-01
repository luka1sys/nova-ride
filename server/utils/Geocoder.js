const nodeGeocoder = require('node-geocoder');

const options = {
    provider: 'locationiq', 
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

const geocoder = nodeGeocoder(options);

module.exports = geocoder;