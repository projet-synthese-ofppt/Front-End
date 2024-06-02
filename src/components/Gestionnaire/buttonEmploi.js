import React, { useState } from "react";

import "./form.css";
import Button from "react-bootstrap/Button";
import CalendarFormation from './Emploi'

export default function ButtonFormation() {
  const [modalShow, setModalShow] = useState(false);
  

 
  return (
    <>
      <Button
        style={{backgroundColor:"#034378"}}
        variant="primary"
        className="link-form"
        onClick={() => setModalShow(true)}
      >
        Emploi
      </Button>
      <CalendarFormation show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
