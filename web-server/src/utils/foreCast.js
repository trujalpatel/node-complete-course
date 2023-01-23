const request = require('postman-request');
const foreCast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=212ec21210f7ff5b1871fce7b84ad964&query='+latitude+','+longitude+'&units=m';

    request({url , json: true}, (error, { body })=> {
        if(error){
            callback('Unable to connect Network', undefined);
        }else if (body.error){
            callback(body.error.info, undefined);
        }else {
            callback(undefined,
                `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`     
            );
        }
    });
}

module.exports = foreCast;