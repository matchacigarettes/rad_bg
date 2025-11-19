export class DataApi{
  private constructor(){
    console.log('This class is non-instantiable.')
  }

  private static url = "http://localhost:8000/radData/";
  private static defaultID = '691c307cab488430c602f5b7';
  
  private static byIdEndpoint = "get/byID/";
  private static byFilterEndpoint = "get/byFilter/";

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
    return await this.apiFetch(this.url, this.byIdEndpoint, id);
  }

  static requestDefaultRecord = async () => {
    return await this.requestRecordById(this.defaultID);
  }

  static requestRecordsByFilter = async (filter:string) => {
    return await this.apiFetch(this.url, this.byFilterEndpoint, filter);
  }
}