import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Button from "react-bootstrap/Button";
import Contenu from "./contenu";

export default function Creation_Formation() {
   
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (file) => {
    setFormation({ ...formation, image: file });
  };

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
    image: "",
    domain: "",
    competence: "",
    planification_heure: [],
    planification_jour: [],
  });

  const [formation, setFormation] = useState({
    titre: "",
    objectif: "",
    duree: 0,
    date_Debut: null,
    date_Fin: null,
    image: null,
    contenu:[],
    domain: "",
    competence: "",
    planification: [],
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (name, value) => {
    setFormation({ ...formation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return console.error("Token not found.");
      }

      let valid = true;
      const Errors = { ...errors };

      // titre
      if (!formation.titre.trim()) {
        Errors.titre = "Veuillez saisir un titre. Ce champ est obligatoire";
        valid = false;
      } else {
        Errors.titre = "";
        valid = true;
      }

      if (!formation.objectif.trim()) {
        Errors.objectif =
          "Veuillez saisir un objectif. Ce champ est obligatoire.";
        valid = false;
      } else {
        Errors.objectif = "";
        valid = true;
      }

      // duree
      if (!formation.duree) {
        Errors.duree = "Veuillez saisir un nombre. Ce champ est obligatoire.";
        valid = false;
      } else if (isNaN(formation.duree)) {
        Errors.duree = "Veuillez saisir un nombre valide.";
        valid = false;
      } else if (formation.duree < 0) {
        Errors.duree = "Veuillez saisir un nombre positif.";
        valid = false;
      } else {
        Errors.duree = "";
        valid = true;
      }

      // date debut
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

      if (!formation.date_Debut) {
        Errors.date_Debut =
          "Veuillez saisir une date. Ce champ est obligatoire.";
        valid = false;
      } else if (!dateRegex.test(formation.date_Debut)) {
        Errors.date_Debut =
          "Veuillez saisir une date valide au format YYYY-MM-DD.";
        valid = false;
      } else {
        Errors.date_Debut = "";
        valid = true;
      }

      // date fin
      const date_F_Regex = /^\d{4}-\d{2}-\d{2}$/;

      if (!formation.date_Fin) {
        Errors.date_Fin = "Veuillez saisir une date. Ce champ est obligatoire.";
        valid = false;
      } else if (!date_F_Regex.test(formation.date_Fin)) {
        Errors.date_Fin =
          "Veuillez saisir une date valide au format YYYY-MM-DD.";
        valid = false;
      } else if (
        new Date(formation.date_Debut) > new Date(formation.date_Fin)
      ) {
        Errors.date_Fin =
          "La date de fin doit être postérieure à la date de début.";
        valid = false;
      } else {
        Errors.date_Fin = "";
        valid = true;
      }

      // PLANIFICATION

      // PLANIFICATION
      let planification_jour = [];
      let planification_heure = [];

      formation.planification.forEach((item, index) => {
        const errors = {};

        // Valider le jour
        if (!date_F_Regex.test(item.jour)) {
          errors.jour = "Veuillez saisir une date valide";
          valid = false;
        } else if (
          new Date(item.jour) < new Date(formation.date_Debut) ||
          new Date(item.jour) > new Date(formation.date_Fin)
        ) {
          errors.jour =
            "Veuillez saisir une date valide entre date debut et date fin.";
          valid = false;
        } else {
          errors.jour = "";
          valid = true;
        }

        // Push the errors to the corresponding arrays
        planification_jour.push(errors.jour);

        // Valider chaque heure dans planification
        const heureDebut = new Date(`2000-01-01T${item.heure.from}`);
        const heureFin = new Date(`2000-01-01T${item.heure.to}`);

        if (!item.heure.from || !item.heure.to) {
          // console.log(item.heure.from);
          errors.heure =
            "Veuillez saisir une heure de début et une heure de fin.";
          valid = false;
        } else if (heureFin <= heureDebut) {
          errors.heure = "Veuillez saisir une heure de fin valide.";
          valid = false;
        } else {
          errors.heure = "";
          valid = true;
        }

        planification_heure.push(errors.heure);
      });

      // image
      if (!formation.image) {
        Errors.image = "selectionner une image. Ce champ est obligatoire.";
        valid = false;
      } else {
        Errors.image = "";
        valid = true;
      }

      // domaine
      if (!formation.domain.trim()) {
        Errors.domain = "Veuillez saisir un domaine. Ce champ est obligatoire.";
        valid = false;
      } else {
        Errors.domain = "";
        valid = true;
      }

      // competence
      if (!formation.competence.trim()) {
        Errors.competence =
          "Veuillez saisir les competences de cette formation . Ce champ est obligatoire.";
        valid = false;
      } else {
        Errors.competence = "";
        valid = true;
      }
      setErrors({
        ...Errors,
        planification_heure,
        planification_jour,
      });
      console.log(valid);

      if (valid) {
        // const formData = new FormData();
        // formData.append("image", formation.image);
        // console.log(formation)
        try {
          const formData = new FormData();

          // Append all form fields to the FormData object
          formData.append("titre", formation.titre);
          formData.append("objectif", formation.objectif);
          formData.append("duree", formation.duree);
          formData.append("date_Debut", formation.date_Debut);
          formData.append("date_Fin", formation.date_Fin);
          formData.append("image", formation.image);
          formData.append("domain", formation.domain);
          formData.append("competence", formation.competence);
          formation.contenu.forEach((id) => {
            formData.append("contenu[]", id);
          });
          // Append planification data if needed
          formation.planification.forEach((item, index) => {
            formData.append(`planification[${index}][jour]`, item.jour);
            formData.append(
              `planification[${index}][heure][from]`,
              item.heure.from
            );
            formData.append(
              `planification[${index}][heure][to]`,
              item.heure.to
            );
          });

          const response = await axios.post(
            "http://localhost:3002/api/Creation_Formation",

            formData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data.message);
          setErrorMessage(response.data.message);
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  const generatePlanning = (duree) => {
    const plan = [];
    if (duree > 0) {
      for (let index = 0; index < duree; index++) {
        plan.push(
          <>
            <div key={index} className="planification">
              <label className="form-label_p">jour:</label>
              <input
                type="date"
                name="jour"
                className="form-input_p"
                onChange={(e) =>
                  setFormation({
                    ...formation,
                    planification: [
                      ...formation.planification,
                      { jour: e.target.value, heure: { from: "", to: "" } },
                    ],
                  })
                }
              />

              <label className="form-label_p">de:</label>
              <input
                type="time"
                name="heure_from"
                className="form-input_p"
                onChange={(e) => {
                  const updatedPlanification = [...formation.planification];
                  updatedPlanification[
                    updatedPlanification.length - 1
                  ].heure.from = e.target.value;
                  setFormation({
                    ...formation,
                    planification: updatedPlanification,
                  });
                }}
              />
              <label className="form-label_p">a:</label>
              <input
                type="time"
                name="heure_to"
                className="form-input_p"
                onChange={(e) => {
                  const updatedPlanification = [...formation.planification];
                  updatedPlanification[
                    updatedPlanification.length - 1
                  ].heure.to = e.target.value;
                  setFormation({
                    ...formation,
                    planification: updatedPlanification,
                  });
                }}
              />
            </div>
            <div className="errordiv">
              {errors.planification_jour.length > 0 && (
                <span className="error_G">
                  {
                    errors.planification_jour[
                      errors.planification_jour.length - 1
                    ]
                  }
                </span>
              )}
              {errors.planification_heure.length > 0 && (
                <span className="error_G">
                  {
                    errors.planification_heure[
                      errors.planification_heure.length - 1
                    ]
                  }
                </span>
              )}
            </div>
          </>
        );
      }
    }
    return plan;
  };

  return (
    <>
      <div className="form-container_G">
        {errorMessage && (
          <div className="alert alert-success">{errorMessage}</div>
        )}

        <h1 className="form-title_G">La création d'une formation</h1>
        <main className="form-main_G">
          <form onSubmit={handleSubmit} className="form_G">
            <section className="form-section_G">
              <aside className="form-aside_G form-aside-first_G">
                <label htmlFor="titre" className="form-label_G">
                  Titre de formation :
                </label>
                <input
                  type="text"
                  name="titre"
                  id="titre"
                  className="form-input_G"
                  placeholder="Titre"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {errors.titre && (
                  <span className="error_G">{errors.titre}</span>
                )}

                <label htmlFor="objectif" className="form-label_G">
                  Objectif de formation :
                </label>
                <input
                  type="text"
                  name="objectif"
                  id="objectif"
                  className="form-input_G"
                  placeholder="Objectif"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {errors.objectif && (
                  <span className="error_G">{errors.objectif}</span>
                )}

                <label htmlFor="duree" className="form-label_G">
                  Durée :
                </label>
                <input
                  type="number"
                  name="duree"
                  id="duree"
                  className="form-input_G"
                  placeholder="Durée en jour"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {errors.duree && (
                  <span className="error_G">{errors.duree}</span>
                )}

                <label htmlFor="date_d" className="form-label_G">
                  Date Début :
                </label>
                <input
                  type="date"
                  name="date_Debut"
                  id="date_d"
                  className="form-input_G"
                  placeholder="Date Début"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {errors.date_Debut && (
                  <span className="error_G">{errors.date_Debut}</span>
                )}

                <label htmlFor="date_f" className="form-label_G">
                  Date Fin :
                </label>
                <input
                  type="date"
                  name="date_Fin"
                  id="date_f_G"
                  placeholder="Date Fin"
                  className="form-input_G"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {errors.date_Fin && (
                  <span className="error_G">{errors.date_Fin}</span>
                )}

                <label htmlFor="image" className="form-label_G">
                  Image :
                </label>
                <input
                  type="file"
                  name="image"
                  accept="images"
                  id="image"
                  className="form-input_G"
                  onChange={(e) => handleImageChange(e.target.files[0])}
                />
                {errors.image && (
                  <span className="error_G">{errors.image}</span>
                )}
              </aside>
              <aside className="form-aside_G">
                <label htmlFor="domain" className="form-label_G">
                  Domaine :
                </label>
                <input
                  type="text"
                  name="domain"
                  id="domain"
                  placeholder="Domaine"
                  className="form-input_G"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {errors.domain && (
                  <span className="error_G">{errors.domain}</span>
                )}

                <label htmlFor="competence" className="form-label_G">
                  Compétence :
                </label>
                <input
                  type="text"
                  name="competence"
                  id="competence"
                  placeholder="Compétence"
                  className="form-input_G"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {errors.competence && (
                  <span className="error_G">{errors.competence}</span>
                )}

                {formation.duree > 0 && (
                  <h3 className="titreplan">Planification:</h3>
                )}
                {formation.duree > 0 && generatePlanning(formation.duree)}
              </aside>
            </section>
            <section className="form-button-section_G">
              <button type="submit" className="form-button_G">
                Ajouter Formation
              </button>
              

              <Button
                variant="primary"
                className="link-form"
                onClick={() => setModalShow(true)}
              >
                Ajouter Contenu
              </Button>

              <Contenu
                contenuajouter={formation}
                setContenuAjouter={setFormation}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />

              {console.log(formation.contenu)}
              <button type="reset" className="cancel form-button_G">
                Annuler
              </button>
            </section>
          </form>
        </main>
      </div>
    </>
  );
}
