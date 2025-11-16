import { Amarante } from "next/font/google";
import Image from "next/image";

const placeholderLocation = {
  id: 4, name: "Perth", country: "Australia", subNational: "Wa", bgRad: 13, radUnit: "mSv"
}

const placeholderApiOutput = [
  {id: 1, name: "Brisbane", country: "Australia", subNational: "Qld", bgRad: 2, radUnit: "mSv"},
  {id: 2, name: "Melbourne", country: "Australia", subNational: "Vic", bgRad: 5, radUnit: "mSv"},
  {id: 3, name: "Sydney", country: "Australia", subNational: "Nsw", bgRad: 10, radUnit: "mSv"},
  {id: 4, name: "Perth", country: "Australia", subNational: "Wa", bgRad: 13, radUnit: "mSv"},
];

let selectedLocation = placeholderApiOutput[0]; 

function MenuBtn(){
  return(
    <div className="navFlx1">
      <button className="menuBtn"/>
    </div>
  );
}

function SearchBarBtn(){
  return(
    <div className="navFlx2">
      <input type="text" name="searchBtn" className="searchBarBtn" placeholder="Search" disabled/>
    </div>
  );
}

function InfoBtn(){
  return(
    <div className="navFlx3">
      <button className="infoBtn"/> 
    </div>
  );
}

function NavContainer(){ 
  return(
    <nav className="navContainer">
      <MenuBtn/>
      <SearchBarBtn/>
      <InfoBtn/>
    </nav>
  );
}

function BgRadContainer({ locationObj }:{[key:string]:any} ){
  return (
    <div className="bgRadContainer">
      <div className="bgRadSubContainer">
        <p className="radContTitle">Background radiation (avg):</p>
        <div className="radFigCont">
          <p className="radFig">{locationObj.bgRad}</p>
          <p className="radUnit">{locationObj.radUnit}</p>
        </div>
      </div>
    </div>
  );
}

function LocationInfoContainer({ locationObj }:{[key:string]:any} ){
  return(
    <div className="locationInfoContainer">
      <div className="locationInfoSubContainer">
        <p className="locationName">{locationObj.name}</p>
        <p className="locationSubNat">{locationObj.subNational + ", " + locationObj.country}</p>
      </div>
    </div>
  );
}

function AnimatedBg(){
  return(
    <div className="animatedBg">
      <div className="animatedCont"/>
    </div>
  ); 
}

function SeachResultItem({ itemObj }:{[key:string]:any} ){
  return(
    <div className="reusltItemCont">
      <p className="resultName">{itemObj.name}</p>
      <p className="resultLocation">{itemObj.subNational + ", "+ itemObj.country}</p>
    </div>
  );
}

function ResultGrid({ searchResultArr }:{[key:string]:any} ){  
  return(
    <div className="resultGrid">
      {searchResultArr.map((item = placeholderLocation) => <SeachResultItem itemObj={item} key={item.id}/>)}
    </div>
  );
}

function FilterLocationBar(){
  return(
    <div className="filterSearchBarCont">
      <input type="text" name="searchBtn" className="filterSearchBar" placeholder="Search"/>
    </div>
  );
}

// function FilterReturnBtn(){
//   return(
//     <div className="filterReturnBtnCont">
//       <button className="filterReturnBtn">&lt;</button>
//     </div>
//   );
// }

function FilterContainer(){
  return(
    <div className="filterContainer">
      <FilterLocationBar/>
      <hr className="divLine"/>
      <ResultGrid searchResultArr={placeholderApiOutput}/>
    </div>
  );
}

function BlackOutDiv(){
  return <div className="blackOutDiv"/>
}

export default function MainContainer() {
  return(
    <div className="siteCont">
      <FilterContainer/>
      <BlackOutDiv/>
      <main className="mainContainer">
        <NavContainer/>
        <LocationInfoContainer locationObj={selectedLocation}/>
        <BgRadContainer locationObj={selectedLocation}/>
      </main>
      <AnimatedBg/>
    </div>
  ); 
}
