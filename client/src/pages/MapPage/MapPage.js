import React, { createRef, Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import leafRed from './icons/leaf-red.png';
import leafShadow from './icons/leaf-shadow.png';
import openSocket from 'socket.io-client';
import LeafletReactTrackPlayer from "leaflet-react-track-player";
import demo from './demo';
import { IoIosRemove, IoIosAdd } from "react-icons/io";
import { FishermanInfo } from '../../components';
import { timers } from 'jquery';

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
            gpsData: [{
                lat: 14.5833,
                lng: 121.0000
            }],
            icon: "/img/mech.svg",
            latLngHold: { lat: 0.0, lng: 0.0 },
            followMovement: true,
            showFishermanInfo: true,
            socketGpsTopic: '',
            // test var
            numInc: 0,
        }

        const host = window.location.host
        this.socket = openSocket(host);
        this.sendHandler = this.sendHandler.bind(this);
        this.mapRef = createRef();
    }

    componentWillMount() {
        this.receivedSocketIO();
    }

    componentWillUnmount = () => {
        this.disconnectSockerIO();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.fisherman._id != this.state.socketGpsTopic) {
            const id = this.props.fisherman._id;
            
            this.setState({ socketGpsTopic: id });
        }

        if (this.props.gpsData != this.state.gpsData) {
            const gps = this.props.gpsData;

            if (gps.length < 2) {
                gps.push({
                    lat: 14.5833,
                    lng: 121.0000
                });
            }

            this.setState({ gpsData: gps });
        }
    }

    receivedSocketIO = () => {
        this.socket.on(`msg_recv`, (msg) => {
            console.log("msg -> ", msg);
        });

        this.socket.on(`plot_gps`, (data) => {
            if (data.id == this.state.socketGpsTopic) {
                console.log("data -> ", data);

                this.setState({ gpsData: data.gps });
            }
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

    changeMovementCheck = (e) => {
        this.setState({ followMovement: e.target.checked });
    }

    increaseZoom = () => {
        if (this.state.zoom < 20)
            this.setState({ zoom: this.state.zoom + 1 });
    }

    decreaseZoom = () => {
        if (this.state.zoom > 0)
            this.setState({ zoom: this.state.zoom - 1 });
    }

    showFishermanInfoHandler = () => {
        this.setState({ showFishermanInfo: true });
    }

    render() {

        const initPos = [
            parseFloat(this.state.gpsData[0]?.lat),
            parseFloat(this.state.gpsData[0]?.lng)]

        const position = [
            parseFloat(this.state.gpsData[this.state.gpsData.length - 1]?.lat),
            parseFloat(this.state.gpsData[this.state.gpsData.length - 1]?.lng)];

        return (
            <div className="container-fluid" style={{
                height: "100vh",
                paddingRight: "0px",
                paddingLeft: "0px"
            }}>
                <div style={{ position: "absolute", zIndex: 999 }}>
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

                            <div className="btn-group mx-1" role="group" aria-label="Basic example">
                                <button 
                                    type="button"
                                    onClick={this.decreaseZoom} 
                                    className="btn btn-dark"><IoIosRemove/></button>
                                <button 
                                    type="button"
                                    onClick={this.increaseZoom}
                                    className="btn btn-dark"><IoIosAdd/></button>
                            </div>

                            <button type="button"
                                className="btn btn-sm btn-info mx-1"
                                onClick={this.sendHandler}>socket-test</button>
                            <button type="button"
                                className="btn btn-sm btn-primary mx-1"
                                onClick={this.testMove}>move-test</button>
                            
                            <button type="button"
                                className="btn btn-sm btn-info mx-1"
                                onClick={this.showFishermanInfoHandler}>Show Info</button>

                            <div className="custom-control custom-switch my-auto py-1 text-white rounded-pill mx-1 bg-secondary">
                                &nbsp;&nbsp;
                                <input type="checkbox"
                                    onChange={this.changeMovementCheck}
                                    defaultChecked={this.state.followMovement}
                                    className="custom-control-input"
                                    id="followMovementCheck" />
                                <label
                                    className="custom-control-label"
                                    for="followMovementCheck">
                                    Follow Movement&nbsp;&nbsp;
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    this.state.showFishermanInfo &&
                        <FishermanInfo 
                            fisherman={this.props.fisherman}
                            currentLoc={position}
                            onClose={() => {
                                this.setState({ showFishermanInfo: false })
                            }} 
                        />
                }
                
                <Map
                    style={{ height: "100%", width: "100%" }}
                    center={
                        this.state.followMovement ? position : initPos
                    }
                    zoom={this.state.zoom}
                    zoomControl={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />

                    {
                            (this.state.gpsData || []).map((points, key) => {

                                let from = { lat: parseFloat(position[0]), lng: parseFloat(position[1]) };
                                let to = { lat: parseFloat(position[0]), lng: parseFloat(position[1]) };

                                if (key == 0) {
                                    from = { lat: parseFloat(points?.lat), lng: parseFloat(points?.lng) };
                                    to = { lat: parseFloat(points?.lat), lng: parseFloat(points?.lng) };
                                } else {
                                    from = {
                                        lat: parseFloat(this.state.gpsData[key - 1]?.lat),
                                        lng: parseFloat(this.state.gpsData[key - 1]?.lng)
                                    };
                                    to = {
                                        lat: parseFloat(this.state.gpsData[key]?.lat),
                                        lng: parseFloat(this.state.gpsData[key]?.lng)
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
                            [this.state.gpsData[0]?.lat, this.state.gpsData[0]?.lng]
                        }
                        icon={redIcon}
                    >
                        <Popup>First Position <br /></Popup>
                    </Marker>

                    <Marker
                        position={
                            [
                                this.state.gpsData[this.state.gpsData.length - 1]?.lat,
                                this.state.gpsData[this.state.gpsData.length - 1]?.lng
                            ]
                        }
                        icon={redIcon}
                    >
                        <Popup>Last Position <br /></Popup>
                    </Marker>
                </Map>
            </div>
        )
    }
}

export default MapPage

