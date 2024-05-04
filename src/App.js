import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
// import Dashboard from './Dashboard';
// import Management from './Management';
import History from './History';
// import Profil from './Profil';
// import Settings from './Settings';
// import Logout from './Logout';
import './App.css';

const App = () => {
  const [user, setUser] = useState({
    firstName: 'Prenom',
    lastName: 'Nom',
    photo: 'homme.jpg',
  });

  return (
    <div className="app">
      <Sidebar user={user} />
      <div className="content">
        <Routes>
          <Route path="/dashboard" element={<History />} />
          <Route path="/manager" element={<History />} />
          <Route path="/trainers" element={<History />} />
          <Route path="/training" element={<History />} />
          <Route path="/history" element={<History />} />
          <Route path="/profil" element={<History />} />
          <Route path="/settings" element={<History />} />
          <Route path="/logout" element={<History />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
