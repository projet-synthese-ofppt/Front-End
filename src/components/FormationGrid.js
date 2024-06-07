import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Formationgrid.css';
import { Link } from 'react-router-dom';

const FormationGrid = ({ idFormateur }) => {
    const [formations, setFormations] = useState([]);
console.log(formations)
    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/api/responsability/${idFormateur}`);
                setFormations(response.data);
                console.log(response.headers)
            } catch (error) {
                console.error('Error fetching formations:', error);
            }
        };

        fetchFormations();
    }, [idFormateur]);
    console.log(formations)
    return (
        <div className="formation-grid">
            {formations.map((formation) => (
                <Link to={`/profilFormation/${formation.id}`}> 
                <div key={formation.id} className="formations-card">
                    <h3>{formation.titre}</h3>
                    <p>{formation.domain}</p>
                    <p>{formation.dateDebut.toLocaleString().split('T')[0]}</p>
                    <p>{formation.dateFin.toLocaleString().split('T')[0]}</p>
                </div></Link>
            ))}
        </div>
    );
};

export default FormationGrid;
