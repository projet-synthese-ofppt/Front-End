import './App.css';
import { Route,Routes } from 'react-router-dom';
import Sidebar_Gestionnaire from "./sidbarGestionnaire";
import Emploi from './components/Gestionnaire/Emploi';
import ListGestionnaire from './components/Admin/ListGestionnaire';
import ListFormateur from './components/Admin/listFormateur';
import ListFormation from './components/Admin/ListFormation';
import History from './History';
import Creation_Formation from './components/Gestionnaire/Creation_Formation';
import Contenu from "./components/Gestionnaire/contenu"
import Creer_Contenu from './components/Gestionnaire/creer_contenu'
import AddFormateur from './components/Gestionnaire/Creation_Formateur';

function GestionnaireSection() {
  return (
    <>
      <Sidebar_Gestionnaire />
      <Routes>
        <Route path="/emploi" element={<Emploi />}></Route>
        <Route path="/trainers" element={<ListFormateur />}></Route>
        <Route path="/manager" element={<ListGestionnaire />}></Route>
        <Route path="/training" element={<ListFormation />}></Route>
        <Route
          path="/Creation_Formation"
          element={<Creation_Formation />}
        ></Route>
        <Route path='/ajouterFormateur' element={<AddFormateur/>}></Route>
        <Route path="/contenu" element={<Contenu />}></Route>
        <Route path="/history" element={<History />}></Route>
        <Route path="/creer_contenu" element={<Creer_Contenu />}></Route>
      </Routes>
    </>
  );
}

export default GestionnaireSection;
