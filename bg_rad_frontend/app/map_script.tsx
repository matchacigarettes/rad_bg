import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useMap } from "react-leaflet";

function CenterMap({pos, scale}:{[key:string]:any}){
    const map = useMap();
    if(map.getSize().x > 1){
        const map = useMap();
        map.setView(pos, scale)
    }
    return<></>
}

export default function leafletMap(params: any){
    const { pos, scale } = params;
    return (
        <MapContainer 
            center={pos}
            zoom={scale}
            scrollWheelZoom={false}
            className="map"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={pos}/>
            <CenterMap pos={pos} scale={scale}/>
        </MapContainer>
    );
}