import React, { Component } from 'react';
import MapPage from '../pages/MapPage/MapPage';
import './tracker.css';
import $ from "jquery";


$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });

});

class Tracker extends Component {
    render() {
        return (
            <div>


                <div class="wrapper">
                    <nav id="sidebar">
                        <div class="sidebar-header">
                            <h3>Dashboard</h3>
                            <hr/>
                            <h5><span style={{color: "aquamarine"}}>Name:</span> Jay Reymark Jalandoni</h5>
                        </div>
                        <ul class="list-unstyled components ml-2">
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">Contents</a>
                            </li>
                        </ul>
                    </nav>

                    <div id="content">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <div class="container-fluid">

                                <button type="button" id="sidebarCollapse" class="navbar-btn">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>

                            </div>
                        </nav>
                    </div>

                    <div className="col-md-8 mt-5 p-0" >
                        <MapPage />
                    </div>

                </div>







            </div>
        );
    }
}

export default Tracker;