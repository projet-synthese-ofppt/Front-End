import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ user }) => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="OFPPT.png" alt="Logo" className="logo" />
      </div>
      <div className="menu-title">MENU</div>
      <ul className="menu-items">
        <li>
          <Link to="/dashboard">
          <img src="diagramme.png" alt='diagramme' className='image'/>
            Dashboard
          </Link>
        </li>
        <li>
          <img src="parametres.png" alt='parametres' className='image'/>
            Gestion
          <ul className="submenu">
            <li>
              <Link to="/manager"><img src="utilisateur.png" alt='utilisateur' className='image'/>Gestionnaire</Link>
            </li>
            <li>
              <Link to="/trainers"><img src="diplome.png" alt='diplome' className='image'/>Formateurs</Link>
            </li>
            <li>
              <Link to="/training"><img src="education.png" alt='education' className='image'/>Formation</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/history">
          <img src="historique.png" alt='temps' className='image'/>
            Historique
          </Link>
        </li>
      </ul>
      
      <div className="user-info">
  <Link to="/profil">
    <img src={user.photo} alt="User" className="user-photo" />
  </Link>
  <div className="user-details">
    <Link to="/profile" className="user-name">
      {user.firstName} {user.lastName}
    </Link>
    <div className="footer-links">
      <Link to="/settings">
        <img src="parametre.png" alt='parametre' className='image'/>
      </Link>
      <Link to="/logout">
        <img src="sortie.png" alt='sortie' className='image'/>
      </Link>
    </div>
  </div>
</div>



    </div>
  );
};

export default Sidebar;