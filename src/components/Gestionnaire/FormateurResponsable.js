import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

export default function FormateurResponsable(props){
const [formateurs,setFormateurs]=useState([]);
const [idFormateur,setIdFormateur]=useState(null);


    useEffect(() => {
        const fetchFormateurs = async () => {
          try {
            const response = await axios.get('http://localhost:3002/api/getFormateurs');
            setFormateurs(response.data.formateurs);
            
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchFormateurs();
      }, []);

async function  HandleValider(){
      
      try{
          const response= await axios.post('http://localhost:3002/api/setFormateur',{idFormateur})
          props.msg(response.data.message)
          props.onHide()
      }catch(err)
        {
            console.log(err);
        }
}

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Liste des formateurs
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Choisir un formateur responsable</h4>
            <table className='table table-striped'>
               <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Type</th>
                <th>Specialité</th>
                <th>Etablissement</th>
                <th>Choisir</th>
                </tr>
                {formateurs.map((f)=>{
                      return <tr>
                        <td>{f.last_name}</td>
                        <td>{f.first_name}</td>
                        <td>{f.type}</td>
                        <td>{f.more_informations.specialite}</td>
                        <td>{f.nom}</td>
                        <td><input type="radio" name="FormateurSelected" className='form-check-input' onChange={()=>{setIdFormateur(f.person_id)}}/></td>
                      </tr>
                })}
               
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={HandleValider}>Valider</Button>
          </Modal.Footer>
        </Modal>
      );
}