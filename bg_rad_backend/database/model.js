// handles logic and database functions based on input provided by controller, sends result to controller
const dbMethods = require("./mainDB.js");
const Location = require("../tools/location.js")


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
        result.radUnit
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
      item.radUnit
    ));
  }).catch(console.error);
}

module.exports = {
  getLocationByID,
  getLocationsBySubString
};

