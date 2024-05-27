import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./contenuc.css";

export default function Creer_Contenu(props) {
  const navigate = useNavigate();

  const [contenu, setContenu] = useState({
    description: "",
    type: "",
    source: null,
    categorie: "",
    domain: "",
  });

  const [Errorsmessage, setErrorsMessage] = useState("");

  const [errors, setErrors] = useState({
    descriptionError: "",
    typeError: "",
    sourceError: null,
    categorieError: "",
    domainError: "",
  });

  function handleronchange(name, value) {
    setContenu({ ...contenu, [name]: value });
  }

  const handleImageChange = (file) => {
    setContenu({ ...contenu, source: file });
  };

  function handleClick() {
    props.refresh();
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return console.error("Token not found.");
      }

      let valid = true;
      const Errors = { ...errors };

      if (!contenu.description.trim()) {
        Errors.descriptionError =
          "Veuillez saisir une petite description sur ce contenu";
        valid = false;
      } else {
        Errors.descriptionError = "";
      }

      if (contenu.type === "") {
        Errors.typeError = "Veuillez selectionner un type";
        valid = false;
      } else {
        Errors.typeError = "";
      }

      if (!contenu.source) {
        Errors.sourceError = "Veuillez selectionner une image";
        valid = false;
      } else {
        Errors.sourceError = "";
      }

      if (!contenu.categorie.trim()) {
        Errors.categorieError = "Veuillez saisir une categorie";
        valid = false;
      } else {
        Errors.categorieError = "";
      }

      if (!contenu.domain.trim()) {
        Errors.domainError = "Veuillez saisir un domaine.";
        valid = false;
      } else {
        Errors.domainError = "";
      }

      setErrors({ ...Errors });

      if (valid) {
        try {
          const formData = new FormData();
          formData.append("description", contenu.description);
          formData.append("type", contenu.type);
          formData.append("source", contenu.source);
          formData.append("categorie", contenu.categorie);
          formData.append("domain", contenu.domain);

          const response = await axios.post(
            "http://localhost:3002/api/creer_contenu",
            formData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data.message);
          setErrorsMessage(response.data.message);
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            console.log(error.response.data.message);
            setErrorsMessage(error.response.data.message);
          } else {
            console.error("An unexpected error occurred:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div>
          {Errorsmessage && (
            <div className="alert alert-success">{Errorsmessage}</div>
          )}
        </div>

        <Modal.Title id="contained-modal-title-vcenter" className="titre-new">
          Creer un nouveau contenu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body class="modal-body-contenu">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="form-container-contenu"
        >
          <label className="contenu-label">Description :</label>
          <input
            type="text"
            name="description"
            className="form-container-input"
            onChange={(e) => handleronchange(e.target.name, e.target.value)}
          />
          {errors.descriptionError && (
            <span className="error-new-contenu">{errors.descriptionError}</span>
          )}

          <label className="contenu-label">Type :</label>
          <select
            name="type"
            className="form-container-input"
            onChange={(e) => handleronchange(e.target.name, e.target.value)}
          >
            <option className="optionContenu" value="">
              selectionner un type
            </option>
            <option className="optionContenu" value="image">
              Image
            </option>
            <option className="optionContenu" value="vedeo">
              Vedeo
            </option>
            <option className="optionContenu" value="fichier">
              Fichier
            </option>
          </select>
          {errors.typeError && (
            <span className="error-new-contenu">{errors.typeError}</span>
          )}

          <label className="contenu-label">Source :</label>
          <input
            type="file"
            className="form-container-input imagecontenu"
            onChange={(e) => handleImageChange(e.target.files[0])}
          />
          {errors.sourceError && (
            <span className="error-new-contenu">{errors.sourceError}</span>
          )}

          <label className="contenu-label">Categorie :</label>
          <input
            type="text"
            name="categorie"
            className="form-container-input"
            onChange={(e) => handleronchange(e.target.name, e.target.value)}
          />
          {errors.categorieError && (
            <span className="error-new-contenu">{errors.categorieError}</span>
          )}

          <label className="contenu-label">Domain :</label>
          <input
            name="domain"
            className="form-container-input"
            type="text"
            onChange={(e) => handleronchange(e.target.name, e.target.value)}
          />
          {errors.domainError && (
            <span className="error-new-contenu">{errors.domainError}</span>
          )}

          <div className="form-button-ges">
            <button
              type="submit"
              className="form-container-button"
              onClick={handleClick}
            >
              Nouveau contenu
            </button>
            <button type="reset" className="form-container-reset">
              Annuler
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
