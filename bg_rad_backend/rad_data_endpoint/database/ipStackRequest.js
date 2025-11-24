// loads environment variables from spcified location
const { loadEnvFile } = require('node:process');
loadEnvFile('./bg_rad_backend/keys.env');

const ipStackApiUrl = `http://api.ipstack.com/`;
const apiKey = `?access_key=${process.env.IPSTACK_APIKEY}`;

/**
 * Sends fetch request to IpStack API, retrives city latitude, longitude, and city name of user based on ip address 
 * @param {string} ip ip address of user
 * @returns {[latitude:number, longitude:number, city_name:string]} array containing details listed above, in above order
 */
async function fetchUserLocation(ip){
    try{
        const resp = await fetch(`${ipStackApiUrl}${ip}${apiKey}`);
        
        if(!resp.ok){
            throw new Error(`Response status: ${resp.status}`)
        }

        const data = await resp.json();
        return [data.latitude, data.longitude, data.country_name];

    } catch(error){
        console.log("API Fetch error has occured.");
    }
}

/**
 * Calculates difference between two coordinates provided
 * @param {[latitude:number, longitude:number]} latlng1 first set of coordinates  
 * @param {[latitude:number, longitude:number]} latlng2 second set of coordinates
 * @returns {number} total difference between coordinate pairs provided
 */
function getTotalCoordDif(latlng1, latlng2){
    latDif = Math.abs((Math.abs(latlng1[0]) - Math.abs(latlng2[0])));
    lngDif = Math.abs((Math.abs(latlng1[1]) - Math.abs(latlng2[1])));
    return latDif + lngDif;
}

module.exports = {
    getTotalCoordDif,
    fetchUserLocation
}