import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Dashbord2 from './components/admin/dashbord2';

import LoginAdmin from './components/admin/LoginAdmin';
import ListGestionnaire from './components/admin/ListGestionnaire';
import ListFormateur from './components/admin/listFormateur';
import ListFormation from './components/admin/ListFormation';
import Ajoutergestionnaire from './components/admin/addGestionnaire';
import ProfileGestionnaire from './components/Gestionnaire/ProfileGestionnaire';
import History from './History';
import Sidebar from './Sidebar';
import AdminSection from './AdminSection';

function App() {
  return <div className='SiteContainer'>
    
    <Routes>
    <Route path="/Login" element={<LoginAdmin/>}></Route>
    <Route path='*' element={<AdminSection/>} ></Route>
    </Routes>
    
    


    {/* <Routes>
      <Route path='*' element={<AdminSection/>}></Route>
    </Routes> */}
  </div>
  
 
}

export default App;
