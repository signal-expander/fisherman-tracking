import React, { Component } from 'react';
import { MapPage } from '../pages/MapPage';

class Tracker extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid bg-primary">
                    <div className="row">
                        <div className="col-md-4 vh-100 p-0 text-center bg-warning">
                            SideBar here

                            <div class="card border-success mb-3 mx-3 mt-3">
                                <div class="card-body text-success">
                                    <h5 class="card-title">Test Fisherman Name</h5>
                                    <p class="card-text">Test Content</p>
                                </div>
                            </div>


                        </div>
                        <div className="col-md-8 vh-100 p-0">
                            <MapPage />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tracker;