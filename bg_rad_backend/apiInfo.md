# API Documentation

#### Synopsis
Used to request/transmit data spcifiying the background radiation of various locations from database
- Records can not be edited, deleted, or added through this api
- Api provides record access only

#### API Endpoins
- _api_url_/radData/get/byID/:id
- _api_url_/radData/get/byFilter/:filter


## _api_url_/radData/get/byFilter/:filter
Used to select multiple records from the database where the filter specified is a sub-string contained in the records `name`, `subNational`, or `country` feild. Retrives a max of **_X_** database items.
- Valid HTTP Commands: **_Get_**

#### :filter
- Filter must be a non-empty string (ie, "item")
- Filter is not case sensitive, all casing will be ignored when returning data base items


#### Endpoint Output 
This endpoint will always return a JSON object as a response, along with the appropriate error code for said response. The content of said JSON depends on whether the call made to the end point was valid or not. <br/>

_Valid Call_ <br/> 
If the call was valid, the JSON response object will contain a property named `selectedLocations` assigned an array containing each matching database record as an object, formatted as follows:
```
{
    "selectedLocations": [
        {
            "id": "691c2f65ab488430c602f5b4",
            "name": "Brisbane",
            "country": "Australia",
            "subNational": "Queensland",
            "bgRad": 2,
            "radUnit": "mSv"
        }
    ]
}
```
If no records in the database have feilds that match the filter specified, the array will be empty (ie, `{"selectedLocations": []}`).<br/>

_Invalid Call / Error_ <br/>
If an invalid call is made or an error is encountered, the JSON response object will contain a property named `error` assigned a string providing more information on why the error occured (ie, `{"error": "filter must contain text characters"}`).

## _api_url_/radData/get/byID/:id
Used to select a single record from the database where said records `_id` feild is same as the `:id` url parameter provided.  

#### :id
- ID provided must be the string representation of the records id
- ID provided must have corresponding record in database


#### Endpoint Output 
This endpoint will always return a JSON object as a response, along with the appropriate error code for said response. The content of said JSON depends on whether the call made to the end point was valid or not. <br/>

_Valid Call_ <br/> 
If a valid call is made to the endpoint, the JSON object will contain all feilds of the record the ID corresponds to, with the keys for each feild being as follows:
```
{
    "id": "691c2f65ab488430c602f5b4",
    "name": "Brisbane",
    "country": "Australia",
    "subNational": "Queensland",
    "bgRad": 2,
    "radUnit": "mSv"
}
```

_Invalid Call / Error_ <br/>
If an invalid call is made or an error is encountered, the JSON response object will contain a property named `error` assigned a string providing more information as to why the error occured (ie, `{"error": "No object with id found"}`).

