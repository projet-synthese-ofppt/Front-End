import React, { useState } from 'react';
import './History.css';
import Sidebar from './Sidebar';

function History() {
    const originalAdminsActions = [
    { id: 1, action: "Modifier le gestionnaire" },
    { id: 2, action: "Modifier le formateur" },
    { id: 1, action: "Supprimer le formateur" },
    { id: 4, action: "Ajouter un formateur" },
    { id: 6, action: "Ajouter une formation" },
    { id: 6, action: "Modifier une formation" },
    { id: 7, action: "Supprimer une formation" },
    { id: 8, action: "Consulter les statistiques" },
    { id: 9, action: "Gérer les comptes" },
    { id: 10, action: "Configurer les paramètres du système" },
  ];
  const originalManagersActions = [
    { id: 1, action: "Modifier le formateur d'id 2" },
    { id: 2, action: "Supprimer le formateur d'id 3" },
    { id: 3, action: "Ajouter un formateur" },
    { id: 4, action: "Ajouter une formation" },
    { id: 5, action: "Modifier une formation" },
    { id: 6, action: "Supprimer une formation" },
    { id: 7, action: "Consulter les statistiques" },
    { id: 8, action: "Gérer les comptes" },
    { id: 9, action: "Configurer les paramètres du système" },
    { id: 10, action: "Exporter les données" },
  ];
  const originalTrainingsActions = [
    { id: 1, action: "Supprimer le formateur d'id 2" },
    { id: 2, action: "Supprimer le formation d'id 2" },
    { id: 3, action: "Supprimer le formateur d'id 4" },
    { id: 4, action: "Ajouter un formateur" },
    { id: 5, action: "Ajouter une formation" },
    { id: 6, action: "Modifier une formation" },
    { id: 7, action: "Supprimer une formation" },
    { id: 8, action: "Consulter les statistiques" },
    { id: 9, action: "Gérer les comptes" },
    { id: 10, action: "Configurer les paramètres du système" },
  ];
  const [adminsActions, setAdminsActions] = useState(originalAdminsActions);
  const [managersActions, setManagersActions] = useState(originalManagersActions);
  const [trainingsActions, setTrainingsActions] = useState(originalTrainingsActions);

  const [adminSearchTerm, setAdminSearchTerm] = useState('');
  const [managerSearchTerm, setManagerSearchTerm] = useState('');
  const [trainingSearchTerm, setTrainingSearchTerm] = useState('');

  const filterAdminsActionsById = (id) => {
    const filteredActions = originalAdminsActions.filter(action => action.id === id);
    if (filteredActions.length === 0) {
      setAdminsActions([]);
    } else {
      setAdminsActions(filteredActions);
    }
  };

  const filterManagersActionsById = (id) => {
    const filteredActions = originalManagersActions.filter(action => action.id === id);
    if (filteredActions.length === 0) {
      setManagersActions([]);
    } else {
      setManagersActions(filteredActions);
    }
  };

  const filterTrainingsActionsById = (id) => {
    const filteredActions = originalTrainingsActions.filter(action => action.id === id);
    if (filteredActions.length === 0) {
      setTrainingsActions([]);
    } else {
      setTrainingsActions(filteredActions);
    }
  };

  return ( <div className='History'>
       
    <div className="containerHistory">
    
      <div>
        <h2>Actions des administrateurs</h2>
        <input
          type="number"
          placeholder="Rechercher par ID"
          value={adminSearchTerm}
          onChange={(e) => setAdminSearchTerm(parseInt(e.target.value))}
          className='search-input'
        />
        <button onClick={() => filterAdminsActionsById(adminSearchTerm)} className='green-button'>Rechercher</button>
        {adminsActions.length === 0 && <p>Aucune action trouvée pour cet ID.</p>}
        <ul>
          {adminsActions.map((action, index) => (
            <li key={index}>{action.action}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Actions des gestionnaires</h2>
        <input
          type="number"
          placeholder="Rechercher par ID"
          value={managerSearchTerm}
          onChange={(e) => setManagerSearchTerm(parseInt(e.target.value))}
          className='search-input'
        />
        <button onClick={() => filterManagersActionsById(managerSearchTerm)} className='green-button'>Rechercher</button>
        {managersActions.length === 0 && <p>Aucune action trouvée pour cet ID.</p>}
        <ul>
          {managersActions.map((action, index) => (
            <li key={index}>{action.action}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Actions de formation</h2>
        <input
          type="number"
          placeholder="Rechercher par ID"
          value={trainingSearchTerm}
          onChange={(e) => setTrainingSearchTerm(parseInt(e.target.value))}
          className='search-input'
        />
        <button onClick={() => filterTrainingsActionsById(trainingSearchTerm)} className='green-button'>Rechercher</button>
        {trainingsActions.length === 0 && <p>Aucune action trouvée pour cet ID.</p>}
        <ul>
          {trainingsActions.map((action, index) => (
            <li key={index}>{action.action}</li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

export default History;