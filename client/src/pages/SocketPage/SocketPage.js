import React, { Component } from 'react';
import openSocket from 'socket.io-client';

class SocketPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: ""
        };

        const host = window.location.host
        this.socket = openSocket(host);
        this.sendHandler = this.sendHandler.bind(this);
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

    disconnectSockerIO = () => {
        this.socket.disconnect();
    }


    sendHandler() {
        console.log("-- send scoket --");
        this.sendSocket();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col md-12 text-center bg-warning">Socket Page</div>
                    <div className="col-md-12">
                        <div className="row mt-5 bg-primary">
                            <div className="col-md-6 text-center">
                                <div className="d-flex flex-column p-2">
                                    <h4>Send:</h4>
                                    <button className="btn btn-info" onClick={this.sendHandler}>Send now</button>
                                </div>
                            </div>
                            <div className="col-md-6 text-center bg-info p-2">
                                <div className="d-flex flex-column">
                                    <h4>Recieved:</h4>
                                    <h4 className="badge badge-warning">
                                        { this.state.data }    
                                    </h4>
                                </div>

                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export {
    SocketPage
}