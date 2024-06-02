import React, { useState, useEffect } from 'react';

import './Affecterformateur.css';
import FormateurModal from './Formateurmodal';  // Import the modal component

import Button from 'react-bootstrap/Button';

export default function Affecterformateur() {
  const [modalShow, setModalShow] = useState(false);
  console.log(modalShow);
  return (
   
      <div className="ListFormateursContainer">
         
        <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>
       <FormateurModal
          
          show={modalShow}
          onHide={() => setModalShow(false)}
        /> 
        
      </div>
    
  );
}
