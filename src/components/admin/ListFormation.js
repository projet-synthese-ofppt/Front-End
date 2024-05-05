import { useState } from "react";
import './ListGestionnaire.css'
import { Link } from "react-router-dom";


export default function ListFormation()
{
    const [formationData,setFormationData] = useState([
        {Titre:"Formation",specialite:'specialite1',dateDebut:'10/10/2023',dateFin:'12/10/2023'},
        {Titre:"Formation",specialite:'specialite1',dateDebut:'10/10/2023',dateFin:'12/10/2023'},
        {Titre:"Formation",specialite:'specialite1',dateDebut:'10/10/2023',dateFin:'12/10/2023'},
        {Titre:"Formation",specialite:'specialite1',dateDebut:'10/10/2023',dateFin:'12/10/2023'},
        {Titre:"Formation",specialite:'specialite1',dateDebut:'10/10/2023',dateFin:'12/10/2023'},
        {Titre:"Formation",specialite:'specialite1',dateDebut:'10/10/2023',dateFin:'12/10/2023'}
    ])


    const [searchResult,setSearchResult] = useState(formationData);


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
                
                <th>Ttire</th>
                <th>Spécialité</th>
                <th>Date Début</th>
                <th>Date Fin</th>
                <th>Action</th>

            </thead>
            <tbody>
                {searchResult.map((i,index) => <tr>
                    
                    <td>{i.Titre}</td>
                    <td>{i.specialite}</td>
                    <td>{i.dateDebut}</td>
                    <td>{i.dateFin}</td>
                   
                    <td className="ListgestionnaireActions">
                        <Link to={`formateur/${i.matricule}`}> <img src="/media/edit.png" alt="" width='19px' /></Link>
                        <button className="deleteButton"><img src="/media/delete.png" alt="" width='19px' /></button>
                    </td>
                </tr>)}
            </tbody>
            

         </table>

    </div>

}