export class LocationRecord{
  id: string;
  name: string;
  country: string;
  subNational: string;
  bgRad: number;
  radUnit: string;

  constructor(id:string, name:string, country:string, subNational:string, bgRad:number, radUnit:string){
    this.id = id;
    this.name = name;
    this.country = country;
    this.subNational = subNational;
    this.bgRad = bgRad;
    this.radUnit = radUnit;
  }
}