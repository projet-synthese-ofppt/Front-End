import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Dashbord2 from './components/Admin/dashbord2';
import LoginAdmin from './components/Admin/LoginAdmin';
import ListGestionnaire from './components/Admin/ListGestionnaire';
import ListFormateur from './components/Admin/listFormateur';
import ListFormation from './components/Admin/ListFormation';
import Ajoutergestionnaire from './components/Admin/addGestionnaire';
import ProfileGestionnaire from './components/Gestionnaire/ProfileGestionnaire';
import History from './History';

function App() {
  return <Routes>
    <Route path="/dashboard" element={<Dashbord2/>}></Route>
    <Route path="/Login" element={<LoginAdmin/>}></Route>
    <Route path="/manager" element={<ListGestionnaire/>}></Route>
    <Route path="/trainers" element={<ListFormateur/>}></Route>
    <Route path="/training" element={<ListFormation/>}></Route>
    <Route path="/addGestionnaire" element={<Ajoutergestionnaire/>}></Route>
    <Route path="/profilGestionnaire/:id" element={<ProfileGestionnaire/>}></Route>
    <Route path="/history" element={<History/>}></Route>

  </Routes>
  
 
}

export default App;
