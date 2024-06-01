import { useState } from "react";
import FormateurResponsable from "./FormateurResponsable";
import { Button } from 'react-bootstrap';

export default function Test(){
    const [modalShow, setModalShow] = useState(false);
    const [message,setMessage]=useState("")
    function AfficherMessage(msg){
         setMessage(msg)
    }

    return (
        <>
       {message && <p class="alert alert-success text-center">{message}</p>}
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Formateur Responsable
          </Button>
    
          <FormateurResponsable
            show={modalShow}
            onHide={() => setModalShow(false)}
            msg={AfficherMessage}
          />
        </>
      );
}