import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import GestionnaireLogin from "./components/Gestionnaire/GestionnaireLogin";
import GestionnaireSection from "./GestionnaireSection";
import AdminSection from "./AdminSection";
import LoginAdmin from "./components/Admin/LoginAdmin";
import ProfilFormateur from "./components/Gestionnaire/profilFormateur";

function App() {
  return (
    <div className="SiteContainer">
      <Routes>
        {/* <Route path="/adminLogin" element={<LoginAdmin/>}></Route> */}
        <Route path="/GestionnaireLogin" element={<GestionnaireLogin />}></Route>
        <Route path="*" element={<GestionnaireSection />}></Route>
        {/* <Route path='*' element={<AdminSection/>}></Route> */}

        <Route path="/profilFormateur/:id" element={<ProfilFormateur/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
