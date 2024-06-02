import React from 'react';
import { Modal, Button,Container ,Row} from 'react-bootstrap';
import axios from "axios";
import { useState,useEffect } from 'react';

export default function FormateurModal ({onHide ,show}){
  const [formateurData, setFormateurData] = useState([]);
const [message,setmessage]=useState();
  const FormationId = 3;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("http://localhost:3002/api/data/person/formateur")
      .then(res => {
        setFormateurData(res.data);
      })
      .catch((error) => console.log(error));
  };
console.log(formateurData);
  let CollectData = [];

  function handleCollecte(id) {
    CollectData.push(id);
  }

  const DataTosend = { "idformation": FormationId, "idsFormateurs": CollectData };

  const pushData = async () => {
    await axios.post("http://localhost:3002/api/participasion", DataTosend)
      .then(res => {
        console.log("done");
        setmessage("Formateurs bien affecter ")
      
      })
      .catch((error) => console.log(error));
  };

 
  const [searchTerm, setSearchTerm] = useState('');
 
  const handleSearch = () => {
    const filtered = formateurData.filter(item => {
      return (
        item.nom.includes(searchTerm) ||
        item.more_informations.specialite.includes(searchTerm) ||
        item.more_informations.compethences.includes(searchTerm)
      );
    });
    setFormateurData(filtered);
  };
  
  return (
    <Modal
    
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      
    >
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body className="grid-example">
      <Container>
      <Row>
      <div className="search">
          <input
            className="searchInput"
            type="text"
            placeholder="Spécialité, Etablissement"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="titleFormateurs">
          <p>List des formateurs</p>
        </div>
        <hr />
        </Row>
        <Row>
          {message? <div >{message}</div> :"" }
      <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Matricule</th>
              
              <th>Nom</th>
              <th>Login</th>
              <th>Specialite</th>
              <th>Etablissement</th>
              <th>Ville</th>
              <th>Type</th>
              <th>Competence</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {formateurData.map((i, index) => (
              <tr key={index}>
                <td>
                  <img src={`http://localhost:3002/uploads/${i.image}`} alt="" width="50px" />
                </td>
                <td>{i.person_id}</td>
                 
                <td>
                  {i.first_name} {i.last_name}
                </td>
                <td>{i.login}</td>
                <td>{i.more_informations.specialite}</td>
                <td>{i.nom}</td>
                <td>{i.ville}</td>
                <td>{i.type}</td>
                
                <td>
                  {i.more_informations.compethence.map((x, idx) => (
                    <span key={idx}>{x}<br/></span>
                  ))}
                </td>
                <td>
                  <input type="checkbox" onChange={() => handleCollecte(i.person_id)}></input>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
      <Button className='btn btn-primary' variant="primary" onClick={pushData}>Affecter</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};


