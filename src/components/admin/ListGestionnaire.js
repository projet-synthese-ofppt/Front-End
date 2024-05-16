import { useState } from "react";
import'./ListGestionnaire.css'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Sidebar";


export default function ListGestionnaire()
{
    const [gestionnaireData,setGestionnaireData] = useState([])
    const [searchedGestionnaire,setSearchedGestionnaire] = useState([]);
    const [message,setMessage]=useState("")
    const [searchedName,setSearchedName] = useState("");


    useEffect(  () =>
    {   
        getData();
    },[])

    const getData = () =>
    {
        axios.get('http://localhost:3002/api/data/person/gestionnaire')
        .then(res =>
            {  
                setGestionnaireData(res.data)   
                setSearchedGestionnaire(res.data);
              
            }
        ).catch(error => console.log(error))
    }

    function handleClick(id)
    {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:3002/api/data/gestionnaire/${id}`,{
            headers:
            {"authorization":`Bearer ${token}`}
          })
        .then(res =>
            {
                getData();
            }
        ).catch(err => console.error(err))
    }

    function handleSearch()
    {
        const searchResult = gestionnaireData.filter( g => g.first_name.toLowerCase().includes(searchedName.toLowerCase()) || g.last_name.toLowerCase().includes(searchedName.toLowerCase()) );
        setSearchedGestionnaire(searchResult);
    }
    function handleReset()
    {
        setSearchedGestionnaire(gestionnaireData);
        setSearchedName("");
        
    }
    

    


    return <div className="TheContainer">
      
        <div className="ListGestionnaireContainer">
        
        
        <div className="searchBar">
            <input className="searchBarInput" type="text" name="" id="" placeholder="Rechercher par nom" value={searchedName} onChange={e => setSearchedName(e.target.value)} />
            <button className="searchButton" onClick={handleSearch} >Rechercher</button>
            <button className="resetButton" onClick={handleReset} >réinitialiser</button>
        </div>
        <div className="titleContainer">
            <p style={{fontSize:"30px",fontWeight:"bold"}}>List des gestionnaires</p>
           <Link to="/addGestionnaire"> <button className="addGestionnaireButton">Ajouter un gestionnaire</button></Link>
        </div>
        <hr />
        <table>
            <thead>
               <tr>
                    <th>Image</th>
                    <th>Matricule</th>
                    <th>Nom Complet</th>
                    <th>Login</th>
                    <th>Date Creation</th>
                    <th>Action</th>
               </tr>

            </thead>
            <tbody>
                {searchedGestionnaire.map((i,index) => <tr key={index}>
                    <td><img src={`http://localhost:3002/uploads/${i.image}`} alt="" width='50px' /></td>
                    <td>{i.person_id}</td>
                    <td>{i.first_name} {i.last_name}</td>
                    <td>{i.login}</td>
                  
                    
                    <td>{i.creationDate.toLocaleString().split('T')[0]} {i.creationDate.toLocaleString().split('T')[1].split('.')[0]}
                    </td>
                    <td className="ListgestionnaireActions">
                        <Link to={`/profilGestionnaire/${i.person_id}`}> <img src="/media/edit.png" alt="" width='19px' /></Link>
                        <button className="deleteButton" onClick={() => {
    const confirmDelete = window.confirm("Vous êtes sûr de supprimer ce gestionnaire ?");
    if (confirmDelete) {
        handleClick(i.person_id);
    }}} ><img src="/media/delete.png" alt="" width='19px' /></button>
                    </td>
                </tr>)}
            </tbody>
            

         </table>

    </div>
    </div>
       
}