import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar_Gestionnaire = () => {
  const navigate = useNavigate();

  function seDeconnecter() {
    localStorage.removeItem("token");

    navigate("/GestionnaireLogin");
  }

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="OFPPT.png" alt="Logo" className="logo" />
      </div>
      <div className="menu-title">MENU</div>
      <ul className="menu-items">
        <li>
          <Link to="/emploi">
            <img src="calendar.png" alt="emploi" className="imageSide" />
            Emploi du temps
          </Link>
        </li>
        <li>
          <img src="parametres.png" alt="parametres" className="imageSide" />
          Gestion
          <ul className="submenu">
            <li>
              <Link to="/trainers">
                <img src="diplome.png" alt="diplome" className="imageSide" />
                Formateurs
              </Link>
            </li>
            <li>
              <Link to="/training">
                <img
                  src="education.png"
                  alt="education"
                  className="imageSide"
                />
                Formation
              </Link>
            </li>
            <li>
              <Link to="/Creation_Formation">
                <img
                  src="student.png"
                  alt="education"
                  className="imageSide"
                />
                Ajouter Formation
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/history">
            <img src="historique.png" alt="temps" className="imageSide" />
            Historique
          </Link>
        </li>
      </ul>

      <div className="user-info">
        <Link to="/profil">
          <img src="media/user.png" alt="User" className="user-photo" />
        </Link>
        <div className="user-details">
          <Link to="/profile" className="user-name">
            Gestionnaire
          </Link>
          <div className="footer-links">
            <Link to="/settings">
              <img src="parametre.png" alt="parametre" className="imageSide" />
            </Link>
            <button onClick={seDeconnecter} className="Logout">
              <img src="sortie.png" alt="sortie" className="imageSide" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar_Gestionnaire;


