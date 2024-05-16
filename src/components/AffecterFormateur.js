
import { useState,useEffect } from "react";
import axios from "axios";
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
let CollectData=[]
  function handleCollecte(id) {
    CollectData.push(id)
   
  }
 const   pushData= async (data)=>{
    await axios .post("http://localhost:3002/api/participaion",CollectData)
    .then(res=>{
        console.log("done")
    }).catch((error)=>console.log(error));
 }
console.log(CollectData);
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
            <th>CIN</th>
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
                <td>CIN</td>
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
                   
                    <input type="checkbox" onChange={()=>handleCollecte(i.person_id)}></input>
                </td>
                </tr>
            ))}
            </tbody>


        </table>
        <button onClick={pushData}>Push</button>
      </div>
    </div>
  );
}