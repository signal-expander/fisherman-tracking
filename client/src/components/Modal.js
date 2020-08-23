import React, { useEffect, useState } from 'react';
import $ from 'jquery';

export const Modal = ({ form, submitting }) => {

    const [ id, setId ] = useState('');
    const [ name, setName ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ mNumber, setMNumber ] = useState('');
    const [ fMNumber, setFMNumber ] = useState('');

    const submitForm = () => {
        form({
            id_number: id,
            name,
            address,
            contact_number: mNumber,
            family_contact_number: fMNumber
        });
    }

    return (
        <div className="modal fade" id="saveFisherman" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="saveFishermanLabel">Add Fisherman</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label 
                                    for="idInput">ID:</label>
                                <input
                                    type="name"
                                    onChange={(e) => setId(e.target.value)}
                                    value={id}
                                    className="form-control" 
                                    id="idInput"
                                />
                            </div>
                            <div className="form-group">
                                <label 
                                    for="nameInput">Name:</label>
                                <input 
                                    type="name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    className="form-control" 
                                    id="nameInput" 
                                />
                            </div>
                            <div className="form-group">
                                <label 
                                    for="addressInput">Address:</label>
                                <input 
                                    type="name"
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                    className="form-control" 
                                    id="addressInput" 
                                />
                            </div>
                            <div className="form-group">
                                <label 
                                    for="mobileNumberInput">Mobile Number:</label>
                                <input 
                                    type="name"
                                    onChange={(e) => setMNumber(e.target.value)}
                                    value={mNumber} 
                                    className="form-control" 
                                    id="mobileNumberInput" 
                                />
                            </div>
                            <div className="form-group">
                                <label 
                                    for="famMemberMNumInput">Family Member Mobile Number:</label>
                                <input 
                                    type="name"
                                    onChange={(e) => setFMNumber(e.target.value)}
                                    value={fMNumber}
                                    className="form-control" 
                                    id="famMemberMNumInput" 
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        {
                            !submitting 
                            ?
                                <>
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        data-dismiss="modal">Cancel</button>
                                    <button 
                                        type="button"
                                        onClick={submitForm}
                                        className="btn btn-primary">Save</button>
                                </>
                            :
                                <button className="btn">
                                    <div class="spinner-border" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};