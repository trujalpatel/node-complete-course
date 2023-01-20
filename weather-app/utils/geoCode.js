const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidHJ1amFscGF0ZWwiLCJhIjoiY2xkMzF0cmxhMGU5czNubDBvbncxZTE4OSJ9.BL6xApx2Y7nXxUAZF5hwuA&limit=1';
    
    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect Network', undefined);
        }else if (body.features.length === 0 ){
            callback('Unable to find location search term.', undefined);
        } else {
            callback(undefined,{
            longitude: body.features[0].center[0],
            latitude: body.features[0].center[1],
            location: body.features[0].place_name
            });
    }
});
}

module.exports = geoCode