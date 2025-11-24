// handles logic and database functions based on input provided by controller, sends result to controller
const dbMethods = require("./mainDB.js");
const Location = require("../../tools/location.js")
const ipLocMethods = require('./ipStackRequest');


/**
 * Finds item in DB with id specified
 * @param {string} id id of return item
 * @returns {Object} location object representing item
 */
const getLocationByID = async (id) => {
  return await dbMethods.selectItemById(id).then(result =>{
    
    if(result.length > 0){
      result = result[0];
      
      return new Location(
        result._id.toString(), 
        result.name, 
        result.country, 
        result.subNational,
        result.radFig,
        result.radUnit,
        result.latitude,
        result.longitude
      );
    } else{
      return {error: `No object with id:'${id}' found`};
    }
  }).catch(console.error);
};

/**
 * Finds items in DB containing substring specified, returning a max of 8 items
 * @param {string} subString items returned contain this substring
 * @returns {Array} Array of Location objects
 */
const getLocationsBySubString = async (subString) => {
  subString = subString.toLocaleLowerCase();
  
  return await dbMethods.selectItemsBySubString(subString).then(result => {
    return result.map(item => new Location(
      item._id.toString(),
      item.name,
      item.country,
      item.subNational,
      item.radFig,
      item.radUnit,
      item.latitude,
      item.longitude
    ));
  }).catch(console.error);
}

/**
 * Retrives the closes location to the IP address specified thats in the same country as said IP address
 * @param {string} ip IP address
 * @returns {Object} result object of function
 */
const getLocationByIp = async (ip) => {
  const ipReturn = await ipLocMethods.fetchUserLocation(ip);

  if(ipReturn.length == 3){
    const dbReturn = await dbMethods.selectItemByCountry(ipReturn[2]); 
    
    let minValue = 999999;
    let minObj;

    for(const item of dbReturn){
      let totalDif = ipLocMethods.getTotalCoordDif([ipReturn[0], ipReturn[1]], [item.latitude, item.longitude]);
      if(totalDif < minValue){
        minValue = totalDif;
        minObj = item;
      }
    }

    return new Location(
      minObj._id.toString(),
      minObj.name,
      minObj.country,
      minObj.subNational,
      minObj.radFig,
      minObj.radUnit,
      minObj.latitude,
      minObj.longitude
    );

  } else{
    return {error: "no records in user country."};
  }
}

module.exports = {
  getLocationByID,
  getLocationsBySubString,
  getLocationByIp
};



