import React, { useEffect, useState } from 'react';
import $ from "jquery";
import { Button, Toast } from 'react-bootstrap';
import { BsFillCaretRightFill } from 'react-icons/bs'
import { MdGpsFixed } from 'react-icons/md';

const FishermanInfo = ({
  fisherman,
  currentLoc,
  onClose
}) => {
  return (
    <>
    {
      <div
        style={{
          position: "absolute",
          zIndex:  9999, 
          top: "0", 
          right: "0",
          width: "250px",
          marginRight: "20px", 
          marginTop: "20px"
          }}>
        <Toast onClose={onClose} show={true}>
          <Toast.Header>
            <strong className="mr-auto">{ "Fisherman Informations" }</strong>
          </Toast.Header>
        <Toast.Body>
            <strong>ID:</strong> <br/><BsFillCaretRightFill/> { fisherman?.id_number } <br/>
            <strong>Name:</strong> <br/><BsFillCaretRightFill/> { fisherman?.name } <br/>
            <strong>Address:</strong> <br/><BsFillCaretRightFill/> { fisherman?.address } <br/>
            <strong>Contact Number:</strong> <br/><BsFillCaretRightFill/> { fisherman?.contact_number } <br/>
            <strong>Family Number:</strong> <br/><BsFillCaretRightFill/> { fisherman?.family_contact_number } <br/>
            <strong>Current Location:</strong> <br/><MdGpsFixed/> { currentLoc[0] }, { currentLoc[1] } <br/>
        </Toast.Body>
        </Toast>
      </div>
    }
    </>
  )
}


export {
    FishermanInfo
};