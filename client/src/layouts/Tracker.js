import React, { Component } from 'react';
import MapPage from '../pages/MapPage/MapPage';
import Sidebar from 'react-sidebar';


class Tracker extends Component {
    render() {
        return (
            <div>





                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-md-4 vh-100 p-0 text-center bg-warning">
                          {/* SideBar here

                            <div className="card border-success mb-3 mx-3 mt-3">
                                <div className="card-body text-success">
                                    <h5 className="card-title">Test Fisherman Name</h5>
                                    <p className="card-text">Test Content</p>
                                </div>
                            </div>  */}
                            
                        </div> 
                        
                        <div className="col-md-8 mt-4 p-0">
                            <MapPage />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tracker;