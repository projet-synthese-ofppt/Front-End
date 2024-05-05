import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../form.css";

export default function Creation_Formation() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/GestionnaireLogin");
        }
      } catch (err) {
        console.log("Error checking authentication", err);
        navigate("/GestionnaireLogin");
      }
    };

    checkAuthentication();
  }, [navigate]);

  const [errors, setErrors] = useState({
    titre: "",
    objectif: "",
    duree: "",
    date_Debut: "",
    date_Fin: "",
    domain: "",
    competence: "",
  });

  const [formation, setFormation] = useState({
    titre: "",
    objectif: "",
    duree: 0,
    date_Debut: null,
    date_Fin: null,
    domain: "",
    competence: "",
    planification:null,
  });


  const handleInputChange = (name, value) => {
    setFormation({ ...formation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3002/api/Creation_Formation",
        {formation},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };


  const generatePlanning = (duree) => {
    const plan = [];
    if (duree > 0) {
      for (let index = 0; index < duree; index++) {
        plan.push(
          <div className="planning" key={index}>
            <label id="jour">Jour :</label>{" "}
            <input
              type="date"
              name={`jour_${index}`}
              onChange={(e) =>
                handleInputChange(`jour_${index}`, e.target.value)
              }
              id="jour_input"
            />
            <label id="heure">Heure :</label>
            <input
              type="time"
              name={`heure_from_${index}`}
              onChange={(e) =>
                handleInputChange(`heure_from_${index}`, e.target.value)
              }
            />
            <input
              type="time"
              name={`heure_to_${index}`}
              onChange={(e) =>
                handleInputChange(`heure_to_${index}`, e.target.value)
              }
            />
          </div>
        );
      }
    }
    return plan;
  };

  return (
    <>
      <div>
        <h1>La création d'une formation</h1>
        <main>
          <form action="" method="post" onSubmit={handleSubmit}>
            <section className="first_section">
              <aside className="first_aside">
                <label htmlFor="titre">Titre de formation :</label>
                <input
                  type="text"
                  name="titre"
                  id="titre"
                  placeholder="Titre"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {errors.titre && <span className="error">{errors.titre}</span>}

                <label htmlFor="objectif">Objectif de formation :</label>
                <input
                  type="text"
                  name="objectif"
                  id="objectif"
                  placeholder="Objectif"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {errors.objectif && (
                  <span className="error">{errors.objectif}</span>
                )}

                <label htmlFor="duree">Durée :</label>
                <input
                  type="number"
                  name="duree"
                  id="duree"
                  placeholder="Durée en jour"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {errors.duree && <span className="error">{errors.duree}</span>}

                <label htmlFor="date_d">Date Début :</label>
                <input
                  type="date"
                  name="date_Debut"
                  id="date_d"
                  placeholder="Date Début"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {errors.date_Debut && (
                  <span className="error">{errors.date_Debut}</span>
                )}

                <label htmlFor="date_f">Date Fin :</label>
                <input
                  type="date"
                  name="date_Fin"
                  id="date_f"
                  placeholder="Date Fin"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {errors.date_Fin && (
                  <span className="error">{errors.date_Fin}</span>
                )}

               
              </aside>
              <aside>
                <label htmlFor="domain">Domaine :</label>
                <input
                  type="text"
                  name="domain"
                  id="domain"
                  placeholder="Domaine"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {errors.domain && (
                  <span className="error">{errors.domain}</span>
                )}

                <label htmlFor="competence">Compétence :</label>
                <input
                  type="text"
                  name="competence"
                  id="competence"
                  placeholder="Compétence"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {errors.competence && (
                  <span className="error">{errors.competence}</span>
                )}

                {formation.duree > 0 && <h3>Planification:</h3>}
                {formation.duree > 0 && generatePlanning(formation.duree)}
              </aside>
            </section>
            <section className="section_button">
              <button type="submit">Ajouter Formation</button>
              <Link className="link" to={`/contenu/${formation.id}`}>
                Ajouter Contenu
              </Link>
              <button type="reset">Annuler</button>
            </section>
          </form>
        </main>
      </div>
    </>
  );
}
