import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Dashbord2 from './components/Admin/dashbord2';

import LoginAdmin from './components/Admin/LoginAdmin';
import ListGestionnaire from './components/Admin/ListGestionnaire';
import ListFormateur from './components/Admin/listFormateur';
import ListFormation from './components/Admin/ListFormation';
import Ajoutergestionnaire from './components/Admin/addGestionnaire';
// import ProfileGestionnaire from './components/Gestionnaire/ProfileGestionnaire';
import History from './History';
import Sidebar from './Sidebar';
import AdminSection from './AdminSection';
import MyCalendar from './components/Gestionnaire/GlobalCalendrier';

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
