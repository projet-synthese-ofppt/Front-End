import './ProfilFormation.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ButtonFormateurResponsable from './ButtonFormateurResponsable';

const ProfilFormation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: '',
    objectif: '',
    formateurResponsableNom: '',
    formateurResponsablePrenom: '',
    contenus: [],
    dateDebut: '',
    dateFin: '',
    duree: '',
    domain: ''
  });

  useEffect(() => {
    const checkAuthentification = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate("/login");
        }
      } catch (err) {
        console.log("Error checking authentication", err);
        navigate("/login");
      }
    };
    checkAuthentification();

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/formation/${id}`);
        console.log(response.data);
        const data = response.data.data;
        setFormData({
          titre: data.titre,
          objectif: data.objectif,
          formateurResponsableNom: data.formateurResponsableNom,
          formateurResponsablePrenom: data.formateurResponsablePrenom,
          contenus: data.contenus,
          dateDebut: data.dateDebut,
          dateFin: data.dateFin,
          duree: data.duree,
          domain: data.domain
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

  }, [id, navigate]);

  return (
    <div className='body-con'>
      <div className="image-container" style={{backgroundImage:"url(/../formation.jpeg)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
         <div className='mybuttonsFormations'>
         <ButtonFormateurResponsable/>
         <ButtonFormateurResponsable/>
         <ButtonFormateurResponsable/>
         </div>
       
        <p className="centered-paragraph">Bienvenue à la {formData.titre}</p>
       
      </div>
      <br/>
      <div className="navbar">
        <Link to={`/detail/${id}`}>Détail</Link>
        <Link to={`/formateur/${id}`}>Formateur</Link>
        <Link to={`/emploi/${id}`}>Emploi</Link>
      </div>
      <div className="formation-card-p">
        <h2>{formData.titre}</h2>
        <p><strong>Objectif:</strong> {formData.objectif}</p>
        <p><strong>Formateur Responsable:</strong> {formData.formateurResponsableNom} {formData.formateurResponsablePrenom}</p>
        <p><strong>Date de Début:</strong> {new Date(formData.dateDebut).toLocaleDateString()}</p>
        <p><strong>Date de Fin:</strong> {new Date(formData.dateFin).toLocaleDateString()}</p>
        <p><strong>Durée:</strong> {formData.duree} jours</p>
        <p><strong>Domaine:</strong> {formData.domain}</p>
      </div>
      <h3 className='contenu-title'>Contenus:</h3>
      <div className="contenus-grid">
        {formData.contenus.map((contenu) => (
          <div className="contenu-card" key={contenu.id}>
            {contenu.type === "video" && (
              <video src={`/../${contenu.source}`} controls width={'100%'}></video>
            )}
            {contenu.type === "audio" && (
              <audio src={`/../${contenu.source}`} controls></audio>
            )}
            {contenu.type === "fichier" && (
              <a href={`/../${contenu.source}`} target="_blank" rel="noopener noreferrer">Télécharger le fichier</a>
            )}
            <p><strong>Description:</strong> {contenu.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilFormation;
