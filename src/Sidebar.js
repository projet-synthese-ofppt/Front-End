import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import  { useState, useEffect } from 'react';
import axios from 'axios';

const Sidebar = ({ user }) => {
const navigate=useNavigate()

const [id,setId]=useState("")
const [nom,setNom]=useState("")
const [prenom,setPrenom]=useState("")
  function seDeconnecter (){
   
      
      localStorage.removeItem('token');
      
      navigate("/login");
    
  }
  useEffect(()=>{
    const getAdminId= async()=>{
        const token = localStorage.getItem('token');
        if (!token) {
          navigate("/Login");
            
        }
        const response=await axios.get("http://localhost:3002/api/adminId",{
            headers:{"authorization":`Bearer ${token}`}
        })
       setNom(response.data.last_name)
       setPrenom(response.data.first_name)
    }

    getAdminId()
},[navigate])
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="OFPPT.png" alt="Logo" className="logo" />
      </div>
      <div className="menu-title">MENU</div>
      <ul className="menu-items">
        <li>
          <Link to="/dashboard">
          <img src="diagramme.png" alt='diagramme' className='imageSide'/>
            Dashboard
          </Link>
        </li>
        <li>
          <img src="parametres.png" alt='parametres' className='imageSide'/>
            Gestion
          <ul className="submenu">
            <li>
              <Link to="/manager"><img src="utilisateur.png" alt='utilisateur' className='imageSide'/>Gestionnaire</Link>
            </li>
            <li>
              <Link to="/trainers"><img src="diplome.png" alt='diplome' className='imageSide'/>Formateurs</Link>
            </li>
            <li>
              <Link to="/training"><img src="education.png" alt='education' className='imageSide'/>Formation</Link>
            </li>
          </ul>
        </li>
        <li>
        
          <img src="historique.png" alt='temps' className='imageSide'/>
            Historique
         
          <ul className="submenu">
            <li>
              <Link to="/history"><img src="utilisateur.png" alt='utilisateur' className='imageSide'/>Admin</Link>
            </li>
            <li>
              <Link to="/historyGestionnaire"><img src="utilisateur.png" alt='diplome' className='imageSide'/>Gestionnaire</Link>
            </li>
            <li>
              <Link to="/historyTrainer"><img src="utilisateur.png" alt='education' className='imageSide'/>Formateur</Link>
            </li>
          </ul>
        </li>
      </ul>
      
      <div className="user-info">
  <Link to="/admin/profile">
    <img src="media/user.png" alt="User" className="user-photo"/>
  </Link>
  <div className="user-details">
    <Link to="/admin/profile" className="user-name">
    {nom} {prenom}
    </Link>
    <div className="footer-links">
      <Link to="/settings">
        <img src="parametre.png" alt='parametre' className='imageSide' style={{marginTop:"3.5px"}}/>
      </Link>
      <button onClick={seDeconnecter} className='Logout'>
        <img src="sortie.png" alt='sortie' className='imageSide'/>
      </button>
    </div>
  </div>
</div>



    </div>
  );
};

export default Sidebar;