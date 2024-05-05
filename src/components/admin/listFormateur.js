import { useState,useEffect } from "react";
import axios from "axios";
import'./ListGestionnaire.css'
import { Link } from "react-router-dom";


export default function ListFormateur()
{
    const [formateurData,setFormateurData] = useState([])


    useEffect(  () =>
        {   
            getData();
        },[])
    
        const getData = async () =>
        {
           await axios.get('http://localhost:3002/api/data/person/formateur')
            .then(res =>
                {   
                    console.log(res.data)
                    setFormateurData(res.data) 
                     
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
            <p>List des formateurs</p>
            
        </div>
        <hr />
        <table>
            <thead>
                <th>Image</th>
                <th>Matricule</th>
                <th>Nom</th>
                <th>Login</th>
                <th>Telephone</th>
                <th>Type</th>
                <th>Spécialité</th>
                <th>Action</th>

            </thead>
            <tbody>
                {formateurData.map((i,index) => <tr>
                    <td><img src={i.image} alt="" width='50px' /></td>
                    <td>{i.id}</td>
                    <td>{i.first_name} {i.last_name}</td>
                    <td>{i.login}</td>
                    <td>{i.phone}</td>
                    <td>{i.more_informations.type}</td>
                    <td>
                        {i.more_informations.speciality.map(x => <tr>{x}</tr>)}
                    </td>
                    <td className="ListgestionnaireActions">
                        <Link to={`formateur/${i.id}`}> <img src="/media/edit.png" alt="" width='19px' /></Link>
                        <button className="deleteButton" onClick={() => handleClick(i.id)}><img src="/media/delete.png" alt="" width='19px' /></button>
                    </td>
                </tr>)}
            </tbody>
            

         </table>

    </div>

}