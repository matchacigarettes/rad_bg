export class LocationRecord{
  id: string;
  name: string;
  country: string;
  subNational: string;
  bgRad: number;
  radUnit: string;
  latitude: number;
  longitude: number;

  constructor(id:string, name:string, country:string, subNational:string, bgRad:number, radUnit:string, latitude:number, longitude:number){
    this.id = id;
    this.name = name;
    this.country = country;
    this.subNational = subNational;
    this.bgRad = bgRad;
    this.radUnit = radUnit;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}