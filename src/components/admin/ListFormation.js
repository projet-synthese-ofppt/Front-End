import { useEffect, useState } from "react";
import './ListGestionnaire.css'
import { Link } from "react-router-dom";
import Sidebar from "../../Sidebar";
import axios from "axios";
import DropList from "../subComponents/dropList";


export default function ListFormation()
{
    const [formationData,setFormationData] = useState([])
    const [searchedFormation,setSearchedFormation] = useState([]);
   
    const [searchedTitre,setSearchedTitre] = useState("");


useEffect(()=>
{
    getData();
},[])

    const getData = async () =>
        {
            axios.get('http://localhost:3002/api/data/formation')
            .then(res =>
                {
                   console.log(res.data)
                    setFormationData(res.data);
                    setSearchedFormation(res.data);
                }
            )
        }

  


    function handleClick(id)
    {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:3002/api/data/formation/${id}`,
        {
            headers: {"authorization":`Bearer ${token}`}
           }
        )
        .then(res =>
            {
                
                getData();
            }
        ).catch(err => console.error(err))
    }

    function handleSearch()
    {
        const searchResult = formationData.filter( g => g.titre.toLowerCase().includes(searchedTitre.toLowerCase()) );
        setSearchedFormation(searchResult);
    }
    function handleReset()
    {
        setSearchedFormation(formationData);
        setSearchedTitre("");
        
    }
    


    return <div className="TheContainer">
      
     <div className="ListGestionnaireContainer">
        <div className="searchBar">
            <input className="searchBarInput" type="text" name="" id="" placeholder="Rechercher" onChange={e => setSearchedTitre(e.target.value)}  value={searchedTitre}/>
            <button className="searchButton" onClick={handleSearch} >Rechercher</button>
            <button className="resetButton" onClick={handleReset} >réinitialiser</button>
            
        </div>
        <div className="titleContainer">
            <p>List des formateurs</p>
        </div>
        <hr />
        <table>
            <thead>
                
                <th>Titre</th>
                <th>Domain</th>
                <th>Date Début</th>
                <th>Date Fin</th>
                <th>Action</th>

            </thead>
            <tbody>
                {searchedFormation.map((i,index) => <tr>
                    
                    <td>{i.titre}</td>
                    <td>{i.domain}</td>
                    <td>{i.dateDebut.toLocaleString().split('T')[0]}</td>
                    <td>{i.dateFin.toLocaleString().split('T')[0]}</td>
                   
                    <td className="ListgestionnaireActions">
                        <Link to={`formation/${i.id}`}> <img src="/media/edit.png" alt="" width='19px' /></Link>
                        <button className="deleteButton" onClick={() => {
    const confirmDelete = window.confirm("Vous êtes sûr de supprimer cette formation ?");
    if (confirmDelete) {
        handleClick(i.id);
    }}} ><img src="/media/delete.png" alt="" width='19px' /></button>
                    </td>
                </tr>)}
            </tbody>
            

         </table>

    </div>
    </div>
}