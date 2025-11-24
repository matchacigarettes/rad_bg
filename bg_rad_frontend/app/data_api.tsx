import { LocationRecord } from "./locationRecord";
import { UserLocation } from "./user_location";

export class DataApi{
  private constructor(){
    console.log('This class is non-instantiable.')
  }

  static apiRequestResult = new Array();

  private static defLat = -25.034912926102326;
  private static deflong = 134.27791178447652;

  private static url = "http://192.168.1.109:8000/radData/";
  private static defaultID = '692108cc3ddc29e8f6004b54';
  
  private static byIdEndpoint = "get/byID/";
  private static byFilterEndpoint = "get/byFilter/";
  private static byIpEndpoint = "get/byIP/";

  static loadingLocationObj = new LocationRecord("-1", "Loading", "unknown", "unknown", 0, "", this.defLat, this.deflong);
  private static errorLocationObj = new LocationRecord("-1", "Error", "not found", "record", 0, "", this.defLat, this.deflong);

  /**
   * Performs fetch request for resource specified
   * @param url 
   * @param endpoint 
   * @param parameter
   * @returns json response as object
   */
  private static apiFetch = async (url:string, endpoint:string, parameters:string) => {
    try{
      const resp = await fetch(`${url}${endpoint}${parameters}`);
      
      if(!resp.ok){
        throw new Error(`Response status: ${resp.status}`)
      }

      return resp.json();

    } catch(error){
      console.log("API Fetch error has occured.");
    }
  }

  static requestRecordById = async (id:string) => {
    const result = await this.apiFetch(this.url, this.byIdEndpoint, id);
    
    if(result === undefined){
      this.apiRequestResult = [this.errorLocationObj];
    } else{
      this.apiRequestResult = (result.hasOwnProperty("id")) 
        ? [result] 
        : [this.errorLocationObj]
      ;
    }
  }

  static requestRecordByIp = async () => {
    const ip = await UserLocation.fetchUserIp();
    const result = await this.apiFetch(this.url, this.byIpEndpoint, ip);

    if(result === undefined){
      await this.requestRecordById(this.defaultID);
    } else{
      if(result.hasOwnProperty("id")){
        this.apiRequestResult = [result];
      } else{
        await this.requestRecordById(this.defaultID);
      }
    }
  }

  static requestDefaultRecord = async () => {
    await this.requestRecordById(this.defaultID);
  }

  static requestRecordsByFilter = async (filter:string) => {
    const result = await this.apiFetch(this.url, this.byFilterEndpoint, filter);
    
    if(result === undefined){
      this.apiRequestResult = new Array();
    } else {
      this.apiRequestResult = (result.hasOwnProperty("selectedLocations")) 
        ? result.selectedLocations 
        : new Array()
      ;
    }
  }
}