const nodeGeocoder = require('node-geocoder');

const options = {
    provider: 'openstreetmap' 
};

const geocoder = nodeGeocoder(options);

module.exports = geocoder;