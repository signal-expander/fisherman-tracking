import React, { createRef, Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import leafRed from './icons/leaf-red.png';
import leafShadow from './icons/leaf-shadow.png';
import openSocket from 'socket.io-client';
import LeafletReactTrackPlayer from "leaflet-react-track-player";
import demo from './demo';

const redIcon = L.icon({
    iconUrl: leafRed,
    shadowUrl: leafShadow,
    iconSize:     [38, 95], 
    shadowSize:   [50, 64], 
    iconAnchor:   [22, 94], 
    shadowAnchor: [4, 62],  
    popupAnchor:  [-3, -76] 
})

class MapPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redIcon: {
                lat: 8.5352,
                lng: 124.5653,
            },
            zoom: 13,

            lat: 47.445745,
            lng: 40.272891666666666,
            //zoom: 15,
            type: "distance",
            demo: [demo[0]],
            icon: "/img/mech.svg",

            numInc: 0,
        }

        const host = window.location.host
        this.socket = openSocket(host);
        this.sendHandler = this.sendHandler.bind(this);
        this.mapRef = createRef();
    }

    componentDidMount() {
        this.receivedSocketIO();
        console.log("socket ->", this.socket);
    }

    componentWillUnmount = () => {
        this.disconnectSockerIO();
    }

    receivedSocketIO = () => {
        this.socket.on(`msg_recv`, (msg) => {
            console.log("msg -> ", msg);
        });
    }

    sendSocket = () => {
        console.log("-- emit socket --");
        this.socket.emit(`msg_send`, {
            data: "hello world"
        });
    }

    sendHandler() {
        console.log("-- send scoket --");
        this.sendSocket();
    }

    testMove = () => {
        this.setState({ numInc: this.state.numInc + 1 }, () => {

            this.setState({ demo: [ demo[this.state.numInc]] })

            console.log('num inc ->', this.state.demo);

        });

        
    }

    render() {
        // const position = [this.state.redIcon.lat, this.state.redIcon.lng];
        const position = [this.state.demo[0].lat, this.state.demo[0].lng];
        return (
            <div className="container-fluid">
                <button type="button" className="btn btn-sm btn-primary" onClick={this.sendHandler}>socket-test</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.testMove}>move-test</button>
                <Map 
                    style={{height: "580px" , width: "880px"}} 
                    center={position} zoom={this.state.zoom}
                >
                    <LeafletReactTrackPlayer
                        track={this.state.demo}
                        optionMultyIdxFn={function (p) {
                            return p.status;
                        }}
                        optionsMulty={[
                            { color: "#b1b1b1" },
                            { color: "#06a9f5" },
                            { color: "#202020" },
                            { color: "#D10B41" },
                            { color: "#78c800" }
                        ]}
                        progressFormat={this.state.type}
                        customMarker={true}
                        changeCourseCustomMarker={true}
                        iconCustomMarker={this.state.icon}
                    />
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={position} icon={redIcon}>
                        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>



                    {/* <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={position} icon={redIcon}>
                        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>
                    <Marker position={[8.529235, 124.573205]} icon={redIcon}>
                        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker> */}
                </Map>
            </div>
        )
    }
}

export default MapPage

