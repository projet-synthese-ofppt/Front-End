import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import GestionnaireLogin from "./components/Gestionnaire/GestionnaireLogin";
import GestionnaireSection from "./GestionnaireSection";

function App() {
  return (
    <div className="SiteContainer">
      <Routes>
        <Route
          path="/GestionnaireLogin"
          element={<GestionnaireLogin />}
        ></Route>
        <Route path="*" element={<GestionnaireSection />}></Route>
      </Routes>

      {/* <Routes>
      <Route path='*' element={<AdminSection/>}></Route>
    </Routes> */}
    </div>
  );
}

export default App;
