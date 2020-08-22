import React, { createRef, Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import leafRed from './icons/leaf-red.png';
import leafShadow from './icons/leaf-shadow.png';
import openSocket from 'socket.io-client';
import LeafletReactTrackPlayer from "leaflet-react-track-player";
import demo from './demo';
// import LeafletPolyline from 'react-leaflet-polyline'

const redIcon = L.icon({
    iconUrl: leafRed,
    shadowUrl: leafShadow,
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
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
            type: "distance",
            gpsData: [demo[0]],
            icon: "/img/mech.svg",
            latLngHold: { lat: 0.0, lng: 0.0 },

            // test var
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

    disconnectSockerIO = () => {
        this.socket.disconnect();
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

            const data = this.state.gpsData;
            data.push(demo[this.state.numInc]);

            this.setState({ gpsData: data })

        });
    }

    render() {
        const position = [
            this.state.gpsData[this.state.gpsData.length - 1].lat,
            this.state.gpsData[this.state.gpsData.length - 1].lng];

        return (
            <div className="container-fluid" style={{
                height: "100vh",
                paddingRight: "0px",
                paddingLeft: "0px"
            }}>
                <div style={{ position: "absolute", zIndex: 9999 }}>
                    <div className="p-2" style={{
                        width: "100%",
                        marginTop: "12px",
                        marginLeft: "5px",
                        marginRight: "5px"
                    }}>
                        <div className="d-flex justify-content-start">
                            <button type="button" id="sidebarCollapse" className="navbar-btn mx-1">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            <button type="button"
                                className="btn btn-sm btn-info mx-1"
                                onClick={this.sendHandler}>socket-test</button>
                            <button type="button"
                                className="btn btn-sm btn-primary mx-1"
                                onClick={this.testMove}>move-test</button>

                            <div class="custom-control custom-switch my-auto text-white rounded-pill mx-1 bg-secondary">
                                <input type="checkbox"
                                    className="custom-control-input"
                                    id="customSwitch1" />
                                <label
                                    className="custom-control-label"
                                    for="customSwitch1">
                                    Follow Movement
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <Map
                    style={{ height: "100%", width: "100%" }}
                    center={position}
                    zoom={this.state.zoom}
                    zoomControl={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />

                    {
                        (this.state.gpsData || []).map((points, key) => {

                            let from = { lat: position[0], lng: position[1] };
                            let to = { lat: position[0], lng: position[1] };

                            if (key == 0) {
                                from = { lat: points.lat, lng: points.lng };
                                to = { lat: points.lat, lng: points.lng };
                            } else {
                                from = {
                                    lat: this.state.gpsData[key - 1].lat,
                                    lng: this.state.gpsData[key - 1].lng
                                };
                                to = {
                                    lat: this.state.gpsData[key].lat,
                                    lng: this.state.gpsData[key].lng
                                };
                            }

                            return (
                                <Polyline key={key} positions={[
                                    [from.lat, from.lng], [to.lat, to.lng],
                                ]} color={'red'} />
                            )
                        })
                    }

                    <Marker
                        position={
                            [this.state.gpsData[0].lat, this.state.gpsData[0].lng]
                        }
                        icon={redIcon}
                    >
                        <Popup><br /> First Position <br /></Popup>
                    </Marker>

                    <Marker
                        position={
                            [
                                this.state.gpsData[this.state.gpsData.length - 1].lat,
                                this.state.gpsData[this.state.gpsData.length - 1].lng
                            ]
                        }
                        icon={redIcon}
                    >
                        <Popup><br /> Last Position <br /></Popup>
                    </Marker>
                </Map>
            </div>
        )
    }
}

export default MapPage

