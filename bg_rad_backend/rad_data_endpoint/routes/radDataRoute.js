// handles routing & http requests, send data to be used in json to view, performs relevant model functions
const dbFunctions = require("../database/model.js");

const express = require("express");
const router = express.Router();

router.get("/get/byID/:id", async (req, res) => {
    const locationId = req.params.id;
    res.set('Content-Type', 'application/json');
    res.set('Cache-Control', 'no-cache')
    
    try{
        const result = await dbFunctions.getLocationByID(locationId) ?? dbFunctions.errorLocationObj; 
        if(!result){
            res.json(dbFunctions.errorLocationObj);
            return;
        } else{
            res.json(result);
            return;
        }

    } catch(error){
        res.json(dbFunctions.errorLocationObj);
    }
});

router.get("/get/byFilter/:filter", async (req, res) => { 
    const filter = req.params.filter;
    res.set('Content-Type', 'application/json');
    
    if(filter.trim() == 0){
        res.json(dbFunctions.errorLocationObj);
        return;
    } 

    try{
        const result = await dbFunctions.getLocationsBySubString(filter) ?? [dbFunctions.errorLocationObj];

        if(!result){
            res.json({selectedLocations: [dbFunctions.errorLocationObj]});
            return;
        } else{
            res.json({selectedLocations: result});
            return;
        }

    } catch(error){
        res.json({selectedLocations: [dbFunctions.errorLocationObj]});
    }
});


router.get("/get/byIP/:ip", async (req, res) => {
    const ip = req.params.ip;
    const ip_regex_ptn = /^\d{1,3}(\.\d{1,3}){3}$/;
    res.set('Content-Type', 'application/json');

    if(!(ip_regex_ptn.test(ip))){
        res.json(dbFunctions.errorLocationObj);
        return;
    }

    try{
        const result = await dbFunctions.getLocationByIp(ip) ?? dbFunctions.errorLocationObj; 
        if(!result){
            res.json(dbFunctions.errorLocationObj);
            return;
        } else{
            res.json(result);
            return;
        }
    } catch(error){
        res.json(dbFunctions.errorLocationObj);
        return;
    }
    
    
})

module.exports = router;