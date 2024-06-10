import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListGestionnaire.css";
import { Link } from "react-router-dom";
import DropList from "../subComponents/dropList";

export default function ListFormateur() {
  const [formateurData, setFormateurData] = useState([]);
  const [searchedFormateur, setSearchedFormateur] = useState([]);
  const [reset, setReset] = useState(false);

  const [selectedVille, setSelectedVille] = useState('');
  const [selectedCompetence, setSelectedCompetence] = useState('');
  const [selectedEtablissement, setSelectedEtablissement] = useState('');
  const [selectedSpecialite, setSelectedSpecialite] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedFormateurName, setSelectedFormateurName] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("http://localhost:3002/api/data/person/formateur")
      .then(res => {
        console.log(res.data);
        setFormateurData(res.data);
        setSearchedFormateur(res.data);
      })
      .catch((error) => console.log(error));
  };

  function handleClick(id) {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:3002/api/data/gestionnaire/${id}`, {
        headers: { "authorization": `Bearer ${token}` }
      })
      .then((res) => {
        getData();
      })
      .catch((err) => console.error(err));
  }

  function searchedElement(elementType, elementValue) {
    switch (elementType) {
      case 'ville':
        setSelectedVille(elementValue);
        break;
      case 'Specialite':
        setSelectedSpecialite(elementValue);
        break;
      case 'competence':
        setSelectedCompetence(elementValue);
        break;
      case 'type':
        setSelectedType(elementValue);
        break;
      case 'etablissement':
        setSelectedEtablissement(elementValue);
        break;
      default:
        return false;
    }
  }

  function handleSearch() {
    const T = formateurData.filter((f) => {
      const matchesVille = selectedVille ? f.ville.includes(selectedVille) : true;
      const matchesEtablissement = selectedEtablissement ? f.nom.includes(selectedEtablissement) : true;
      const matchesSpecialite = selectedSpecialite ? f.more_informations.specialite.includes(selectedSpecialite) : true;
      const matchesType = selectedType ? f.type.includes(selectedType) : true;
      const matchesFormateurName = selectedFormateurName ? (f.first_name.toLowerCase() + ' ' + f.last_name.toLowerCase()).includes(selectedFormateurName.toLowerCase()) : true;
      const matchesCompetence = selectedCompetence ? f.more_informations.competence.includes(selectedCompetence) : true;

      return matchesVille && matchesEtablissement && matchesSpecialite && matchesType && matchesFormateurName && matchesCompetence;
    });

    setSearchedFormateur(T);
    setCurrentPage(1);
  }

  function handleReset() {
    setReset(true);
    setSelectedCompetence("");
    setSelectedEtablissement("");
    setSelectedSpecialite("");
    setSelectedVille("");
    setSelectedFormateurName("");
    setSelectedType("");
    setSearchedFormateur(formateurData);
    setCurrentPage(1);
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedFormateur.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchedFormateur.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="TheContainer">
      <div className="ListGestionnaireContainer">
        <div className="searchBar">
          <div className="searchButtonsContainer">
            <input className="searchBarInput" type="text" placeholder="Rechercher" value={selectedFormateurName} onChange={e => setSelectedFormateurName(e.target.value)} />
            <button className="searchButton" onClick={handleSearch}>Rechercher</button>
            <button className="resetButton" onClick={handleReset}>Réinitialiser</button>
          </div>
          <div className="dropListContainer">
            <DropList paramType={"ville"} searchedElement={searchedElement} reset={reset} />
            <DropList paramType={"competence"} searchedElement={searchedElement} reset={reset} />
            <DropList paramType={"etablissement"} searchedElement={searchedElement} reset={reset} />
            <DropList paramType={"Specialite"} searchedElement={searchedElement} reset={reset} />
            <DropList paramType={"type"} searchedElement={searchedElement} reset={reset} />
          </div>
        </div>
        <div className="titleContainer">
          <p>List des formateurs</p>
        </div>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Login</th>
              <th>Specialite</th>
              <th>Etablissement</th>
              <th>Ville</th>
              <th>Type</th>
              <th>Competence</th>
              <th>Experience</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((i, index) => (
                <tr key={index}>
                  <td>
                    <img src={`http://localhost:3002/uploads/${i.image}`} alt="" width="50px" />
                  </td>
                  <td>{i.person_id}</td>
                  <td>{i.first_name} {i.last_name}</td>
                  <td>{i.login}</td>
                  <td>{i.more_informations.specialite}</td>
                  <td>{i.nom}</td>
                  <td>{i.ville}</td>
                  <td>{i.type}</td>
                  <td>{i.more_informations.competence.map((x, index) => <li key={index} style={{ listStyle: 'none' }}>{x}</li>)}</td>
                  <td>{i.more_informations.experience.split('\r\n').map((x, index) => <li key={index} style={{ listStyle: 'none' }}>{x}</li>)}</td>
                  <td className="ListgestionnaireActions">
                    <Link to={`/profilFormateur/${i.person_id}`}><img src="/media/edit.png" alt="" width="19px" /></Link>
                    <button className="deleteButton" onClick={() => {
                      const confirmDelete = window.confirm("Vous êtes sûr de supprimer ce gestionnaire ?");
                      if (confirmDelete) {
                        handleClick(i.person_id);
                      }
                    }}>
                      <img src="/media/delete.png" alt="" width="19px" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          {pageNumbers.map(number => (
            <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? 'active' : ''}>{number}</button>
          ))}
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageNumbers.length}>Next</button>
        </div>
      </div>
    </div>
  );
}
