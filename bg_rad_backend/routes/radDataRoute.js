// handles routing & http requests, send data to be used in json to view, performs relevant model functions
const dbFunctions = require("../database/model.js");

const express = require("express");
const router = express.Router();

router.get("/get/byID/:id", async (req, res) => {
    const locationId = req.params.id;
    res.set('Content-Type', 'application/json');
    res.set('Cache-Control', 'no-cache')
    
    await dbFunctions.getLocationByID(locationId)
        .then(result => {
            if(result.hasOwnProperty("error")){
                res.status(404).json(result);
            }else{
                res.status(200).json(result);
            }
        })
        .catch(err => {
            res.status(404).json({error:'an error occured'});
        });
});

router.get("/get/byFilter/:filter", async (req, res) => { 
    const filter = req.params.filter;
    
    if(filter.trim() == 0){
        res.status(404).json({error: `/get/byFilter/:'${filter}' must contain text characters`});
    } else{
        res.set('Content-Type', 'application/json');
        await dbFunctions.getLocationsBySubString(filter)
            .then(result => {
                res.json({selectedLocations: result});
            })
            .catch(err => {
                res.status(404).json({error:'an error occured'});
            })
    }
});

module.exports = router;