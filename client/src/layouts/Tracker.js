import React, { Component } from 'react';
import MapPage from '../pages/MapPage/MapPage';
import './tracker.css';
import $, { data, timers } from "jquery";
import { fishermenService } from '../services';
import { ToastComponent, Modal } from '../components';
import Logo from '../pages/MapPage/icons/logo.png';

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });

});

class Tracker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toastData: {
                title: '',
                msg: '',
                open: false
            },
            modalData: {
                form: {},
                submitting: false
            },
            fishermen: [],
            selectedFisherman: {},
            gpsData: []
        };
    }

    async componentDidMount() {
        await this.fetchFishermanData();
    }

    fetchFishermanData = async () => {
        await fishermenService.getFishermenList((res) => {
            this.setState({
                fishermen: res.data,
                selectedFisherman: res.data[0]
            });

            this.fetchFishermanGPSPoints(res.data[0]);
        }, (err) => {
            this.setState({
                toastData: {
                    title: "Error",
                    msg: err,
                    open: true
                }
            });
        });
    }

    saveFishermanData = async (form) => {
        this.setModalSubmitting(true);

        await fishermenService.saveFishermanData(form, (resp) => {
            this.setState({
                toastData: {
                    title: "Success",
                    msg: 'Fisherman saved successfully!',
                    open: true
                }
            });

            $('#saveFisherman').modal('hide');
            this.setModalSubmitting(false);
            this.fetchFishermanData();

        }, (err) => {
            this.setState({
                toastData: {
                    title: "Error",
                    msg: err.includes("duplicate") ? "Fisherman ID already exist" : err,
                    open: true
                }
            });

            this.setModalSubmitting(false);
        });
    }

    fetchFishermanGPSPoints = async (data) => {
        await fishermenService.fetchGPSFishermanData(data._id, (resp) => {
            console.log("resp ->", resp.data.data);
            this.setState({ selectedFisherman: data, gpsData: resp.data.data });
        }, (err) => {
            this.setState({
                toastData: {
                    title: "Error Fetch GPS Data",
                    msg: err,
                    open: true
                }
            });
        });
    }

    setFishermanGpsData = (data) => {
        this.fetchFishermanGPSPoints(data);
    }

    showSaveFishermanModal = () => {
        $('#saveFisherman').modal('show');
    }

    setModalSubmitting = (val) => {
        this.setState({ modalData: {
            ...this.state.modalData,
            submitting: val
        } });
    }

    render() {
        return (
            <>
                <div className="wrapper">
                    <nav id="sidebar">
                        <div className="sidebar-header text-center" style={{ marginRight: "0px" }}>
                          <a className="navbar-brand" href="/" style={{ marginRight: "0px" }}>
                            <img src={Logo} width="200" className="d-inline-block align-top" alt="" loading="lazy"/>
                          </a>                            
                          <hr />
                            <button 
                                type="button"
                                className="btn btn-sm btn-info"
                                onClick={this.showSaveFishermanModal}
                            >
                                Add Fisherman
                            </button>
                            <hr/>
                            {/* <h5><span style={{ color: "aquamarine" }}>Name:</span> Jay Reymark Jalandoni</h5> */}
                        </div>
                        <ul className="list-unstyled components">
                            {
                                (this.state.fishermen || []).map((data) =>
                                    <li>
                                        <a href={`#${data.id_number}`} className="text-dark" onClick={() => this.setFishermanGpsData(data)}>
                                            { data.name } <br/>
                                            <small className="text-primary">&nbsp;ID Number: { data.id_number } </small>
                                        </a>
                                    </li>
                                )
                            }
                        </ul>
                    </nav>

                    <div id="content">
                        <MapPage
                            fisherman={this.state.selectedFisherman}
                            gpsData={this.state.gpsData}
                        />
                    </div>
                </div>
                {
                    this.state.toastData.open &&
                    <ToastComponent
                        title={this.state.toastData.title}
                        message={this.state.toastData.msg}
                        onClose={() => this.setState({
                            toastData: {
                                open: false
                            }
                        })}
                    />
                }

                <Modal
                    form={this.saveFishermanData}
                    submitting={this.state.modalData.submitting}
                />
            </>
        );
    }
}

export default Tracker;