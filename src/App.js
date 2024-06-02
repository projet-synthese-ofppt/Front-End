import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Dashbord2 from './components/Admin/dashbord2';


import LoginAdmin from './components/Admin/LoginAdmin';


import AdminSection from './AdminSection';

import Affecterformateur from './components/AffecterFormateur';


function App() {
  return <div className='SiteContainer'>
 <Routes>
    {/* <Route path="/Login" element={<LoginAdmin/>}></Route>
    <Route path='*' element={<AdminSection/>} ></Route> */}
   <Route path='/Affecter' element={<Affecterformateur/>} ></Route>
    </Routes> 
    
    
    
  </div>
  
 
}

export default App;
