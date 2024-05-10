import { useState, useEffect } from "react";
import axios from "axios";
import "./ListGestionnaire.css";
import { Link } from "react-router-dom";

import Sidebar from "../../Sidebar";
export default function ListFormateur() {
  const [formateurData, setFormateurData] = useState([]);
  const [searchedFormateur,setSearchedFormateur] = useState([])

  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    await axios
      .get("http://localhost:3002/api/data/person/formateur")
      .then(res => {
        console.log(res.data);
        setFormateurData(res.data);
        setSearchedFormateur(res.data);
      })
      .catch((error) => console.log(error));
  };

  function handleClick(id) {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:3002/api/data/gestionnaire/${id}`,{
        headers:
        {"authorization":`Bearer ${token}`}
      })
      .then((res) => {
        console.log(res.data);
        getData();
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="TheContainer">
     
      <div className="ListGestionnaireContainer">
        <div className="searchBar">
          <input
            className="searchBarInput"
            type="text"
            name=""
            id=""
            placeholder="Rechercher"
          />
        </div>
        <div className="titleContainer">
          <p>List des formateurs</p>
        </div>
        <hr />
        <table>
          <thead>
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
          </thead>
          <tbody>
            {formateurData && formateurData.map((i, index) => (
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
                    {i.more_informations.compethences.map((x, idx) => (
                    <span key={idx}>{x}<br/></span> 
                    ))}
                </td>
                <td className="ListgestionnaireActions">
                   
                    
                     <button className="deleteButton" onClick={() => {
    const confirmDelete = window.confirm("Vous êtes sûr de supprimer ce gestionnaire ?");
    if (confirmDelete) {
        handleClick(i.person_id);
    }}} ><img src="/media/delete.png" alt="" width='19px' /></button>
                </td>
                </tr>
            ))}
            </tbody>


        </table>
      </div>
    </div>
  );
}
