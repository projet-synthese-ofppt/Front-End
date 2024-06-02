import React from 'react';
import { Container ,Row} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import axios from "axios";
import { useState,useEffect } from 'react';



export default function FormateurModal ({onHide ,show}){
  const [formateurData, setFormateurData] = useState([]);
const [message,setmessage]=useState();
  const FormationId = 27;

  

  const getData = async () => {
    await axios
      .get("http://localhost:3002/api/data/person/formateur")
      .then(res => {
        
        setFormateurData(res.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getData();
  }, []);

  let CollectData = [];

  function handleCollecte(id) {
    CollectData.push(id);
  }

  const DataTosend = { "idformation": FormationId, "idsFormateurs": CollectData };

  const pushData = async () => {
    await axios.post("http://localhost:3002/api/participation", DataTosend)
      .then(res => {
        console.log("done");
        setmessage("Formateurs bien affecter ")
        onHide();
      
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
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    
      show={show}
    onHide={onHide}
    
      
    >
      <Modal.Header closeButton>
        
      </Modal.Header>

      <Modal.Body className="grid-example">
      {message && <div >{message}</div>  }
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
          <button  type="button" class="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
        <div className="titleFormateurs">
          <p>List des formateurs</p>
        </div>
        <hr />
        </Row>
        <Row>
         
      <table className="table">
          <thead className=' '>
            <tr>
              <th>Image</th>
             
              
              <th>Nom</th>
              <th>Prénom</th>
              <th>Specialite</th>
              <th>Etablissement</th>
              <th>Ville</th>
              <th>Type</th>
              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {formateurData.map((i, index) => (
              <tr key={index}>
                <td>
                  <img src={`http://localhost:3002/uploads/${i.image}`} alt="" width="50px" />
                </td>
                
                 
                <td>
                  {i.first_name} 
                </td>
                <td>
                {i.last_name}
                </td>
                
                <td>{i.more_informations.specialite}</td>
                <td>{i.nom}</td>
                <td>{i.ville}</td>
                <td>{i.type}</td>
                
                
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


