import { useState } from "react";
import'./ListGestionnaire.css'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


export default function ListGestionnaire()
{
    const [gestionnaireData,setGestionnaireData] = useState([])


    useEffect(  () =>
    {   
        getData();
    },[])

    const getData = () =>
    {
        axios.get('http://localhost:3002/api/data/person/gestionnaire')
        .then(res =>
            {   console.log(res.data)
                setGestionnaireData(res.data)   
            }
        ).catch(error => console.log(error))
    }

    function handleClick(id)
    {
        axios.delete(`http://localhost:3002/api/data/gestionnaire/${id}`)
        .then(res =>
            {
                console.log(res.data)
                getData();
            }
        ).catch(err => console.error(err))
    }

    


    return <div className="ListGestionnaireContainer">
        <div className="searchBar">
            <input className="searchBarInput" type="text" name="" id="" placeholder="Rechercher" />
        </div>
        <div className="titleContainer">
            <p>List des gestionnaires</p>
            <button className="addGestionnaireButton">Ajouter un gestionnaire</button>
        </div>
        <hr />
        <table>
            <thead>
                <th>Image</th>
                <th>Matricule</th>
                <th>Nom Complet</th>
                <th>Login</th>
                <th>Phone</th>
                
                <th>Date Creation</th>
                <th>Action</th>

            </thead>
            <tbody>
                {gestionnaireData.map((i,index) => <tr key={index}>
                    <td><img src={i.image} alt="" width='50px' /></td>
                    <td>{i.id}</td>
                    <td>{i.first_name} {i.last_name}</td>
                    <td>{i.login}</td>
                    <td>{i.phone}</td>
                    
                    <td>{i.creationDate}</td>
                    <td className="ListgestionnaireActions">
                        <Link> <img src="/media/edit.png" alt="" width='19px' /></Link>
                        <button className="deleteButton" onClick={() => handleClick(i.id)} ><img src="/media/delete.png" alt="" width='19px' /></button>
                    </td>
                </tr>)}
            </tbody>
            

         </table>

    </div>

}