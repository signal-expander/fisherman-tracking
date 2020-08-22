import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import leafRed from './icons/leaf-red.png';
import leafShadow from './icons/leaf-shadow.png';

class MapPage extends Component {

    state = {
        redIcon: {
            lat: 8.5352,
            lng: 124.5653,
        },
        zoom: 13,
    }

    redIcon = L.icon({
        iconUrl: leafRed,
        shadowUrl: leafShadow,
        iconSize:     [38, 95], 
        shadowSize:   [50, 64], 
        iconAnchor:   [22, 94], 
        shadowAnchor: [4, 62],  
        popupAnchor:  [-3, -76] 
        

    })

    render() {
        const position = [this.state.redIcon.lat, this.state.redIcon.lng];
        return (
            <div className="container-fluid">

                <Map style={{height: "580px" , width: "880px"}} center={position} zoom={this.state.zoom}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={position} icon={this.redIcon}>
                        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>
                </Map>



            </div>
        )
    }
}

export default MapPage

