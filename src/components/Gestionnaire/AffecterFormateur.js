import React, { useState, useEffect } from 'react';

import './Affecterformateur.css';
import FormateurModal from './Formateurmodal'; 

import { Button } from 'react-bootstrap';

export default function Affecterformateur() {
  const [modalShow, setModalShow] = useState(false);
  console.log(modalShow);
  return (
   
      <div className="AffecterformateurContainer">
         
        <Button variant="primary" onClick={() => setModalShow(true)}>
        Affecter les formateurs
      </Button>
       <FormateurModal
          
          show={modalShow}
          onHide={() => setModalShow(false)}
        /> 
        
      </div>
    
  );
}
