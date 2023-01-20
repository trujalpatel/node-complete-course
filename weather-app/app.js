const geoCode = require('./utils/geoCode.js');
const foreCast = require('./utils/foreCast');

const location = process.argv[2];
if(location === undefined){
    return console.log('No location found..!! Please provide proper location!!');
}
geoCode(location, (error, { latitude, longitude, location } = {})  => {
    if(error){
        return console.log(error);
    }
    foreCast(latitude,longitude ,(error, foreCastData) => {
        if(error){
            return console.log(error);
        }
        console.log(location);
        console.log(foreCastData);
    })
})