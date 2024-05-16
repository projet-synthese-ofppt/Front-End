import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Dashbord2 from './components/Admin/dashbord2';


import LoginAdmin from './components/Admin/LoginAdmin';


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
