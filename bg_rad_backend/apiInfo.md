# API Documentation

#### Synopsis
Used to request/transmit data spcifiying the background radiation of various locations from database
- Records can not be edited, deleted, or added through this api
- Api provides record access only

#### API Endpoins
- _api_url_/radData/get/byID/:id
- _api_url_/radData/get/byFilter/:filter
- _api_url_/radData/get/byIP/:ip


## _api_url_/radData/get/byFilter/:filter
Used to select multiple records from the database where the filter specified is a sub-string contained in the records `name`, `subNational`, or `country` feild. Retrives a max of **_10_** database items.
- Valid HTTP Commands: **_Get_**

#### :filter
- Filter must be a non-empty string (ie, "item")
- Filter is not case sensitive, all casing will be ignored when returning data base items


#### Endpoint Output 
This endpoint will always return a JSON object as a response, along with the appropriate http code for said response. The content of the JSON will always contain the selectedLocations attribute, and all records within will always be formated as shown below. Unless there is some unhandled internal server error.<br/>

_Valid Call_ <br/> 
If the call was valid, the JSON response object will contain a property named `selectedLocations` assigned an array containing each matching database record as an object, formatted as follows:
```
{
  "selectedLocations": [
    {   
      "id": "692108cc3ddc29e8f6004b53",
      "name": "Sydney",
      "country": "Australia",
      "subNational": "New South Wales",
      "bgRad": 300,
      "radUnit": "uSv",
      "latitude": -33.8687530844104,
      "longitude": 151.196779661934
    }, ....
  ]
}
```
If no records in the database have feilds that match the filter specified, the array will be empty (ie, `{"selectedLocations": []}`).<br/>

_Invalid Call / Error_ <br/>
If an invalid call is made or an error is encountered, the `selectedLocations` property in the JSON response object will contain a single error reccord, formated as if it were a normal record, but with a record ID of 0, see the example below for more details.
```
{
  "selectedLocations": [
    {
      "id": "000000000000000000000000",
      "name": "Error",
      "country": "records found",
      "subNational": "no",
      "bgRad": 0,
      "radUnit": "",
      "latitude": -25.0349129261023,
      "longitude": 134.277911784477
    }
  ]
}
```

## _api_url_/radData/get/byID/:id
Used to select a single record from the database where said records `_id` feild is same as the `:id` url parameter provided.  

#### :id
- ID provided must be the string representation of the records id
- ID provided must have corresponding record in database


#### Endpoint Output 
This endpoint will always return a JSON object as a response, along with the appropriate http code for said response. The content of the JSON will always be formated as shown below. Unless there is some unhandled internal server error.<br/>

_Valid Call_ <br/> 
If a valid call is made to the endpoint, the JSON object will contain all feilds of the record the ID corresponds to, with the keys for each feild being as follows:
```
{
  "id": "692108cc3ddc29e8f6004b53",
  "name": "Sydney",
  "country": "Australia",
  "subNational": "New South Wales",
  "bgRad": 300,
  "radUnit": "uSv",
  "latitude": -33.8687530844104,
  "longitude": 151.196779661934
}
```

_Invalid Call / Error_ <br/>
If an invalid call is made or an error is encountered, the JSON response object will contain an error reccord, formated as if it were a normal record, but with a record ID of 0, see the example below for more details.

```
{
  "id": "000000000000000000000000",
  "name": "Error",
  "country": "records found",
  "subNational": "no",
  "bgRad": 0,
  "radUnit": "",
  "latitude": -25.0349129261023,
  "longitude": 134.277911784477
}
```

## _api_url_/radData/get/byIP/:ip
Used to select the record in the database with the closest latitude and longitude to that of the IP address provided, only records with the same country name as that of the IP address will be returned

#### :ip
- IP provided must be a valid IP address
- IP provided must have a record in the same country as the IP address 


#### Endpoint Output 
This endpoint will always return a JSON object as a response, along with the appropriate http code for said response. The content of the JSON will always be formated as shown below. Unless there is some unhandled internal server error.<br/>

_Valid Call_ <br/> 
If a valid call is made to the endpoint, the JSON object will contain all feilds of the record with the closest latitude & longitude to that of the IP address provided, with the keys for each feild being as follows:
```
{
  "id": "692108cc3ddc29e8f6004b53",
  "name": "Sydney",
  "country": "Australia",
  "subNational": "New South Wales",
  "bgRad": 300,
  "radUnit": "uSv",
  "latitude": -33.8687530844104,
  "longitude": 151.196779661934
}
```

_Invalid Call / Error_ <br/>
If no record exists with in the same country as the IP provided, an invalid call is made, or an error is encountered, the JSON response object will contain an error reccord, formated as if it were a normal record, but with a record ID of 0, see the example below for more details.

```
{
  "id": "000000000000000000000000",
  "name": "Error",
  "country": "records found",
  "subNational": "no",
  "bgRad": 0,
  "radUnit": "",
  "latitude": -25.0349129261023,
  "longitude": 134.277911784477
}
```

