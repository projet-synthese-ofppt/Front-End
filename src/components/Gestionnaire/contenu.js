import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Creer_Contenu from "./creer_contenu";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./contenu.css";

function Contenu(props) {
  const navigate = useNavigate();

  const navigateformulaire = () => {
    console.log("ff");
    navigate("/Creation_Formation");
  };

  const [modalShow, setModalShow] = useState(false);

  const [resultatdata, setresultatdata] = useState([]);
  const [mot_recherche, setMotRecherche] = useState("");
  const contenuajouter = props.contenuajouter;
  const setContenuAjouter = props.setContenuAjouter;

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

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/contenu");
      setresultatdata(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function refresh() {
    console.log("fresh");
    getData();
  }

  const recherche = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/contenu");
      const filteredData = response.data.filter(
        (item) =>
          item.type.toLowerCase().includes(mot_recherche.toLowerCase()) ||
          item.categorie.toLowerCase().includes(mot_recherche.toLowerCase()) ||
          item.description.toLowerCase().includes(mot_recherche.toLowerCase())
      );
      setresultatdata(filteredData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  const bienAjouter = (id) => {
    if (contenuajouter.contenu.includes(id)) {
      setContenuAjouter((prevContenuAjouter) => ({
        ...prevContenuAjouter,
        contenu: prevContenuAjouter.contenu.filter((item) => item !== id),
      }));
    } else {
      setContenuAjouter((prevContenuAjouter) => ({
        ...prevContenuAjouter,
        contenu: [...prevContenuAjouter.contenu, id],
      }));
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="title-contenu"
          >
            Ajouter Contenu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="sectioncontenu">
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="input-field"
                  name="recherche"
                  placeholder="rechercher..."
                  value={mot_recherche}
                  onChange={(e) => setMotRecherche(e.target.value)}
                />
                <button
                  type="button"
                  className="invalide"
                  onClick={() => setMotRecherche("")}
                >
                  Effacer
                </button>
                <button type="button" className="valide" onClick={recherche}>
                  Rechercher
                </button>
              </div>
              <table className="tabledata">
                <thead>
                  <tr>
                    <th className="first-colmn">Description</th>
                    <th className="first-colmn">Type</th>
                    <th className="first-colmn">Categorie</th>
                    <th className="first-colmn">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {resultatdata.map((item) => (
                    <tr key={item.id}>
                      <td className="first-colmn">{item.description}</td>
                      <td className="first-colmn">{item.type}</td>
                      <td className="first-colmn">{item.categorie}</td>
                      <td className="first-colmn">
                        <button
                          type="button"
                          className="buttonajout"
                          onClick={() => bienAjouter(item.id)}
                        >
                          {contenuajouter.contenu.includes(item.id)
                            ? "bien ajouter"
                            : "ajouter"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                variant="primary"
                className="form-link-contenu"
                onClick={() => setModalShow(true)}
              >
                Creer Contenu{" "}
              </Button>

              <Creer_Contenu
                show={modalShow}
                onHide={() => setModalShow(false)}
                refresh={refresh}
              />

              
              <Button onClick={props.onHide}>valider</Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Contenu;
