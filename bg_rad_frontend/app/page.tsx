"use client";
import { useState } from "react";
 
const placeholderLocation = {
  id: 4, name: "Perth", country: "Australia", subNational: "Wa", bgRad: 13, radUnit: "mSv"
}

const placeholderApiOutput = [
  {id: 1, name: "Brisbane", country: "Australia", subNational: "Qld", bgRad: 2, radUnit: "mSv"},
  {id: 2, name: "Melbourne", country: "Australia", subNational: "Vic", bgRad: 5, radUnit: "mSv"},
  {id: 3, name: "Sydney", country: "Australia", subNational: "Nsw", bgRad: 10, radUnit: "mSv"},
  {id: 4, name: "Perth", country: "Australia", subNational: "Wa", bgRad: 13, radUnit: "mSv"},
];

function MenuBtn({ setFilterShown }:{[key:string]:any}){
  return(
    <div className="navFlx1">
      <button className="menuBtn" onClick={e => setFilterShown(1)}/>
    </div>
  );
}

function SearchBarBtn({ setFilterShown }:{[key:string]:any}){
  return(
    <div className="navFlx2">
      <input type="text" className="searchBarBtn" placeholder="Search" readOnly onClick={e => setFilterShown(1)}/>
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

function NavContainer({ setFilterShown }:{[key:string]:any}){ 
  return(
    <nav className="navContainer">
      <MenuBtn setFilterShown={setFilterShown}/>
      <SearchBarBtn setFilterShown={setFilterShown}/>
      <InfoBtn/>
    </nav>
  );
}

function selectLocationFromId(id:number){
  return (id >= 0)
    ? placeholderApiOutput[placeholderApiOutput.findIndex(item => item.id == id)]
    : placeholderLocation
  ;
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

function SeachResultItem({ itemObj, onItemClick, setFilterShown }:{[key:string]:any} ){
  return(
    <div className="reusltItemCont" onClick={(element) => {onItemClick(itemObj.id); setFilterShown(0)}}>
      <p className="resultName">{itemObj.name}</p>
      <p className="resultLocation">{itemObj.subNational + ", "+ itemObj.country}</p>
    </div>
  );
}

function ResultGrid({ filterText, onItemClick, setFilterShown }:{[key:string]:any}){  
  let searchArr = new Array(0);
  filterText = filterText.trim().toLowerCase();


  if(filterText = ''){
    searchArr = placeholderApiOutput;
  } else {
    searchArr = placeholderApiOutput.filter(item => 
      item.name.toLowerCase().includes(filterText) 
      || item.country.toLowerCase().includes(filterText)
      || item.subNational.toLowerCase().includes(filterText)
    );
  }
  
  return(
    <div className="resultGrid">
      {searchArr.map((item = placeholderLocation) => (
        <SeachResultItem 
          itemObj={item} 
          key={item.id} 
          onItemClick={onItemClick} 
          setFilterShown={setFilterShown}
        />
      ))}
    </div>
  );
}

function FilterLocationBar({ filterText, onTextChange }:{[key:string]:any} ){
  return(
    <div className="filterSearchBarCont">
      <input 
        type="text" 
        className="filterSearchBar" 
        placeholder="Search"
        value={filterText}
        onChange={(element) => onTextChange(element.target.value)}
      />
    </div>
  );
}

function FilterContainer({ onItemClick, filterShown, setFilterShown }:{[key:string]:any}){
  let [ filterText, setFilterText ] = useState('');
  let elementStyle = (filterShown)? {translate: "0px 0px"} : {translate: "-100% 0px"};

  return(
    <div className="filterContainer" style={elementStyle}>
      <FilterLocationBar filterText={filterText} onTextChange={setFilterText} />
      <hr className="divLine"/>
      <ResultGrid filterText={filterText} onItemClick={onItemClick} setFilterShown={setFilterShown}/>
    </div>
  );
}

function BlackOutDiv({ filterShown, setFilterShown}:{[key:string]:any}){  
  let elemenetStyle = (filterShown)? {opacity: "60%", zIndex:"2"} : {opacity: "0%", zIndex:"0"}
  return <div className="blackOutDiv" style={elemenetStyle} onClick={element => setFilterShown(0)}/>
}

function AnimatedGradient(){
  return <div className="animatedGradient"/>
}

export default function MainContainer() {
  let [ selectionId, setSelectionId ] = useState(-1);
  let [ filterShown, setFilterShown ] = useState(1);
  
  let selectedLocation = selectLocationFromId(selectionId);

  return(
    <div className="siteCont">
      <main className="mainContainer">
        <FilterContainer onItemClick={setSelectionId} filterShown={filterShown} setFilterShown={setFilterShown}/>
        <BlackOutDiv filterShown={filterShown} setFilterShown={setFilterShown}/>
        <NavContainer setFilterShown={setFilterShown}/>
        <LocationInfoContainer locationObj={selectedLocation}/>
        <AnimatedGradient/>
        <BgRadContainer locationObj={selectedLocation}/>
      </main>
    </div>
  ); 
}
