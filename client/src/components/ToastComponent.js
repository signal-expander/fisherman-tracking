import React, { useEffect, useState } from 'react';
import $ from "jquery";
import { Button, Toast } from 'react-bootstrap';

const ToastComponent = ({
  title,
  message,
  onClose
}) => {
  return (
    <>
    {
      <div
        style={{
          position: "absolute",
          zIndex:  9999, 
          bottom: "0", 
          right: "0",
          width: "300px",
          marginRight: "20px", 
          marginBottom: "20px" 
          }}>
        <Toast onClose={onClose} show={true}>
          <Toast.Header>
        <strong className="mr-auto">{ title }</strong>
          </Toast.Header>
        <Toast.Body>{ message }</Toast.Body>
        </Toast>
      </div>
    }
    </>
  )
}


export {
  ToastComponent
};