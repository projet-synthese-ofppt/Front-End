import { useState } from "react";
import FormateurResponsable from "./FormateurResponsable";
import { Button } from 'react-bootstrap';

export default function ButtonFormateurResponsable(props){
    const [modalShow, setModalShow] = useState(false);
    

    return (
        <>
      
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Formateur Responsable
          </Button>
    
          <FormateurResponsable
            show={modalShow}
            onHide={() => setModalShow(false)}
           
            id={props.id}
          />
        </>
      );
}